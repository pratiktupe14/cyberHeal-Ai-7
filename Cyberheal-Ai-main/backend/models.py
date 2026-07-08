from sqlalchemy import Column, String, Float, JSON, Integer, Text
from database import Base

class Incident(Base):
    __tablename__ = "incidents"
    
    id = Column(String, primary_key=True, index=True)
    event_type = Column(String, index=True)
    severity = Column(String, index=True)
    data = Column(JSON)
    created_at = Column(Float)
    status = Column(String)

class WorkflowHistory(Base):
    __tablename__ = "workflow_history"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    incident_id = Column(String, index=True)
    step = Column(String)
    status = Column(String)
    timestamp = Column(Float)
    message = Column(Text, nullable=True)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    incident_id = Column(String, index=True)
    agent_name = Column(String, index=True)
    message = Column(Text)
    timestamp = Column(Float)
    log_type = Column(String, default="audit") # forensic, compliance, audit

class AgentStatusRecord(Base):
    """Snapshot of agent statuses for historical charting"""
    __tablename__ = "agent_status_records"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    agent_name = Column(String, index=True)
    status = Column(String)
    metrics = Column(JSON)
    timestamp = Column(Float)

class AiDecision(Base):
    __tablename__ = "ai_decisions"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    incident_id = Column(String, index=True)
    agent_name = Column(String) # PlannerAgent, CausorAgent, etc.
    decision = Column(JSON)
    timestamp = Column(Float)

class RemediationHistory(Base):
    __tablename__ = "remediation_history"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    incident_id = Column(String, index=True)
    action_taken = Column(String)
    success = Column(String)
    timestamp = Column(Float)

class LearningHistory(Base):
    __tablename__ = "learning_history"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    incident_id = Column(String)
    insight_type = Column(String)
    details = Column(JSON)
    timestamp = Column(Float)
