import logging
import json
import os
import math
import time

logger = logging.getLogger(__name__)

class MemoryAgent:
    """
    MemoryAgent stores long-term AI memory, simulated embeddings, 
    historical incidents, and provides semantic search capabilities.
    """
    def __init__(self, storage_path="knowledge/memory.json"):
        self.storage_path = storage_path
        self.memories = []
        self.metrics = {"items_stored": 0, "searches_performed": 0}
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(self.storage_path) if os.path.dirname(self.storage_path) else ".", exist_ok=True)
        self._load_memory()

    def _load_memory(self):
        if os.path.exists(self.storage_path):
            try:
                with open(self.storage_path, "r") as f:
                    self.memories = json.load(f)
                    self.metrics["items_stored"] = len(self.memories)
            except Exception as e:
                logger.error(f"[MemoryAgent] Failed to load memory: {e}")

    def _save_memory(self):
        try:
            with open(self.storage_path, "w") as f:
                json.dump(self.memories, f, indent=4)
        except Exception as e:
            logger.error(f"[MemoryAgent] Failed to save memory: {e}")

    def store_incident(self, workflow_data):
        """Store historical incidents and create a mock embedding."""
        incident_id = workflow_data.get("incident_id")
        
        # Convert incident content to a string format suitable for text search
        text_content = f"{workflow_data.get('data', {}).get('type', '')} " \
                       f"{workflow_data.get('data', {}).get('Message', '')} " \
                       f"{workflow_data.get('status', '')}"
                       
        memory_item = {
            "incident_id": incident_id,
            "timestamp": time.time(),
            "text": text_content.lower(),
            "workflow_data": workflow_data,
            # Simulating an embedding vector as a list of word frequencies for our simple search
            "mock_embedding": self._generate_mock_embedding(text_content.lower())
        }
        
        self.memories.append(memory_item)
        self.metrics["items_stored"] += 1
        self._save_memory()
        
        logger.info(f"[MemoryAgent] Stored incident {incident_id} in long-term memory.")
        return True

    def _generate_mock_embedding(self, text):
        """Creates a simple bag-of-words representation for simulated embeddings."""
        words = text.split()
        embedding = {}
        for w in words:
            if len(w) > 3: # Ignore small stop words
                embedding[w] = embedding.get(w, 0) + 1
        return embedding

    def semantic_search(self, query, limit=5):
        """Perform semantic search using mock embeddings (cosine similarity simulation)."""
        self.metrics["searches_performed"] += 1
        query_embedding = self._generate_mock_embedding(query.lower())
        
        if not query_embedding:
            return []
            
        scored_results = []
        for memory in self.memories:
            score = self._calculate_similarity(query_embedding, memory.get("mock_embedding", {}))
            if score > 0:
                scored_results.append((score, memory))
                
        # Sort by highest score
        scored_results.sort(key=lambda x: x[0], reverse=True)
        
        logger.info(f"[MemoryAgent] Performed semantic search for query: '{query}', found {len(scored_results)} matches.")
        
        # Return top results without the score
        return [res[1]["workflow_data"] for res in scored_results[:limit]]

    def _calculate_similarity(self, emb1, emb2):
        """Calculate mock cosine similarity between two bag-of-words 'embeddings'."""
        intersection = set(emb1.keys()) & set(emb2.keys())
        numerator = sum([emb1[x] * emb2[x] for x in intersection])
        
        sum1 = sum([emb1[x]**2 for x in emb1.keys()])
        sum2 = sum([emb2[x]**2 for x in emb2.keys()])
        denominator = math.sqrt(sum1) * math.sqrt(sum2)
        
        if not denominator:
            return 0.0
        else:
            return float(numerator) / denominator

    def provide_knowledge(self, query):
        """Provide knowledge to AI agents when requested."""
        results = self.semantic_search(query)
        return {
            "query": query,
            "relevant_past_incidents": results,
            "status": "success" if results else "no_matches"
        }
