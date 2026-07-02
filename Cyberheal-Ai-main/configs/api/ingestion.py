import os
import platform
import time
import json
import threading
from loguru import logger
from shield_rca.agents import supabase
from .tracing import trace_tracker

# Global Settings
ENABLE_SIMULATION = True

def execute_pipeline_background(incident_id: str):
    logger.info(f"Thread Task: Starting LangGraph Pipeline for Incident {incident_id}")
    try:
        from shield_rca.langgraph_core import ShieldLangGraph, AgentState
        workflow = ShieldLangGraph(supabase)
        initial_state = AgentState(
            incident_id=incident_id,
            alert_payload={"source": "real_time_ingestion", "metric": "anomaly"}
        )
        final_state = workflow.execute_workflow(initial_state)
        if final_state.status == "RESOLVED":
            logger.success(f"Pipeline Completed for {incident_id}")
        else:
            logger.error(f"Pipeline Ended in state: {final_state.status}")
    except Exception as e:
        logger.error(f"Pipeline execution error: {str(e)}")

class LogIngestor:
    def __init__(self):
        self.os_type = platform.system()
        self._last_alert_time = 0
        
    def start_polling(self):
        def poll_loop():
            while True:
                try:
                    self.poll_logs()
                except Exception as e:
                    logger.error(f"Polling error: {e}")
                time.sleep(10) # Poll every 10 seconds
        
        thread = threading.Thread(target=poll_loop, daemon=True)
        thread.start()
        logger.info(f"Started Real Log Ingestion Daemon for {self.os_type}")

    def poll_logs(self):
        # Throttle real alerts to max 1 per minute for safety
        if time.time() - self._last_alert_time < 60:
            return

        if self.os_type == "Windows":
            self._poll_windows_logs()
        elif self.os_type == "Linux":
            self._poll_linux_logs()
            
    def _poll_windows_logs(self):
        try:
            import win32evtlog
            server = 'localhost'
            logtype = 'Security'
            hand = win32evtlog.OpenEventLog(server, logtype)
            flags = win32evtlog.EVENTLOG_BACKWARDS_READ | win32evtlog.EVENTLOG_SEQUENTIAL_READ
            events = win32evtlog.ReadEventLog(hand, flags, 0)
            
            failed_logons = 0
            if events:
                for event in events:
                    if event.EventID == 4625: # Failed Logon
                        failed_logons += 1
                        
            if failed_logons > 3:
                self._trigger_incident(
                    title="Real Failed Logon Burst Detected (Windows)",
                    issue_type="Authentication Failure",
                    severity="HIGH",
                    source_ip="Local Network",
                    is_simulated=False
                )
        except ImportError:
            pass # pywin32 not available
        except Exception as e:
            logger.error(f"Error reading Windows logs: {e}")

    def _poll_linux_logs(self):
        log_path = "/var/log/auth.log"
        if os.path.exists(log_path):
            with open(log_path, 'r') as f:
                lines = f.readlines()[-50:] # Read last 50 lines
                failed_attempts = [l for l in lines if "Failed password" in l]
                if len(failed_attempts) > 3:
                    raw_log = failed_attempts[-1].strip()
                    pipeline = [
                        {"step": "INGESTION", "input": raw_log, "output": "structured log", "status": "success", "time_ms": 5},
                        {"step": "PARSING", "input": "structured log", "output": {"user": "unknown", "ip": "Unknown", "action": "failed_login"}, "status": "success"},
                        {"step": "DETECTION", "input": "parsed log", "output": {"alert": "Real SSH Brute Force Detected", "severity": "CRITICAL"}, "status": "success"}
                    ]
                    
                    self._trigger_incident(
                        title="Real SSH Brute Force Detected (Linux)",
                        issue_type="Brute Force",
                        severity="CRITICAL",
                        source_ip="Unknown",
                        is_simulated=False,
                        pipeline_steps=pipeline,
                        source="/var/log/auth.log"
                    )

    def _trigger_incident(self, title, issue_type, severity, source_ip, is_simulated=False, pipeline_steps=None, source="os_events"):
        if is_simulated:
            if not ENABLE_SIMULATION:
                logger.warning("Simulation disabled. Ignoring simulated event.")
                return None
            title = f"[SIMULATED_EVENT] {title}"
            
        logger.info(f"Triggering Incident: {title} (Simulated: {is_simulated})")
        self._last_alert_time = time.time()
        
        if supabase:
            res = supabase.table("incidents").insert({
                "title": title,
                "severity": severity,
                "status": "OPEN"
            }).execute()
            
            if res.data:
                incident_id = res.data[0]['id']
                
                # Build and export trace
                if pipeline_steps:
                    pipeline_steps.append({"step": "API_RESPONSE", "output": f"Incident {incident_id} created in dashboard", "status": "success"})
                    trace_tracker.create_trace(incident_id, issue_type, source, pipeline_steps)
                    
                # Using Threading as async worker fallback since Redis is unavailable on this OS
                threading.Thread(target=execute_pipeline_background, args=(incident_id,)).start()
                return incident_id
        return None

class SimulationEngine:
    def __init__(self, ingestor: LogIngestor):
        self.ingestor = ingestor
        
    def simulate_brute_force(self):
        return self.ingestor._trigger_incident(
            title="Brute Force Attack on auth-api",
            issue_type="Brute Force",
            severity="HIGH",
            source_ip="192.168.1.55",
            is_simulated=True
        )
        
    def simulate_service_down(self):
        return self.ingestor._trigger_incident(
            title="Payment API Service Down",
            issue_type="Service Outage",
            severity="MEDIUM",
            source_ip="N/A",
            is_simulated=True
        )

    def simulate_edge_anomaly(self):
        return self.ingestor._trigger_incident(
            title="Edge Camera Suspicious Traffic",
            issue_type="Anomaly",
            severity="HIGH",
            source_ip="10.0.0.99",
            is_simulated=True
        )

# Global instances
ingestor = LogIngestor()
simulation_engine = SimulationEngine(ingestor)
