# 02 — UX/UI AUDIT ATTUALE

Audito su codice sorgente (no screenshot disponibili in ambiente CI; descrizioni basate su path file precisi).

## Landing Page — `frontend/src/pages/LandingPage.tsx`

| Elemento | Problema | Gravità (1-5) | Impatto |
|----------|----------|:-------------:|---------|
| Hero video di sfondo (`HeroVideo.tsx`) | Video esterno su Cloudfront, senza fallback stabile; distrazione visiva su titolo; autoplay bloccato da browser lascia primo frame opaco | 4 | Conversione hero: utente non legge headline, abbandona |
| Hero titolo "Il semaforo del credito" (strumento serif, bianco su nero) | Gerarchia debole; nessun sottotitolo che spieghi il beneficio; CTA debole ("Il manifesto") | 4 | Comprensione valore: utente non capisce cosa fa il prodotto |
| Form email overlay (liquid glass, bianco su video) | Basso contrasto su video scuro; nessun messaggio di conferma post-invio; navigation a /register senza contesto | 3 | Cattura lead: perdita iscrizioni |
| Navigazione link a `#stati`, `#prezzi`, `#domande` | Ancora di pagina su `/semaforo` (pagina diversa) ma landing è `/`: link rotti o comportamento inaspettato | 3 | Navigazione: utente si perde |
| Colori semaforo (verde #17b26a, giallo #f5c518, arancio #f07818, rosso #e5484d) | Tonalità accese ma non coordinate con sistema dark; nessun token semantico riusabile | 2 | Coerenza brand: colori sparsi senza sistema |

## Login / Register — `frontend/src/pages/LoginPage.tsx`, `RegisterPage.tsx`

| Elemento | Problema | Gravità (1-5) | Impatto |
|----------|----------|:-------------:|---------|
| Card centrata su sfondo nero puro | Nessuna gerarchia visiva; logo ripetuto SVG inline pesante; nessun richiamo al beneficio ("5 check gratis") | 3 | Attivazione: utente non percepisce valore prima di registrarsi |
| Link "Password dimenticata?" → `/forgot-password` | Route non esistente in App.tsx (404 silenzioso) | 5 | Recupero account: utente bloccato, abbandono |
| Validazione solo lato client (password < 8, match) | Nessun feedback asincrono dal backend su email già esistente (gestito ma toast generico) | 2 | Fiducia: messaggi d'errore poco chiari |
| Nessuna prova sociale | Nessun logo cliente, nessun testimonial, nessun "X aziende si fidano" | 3 | Conversione: manca riprova sociale per PMI cautious |

## Dashboard — `frontend/src/pages/DashboardPage.tsx`

| Elemento | Problema | Gravità (1-5) | Impatto |
|----------|----------|:-------------:|---------|
| Header fisso con avatar e tooltip utente | Avatar esterno (ui-avatars.com) senza fallback; Tooltip sovrappone nav su mobile | 3 | Usabilità mobile: commerciale in trasferta |
| Tab "Nuova Verifica" / "Storico" / "Statistiche" | Tabs shadcn senza indicatore attivo chiaro su sfondo scuro; stato attivo debole | 2 | Orientamento: utente non sa dove si trova |
| Form verifica (azienda, P.IVA, CF, provider) | Nessuna mascherina di input per P.IVA (11 cifre) e CF (16 caratteri); validazione solo al submit | 3 | Errori utente: invii sbagliati, frustrazione |
| Tab Storico: lista verifiche | Empty state generico ("Nessuna verifica effettuata") senza CTA educativo; nessuna data relativa ("2 giorni fa") | 2 | Retention: primo uso sembra morto |
| Statistiche per provider | Tabella provider vuota se non ci sono dati; nessuna spiegazione di cosa significano le % | 2 | Comprensione dati: utente non interpreta |
| Output semaforo nella lista | Pallini colorati minuscoli (w-1.5 h-1.5) poco leggibili; nessun testo di raccomandazione | 4 | Decisione: utente non capisce se può firmare |
| Loader globale | Solo spinner centrale; nessuno skeleton per lista/stats durante caricamento API (3-8s provider) | 3 | Percezione performance: sembra congelato |

## Schermata SemaforoSite (landing prodotto) — `frontend/src/pages/SemaforoSite.tsx`

| Elemento | Problema | Gravità (1-5) | Impatto |
|----------|----------|:-------------:|---------|
| LiveCheck (demo semaforo) | Importa `@/lib/demo` che **non esiste** nel repo → build rotto | 5 | Funzionalità core rotta: demo non parte |
| Stati semaforo (`States.tsx`) | Colori CSS custom (`var(--verde)` ecc.) non definiti in Tailwind; fallback a default Tailwind non coerente | 4 | Coerenza visiva: colori sconnessi |
| Pricing (€29 Basic, €79 Pro) | Piano Free non visibile come card a pagamento; confusione tra Free/Enterprise in due sezioni separate | 3 | Prezzi: utente non confronta piani facilmente |

## Problemi trasversali (tutte le schermate)

| Elemento | Problema | Gravità | Impatto |
|----------|----------|:-------:|---------|
| Design system | Nessuno shadcn/ui coerente: componenti custom sparsi, nessun design token | 5 | Manutenibilità: ogni cambio richiede editing manuale ovunque |
| Tipografia | Inter + Instrument Serif mescolati senza scale definita; h1 diversi per landing e dashboard | 4 | Brand: identità visiva frammentata |
| Dark mode | Implementato come classe `.dark` ma non come token system; contrasto variabile | 3 | Accessibilità: WCAG AA non garantito ovunque |
| Stati di errore | Errore provider → toast generico + HTTP 502; nessun stato UI dedicato nel frontend | 3 | Fiducia: utente non distingue errore rete da cliente inesistente |
| Loading | Nessuno skeleton; spinner solo in pochi punti | 3 | Percezione: API lente (3-8s) sembrano bloccate |
| Mobile | Nessuna query media specifica dashboard; header fisso ruba spazio su piccoli schermi | 4 | Usabilità: commerciale in trasferta non può usare da telefono |

## Priorità d'intervento (ordine consigliato)

1. **Critico (5):** rotta `/forgot-password` inesistente; import `@/lib/demo` mancante; nessun design system/token.
2. **Alto (4):** hero senza gerarchia; output semaforo illeggibile in lista; mobile dashboard inutilizzabile.
3. **Medio (3):** validazione form; stati caricamento; empty state; contrasto landing.
