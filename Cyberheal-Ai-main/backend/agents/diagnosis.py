import time
import logging
import json
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
try:
    from llm_provider import generate_reasoning
except ImportError:
    generate_reasoning = None

logger = logging.getLogger(__name__)

class DiagnosisAgent:
    def __init__(self):
        self.metrics = {"diagnoses_completed": 0, "critical_diagnoses": 0}

    def investigate(self, workflow_data):
        """Investigate incident context and identify probable causes."""
        incident_id = workflow_data.get("incident_id")
        logger.info(f"[DiagnosisAgent] Investigating incident {incident_id}")
        
        # Gather context
        ip = workflow_data.get("data", {}).get("ip", "0.0.0.0")
        raw_data = str(workflow_data.get("data", {}).get("raw_data", "")).lower()
        threat_intel = workflow_data.get("enrichment", {}).get("threat_intel", {})
        issue_details = workflow_data.get("issue_details", {})
        
        # 1. Collect Logs (Simulated)
        logs = self._collect_logs(ip, workflow_data.get("data", {}).get("type"))
        
        # 2. Analyze systems & Identify probable causes
        probable_causes = self._analyze_and_identify_causes(logs, raw_data, threat_intel, issue_details)
        
        # 3. Generate Diagnosis Report
        diagnosis_report = {
            "timestamp": time.time(),
            "collected_logs_count": len(logs),
            "simulated_logs": logs,
            "probable_causes": probable_causes,
            "confidence_score": 85 if len(probable_causes) > 0 else 40
        }
        
        # --- AI REASONING ---
        ai_explanation = None
        if generate_reasoning:
            context = f"Event Type: {workflow_data.get('data', {}).get('type')}\nIP: {ip}\nProbable Causes identified by rules: {probable_causes}"
            prompt = "Provide a concise, 2-3 sentence technical explanation of this incident and its root cause."
            ai_explanation = generate_reasoning(prompt, context)
            
        if ai_explanation:
            diagnosis_report["ai_explanation"] = ai_explanation
            logger.info(f"[DiagnosisAgent] AI Reasoning generated successfully.")
        else:
            diagnosis_report["ai_explanation"] = "Static fallback: Incident matches signatures for " + ", ".join(probable_causes)
            
        workflow_data["diagnosis"] = diagnosis_report
        self.metrics["diagnoses_completed"] += 1
        
        if workflow_data.get("severity") in ["High", "Critical"]:
            self.metrics["critical_diagnoses"] += 1
            
        logger.info(f"[DiagnosisAgent] Diagnosis complete for {incident_id}. Causes found: {len(probable_causes)}")
        
        time.sleep(0.5) # Simulate processing
        return True

    def _collect_logs(self, ip, event_type):
        """Simulate pulling system and security logs from the affected asset."""
        simulated_logs = [
            {"source": "syslog", "message": f"Connection received from {ip}"},
            {"source": "auth", "message": f"Authentication attempt state: {event_type}"}
        ]
        
        if event_type == "BRUTE_FORCE":
            simulated_logs.append({"source": "auth", "message": "Multiple failed SSH password attempts"})
        elif event_type == "DDOS":
            simulated_logs.append({"source": "network", "message": "High rate of incoming SYN packets detected"})
            
        return simulated_logs

    def _analyze_and_identify_causes(self, logs, raw_data, threat_intel, issue_details):
        """Run heuristics to find probable causes based on aggregated context."""
        causes = []
        
        # Check Threat Intel matches
        cve_matches = threat_intel.get("cve_matches", [])
        if cve_matches:
            causes.append(f"Exploitation of known vulnerability: {', '.join(cve_matches)}")
            
        ip_rep = threat_intel.get("ip_reputation", {}).get("reputation")
        if ip_rep in ["Poor", "Malicious"]:
            causes.append("Traffic originating from known malicious infrastructure (Botnet/C2)")
            
        # Check Issue Detection logic
        classification = issue_details.get("classification", "")
        if "Critical Asset" in classification:
            causes.append("Targeted attack directed at high-value infrastructure")
            
        # Check raw log data
        if "unauthorized" in raw_data or any("failed" in log["message"].lower() for log in logs):
            causes.append("Compromised Credentials / Brute Force Guessing")
            
        if not causes:
            causes.append("Unknown anomalous behavior requiring deeper forensic review")
            
        return causes
