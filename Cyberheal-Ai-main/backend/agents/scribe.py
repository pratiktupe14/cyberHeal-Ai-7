import logging
import time
import json
import os

logger = logging.getLogger(__name__)

class ScribeAgent:
    def __init__(self, reflective_learning_agent=None, storage_path="logs/"):
        self.logs = []
        self.reflective_learning_agent = reflective_learning_agent
        self.memory_agent = None  # To be injected
        self.storage_path = storage_path
        
        if not os.path.exists(self.storage_path):
            os.makedirs(self.storage_path)

    def log_incident_closure(self, workflow_data):
        """Record the complete incident lifecycle at closure."""
        incident_id = workflow_data.get("incident_id")
        final_status = workflow_data.get("final_status", "Unknown")
        
        log_entry = {
            "incident_id": incident_id,
            "status": final_status,
            "message": f"Incident {incident_id} completed with status {final_status}",
            "timestamp": time.time(),
            "workflow_data": workflow_data
        }
        self.logs.append(log_entry)
        
        # Store audit logs
        self._store_audit_log(incident_id, log_entry)
        logger.info(f"[ScribeAgent] Logged closure for {incident_id}: {final_status}")
        
        # Forward data to ReflectiveLearningAgent and MemoryAgent
        self.forward_to_learning(workflow_data)
        
        if self.memory_agent:
            self.memory_agent.store_incident(workflow_data)
        
        return True
        
    def generate_report(self, workflow_data):
        """Generate forensic logs and compliance records during the workflow."""
        incident_id = workflow_data.get("incident_id")
        logger.info(f"[ScribeAgent] Generating comprehensive report for {incident_id}")
        
        # Record complete lifecycle metadata
        lifecycle_data = {
            "incident_id": incident_id,
            "severity": workflow_data.get("severity"),
            "plan_executed": workflow_data.get("plan"),
            "current_status": workflow_data.get("status"),
            "timestamp": time.time()
        }
        
        # Generate forensic logs
        self._generate_forensic_log(incident_id, workflow_data)
        
        # Maintain compliance records
        self._maintain_compliance_records(incident_id, lifecycle_data)
        
        # Log to in-memory array for UI feed
        self.logs.append({
            "incident_id": incident_id,
            "agent_name": "SCRIBE",
            "message": f"Generated forensic & compliance report for incident {incident_id}",
            "timestamp": time.time()
        })
        
        time.sleep(0.5) # Simulate report generation time
        return True
        
    def _store_audit_log(self, incident_id, data):
        filepath = os.path.join(self.storage_path, f"audit_{incident_id}.json")
        try:
            with open(filepath, "w") as f:
                json.dump(data, f, indent=4)
            logger.info(f"[ScribeAgent] Stored audit log for {incident_id}")
        except Exception as e:
            logger.error(f"[ScribeAgent] Failed to store audit log: {e}")

    def _generate_forensic_log(self, incident_id, workflow_data):
        filepath = os.path.join(self.storage_path, f"forensic_{incident_id}.log")
        try:
            with open(filepath, "w") as f:
                f.write(f"--- FORENSIC LOG: INCIDENT {incident_id} ---\n")
                f.write(f"Timestamp: {time.time()}\n")
                f.write(f"Initial Event: {json.dumps(workflow_data.get('data', {}))}\n")
                f.write(f"Execution Plan: {workflow_data.get('plan', [])}\n")
                f.write("Status changes and state transitions would be recorded here.\n")
            logger.info(f"[ScribeAgent] Generated forensic log for {incident_id}")
        except Exception as e:
            logger.error(f"[ScribeAgent] Failed to generate forensic log: {e}")
            
    def _maintain_compliance_records(self, incident_id, lifecycle_data):
        filepath = os.path.join(self.storage_path, "compliance_records.jsonl")
        try:
            with open(filepath, "a") as f:
                f.write(json.dumps(lifecycle_data) + "\n")
            logger.info(f"[ScribeAgent] Updated compliance records with incident {incident_id}")
        except Exception as e:
            logger.error(f"[ScribeAgent] Failed to update compliance records: {e}")

    def forward_to_learning(self, workflow_data):
        """Forward data to ReflectiveLearningAgent (Phase 4)."""
        if self.reflective_learning_agent:
            logger.info(f"[ScribeAgent] Forwarding incident {workflow_data.get('incident_id')} to ReflectiveLearningAgent.")
            self.reflective_learning_agent.learn_from_incident(workflow_data)
        else:
            logger.info(f"[ScribeAgent] ReflectiveLearningAgent not found. Learning data buffered.")
