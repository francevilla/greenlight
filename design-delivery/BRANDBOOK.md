# BRANDBOOK — Greenlight SaaS
Direzione creativa: **Italian Editorial**
Versione: 1.0
Data: 27 ottobre 2026

Questo brandbook è il riferimento unico per chi sviluppa il prodotto. Un sviluppatore deve poter implementare ogni scelta senza chiedere chiarimenti.

---

## 5.1 Strategia

### Brand essence (3 parole)
**Fiducia. Semplicità. Italiano.**

### Mission
Dare a ogni imprenditore e commerciale italiano uno strumento immediato per sapere se può fidarsi di un cliente, prima di firmare un contratto.

### Vision
Diventare il semaforo del credito di riferimento per le PMI italiane, sostituendo la visura complessa con una decisione sì/no leggibile da chiunque.

### Valori (concreti, non "innovazione")
1. **Chiarezza** — parliamo italiano semplice, niente gergo finanziario.
2. **Velocità** — la risposta arriva in 30 secondi, non in 3 giorni.
3. **Affidabilità** — usiamo Cerved, Cribis e Credit Safe, le fonti ufficiali italiane.
4. **Trasparenza** — prezzi chiari, primi 5 check gratis, nessuna carta nascosta.
5. **Umanità** — il semaforo dice "firma" o "ferma", non "score 67".

### Brand promise
"Inserisci una partita IVA, ricevi un semaforo. Verde firmi, rosso ti fermi."

### Positioning statement
Per agenzie di marketing e piccole imprese italiane che devono verificare un cliente prima di firmare, Greenlight è il servizio di verifica credito che restituisce un semaforo di rischio immediato e leggibile. A differenza di Cerved e Cribis, che offrono report complessi e costosi per professionisti della finanza, noi consegniamo una decisione sì/no in 30 secondi, senza abbonamento obbligatorio e senza carta di credito.

### Personalità del brand
**Siamo:** autorevoli, diretti, caldi, italiani.
**Non siamo:** una banca fredda, uno strumento per sviluppatori, un fintech generico viola/blu, una burocrazia digitale.

### Tone of Voice — 5 regole + esempi (italiano)

| Regola | Descrizione | Esempio PRIMA (da evitare) | Esempio DOPO (brand voice) |
|--------|-------------|----------------------------|----------------------------|
| 1. Italiano semplice | Niente gergo fintech. "Merito creditizio" diventa "affidabilità". | "Il tuo merito creditizio è medio-alto." | "L'azienda è affidabile. Puoi procedere." |
| 2. Decisione chiara | Ogni comunicazione porta a un'azione: firma, acconto, ferma. | "Score: 67/100. Valuta con attenzione." | "Giallo — Attenzione. Ti consigliamo un acconto." |
| 3. Caldo, non istituzionale | Parliamo come un consulente di fiducia, non come un impiegato di sportello. | "La richiesta è stata elaborata con successo." | "Verifica fatta. Ecco il risultato." |
| 4. Breve | Ogni schermata ha al massimo un'idea principale. | Lunghi paragrafi di spiegazione. | Frasi corte, elenchi puntati. |
| 5. Onesto | Non promettiamo ciò che i dati non dicono. | "Garantiamo che il cliente pagherà." | "I dati dicono che è affidabile al momento della verifica." |

---

## 5.2 Identità visiva

### Logo
- **Primary:** wordmark "Greenlight" in serif italiano (GT Sectra Display o equivalente open: Source Serif 4), con icona semaforo stilizzata (quattro cerchi verticali, verde acceso) a sinistra.
- **Icon-only:** solo l'icona semaforo (favicon 16×16, app icon).
- **Wordmark:** solo il testo "Greenlight".
- **Clear space:** minima = altezza della lettera "G" del wordmark, su tutti i lati.
- **Versioni:** Positive (su bianco/carta), Negative (su nero/inchiostro), Mono (tutto nero o tutto bianco).
- **Minimum size:** 24px di larghezza (favicon, footer). Riproducibile chiaramente a 3 metri (fiera roll-up).

### Palette colori

#### Primary — Verde Foresta (marchio firma)
| Token | HEX | RGB | HSL | Uso |
|-------|-----|-----|-----|-----|
| `--color-primary-50` | `#f0fdf4` | 240,253,244 | 140, 72%, 96% | Sfondo leggero, stati attivi leggeri |
| `--color-primary-100` | `#dcfce7` | 220,252,231 | 140, 71%, 93% | Bordi, chip leggeri |
| `--color-primary-500` | `#22c55e` | 34,197,94 | 142, 71%, 45% | **Colore principale brand**, CTA primario, semaforo VERDE |
| `--color-primary-700` | `#15803d` | 21,128,61 | 142, 72%, 29% | Testo su sfondo chiaro, hover |
| `--color-primary-900` | `#14532d` | 20,83,45 | 142, 61%, 20% | Testo su sfondo primary |

**Uso consentito:** brand, CTA primari, stato VERDE, elementi di fiducia.
**Uso vietato:** mai usare per stati di errore o ROSSO.

#### Neutral (8 step da 50 a 950)
| Token | HEX | Uso |
|-------|-----|-----|
| `--color-neutral-50` | `#fafafa` | Sfondo chiaro (light mode carta) |
| `--color-neutral-100` | `#f5f5f5` | Sfondo secondario, card |
| `--color-neutral-200` | `#e5e5e5` | Bordi leggeri, divider |
| `--color-neutral-300` | `#d4d4d4` | Bordi input, placeholder |
| `--color-neutral-400` | `#a3a3a3` | Testo secondario, icone inattive |
| `--color-neutral-600` | `#525252` | Testo corpo |
| `--color-neutral-800` | `#262626` | Testo titoli, forte contrasto |
| `--color-neutral-950` | `#0a0a0a` | Sfondo dark mode, inchiostro |

#### Semantic — Semaforo credito (WCAG AA su bianco e su nero)
| Stato | Token | HEX | Uso | Contrasto minimo |
|-------|-------|-----|-----|------------------|
| VERDE | `--color-semantic-verde` | `#17b26a` | Affidabile, vai | ≥ 4.5:1 su bianco e nero |
| GIALLO | `--color-semantic-giallo` | `#f5c518` | Attenzione | ≥ 3:1 (grandi dimensioni, ≥18px) |
| ARANCIONE | `--color-semantic-arancio` | `#f07818` | Rischio medio | ≥ 4.5:1 |
| ROSSO | `--color-semantic-rosso` | `#e5484d` | Alto rischio, ferma | ≥ 4.5:1 |
| PENDING | `--color-semantic-pending` | `#6366f1` | In elaborazione | — |
| ERROR | `--color-semantic-error` | `#78716c` | Errore | — |

*Nota: il giallo è accessibile solo su testo grande o con bordo scuro. Su badge piccoli, usare sempre testo nero su giallo, non giallo su bianco.*

#### Accent — Oro spento
| Token | HEX | Uso |
|-------|-----|-----|
| `--color-accent` | `#b08968` | Elementi decorativi, prezzi, dettagli editoriali |

**Uso consentito:** dettagli, sottolineature, elementi Premium.
**Uso vietato:** mai come colore principale di stato o CTA.

---

### Tipografia

#### Font family
- **Heading / Display:** `Source Serif 4` (o GT Sectra Display in produzione). Pesi: 600, 700.
- **Body / UI:** `Inter`. Pesi: 400, 500, 600.
- **Mono / Dati tecnici:** `JetBrains Mono`. Uso: P.IVA, codice fiscale, punteggio numerico, date tecniche.

#### Type scale (rem)
| Livello | Font-size | Line-height | Letter-spacing | Font | Uso |
|---------|-----------|-------------|----------------|------|-----|
| display | clamp(2.3rem, 10.6vw, 9.5rem) | 0.84 | -0.035em | Serif | Hero titolo homepage |
| head | clamp(2rem, 1.35rem + 3vw, 3.75rem) | 0.95 | -0.025em | Serif | Sezioni principali |
| lead | clamp(1.1875rem, 1.05rem + 0.65vw, 1.625rem) | 1.3 | 0 | Serif | Sottotitoli editoriali |
| body | clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem) | 1.55 | 0 | Sans | Testo corpo |
| small | clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem) | 1.45 | 0 | Sans | Didascale, note |
| xs | 0.75rem | 1.4 | 0.02em | Sans | Etichette input, footer |

#### Regole di combinazione
- I titoli usano sempre il serif, maiuscolo (`uppercase`) per impatto editoriale.
- Il body usa sempre il sans.
- Il mono si usa per P.IVA, CF, punteggi, date — mai per testi lunghi.
- L'italic si usa solo per citazioni o sottolineature editoriali, mai per testo UI.

---

### Iconografia
- **Stile:** outlined, stroke 1.5px, corner radius arrotondato (non appuntito).
- **Libreria:** Lucide React (già in package.json). Coerente con shadcn/ui.
- **Do:** icone 24×24, stesso peso stroke ovunque, colore neutro o primario.
- **Don't:** icone riempite (filled), mix di stili, icone più grandi di 48px senza motivo.
- **Semaforo:** icona custom 4 cerchi verticali, non usare icone generiche di "traffic light" da librerie.

---

### Illustrazioni
- **Stile:** reportage fotografico italiano, toni caldi, luce naturale. Niente illustrazioni 3D generiche.
- **Quando usarle:** empty states, pagine errore, onboarding.
- **Palette consentita:** solo colori del brand (verde foresta, inchiostro, carta, oro spento).
- **Soggetti vietati:** handshake, grattacieli, uomini in stretta di mano, globi, puzzle, lampadine, fintech generici viola/blu.

---

### Fotografia
- **Direzione:** reportage italiano, uffici reali, aziende, strade di città italiane, persone al lavoro (non modelli in posa).
- **Filtri:** calore leggero, contrasto medio, saturazione ridotta del 10%.
- **Soggetti vietati:** handshake corporate, grattacieli, immagini stock fredde, persone con tablet in pose finte.

---

### Componenti UI

| Componente | Stile | Note |
|------------|-------|------|
| Pill / Badge | Liquid glass su dark, flat su light | Semafori piccoli, tag stato |
| Card | Bianco/carta su light, inchiostro su dark, bordo sottile | Nessun ombra pesante |
| Bottoni Primary | Verde foresta, testo bianco, padding 12px 24px, radius 6px | Hover: verde scuro |
| Bottoni Secondary | Outline neutro, testo inchiostro | Azioni secondarie |
| Bottoni Ghost | Trasparente, testo neutro | Azioni minime |
| Bottoni Destructive | Rosso semaforo, testo bianco | Eliminazioni, azioni irreversibili |
| Input | Bordo neutro 2px, focus ring verde foresta, radius 6px | Mascherine P.IVA/CF |
| Chips semaforo | Cerchio colorato + etichetta testuale | Verde/Giallo/Arancione/Rosso |
| Select | Come input, freccia giù neutra | Selezione provider |

---

### Motion
| Tipo | Durata | Easing | Uso |
|------|--------|--------|-----|
| Micro (hover, focus, toggle) | 150ms | cubic-bezier(0.22, 1, 0.36, 1) | Bottoni, input, tooltip |
| Transizione (pagina, modale) | 300ms | cubic-bezier(0.22, 1, 0.36, 1) | Route change, apri/chiudi card |
| Entrance (hero, sezione) | 600ms | cubic-bezier(0.2, 0.7, 0.3, 1) | Caricamento prima schermata |
| Ignite (semaforo hero) | 420ms | cubic-bezier(0.2, 0.7, 0.3, 1) | Delay 320ms, solo una volta |

**Cosa animare:** apparizione semaforo, accensione fonti, page transition, toast.
**Cosa NON animare:** testo leggibile, tabelle, input form, link.

---

### Sound (opzionale)
Non implementato in v1. Se aggiunto in futuro: breve feedback sonoro differenziato su VERDE (conferma leggera) e ROSSO (alert sobrio). Mai su caricamento. Accessibilità: sempre disattivabile e mai autoplay.

---

## 5.3 Copy & Messaggi

### Tagline primaria
**"Il semaforo del credito per le tue decisioni."**

### 3 varianti tagline
1. "Verde firmi, rosso ti fermi." (diretto, campagna)
2. "Verifica un cliente in 30 secondi." (beneficio tempo)
3. "Il via libera per i tuoi clienti." (tagline storica, mantenuta per continuità)

### Elevator pitch (30 sec)
"Greenlight è il servizio che dice a un'agenzia o a una piccola impresa se può fidarsi di un nuovo cliente. Inserisci la partita IVA, interroghiamo Cerved, Cribis e Credit Safe, e in 30 secondi ti mostriamo un semaforo: verde puoi firmare, giallo chiedi un acconto, rosso fermati. I primi 5 check al mese sono gratis, senza carta di credito."

### Headline homepage (3 opzioni A/B)
A. "Il semaforo del credito per le tue decisioni." (consigliata)
B. "Verifica un cliente in 30 secondi. Senza carta."
C. "Prima di firmare, sai se puoi fidarti."

### Micro-copy critica
| Contesto | Testo italiano |
|----------|----------------|
| CTA principale | Verifica un'azienda — 5 check gratis |
| CTA secondario | Vedi i prezzi |
| Bottone registrazione | Crea account |
| Bottone login | Accedi |
| Empty state dashboard | Nessuna verifica ancora. Fai la tua prima verifica per sapere se puoi fidarti di un nuovo cliente. |
| Errore provider | La fonte dati non ha risposto. Riprova tra qualche minuto o scegli un altro provider. |
| Successo verifica | Verifica completata. Report disponibile. |
| Conferma pagamento | Piano attivato. I tuoi check mensili sono disponibili. |
| Etichetta VERDE | Affidabile — puoi procedere. |
| Etichetta GIALLO | Attenzione — ti consigliamo un acconto. |
| Etichetta ARANCIONE | Rischio medio — procedi con cautela. |
| Etichetta ROSSO | Alto rischio — non procedere senza garanzie. |

### 5 FAQ (obiezioni Fase 1)

**1. È un altro abbonamento?**
No. I primi 5 check al mese sono gratis, senza carta di credito. Paggi solo se superi la soglia Free.

**2. Non so leggere uno score.**
Non usiamo score complicati. Usiamo il semaforo: verde = affidabile, giallo = attenzione, rosso = fermati.

**3. Ho già Cerved.**
Cerved va bene per le grandi pratiche. Greenlight è per la decisione rapida, prima di firmare un contratto, in 30 secondi.

**4. I dati sono ufficiali?**
Sì. Interroghiamo Cerved, Cribis e Credit Safe, le fonti ufficiali italiane. Stessa fonte, interfaccia umana.

**5. I miei dati sono al sicuro?**
Sì. Usiamo crittografia JWT, nessun dato venduto a terzi, conforme GDPR.

---

## 5.4 Do & Don't — 20 regole visive

| # | Regola | Esempio |
|---|--------|---------|
| 1 | Il semaforo deve essere sempre visibile con etichetta testuale + colore. | Mai solo un puntino colorato senza testo. |
| 2 | Usa solo i colori semantic del brandbook per gli stati. | Non usare rosso Tailwind default per ROSSO. |
| 3 | Il giallo semaforo va con testo nero, mai giallo su bianco. | Badge giallo con testo "#0b0c0b". |
| 4 | I titoli usano sempre il serif, mai il sans per h1-h2. | Hero in Source Serif 4. |
| 5 | Il mono si usa solo per P.IVA, CF, punteggi. | Mai per paragrafi lunghi. |
| 6 | Nessun gradiente viola/azzurro fintech generico. | Palette: verde foresta, inchiostro, carta, oro. |
| 7 | Dark mode è first-class, non afterthought. | Ogni componente ha variabile light e dark. |
| 8 | Nessun handshake, grattacielo, puzzle, lampadina. | Fotografia reportage italiano reale. |
| 9 | CTA primario sempre verde foresta. | Mai rosso o blu per l'azione principale. |
| 10 | Clear space logo = altezza della "G". | Mai elementi troppo vicini al logo. |
| 11 | Logo minimo 24px, leggibile a 3 metri. | Testare su favicon e roll-up. |
| 12 | Input con mascherina per P.IVA (11 cifre) e CF (16). | Input libera genera errori. |
| 13 | Durante attesa API, mai pagina bianca. | Skeleton + testo "Interrogo le fonti…". |
| 14 | Toast per successo/errore, mai alert nativo. | Coerenza UI. |
| 15 | Link esterni si aprono in nuova scheda con icona. | Chiarezza navigazione. |
| 16 | Spaziatura basata su griglia 4px. | Margini e padding multipli di 4. |
| 17 | Radius componenti: 6px (card/input), 999px (pill). | Coerenza forme. |
| 18 | Nessun testo sotto i 12px per contenuto leggibile. | Accessibilità. |
| 19 | Focus visibile su ogni elemento interattivo. | Tastiera nav. |
| 20 | Stato vuoto sempre con CTA educativo. | Mai "nessun dato" senza bottone d'azione. |

---

## 5.5 Design Tokens

Vedi file separati:
- `design-tokens.json` — token JSON per Figma e codice.
- `tailwind.config.ts` — drop-in replacement per il repo.
- `design-tokens.css` — CSS variables per dark/light mode.
