# Prossima call con Antonio — decisioni minime per procedere in autonomia

5 ottobre 2026. Obiettivo: raccogliere fatti, documenti, limiti economici e deleghe una sola volta, poi proseguire con implementazione e verifiche senza chiedere conferma per ogni dettaglio.

## Già preparato

- Ripristinata la presentazione originale: hero, biologico, foglie, origine/lavorazione, fotografie, storia di Antonio, timeline e composizione, anche in inglese. Restano le offerte aggiornate, FAQ, assistenza e pagine legali dell’anteprima. La newsletter dimostrativa rimane rimossa.
- Versione italiana e inglese, incluse privacy, condizioni dell’anteprima, cookie e messaggi di checkout.
- Applicata la proposta di Antonio: una bottiglia a EUR 42,50; tre a EUR 117,30 con 8% immediato, cioè EUR 39,10 a bottiglia. Rimossa la precedente scala 2/4/6 con 5/10/15%.
- Quattro link Stripe sandbox: 2 offerte × 2 lingue, con indirizzi nei 27 paesi UE e in Svizzera. Colori Foglie Bio e metodi carte/wallet/Satispay secondo disponibilità.
- Nessuna soglia EUR 50 sulla confezione da tre e nessuno sconto cumulabile: si evita il conflitto descritto da Antonio. La regola network sul secondo ordine è documentata, ma non attivata perché non aggiunge vantaggi con queste due sole offerte.
- Nessun abbonamento, addebito reale, campagna o invio marketing. Tariffa EUR 5,90 puramente fittizia; nessuna IVA inventata.
- Sorgente e URL/ID pubblici; nessuna credenziale nel repository. Il workflow GitHub Pages pubblica l’anteprima al push su main; questo non abilita pagamenti reali.

## A. Puoi gestire tu senza altre conferme commerciali di Antonio

- [ ] Provare sito IT/EN e checkout: confezioni, importi, paesi, mobile, tastiera, rifiuto/riprova, Satispay e wallet compatibili. La nuova serie di confezioni richiede ancora la prova browser; le verifiche CLI e del codice sono complete.
- [ ] Rifinire testi funzionali, layout, traduzioni non tecniche e accessibilità, mantenendo invariati fatti e claim del prodotto.
- [ ] Confrontare hosting adatto all’ecommerce, preparare configurazione di dominio, migrazione WordPress e piano di rollback. Acquisti di servizi/accessi al dominio richiedono la delega o il budget necessario.
- [ ] Richiedere/preparare preventivi logistici per 1/3 bottiglie e paesi/zone, inclusa Svizzera con sdoganamento e resi. Non trasformare un preventivo in una promessa al cliente prima di verificare i dati del prodotto.
- [ ] Preparare il calcolo dei margini, confrontare sconti e soglia gratuita usando i costi forniti.
- [ ] Preparare flusso ordini manuale o automatizzato, email transazionali, gestione stock, rimborsi e riconciliazione; implementare dopo la scelta del processo.
- [ ] Preparare bozze privacy, condizioni, resi e funzione di recesso; coordinare il controllo professionale.
- [ ] Creare una matrice di lancio per paese: etichetta/lingua, eventuale notifica, IVA, corriere, costo/tempi e assistenza. La verifica normativa può essere svolta con un consulente, senza chiedere ad Antonio di interpretare le norme.
- [ ] Eseguire verifiche di sicurezza, gestione dei segreti, backup, deployment e monitoraggio.
- [ ] Dopo l’approvazione dei parametri commerciali e l’attivazione del conto, configurare prodotti/prezzi/link live, fare il collaudo finale autorizzato e pubblicare.

## B. Informazioni e autorizzazioni che richiedono Antonio o il rappresentante autorizzato

| Da ottenere in call | Risposta/documento richiesto | Perché non possiamo deciderlo noi |
| --- | --- | --- |
| IVA e costi dopo la proposta | L'8% su tre bottiglie è recepito; confermare se EUR 42,50 è IVA inclusa e fornire costo completo/margine minimo per definire le spedizioni | Non occorre riapprovare lo sconto: mancano dati fiscali ed economici effettivi |
| Vita utile | Scheda aggiornata, scadenza minima residua alla spedizione e condizioni prima/dopo apertura per la confezione da tre | L’ipotesi di riacquisto mensile non dimostra dosaggio o conservabilità |
| Prodotto e claim | Etichetta corrente, ingredienti/allergeni, dose, avvertenze, produttore/distributore, notifica italiana e documenti biologici pertinenti | Servono documenti e fatti del produttore; non vanno ricostruiti o inventati |
| Stock e logistica | Quantità disponibili, lotti/scadenze, luogo di partenza, peso/dimensioni/imballaggio per confezione, capacità e tempi di preparazione | Sono capacità operative reali |
| Responsabile ordini | Chi vede/prepara/spedisce gli ordini, chi risponde ai clienti, chi autorizza rimborsi | Occorre un impegno operativo dell’azienda |
| Mercati live | Confermare impegni logistici nei paesi UE e in Svizzera dopo le verifiche; decidere chi sostiene eventuali imposte e oneri di importazione CH | Il selettore dei paesi nel sandbox non sostituisce condizioni di consegna reali |
| Identità e accrediti | Dati legali confermati, rappresentante/titolari effettivi, eventuali documenti Stripe e IBAN | Sono dati personali/bancari e dichiarazioni del titolare: inserimento diretto in Stripe |
| Dati al consulente | Contatto del commercialista, regime/registrazioni IVA/OSS, processo fatture/gestionale | L’azienda deve fornire il proprio contesto fiscale effettivo |
| Condizioni verso clienti | Approvazione aziendale di prezzi, spedizioni, assistenza, resi/rimborsi e testi predisposti con il consulente | Sono impegni contrattuali e scelte del titolare |
| Delega operativa | Budget hosting/servizi, accessi appropriati, limiti di sconto/rimborso e chi approva il passaggio live | Permette di lavorare autonomamente entro un perimetro chiaro |

Non chiedere ad Antonio password, codici, documenti d’identità o IBAN in chat. Il titolare li inserisce direttamente nel servizio appropriato.

## C. Verifiche da commercialista/consulente: puoi coordinarle tu

Queste non sono semplici preferenze di Antonio: richiedono un’analisi basata sui dati aziendali.

- **Fiscalità:** aliquota e classificazione di integratore/spedizione, trattamento vendite B2C transfrontaliere, applicabilità OSS/soglie, registrazioni, documenti fiscali e dati da raccogliere. Non applicare automaticamente l’IVA italiana a tutti i paesi.
- **Svizzera:** regole del prodotto e dell'etichetta secondo le fonti BLV, responsabilità dell'importazione, documenti di esportazione, IVA/importazione e oneri del corriere. Definire chiaramente chi li paga. La Svizzera non è coperta automaticamente dal regime OSS UE; EUR 5,90 è solo un dato di prova.
- **Integratori e paesi:** verificare composizione/claim, etichetta e requisiti di notifica in ciascun mercato. L’inglese è utile al cliente, ma non sostituisce automaticamente le lingue richieste per le informazioni alimentari locali.
- **Consumatori:** prezzi e promozioni corretti, consegna, recesso e relative eccezioni, resi/garanzie, funzione online di recesso e conferma della richiesta quando applicabile.
- **GDPR:** ruoli effettivi di azienda e fornitori, informative, basi giuridiche, minimizzazione/conservazione, accessi, trasferimenti e diritti. Nessuna newsletter o pixel significa meno lavoro, non esenzione dagli obblighi per gli ordini.
- **Accessibilità:** controllare applicabilità degli obblighi ecommerce e di eventuali esenzioni; collaudare comunque acquisto via tastiera e dispositivi mobili.

## Agenda proposta per la call

1. Partire dal prezzo EUR 42,50 e dall'8% su tre già recepiti; chiarire IVA inclusa e costi logistici, soprattutto per la Svizzera (5 minuti).
2. Ottenere scheda prodotto/etichetta, scadenza e documenti mancanti (5 minuti).
3. Assegnare ordini, stock, spedizioni, assistenza e rimborsi (5 minuti).
4. Definire mercati prioritari, commercialista e verifiche per paese (5 minuti).
5. Concordare accessi, budget e delega per implementazione/live (5 minuti).

Uscire dalla call con responsabile e data per ogni documento mancante. Se non è possibile approvare tutta l’UE, predisporre un rilascio per i soli paesi verificati; aggiungere gli altri dopo i controlli.

## Condizione per aprire davvero

Prezzi/margini approvati + requisiti del prodotto verificati per il mercato e informazioni corrette + IVA/fatturazione definite + trasporto/stock/supporto funzionanti + policy approvate + conto Stripe live verificato + hosting commerciale + collaudo reale controllato autorizzato. I link di test non devono essere promossi automaticamente a live.

Riferimenti: [Stripe e IVA UE](https://docs.stripe.com/tax/supported-countries/european-union), [integratori nell’UE](https://food.ec.europa.eu/food-safety/labelling-and-nutrition/food-supplements_en), [lingua delle informazioni alimentari](https://food.ec.europa.eu/food-safety/labelling-and-nutrition/food-information-consumers-legislation/language-and-presentation-food-information_en), [GitHub Pages e hosting ecommerce](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), [Garante cookie](https://www.garanteprivacy.it/faq/Cookie).
