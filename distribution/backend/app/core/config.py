from pydantic_settings import BaseSettings
from typing import Optional, List, Union
from pydantic import field_validator


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Enterprise AI Security Red Teaming Platform"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "production"

    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/ai_security_db"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # API Keys
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    GOOGLE_API_KEY: Optional[str] = None

    # Model Configuration (multiple models - comma-separated, set in .env)
    OPENAI_MODELS: str = ""
    ANTHROPIC_MODELS: str = ""
    GOOGLE_MODELS: str = ""
    OLLAMA_MODELS: str = ""

    # Default model
    OPENAI_MODEL: str = "gpt-4"
    ANTHROPIC_MODEL: str = "claude-3-opus-20240229"
    GOOGLE_MODEL: str = "gemini-2.0-flash"

    # Local Models (Ollama)
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3"

    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    API_KEYS: str = "demo-api-key-123"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # CORS
    ALLOWED_ORIGINS: Union[List[str], str] = [
        "http://localhost:3000",
        "http://localhost:5173",
    ]
    FRONTEND_URL: str = "http://localhost:3000"

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def parse_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",")]
        return v

    @property
    def openai_models_list(self) -> List[str]:
        if not self.OPENAI_MODELS:
            return []
        return [m.strip() for m in self.OPENAI_MODELS.split(",") if m.strip()]

    @property
    def anthropic_models_list(self) -> List[str]:
        if not self.ANTHROPIC_MODELS:
            return []
        return [m.strip() for m in self.ANTHROPIC_MODELS.split(",") if m.strip()]

    @property
    def google_models_list(self) -> List[str]:
        if not self.GOOGLE_MODELS:
            return []
        return [m.strip() for m in self.GOOGLE_MODELS.split(",") if m.strip()]

    @property
    def ollama_models_list(self) -> List[str]:
        if not self.OLLAMA_MODELS:
            return []
        return [m.strip() for m in self.OLLAMA_MODELS.split(",") if m.strip()]

    # Rate Limiting
    RATE_LIMIT_REQUESTS: int = 100
    RATE_LIMIT_WINDOW: int = 3600

    # Model API Timeouts
    MODEL_TIMEOUT_SECONDS: int = 30
    MODEL_MAX_RETRIES: int = 3

    # Test Configuration
    DEFAULT_VARIANTS_PER_TECHNIQUE: int = 2
    MAX_BASELINE_PROMPTS: int = 50
    MAX_CONCURRENT_RUNS: int = 10

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
