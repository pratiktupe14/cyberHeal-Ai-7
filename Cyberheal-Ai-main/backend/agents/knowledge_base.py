import json
import os
import logging
from threading import Lock

logger = logging.getLogger(__name__)

class KnowledgeBase:
    """
    Central AI Knowledge Base.
    Used by ReflectiveLearningAgent to share updated knowledge with all AI agents.
    """
    def __init__(self, storage_path="knowledge_base.json"):
        self.storage_path = storage_path
        self.lock = Lock()
        self.data = {
            "recurring_patterns": {},
            "successful_strategies": {},
            "failed_strategies": {},
            "detection_rules": [],
            "remediation_workflows": []
        }
        self._load()

    def _load(self):
        if os.path.exists(self.storage_path):
            try:
                with open(self.storage_path, "r") as f:
                    self.data = json.load(f)
            except Exception as e:
                logger.error(f"[KnowledgeBase] Failed to load data: {e}")

    def _save(self):
        try:
            with open(self.storage_path, "w") as f:
                json.dump(self.data, f, indent=4)
        except Exception as e:
            logger.error(f"[KnowledgeBase] Failed to save data: {e}")

    def update_pattern(self, pattern_key):
        with self.lock:
            if pattern_key not in self.data["recurring_patterns"]:
                self.data["recurring_patterns"][pattern_key] = 0
            self.data["recurring_patterns"][pattern_key] += 1
            self._save()

    def record_strategy_success(self, strategy_name):
        with self.lock:
            if strategy_name not in self.data["successful_strategies"]:
                self.data["successful_strategies"][strategy_name] = 0
            self.data["successful_strategies"][strategy_name] += 1
            self._save()

    def record_strategy_failure(self, strategy_name):
        with self.lock:
            if strategy_name not in self.data["failed_strategies"]:
                self.data["failed_strategies"][strategy_name] = 0
            self.data["failed_strategies"][strategy_name] += 1
            self._save()

    def get_insights(self):
        with self.lock:
            return self.data
