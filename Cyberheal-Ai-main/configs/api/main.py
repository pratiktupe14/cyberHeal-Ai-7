from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# Add src to Python path so shield_rca can be imported globally
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from api.routes import router as api_router
from api.ingestion import ingestor

app = FastAPI(
    title="SHIELD-RCA Backend API",
    description="FastAPI Backend for SHIELD-RCA multi-agent pipeline",
    version="1.0.0"
)

# Configure CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Change this to the specific frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include our routes
app.include_router(api_router)

@app.get("/")
async def root():
    return {"message": "Welcome to SHIELD-RCA Backend API. Go to /docs for the interactive documentation."}

@app.on_event("startup")
async def startup_event():
    # Start the background daemon to poll real OS logs
    ingestor.start_polling()

