from fastapi import APIRouter, Depends, HTTPException, status
from app.auth import create_access_token, verify_password, get_password_hash
from app.deps import get_current_user, prisma
from app.schemas import UserRegister, UserLogin, Token, UserResponse
from datetime import timedelta
from app.config import settings

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=Token)
async def register(user_data: UserRegister):
    # Verifica se email già esiste
    existing_user = await prisma.user.find_unique(where={"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email già registrata"
        )
    
    # Hash password
    hashed_password = get_password_hash(user_data.password)
    
    # Crea utente
    user = await prisma.user.create(
        data={
            "email": user_data.email,
            "password": hashed_password,
            "name": user_data.name,
            "plan": "FREE"
        }
    )
    
    # Crea token
    access_token = create_access_token(
        data={"sub": user.id},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login", response_model=Token)
async def login(user_data: UserLogin):
    user = await prisma.user.find_unique(where={"email": user_data.email})
    
    if not user or not verify_password(user_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenziali non valide",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(
        data={"sub": user.id},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserResponse)
async def get_me(current_user = Depends(get_current_user)):
    return current_user


@router.post("/logout")
async def logout():
    # Con JWT stateless, il logout è lato client (rimuovere token)
    return {"message": "Logout effettuato"}