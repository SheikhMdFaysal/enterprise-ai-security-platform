from fastapi import APIRouter
from datetime import datetime, timezone
from app.core.config import settings
import logging

router = APIRouter()
logger = logging.getLogger("uvicorn.error")


@router.get("/health")
def health_check():
    """Basic health check endpoint - checks DB and Redis"""
    # Check database
    try:
        from app.models.database import get_engine

        engine = get_engine()
        with engine.connect():
            db_status = "connected"
    except Exception as e:
        db_status = f"down: {str(e)}"
        logger.error("Database is down")

    # Check Redis
    try:
        import redis

        r = redis.from_url(settings.REDIS_URL)
        r.ping()
        redis_status = "connected"
    except Exception as e:
        redis_status = f"down: {str(e)}"
        logger.error("Redis is down")

    all_connected = db_status == "connected" and redis_status == "connected"

    return {
        "status": "healthy" if all_connected else "degraded",
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
        "database": db_status,
        "redis": redis_status,
    }


@router.get("/health/production")
def production_health_check():
    """Detailed health check for production monitoring"""
    # Check database
    try:
        from app.models.database import get_engine

        engine = get_engine()
        with engine.connect():
            db_status = "connected"
    except Exception as e:
        db_status = f"down: {str(e)}"
        logger.error("Database is down")

    # Check Redis
    try:
        import redis

        r = redis.from_url(settings.REDIS_URL)
        r.ping()
        redis_status = "connected"
    except Exception as e:
        redis_status = f"down: {str(e)}"
        logger.error("Redis is down")

    # Check model API keys
    model_status = {
        "openai": bool(settings.OPENAI_API_KEY),
        "anthropic": bool(settings.ANTHROPIC_API_KEY),
        "google": bool(settings.GOOGLE_API_KEY),
    }

    all_connected = db_status == "connected" and redis_status == "connected"

    return {
        "status": "healthy" if all_connected else "degraded",
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
        "database": db_status,
        "redis": redis_status,
        "model_apis": model_status,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
