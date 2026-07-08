import logging
import time
import os
import json
import csv

logger = logging.getLogger(__name__)

class ReportAgent:
    """
    ReportAgent generates, schedules, and exports incident, compliance,
    and audit reports in PDF and CSV formats.
    """
    def __init__(self, memory_agent=None, knowledge_base=None, output_dir="reports/"):
        self.memory_agent = memory_agent
        self.knowledge_base = knowledge_base
        self.output_dir = output_dir
        self.scheduled_reports = []
        self.metrics = {
            "incident_reports": 0,
            "compliance_reports": 0,
            "audit_reports": 0,
            "exports": 0
        }
        
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)

    def generate_incident_report(self, incident_id):
        """Generate a detailed report for a specific incident."""
        data = {"incident_id": incident_id, "timestamp": time.time(), "details": "Simulated incident details."}
        if self.memory_agent:
            for memory in self.memory_agent.memories:
                if memory.get("incident_id") == incident_id:
                    data = memory
                    break
        self.metrics["incident_reports"] += 1
        return data

    def generate_compliance_report(self):
        """Generate an aggregated compliance report."""
        data = {
            "timestamp": time.time(),
            "compliance_status": "PASS",
            "controls_checked": 42,
            "total_incidents_handled": self.memory_agent.metrics.get("items_stored", 0) if self.memory_agent else 0
        }
        self.metrics["compliance_reports"] += 1
        return data

    def generate_audit_report(self):
        """Generate a system-wide audit report."""
        data = {
            "timestamp": time.time(),
            "audit_scope": "Full System",
            "knowledge_base_stats": self.knowledge_base.get_insights() if self.knowledge_base else {}
        }
        self.metrics["audit_reports"] += 1
        return data

    def export_csv(self, data, filename):
        """Export given report data to CSV."""
        filepath = os.path.join(self.output_dir, filename)
        try:
            with open(filepath, "w", newline="") as f:
                if isinstance(data, dict):
                    writer = csv.writer(f)
                    for k, v in data.items():
                        writer.writerow([k, v])
                elif isinstance(data, list) and len(data) > 0 and isinstance(data[0], dict):
                    writer = csv.DictWriter(f, fieldnames=data[0].keys())
                    writer.writeheader()
                    writer.writerows(data)
            self.metrics["exports"] += 1
            logger.info(f"[ReportAgent] Exported CSV to {filepath}")
            return filepath
        except Exception as e:
            logger.error(f"[ReportAgent] Failed to export CSV: {e}")
            return None

    def export_pdf(self, data, filename):
        """Mock exporting to PDF. (Writes structured text file representing a PDF payload)."""
        filepath = os.path.join(self.output_dir, filename)
        try:
            with open(filepath, "w") as f:
                f.write(f"--- CYBERHEAL AI PDF REPORT SIMULATION ---\n")
                f.write(json.dumps(data, indent=4))
            self.metrics["exports"] += 1
            logger.info(f"[ReportAgent] Exported PDF simulation to {filepath}")
            return filepath
        except Exception as e:
            logger.error(f"[ReportAgent] Failed to export PDF: {e}")
            return None

    def schedule_report(self, report_type, frequency, format="pdf"):
        """Schedule a report generation."""
        schedule_id = f"sch_{int(time.time())}"
        self.scheduled_reports.append({
            "id": schedule_id,
            "type": report_type,
            "frequency": frequency,
            "format": format
        })
        logger.info(f"[ReportAgent] Scheduled {report_type} report on a {frequency} basis.")
        return schedule_id
