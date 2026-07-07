import time
import logging
import random

logger = logging.getLogger(__name__)

class VerifierAgent:
    def __init__(self):
        self.metrics = {"verifications_passed": 0, "verifications_failed": 0}

    def verify(self, workflow_data):
        """Verify that the remediation was successful and threat is removed."""
        incident_id = workflow_data.get("incident_id")
        logger.info(f"[VerifierAgent] Starting post-remediation verification for {incident_id}")
        
        execution_results = workflow_data.get("execution_results", [])
        incident_ip = workflow_data.get("data", {}).get("ip", "0.0.0.0")
        
        # 1. Confirm Threat Removal (Check if actions succeeded)
        actions_successful = self._confirm_threat_removal(execution_results)
        
        # 2. Check System Health
        health_status = self._check_system_health(incident_ip)
        
        # 3. Final Evaluation
        is_verified = actions_successful and health_status == "Stable"
        
        verification_report = {
            "timestamp": time.time(),
            "status": "VERIFIED_SAFE" if is_verified else "VERIFICATION_FAILED",
            "actions_successful": actions_successful,
            "system_health": health_status,
            "message": "All threat artifacts removed and system is stable." if is_verified else "Remediation incomplete or system unstable."
        }
        
        workflow_data["verification_report"] = verification_report
        
        time.sleep(0.5) # Simulate verification scan
        
        if is_verified:
            self.metrics["verifications_passed"] += 1
            logger.info(f"[VerifierAgent] Incident {incident_id} successfully verified and neutralized.")
            return True
        else:
            self.metrics["verifications_failed"] += 1
            logger.error(f"[VerifierAgent] Incident {incident_id} failed verification! Escalating to Commander.")
            return False

    def _confirm_threat_removal(self, execution_results):
        """Ensure all requested remediation actions returned a SUCCESS status."""
        if not execution_results:
            return True # Nothing was executed, assuming it's safe
            
        for result in execution_results:
            if result.get("status") != "SUCCESS":
                return False
        return True

    def _check_system_health(self, ip):
        """Simulate a post-remediation health ping to ensure the system is stable."""
        # Simulate a 95% success rate for health checks.
        if random.random() > 0.05:
            return "Stable"
        else:
            return "Unstable - High CPU/Anomalous Traffic detected post-remediation"
