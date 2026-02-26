from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import os

from app.core.config import settings
from app.models.database import init_db, get_session_local
from app.api.routes import security_tests, variants, analytics, health

# Initialize database on startup
init_db()

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Enterprise AI Security Red Teaming Platform API",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database dependency
def get_db():
    SessionLocal = get_session_local()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Include routers
app.include_router(health.router, prefix="/api/v1", tags=["health"])
app.include_router(security_tests.router, prefix="/api/v1", tags=["security-tests"])
app.include_router(variants.router, prefix="/api/v1", tags=["variants"])
app.include_router(analytics.router, prefix="/api/v1", tags=["analytics"])

# HTML Content - serve FULL_DEMO.html
import os

# main.py is at: distribution/backend/app/main.py
# FULL_DEMO.html is at: distribution/FULL_DEMO.html (3 levels up from app/)
PROJECT_ROOT = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)
FULL_DEMO = os.path.join(PROJECT_ROOT, "FULL_DEMO.html")

if os.path.exists(FULL_DEMO):
    with open(FULL_DEMO, "r", encoding="utf-8") as f:
        HTML_CONTENT = f.read()
    print(f"[OK] Loaded FULL_DEMO.html from {FULL_DEMO}")
else:
    HTML_CONTENT = (
        """<!DOCTYPE html>
<html><head><title>Error</title></head>
<body><h1>FULL_DEMO.html not found at: """
        + FULL_DEMO
        + """</h1></body></html>"""
    )


@app.get("/", response_class=HTMLResponse)
def root():
    """Serve the web interface at root"""
    return HTML_CONTENT


@app.get("/ui", response_class=HTMLResponse)
def serve_ui():
    """Serve the web interface"""
    return HTML_CONTENT


@app.get("/api/v1")
def api_root():
    return {
        "message": "API v1",
        "endpoints": [
            "/api/v1/health",
            "/api/v1/security-tests",
            "/api/v1/attack-scenarios",
            "/api/v1/models",
        ],
    }
