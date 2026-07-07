import time
import logging

logger = logging.getLogger(__name__)

class GuardianAgent:
    def __init__(self):
        self.metrics = {"plans_approved": 0, "plans_rejected": 0}

    def validate_plan(self, workflow_data):
        """Validate the remediation plan against organizational policies and risk."""
        incident_id = workflow_data.get("incident_id")
        logger.info(f"[GuardianAgent] Validating remediation plan for incident {incident_id}")
        
        remediation_plan = workflow_data.get("remediation_plan", {})
        actions = remediation_plan.get("actions", [])
        severity = workflow_data.get("severity", "Low")
        
        if not actions:
            logger.warning(f"[GuardianAgent] No actions to validate for {incident_id}. Approving empty plan.")
            workflow_data["guardian_review"] = {"status": "APPROVED", "reason": "No actions to validate."}
            return True
            
        # 1. Check Organizational Policies
        policy_violations = self._check_organizational_policies(actions, workflow_data)
        
        # 2. Perform Risk Assessment
        risk_level = self._perform_risk_assessment(actions, severity)
        
        # 3. Decision Logic
        approved = True
        rejection_reason = ""
        
        if policy_violations:
            approved = False
            rejection_reason = f"Policy Violations Detected: {', '.join(policy_violations)}"
        elif risk_level == "Unacceptable":
            approved = False
            rejection_reason = "Operational risk of automated remediation is Unacceptable."
        elif remediation_plan.get("approval_required", False) and risk_level == "High":
            # For demonstration: If the Planner says human approval is required AND the risk is High, we normally reject auto-execution.
            # Let's approve it for the simulation so the Executor gets to run, but log a warning.
            logger.warning(f"[GuardianAgent] High risk plan requires human approval. Approving for simulation purposes.")
            
        guardian_review = {
            "timestamp": time.time(),
            "status": "APPROVED" if approved else "REJECTED",
            "risk_level": risk_level,
            "policy_violations": policy_violations,
            "reason": "Plan complies with organizational policies." if approved else rejection_reason
        }
        
        workflow_data["guardian_review"] = guardian_review
        
        if approved:
            self.metrics["plans_approved"] += 1
            logger.info(f"[GuardianAgent] Plan APPROVED for {incident_id}.")
            time.sleep(0.5)
            return True
        else:
            self.metrics["plans_rejected"] += 1
            logger.error(f"[GuardianAgent] Plan REJECTED for {incident_id}: {rejection_reason}")
            time.sleep(0.5)
            return False

    def _check_organizational_policies(self, actions, workflow_data):
        """Evaluate actions against mock organizational constraints."""
        violations = []
        issue_details = workflow_data.get("issue_details", {})
        asset_info = issue_details.get("affected_asset", {})
        asset_name = str(asset_info.get("name", "")).lower()
        
        for action in actions:
            action_name = action.get("action", "")
            
            # Rule 1: Do not automatically isolate the main production database
            if action_name == "Isolate Asset from Network" and "database" in asset_name and "prod" in asset_name:
                violations.append("Automated isolation of Production Database is prohibited.")
                
            # Rule 2: Cannot force password resets for service accounts automatically
            if action_name == "Force Password Reset" and "service account" in str(action.get("target", "")).lower():
                violations.append("Automated password reset for Service Accounts is prohibited.")
                
        return violations

    def _perform_risk_assessment(self, actions, severity):
        """Calculate the operational risk of the proposed actions."""
        # Simple heuristic risk calculation
        risk_score = 0
        
        for action in actions:
            action_type = action.get("type", "")
            if action_type == "Containment":
                risk_score += 3
            elif action_type == "Eradication":
                risk_score += 2
            elif action_type == "Mitigation":
                risk_score += 1
                
        if risk_score > 8:
            return "Unacceptable"
        elif risk_score >= 5 or severity == "Critical":
            return "High"
        elif risk_score >= 3:
            return "Medium"
        else:
            return "Low"
