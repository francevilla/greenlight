from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    
    # Provider API Keys
    CERVED_API_KEY: Optional[str] = None
    CERVED_API_SECRET: Optional[str] = None
    CRIBIS_API_KEY: Optional[str] = None
    CRIBIS_API_SECRET: Optional[str] = None
    CREDITSAFE_API_KEY: Optional[str] = None
    CREDITSAFE_API_SECRET: Optional[str] = None
    
    FRONTEND_URL: str = "http://localhost:5173"
    
    class Config:
        env_file = ".env"


settings = Settings()