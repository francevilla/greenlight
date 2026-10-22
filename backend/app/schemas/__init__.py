from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
from datetime import datetime
from enum import Enum


class Plan(str, Enum):
    FREE = "FREE"
    BASIC = "BASIC"
    PRO = "PRO"
    ENTERPRISE = "ENTERPRISE"


class Provider(str, Enum):
    CERVED = "CERVED"
    CRIBIS = "CRIBIS"
    CREDITSAFE = "CREDITSAFE"


class CreditStatus(str, Enum):
    PENDING = "PENDING"
    VERDE = "VERDE"
    GIALLO = "GIALLO"
    ARANCIONE = "ARANCIONE"
    ROSSO = "ROSSO"
    ERROR = "ERROR"


# Auth schemas
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None
    
    @field_validator("password")
    @classmethod
    def password_length(cls, v):
        if len(v) < 8:
            raise ValueError("La password deve essere di almeno 8 caratteri")
        return v


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    email: Optional[str] = None


class UserResponse(BaseModel):
    id: str
    email: str
    name: Optional[str] = None
    plan: Plan
    createdAt: datetime
    
    class Config:
        from_attributes = True


# Credit Check schemas
class CreditCheckRequest(BaseModel):
    companyName: str
    vatNumber: str
    taxCode: str
    provider: Provider = Provider.CERVED


class CreditCheckResponse(BaseModel):
    id: str
    companyName: str
    vatNumber: str
    taxCode: str
    provider: Provider
    providerId: Optional[str] = None
    status: CreditStatus
    score: Optional[float] = None
    rawResponse: Optional[dict] = None
    createdAt: datetime
    
    class Config:
        from_attributes = True


class CreditCheckCreate(BaseModel):
    companyName: str
    vatNumber: str
    taxCode: str
    provider: Provider = Provider.CERVED


class ProviderResponse(BaseModel):
    status: CreditStatus
    score: Optional[float] = None
    provider_id: Optional[str] = None
    raw_data: dict