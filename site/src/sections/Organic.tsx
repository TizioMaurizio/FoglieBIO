import { Leaf, ArrowUpRight, FileText, ArrowDown } from 'lucide-react';
import { organic } from '../data/organic';

export function OrganicHighlight() {
  return <a className="organic-highlight" href="#biologico">
    <Leaf size={25} strokeWidth={1.5} aria-hidden="true" />
    <span><strong>Agricoltura biologica dal {organic.farmSince}</strong><small>La storia dell’azienda di Antonio · Scopri i documenti</small></span>
    <ArrowDown size={17} aria-hidden="true" />
  </a>;
}

export function Organic() {
  const certificate = organic.certificate;
  return <section className="organic-section section-space" id="biologico" aria-labelledby="organic-title">
    <div className="organic-intro">
      <p className="eyebrow">LA SCELTA AGRICOLA DI ANTONIO</p>
      <h2 id="organic-title">Il biologico,<br/><span>fin dalle origini.</span></h2>
      <p>Nel 1998 Antonio sceglie l’agricoltura biologica. È il percorso di {organic.farmName}, l’azienda da cui prende forma la sua visione: coltivare con attenzione al suolo, alle stagioni e alla biodiversità.</p>
      <a className="text-link" href={organic.farmSource} target="_blank" rel="noopener noreferrer">Il percorso biologico raccontato da Antonio <ArrowUpRight size={17}/></a>
      <div className="organic-principles"><Leaf size={22} strokeWidth={1.4} aria-hidden="true"/><p>Una scelta di coltivazione.<br/>Una storia da conoscere, documenti da consultare.</p></div>
    </div>
    <article className="organic-document" aria-labelledby="organic-document-title">
      <div className="organic-document-heading"><FileText size={28} strokeWidth={1.4} aria-hidden="true"/><span className="eyebrow">DOCUMENTO STORICO · 2023</span></div>
      <h3 id="organic-document-title">Certificazione biologica</h3>
      <p className="organic-operator">{certificate.operatorName}</p>
      <dl>
        <div><dt>Organismo di controllo</dt><dd>{certificate.authority} · {certificate.authorityCode}</dd></div>
        <div><dt>Codice operatore</dt><dd>{certificate.operatorCode}</dd></div>
        <div><dt>Attività indicate</dt><dd>{certificate.activities}</dd></div>
        <div><dt>Validità riportata nel PDF</dt><dd>{certificate.periodLabel}</dd></div>
      </dl>
      <p className="organic-document-note"><strong>Documento storico.</strong> Il periodo riportato termina il 20 marzo 2026. Il rinnovo e la copertura specifica di Foglie Bio Plus devono ancora essere verificati.</p>
      <a className="button" href={certificate.pdf} target="_blank" rel="noopener noreferrer">Consulta il certificato pubblicato <ArrowUpRight size={17}/></a>
      <a className="organic-source" href={organic.companySource} target="_blank" rel="noopener noreferrer">Fonte: pagina certificazioni di La Ruota Bio <ArrowUpRight size={14}/></a>
    </article>
  </section>;
}
