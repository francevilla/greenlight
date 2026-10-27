# 01 — BUSINESS UNDERSTANDING BRIEF
Greenlight SaaS — Design Overhaul + Brandbook

---

## 1. Chi è l'utente

### Persona primaria — Alberto, Commerciale (40–55 anni, non-tech)
- **Ruolo:** titolare o responsabile commerciale di un'agenzia di marketing o piccola impresa italiana.
- **Comportamento:** chiude contratti con clienti B2B (aziende, studi, professionisti) e vuole evitare insoluti o clienti che scompaiono dopo il primo acconto.
- **Pain point quotidiano:** prima di firmare sa poco o nulla del cliente. Va su Cerved o Cribis ma trova interfacce lente, costose, piene di gergo finanziario. Non sa interpretare uno "score 67/100".
- **Obiettivo:** in meno di 60 secondi, sapere se può fidarsi e firmare, o se deve chiedere garanzie / anticipo / no.

### Persona secondaria — Consulente Tecnico (30–50 anni)
- **Ruolo:** supporta Alberto nell'onboarding, configura l'account, sceglie il piano, interpreta i report per i casi dubbi.
- **Obiettivo:** avere uno storico ordinato, esportabile, con statistiche di utilizzo per giustificare l'upgrade di piano.

---

## 2. Jobs To Be Done (JTBD)

| # | Job (formato JTBD) |
|---|--------------------|
| 1 | Quando sto per firmare un contratto con un nuovo cliente, voglio inserire la sua partita IVA e sapere immediatamente se è affidabile, così evito insoluti e perdite di tempo. |
| 2 | Quando ho un dubbio su un cliente esistente, voglio ri-verificarlo in pochi click e vedere se il suo rischio è cambiato nel tempo, così decido se chiedere garanzie. |
| 3 | Quando devo spiegare al cliente perché voglio un acconto, voglio mostrargli un report chiaro e leggibile (non una visura Cerved di 20 pagine), così la conversazione è più facile. |
| 4 | Quando gestisco più clienti, voglio uno storico con filtri e statistiche mensili, così so quante verifiche mi restano nel piano Free e quando fare upgrade. |

---

## 3. Pain points del mercato attuale

| Competitor | Cosa fa bene | Cosa fa male | Opportunità per Greenlight |
|------------|--------------|--------------|----------------------------|
| **Cerved (iCerbis / Report Aziende)** | Dati autorevoli, copertura completa Italia | Interfaccia datata, lenta, costosa, gergo finanziario, abbonamento rigido, report lunghi | Interfaccia immediata, lingua italiana semplice, prezzo trasparente, primo check gratis |
| **Cribis D&B** | Dati qualità, network internazionale | Costo elevato, focus enterprise, onboarding lungo | Semplice, self-serve, registrazione in 30 secondi |
| **Credit Safe** | Report internazionali, score globale | Poco focalizzato sull'Italia, UX corporate | Focalizzazione PMI italiane, semaforo locale |
| **Experian / Report Company** | Dati creditizi consolidati | Prezzi enterprise, nessuna esperienza "semaforo" | Metafora del semaforo, decisione binaria sì/no |

---

## 4. Differenziatore di Greenlight (una frase)

> **Greenlight è il semaforo del credito per chi vende: inserisci la partita IVA e in 30 secondi sai se puoi firmare, senza abbonamento, senza carta, senza sapere cos'è uno score.**

---

## 5. Obiezioni di acquisto da smontare in landing

| Obiezione | Risposta in micro-copy |
|-----------|------------------------|
| "È un altro abbonamento" | I primi 5 check al mese sono gratis, senza carta di credito. Paggi solo se cresci. |
| "Non so leggere uno score" | Non usiamo score: usiamo il semaforo. Verde = firmi, Rosso = ti fermi. |
| "Ho già Cerved" | Cerved va bene per le grandi pratiche. Greenlight è per la decisione rapida, prima del contratto. |
| "I dati non sono ufficiali" | Interroghiamo Cerved, Cribis e Credit Safe in parallelo. Stessa fonte, interfaccia umana. |
| "Non mi fido a inserire dati aziendali" | Crittografia JWT, nessun dato venduto a terzi, conforme GDPR. |

---

## 6. Posizionamento (positioning statement)

Per agenzie di marketing e piccole imprese italiane che devono verificare un cliente prima di firmare, Greenlight è il servizio di verifica credito che restituisce un semaforo di rischio immediato e leggibile. A differenza di Cerved e Cribis, che offrono report complessi e costosi per professionisti della finanza, noi consegniamo una decisione sì/no in 30 secondi, senza abbonamento e senza carta.

---

## 7. Obiettivi del redesign

- Trasformare la percezione da "fa schifo esteticamente" a prodotto di fiducia, autorevole ma umano.
- Rendere il semaforo il protagonista assoluto dell'interfaccia.
- Supportare l'utente non-tecnico (Alberto) dalla landing al primo check in meno di 3 click.
- Preparare una base design-system scalabile per dark mode, mobile e export PDF.