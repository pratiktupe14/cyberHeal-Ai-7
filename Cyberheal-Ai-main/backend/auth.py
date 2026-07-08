import os
import time
import logging
from fastapi import Request, HTTPException, Depends, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials, APIKeyHeader
from typing import Optional

logger = logging.getLogger(__name__)

# MOCK_AUTH allows the dashboard to function without enforcing strict JWT logic during development
MOCK_AUTH = os.getenv("MOCK_AUTH", "True").lower() == "true"

SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-enterprise-key-do-not-use-in-prod")
ALGORITHM = "HS256"

security = HTTPBearer(auto_error=False)
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

def verify_jwt(token: str):
    if MOCK_AUTH:
        return {"sub": "admin", "role": "ADMIN"}
    
    try:
        import jwt
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except Exception as e:
        logger.warning(f"[Auth] JWT validation failed: {e}")
        raise HTTPException(status_code=401, detail="Invalid or expired token")

def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security), request: Request = None):
    ip = request.client.host if request else "0.0.0.0"
    
    if MOCK_AUTH:
        return {"sub": "admin", "role": "ADMIN"}
        
    if not credentials:
        logger.warning(f"[Auth] Missing credentials from {ip}")
        raise HTTPException(status_code=401, detail="Authorization header missing")
        
    user_payload = verify_jwt(credentials.credentials)
    
    # Track with IdentityAgent
    from agents.identity import IdentityAgent
    agent = IdentityAgent()
    status = agent.monitor_authentication({"user_id": user_payload.get("sub"), "ip_address": ip})
    if status.get("status") == "blocked":
        raise HTTPException(status_code=403, detail="Suspicious login blocked")
        
    return user_payload

def require_role(required_role: str):
    def role_checker(user: dict = Depends(get_current_user)):
        if MOCK_AUTH:
            return user
            
        if user.get("role") != required_role and user.get("role") != "ADMIN":
            raise HTTPException(status_code=403, detail="Insufficient privileges")
        return user
    return role_checker

def verify_api_key(api_key: str = Security(api_key_header)):
    if MOCK_AUTH:
        return True
        
    expected_key = os.getenv("CYBERHEAL_API_KEY", "default-api-key")
    if api_key != expected_key:
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return True
