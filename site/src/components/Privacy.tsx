import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { brand } from '../data/content';
import { assetUrl } from '../config/site';

export const privacyPath = () => assetUrl('privacy.html');

export function PrivacyNotice({ id }: { id: string }) {
  return <aside className="privacy-notice" aria-labelledby={`${id}-title`}>
    <ShieldCheck size={20} aria-hidden="true" />
    <div>
      <h3 id={`${id}-title`}>La demo non richiede i tuoi dati personali.</h3>
      <p>I campi contengono solo esempi non modificabili. Non inviamo ordini, iscrizioni o dati dei moduli.</p>
      <a href={privacyPath()} target="_blank" rel="noopener noreferrer">Leggi l’informativa privacy dell’anteprima <span className="sr-only">(si apre in una nuova scheda)</span></a>
      <p className="privacy-hosting-note">L’hosting può registrare dati tecnici di navigazione, descritti nell’informativa.</p>
    </div>
  </aside>;
}

export function PrivacyPage() {
  return <main className="privacy-page">
    <a className="text-link" href={assetUrl('')}><ArrowLeft size={17}/> Torna a Foglie Bio Plus</a>
    <p className="eyebrow">INFORMATIVA DELL’ANTEPRIMA · 2 OTTOBRE 2026</p>
    <h1>Privacy e dati personali</h1>
    <p className="privacy-intro">Questa è una dimostrazione pubblica di Foglie Bio Plus. Puoi provare il percorso di acquisto e la newsletter senza inserire nome, indirizzo, telefono o email.</p>

    <section aria-labelledby="privacy-demo"><h2 id="privacy-demo">Moduli dimostrativi</h2>
      <p>Checkout e newsletter mostrano dati fittizi precompilati, non modificabili. I pulsanti eseguono solo una simulazione nel browser: non trasmettono dati dei moduli, non creano ordini o iscrizioni e non inviano email. Non vengono richiesti dati di carte di pagamento.</p>
      <p>L’applicazione non salva dati dei moduli in cookie, memoria locale del browser o database. Lo stato della simulazione viene perso ricaricando la pagina.</p>
    </section>

    <section aria-labelledby="privacy-navigation"><h2 id="privacy-navigation">Navigazione e hosting</h2>
      <p>Il sito è ospitato su GitHub Pages. GitHub dichiara di registrare l’indirizzo IP dei visitatori per finalità di sicurezza, anche senza accesso a un account. Questi dati tecnici sono distinti dagli esempi mostrati nei moduli.</p>
      <p>Per finalità, basi giuridiche, conservazione, destinatari, eventuali trasferimenti internazionali e modalità di esercizio dei diritti relativi al servizio di hosting, consulta l’<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">informativa privacy di GitHub</a>. La registrazione dell’IP è descritta anche nella <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection" target="_blank" rel="noopener noreferrer">documentazione di GitHub Pages</a>.</p>
    </section>

    <section aria-labelledby="privacy-cookies"><h2 id="privacy-cookies">Cookie, statistiche e collegamenti esterni</h2>
      <p>Il codice di questa anteprima non imposta cookie né strumenti di profilazione o analisi pubblicitaria. Font e immagini sono serviti con il sito. Non sono attivi Google Analytics, Google Ads, Meta Pixel o servizi di newsletter.</p>
      <p>Se apri un collegamento esterno o invii volontariamente un’email, si applicano le condizioni e l’informativa del servizio o del destinatario scelto.</p>
    </section>

    <section aria-labelledby="privacy-brand"><h2 id="privacy-brand">Riferimenti di La Ruota Bio</h2>
      <p>L’<a href="https://www.laruotabio.it/privacy-policy/" target="_blank" rel="noopener noreferrer">informativa del sito ufficiale La Ruota Bio</a> indica {brand.legalName}, {brand.address}, P. IVA {brand.vat}, email <a href={`mailto:${brand.email}`}>{brand.email}</a> e PEC <a href="mailto:laruotabiosrl@legalmail.it">laruotabiosrl@legalmail.it</a>.</p>
      <p>Questi riferimenti provengono dal sito ufficiale. L’informativa per l’eventuale negozio attivo su questo dominio deve essere confermata dal titolare prima della raccolta di dati reali.</p>
    </section>

    <section aria-labelledby="privacy-gdpr"><h2 id="privacy-gdpr">GDPR e attivazione del negozio</h2>
      <p>Il GDPR può applicarsi ai dati personali di navigazione anche quando i moduli sono dimostrativi. Non presentiamo questa anteprima come un negozio già abilitato alla raccolta di dati personali.</p>
      <p>Prima di attivare ordini o iscrizioni reali, occorre fornire l’informativa prevista dall’art. 13 del Regolamento (UE) 2016/679: titolare e contatti, finalità e basi giuridiche, dati necessari o facoltativi, conservazione, destinatari, trasferimenti e diritti. Il consenso a comunicazioni promozionali dovrà essere distinto dall’acquisto; prendere visione dell’informativa non equivale a prestare consenso marketing.</p>
      <p>Nei casi previsti dal GDPR puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità o opporti al trattamento, e revocare un eventuale consenso. Per ciascun trattamento utilizza i contatti dell’informativa del relativo titolare. È inoltre possibile presentare reclamo al <a href="https://www.garanteprivacy.it/" target="_blank" rel="noopener noreferrer">Garante per la protezione dei dati personali</a>.</p>
    </section>
  </main>;
}
