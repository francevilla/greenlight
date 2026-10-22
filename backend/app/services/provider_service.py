from abc import ABC, abstractmethod
from typing import Optional
from dataclasses import dataclass
from app.schemas import Provider, CreditStatus


@dataclass
class ProviderResult:
    status: CreditStatus
    score: Optional[float]
    provider_id: Optional[str]
    raw_data: dict


class CreditProvider(ABC):
    @abstractmethod
    async def check_credit(self, company_name: str, vat_number: str, tax_code: str) -> ProviderResult:
        pass


class MockCervedProvider(CreditProvider):
    """Mock provider per Cerved - da sostituire con implementazione reale"""
    
    async def check_credit(self, company_name: str, vat_number: str, tax_code: str) -> ProviderResult:
        # Simula una chiamata API
        import random
        import asyncio
        await asyncio.sleep(1)  # Simula latenza rete
        
        # Logica mock basata su Partita IVA per risultati deterministici
        last_digit = int(vat_number[-1]) if vat_number[-1].isdigit() else 0
        
        if last_digit < 2:
            status = CreditStatus.VERDE
            score = round(85 + random.random() * 10, 1)
        elif last_digit < 4:
            status = CreditStatus.GIALLO
            score = round(65 + random.random() * 15, 1)
        elif last_digit < 7:
            status = CreditStatus.ARANCIONE
            score = round(45 + random.random() * 15, 1)
        else:
            status = CreditStatus.ROSSO
            score = round(10 + random.random() * 30, 1)
        
        return ProviderResult(
            status=status,
            score=score,
            provider_id=f"CERVED-{vat_number}-{hash(company_name) % 10000}",
            raw_data={
                "provider": "Cerved",
                "company_name": company_name,
                "vat_number": vat_number,
                "tax_code": tax_code,
                "score": score,
                "risk_level": status.value,
                "details": {
                    "payment_history": "Buona" if status == CreditStatus.VERDE else "Media" if status in [CreditStatus.GIALLO, CreditStatus.ARANCIONE] else "Critica",
                    "financial_solidity": "Alta" if status == CreditStatus.VERDE else "Media" if status == CreditStatus.GIALLO else "Bassa",
                    "legal_issues": "Nessuna" if status in [CreditStatus.VERDE, CreditStatus.GIALLO] else "Presenti" if status == CreditStatus.ARANCIONE else "Multiple"
                }
            }
        )


class MockCribisProvider(CreditProvider):
    """Mock provider per Cribis - da sostituire con implementazione reale"""
    
    async def check_credit(self, company_name: str, vat_number: str, tax_code: str) -> ProviderResult:
        import random
        import asyncio
        await asyncio.sleep(1.2)
        
        last_digit = int(vat_number[-1]) if vat_number[-1].isdigit() else 0
        
        if last_digit < 3:
            status = CreditStatus.VERDE
            score = round(80 + random.random() * 15, 1)
        elif last_digit < 6:
            status = CreditStatus.GIALLO
            score = round(55 + random.random() * 20, 1)
        else:
            status = CreditStatus.ARANCIONE
            score = round(30 + random.random() * 20, 1)
        
        return ProviderResult(
            status=status,
            score=score,
            provider_id=f"CRIBIS-{vat_number}-{hash(company_name) % 10000}",
            raw_data={
                "provider": "Cribis",
                "company_name": company_name,
                "vat_number": vat_number,
                "tax_code": tax_code,
                "rating": "A" if status == CreditStatus.VERDE else "B" if status == CreditStatus.GIALLO else "C",
                "probability_default": round((100 - score) / 100, 2)
            }
        )


class MockCreditSafeProvider(CreditProvider):
    """Mock provider per Credit Safe - da sostituire con implementazione reale"""
    
    async def check_credit(self, company_name: str, vat_number: str, tax_code: str) -> ProviderResult:
        import random
        import asyncio
        await asyncio.sleep(0.8)
        
        last_digit = int(vat_number[-1]) if vat_number[-1].isdigit() else 0
        
        if last_digit < 4:
            status = CreditStatus.VERDE
            score = round(90 + random.random() * 5, 1)
        elif last_digit < 7:
            status = CreditStatus.GIALLO
            score = round(70 + random.random() * 15, 1)
        else:
            status = CreditStatus.ROSSO
            score = round(20 + random.random() * 30, 1)
        
        return ProviderResult(
            status=status,
            score=score,
            provider_id=f"CREDITSAFE-{vat_number}-{hash(company_name) % 10000}",
            raw_data={
                "provider": "Credit Safe",
                "company_name": company_name,
                "vat_number": vat_number,
                "tax_code": tax_code,
                "credit_score": score,
                "risk_category": "Basso" if status == CreditStatus.VERDE else "Medio" if status == CreditStatus.GIALLO else "Alto"
            }
        )


def get_provider(provider: Provider) -> CreditProvider:
    providers = {
        Provider.CERVED: MockCervedProvider(),
        Provider.CRIBIS: MockCribisProvider(),
        Provider.CREDITSAFE: MockCreditSafeProvider(),
    }
    return providers.get(provider, MockCervedProvider())