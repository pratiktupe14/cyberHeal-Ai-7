import time
import logging

logger = logging.getLogger(__name__)

class ThreatIntelAgent:
    def __init__(self):
        # Local mock database of known malicious indicators
        self.mock_threat_db = {
            "ips": {
                "192.168.1.100": {"reputation": "Poor", "tags": ["Botnet", "Brute-forcer"]},
                "10.0.0.5": {"reputation": "Malicious", "tags": ["C2 Server"]},
                "203.0.113.42": {"reputation": "Suspicious", "tags": ["Scanner"]}
            },
            "signatures": {
                ".encrypted": "CVE-2021-34527 (Ransomware signature)",
                "struts": "CVE-2017-5638 (Apache Struts RCE)",
                "log4j": "CVE-2021-44228 (Log4Shell)"
            }
        }
        self.enrichment_stats = {"total_processed": 0, "hits": 0}

    def enrich_incident(self, workflow_data):
        """Enrich the incident state with threat intelligence."""
        incident_id = workflow_data.get("incident_id")
        logger.info(f"[ThreatIntelAgent] Enriching incident {incident_id}")
        
        self.enrichment_stats["total_processed"] += 1
        
        enrichment_data = {
            "timestamp": time.time(),
            "ip_reputation": {},
            "cve_matches": []
        }
        
        # 1. Check IP Reputation
        incident_ip = workflow_data.get("data", {}).get("ip", "")
        if incident_ip in self.mock_threat_db["ips"]:
            enrichment_data["ip_reputation"] = self.mock_threat_db["ips"][incident_ip]
            self.enrichment_stats["hits"] += 1
            logger.warning(f"[ThreatIntelAgent] IP {incident_ip} matched known threat: {enrichment_data['ip_reputation']}")
        else:
            enrichment_data["ip_reputation"] = {"reputation": "Neutral", "tags": []}

        # 2. Match CVEs / Signatures
        raw_data = str(workflow_data.get("data", {}).get("raw_data", "")).lower()
        for signature, cve in self.mock_threat_db["signatures"].items():
            if signature in raw_data:
                enrichment_data["cve_matches"].append(cve)
                self.enrichment_stats["hits"] += 1
                logger.warning(f"[ThreatIntelAgent] Matched signature {signature} -> {cve}")

        # Update workflow data
        if "enrichment" not in workflow_data:
            workflow_data["enrichment"] = {}
        
        workflow_data["enrichment"]["threat_intel"] = enrichment_data
        
        # Simulate processing time
        time.sleep(0.5)
        logger.info(f"[ThreatIntelAgent] Enrichment complete for incident {incident_id}")
        
        return True
