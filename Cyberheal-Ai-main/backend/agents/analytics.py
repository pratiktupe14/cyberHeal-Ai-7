import logging
import time

from sqlalchemy.orm import Session
from sqlalchemy import func
import models
import datetime

logger = logging.getLogger(__name__)

class AnalyticsAgent:
    """
    AnalyticsAgent aggregates data from the database to generate enterprise-level intelligence metrics.
    """
    def __init__(self, memory_agent=None, knowledge_base=None, commander_agent=None):
        self.memory_agent = memory_agent
        self.knowledge_base = knowledge_base
        self.commander_agent = commander_agent

    def generate_dashboard_metrics(self, db: Session, timeframe: str = "30d"):
        """Generate high-level threat analytics and AI performance metrics from DB."""
        now = time.time()
        
        # Calculate start_time
        start_time = 0
        if timeframe == "24h":
            start_time = now - (24 * 60 * 60)
        elif timeframe == "7d":
            start_time = now - (7 * 24 * 60 * 60)
        elif timeframe == "30d":
            start_time = now - (30 * 24 * 60 * 60)
        elif timeframe == "today":
            # Rough estimate of today since midnight UTC
            start_time = now - (now % 86400)
            
        # Get incidents
        incidents = db.query(models.Incident).filter(models.Incident.created_at >= start_time).all()
        total_incidents = len(incidents)
        
        false_positives = sum(1 for inc in incidents if inc.status in ["False Positive", "Dropped"])
        true_positives = total_incidents - false_positives
        
        detection_accuracy = (true_positives / total_incidents * 100) if total_incidents > 0 else 0
        false_positive_rate = (false_positives / total_incidents * 100) if total_incidents > 0 else 0
        
        # Mean Response Time
        completed_workflows = db.query(models.WorkflowHistory).filter(models.WorkflowHistory.timestamp >= start_time).all()
        
        incident_times = {inc.id: inc.created_at for inc in incidents}
        response_times = []
        for wf in completed_workflows:
            if wf.incident_id in incident_times and (wf.status == "Completed" or wf.status == "Resolved" or wf.step == "FinalStatusAgent"):
                response_times.append((wf.timestamp - incident_times[wf.incident_id]) / 60.0) # in minutes
                
        mean_response_time = sum(response_times) / len(response_times) if response_times else 0
        
        # Severity Distribution
        severity_dist = {"Critical": 0, "High": 0, "Medium": 0, "Low": 0, "Informational": 0}
        for inc in incidents:
            sev = inc.severity or "Informational"
            if sev in severity_dist:
                severity_dist[sev] += 1
            else:
                severity_dist["Informational"] += 1
                
        # Threats Over Time
        threats_over_time = {}
        for inc in incidents:
            dt = datetime.datetime.fromtimestamp(inc.created_at)
            key = dt.strftime("%Y-%m-%d %H:00") if timeframe in ["24h", "today"] else dt.strftime("%Y-%m-%d")
            t_type = inc.event_type or "Unknown"
            
            if key not in threats_over_time:
                threats_over_time[key] = {}
            if t_type not in threats_over_time[key]:
                threats_over_time[key][t_type] = 0
            threats_over_time[key][t_type] += 1
            
        # Format for charts
        timeline_labels = sorted(list(threats_over_time.keys()))
        event_types = set()
        for key in threats_over_time:
            event_types.update(threats_over_time[key].keys())
            
        threat_timeline_datasets = []
        for t_type in event_types:
            dataset = {
                "label": t_type,
                "data": [threats_over_time[lbl].get(t_type, 0) for lbl in timeline_labels]
            }
            threat_timeline_datasets.append(dataset)
            
        # AI Pulse Insights
        most_common_threat = None
        highest_severity = "None"
        if incidents:
            type_counts = {}
            for inc in incidents:
                type_counts[inc.event_type] = type_counts.get(inc.event_type, 0) + 1
            if type_counts:
                most_common_threat = max(type_counts, key=type_counts.get)
            if any(inc.severity == "Critical" for inc in incidents):
                highest_severity = "Critical"
            elif any(inc.severity == "High" for inc in incidents):
                highest_severity = "High"

        insights = "No AI insights available."
        if total_incidents > 0:
            insights = f"Detected {total_incidents} anomalies. Most frequent threat vector: {most_common_threat}. "
            if highest_severity in ["Critical", "High"]:
                insights += f"High severity attack patterns require attention. "
            if false_positives > (total_incidents * 0.1):
                insights += "False positive rate is elevated. Tuning Sentinel rules recommended."
                
        # Active Agents
        active_workflows_count = 0
        if self.commander_agent:
            active_workflows_count = len(self.commander_agent.active_workflows)

        return {
            "threat_analytics": {
                "total_historical_incidents": total_incidents,
                "active_incidents": active_workflows_count,
                "severity_distribution": [severity_dist["Critical"], severity_dist["High"], severity_dist["Medium"], severity_dist["Low"], severity_dist["Informational"]],
                "threats_over_time": {
                    "labels": timeline_labels,
                    "datasets": threat_timeline_datasets
                },
                "insights": insights,
                "most_common_threat": most_common_threat
            },
            "ai_performance": {
                "detection_accuracy": round(detection_accuracy, 2),
                "mean_response_time_min": round(mean_response_time, 2),
                "false_positive_rate": round(false_positive_rate, 2),
                "resolution_rate": round((true_positives / total_incidents * 100), 2) if total_incidents > 0 else 100.0
            },
            "timestamp": now
        }
