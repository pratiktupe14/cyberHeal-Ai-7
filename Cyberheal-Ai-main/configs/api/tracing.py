import json
import uuid
from datetime import datetime
from loguru import logger
import os

class TraceTracker:
    def __init__(self, trace_dir="traces"):
        self.trace_dir = trace_dir
        os.makedirs(self.trace_dir, exist_ok=True)
        
    def create_trace(self, trace_id, event_type, source, pipeline_steps):
        trace_data = {
            "trace_id": trace_id,
            "event_type": event_type,
            "source": source,
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "pipeline": pipeline_steps
        }
        
        file_path = os.path.join(self.trace_dir, f"{trace_id}.json")
        with open(file_path, 'w') as f:
            json.dump(trace_data, f, indent=2)
            
        logger.success(f"Trace saved successfully for incident {trace_id}")
        return trace_data

    def get_trace(self, trace_id):
        file_path = os.path.join(self.trace_dir, f"{trace_id}.json")
        if not os.path.exists(file_path):
            return None
        with open(file_path, 'r') as f:
            return json.load(f)

trace_tracker = TraceTracker()
