import logging
import time
import uuid

logger = logging.getLogger(__name__)

class IdentityAgent:
    """
    IdentityAgent monitors authentication, manages sessions, validates MFA,
    detects suspicious logins, and enforces RBAC for CyberHeal AI 7.
    """
    def __init__(self):
        self.active_sessions = {}
        self.login_attempts = []
        self.metrics = {
            "auth_monitored": 0,
            "mfa_validated": 0,
            "suspicious_logins_detected": 0,
            "rbac_enforcements": 0
        }

    def monitor_authentication(self, login_data):
        """Monitor authentication requests and detect anomalies."""
        self.metrics["auth_monitored"] += 1
        user_id = login_data.get("user_id")
        ip_address = login_data.get("ip_address", "0.0.0.0")
        
        # Log the attempt
        self.login_attempts.append({
            "user_id": user_id,
            "ip_address": ip_address,
            "timestamp": time.time()
        })
        
        # Keep log size manageable
        if len(self.login_attempts) > 200:
            self.login_attempts.pop(0)

        # Detect suspicious login immediately upon monitoring
        if self.detect_suspicious_login(login_data):
            logger.warning(f"[IdentityAgent] Suspicious login detected for user {user_id} from IP {ip_address}")
            return {"status": "blocked", "reason": "suspicious_login"}
            
        return {"status": "allowed"}

    def detect_suspicious_login(self, login_data):
        """Analyze login data for suspicious patterns (e.g., geographic impossibility)."""
        # Mock logic: block if IP starts with '10.9.9' or user has too many rapid attempts
        ip_address = login_data.get("ip_address", "")
        user_id = login_data.get("user_id")
        
        if ip_address.startswith("10.9.9."):
            self.metrics["suspicious_logins_detected"] += 1
            return True
            
        # Check rapid attempts
        recent_attempts = [a for a in self.login_attempts if a["user_id"] == user_id and (time.time() - a["timestamp"]) < 60]
        if len(recent_attempts) > 5:
            self.metrics["suspicious_logins_detected"] += 1
            return True
            
        return False

    def manage_session(self, user_id):
        """Create and manage a secure session."""
        session_id = str(uuid.uuid4())
        self.active_sessions[session_id] = {
            "user_id": user_id,
            "created_at": time.time(),
            "last_active": time.time()
        }
        logger.info(f"[IdentityAgent] Session {session_id} created for user {user_id}")
        return session_id

    def validate_mfa(self, user_id, token):
        """Validate Multi-Factor Authentication token."""
        self.metrics["mfa_validated"] += 1
        # Mock logic: assume any 6-digit token is valid for simulation
        if len(str(token)) == 6:
            logger.info(f"[IdentityAgent] MFA validated for user {user_id}")
            return True
        logger.warning(f"[IdentityAgent] MFA failed for user {user_id}")
        return False

    def enforce_rbac(self, user_id, resource):
        """Enforce Role-Based Access Control."""
        self.metrics["rbac_enforcements"] += 1
        # Mock logic: admin has full access, others restricted
        role = "admin" if "admin" in user_id.lower() else "user"
        
        if role == "admin":
            return True
        elif resource in ["dashboard", "reports"]:
            return True
            
        logger.warning(f"[IdentityAgent] RBAC violation attempt by {user_id} for resource {resource}")
        return False
