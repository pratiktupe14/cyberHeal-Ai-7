import os
from cryptography.fernet import Fernet
import logging

logger = logging.getLogger(__name__)

# Key must be 32 url-safe base64-encoded bytes
# If not provided, we generate an ephemeral one for dev, but warning is logged.
_env_key = os.getenv("ENCRYPTION_KEY")

if not _env_key:
    logger.warning("[Encryption] ENCRYPTION_KEY not found in env. Generating ephemeral key for development.")
    _env_key = Fernet.generate_key().decode('utf-8')

fernet = Fernet(_env_key.encode('utf-8'))

def encrypt_data(data: str) -> str:
    """Encrypts string data returning base64 encoded string"""
    if not data: return data
    try:
        return fernet.encrypt(data.encode('utf-8')).decode('utf-8')
    except Exception as e:
        logger.error(f"[Encryption] Encryption failed: {e}")
        return data

def decrypt_data(encrypted_data: str) -> str:
    """Decrypts base64 encoded string returning original data"""
    if not encrypted_data: return encrypted_data
    try:
        return fernet.decrypt(encrypted_data.encode('utf-8')).decode('utf-8')
    except Exception as e:
        logger.error(f"[Encryption] Decryption failed: {e}")
        return encrypted_data
