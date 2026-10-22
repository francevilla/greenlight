from fastapi import APIRouter, Depends, HTTPException, status, Query
from app.deps import get_current_user, prisma
from app.schemas import (
    CreditCheckRequest, CreditCheckResponse, CreditStatus, Provider, Plan
)
from app.services.provider_service import get_provider
from typing import List, Optional
from datetime import datetime, timedelta

router = APIRouter(prefix="/credit-checks", tags=["credit-checks"])


# Limiti per piano
PLAN_LIMITS = {
    Plan.FREE: 5,
    Plan.BASIC: 50,
    Plan.PRO: 200,
    Plan.ENTERPRISE: 999999
}


async def check_user_limit(user_id: str, plan: Plan) -> bool:
    """Verifica se l'utente ha superato il limite mensile"""
    limit = PLAN_LIMITS.get(plan, 5)
    
    # Calcola inizio mese corrente
    now = datetime.utcnow()
    start_of_month = datetime(now.year, now.month, 1)
    
    count = await prisma.creditcheck.count(
        where={
            "userId": user_id,
            "createdAt": {"gte": start_of_month}
        }
    )
    
    return count < limit


@router.post("", response_model=CreditCheckResponse)
async def create_credit_check(
    request: CreditCheckRequest,
    current_user = Depends(get_current_user)
):
    # Verifica limiti piano
    if not await check_user_limit(current_user.id, current_user.plan):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Limite mensile raggiunto per il piano {current_user.plan}. Upgrade per più verifiche."
        )
    
    # Validazione base Partita IVA italiana
    if len(request.vatNumber) != 11 or not request.vatNumber.isdigit():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Partita IVA non valida (deve essere 11 cifre)"
        )
    
    # Validazione Codice Fiscale (16 caratteri alfanumerici)
    if len(request.taxCode) != 16:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Codice Fiscale non valido (deve essere 16 caratteri)"
        )
    
    # Chiama provider
    provider = get_provider(request.provider)
    
    try:
        result = await provider.check_credit(
            request.companyName,
            request.vatNumber,
            request.taxCode
        )
    except Exception as e:
        # In caso di errore provider, salva comunque con status ERROR
        credit_check = await prisma.creditcheck.create(
            data={
                "userId": current_user.id,
                "companyName": request.companyName,
                "vatNumber": request.vatNumber,
                "taxCode": request.taxCode,
                "provider": request.provider.value,
                "status": CreditStatus.ERROR,
                "rawResponse": {"error": str(e)}
            }
        )
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Errore nel provider: {str(e)}"
        )
    
    # Salva risultato
    credit_check = await prisma.creditcheck.create(
        data={
            "userId": current_user.id,
            "companyName": request.companyName,
            "vatNumber": request.vatNumber,
            "taxCode": request.taxCode,
            "provider": request.provider.value,
            "providerId": result.provider_id,
            "status": result.status,
            "score": result.score,
            "rawResponse": result.raw_data
        }
    )
    
    return credit_check


@router.get("", response_model=List[CreditCheckResponse])
async def list_credit_checks(
    current_user = Depends(get_current_user),
    skip: int = Query(0, ge=0),
    take: int = Query(20, ge=1, le=100),
    status_filter: Optional[CreditStatus] = None
):
    where = {"userId": current_user.id}
    if status_filter:
        where["status"] = status_filter.value
    
    checks = await prisma.creditcheck.find_many(
        where=where,
        skip=skip,
        take=take,
        order={"createdAt": "desc"}
    )
    
    return checks


@router.get("/{check_id}", response_model=CreditCheckResponse)
async def get_credit_check(
    check_id: str,
    current_user = Depends(get_current_user)
):
    check = await prisma.creditcheck.find_unique(where={"id": check_id})
    
    if not check:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Verifica non trovata"
        )
    
    if check.userId != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Non autorizzato"
        )
    
    return check


@router.get("/stats/summary")
async def get_stats(current_user = Depends(get_current_user)):
    now = datetime.utcnow()
    start_of_month = datetime(now.year, now.month, 1)
    
    total_this_month = await prisma.creditcheck.count(
        where={
            "userId": current_user.id,
            "createdAt": {"gte": start_of_month}
        }
    )
    
    by_status = await prisma.creditcheck.group_by(
        by=["status"],
        where={
            "userId": current_user.id,
            "createdAt": {"gte": start_of_month}
        },
        _count={"status": True}
    )
    
    limit = PLAN_LIMITS.get(current_user.plan, 5)
    
    return {
        "plan": current_user.plan,
        "limit": limit,
        "used": total_this_month,
        "remaining": max(0, limit - total_this_month),
        "by_status": {item.status: item._count.status for item in by_status}
    }