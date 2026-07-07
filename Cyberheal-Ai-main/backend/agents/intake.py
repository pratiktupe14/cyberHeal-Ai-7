import uuid
import time
import logging

logger = logging.getLogger(__name__)

class IntakeAgent:
    def __init__(self, commander_agent):
        self.stored_events = {}
        self.commander_agent = commander_agent

    def receive_event(self, source, raw_data):
        """Entry point for receiving telemetry from various sources."""
        if not self._validate(source, raw_data):
            logger.error(f"[IntakeAgent] Validation failed for source {source}")
            raise ValueError("Invalid event payload")
            
        normalized_event = self._normalize(source, raw_data)
        self._store(normalized_event)
        
        # Forward to SentinelAgent (Stubbed)
        return self._forward_to_sentinel(normalized_event)

    def _validate(self, source, raw_data):
        """Validate critical fields exist."""
        if not isinstance(raw_data, dict):
            return False
            
        if source == "webhook":
            return "ip" in raw_data and "type" in raw_data
        elif source == "log":
            return "message" in raw_data
        elif source in ["endpoint", "cloud", "network"]:
            return "id" in raw_data or "ip" in raw_data
            
        return True # Default allow for unknown sources

    def _normalize(self, source, raw_data):
        """Convert disparate schemas into Standard Event Format (SEF)."""
        event_id = str(uuid.uuid4())
        timestamp = time.time()
        
        # Handle different structures
        ip = raw_data.get("ip", "0.0.0.0")
        event_type = raw_data.get("type", "UNKNOWN_EVENT")
        failed_attempts = raw_data.get("failedAttempts", 0)
        
        if source == "log":
            event_type = "LOG_ANOMALY"
            ip = raw_data.get("source_ip", "0.0.0.0")
            
        normalized = {
            "id": event_id,
            "timestamp": timestamp,
            "source_type": source,
            "type": event_type,
            "ip": ip,
            "failedAttempts": failed_attempts,
            "raw_data": raw_data
        }
        
        return normalized

    def _store(self, normalized_event):
        """Store the event in-memory."""
        self.stored_events[normalized_event["id"]] = normalized_event
        logger.info(f"[IntakeAgent] Stored event {normalized_event['id']}")

    def _forward_to_sentinel(self, normalized_event):
        """Stub for SentinelAgent. Right now, it passes directly to CommanderAgent."""
        logger.info(f"[IntakeAgent] Forwarding event {normalized_event['id']} to SentinelAgent...")
        
        # Simulation of SentinelAgent threat detection
        time.sleep(0.5) 
        
        # Sentinel analyzes and then passes to Commander.
        return self.commander_agent.process_incident(normalized_event)
