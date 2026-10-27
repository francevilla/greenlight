# Greenlight — Audit UI/UX & Copy

**Data:** 27 ottobre 2026
**Perimetro:** `frontend/` — `/` (splash), `/semaforo` (landing prodotto), `/login`, `/register`, `/dashboard`
**Metodo:** build di produzione (`npm run build` + `vite preview`), ispezione DOM/CSS, screenshot a 1440×900 e 390×844, misura dei contrasti con alpha-compositing, test tastiera, test del flusso demo e dei form. Il backend gira su provider mock: i giudizi riguardano l'interfaccia e il copy, non la qualità dei dati erogati.

**Evidenze:** `design-delivery/audit-evidence/` (10 screenshot).

---

## Scorecard

| Criterio | Voto | Nota in una riga |
|---|:---:|---|
| Gerarchia visiva & scan-ability | **2/10** | L'H1 della home è tagliato di 510 px a 1440; l'above-the-fold di `/semaforo` è nero su nero. |
| Coerenza & design system | **3/10** | Tre design system, due display font, tre verdi, quattro loghi. |
| Interazione & micro-UX | **4/10** | Stati FAQ assenti, focus invisibile su fondo scuro, header che si rompe sulle sezioni bicolore. |
| Mobile (strutturale) | **3/10** | Nessun menu, nessuna CTA in header, 12 schermate di scroll, 14 tap target sotto 44 px. |
| Value proposition | **4/10** | La metafora è ottima, ma non dice per chi è né cosa evita. |
| Chiarezza vs creatività | **6/10** | Il copy migliore è sepolto; lo "score" contraddice la promessa "non usiamo score". |
| CTA & conversione | **3/10** | La CTA primaria porta a una demo; "Inizia gratis" su un piano da 79 €. |
| Tono di voce & scansione | **6/10** | Voce giusta quando è concreta; FAQ che rispondono alle domande sbagliate. |
| Fiducia & proof | **1/10** | Zero loghi, zero testimonial, zero dati. Footer senza partita IVA. Link legali morti. |
| Performance tecnica | **6/10** | 176 KB JS gzip, FCP 248 ms in locale; ma un solo chunk da 540 KB e 5 CSS font bloccanti. |
| **Totale** | **3,8/10** | **Un'idea di brand da 8 eseguita come un prototipo.** |

---

## 1. Executive Summary

**Verdetto brutale:** Greenlight ha un'identità visiva potenzialmente memorabile e un copy, in alcuni punti, già pronto per il mercato. Ma il sito, così com'è, **non riesce a dire cosa fa a un utente che arriva per la prima volta**, perché metà delle sezioni chiave sono letteralmente invisibili e l'altra metà parla di sé invece che del cliente.

### Cosa funziona (e va difeso)

1. **La metafora del semaforo è un asset raro.** "Verde firmi, rosso ti fermi" è una value proposition in cinque parole. Il 90% dei SaaS B2B italiani non ha niente di così chiaro. Il problema è che questa frase è al 14° posto nella gerarchia della pagina, dentro un paragrafo da 14 px.
2. **Il campo di colore a tutta pagina è una scelta coraggiosa e giusta.** La sezione "Quattro stati" è l'unica cosa che un utente ricorderà domani. È anche troppo lunga (2,7 schermate desktop per dire quattro cose), ma la direzione è quella.
3. **La demo interattiva è il miglior pezzo di prodotto sul sito.** Il pannello "Esito verifica" con le tre fonti che si accendono, il verdetto giallo e la raccomandazione operativa è esattamente ciò che serve per vendere. Oggi è sepolta sotto la hero e non è mai mostrata above the fold.
4. **La voce, quando è concreta, è ottima:** "La divergenza è un'informazione: ti diciamo di quanto, non la nascondiamo in una media", "Non insistere: senza garanzie, ogni euro anticipato è un euro a rischio". Questo è un consulente che parla, non un reparto marketing.

### I sei colli di bottiglia che uccidono la conversione

1. **Above the fold invisibile o mutilato.** Su `/semaforo` la hero ha `bg-verde`, classe che **non esiste** nel `tailwind.config.js` (l'oggetto `verde` non ha `DEFAULT`). Il fondo resta nero, il testo è `text-ink` nero: contrasto **1:1**. Lo stesso bug rende invisibili Closing, CTA del footer e stato aperto delle FAQ. Sulla splash `/`, l'H1 è più largo del viewport: **510 px tagliati a 1440**, 276 px a 768. Al primo paint della home il visitatore vede un rettangolo nero con quattro pallini.
2. **Tre prodotti in uno.** `/` è un poster serif centrato con un bottone a pillola; `/semaforo` è un editoriale svizzero in Archivo con campi di colore; `/login` e `/dashboard` sono shadcn con card arrotondate. Cambiano display font, raggio, densità, logo e verde. L'utente non capisce quale sia "la home" e il brand perde autorevolezza a ogni click.
3. **La promessa non è il prodotto.** Il sito dice "Cerved, Cribis e Credit Safe interrogati in parallelo", "Tre fonti. Un solo verdetto", "confrontale sullo stesso soggetto". Il form reale chiede **una sola fonte** (`Fonte dati: Cerved`), e l'API accetta un solo `provider`. Peggio: il pannello "Verdetto Greenlight" mostra **80,8 · Giallo**, mentre le soglie dichiarate dicono 80–100 = Verde. Due incoerenze che un compratore esperto vede in tre secondi.
4. **Zero presidio di fiducia.** Nessun logo cliente, nessun testimonial, nessun numero ("12.000 verifiche"), nessuna sezione sicurezza/GDPR. Il footer non ha ragione sociale né partita IVA. "Termini di Servizio" e "Privacy Policy" puntano a `#`. "Password dimenticata?" porta a `/forgot-password`, che non esiste e rimbalza sulla home. Per un prodotto che tratta dati di credito, questo è un blocco all'acquisto, non un dettaglio.
5. **La conversione è puntata al bersaglio sbagliato.** La CTA primaria della hero, "Verifica un'azienda", porta a una **demo con dati inventati**, non al prodotto. La secondaria, "Inizia gratis", è quella che genera revenue, ma è vestita da ghost button. Sui prezzi, "Inizia gratis" è il bottone di **entrambi** i piani, anche di quello da 79 €/mese. Su mobile non c'è menu e non c'è CTA: l'unica strada verso prezzi e FAQ è un'icona globo senza etichetta in fondo alla splash.
6. **Il sito risponde alle domande sbagliate.** Il brandbook identifica cinque obiezioni d'acquisto (è un altro abbonamento? non so leggere uno score; ho già Cerved; i dati sono ufficiali?; i miei dati sono al sicuro?). La FAQ live non ne contiene **nessuna**: parla di dove vengono i dati e di cosa succede a fine mese. Nel frattempo lo "score" è protagonista ovunque, mentre la promessa di brand è "non usiamo score complicati".

### Se potessi fare solo tre cose

1. **Ripristinare la visibilità**: `bg-verde` → `bg-[var(--verde)]` (4 file) e togliere il `whitespace-nowrap` dall'H1. Mezza giornata, +80% della value proposition recuperata.
2. **Una sola home**: `/` diventa l'editoriale completo, `/semaforo` viene assorbita. Il poster serif non è una home, è una copertina.
3. **Onestà + prova**: allineare la promessa multi-provider al prodotto (o implementarla) e aggiungere una fascia di proof + footer legale. Senza questi due, ogni euro speso in traffico è un euro che rimbalza.

---

## 2. Bug verificati (evidenza riproducibile)

| # | Sintomo | Causa tecnica | File | Impatto |
|:--:|---|---|---|---|
| 1 | Hero, Closing, tile CTA footer e FAQ aperte invisibili | `bg-verde` non esiste: in Tailwind `verde` è un oggetto `{50…900}` senza `DEFAULT` | `Hero.tsx:15`, `Closing.tsx:7`, `Footer.tsx:55`, `Faq.tsx:49`, `tailwind.config.js:44-50` | Contrasto 1:1 su ~3 schermate desktop |
| 2 | H1 splash tagliato su ogni desktop | `md:whitespace-nowrap` + `--step-display` fino a 152 px | `LandingPage.tsx:67-72`, `design-tokens.css:48` | 276 px clip @768, 510 px @1440, 30 px @1920 |
| 3 | Logo header bianco su carta nella sezione prezzi | Il tono è deciso dal solo punto centrale (`innerWidth/2, 64`), che cade sulla card scura "Pro" | `SiteHeader.tsx:20-29` | Logo illeggibile |
| 4 | Header nero su hero nera | Tono `ink` su fondo `ink` finché `bg-verde` è rotto | `SiteHeader.tsx:46-47` | Navigazione invisibile al primo paint |
| 5 | "GreenlightRegistrati" attaccati a 390 px | Brand e azioni senza gap nel flex; `Registrati` resta visibile sotto `sm` | `LandingPage.tsx:22-61` | Collisione tipografica in home mobile |
| 6 | "80,8 · Giallo" contro soglie 80–100 = Verde | Dato hardcoded non coerente con `SOGLIE` | `Providers.tsx:58-63`, `lib/demo.ts:30-55` | Incoerenza che distrugge la fiducia nel modello |
| 7 | FAQ aperte senza stato visivo | `open:bg-verde` non genera classe | `Faq.tsx:49` | Solo il "+" cambia in "−" |
| 8 | Mobile senza menu e senza CTA | Nav `hidden md:flex`; "Inizia gratis" `hidden sm:inline` | `SiteHeader.tsx:59,80` | Nessun percorso a prezzi/FAQ/registrazione |
| 9 | "Password dimenticata?" rimbalza in home | `/forgot-password` non esiste; catch-all → `/` | `LoginPage.tsx:95`, `App.tsx:67` | Utente bloccato fuori dall'account |
| 10 | Termini e Privacy non cliccabili davvero | `to="#"` | `RegisterPage.tsx:181-185` | Fiducia/legale |
| 11 | 14 tap target sotto 44 px su mobile | Link footer 26 px, esempi P.IVA 19 px | `Footer.tsx`, `LiveCheck.tsx` | Accessibilità e errori di tap |
| 12 | Focus tastiera invisibile sui fondi scuri | Outline default `#101010` su `#0b0c0b` | tutti i link marketing | Navigazione da tastiera compromessa |
| 13 | Nessuna anteprima social, titolo identico su tutte le route | Nessun OG/Twitter/canonical; `index.html` statico | `index.html` | Link condivisi ciechi; SEO debole |
| 14 | Barra KPI dashboard esce dalla card su 390 | Griglia 2 col + progress + label `40%` | `DashboardPage.tsx:199-226` | Dato tagliato su mobile |

> Nota: il bug #1 è la causa singola con il rapporto impatto/sforzo più alto di tutto il progetto. Non è un problema di design, è un refuso di configurazione.

---

## 3. Architettura dell'informazione

### Problema

Il repository contiene **due landing complete e concorrenti**:

- `/` → `LandingPage.tsx`: splash cinematografica, serif, 1.146 px di altezza desktop, 43 parole, zero prezzi, zero FAQ, zero proof. La CTA più importante porta a "Il manifesto".
- `/semaforo` → `SemaforoSite.tsx`: la vera pagina di vendita, 8.538 px desktop / 10.279 px mobile, con demo, prezzi e FAQ.

Gerarchia dei percorsi:

```
/            → poster + email capture → /register
/semaforo    → pagina di vendita completa (raggiungibile solo dal logo? no: da "Il prodotto")
/login       → app
/register    → app
```

Su desktop, "Il prodotto" porta a `/semaforo#stati`: un'ancora sui quattro colori, non una panoramica del prodotto. Su mobile quel menu non esiste e l'unico ingresso a `/semaforo` è il **globo senza etichetta** in fondo alla splash. Di fatto, il 100% degli utenti mobile non vede mai prezzi, FAQ e demo.

Inoltre "Il manifesto" è un nome che promette un documento di brand e consegna una pagina prezzi. È una promessa di contenuto sbagliata: l'utente che clicca non si aspetta un listino.

### Soluzione

1. **Una home sola.** La home è `/semaforo`, promossa a `/`. La splash serif non sparisce: diventa la **hero** della home (o una pagina `/manifesto` reale, linkata nel footer).
2. **`/semaforo` → redirect 301 a `/`** per non perdere i link esistenti.
3. **Ordine delle sezioni consigliato:**

```
1. Hero: verdetto + CTA            (value prop in 3")
2. Trust strip                      (loghi / numeri / "dati da Cerved, Cribis, Credit Safe")
3. Demo                             (il prodotto che si vede)
4. Come funziona                    (3 passi, 1 schermata)
5. Decoder stati                    (4 colori, 1 schermata)
6. Provider                         (la divergenza come valore)
7. Prezzi                           (tabella confronto)
8. FAQ                              (5 obiezioni + 2 legali)
9. Closing                          (offerta + riduzione del rischio)
10. Footer                          (legale, contatti, dati)
```

Oggi mancano completamente i punti 2, 8 (come obiezioni) e 10 (come contenuto). I punti 5 e 6 sono invertiti di peso: la sezione colori costa 2,7 schermate, la sezione provider (il vero differenziatore) ne costa 0,75.

4. **Nav:** `Come funziona · Prezzi · Domande · Accedi` + CTA `Prova gratis`. Basta. "Prova" e "Il prodotto" sono etichette interne, non parole del cliente.

---

## 4. Hero

### Analisi UI (Taste)

**Splash `/`** (`audit-evidence/01`, `02`)

- L'H1 è **più largo del viewport** su tutte le larghezze da 768 a 1920: 510 px tagliati a 1440, 276 px a 768. Il testo viene centrato e croppato ai due lati, quindi si legge "EMAFORO DEL CRED…". Il `overflow-hidden` sulla radice nasconde la barra di scorrimento e **maschera il bug**: sembra una scelta, è un errore.
- L'elemento più grande della pagina è un **cerchio verde di 255 px** che non contiene nulla. Si chiama `CreditScoreGauge` ma non ha né gauge né punteggio. Comunica "verde" senza dire verde *rispetto a cosa*. È decorazione, non informazione.
- Gerarchia reale: titolo croppato → cerchio → form piccolo → tre icone misteriose. La CTA di conversione (email) è il quarto elemento per peso visivo, e il submit è una **freccia senza testo**.
- Il nav mobile ha logo e "Registrati" a contatto (0 px di gap): si legge "GreenlightRegistrati".
- Le tre icone finali (globo, login, user-plus) duplicano l'header e non hanno etichetta visibile: mystery meat. La prima porta a `/semaforo`, cioè all'unica pagina che conta, ma nessuno lo sa.

**`/semaforo`** (`audit-evidence/03`, `04`)

- Hero a 100 svh con `justify-between`: titolo in alto, contenuto in basso, un buco di ~400 px in mezzo. Il campo verde previsto non c'è (bug #1): resta un rettangolo nero con testo nero. L'unico elemento leggibile è il bottone "Verifica un'azienda".
- Anche a bug risolto, il semaforo disegnato (4 lampade da 54 px) è **piccolo e senza contesto**: non è un'anteprima del prodotto, è un pittogramma. Il pannello "Esito verifica" che sta 900 px più sotto sarebbe una hero migliore.
- Il titolo in Archivo 800 uppercase a 96 px è forte e giusto per la metafora "segnaletica". Ma il brandbook prescrive il serif: la pagina sta già raccontando un'altra storia rispetto ai propri documenti.

### Analisi Copy

Attuale (splash):

> **Il semaforo del credito per le tue decisioni.**
> Greenlight interroga Cerved, Cribis e Credit Safe su una partita IVA e restituisce il semaforo: verde firmi, rosso ti fermi. Cinque verifiche gratis, senza carta.
> [email] [→] · Il manifesto

Criticità:

- **"Per le tue decisioni"** è riempitivo: vale per qualsiasi software B2B. Non dice *quale* decisione (firmare), *per chi* (agenzie e PMI che vendono alle imprese), *cosa evita* (l'insoluto), *in quanto tempo* (30 secondi).
- La frase più forte, **"verde firmi, rosso ti fermi"**, è al 26° posto nella pagina e in corpo 14. È l'unica cosa che andrebbe in H1 o nel sottotitolo.
- **"Il manifesto"** non è una CTA: è un genere letterario. Non dice cosa succede dopo il click, non contiene un verbo d'azione, non anticipa il valore.
- La capture email non ha una promessa ("cosa ricevo?"), non ha microcopy di rassicurazione (niente spam? account gratuito?) e porta a un form di 4 campi: doppio attrito.
- "Cinque verifiche gratis, senza carta" è ripetuto **cinque volte** nel sito (hero, closing, pricing, footer, FAQ) senza mai aggiungere informazione. La ripetizione non è persuasione, è rumore.

Attuale (`/semaforo`):

> **Il semaforo del credito.**
> Cerved, Cribis e Credit Safe interrogati in parallelo su una partita IVA. In trenta secondi sai se puoi firmare, e cosa chiedere se non puoi.

Criticità: il sottotitolo è **buono** (beneficio + tempo + seconda azione). Manca solo il "per chi". Il titolo è una categoria, non un beneficio: chi non conosce Greenlight non sa se sta guardando un blog, un prodotto o una ONG.

### Riscrittura (A/B ready)

**Variante A — job-led (consigliata come challenger)**

- Eyebrow: `Verifica credito per agenzie e piccole imprese`
- H1: **Prima di firmare, guarda il semaforo.**
- Sub: `Inserisci la partita IVA del cliente. In 30 secondi sai se puoi firmare, chiedere un acconto o fermarti.`
- CTA primaria: `Verifica un'azienda — 5 gratis`
- CTA secondaria: `Guarda un esempio`
- Micro: `5 verifiche al mese, senza carta. Poi da 29 €/mese.`

**Variante B — risk-led (per traffico freddo / paid)**

- H1: **Un insoluto costa più di un abbonamento.**
- Sub: `Controlla l'affidabilità di un cliente prima di firmare. Cerved, Cribis e Credit Safe in un unico verdetto: verde firmi, giallo chiedi un acconto, rosso ti fermi.`
- CTA: `Controlla un cliente ora — gratis`
- Micro: `5 verifiche al mese. Nessuna carta.`

**Variante C — brand control (mantiene la metafora, aggiunge il target)**

- H1: **Il semaforo del credito per chi vende alle imprese.**
- Sub: identico ad A.
- CTA: identico ad A.

**Ipotesi di test:** A batte C sul click-through primario perché sostituisce una categoria con un momento della vita reale ("prima di firmare"). B batte A su traffico paid perché quantifica la perdita. Metrica primaria: click CTA primaria → registrazione completata. Guardrail: bounce rate e tempo al primo scroll.

### Blueprint above the fold (desktop)

```
┌──────────────────────────────────────────────────────────────┐
│ Greenlight        Come funziona  Prezzi  Domande   Accedi  [Prova gratis] │
├──────────────────────────────────────────────────────────────┤
│ VERIFICA CREDITO PER AGENZIE E PMI                           │
│                                                              │
│ Prima di firmare,                          ┌───────────────┐ │
│ guarda il semaforo.                        │ ESITO VERIFICA│ │
│                                            │ Bellini S.r.l.│ │
│ Inserisci la partita IVA del cliente.      │  ● ● ● ●  ｜87 │ │
│ In 30 secondi sai se puoi firmare,         │ Cerved   84.2 │ │
│ chiedere un acconto o fermarti.            │ Cribis   71.8 │ │
│                                            │ C.Safe   86.5 │ │
│ [ Verifica un'azienda — 5 gratis ]         │ VERDE · firmi │ │
│ [ Guarda un esempio ]                      └───────────────┘ │
│ 5 verifiche al mese, senza carta.                            │
└──────────────────────────────────────────────────────────────┘
```

Il pannello a destra è il prodotto, non un'icona. È già costruito in `LiveCheck.tsx`: basta spostarlo.

---

## 5. Demo (`LiveCheck`)

### Analisi UI

- È il pezzo migliore: input + pannello esito + tre fonti che si accendono in sequenza. Il feedback è chiaro e la transizione è breve.
- Ma il pannello a riposo è **vuoto e muto**: "In attesa di una partita IVA", tre righe con "—", un rettangolo nero con testo al 60%, e il semaforo con quattro lampade quasi spente. Occupa 492 px per non dire nulla.
- Il timer mostra **00:31 hardcoded** mentre l'animazione dura ~1,2 s. È un dettaglio che grida "finto" a chi guarda.
- Su mobile il nome azienda è troncato in modo permanente: "Atelier Grafico Ferran…" (`truncate`), senza modo di leggere il resto. In una demo che deve dimostrare chiarezza, è il contrario.
- Il disclaimer "Demo: dati di esempio" è in 12 px al 60%: corretto averlo, insufficiente come segnalazione. Il verdetto colorato è l'elemento più forte e può essere letto come reale.

### Analisi Copy

Attuale:

> **Provaci con una partita IVA.**
> Demo con dati di esempio: nessuna azienda reale viene interrogata, nessuna visura viene addebitata.
> Partita IVA (11 cifre) · [01234567890] · [Verifica]
> Oppure prova con: 01234567890 · 09876543210 · 05566778899

Criticità:

- **"Provaci"** è generico e mette l'onere sul visitatore. Non dice cosa vedrà.
- Il disclaimer è più lungo del beneficio e arriva prima di aver creato interesse.
- Chiedere una partita IVA (dato reale, potenzialmente di un cliente reale) per mostrare **dati inventati** è un rischio: qualcuno inserirà la P.IVA di un proprio cliente e leggerà un verdetto falso. Il disclaimer in 12 px non basta.
- Il bottone "Verifica" è disabilitato sotto le 11 cifre con opacità 0.45 e nessuna spiegazione: sembra rotto.

### Riscrittura

- H2: **Guarda com'è fatto un verdetto.**
- Sub: `Questa è una demo: i dati sono inventati e nessuna azienda viene interrogata. Nel prodotto vero bastano ragione sociale e partita IVA.`
- Label: `Scegli un esempio` → 3 chip cliccabili (P.IVA + nome azienda). Input libero opzionale, con badge `DEMO` sopra il pannello.
- Bottone: `Mostra il verdetto`
- Stato vuoto: `Seleziona un esempio per vedere le tre fonti e la raccomandazione.`
- Sopra il pannello, badge permanente: `DEMO — dati di esempio`.
- Sotto il pannello: `Ti serve su un cliente vero? [Apri l'account — 5 verifiche gratis]`

**Perché:** si elimina il rischio di interpretare un verdetto falso come reale, si riduce l'attrito (un click invece di 11 cifre) e si trasforma la demo in un ponte verso la registrazione invece che in un vicolo cieco.

---

## 6. Come funziona

### Analisi UI

- Titolo a sinistra, tre passi a destra: composizione corretta, ma i tre passi hanno altezze diverse e il terzo contiene uno screenshot "Storico" che sembra appiccicato. Il ritmo verticale si sfonda.
- Il blocco "Storico" usa pallini da 9 px per lo stato: illeggibili e senza etichetta. È l'unico posto in cui il prodotto viene mostrato come interfaccia, e mostra la cosa meno comprensibile.
- `data-tone="paper"` su fondo `bg-ink`: funziona per caso, perché il probe del header legge il tono del testo, non del fondo. Un futuro refactor lo rompe.

### Analisi Copy

Attuale:

> **Tre passi e una firma.**
> 1. Inserisci la partita IVA. — Bastano ragione sociale e partita IVA. Nessun upload, nessuna visura da cercare prima.
> 2. Interroghiamo i tre provider. — Cerved, Cribis e Credit Safe rispondono separatamente: vedi dove sono d'accordo e dove no.
> 3. Leggi il semaforo. — Un colore, un punteggio, e la decisione che ne segue. L'esito resta nello storico ed è esportabile.

Criticità:

- "Tre passi e una firma" è buono, ma **"e una firma"** suggerisce che il tool firmi. Non è chiaro che la firma è la *tua* decisione.
- Il passo 2 descrive una funzione che il prodotto non ha (tre provider in parallelo). È la stessa promessa non mantenuta della hero.
- Il passo 3 mette "un punteggio" prima della decisione, contro il posizionamento "non usiamo score".

### Riscrittura

- H2: **Tre passi. Poi decidi tu.**
- 1. `Inserisci la partita IVA.` — `Bastano ragione sociale e partita IVA. Niente visure da cercare, niente PDF da leggere.`
- 2. `Leggi le fonti.` — `Cerved, Cribis e Credit Safe rispondono separatamente: vedi dove sono d'accordo e dove no.` *(se il multi-provider non è implementato, sostituire con: "Scegli la fonte che ti serve. Se le fonti divergono, te lo diciamo.")*
- 3. `Prendi la decisione.` — `Verde firmi, giallo chiedi un acconto, rosso ti fermi. L'esito resta nello storico ed è esportabile.`
- Sostituire il blocco "Storico" con un mini-pannello "Verdetto" (colore + azione + data), non con pallini.

---

## 7. Sezione "Quattro stati"

### Analisi UI

- Visivamente è la cosa più forte del sito: quattro campi pieni, tipografia enorme, nero su colore. È anche **2.448 px desktop / 2.296 px mobile**, cioè 2,7 e 2,7 schermate, per quattro informazioni che stanno in una tabella.
- La prima card ha un box "Esempio" con azienda e score; le altre tre hanno una riga di testo. Incoerenza interna: la prima sembra una scheda, le altre delle note.
- Il numero di score è in `text-lead` con `font-medium`, quindi il dato più tecnico è anche il più leggibile dopo il nome dello stato. Gerarchia invertita rispetto alla promessa "la decisione è il prodotto".
- Il verde #17b26a con inchiostro #0b0c0b ha contrasto 7,1:1, il giallo 11,2:1, l'arancione 6,9:1, il rosso 5,0:1. **I contrasti sono corretti**: il problema non è l'accessibilità, è la densità.

### Analisi Copy

Attuale:

> Quattro stati, quattro decisioni
> **VERDE** — score 80–100 · Affidabile
> Segnale pulito: le tre fonti concordano e non ci sono protesti aperti.
> Firma. Nessuna garanzia aggiuntiva: procedi con il contratto standard.
> Esempio: Officina Meccanica Bellini S.r.l. · score 87 · Cerved, Cribis e Credit Safe concordi

Criticità:

- "Segnale pulito" è gergo interno. "Non ci sono protesti aperti" è buono, concreto.
- L'azione ("Firma…") è la cosa più utile ed è **la seconda**. Deve essere la prima.
- "Affidabile" è un aggettivo, non una decisione. "Firmi" è una decisione.
- Lo score è in prima posizione e in corpo grande: il brand dice "non usiamo score", il sito ne fa il protagonista. Scegliere.

### Riscrittura

| Stato | Titolo | Riga 1 (decisione) | Riga 2 (perché) | Dato |
|---|---|---|---|---|
| Verde | **Firmi.** | `Procedi con il contratto standard, senza garanzie aggiuntive.` | `Le tre fonti concordano, nessun protesto aperto.` | `80–100` |
| Giallo | **Chiedi un acconto.** | `Anticipo o fideiussione, pagamenti a 30 giorni.` | `Ritardi ricorrenti o bilanci in calo.` | `55–79` |
| Arancione | **Spezza l'ordine.** | `Consegna a tranche, monitoraggio ogni 30 giorni.` | `Il rischio è concreto e va presidiato.` | `30–54` |
| Rosso | **Non firmi.** | `Nessuna apertura senza pagamento anticipato o garanzia bancaria.` | `Senza garanzie, ogni euro anticipato è a rischio.` | `0–29` |

**UI:** una sola schermata, quattro colonne (2×2 su mobile) con il colore come fondo delle card, non come sezione a tutta pagina. Il campo di colore full-bleed resta come banda dietro il titolo della sezione. Si recuperano **1.700 px** di scroll e si arriva ai prezzi una schermata prima.

**Nota:** togliere lo "score" dal primo piano non significa nasconderlo. Resta nel pannello esito come dato tecnico, in mono, con etichetta "punteggio". La decisione è il prodotto, il punteggio è la prova.

---

## 8. Provider / "Tre fonti"

### Analisi UI

- Il pannello scuro è ben fatto: tre fonti, punteggi, semaforo da 9 px, verdetto aggregato. È la dimostrazione visiva del differenziatore.
- I semafori da 9 px accanto ai punteggi sono **troppo piccoli** per essere letti come stato: sembrano puntini decorativi. A 9 px, con opacità 0,16 sulle lampade spente, il colore acceso è l'unica differenza percepibile. Alzare a 14 px minimo o sostituire con un badge testuale + colore.
- "Verdetto Greenlight 80,8 Giallo · chiedi garanzie": il numero è grande, la decisione è piccola e grigia. Invertire i pesi.

### Analisi Copy

Attuale (estratto):

> **Tre fonti. Un solo verdetto.**
> Gli schedari non dicono sempre la stessa cosa: Cribis pesa le esperienze di pagamento, Credit Safe i protesti, Cerved i bilanci. Scegli la fonte per ogni verifica, oppure confrontale sullo stesso soggetto.
> Quando le fonti divergono, la divergenza è un'informazione: ti diciamo di quanto, non la nascondiamo in una media.
> … Verdetto Greenlight **80,8** Giallo · chiedi garanzie

Criticità:

- Il copy è **il migliore del sito** fino a "non la nascondiamo in una media". Poi il pannello mostra **la media** (80,8) come verdetto. Il testo accusa la media e il prodotto la usa. È una contraddizione visibile in 10 cm di schermo.
- 80,8 ricade in 80–100 = Verde, ma il verdetto dice Giallo. O il modello è sbagliato, o il dato è hardcoded. In entrambi i casi, chi valuta un fornitore di credito lo nota.
- "Scegli la fonte per ogni verifica, oppure confrontale sullo stesso soggetto": la prima parte è vera, la seconda no (il form ha un solo provider).

### Soluzione (prodotto + copy, non solo copy)

Adottare una **regola del più prudente**: il verdetto non è la media, è lo stato della fonte più cauta. Cribis 71,8 = Giallo → verdetto Giallo, anche se la media è 80,8. È difendibile, conservativo e coerente con la promessa "non nascondiamo la divergenza".

Riscrittura del blocco:

> **Tre fonti. Un solo verdetto.**
> Cerved guarda i bilanci, Cribis come paga, Credit Safe i protesti. Quando non sono d'accordo, vince la fonte più prudente: meglio un acconto chiesto per errore che un insoluto.
>
> Verdetto: **Giallo — chiedi garanzie**
> Media 80,8 · fonte più prudente Cribis 71,8

**Perché:** risolve l'incoerenza matematica, rende il prodotto più serio di una media, e trasforma la divergenza in un argomento di vendita invece che in un dettaglio tecnico.

Se il multi-provider non verrà implementato a breve, la frase "interrogati in parallelo" va rimossa **da tutto il sito** (hero, come funziona, pricing Pro, FAQ) e sostituita con "Scegli la fonte. Confronta quando serve." È un intervento di copy, non di prodotto, e va fatto prima di comprare traffico.

---

## 9. Prezzi

### Analisi UI

- **Manca un H2 visibile.** La sezione ha solo `aria-label="Prezzi"`: chi arriva da un'ancora non legge un titolo, vede due card.
- Le due card occupano 55% / 45% della larghezza e **80 svh di altezza** ciascuna. Il contenuto è distribuito su tre fasce con vuoti di 200 px. Su mobile diventano 675 px per card, per due card: 1.350 px per due prezzi.
- La riga sotto (Free / Enterprise / "Come si paga") è visivamente **identica** alle card dei piani, ma "Come si paga" non è un piano. La griglia logica si rompe.
- Enterprise non ha CTA. Free non ha CTA. Solo Basic e Pro ne hanno, con lo stesso testo.
- L'header fisso si sovrappone al titolo "Pro" e, a causa del probe centrale, il logo diventa bianco su carta (`audit-evidence/05`). Su mobile la card Basic finisce sotto l'header (`06`).
- "€/mese" è in `font-sans` a 26 px accanto a un numero da 152 px: sembra un'unità di misura appiccicata, non parte del prezzo.

### Analisi Copy

Attuale:

> **Basic** — Per chi verifica qualche cliente al mese e vuole la risposta subito. — 29 €/mese — Inizia gratis
> **Pro** — Per agenzie e studi che verificano ogni settimana e lavorano in più persone. — 79 €/mese — Inizia gratis
> **Free** — 0 € — Cinque verifiche al mese su Cerved…
> **Enterprise** — Su misura — Verifiche illimitate, provider dedicati, SSO, SLA…
> **Come si paga** — Fattura elettronica, addebito mensile, disdetta quando vuoi.

Criticità:

- **"Inizia gratis" su Pro è fuorviante**: iniziare gratis ti mette su Free, non su Pro. Il bottone non dice cosa compra. È il classico punto in cui l'utente si sente preso in giro.
- Le descrizioni sono elenchi di feature in prosa ("dashboard completa, storico senza scadenza, export CSV e PDF"), non benefici. Nessun confronto riga per riga: per capire la differenza devo leggere due paragrafi e ricordarli.
- **Manca il costo per verifica**, che è l'unico numero che un'agenzia confronta davvero: 29/50 = **0,58 €**, 79/200 = **0,40 €**. Il piano Pro costa circa un terzo in meno a verifica (32%), e non è scritto da nessuna parte.
- Manca "IVA esclusa", manca il ciclo di fatturazione, manca "cosa succede se supero il limite" (c'è in FAQ, non qui).
- "Come si paga" come colonna di piano è un errore di IA: è una nota, non un'offerta.

### Riscrittura

- H2: **Quanto costa controllare un cliente.**
- Sub: `Meno di un caffè a verifica. Le prime cinque sono gratis, senza carta.`

| | Free | Basic | Pro | Enterprise |
|---|---|---|---|---|
| A chi serve | `Per provare su clienti veri` | `Per chi firma qualche contratto al mese` | `Per agenzie che verificano ogni settimana` | `Per chi verifica ogni giorno, in più sedi` |
| Prezzo | `0 €` | `29 €/mese` | `79 €/mese` | `Su misura` |
| Verifiche | `5 / mese` | `50 / mese` | `200 / mese` | `Illimitate` |
| Costo a verifica | `—` | `0,58 €` | `0,40 €` | `—` |
| Fonti | `Cerved` | `3 provider` | `3 provider + confronto` | `Provider dedicati` |
| Storico / export | `30 giorni` | `Senza scadenza` | `Senza scadenza` | `Senza scadenza` |
| Ruoli, API, SLA | `—` | `—` | `Ruoli · API · webhook` | `SSO · SLA · account manager` |
| CTA | `Inizia con 5 gratis` | `Scegli Basic` | `Scegli Pro` | `Parla con noi` |

- Nota sotto la tabella: `Prezzi IVA esclusa. Fattura elettronica. Disdici quando vuoi.`
- Spostare "Come si paga" in una nota o in FAQ.
- Evidenziare Pro come "Il più scelto" **solo se è vero**; altrimenti "Il più conveniente a verifica".

**Perché:** una tabella risolve in 10 secondi un dubbio che due paragrafi non risolvono mai, il costo per verifica rende confrontabile l'offerta e "Scegli Pro" elimina l'ambiguità di "Inizia gratis".

---

## 10. FAQ

### Analisi UI

- Buona struttura `details/summary` nativa, accessibile da tastiera, con "+" che diventa "−".
- Lo stato aperto però non ha sfondo (bug #7): l'unica differenza è il segno. Su una lista di 7 righe, l'occhio non sa quale è aperta.
- Il titolo a sinistra è `sticky`, ma su mobile si incolla sotto un header fisso trasparente e ci finisce sotto (`faq-open.png`): collisione.
- Le righe sono alte 76 px con 14 px di gap: su mobile i tap target sono buoni qui, ma il padding orizzontale interno (20 px) è inferiore al gutter della pagina (24 px): disallineamento ottico.

### Analisi Copy

Attuale (7 domande): dove vengono i dati, che dati conservate, quanto ci vuole, più persone sull'account, fine verifiche, carta di credito, valutazione legale.

Criticità:

- Sono **domande di funzionamento**, non **obiezioni d'acquisto**. Il brandbook ne identifica cinque che qui non ci sono: è un altro abbonamento? non so leggere uno score; ho già Cerved; i dati sono ufficiali?; i miei dati sono al sicuro?
- "Il semaforo sostituisce una valutazione legale?" è importante ma sepolta in fondo: è la prima cosa che un avvocato o un CFO cerca. Va in evidenza, non in fondo.
- Le risposte sono lunghe 2-3 frasi; alcune iniziano con "No." o "Dai tre provider…", tono da manuale.
- "I dati sono ufficiali?" non c'è. Il brandbook dice "fonti ufficiali italiane", che è tecnicamente impreciso (Cerved, Cribis e Credit Safe sono provider privati; la fonte ufficiale è il Registro Imprese). Non usare "ufficiali": è un rischio di claim.

### Riscrittura (ordine e testi)

1. **Devo parlare con un commerciale per provarlo?**
   `No. Apri l'account e hai 5 verifiche al mese senza carta. Se ti servono di più, cambi piano da solo.`
2. **Ho già Cerved. Che differenza c'è?**
   `Cerved ti dà il report. Greenlight ti dà la decisione: un colore e cosa fare prima di firmare. Le fonti sono le stesse.`
3. **Non so leggere uno score.**
   `Non serve. Il semaforo traduce lo score in un'azione: verde firmi, giallo chiedi un acconto, rosso ti fermi.`
4. **Da dove vengono i dati?**
   `Dai tre provider di informazioni commerciali italiani: Cerved, Cribis e Credit Safe. Greenlight non inventa punteggi, li aggrega.`
5. **I dati miei e dei miei clienti sono al sicuro?**
   `Conserviamo email, ragione sociale, partita IVA ed esito. Nessun documento caricato. Dati cifrati in transito e a riposo, server UE, nessuna vendita a terzi.` *(da validare con il legale prima della pubblicazione)*
6. **Cosa succede se finisco le verifiche?**
   `Il semaforo smette di rispondere fino al rinnovo, senza addebiti a sorpresa. Passi al piano superiore quando vuoi.`
7. **Il semaforo sostituisce una valutazione legale?**
   `No. È un supporto alla decisione commerciale: non sostituisce bilanci certificati, garanzie o il parere di un professionista.`
8. **Serve la carta di credito?**
   `No. La carta serve solo se decidi di passare a Basic o Pro.`

Aggiungere `FAQPage` schema.org e spostare la 7 in una nota vicino al verdetto (non solo in FAQ).

---

## 11. Closing e Footer

### Analisi UI

- Closing: `bg-verde` rotto → **l'intera sezione finale è invisibile** (`audit-evidence/07`). Resta solo "Crea un account" come testo chiaro su nero. La CTA più importante del funnel non esiste.
- Footer: la tile CTA verde è invisibile (`08`), quindi la griglia 6+6 lascia un buco nero a destra. La tile "Dati" resta mezza larghezza con il vuoto accanto.
- Il wordmark "Greenlight" nel footer è l'elemento più grande della pagina (fino a 112 px): branding sopra informazione. In un footer B2B l'ordine è: contatti, legale, navigation, poi il logo.
- Nessuna indicazione di ragione sociale, P.IVA, sede, email, telefono, copyright. Per un'azienda che vende dati di credito è un segnale di fragilità.

### Analisi Copy

Attuale closing:

> **Cinque verifiche, senza carta.**
> Crea l'account, incolla la prima partita IVA, guarda il semaforo. Il resto lo decidi tu.
> [Crea un account] · Ho già un account

Criticità:

- "Cinque verifiche, senza carta" è un'offerta, non una ragione per agire **adesso**. Il beneficio (non firmare con il cliente sbagliato) è scomparso.
- "Il resto lo decidi tu" è vago e scarica responsabilità: non rassicura.
- "Crea un account" è corretto ma generico; "Ho già un account" è un link secondario con peso da disclaimer.

Attuale footer CTA: `Cinque verifiche gratis. / Inizia adesso →`

- "Inizia adesso" è un avverbio di tempo usato come CTA: non dice cosa inizia. "Apri l'account" è più chiaro.

### Riscrittura

Closing:

- H2: **Il prossimo cliente, controllalo prima.**
- Sub: `Cinque verifiche gratis, senza carta. Poi decidi tu se continuare.`
- CTA: `Apri il tuo account` · secondaria `Ho già un account`
- Micro sotto: `2 minuti. Nessuna carta. Nessun commerciale.`

Footer CTA tile:

- `5 verifiche gratis.` / `Apri l'account →`

Footer legale (obbligatorio):

```
Greenlight SaaS — [Ragione sociale] · P.IVA 00000000000 · [Sede legale]
supporto@[dominio] · Privacy · Cookie · Termini · DPA · Stato del servizio
© 2026 Greenlight. Tutti i diritti riservati.
```

---

## 12. Header, navigazione e mobile

### Analisi UI

- **Header adattivo**: l'idea (testo che prende l'inchiostro della sezione sotto) è elegante. L'implementazione usa un solo punto di probe al centro: sulle sezioni bicolore (prezzi) il logo finisce bianco su carta, e sull'hero nera diventa nero su nero. Inoltre non ha sfondo: mentre si scrolla, i titoli passano sotto le voci e si sovrappongono (visibile su "Pro" e su "Domande" mobile).
- **Mobile**: nessun hamburger. Restano solo logo e "Accedi". "Inizia gratis" è `hidden sm:inline`, quindi sparisce proprio dove servirebbe. Sulla splash, logo e "Registrati" si toccano.
- **Tap target**: 14 elementi sotto i 44 px, tra cui i link del footer (26 px) e gli esempi P.IVA (19 px). Sotto i 44 px il tasso di errore cresce in modo netto.
- **Focus**: l'outline di default è `#101010` su fondo `#0b0c0b`: invisibile. I bottoni `.btn` hanno un focus corretto, i link no.

### Soluzione

- Header con fondo (`paper`/`ink`) e bordo inferiore dopo 8 px di scroll, oppure con uno scrim sfumato. L'adattamento di tono si può tenere, ma con due punti di probe (sinistra e destra) e un fallback quando i toni sono diversi.
- Mobile: hamburger + pannello full-screen + **CTA sticky in basso** "Prova gratis" (sempre visibile).
- Nav desktop: 4 voci massimo, CTA primaria sempre visibile, "Prova" rimossa (la demo è in pagina).
- Tap target minimo 44×44 px su tutti i link e i chip.
- `:focus-visible` esplicito su tutti i link: outline 2 px `currentColor` + offset 2 px, con variante chiara/scura.

---

## 13. Design system

| Aspetto | Stato attuale | Problema | Decisione consigliata |
|---|---|---|---|
| Display font | Archivo 800 su `/semaforo`, Source Serif 4 su `/`, Inter su app | Due brand tipografici; il brandbook prescrive il serif, il codice usa il sans | **Archivo per il display** (la metafora è segnaletica, non lusso), **Inter per il body**, **JetBrains Mono per P.IVA e punteggi**. Aggiornare il brandbook, non solo il codice. |
| Serif | Source Serif 4 caricato su tutte le pagine | Usato solo sulla splash e in un'etichetta | Se si sceglie Archivo, rimuovere Source Serif e Instrument Serif (2 richieste font in meno). |
| Verdi | `#22c55e` (primary), `#17b26a` (semantico), `#15803d` (non usato) | Tre verdi per lo stesso "via libera"; il primary su dashboard ha **bianco su verde 2,26:1** | Un solo verde di brand `#17b26a`; testo inchiostro sopra il verde (7:1). Il primary scuro solo per hover. |
| Raggi | 2 px (editoriale), 8/12 px (shadcn), full (splash) | Tre linguaggi di forma | 2 px per blocchi e bottoni marketing; 8 px per l'app; `full` solo per pill di stato. |
| Bottoni | `.btn` 52 px squadrato, pill glass, shadcn | Tre famiglie, tre altezze | Una famiglia: primario pieno, secondario outline, terziario link. Altezza 52 px, radius 2 px, label sempre verbo + oggetto. |
| Logo | Globo (splash), scudo-check (auth), wordmark (editoriale), check-circle (favicon) | Quattro marchi diversi | Un solo lockup: icona semaforo a 4 lampade + wordmark, come da brandbook. Favicon = icona semaforo. |
| Griglia | 12 colonne, gutter 24/48 | Buona, ma le sezioni a 100 svh creano vuoti | Tenere la griglia; sostituire le altezze `svh` con `min-height` legate al contenuto. |
| Icone | Lucide outline, 20-24 px | Coerenti, ma usate come unica navigazione (globo/login/user-plus) | Icone sempre con etichetta o tooltip visibile. |

**Nota tecnica:** `index.css` importa 4 fogli Google Fonts e `index.html` ne carica un quinto; ogni pagina ne usa al massimo due. Sono **5 richieste CSS render-blocking** e due famiglie morte (Instrument Serif, JetBrains Mono non usata per gli score). Consolidare in un solo `<link>` con i soli pesi usati, oppure self-hostare i due font scelti.

---

## 14. Registrazione, login e dashboard (bonus, perché la conversione finisce lì)

| Schermata | Problema | Intervento |
|---|---|---|
| Register | H1 "Crea il tuo account" + titolo card "Registrazione" + "Tutti i campi sono obbligatori": tre etichette per la stessa cosa. 4 campi, nessun toggle password, nessuna rassicurazione "5 gratis / senza carta". Termini e Privacy `#`. | Un solo titolo. 3 campi (nome opzionale). Rimuovere "conferma password" e aggiungere occhio mostra/nascondi. Badge `5 verifiche gratis, nessuna carta`. Google SSO o magic link. Link legali reali. |
| Login | "Password dimenticata?" → route inesistente → redirect in home. | Implementare `/forgot-password` o rimuovere il link. Aggiungere SSO. |
| Dashboard | Doppia navigazione (header + tab) con le stesse tre voci. "Check usati questo mese" vs "verifiche" nel resto del sito. CTA verde con bianco a 2,26:1. Su 390 la barra progress esce dalla card. | Una sola navigazione. Lessico unico: "verifiche". Testo inchiostro sul verde. KPI 1 colonna su mobile. |
| Form verifica | Chiede 3 campi (ragione sociale, P.IVA, CF) + provider singolo, mentre la landing promette 1 campo e 3 fonti in parallelo. | Derivare il CF dalla P.IVA, rendere il nome opzionale (lookup), aggiungere "confronta le tre fonti" come default o come upgrade Pro visibile. |
| Empty state | "Nessuna verifica ancora." + CTA: buono, ma il gauge `PENDING` è un cerchio vuoto. | Mostrare un esempio di verdetto, non un cerchio. |

Il punto strategico: **la landing promette un flusso a 1 campo e 3 fonti; il prodotto ne chiede 3 e 1**. Ogni passo in più tra la promessa e il primo verdetto è conversione persa.

---

## 15. Fiducia, proof e conformità

Oggi il sito chiede a un imprenditore di inserire la partita IVA di un cliente senza dargli **una sola ragione sociale** per fidarsi. È il gap più costoso dopo i bug visivi.

Da aggiungere, in ordine di impatto:

1. **Fascia proof** subito sotto la hero: 4-6 loghi di studi/agenzie (con consenso) oppure, se non ci sono, un numero verificabile ("12.400 verifiche eseguite", solo se vero) e una citazione con nome, ruolo, azienda. Niente testimonial anonimi.
2. **Sezione "Da dove vengono i dati"**: Cerved, Cribis, Credit Safe con i rispettivi ambiti (bilanci / pagamenti / protesti). Spiega perché la divergenza è un valore.
3. **Sezione sicurezza**: cifratura in transito e a riposo, server UE, retention, sub-processor, link a Privacy e DPA. Deve essere verificabile, non uno slogan.
4. **Footer legale completo**: ragione sociale, P.IVA, sede, email, Privacy, Cookie, Termini, DPA.
5. **Microcopy di rassicurazione vicino a ogni campo sensibile**: "Non carichi documenti. Conserviamo solo ragione sociale, P.IVA ed esito."
6. **Claim check**: "interrogati in parallelo", "tre fonti, un solo verdetto", "confrontale" sono oggi non supportati dal prodotto. "Fonti ufficiali" è impreciso. Prima di comprare traffico, allineare o rimuovere.

---

## 16. Prioritization Matrix

Legenda: **Impatto** 1-5 sull'obbiettivo di business (registrazioni + primo verdetto). **Sforzo** S < 0,5 gg · M 0,5-2 gg · L 3-10 gg. **Quando**: P0 = subito, P1 = 2 settimane, P2 = prossimo ciclo.

### Quick wins (P0 — questa settimana)

| # | Intervento | Impatto | Sforzo | Perché ora |
|:--:|---|:---:|:---:|---|
| 1 | Sostituire `bg-verde` con `bg-[var(--verde)]` in Hero, Closing, Footer, FAQ | **5** | **S** | Riattiva 3 schermate e la CTA finale. Mezza giornata. |
| 2 | Rimuovere `md:whitespace-nowrap` dall'H1 splash e ridurre `--step-display` (max 7,5rem) | **5** | **S** | La value proposition smette di essere tagliata su desktop. |
| 3 | Header: sfondo/bordo + tono con fallback; su prezzi tono unico | **4** | **S** | Elimina logo invisibile e sovrapposizioni. |
| 4 | CTA hero: primaria al prodotto, demo come secondaria; label "Verifica un'azienda — 5 gratis" | **5** | **S** | Sposta il click dove c'è revenue. |
| 5 | Mobile: hamburger + CTA sticky "Prova gratis"; gap nel nav splash | **5** | **M** | Oggi mobile non ha percorso. |
| 6 | Fix "80,8 · Giallo" (regola del più prudente) o cambio dati | **4** | **S** | Coerenza matematica visibile. |
| 7 | `/forgot-password` + link Termini/Privacy reali | **4** | **S** | Blocchi di fiducia e recupero account. |
| 8 | Pagina `/`: aggiungere OG/Twitter/canonical, robots, sitemap, FAQ schema | **3** | **S** | Condivisioni e SEO di base. |
| 9 | Tap target ≥ 44 px e focus visibile su fondo scuro | **3** | **S** | Accessibilità e riduzione errori. |
| 10 | Sostituire "Il manifesto" con "Guarda un esempio" e rimuovere le 3 icone mystery-meat | **3** | **S** | Chiarezza del percorso. |

### Strategic fixes (P1 — 2 settimane)

| # | Intervento | Impatto | Sforzo | Perché |
|:--:|---|:---:|:---:|---|
| 11 | Una sola home: `/semaforo` → `/`, splash come hero; redirect 301 | **5** | **L** | Elimina la frattura di brand e il doppio SEO. |
| 12 | Allineare promessa e prodotto: multi-provider o copy "scegli la fonte" ovunque | **5** | **L** | Rischio claim e fiducia. |
| 13 | Fascia proof + sezione sicurezza + footer legale | **5** | **M** | Senza proof il resto converte meno. |
| 14 | Pricing: H2, tabella confronto, costo/verifica, CTA "Scegli X", Enterprise "Parla con noi" | **4** | **M** | Il dubbio prezzo è il primo abbandono. |
| 15 | Comprimere "Quattro stati" in una schermata (4 card) | **4** | **M** | Recupera 1.700 px prima dei prezzi. |
| 16 | Demo: badge DEMO, esempi cliccabili, CTA post-verdetto, niente timer finto | **4** | **M** | Trasforma la demo in lead gen. |
| 17 | FAQ: 5 obiezioni del brandbook + 1 sicurezza + 1 legale | **4** | **S** | Risponde a chi sta per comprare. |
| 18 | Design system: un logo, un verde, un display font, una famiglia di bottoni | **4** | **L** | Riduce il debito e allinea l'app. |
| 19 | Riscrittura completa di hero, stati, pricing, closing (varianti in questo doc) | **4** | **M** | Il copy attuale è il freno più economico da rimuovere. |

### P2 — prossimo ciclo

| # | Intervento | Impatto | Sforzo |
|:--:|---|:---:|:---:|
| 20 | Onboarding: 3 campi → 2, SSO, toggle password, badge trust | 3 | M |
| 21 | Dashboard: una sola nav, lessico "verifiche", KPI mobile, contrasto CTA | 3 | M |
| 22 | Code splitting (`/dashboard` lazy) e self-host font | 2 | M |
| 23 | Analytics/privacy-friendly + eventi funnel | 3 | S |
| 24 | Pagina `/manifesto` reale (se il contenuto esiste) | 2 | S |

---

## 17. Piano di test A/B

Non ci sono analytics nel progetto: il primo test è **strumentare**, altrimenti ogni ipotesi resta un'opinione. Eventi minimi: `hero_cta_click`, `demo_start`, `demo_complete`, `register_start`, `register_complete`, `first_check_complete`, `pricing_view`.

| Test | Ipotesi | Varianti | Metrica primaria | Guardrail |
|---|---|---|---|---|
| H1 | Un H1 centrato sul momento ("Prima di firmare…") converte più di una categoria ("Il semaforo del credito…") | A job-led vs C brand control | Click CTA primaria → registrazione | Bounce, scroll depth |
| CTA | Dire "5 gratis" nel bottone aumenta il click rispetto a "Verifica un'azienda" | Con/senza prezzo nel label | Click CTA | Qualità iscrizioni (primo check) |
| Demo | Spostare la demo above the fold aumenta le registrazioni o le riduce? | Demo in hero vs demo sotto | Registrazioni | Tempo al primo scroll |
| Pricing | Tabella con costo/verifica batte le card in prosa | Tabella vs card attuali | Click "Scegli Pro" | Supporto/prezzi |
| Proof | Una fascia loghi + citazione aumenta la fiducia | Con/senza proof | Registrazioni | Bounce |

Durata: fino a significatività, minimo 2 settimane per test (il traffico B2B è basso). Non lanciare due test che si toccano sulla stessa metrica.

---

## 18. Cosa tenere

- **La metafora e i quattro colori.** È il brand. Non sostituirli con gauge, radar chart o score ring.
- **La voce concreta** di "verde firmi, rosso ti fermi", "la divergenza è un'informazione", "ogni euro anticipato è un euro a rischio". È già scritta; va solo promossa.
- **Il campo di colore full-bleed** come dispositivo visivo, in dosi più piccole.
- **La demo interattiva**, che è il prodotto che si spiega da solo.
- **La griglia editoriale a 12 colonne** e il ritmo tipografico: quando non viene tagliata, funziona.

---

## Appendice — Checklist di accettazione per i P0

- [ ] 1440×900: H1 interamente visibile, nessun clip; hero `/semaforo` con fondo verde e testo a contrasto ≥ 7:1.
- [ ] 768, 1024, 1280, 1440, 1920: nessun overflow orizzontale, H1 su massimo 2 righe.
- [ ] 390×844: menu raggiungibile, CTA primaria visibile senza scroll, nessun testo troncato nel pannello demo.
- [ ] Header leggibile su tutte le sezioni, comprese le bicolore; nessun titolo coperto.
- [ ] `bg-verde` non compare più nel codice; `npm run build` pulito.
- [ ] `forgot-password` e link legali non rimbalzano.
- [ ] Tap target ≥ 44×44 px; focus visibile su ink e paper.
- [ ] OG image + title + description presenti e distinti per route; `robots.txt` e `sitemap.xml` serviti.
- [ ] Verdetto aggregato coerente con le soglie dichiarate; nessun "80,8 · Giallo".
- [ ] Footer con ragione sociale, P.IVA, Privacy, Cookie, Termini.
