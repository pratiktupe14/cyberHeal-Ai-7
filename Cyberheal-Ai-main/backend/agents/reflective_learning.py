import logging

logger = logging.getLogger(__name__)

class ReflectiveLearningAgent:
    def __init__(self, knowledge_base):
        self.knowledge_base = knowledge_base
        self.metrics = {"incidents_analyzed": 0, "patterns_identified": 0}

    def learn_from_incident(self, workflow_data):
        """Analyze completed incidents and update the shared knowledge base."""
        incident_id = workflow_data.get("incident_id")
        final_status = workflow_data.get("final_status")
        
        logger.info(f"[ReflectiveLearningAgent] Analyzing incident {incident_id} (Status: {final_status})")
        
        # 1. Identify recurring attack patterns
        incident_type = workflow_data.get("data", {}).get("type", "UNKNOWN")
        provider = workflow_data.get("data", {}).get("ProviderName", "UNKNOWN")
        pattern_key = f"{incident_type}_{provider}"
        
        self.knowledge_base.update_pattern(pattern_key)
        self.metrics["patterns_identified"] += 1
        
        # 2. Learn from successful and failed responses
        # Determine strategy from the plan used
        plan = workflow_data.get("plan", [])
        strategy_name = "_".join(plan[-3:]) if len(plan) >= 3 else "basic_strategy"
        
        if final_status in ["Resolved", "Closed"]:
            self.knowledge_base.record_strategy_success(strategy_name)
            logger.info(f"[ReflectiveLearningAgent] Recorded successful response for pattern {pattern_key}")
        else:
            self.knowledge_base.record_strategy_failure(strategy_name)
            logger.warning(f"[ReflectiveLearningAgent] Recorded failed response for pattern {pattern_key}. Rule adjustments may be needed.")
            
        self.metrics["incidents_analyzed"] += 1
        return True
