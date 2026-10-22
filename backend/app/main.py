from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.deps import prisma
from app.routes import auth, credit_checks


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await prisma.connect()
    yield
    # Shutdown
    await prisma.disconnect()


app = FastAPI(
    title="Greenlight SaaS API",
    description="API per verifica merito creditizio - Il via libera per i tuoi clienti",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
# Prefisso /api: frontend, proxy Vite, nginx e rewrite Vercel inoltrano
# il path originale (/api/auth/login, /api/credit-checks, ...)
app.include_router(auth.router, prefix="/api")
app.include_router(credit_checks.router, prefix="/api")


@app.get("/health")
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "Greenlight SaaS API"}


@app.get("/api/providers")
async def list_providers():
    return {
        "providers": [
            {"id": "CERVED", "name": "Cerved", "description": "Leader italiano informazioni commerciali"},
            {"id": "CRIBIS", "name": "Cribis", "description": "D&B Italia - Business information"},
            {"id": "CREDITSAFE", "name": "Credit Safe", "description": "Global business intelligence"}
        ]
    }