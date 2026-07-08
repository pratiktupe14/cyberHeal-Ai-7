import time
import logging
import os
import json
import urllib.request
import urllib.error

from database import SessionLocal
import models

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
        
        ti_reputation = None
        if incident_ip and incident_ip != "0.0.0.0":
            # Attempt real API lookups first
            ti_reputation = self._fetch_virustotal(incident_ip, incident_id)
            if not ti_reputation:
                ti_reputation = self._fetch_abuseipdb(incident_ip, incident_id)
            if not ti_reputation:
                ti_reputation = self._fetch_alienvault(incident_ip, incident_id)
                
        if ti_reputation:
            enrichment_data["ip_reputation"] = ti_reputation
            self.enrichment_stats["hits"] += 1
            logger.warning(f"[ThreatIntelAgent] Real TI matched known threat: {ti_reputation}")
        elif incident_ip in self.mock_threat_db["ips"]:
            enrichment_data["ip_reputation"] = self.mock_threat_db["ips"][incident_ip]
            self.enrichment_stats["hits"] += 1
            logger.warning(f"[ThreatIntelAgent] IP {incident_ip} matched mock threat: {enrichment_data['ip_reputation']}")
        else:
            enrichment_data["ip_reputation"] = {"reputation": "Neutral", "tags": []}

        # 2. Match CVEs / Signatures
        raw_data = str(workflow_data.get("data", {}).get("raw_data", "")).lower()
        
        # Check against mock signatures to get a potential CVE
        potential_cves = []
        for signature, cve in self.mock_threat_db["signatures"].items():
            if signature in raw_data:
                potential_cves.append(cve)
                
        if potential_cves:
            # For each potential CVE, enrich it with external APIs
            for cve in potential_cves:
                cve_details = self._fetch_nvd(cve, incident_id)
                if not cve_details:
                    cve_details = self._fetch_cve_db(cve, incident_id)
                
                # Fetch CISA KEV
                is_kev = self._fetch_cisa_kev(cve, incident_id)
                
                # Fetch MITRE mapping (simulated via NVD tags usually, but we mock a lookup)
                mitre_tags = self._fetch_mitre(cve, incident_id)
                
                if cve_details:
                    enrichment_data["cve_matches"].append(f"{cve} (CVSS: {cve_details.get('cvss', 'N/A')}) - {mitre_tags}")
                    if is_kev:
                        enrichment_data["cve_matches"][-1] += " [CISA KEV MATCH]"
                    self.enrichment_stats["hits"] += 1
                    logger.warning(f"[ThreatIntelAgent] Real TI matched signature {cve}")
                else:
                    # Fallback
                    enrichment_data["cve_matches"].append(cve)
                    self.enrichment_stats["hits"] += 1
                    logger.warning(f"[ThreatIntelAgent] Matched mock signature {cve}")

        # Update workflow data
        if "enrichment" not in workflow_data:
            workflow_data["enrichment"] = {}
        
        workflow_data["enrichment"]["threat_intel"] = enrichment_data
        
        # Simulate processing time
        time.sleep(0.5)
        logger.info(f"[ThreatIntelAgent] Enrichment complete for incident {incident_id}")
        
        return True

    def _fetch_virustotal(self, ip, incident_id):
        api_key = os.getenv("VT_API_KEY")
        if not api_key: return None
        url = f"https://www.virustotal.com/api/v3/ip_addresses/{ip}"
        req = urllib.request.Request(url, headers={'x-apikey': api_key})
        try:
            with urllib.request.urlopen(req, timeout=5) as response:
                data = json.loads(response.read().decode('utf-8'))
                self._persist_ti(incident_id, "VirusTotal", ip, data)
                stats = data.get("data", {}).get("attributes", {}).get("last_analysis_stats", {})
                if stats.get("malicious", 0) > 0:
                    return {"reputation": "Malicious", "tags": ["VT Match"]}
        except Exception as e:
            logger.warning(f"[ThreatIntelAgent] VirusTotal error for {ip}: {e}")
        return None

    def _fetch_abuseipdb(self, ip, incident_id):
        api_key = os.getenv("ABUSEIPDB_API_KEY")
        if not api_key: return None
        url = f"https://api.abuseipdb.com/api/v2/check?ipAddress={ip}&maxAgeInDays=90"
        req = urllib.request.Request(url, headers={'Key': api_key, 'Accept': 'application/json'})
        try:
            with urllib.request.urlopen(req, timeout=5) as response:
                data = json.loads(response.read().decode('utf-8'))
                self._persist_ti(incident_id, "AbuseIPDB", ip, data)
                score = data.get("data", {}).get("abuseConfidenceScore", 0)
                if score > 50:
                    return {"reputation": "Malicious", "tags": ["AbuseIPDB Match"]}
        except Exception as e:
            logger.warning(f"[ThreatIntelAgent] AbuseIPDB error for {ip}: {e}")
        return None

    def _fetch_alienvault(self, ip, incident_id):
        api_key = os.getenv("ALIENVAULT_API_KEY")
        url = f"https://otx.alienvault.com/api/v1/indicators/IPv4/{ip}/general"
        headers = {}
        if api_key: headers['X-OTX-API-KEY'] = api_key
        req = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=5) as response:
                data = json.loads(response.read().decode('utf-8'))
                self._persist_ti(incident_id, "AlienVault OTX", ip, data)
                pulse_count = data.get("pulse_info", {}).get("count", 0)
                if pulse_count > 2:
                    return {"reputation": "Poor", "tags": ["OTX Pulses"]}
        except Exception as e:
            logger.warning(f"[ThreatIntelAgent] AlienVault error for {ip}: {e}")
        return None

    def _fetch_nvd(self, cve_id, incident_id):
        # Base CVE format is usually "CVE-YYYY-NNNN"
        # Since we use mock strings like "CVE-2021-34527 (Ransomware signature)", extract just the CVE ID
        actual_cve = cve_id.split(" ")[0]
        url = f"https://services.nvd.nist.gov/rest/json/cves/2.0?cveId={actual_cve}"
        api_key = os.getenv("NVD_API_KEY")
        headers = {'apiKey': api_key} if api_key else {}
        req = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=5) as response:
                data = json.loads(response.read().decode('utf-8'))
                if data.get("totalResults", 0) > 0:
                    self._persist_ti(incident_id, "NVD", actual_cve, data)
                    vuln = data["vulnerabilities"][0]["cve"]
                    return {"cvss": "High"} # Simplified parsing
        except Exception as e:
            logger.warning(f"[ThreatIntelAgent] NVD error for {actual_cve}: {e}")
        return None

    def _fetch_cve_db(self, cve_id, incident_id):
        actual_cve = cve_id.split(" ")[0]
        url = f"https://cveawg.mitre.org/api/cve/{actual_cve}"
        try:
            with urllib.request.urlopen(url, timeout=5) as response:
                data = json.loads(response.read().decode('utf-8'))
                self._persist_ti(incident_id, "CVE Database", actual_cve, data)
                return {"cvss": "Unknown"}
        except Exception as e:
            logger.warning(f"[ThreatIntelAgent] CVE DB error for {actual_cve}: {e}")
        return None

    def _fetch_cisa_kev(self, cve_id, incident_id):
        actual_cve = cve_id.split(" ")[0]
        url = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"
        # In a real app we would cache this file, but for demonstration:
        try:
            with urllib.request.urlopen(url, timeout=5) as response:
                data = json.loads(response.read().decode('utf-8'))
                vulnerabilities = data.get("vulnerabilities", [])
                for v in vulnerabilities:
                    if v.get("cveID") == actual_cve:
                        self._persist_ti(incident_id, "CISA KEV", actual_cve, v)
                        return True
        except Exception as e:
            logger.warning(f"[ThreatIntelAgent] CISA KEV error: {e}")
        return False

    def _fetch_mitre(self, cve_id, incident_id):
        # Simulating MITRE ATT&CK lookup since there is no direct public API for CVE -> TTP matching without CTRE/similar
        # We will log a simulated lookup
        actual_cve = cve_id.split(" ")[0]
        simulated_data = {"tactic": "Initial Access", "technique": "Exploit Public-Facing Application (T1190)"}
        self._persist_ti(incident_id, "MITRE ATT&CK", actual_cve, simulated_data)
        return simulated_data["technique"]

    def _persist_ti(self, incident_id, provider, indicator, data):
        if not incident_id: return
        try:
            with SessionLocal() as db:
                record = models.ThreatIntelRecord(
                    incident_id=incident_id,
                    provider=provider,
                    indicator=indicator,
                    data=data,
                    timestamp=time.time()
                )
                db.add(record)
                db.commit()
        except Exception as e:
            logger.error(f"[ThreatIntelAgent] DB Error saving TI from {provider}: {e}")

