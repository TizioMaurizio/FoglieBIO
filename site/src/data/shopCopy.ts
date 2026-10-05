import { assetUrl } from "../config/site";
export type Language = "it" | "en";
export type PolicyPage = "privacy" | "terms" | "cookies";
export function pagePath(language: Language, page?: PolicyPage) {
  return assetUrl((language === "en" ? "en/" : "") + (page ? page + ".html" : ""));
}
export const shopCopy = {
  it: {
    skip: "Vai al contenuto", language: "Lingua", home: "Inizio", product: "Il prodotto", details: "Dettagli", faq: "Domande", buy: "Scegli la confezione",
    preview: "ANTEPRIMA DI ACQUISTO · SOLO TEST", previewNote: "Checkout di prova. Nessun addebito reale; condizioni di vendita da completare.",
    eyebrow: "FOGLIE D’OLIVO ITALIANE · DAL 2022", description: "L’infuso di foglie d’olivo italiane di La Ruota Bio. Un integratore alimentare in formato da 1 litro.",
    organic: "Biologico certificato", organicAlt: "Logo biologico dell’Unione europea", origin: "Origine delle foglie: Italia", bottleAlt: "Bottiglia di Foglie Bio Plus da 1 litro",
    choose: "La tua confezione", oneOff: "Acquisto singolo, senza rinnovo automatico.", single: "Una bottiglia", pack: "Confezione", bottles: "bottiglie", each: "per bottiglia",
    save: "Risparmi", firstOrderDiscount: "Sconto immediato, anche sul primo ordine.",
    proposal: "Risparmio", reference: "rispetto allo stesso numero di bottiglie al prezzo singolo di 42,50 €", packTotal: "Totale confezione", shipping: "Spedizione · esempio", total: "Totale di prova",
    shippingNote: "Spedizione di prova: 5,90 €. Checkout disponibile per UE27 e Svizzera. Tariffe reali, IVA e possibili costi di importazione per la Svizzera sono da definire.",
    continue: "Prova il checkout", noRenewal: "Una bottiglia o tre con l’8% di sconto. Nessun abbonamento.",
    productDetails: "Prima di scegliere", composition: "Ingredienti e scheda prodotto", compositionText: "Integratore alimentare a base di foglie d’olivo. Elenco completo degli ingredienti, allergeni e scheda aggiornata saranno pubblicati dopo la conferma del produttore.",
    use: "Uso e conservazione", useText: "Segui l’etichetta della confezione. Dose, conservazione e durata dopo apertura sono in attesa della scheda aggiornata. Non attribuiamo una durata standard a una bottiglia.",
    warning: "Gli integratori non sostituiscono una dieta varia ed equilibrata e uno stile di vita sano. Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini al di sotto dei tre anni.",
    originTitle: "Un progetto La Ruota Bio", originText: "Foglie Bio Plus nasce nel 2022 dal progetto di Antonio Berti. Le foglie sono raccolte presso l’azienda agricola partner italiana di La Ruota Bio e lavorate in laboratorio.",
    faqTitle: "Acquisto, pagamento e consegna", support: "Per informazioni sul prodotto", privacy: "Informativa privacy", terms: "Condizioni dell’anteprima", cookies: "Cookie",
    faqs: [
      {q:"Che cos’è Foglie Bio Plus?",a:"È un integratore alimentare a base di foglie d’olivo, presentato in forma di infuso. Nasce dal progetto di Antonio Berti e La Ruota Bio."},
      {q:"Da dove provengono le foglie?",a:"Le foglie sono italiane e provengono dall’azienda agricola partner di La Ruota Bio. L’origine italiana è riportata anche sull’etichetta del prodotto."},
      {q:"Come si utilizza e si conserva?",a:"Segui le indicazioni e le avvertenze riportate sull’etichetta della confezione. La scheda con dosaggio e conservazione sarà disponibile dopo la conferma della documentazione aggiornata. Non attribuiamo una durata standard alla bottiglia."},
      {q:"Posso riacquistarlo ogni mese?",a:"Puoi scegliere un acquisto singolo ogni volta che desideri. Non sono previsti rinnovi o addebiti automatici. La frequenza d’acquisto non è un’indicazione di dosaggio."},
      {q:"Come funziona lo sconto?",a:"Una bottiglia costa 42,50 €. La confezione da tre riceve subito l’8% di sconto, anche al primo acquisto: 117,30 € in totale, cioè 39,10 € per bottiglia. Non serve un codice e non si sommano altri sconti. Il checkout è ancora di prova."},
      {q:"In quali paesi è disponibile il checkout?",a:"L’anteprima accetta indirizzi nei 27 paesi dell’Unione europea e in Svizzera. Non è ancora una promessa di consegna. La Svizzera è fuori dall’UE: tariffe, eventuali imposte e costi di importazione richiedono una verifica specifica prima delle vendite."},
      {q:"Quali pagamenti posso provare?",a:"Il checkout Stripe di prova offre carte e, quando disponibili, Apple Pay, Google Pay e Satispay. Usa soltanto dati fittizi e carte di test; non viene spedito alcun prodotto."}
    ],
    checkoutTitle: "Il tuo acquisto di prova", testBanner: "Stripe · ambiente di prova", testNoOrder: "Nessun addebito reale, ordine o spedizione.", changePack: "Cambia confezione",
    safeTitle: "Usa soltanto dati fittizi e carte di test.", safeText: "Stripe si apre in una nuova scheda. I dati inseriti lì vengono trasmessi e conservati nell’ambiente di prova. Non usare i tuoi dati personali o una carta reale.",
    testData: "Dati di esempio per la prova", name: "Nome", address: "Indirizzo", phone: "Telefono fittizio", card: "Carta di test", expiry: "Scadenza / CVC",
    decline: "Per simulare una carta rifiutata:", pay: "Continua su Stripe · test", newTab: "(nuova scheda)", close: "Chiudi", back: "Torna al prodotto",
    fixedPack: "La confezione selezionata è fissa su Stripe. Per cambiarla, torna qui e scegli un’altra opzione.",
    returned: "Prosegui nella scheda Stripe per vedere l’esito. Chiudila per tornare qui, anche se interrompi la prova. Nessun ordine reale viene creato.",
    unavailable: "Anteprima non disponibile per questa confezione. Scegli un’altra opzione."
  },
  en: {
    skip: "Skip to content", language: "Language", home: "Home", product: "The product", details: "Details", faq: "Questions", buy: "Choose your pack",
    preview: "PURCHASE PREVIEW · TEST ONLY", previewNote: "Test checkout. No real charges; sales terms still need completion.",
    eyebrow: "ITALIAN OLIVE LEAVES · SINCE 2022", description: "La Ruota Bio’s Italian olive-leaf infusion. A food supplement in a 1-litre bottle.",
    organic: "Certified organic", organicAlt: "European Union organic logo", origin: "Leaf origin: Italy", bottleAlt: "One-litre bottle of Foglie Bio Plus",
    choose: "Your pack", oneOff: "One-time purchase. No automatic renewal.", single: "One bottle", pack: "Pack", bottles: "bottles", each: "per bottle",
    save: "Save", firstOrderDiscount: "Instant saving, including your first order.",
    proposal: "Saving", reference: "compared with the same number of bottles at the €42.50 single price", packTotal: "Pack total", shipping: "Shipping · example", total: "Test total",
    shippingNote: "Test shipping: €5.90. Checkout covers EU27 and Switzerland. Actual rates, VAT and possible Swiss import charges still need to be defined.",
    continue: "Try the checkout", noRenewal: "One bottle or three with 8% off. No subscription.",
    productDetails: "Before you choose", composition: "Ingredients and product information", compositionText: "An olive-leaf food supplement. The full ingredient list, allergens and current product specification will be published after confirmation from the producer.",
    use: "Use and storage", useText: "Follow the bottle label. Dosage, storage and shelf life after opening await the updated specification. We do not state a standard duration for one bottle.",
    warning: "Food supplements do not replace a varied, balanced diet and a healthy lifestyle. Do not exceed the recommended daily dose. Keep out of reach of children under three years of age.",
    originTitle: "A La Ruota Bio project", originText: "Foglie Bio Plus began in 2022 as a project by Antonio Berti. The leaves are collected at La Ruota Bio’s partner farm in Italy and processed in a laboratory.",
    faqTitle: "Buying, payment and delivery", support: "For product enquiries", privacy: "Privacy notice", terms: "Preview terms", cookies: "Cookies",
    faqs: [
      {q:"What is Foglie Bio Plus?",a:"It is an olive-leaf food supplement presented as an infusion, created through the project by Antonio Berti and La Ruota Bio."},
      {q:"Where do the leaves come from?",a:"The leaves come from La Ruota Bio’s partner farm in Italy. Their Italian origin is also stated on the product label."},
      {q:"How should it be used and stored?",a:"Follow the instructions and warnings on the bottle label. Dosage and storage details will be available once the updated specification is confirmed. We do not state a standard duration for one bottle."},
      {q:"Can I buy it again each month?",a:"You can make a one-time purchase whenever you choose. There are no automatic renewals or recurring charges. Purchasing frequency is not dosage advice."},
      {q:"How does the discount work?",a:"One bottle costs €42.50. The three-bottle pack receives 8% off immediately, including on your first purchase: €117.30 in total, or €39.10 per bottle. No code is needed and discounts do not stack. Checkout is still in test mode."},
      {q:"Which countries does checkout cover?",a:"The preview accepts addresses in all 27 European Union countries and Switzerland. This is not yet a delivery commitment. Switzerland is outside the EU: delivery rates and any import taxes or handling charges need a separate review before sales begin."},
      {q:"Which payments can I try?",a:"Stripe’s test checkout offers cards and, where available, Apple Pay, Google Pay and Satispay. Use fictional details and test cards only; no product will be shipped."}
    ],
    checkoutTitle: "Your test purchase", testBanner: "Stripe · test environment", testNoOrder: "No real charge, order or shipment.", changePack: "Change pack",
    safeTitle: "Use fictional details and test cards only.", safeText: "Stripe opens in a new tab. Details entered there are transmitted and stored in the test environment. Do not use your personal details or a real payment card.",
    testData: "Example details for your test", name: "Name", address: "Address", phone: "Fictional phone", card: "Test card", expiry: "Expiry / CVC",
    decline: "To simulate a declined card:", pay: "Continue to Stripe · test", newTab: "(new tab)", close: "Close", back: "Back to the product",
    fixedPack: "Your chosen pack is fixed on Stripe. To change it, return here and select another option.",
    returned: "Continue in the Stripe tab to see the result. Close it to return here, including if you abandon the test. No real order is created.",
    unavailable: "Preview unavailable for this pack. Please select another option."
  }
};
