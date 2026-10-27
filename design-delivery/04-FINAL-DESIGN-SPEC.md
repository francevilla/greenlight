# 04 — FINAL DESIGN SPEC
Greenlight SaaS — Direzione "Italian Editorial"
Tutte le schermate ridisegnate con intent. Stack: React 18 + TypeScript + Vite + Tailwind + shadcn/ui + Framer Motion.

---

## Principi guida applicati a ogni schermata
1. **Il semaforo è il protagonista:** mai nascosto, sempre grande, sempre con etichetta testuale + colore.
2. **Zero gergo fintech:** "merito creditizio" → "affidabilità"; "score" → "punteggio"; "provider" → "fonte dati"; "Partita IVA" → "codice fiscale azienda".
3. **Dark mode first-class:** ogni schermata ha versione chiara e scura definite dai token.
4. **Mobile first:** dashboard usabile da telefono (commerciale in trasferta).
5. **Stati di carico realistici:** API Cerved/Cribis/Credit Safe impiegano 3–8s: skeleton + stato "interroga" mai lasciato a vuoto.

---

## 1. Homepage — sezioni

### Nav
- Logo sinistro: wordmark "Greenlight" + icona semaforo stilizzata.
- Link: "Il prodotto", "Prezzi", "Domande".
- CTA destra: "Registrati" (test), "Accedi" (liquid glass, outline).
- Mobile: hamburger menu.

### Hero
- Sfondo: carta calda (#f5f5ee) in light, inchiostro (#0b0c0b) in dark.
- Titolo (serif, grande): "Il semaforo del credito per le tue decisioni."
- Sottotitolo: "Inserisci la partita IVA di un cliente e in 30 secondi sai se puoi firmare, chiedere un acconto o fermarti."
- CTA principale (pill, verde foresta): "Verifica un'azienda — 5 check gratis".
- CTA secondario (ghost): "Vedi i prezzi".
- Elemento visivo: grande semaforo VERDE animato a destra (stato attivo, ignite animation).

### Social proof
- Riga di 4–5 loghi clienti in scala di grigi (desaturati), hover a colore.
- Testo: "Usato da agenzie e studi in tutta Italia."

### Problema / Soluzione (due colonne)
- Sinistra: "Senza Greenlight" — attesa giorni per una visura Cerved, gergo incomprensibile, rischio insoluto.
- Destra: "Con Greenlight" — partita IVA inserita, semaforo immediato, decisione sì/no.
- Iconografia: orologio vs semaforo.

### Come funziona in 3 step
1. Inserisci partita IVA e codice fiscale.
2. Interroghiamo Cerved, Cribis e Credit Safe in parallelo.
3. Ricevi il semaforo e la raccomandazione: firma, acconto o ferma.

### Demo interattiva del semaforo (LiveCheck)
- Input numerico 11 cifre con mascherina automatica.
- Bottone "Verifica" abilitato solo a 11 cifre.
- Durante l'attesa (3s simulata): skeleton delle 3 fonti, stato "in corso…".
- Esito: grande semaforo colorato + punteggio + raccomandazione testuale ("Puoi firmare", "Chiedi un acconto", "Non procedere senza garanzie").
- Link esempi precompilati sotto l'input.

### Comparazione provider
- Tabella: Cerved | Cribis | Credit Safe.
- Colonne: fonte dati, specialità, tempo medio risposta, incluso in Greenlight.
- Tutti inclusi già nei piani Basic e Pro.

### Pricing (in homepage, sezione compressa)
- 3 card: Free (0 €, 5 check/mese, 1 fonte), Basic (29 €/mese, 50 check, 3 fonti), Pro (79 €/mese, 200 check, confronto fonti).
- CTA su ogni card: "Inizia gratis" o "Scegli Basic".
- Nota: "Nessuna carta richiesta per il piano Free."

### FAQ (5 domande)
Vedere copy-library.md.

### CTA finale + Footer
- CTA full-width: "Apri il tuo account — 5 check gratis, nessuna carta".
- Footer: link legali, contatti, società, versione dark.

---

## 2. Login / Register

### Login
- Titolo: "Bentornato".
- Sottotitolo: "Accedi per vedere i tuoi report e le verifiche in corso."
- Campi: email, password.
- Link "Password dimenticata?" → ora funzionante (route `/forgot-password` da aggiungere).
- Bottone: "Accedi".
- Footer card: "Non hai un account? Registrati gratis."
- Badge vicino al titolo: "Primi 5 check gratuiti, nessuna carta."

### Register
- Titolo: "Crea il tuo account".
- Sottotitolo: "Inizia a verificare il credito dei tuoi clienti in 30 secondi."
- Campi: nome, email aziendale, password, conferma password.
- Pre-compilazione email da parametro URL `?email=` (già implementato, mantenuto).
- Bottone: "Crea account".
- Footer: "Hai già un account? Accedi."
- Note legali: Termini e Privacy (link testuali, non popup).

---

## 3. Dashboard

### Header fisso
- Logo + nome azienda utente.
- Badge piano (es. "Free — 5 check/mese").
- Avatar utente con menu a tendina (nome, email, Esci).
- Nav tabs: "Nuova verifica" | "Storico" | "Statistiche".

### KPI bar (in alto)
- Card 1: "Check usati questo mese" — numero + progress bar.
- Card 2: "Rimangono" — numero.
- Card 3: "Affidabili (Verde)" — numero con icona check.
- Card 4: "In attesa" — numero con icona orologio.

### Tab Nuova verifica
- Form: ragione sociale, partita IVA (mascherina 11 cifre), codice fiscale (mascherina 16), selezione fonte dati (Cerved/Cribis/Credit Safe, default Cerved).
- Bottone: "Verifica credito" (stato di carica durante l'attesa API).
- Validazione inline in tempo reale.

### Tab Storico
- Lista verifiche recenti con: data, azienda, P.IVA, fonte, semaforo grande, punteggio, stato.
- Filtro per stato (tutti, verde, giallo, arancione, rosso).
- Empty state: illustrazione semaforo spento + testo "Nessuna verifica ancora. Inizia dalla tua prima verifica." + bottone "Nuova verifica".

### Tab Statistiche
- Distribuzione per stato (grafico a barre orizzontali semplici).
- Utilizzo piano (progress bar).
- Dettaglio per fonte dati (tabella leggera).

---

## 4. Nuova verifica — schermata dedicata (modal o pagina)

Quando si clicca "Nuova verifica" da dashboard:
- Form centrato su carta.
- Campi con validazione istantanea (icona check/cross a destra dell'input).
- Selezione fonte: chip Cerved / Cribis / Credit Safe.
- Bottone di invio grande.
- Durante l'attesa (3–8s reale): schermata di transizione con animazione semaforo che "accende" i tre colori in sequenza, testo "Interrogo le fonti dati…", nessuna pagina bianca.
- Esito: redirect automatico al Dettaglio Report.

---

## 5. Dettaglio Report

### Header
- Titolo: nome azienda.
- Sottotitolo: P.IVA + CF + data verifica.
- Badge fonte dati (es. "Fonte: Cerved").

### Semaforo principale (grande, centrale)
- Cerchio semaforo grande (160px+) con colore stato.
- Etichetta testuale grande: "VERDE — Affidabile".
- Punteggio numerico (es. 87/100).
- Frase di raccomandazione in linguaggio umano: "Puoi firmare il contratto senza acconto aggiuntivo." / "Ti consigliamo di chiedere un acconto del 30%." / "Non procedere senza garanzie."

### Breakdown rischio (3 card laterali o righe)
- Storico pagamenti: Buono / Medio / Critico.
- Solidità finanziaria: Alta / Media / Bassa.
- Problemi legali: Nessuno / Presenti / Molti.

### Fonti interpellate
- Elenco Cerved, Cribis, Credit Safe con singolo punteggio e stato (se disponibili).

### Azioni
- Bottone: "Esporta PDF" (report stampabile).
- Bottone: "Nuova verifica".
- Link: "Torna allo storico".

---

## 6. Pricing page standalone

- Header: "Scegli il piano giusto per la tua agenzia."
- 3 card laterali + Free in alto come opzione base.
- Tabella confronto feature (righe: check/mese, fonti dati, storico, export PDF, confronto fonti, supporto prioritario).
- FAQ specifica pricing.
- CTA: "Inizia gratis" (Free), "Scegli Basic" (29€), "Scegli Pro" (79€), "Contattaci" (Enterprise).
- Nota: "I piani si rinnovano mensilmente. Disdici quando vuoi."

---

## 7. Stati UI (empty, error, loading)

### Empty state dashboard
- Illustrazione semaforo spento (grigio).
- Titolo: "Nessuna verifica ancora."
- Testo: "La tua prima verifica ti dice se puoi fidarti di un nuovo cliente."
- Bottone: "Fai la tua prima verifica".

### Empty state storico
- Uguale ma specifico per storico.

### Errore provider
- Titolo: "Impossibile completare la verifica."
- Testo: "La fonte dati non ha risposto. Riprova tra qualche minuto o scegli un altro provider."
- Bottone: "Riprova".
- Link: "Contatta supporto".

### Errore validazione form
- Input con bordo rosso, messaggio sotto: "Partita IVA non valida (deve essere 11 cifre)".

### Loading skeleton
- Durante attesa API: scheletro del report (testo righe grigie animate, semaforo grigio pulsante).
- Durata minima mostrata: 1.5s (per evitare flicker su risposte rapide).

### Successo verifica
- Toast: "Verifica completata. Report disponibile."
- Redirect al dettaglio report dopo 1s.

---

## Note di animazione (Framer Motion)

| Elemento | Variant | Durata | Easing | Note |
|----------|---------|--------|--------|------|
| Semaforo ignite (hero) | scale 1.22→0.97→1, opacity 0.15→1 | 420ms | cubic-bezier(0.2,0.7,0.3,1) | Delay 320ms, solo una volta |
| Fonti LiveCheck (accensione sequenziale) | opacity 0.35→1 | 260ms step | ease-out | Ogni 260ms si accende una fonte |
| Transizione report | fade + slide-up | 300ms | cubic-bezier(0.22,1,0.36,1) | Dopo attesa API |
| Tooltip/Toast | scale-y + opacity | 150ms | ease-out | Micro-feedback |
| Page transition (route change) | fade | 300ms | ease-in-out | Tra login/dashboard/etc. |
| Skeleton pulsante | opacity 0.4→1 | 1.2s | ease-in-out | Loop infinito durante attesa |

**Cosa NON animare:** testo del semaforo (deve essere leggibile subito), tabelle dati, input form (solo focus ring).

---

## Struttura componenti (naming shadcn/ui)

`frontend/src/components/ui/`
- `TrafficLightBadge.tsx` — badge semaforo piccolo (lista storico).
- `CreditScoreGauge.tsx` — cerchio semaforo grande con punteggio (dettaglio report, hero).
- `CreditCheckForm.tsx` — form verifica con mascherine P.IVA/CF.
- `ProviderChip.tsx` — chip selezione fonte dati.
- `KpiCard.tsx` — card metrica dashboard.
- `CheckRow.tsx` — riga storico verifica.
- `EmptyState.tsx` — stato vuoto riusabile.
- `SkeletonLine.tsx` / `SkeletonBlock.tsx` — scheletri caricamento.
- `TrafficLightHero.tsx` — semaforo grande animato hero.

`frontend/src/components/landing/`
- `Hero.tsx`, `SocialProof.tsx`, `Steps.tsx`, `LiveCheck.tsx`, `Pricing.tsx`, `Faq.tsx`, `Footer.tsx`, `SiteHeader.tsx`.

---

## Mobile considerations
- Header dashboard: logo a sinistra, menu utente a destra, tabs sotto a scorrimento orizzontale.
- KPI bar: grid 2 colonne su mobile, 4 su desktop.
- Form verifica: campi a schermo intero, bottone grande touch-friendly (min 44px).
- Semaforo report: ridimensionato a 120px su mobile, testo sopra anziché a lato.
- Nav landing: hamburger, link impilati verticalmente.
