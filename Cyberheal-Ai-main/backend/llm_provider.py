import os
import json
import logging
import urllib.request
import urllib.error

logger = logging.getLogger(__name__)

# Configurable LLM Provider settings
# Options: "ollama", "openai", "azure"
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "ollama").lower()
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_URL = "https://api.openai.com/v1/chat/completions"
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o")

AZURE_OPENAI_API_KEY = os.getenv("AZURE_OPENAI_API_KEY", "")
AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT", "")

def generate_reasoning(prompt: str, context: str = "") -> str:
    """
    Generate natural language reasoning based on the configured LLM provider.
    Returns the generated string, or None if it fails (triggering a fallback).
    """
    full_prompt = f"Context:\n{context}\n\nTask:\n{prompt}"
    
    try:
        if LLM_PROVIDER == "ollama":
            return _generate_ollama(full_prompt)
        elif LLM_PROVIDER == "openai":
            if not OPENAI_API_KEY:
                logger.warning("[LLM] OpenAI API Key missing, failing gracefully.")
                return None
            return _generate_openai(full_prompt)
        elif LLM_PROVIDER == "azure":
            if not AZURE_OPENAI_API_KEY or not AZURE_OPENAI_ENDPOINT:
                logger.warning("[LLM] Azure API Key/Endpoint missing, failing gracefully.")
                return None
            return _generate_azure(full_prompt)
        else:
            logger.warning(f"[LLM] Unknown provider '{LLM_PROVIDER}'")
            return None
    except Exception as e:
        logger.error(f"[LLM] Error generating reasoning via {LLM_PROVIDER}: {e}")
        return None

def _generate_ollama(prompt: str) -> str:
    data = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": False
    }
    
    req = urllib.request.Request(OLLAMA_URL, data=json.dumps(data).encode('utf-8'), headers={'Content-Type': 'application/json'})
    
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result.get("response", "").strip()
    except urllib.error.URLError as e:
        logger.warning(f"[LLM] Ollama endpoint unreachable: {e}")
        return None

def _generate_openai(prompt: str) -> str:
    data = {
        "model": OPENAI_MODEL,
        "messages": [
            {"role": "system", "content": "You are a senior cybersecurity analyst. Provide concise, clear, and actionable security reasoning. Only output the requested explanation."},
            {"role": "user", "content": prompt}
        ]
    }
    
    req = urllib.request.Request(OPENAI_URL, data=json.dumps(data).encode('utf-8'), headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {OPENAI_API_KEY}'
    })
    
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result["choices"][0]["message"]["content"].strip()
    except Exception as e:
        logger.warning(f"[LLM] OpenAI endpoint error: {e}")
        return None

def _generate_azure(prompt: str) -> str:
    data = {
        "messages": [
            {"role": "system", "content": "You are a senior cybersecurity analyst. Provide concise, clear, and actionable security reasoning."},
            {"role": "user", "content": prompt}
        ]
    }
    
    req = urllib.request.Request(AZURE_OPENAI_ENDPOINT, data=json.dumps(data).encode('utf-8'), headers={
        'Content-Type': 'application/json',
        'api-key': AZURE_OPENAI_API_KEY
    })
    
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result["choices"][0]["message"]["content"].strip()
    except Exception as e:
        logger.warning(f"[LLM] Azure OpenAI endpoint error: {e}")
        return None
