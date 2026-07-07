import time
import logging

logger = logging.getLogger(__name__)

class CausorAgent:
    def __init__(self):
        self.metrics = {"rcas_generated": 0}

    def perform_rca(self, workflow_data):
        """Perform Root Cause Analysis on the incident context."""
        incident_id = workflow_data.get("incident_id")
        logger.info(f"[CausorAgent] Performing RCA for incident {incident_id}")
        
        # Gather context
        diagnosis = workflow_data.get("diagnosis", {})
        threat_intel = workflow_data.get("enrichment", {}).get("threat_intel", {})
        issue_details = workflow_data.get("issue_details", {})
        
        # 1. Identify Compromised Assets
        compromised_assets = self._identify_compromised_assets(issue_details, workflow_data.get("severity"))
        
        # 2. Determine Attack Path
        attack_path = self._determine_attack_path(diagnosis, threat_intel, workflow_data.get("data", {}).get("type"))
        
        # 3. Generate RCA Report
        root_cause = diagnosis.get("probable_causes", ["Unknown Cause"])[0] if diagnosis.get("probable_causes") else "Unknown Cause"
        
        rca_report = {
            "timestamp": time.time(),
            "root_cause_summary": root_cause,
            "attack_path": attack_path,
            "compromised_assets": compromised_assets,
            "confidence": min(100, diagnosis.get("confidence_score", 50) + 10) # Slightly higher confidence after synthesis
        }
        
        workflow_data["rca_report"] = rca_report
        self.metrics["rcas_generated"] += 1
            
        logger.info(f"[CausorAgent] RCA complete for {incident_id}. Attack path steps: {len(attack_path)}")
        
        time.sleep(0.5) # Simulate processing
        return True

    def _identify_compromised_assets(self, issue_details, severity):
        """Review affected assets and classify compromise status."""
        asset_info = issue_details.get("affected_asset", {"name": "Unknown", "criticality": 0})
        status = "At Risk - Under Investigation"
        
        if severity == "Critical":
            status = "Confirmed Compromised - Critical Breach"
        elif severity == "High":
            status = "Likely Compromised - Pending Deep Scan"
            
        return [{
            "asset_name": asset_info["name"],
            "criticality": asset_info["criticality"],
            "status": status
        }]

    def _determine_attack_path(self, diagnosis, threat_intel, event_type):
        """Map out a timeline/path based on the diagnostic heuristics."""
        path = []
        cve_matches = threat_intel.get("cve_matches", [])
        
        # Start of path
        if threat_intel.get("ip_reputation", {}).get("reputation") in ["Poor", "Malicious"]:
            path.append("1. Malicious IP initiated connection (Botnet/C2 Infrastructure)")
        else:
            path.append("1. External connection initiated from unknown/neutral IP")
            
        # Middle of path
        if cve_matches:
            path.append(f"2. Payload deployed targeting vulnerability: {cve_matches[0]}")
        elif event_type == "BRUTE_FORCE":
            path.append("2. High-frequency authentication guessing (Brute Force)")
        elif event_type == "DDOS":
            path.append("2. Volumetric traffic flood (SYN flood/DDoS)")
        else:
            path.append("2. Anomalous traffic pattern detected")
            
        # End of path
        causes = diagnosis.get("probable_causes", [])
        if "Compromised Credentials / Brute Force Guessing" in causes:
            path.append("3. Authentication successful; Unauthorized access gained")
        elif "Targeted attack directed at high-value infrastructure" in causes:
            path.append("3. Lateral movement towards critical database/gateway")
        else:
            path.append("3. System monitoring triggered active alert")
            
        return path
