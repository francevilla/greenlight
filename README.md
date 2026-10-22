# Greenlight SaaS

Applicazione SaaS per la verifica del merito creditizio, basata sulla conversazione tra Alberto (commerciale) e il Consulente tecnico.

## 🎯 Obiettivo

Fornire alle agenzie di marketing e alle piccole imprese uno strumento semplice per verificare l'affidabilità creditizia dei clienti prima di acquisirli, tramite un'interfaccia web che si collega ai principali provider italiani (Cerved, Cribis, Credit Safe).

**Tagline:** *Il via libera per i tuoi clienti.*

## 🏗️ Architettura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│   Backend       │────▶│   Database      │
│   React + Vite  │     │   FastAPI       │     │   PostgreSQL    │
│   Tailwind CSS  │     │   Prisma ORM    │     │                 │
│   Framer Motion │     │   JWT Auth      │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                     ┌────────────┼────────────┐
                     ▼            ▼            ▼
               ┌──────────┐ ┌──────────┐ ┌──────────┐
               │  Cerved  │ │  Cribis  │ │CreditSafe│
               │   API    │ │   API    │ │   API    │
               └──────────┘ └──────────┘ └──────────┘
```

## 🛠️ Stack Tecnologico

### Backend
- **Python 3.11** + **FastAPI** - API ad alte prestazioni
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Database relazionale
- **JWT + bcrypt** - Autenticazione sicura
- **Pydantic** - Validazione dati

### Frontend
- **React 18** + **TypeScript** - UI type-safe
- **Vite** - Build tool veloce
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animazioni fluide
- **shadcn/ui** - Componenti accessibili (Radix UI)
- **React Router** - Routing SPA

## 🚀 Quick Start

### Prerequisiti
- Docker & Docker Compose
- Oppure: Python 3.11+, Node.js 20+, PostgreSQL 15+

### Con Docker (Raccomandato)

```bash
# Clona e entra nella directory
cd greenlight-saas

# Copia file environment
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Modifica backend/.env con le tue chiavi
# DATABASE_URL=postgresql://greenlight:greenlight@postgres:5432/greenlight
# SECRET_KEY=your-super-secret-key-change-in-production

# Avvia tutto
docker-compose up -d

# Frontend: http://localhost
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Sviluppo Locale

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Modifica .env con DATABASE_URL locale
prisma db push
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
# App su http://localhost:5173
```

## 📁 Struttura Progetto

```
greenlight-saas/
├── backend/
│   ├── app/
│   │   ├── main.py              # Entry point FastAPI
│   │   ├── config.py            # Configurazione Pydantic Settings
│   │   ├── auth.py              # JWT, password hashing
│   │   ├── deps.py              # Dipendenze FastAPI (auth, DB)
│   │   ├── routes/
│   │   │   ├── auth.py          # /auth/register, /auth/login, /auth/me
│   │   │   └── credit_checks.py # /credit-checks CRUD + stats
│   │   ├── services/
│   │   │   └── provider_service.py  # Astrazione provider (mock ready)
│   │   └── schemas/
│   │       └── __init__.py      # Pydantic models
│   ├── prisma/
│   │   └── schema.prisma        # Schema database
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # Componenti base (Button, Input, Card, etc.)
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Testimonial.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── DashboardPage.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.tsx      # Context auth globale
│   │   ├── lib/
│   │   │   ├── api.ts           # Client Axios con interceptors
│   │   │   └── utils.ts         # Helpers (formatting, colors)
│   │   ├── types/
│   │   │   └── api.ts           # Types TypeScript per API
│   │   ├── App.tsx              # Routing + providers
│   │   ├── main.tsx             # Entry point
│   │   └── index.css            # Tailwind + custom styles
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```

## 🔐 Autenticazione

- **Register**: `POST /api/auth/register` - Email, password, nome opzionale
- **Login**: `POST /api/auth/login` - Email, password → JWT token
- **Me**: `GET /api/auth/me` - Info utente corrente (protetto)
- **Logout**: `POST /api/auth/logout` - Invalida token (client-side)

Token JWT scade in 24h (configurabile via `ACCESS_TOKEN_EXPIRE_MINUTES`).

## 💳 Verifica Credito

### Endpoint
```
POST /api/credit-checks
```

### Request
```json
{
  "companyName": "Acme Marketing S.r.l.",
  "vatNumber": "12345678901",
  "taxCode": "ACM1234567890123",
  "provider": "CERVED"
}
```

### Response
```json
{
  "id": "uuid",
  "companyName": "Acme Marketing S.r.l.",
  "vatNumber": "12345678901",
  "taxCode": "ACM1234567890123",
  "provider": "CERVED",
  "providerId": "CERVED-12345678901-1234",
  "status": "VERDE",
  "score": 87.5,
  "rawResponse": { ... },
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Status Semaforo
| Status | Label | Colore | Significato |
|--------|-------|--------|-------------|
| `VERDE` | Affidabile | 🟢 Verde | Basso rischio |
| `GIALLO` | Attenzione | 🟡 Giallo | Rischio basso-medio |
| `ARANCIONE` | Rischio Medio | 🟠 Arancione | Rischio medio |
| `ROSSO` | Alto Rischio | 🔴 Rosso | Alto rischio |
| `PENDING` | In elaborazione | 🔵 Blu | Attesa risposta |
| `ERROR` | Errore | ⚫ Grigio | Errore provider |

## 💰 Piani Tariffari

| Piano | Verifiche/Mese | Provider | Prezzo |
|-------|---------------|----------|--------|
| **Free** | 5 | 1 (Cerved) | Gratis |
| **Basic** | 50 | 3 (Tutti) | €29/mese |
| **Pro** | 200 | 3 + Confronto | €79/mese |
| **Enterprise** | Illimitate | Dedicato + White-label | Custom |

Limiti resettati il 1° di ogni mese.

## 🔌 Integrazione Provider Reali

Il file `backend/app/services/provider_service.py` contiene classi mock pronte per essere sostituite:

```python
class CervedProvider(CreditProvider):
    async def check_credit(self, company_name, vat_number, tax_code):
        # TODO: Implementare chiamata reale API Cerved
        # headers = {"Authorization": f"Bearer {settings.CERVED_API_KEY}"}
        # response = await httpx.post("https://api.cerved.com/...", json={...})
        pass
```

Quando avrai le credenziali API:
1. Aggiungi le chiavi in `backend/.env`
2. Sostituisci `MockCervedProvider` con implementazione reale
3. Stesso per Cribis e Credit Safe

## 🎨 Design System

Basato su specifiche motionsites.ai:
- **Colori**: Dark mode by default (nero puro #000, bianco puro #fff)
- **Font**: Inter (UI) + Instrument Serif (accento italico)
- **Componenti**: Liquid glass effect, liquid-glass pill
- **Animazioni**: Framer Motion - entrance stagger, scroll parallax
- **UI Kit**: shadcn/ui (Radix UI primitives)

## 📦 Deploy Produzione

### Variabili d'ambiente obbligatorie
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
SECRET_KEY=generated-with-openssl-rand-base64-32
FRONTEND_URL=https://tuodominio.com
CERVED_API_KEY=xxx
CRIBIS_API_KEY=xxx
CREDITSAFE_API_KEY=xxx
```

### Genera SECRET_KEY
```bash
openssl rand -base64 32
```

### Deploy su Vercel (Vercel Services)

Il `vercel.json` alla radice definisce **un unico progetto Vercel con due servizi** (feature [Services](https://vercel.com/docs/services), beta): `frontend` (Vite) e `backend` (FastAPI), con rewrite `/api/*` → backend.

1. **Impostazioni progetto** (obbligatorie, altrimenti Vercel ignora il blocco `services`):
   - Root Directory: **radice del repository**
   - Framework Preset: **Services** — da CLI: `vercel project update --framework services`
2. **Variabili d'ambiente** (Production):
   - `DATABASE_URL` — Postgres gestito es. [Neon](https://neon.tech) (usa la connection string *pooled*)
   - `SECRET_KEY` — `openssl rand -base64 32`
   - `FRONTEND_URL` — URL del deployment (per CORS)
3. **Inizializza lo schema** (una volta, dal tuo PC):
   ```bash
   cd backend && pip install -r requirements.txt
   DATABASE_URL="postgresql://..." prisma generate
   DATABASE_URL="postgresql://..." prisma db push
   ```
4. **Deploy**: collega il repo GitHub su Vercel e fai deploy. Il build del backend esegue automaticamente `prisma generate` (`buildCommand` nel `vercel.json`).
5. **Smoke test**: `GET /api/health` → `{"status": "ok", ...}`.

> Alternativa più tradizionale: frontend statico su Vercel + backend containerizzato (Docker) su Render/Railway/Fly.

### Se il deploy fallisce con errori TS su codice che non esiste più

Sintomo: il log di Vercel segnala errori TypeScript su file o import che nel repository non esistono (es. `Hero.tsx` che importa `useRef` da `framer-motion`). Significa che Vercel sta compilando un **commit vecchio**, non l'ultimo di `master`: è quello che succede cliccando "Redeploy" su un deployment precedente, perché quel comando ricostruisce esattamente il commit di quel deployment.

Come uscirne:

1. Apri il deployment e controlla il campo **Source**: il commit deve essere l'ultimo di `master` (`git log -1 --oneline`).
2. Ripubblica dal commit corretto: push su `master`, oppure "Deploy latest commit" / Deploy Hook dalla dashboard (non "Redeploy" del vecchio deployment).
3. Riproduci la build di Vercel in locale: `cd frontend && npm ci && npm run build`.

> `npm run build` usa `tsconfig.build.json`, che disattiva solo `noUnusedLocals`/`noUnusedParameters`: import o variabili inutilizzati non bloccano più il deploy, mentre i veri errori di tipo restano fatali. Il controllo completo (import inutilizzati inclusi) resta disponibile con `npm run typecheck`.

Il workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) esegue `npm ci && npm run build` su ogni push e pull request: se passa lì, passa anche su Vercel.

## 🧪 Testing

```bash
# Backend
cd backend
pytest                    # Se aggiungi test
# Manuale: http://localhost:8000/docs

# Frontend
cd frontend
npm run typecheck   # tipi + import/variabili inutilizzati
npm run build       # build di produzione, identica a quella di Vercel
npm run lint
```

## 📝 Licenza

Proprietario - Greenlight SaaS

## 🤝 Contribuire

1. Fork del progetto
2. Crea feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push branch (`git push origin feature/amazing-feature`)
5. Apri Pull Request

---

**Creato per automatizzare il processo descritto nella trascrizione tra Alberto e il Consulente tecnico.**