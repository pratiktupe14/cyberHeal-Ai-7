import logging
import time

logger = logging.getLogger(__name__)

class FinalStatusAgent:
    def __init__(self, scribe_agent=None):
        self.metrics = {"resolved": 0, "closed": 0, "escalated": 0, "failed": 0}
        self.scribe_agent = scribe_agent

    def process(self, workflow_data):
        incident_id = workflow_data.get("incident_id")
        logger.info(f"[FinalStatusAgent] Processing final status for {incident_id}")

        verification_report = workflow_data.get("verification_report", {})
        status = verification_report.get("status")
        
        final_status = "Failed"
        if status == "VERIFIED_SAFE":
            final_status = "Resolved"
        elif status == "VERIFICATION_FAILED":
            final_status = "Escalated"
        else:
            # If there's no verification report, it might be a lower severity issue that just closes
            final_status = "Closed"
            
        workflow_data["final_status"] = final_status
        
        # Update metrics
        key = final_status.lower()
        if key in self.metrics:
            self.metrics[key] += 1
            
        self._update_dashboard(incident_id, final_status)
        self._update_database(incident_id, final_status)
        self._notify_scribe(workflow_data)
        
        time.sleep(0.5) # Simulate processing
        return True
        
    def _update_dashboard(self, incident_id, status):
        # Mock updating the dashboard
        logger.info(f"[FinalStatusAgent] Dashboard updated: Incident {incident_id} status is now {status}.")
        
    def _update_database(self, incident_id, status):
        # Mock updating the database
        logger.info(f"[FinalStatusAgent] Database updated: Incident {incident_id} marked as {status}.")
        
    def _notify_scribe(self, workflow_data):
        if self.scribe_agent:
            self.scribe_agent.log_incident_closure(workflow_data)
        else:
            logger.warning("[FinalStatusAgent] ScribeAgent not available to notify.")
