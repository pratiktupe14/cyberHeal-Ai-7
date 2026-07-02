import os
import sys
from celery import Celery
from loguru import logger

# Ensure src path is correctly configured
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

# We use Redis as the primary broker
CELERY_BROKER_URL = "redis://localhost:6379/0"
CELERY_RESULT_BACKEND = "redis://localhost:6379/0"

# Initialize Celery app
celery_app = Celery(
    "cyberheal_tasks",
    broker=CELERY_BROKER_URL,
    backend=CELERY_RESULT_BACKEND
)

celery_app.conf.update(
    task_serializer='json',
    accept_content=['json'], 
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
)

@celery_app.task(bind=True, max_retries=3)
def execute_pipeline_task(self, incident_id: str):
    """
    Celery task that executes the fully autonomous LangGraph Multi-Agent pipeline
    outside of the HTTP request lifecycle.
    """
    logger.info(f"Celery Worker Task: Starting Pipeline for Incident {incident_id}")
    try:
        # Import dynamically to prevent circular imports with worker bootup
        from shield_rca.agents import supabase
        from shield_rca.langgraph_core import ShieldLangGraph, AgentState
        
        workflow = ShieldLangGraph(supabase)
        
        initial_state = AgentState(
            incident_id=incident_id,
            alert_payload={"source": "celery_async_queue", "metric": "anomaly"}
        )

        final_state = workflow.execute_workflow(initial_state)
        
        if final_state.status == "RESOLVED":
            logger.success(f"Celery Task Completed Successfully for {incident_id}")
            return {"status": "success", "incident_id": incident_id}
        else:
            logger.error(f"Celery Task Ended in state: {final_state.status}")
            return {"status": final_state.status, "incident_id": incident_id}
            
    except Exception as e:
        logger.error(f"Celery execution error for {incident_id}: {str(e)}")
        # Auto-retry on catastrophic failure
        self.retry(exc=e, countdown=10)
