import logging
import time

logger = logging.getLogger(__name__)

class NotificationAgent:
    """
    NotificationAgent handles outbound alerts across various channels:
    Email, Push Notifications, Slack, Teams, and Escalations.
    """
    def __init__(self):
        self.notification_log = []
        self.metrics = {
            "emails_sent": 0,
            "push_sent": 0,
            "slack_alerts": 0,
            "teams_alerts": 0,
            "escalations": 0
        }

    def _log_notification(self, channel, message, recipient):
        entry = {
            "channel": channel,
            "recipient": recipient,
            "message": message,
            "timestamp": time.time()
        }
        self.notification_log.append(entry)
        
        # Keep log size manageable
        if len(self.notification_log) > 100:
            self.notification_log.pop(0)

    def send_email(self, recipient, subject, body):
        logger.info(f"[NotificationAgent] 📧 Email to {recipient}: {subject}")
        self._log_notification("email", f"Subject: {subject}", recipient)
        self.metrics["emails_sent"] += 1
        return True

    def send_push(self, user_id, message):
        logger.info(f"[NotificationAgent] 📱 Push to {user_id}: {message}")
        self._log_notification("push", message, user_id)
        self.metrics["push_sent"] += 1
        return True

    def send_slack_alert(self, channel, message):
        logger.info(f"[NotificationAgent] 💬 Slack Alert to {channel}: {message}")
        self._log_notification("slack", message, channel)
        self.metrics["slack_alerts"] += 1
        return True

    def send_teams_alert(self, channel, message):
        logger.info(f"[NotificationAgent] 👥 Teams Alert to {channel}: {message}")
        self._log_notification("teams", message, channel)
        self.metrics["teams_alerts"] += 1
        return True

    def notify_administrators(self, incident_data, severity="CRITICAL"):
        """Notify admins of critical incidents across all relevant channels."""
        incident_id = incident_data.get("incident_id", "UNKNOWN")
        msg = f"CRITICAL INCIDENT {incident_id}: Immediate attention required."
        
        self.send_email("admins@cyberheal.ai", "Critical Security Alert", msg)
        self.send_slack_alert("#security-critical", msg)
        self.send_teams_alert("SOC-Team-Channel", msg)
        self.send_push("admin_group", msg)
        
        logger.warning(f"[NotificationAgent] 🚨 Administrators notified for incident {incident_id}.")

    def escalate(self, incident_id, reason):
        """Handle escalation notifications."""
        msg = f"ESCALATION for {incident_id}: {reason}"
        self.send_email("tier3@cyberheal.ai", "Incident Escalated", msg)
        self.send_slack_alert("#soc-tier3", msg)
        self.metrics["escalations"] += 1
        logger.warning(f"[NotificationAgent] ⬆️ Escalated incident {incident_id}.")
        return True
