import time
import logging

logger = logging.getLogger(__name__)

class IssueDetectorAgent:
    def __init__(self, commander_agent):
        self.commander_agent = commander_agent
        self.mock_asset_db = {
            "192.168.1.100": {"name": "HR Database Server", "criticality": 9},
            "10.0.0.5": {"name": "Public API Gateway", "criticality": 7},
            "203.0.113.42": {"name": "External Firewall", "criticality": 10},
            "0.0.0.0": {"name": "Unknown Endpoint", "criticality": 3}
        }
        self.metrics = {"issues_detected": 0, "high_priority_issues": 0}

    def detect_and_classify(self, workflow_data):
        """Identify assets, correlate alerts, and assign priority."""
        incident_id = workflow_data.get("incident_id")
        logger.info(f"[IssueDetectorAgent] Analyzing incident {incident_id}")
        
        incident_ip = workflow_data.get("data", {}).get("ip", "0.0.0.0")
        severity = workflow_data.get("severity", "Low")
        
        # 1. Detect Affected Assets
        asset_info = self.mock_asset_db.get(incident_ip, {"name": f"Unknown Asset ({incident_ip})", "criticality": 5})
        
        # 2. Correlate Alerts (check Commander's active workflows for similar IPs)
        correlated_incident_ids = []
        if self.commander_agent:
            for active_id, active_wf in self.commander_agent.active_workflows.items():
                if active_id != incident_id and active_wf.get("data", {}).get("ip") == incident_ip:
                    correlated_incident_ids.append(active_id)
        
        # 3. Classify and Assign Priority
        severity_multiplier = {"Low": 1, "Medium": 2, "High": 3, "Critical": 4}
        base_priority = severity_multiplier.get(severity, 1) * 10
        
        # Factor in asset criticality and correlated events
        priority_score = min(100, base_priority + (asset_info["criticality"] * 5) + (len(correlated_incident_ids) * 10))
        
        classification = "Standard Event"
        if priority_score > 80:
            classification = "Critical Asset Compromise"
        elif priority_score > 50:
            classification = "Targeted Attack"
            
        issue_details = {
            "timestamp": time.time(),
            "affected_asset": asset_info,
            "correlated_incidents": correlated_incident_ids,
            "classification": classification,
            "priority_score": priority_score
        }
        
        workflow_data["issue_details"] = issue_details
        self.metrics["issues_detected"] += 1
        if priority_score > 70:
            self.metrics["high_priority_issues"] += 1
            
        logger.info(f"[IssueDetectorAgent] Incident {incident_id} classified as {classification} with priority {priority_score}")
        
        # Simulate processing delay
        time.sleep(0.5)
        return True
