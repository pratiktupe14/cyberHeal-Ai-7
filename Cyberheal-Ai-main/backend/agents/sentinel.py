import uuid
import time
import logging

logger = logging.getLogger(__name__)

class SentinelAgent:
    def __init__(self, commander_agent):
        self.commander_agent = commander_agent
        self.active_threats = {}

    def analyze(self, normalized_event):
        """Evaluate the normalized event against known anomalies/signatures."""
        logger.info(f"[SentinelAgent] Analyzing event {normalized_event['id']} from {normalized_event['ip']}")
        
        threat_detected = False
        threat_details = []

        raw_data = normalized_event.get("raw_data", {})
        raw_str = str(raw_data).lower()
        
        # 1. Malware/Ransomware detection
        if ".encrypted" in raw_str or "ransom" in raw_str:
            threat_detected = True
            threat_details.append("Ransomware signature detected")
            
        # 2. DDoS / Brute Force detection
        failed_attempts = normalized_event.get("failedAttempts", 0)
        event_type = normalized_event.get("type", "UNKNOWN")
        
        if failed_attempts > 20 or event_type == "DDOS":
            threat_detected = True
            threat_details.append(f"DDoS/Brute Force signature (attempts: {failed_attempts})")
        elif failed_attempts > 5:
            threat_detected = True
            threat_details.append(f"Suspicious repeated failures (attempts: {failed_attempts})")
            
        # 3. Anomaly detection
        if event_type == "LOG_ANOMALY" and "unauthorized" in raw_str:
            threat_detected = True
            threat_details.append("Unauthorized access attempt logged")
            
        # Fallback for "SIMULATED_EVENT"
        if event_type == "SIMULATED_EVENT":
            threat_detected = True
            threat_details.append("Simulated security event triggered")

        if threat_detected:
            return self._create_incident(normalized_event, threat_details)
        else:
            logger.info(f"[SentinelAgent] No threats detected in event {normalized_event['id']}")
            return None, None

    def _create_incident(self, event, threat_details):
        """Package the threat findings into a structured incident."""
        incident_id = str(uuid.uuid4())
        
        incident = {
            "incident_id": incident_id,
            "source_event_id": event["id"],
            "timestamp": time.time(),
            "threat_details": threat_details,
            "ip": event.get("ip"),
            "status": "DETECTED",
            "event_data": event
        }
        
        self.active_threats[incident_id] = incident
        logger.warning(f"[SentinelAgent] THREAT DETECTED: {threat_details}. Incident {incident_id} created.")
        
        return self._forward_to_commander(incident)

    def _forward_to_commander(self, incident):
        """Dispatch the confirmed incident to the CommanderAgent."""
        logger.info(f"[SentinelAgent] Forwarding incident {incident['incident_id']} to CommanderAgent")
        # We pass the original normalized event data since Commander's analyze_severity expects "failedAttempts" and "type"
        return self.commander_agent.process_incident(incident["event_data"])
