import time
import logging

logger = logging.getLogger(__name__)

class PlannerAgent:
    def __init__(self):
        self.metrics = {"plans_generated": 0}

    def generate_plan(self, workflow_data):
        """Generate a remediation strategy and execution plan."""
        incident_id = workflow_data.get("incident_id")
        logger.info(f"[PlannerAgent] Generating plan for incident {incident_id}")
        
        # Gather context
        rca_report = workflow_data.get("rca_report", {})
        severity = workflow_data.get("severity", "Low")
        
        # 1. Build Remediation Strategy
        actions = self._build_remediation_strategy(rca_report, severity)
        
        # 2. Prioritize Actions
        prioritized_actions = self._prioritize_actions(actions)
        
        # 3. Estimate Recovery Time (TTR)
        estimated_ttr = self._estimate_recovery_time(severity, len(prioritized_actions))
        
        # 4. Generate Execution Plan
        remediation_plan = {
            "timestamp": time.time(),
            "strategy": "Containment and Eradication" if severity in ["High", "Critical"] else "Monitoring and Tuning",
            "actions": prioritized_actions,
            "estimated_ttr_minutes": estimated_ttr,
            "approval_required": severity in ["Critical"] # Critical automated actions might need human sign-off
        }
        
        workflow_data["remediation_plan"] = remediation_plan
        self.metrics["plans_generated"] += 1
            
        logger.info(f"[PlannerAgent] Plan generated for {incident_id}. TTR: {estimated_ttr}m, Actions: {len(prioritized_actions)}")
        
        time.sleep(0.5) # Simulate processing
        return True

    def _build_remediation_strategy(self, rca_report, severity):
        """Select remediation steps based on root cause and attack path."""
        actions = []
        root_cause = rca_report.get("root_cause_summary", "")
        
        if "Compromised Credentials" in root_cause:
            actions.append({"action": "Force Password Reset", "target": "Affected Users", "type": "Eradication"})
            actions.append({"action": "Revoke Active Sessions", "target": "Identity Provider", "type": "Containment"})
            
        if "Exploitation of known vulnerability" in root_cause:
            actions.append({"action": "Isolate Asset from Network", "target": "Compromised Assets", "type": "Containment"})
            actions.append({"action": "Deploy Virtual Patch / Block Signature", "target": "WAF", "type": "Mitigation"})
            
        if "Malicious IP" in str(rca_report.get("attack_path", [])):
            actions.append({"action": "Add IP to Perimeter Blocklist", "target": "Firewall", "type": "Containment"})
            
        if not actions:
            actions.append({"action": "Increase Monitoring and Logging", "target": "Affected Systems", "type": "Monitoring"})
            
        return actions

    def _prioritize_actions(self, actions):
        """Sort actions to ensure containment happens before eradication/recovery."""
        priority_order = {"Containment": 1, "Mitigation": 2, "Eradication": 3, "Monitoring": 4}
        
        for action in actions:
            action["priority_level"] = priority_order.get(action["type"], 5)
            
        return sorted(actions, key=lambda x: x["priority_level"])

    def _estimate_recovery_time(self, severity, action_count):
        """Estimate Time To Remediate (TTR) in minutes."""
        base_time = 15
        if severity == "Critical":
            base_time = 60
        elif severity == "High":
            base_time = 45
        elif severity == "Medium":
            base_time = 30
            
        return base_time + (action_count * 10)
