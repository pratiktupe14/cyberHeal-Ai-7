import logging
import time
import random
import asyncio

logger = logging.getLogger(__name__)

class MonitorAgent:
    """
    MonitorAgent continuously checks the health of servers, cloud environments,
    databases, applications, and endpoints.
    """
    def __init__(self, commander_agent=None, notification_agent=None):
        self.commander_agent = commander_agent
        self.notification_agent = notification_agent
        
        self.infrastructure = {
            "servers": {"status": "Healthy", "uptime": 99.9},
            "cloud": {"status": "Healthy", "uptime": 99.99},
            "databases": {"status": "Healthy", "uptime": 99.95},
            "applications": {"status": "Healthy", "uptime": 99.8},
            "endpoints": {"status": "Healthy", "uptime": 99.5}
        }
        self.is_monitoring = False

    async def start_monitoring(self):
        """Continuously monitor infrastructure in the background."""
        self.is_monitoring = True
        logger.info("[MonitorAgent] Started continuous monitoring loop.")
        while self.is_monitoring:
            self._perform_health_check()
            await asyncio.sleep(60) # Simulate checking every 60 seconds

    def stop_monitoring(self):
        self.is_monitoring = False

    def _perform_health_check(self):
        """Simulate health checks and trigger alerts if something goes wrong."""
        unhealthy_services = []
        
        for component in self.infrastructure.keys():
            # Randomly simulate a rare failure (2% chance) for demonstration
            if random.random() < 0.02:
                self.infrastructure[component]["status"] = "Degraded"
                unhealthy_services.append(component)
            elif self.infrastructure[component]["status"] == "Degraded":
                # Recover after a bit (50% chance)
                if random.random() < 0.50:
                    self.infrastructure[component]["status"] = "Healthy"
                    
        if unhealthy_services:
            self.trigger_alerts(unhealthy_services)
            self.report_to_commander(unhealthy_services)

    def trigger_alerts(self, unhealthy_services):
        """Trigger notifications for unhealthy services."""
        msg = f"Health check failed for: {', '.join(unhealthy_services)}"
        logger.warning(f"[MonitorAgent] ⚠️ {msg}")
        
        if self.notification_agent:
            self.notification_agent.send_slack_alert("#infrastructure-alerts", msg)
            self.notification_agent.send_teams_alert("Infra-Ops", msg)

    def report_to_commander(self, unhealthy_services):
        """Report issues directly to CommanderAgent if they need automated remediation."""
        if self.commander_agent:
            # We can mock creating a system incident
            incident_data = {
                "type": "INFRASTRUCTURE_DEGRADATION",
                "failedAttempts": 1,
                "Message": f"Degradation detected in {unhealthy_services}",
                "ProviderName": "MonitorAgent"
            }
            incident_id, workflow = self.commander_agent.process_incident(incident_data)
            logger.info(f"[MonitorAgent] Reported degradation to Commander, initiated workflow {incident_id}")

    def get_status(self):
        """Return the current infrastructure health."""
        return self.infrastructure
