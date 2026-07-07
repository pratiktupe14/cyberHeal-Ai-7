import uuid
import time
import logging

logger = logging.getLogger(__name__)

class CommanderAgent:
    def __init__(self, threat_intel_agent=None):
        # In-memory store for workflow state tracking
        self.active_workflows = {}
        self.threat_intel_agent = threat_intel_agent

    def analyze_severity(self, incident_data):
        """Analyze the incident and return severity."""
        failed_attempts = incident_data.get("failedAttempts", 0)
        event_type = incident_data.get("type", "UNKNOWN")
        
        severity = "Low"
        if failed_attempts > 20:
            severity = "Critical"
        elif failed_attempts > 10 or event_type in ["BRUTE_FORCE", "DDOS"]:
            severity = "High"
        elif failed_attempts > 5:
            severity = "Medium"
            
        return severity

    def create_execution_plan(self, severity, incident_type):
        """Dynamically create an execution plan based on severity."""
        base_plan = ["IntakeAgent", "SentinelAgent"]
        
        if severity == "Low":
            base_plan.extend(["ScribeAgent"])
        elif severity == "Medium":
            base_plan.extend(["ThreatIntelAgent", "ScribeAgent"])
        elif severity == "High":
            base_plan.extend(["ThreatIntelAgent", "CausorAgent", "PlannerAgent", "ScribeAgent"])
        elif severity == "Critical":
            base_plan.extend(["ThreatIntelAgent", "CausorAgent", "PlannerAgent", "GuardianAgent", "ExecutorAgent", "VerifierAgent", "ScribeAgent"])
            
        return base_plan

    def execute_plan(self, incident_id):
        """Execute the plan with retries, failure handling, and state tracking."""
        workflow = self.active_workflows.get(incident_id)
        if not workflow:
            return

        plan = workflow["plan"]
        
        for step in plan:
            workflow["current_step"] = step
            workflow["status"] = f"Executing {step}"
            logger.info(f"[CommanderAgent] Incident {incident_id} - {workflow['status']}")
            
            success = self._simulate_agent_execution(step, incident_id)
            retries = 0
            max_retries = 2
            
            # Retry logic
            while not success and retries < max_retries:
                retries += 1
                logger.warning(f"[CommanderAgent] Incident {incident_id} - Retrying {step} ({retries}/{max_retries})")
                time.sleep(1) # simulate delay
                success = self._simulate_agent_execution(step, incident_id)
                
            if not success:
                logger.error(f"[CommanderAgent] Incident {incident_id} - Failed at {step}. Escalating.")
                workflow["status"] = f"Failed at {step} - Escalated for manual review"
                return # Stop execution on failure
                
        workflow["status"] = "Completed"
        logger.info(f"[CommanderAgent] Incident {incident_id} - Workflow Completed successfully.")

    def _simulate_agent_execution(self, agent_name, incident_id):
        """Stub method to simulate another agent's execution."""
        workflow = self.active_workflows.get(incident_id)
        
        if agent_name == "ThreatIntelAgent" and self.threat_intel_agent:
            return self.threat_intel_agent.enrich_incident(workflow)
            
        # For simulation, assume all other agents succeed.
        time.sleep(0.5) # Simulate processing time
        return True

    def process_incident(self, incident_data):
        """Entry point to process a new incident."""
        incident_id = str(uuid.uuid4())
        
        severity = self.analyze_severity(incident_data)
        plan = self.create_execution_plan(severity, incident_data.get("type"))
        
        # Initialize workflow state
        self.active_workflows[incident_id] = {
            "incident_id": incident_id,
            "data": incident_data,
            "severity": severity,
            "plan": plan,
            "current_step": "Initializing",
            "status": "Started",
            "created_at": time.time()
        }
        
        logger.info(f"[CommanderAgent] Created workflow {incident_id} with severity {severity}. Plan: {plan}")
        
        return incident_id, self.active_workflows[incident_id]
