import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { organic } from '../data/organic';
import { brand } from '../data/content';
import { product } from '../data/product';
import { OrganicLogo } from '../components/BrandLogo';

export function OrganicHighlight() {
  return <a className="organic-highlight" href="#biologico">
    <OrganicLogo />
    <span><strong>Foglie Bio Plus® · Biologico</strong><small>Un’idea italiana, dal {brand.foundedYear}</small></span>
    <ArrowDown size={17} aria-hidden="true" />
  </a>;
}

export function Organic() {
  return <section className="organic-section section-space" id="biologico" aria-labelledby="organic-title">
    <div className="organic-intro">
      <p className="eyebrow">FOGLIE BIO PLUS® · DAL {brand.foundedYear}</p>
      <h2 id="organic-title">Il biologico,<br/><span>nel nostro infuso.</span></h2>
      <p>Foglie Bio Plus è un integratore alimentare biologico a base di foglie d’olivo italiane. Nato nel 2022 dal progetto di Antonio, porta con sé una storia di agricoltura, attenzione alla materia prima e curiosità.</p>
      <a className="text-link" href={organic.farmSource} target="_blank" rel="noopener noreferrer">La storia agricola di Antonio <ArrowUpRight size={17}/></a>
    </div>
    <article className="organic-document organic-product-card" aria-labelledby="organic-document-title">
      <OrganicLogo />
      <p className="eyebrow">FOGLIE BIO PLUS®</p>
      <h3 id="organic-document-title">Biologico certificato</h3>
      <p className="organic-operator">L’infuso di foglie d’olivo italiane.</p>
      <dl>
        <div><dt>Origine delle foglie</dt><dd>{product.origin}</dd></div>
        <div><dt>Formato</dt><dd>{product.format}</dd></div>
        <div><dt>Nascita del prodotto</dt><dd>{brand.foundedYear}</dd></div>
      </dl>
      <a className="button" href={organic.companySource} target="_blank" rel="noopener noreferrer">Il biologico di La Ruota Bio <ArrowUpRight size={17}/></a>
    </article>
  </section>;
}
