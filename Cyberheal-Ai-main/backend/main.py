from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import subprocess
import json
import logging
from agents.commander import CommanderAgent
from agents.sentinel import SentinelAgent
from agents.intake import IntakeAgent
from agents.threat_intel import ThreatIntelAgent
from agents.issue_detector import IssueDetectorAgent
from agents.diagnosis import DiagnosisAgent
from agents.causor import CausorAgent
from agents.planner import PlannerAgent
from agents.guardian import GuardianAgent
from agents.executor import ExecutorAgent
from agents.verifier import VerifierAgent
from agents.final_status import FinalStatusAgent
from agents.scribe import ScribeAgent
from agents.knowledge_base import KnowledgeBase
from agents.reflective_learning import ReflectiveLearningAgent
from agents.memory import MemoryAgent
from agents.analytics import AnalyticsAgent
from agents.notification import NotificationAgent
from agents.report import ReportAgent
from agents.identity import IdentityAgent
from agents.monitor import MonitorAgent

app = FastAPI(title="SOC Dashboard API")

# Initialize Agents
threat_intel_agent = ThreatIntelAgent()
diagnosis_agent = DiagnosisAgent()
causor_agent = CausorAgent()
planner_agent = PlannerAgent()
guardian_agent = GuardianAgent()
executor_agent = ExecutorAgent()
verifier_agent = VerifierAgent()
notification_agent = NotificationAgent()
identity_agent = IdentityAgent()

# Initialize Knowledge Base, Learning Agent, and Memory Agent
knowledge_base = KnowledgeBase()
reflective_learning_agent = ReflectiveLearningAgent(knowledge_base=knowledge_base)
memory_agent = MemoryAgent()
report_agent = ReportAgent(memory_agent=memory_agent, knowledge_base=knowledge_base)

# Pass memory_agent and learning_agent to ScribeAgent so it can persist incident data to memory
scribe_agent = ScribeAgent(reflective_learning_agent=reflective_learning_agent)
scribe_agent.memory_agent = memory_agent  # Dynamically inject or modify ScribeAgent later
final_status_agent = FinalStatusAgent(scribe_agent=scribe_agent)

# Create commander first, we will inject it into issue detector, then inject issue detector back
commander_agent = CommanderAgent(
    threat_intel_agent=threat_intel_agent,
    diagnosis_agent=diagnosis_agent,
    causor_agent=causor_agent,
    planner_agent=planner_agent,
    guardian_agent=guardian_agent,
    executor_agent=executor_agent,
    verifier_agent=verifier_agent,
    final_status_agent=final_status_agent,
    scribe_agent=scribe_agent,
    notification_agent=notification_agent
)
issue_detector_agent = IssueDetectorAgent(commander_agent=commander_agent)
commander_agent.issue_detector_agent = issue_detector_agent

sentinel_agent = SentinelAgent(commander_agent)
intake_agent = IntakeAgent(sentinel_agent)

monitor_agent = MonitorAgent(commander_agent=commander_agent, notification_agent=notification_agent)

analytics_agent = AnalyticsAgent(
    memory_agent=memory_agent,
    knowledge_base=knowledge_base,
    commander_agent=commander_agent
)

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(monitor_agent.start_monitoring())

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_windows_logs(log_name="System", max_events=20):
    cmd = f'powershell.exe -Command "Get-WinEvent -LogName {log_name} -MaxEvents {max_events} -ErrorAction SilentlyContinue | Select-Object TimeCreated, Id, LevelDisplayName, Message, ProviderName | ConvertTo-Json"'
    try:
        result = subprocess.check_output(cmd, shell=True, text=True)
        if not result.strip():
            return []
        data = json.loads(result)
        if isinstance(data, dict):
            data = [data]
        return data
    except Exception as e:
        logging.error(f"Error fetching logs from {log_name}: {e}")
        return []

@app.get("/api/logs")
def get_recent_logs():
    # Attempt to read Security logs (requires Admin), fallback to System and Application
    logs = get_windows_logs("Security", 10)
    if not logs:
        logs = get_windows_logs("System", 20)
    return {"status": "success", "data": logs}

@app.websocket("/ws")
async def websocket_logs(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Poll every 5 seconds
            logs = get_windows_logs("System", 10) # Using System for broader accessibility
            security_logs = get_windows_logs("Security", 5)
            if security_logs:
                logs = security_logs + logs
            
            await websocket.send_json({"type": "LOG_UPDATE", "data": logs})
            await asyncio.sleep(5)
    except WebSocketDisconnect:
        pass

@app.post("/webhook/security-event")
async def receive_security_event(request: Request, background_tasks: BackgroundTasks):
    try:
        event_data = await request.json()
        # The flow is Intake -> Sentinel -> Commander
        # If Sentinel doesn't find a threat, incident_id will be None
        incident_id, state = intake_agent.receive_event("webhook", event_data)
        
        if incident_id:
            # Execute plan in the background
            background_tasks.add_task(commander_agent.execute_plan, incident_id)
            return {"status": "success", "incident_id": incident_id, "message": "Threat detected and processing started"}
        else:
            return {"status": "success", "message": "Event processed. No threat detected."}
    except Exception as e:
        logging.error(f"Error processing webhook: {e}")
        return {"status": "error", "message": str(e)}

@app.get("/api/agents/commander/state")
def get_commander_state():
    return {"status": "success", "data": commander_agent.active_workflows}

@app.get("/api/agents/intake/events")
def get_intake_events():
    return {"status": "success", "data": intake_agent.stored_events}

@app.get("/api/agents/sentinel/status")
def get_sentinel_status():
    return {"status": "success", "active_threats": sentinel_agent.active_threats}

@app.get("/api/agents/threat_intel/status")
def get_threat_intel_status():
    return {"status": "success", "stats": threat_intel_agent.enrichment_stats}

@app.get("/api/agents/issue_detector/status")
def get_issue_detector_status():
    return {"status": "success", "metrics": issue_detector_agent.metrics}

@app.get("/api/agents/diagnosis/status")
def get_diagnosis_status():
    return {"status": "success", "metrics": diagnosis_agent.metrics}

@app.get("/api/agents/causor/status")
def get_causor_status():
    return {"status": "success", "metrics": causor_agent.metrics}

@app.get("/api/agents/planner/status")
def get_planner_status():
    return {"status": "success", "metrics": planner_agent.metrics}

@app.get("/api/agents/guardian/status")
def get_guardian_status():
    return {"status": "success", "metrics": guardian_agent.metrics}

@app.get("/api/agents/executor/status")
def get_executor_status():
    return {"status": "success", "metrics": executor_agent.metrics}

@app.get("/api/agents/verifier/status")
def get_verifier_status():
    return {"status": "success", "metrics": verifier_agent.metrics}

@app.get("/api/agents/final_status/status")
def get_final_status_status():
    return {"status": "success", "metrics": final_status_agent.metrics}

@app.get("/api/agents/scribe/status")
def get_scribe_status():
    return {"status": "success", "logs_count": len(scribe_agent.logs), "logs": scribe_agent.logs}

@app.get("/api/agents/reflective_learning/status")
def get_reflective_learning_status():
    return {
        "status": "success",
        "metrics": reflective_learning_agent.metrics,
        "knowledge_base": knowledge_base.get_insights()
    }

@app.get("/api/agents/memory/status")
def get_memory_status():
    return {"status": "success", "metrics": memory_agent.metrics}

@app.get("/api/agents/memory/search")
def search_memory(query: str):
    results = memory_agent.semantic_search(query)
    return {"status": "success", "data": results}

@app.get("/api/agents/analytics/dashboard")
def get_analytics_dashboard():
    return {"status": "success", "data": analytics_agent.generate_dashboard_metrics()}

@app.get("/api/agents/notification/status")
def get_notification_status():
    return {
        "status": "success",
        "metrics": notification_agent.metrics,
        "logs": notification_agent.notification_log
    }

@app.get("/api/agents/report/status")
def get_report_status():
    return {
        "status": "success",
        "metrics": report_agent.metrics,
        "scheduled_reports": report_agent.scheduled_reports
    }

@app.get("/api/agents/identity/status")
def get_identity_status():
    return {
        "status": "success",
        "metrics": identity_agent.metrics,
        "active_sessions": len(identity_agent.active_sessions)
    }

@app.post("/api/agents/report/generate")
def generate_report(request: dict):
    # Quick endpoint to simulate report generation from frontend
    rtype = request.get("type", "audit")
    format = request.get("format", "csv")
    
    if rtype == "incident":
        data = report_agent.generate_incident_report(request.get("incident_id"))
    elif rtype == "compliance":
        data = report_agent.generate_compliance_report()
    else:
        data = report_agent.generate_audit_report()
        
    filename = f"{rtype}_report_{int(time.time())}.{format}"
    
    if format == "csv":
        path = report_agent.export_csv(data, filename)
    else:
        path = report_agent.export_pdf(data, filename)
        
    return {"status": "success", "file": path, "data": data}

@app.get("/api/agents/monitor/status")
def get_monitor_status():
    return {
        "status": "success",
        "data": monitor_agent.get_status(),
        "is_monitoring": monitor_agent.is_monitoring
    }

@app.get("/api/agents/global_status")
def get_global_status():
    # Helper to check if an agent is currently executing in any workflow
    def is_executing(agent_name):
        for wf in commander_agent.active_workflows.values():
            if wf.get("current_step") == agent_name and wf.get("status", "").startswith("Executing"):
                return "Active"
        return "Idle"
        
    agents_data = [
        {"id": "intake", "name": "Intake", "role": "Data Ingestion", "status": "Active" if len(intake_agent.stored_events) > 0 else "Idle", "success_rate": 100.0, "last_execution": "Live", "health": "Healthy", "icon": "input"},
        {"id": "sentinel", "name": "Sentinel", "role": "Threat Detection", "status": "Active (24x7)", "success_rate": 99.8, "last_execution": "Live", "health": "Healthy", "icon": "security"},
        {"id": "threat_intel", "name": "Threat Intel", "role": "Enrichment", "status": is_executing("ThreatIntelAgent"), "success_rate": 98.5, "last_execution": "Live" if threat_intel_agent.enrichment_stats["threats_processed"] > 0 else "Idle", "health": "Healthy", "icon": "troubleshoot"},
        {"id": "issue_detector", "name": "Issue Detector", "role": "Classification", "status": is_executing("IssueDetectorAgent"), "success_rate": 99.1, "last_execution": "Live" if issue_detector_agent.metrics["issues_classified"] > 0 else "Idle", "health": "Healthy", "icon": "bug_report"},
        {"id": "commander", "name": "Commander", "role": "Orchestrator AI", "status": "Active" if commander_agent.active_workflows else "Idle", "success_rate": 100.0, "last_execution": "Live", "health": "Healthy", "icon": "account_tree"},
        {"id": "diagnosis", "name": "Diagnosis", "role": "Deep Inspection", "status": is_executing("DiagnosisAgent"), "success_rate": 96.4, "last_execution": "Live" if diagnosis_agent.metrics["diagnoses_completed"] > 0 else "Idle", "health": "Healthy", "icon": "search"},
        {"id": "causor", "name": "Causor", "role": "Root Cause Analysis", "status": is_executing("CausorAgent"), "success_rate": 94.2, "last_execution": "Live" if causor_agent.metrics["rca_completed"] > 0 else "Idle", "health": "Healthy", "icon": "troubleshoot"},
        {"id": "planner", "name": "Planner", "role": "Recovery Planning", "status": is_executing("PlannerAgent"), "success_rate": 100.0, "last_execution": "Live" if planner_agent.metrics["plans_generated"] > 0 else "Idle", "health": "Healthy", "icon": "route"},
        {"id": "guardian", "name": "Guardian", "role": "Safety Validation", "status": is_executing("GuardianAgent"), "success_rate": 99.9, "last_execution": "Live" if guardian_agent.metrics["plans_validated"] > 0 else "Idle", "health": "Healthy", "icon": "admin_panel_settings"},
        {"id": "executor", "name": "Executor", "role": "Remediation", "status": is_executing("ExecutorAgent"), "success_rate": 99.5, "last_execution": "Live" if executor_agent.metrics["remediations_executed"] > 0 else "Idle", "health": "Healthy", "icon": "build"},
        {"id": "verifier", "name": "Verifier", "role": "Validation", "status": is_executing("VerifierAgent"), "success_rate": 100.0, "last_execution": "Live" if verifier_agent.metrics["verifications_completed"] > 0 else "Idle", "health": "Healthy", "icon": "check_circle"},
        {"id": "final_status", "name": "Final Status", "role": "Closure", "status": is_executing("FinalStatusAgent"), "success_rate": 100.0, "last_execution": "Live", "health": "Healthy", "icon": "done_all"},
        {"id": "scribe", "name": "Scribe", "role": "Audit Logging", "status": is_executing("ScribeAgent"), "success_rate": 100.0, "last_execution": "Live" if len(scribe_agent.logs) > 0 else "Idle", "health": "Healthy", "icon": "history_edu"},
        {"id": "rlm", "name": "Reflective Learning", "role": "Knowledge Base", "status": "Idle", "success_rate": 100.0, "last_execution": "Live", "health": "Healthy", "icon": "school"},
        {"id": "memory", "name": "Memory", "role": "Semantic Storage", "status": "Active", "success_rate": 100.0, "last_execution": "Live", "health": "Healthy", "icon": "memory"},
        {"id": "analytics", "name": "Analytics", "role": "Reporting", "status": "Active", "success_rate": 100.0, "last_execution": "Live", "health": "Healthy", "icon": "analytics"},
        {"id": "notification", "name": "Notification", "role": "Alerting", "status": "Active", "success_rate": 100.0, "last_execution": "Live", "health": "Healthy", "icon": "notifications"},
        {"id": "identity", "name": "Identity", "role": "Authentication", "status": "Active", "success_rate": 100.0, "last_execution": "Live", "health": "Healthy", "icon": "person"},
        {"id": "monitor", "name": "Monitor", "role": "Infra Checking", "status": "Active", "success_rate": 100.0, "last_execution": "Live", "health": "Healthy", "icon": "monitor"}
    ]
    return {
        "status": "success",
        "agents": agents_data
    }