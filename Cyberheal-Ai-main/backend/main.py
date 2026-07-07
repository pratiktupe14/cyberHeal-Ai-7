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

app = FastAPI(title="SOC Dashboard API")

# Initialize Agents
threat_intel_agent = ThreatIntelAgent()
diagnosis_agent = DiagnosisAgent()

# Create commander first, we will inject it into issue detector, then inject issue detector back
commander_agent = CommanderAgent(
    threat_intel_agent=threat_intel_agent,
    diagnosis_agent=diagnosis_agent
)
issue_detector_agent = IssueDetectorAgent(commander_agent=commander_agent)
commander_agent.issue_detector_agent = issue_detector_agent

sentinel_agent = SentinelAgent(commander_agent)
intake_agent = IntakeAgent(sentinel_agent)

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