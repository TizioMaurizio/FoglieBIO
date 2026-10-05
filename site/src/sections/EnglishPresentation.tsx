import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Bottle } from "../components/Primitives";
import { brandAssets } from "../data/brandAssets";
import { brand } from "../data/content";
import { organic } from "../data/organic";
import { photography, antonioSources } from "../data/photography";

function OrganicMark() {
  return <img className="eu-organic-logo" src={brandAssets.organic} width="500" height="333" alt="European Union organic logo" />;
}

export function EnglishHero() {
  return <section className="hero" id="inizio" lang="en">
    <div className="hero-copy">
      <p className="eyebrow">ITALIAN OLIVE LEAVES. A NEW PERSPECTIVE.</p>
      <h1><span className="word-mask"><span>From the soil.</span></span><span className="word-mask"><span>From the leaves.</span></span><span className="word-mask accent"><span>A true story.</span></span></h1>
      <div className="hero-bottom"><a className="button" href="#prodotto">Discover Foglie Bio Plus <ArrowUpRight size={19}/></a><p>The olive-leaf infusion born from Antonio’s passion and years of study.</p></div>
      <a className="organic-highlight" href="#biologico"><OrganicMark/><span><strong>Foglie Bio Plus® · Organic</strong><small>An Italian idea, since {brand.foundedYear}</small></span><ArrowDown size={17} aria-hidden="true"/></a>
    </div>
    <div className="hero-art">
      <img className="hero-brand-branch" src={brandAssets.branch} width="500" height="500" alt="" aria-hidden="true"/>
      <p className="art-note">Olea europaea<br/><span>It all begins with the leaves.</span></p>
      <div className="bottle-stage"><Bottle priority alt="Original one-litre bottle of Foglie Bio Plus"/></div>
      <span className="vertical-note">LEAF ORIGIN · ITALY</span>
    </div>
    <div className="hero-foot"><span>FOGLIE BIO PLUS® · AN ITALIAN IDEA, SINCE {brand.foundedYear}</span><a href="#foglie">Another perspective on the olive tree <ArrowDown size={14}/></a></div>
  </section>;
}

export function EnglishOrganic() {
  return <section className="organic-section section-space" id="biologico" aria-labelledby="organic-title">
    <div className="organic-intro"><p className="eyebrow">FOGLIE BIO PLUS® · SINCE {brand.foundedYear}</p><h2 id="organic-title">Organic,<br/><span>in our infusion.</span></h2><p>Foglie Bio Plus is an organic food supplement made from Italian olive leaves. Created in 2022 through Antonio’s project, it brings together a history of farming, care for raw ingredients and curiosity.</p><a className="text-link" href={organic.farmSource} target="_blank" rel="noopener noreferrer">Antonio’s farming story <ArrowUpRight size={17}/></a></div>
    <article className="organic-document organic-product-card" aria-labelledby="organic-document-title"><OrganicMark/><p className="eyebrow">FOGLIE BIO PLUS®</p><h3 id="organic-document-title">Certified organic</h3><p className="organic-operator">The Italian olive-leaf infusion.</p><dl><div><dt>Leaf origin</dt><dd>Italy</dd></div><div><dt>Format</dt><dd>1 litre</dd></div><div><dt>Product created</dt><dd>{brand.foundedYear}</dd></div></dl><a className="button" href={organic.companySource} target="_blank" rel="noopener noreferrer">Organic at La Ruota Bio <ArrowUpRight size={17}/></a></article>
  </section>;
}

export function EnglishOliveStory() {
  return <section className="olive-story section-space" id="foglie">
    <div className="olive-story-copy"><p className="eyebrow">A FAMILIAR TREE. A DIFFERENT VIEW.</p><h2>Everyone knows the fruit.<span>We start with the leaves.</span></h2><p>There is a world to explore behind the olive tree we know. Foglie Bio Plus grew from this curiosity: giving a new form to a raw ingredient from our land.</p><a className="text-link" href="#origine">Follow the journey <ArrowUpRight size={19}/></a></div>
    <div className="leaf-profile"><figure className="label-study"><img src={brandAssets.leaves} width="640" height="640" alt="Brand illustration inspired by olive leaves" loading="lazy"/><figcaption>Leaves at the heart of the project</figcaption></figure><div className="leaf-profile-copy"><p className="eyebrow">THE RAW INGREDIENT</p><h3>One leaf.<br/>A specific origin.</h3><dl><div><dt>Plant</dt><dd>Olea europaea</dd></div><div><dt>Part used</dt><dd>The leaves</dd></div><div><dt>Leaf origin</dt><dd>Italy</dd></div></dl></div></div>
  </section>;
}

const process = [
  {title:"The origin",text:"The leaves come from La Ruota Bio’s partner farm in Italy."},
  {title:"The harvest",text:"The leaves are taken from the farm to a laboratory for processing."},
  {title:"The infusion",text:"The raw ingredient becomes an olive-leaf food supplement."}
];
const timeline = [
  {year:"1998",title:"Choosing the land",text:"Antonio Berti leaves his work as a mechanical designer and chooses organic farming."},
  {year:"2013",title:"A new curiosity",text:"He begins to study olive leaves and their composition in greater depth."},
  {year:"2022",title:"The idea takes shape",text:"After years of trials and discussions with experts, Foglie Bio Plus® is created."}
];

export function EnglishFieldToBottle() {
  return <section id="origine" className="process-section section-space">
    <div className="section-heading"><p className="eyebrow">AN ORIGIN TO DISCOVER</p><h2>From the land<br/>to the bottle.</h2><p>A Roda Dea Sega is the farm Antonio founded in 1998. Seasonal crops, soil care and biodiversity are part of its story. The Foglie Bio Plus project grew from this world.</p></div>
    <figure className="farm-photograph"><img src={photography.farm.src} srcSet={photography.farm.srcSet} sizes="(max-width: 700px) 88vw, (max-width: 1700px) 86vw, 1450px" width={photography.farm.width} height={photography.farm.height} alt="Fields and farm building photographed on Antonio Berti’s official website" loading="lazy" decoding="async"/><figcaption><span><strong>A Roda Dea Sega</strong> · Antonio’s farming world</span><a href={antonioSources.farm} target="_blank" rel="noopener noreferrer">Discover the farm on Antonio’s website <ArrowUpRight size={14}/></a></figcaption></figure>
    <img className="brand-process-illustration" src={brandAssets.process} width="720" height="240" alt="" aria-hidden="true" loading="lazy"/>
    <div className="process-grid">{process.map((step,index)=><article key={step.title}><span className="step-number">0{index+1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
  </section>;
}

export function EnglishFounderStory() {
  return <section id="storia" className="founder section-space">
    <div className="founder-heading"><p className="eyebrow">ANTONIO BERTI / THE FOUNDER</p><h2>A story that began<br/>long before<br/><span>the bottle.</span></h2><p>First came mechanical design. Then, in 1998, the decision to change direction and dedicate himself to the land.</p><p>Through A Roda Dea Sega, Antonio pursues farming, experimentation and the sharing of agricultural knowledge. An interest in olive leaves opens a new path of study, trials and discussion. Foglie Bio Plus grows out of that journey.</p><details><summary>Read more about his choice <ArrowUpRight size={18}/></summary><p>The move into farming leads Antonio to work on cultivation, biodiversity and experimentation. In 2013 he starts exploring the composition of olive leaves. In 2022, the work of previous years becomes a product: Foglie Bio Plus®.</p></details><a className="text-link founder-source" href={antonioSources.story} target="_blank" rel="noopener noreferrer">The story in Antonio’s own words <ArrowUpRight size={18}/></a></div>
    <figure className="founder-portrait"><img src={photography.portrait.src} srcSet={photography.portrait.srcSet} sizes="(max-width: 700px) 88vw, (max-width: 1100px) 40vw, 480px" width={photography.portrait.width} height={photography.portrait.height} alt="Portrait of Antonio Berti, from his official website" loading="lazy" decoding="async"/><figcaption><span>Antonio Berti</span><a href={photography.portrait.source} target="_blank" rel="noopener noreferrer">From his official website <ArrowUpRight size={14}/></a></figcaption></figure>
    <div className="timeline">{timeline.map(item=><article key={item.year}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
  </section>;
}

export function EnglishComposition() {
  return <section id="composizione" className="composition section-space" aria-labelledby="composition-title">
    <p className="eyebrow">UNDERSTANDING THE RAW INGREDIENT</p><div className="composition-heading"><h2 id="composition-title">Inside a leaf,<br/>a world to study.</h2><p>Oleuropein, hydroxytyrosol, polyphenols: names that recur in studies of the olive tree. Understanding the composition of its leaves is one of the starting points of Antonio’s journey.</p></div>
    <div className="compound-grid"><article><span>01</span><h3>Oleuropein</h3><p>One of the phenolic compounds described in the literature on olive leaves.</p></article><article><span>02</span><h3>Hydroxytyrosol</h3><p>A phenolic compound found in studies of the olive tree’s composition.</p></article><article><span>03</span><h3>Polyphenols and flavonoids</h3><p>Families of plant compounds that help describe the complexity of the plant.</p></article></div>
  </section>;
}
