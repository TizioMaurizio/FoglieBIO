"use client";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { brandAssets } from '../data/brandAssets';
import { process, timeline } from "../data/content";
import { photography, antonioSources } from "../data/photography";
import { trackEvent } from "../services/providers";
export function OliveStory() {
  return (
    <section className="olive-story section-space" id="foglie">
      <div className="olive-story-copy">
        <p className="eyebrow">UN ALBERO FAMILIARE. UN ALTRO SGUARDO.</p>
        <h2>
          Tutti conoscono il frutto.
          <span>Partiamo dalle foglie.</span>
        </h2>
        <p>
          Dietro l’olivo che conosciamo c’è un mondo da osservare. È da questa
          curiosità che nasce Foglie Bio Plus: dare una nuova forma a una
          materia prima della nostra terra.
        </p>
        <a className="text-link" href="#origine">
          Segui il percorso <ArrowUpRight size={19} />
        </a>
      </div>
      <div className="leaf-profile">
        <figure className="label-study">
          <img
            src={brandAssets.leaves}
            width="640"
            height="640"
            alt="Illustrazione del marchio ispirata alle foglie d’olivo"
            loading="lazy"
          />
          <figcaption>Le foglie, al centro del progetto</figcaption>
        </figure>
        <div className="leaf-profile-copy">
          <p className="eyebrow">LA MATERIA PRIMA</p>
          <h3>Una foglia.<br />Un’origine precisa.</h3>
          <dl>
            <div><dt>Pianta</dt><dd>Olea europaea</dd></div>
            <div><dt>Parte utilizzata</dt><dd>Le foglie</dd></div>
            <div><dt>Origine delle foglie</dt><dd>Italia</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
export function FieldToBottle() {
  return (
    <section id="origine" className="process-section section-space">
      <div className="section-heading">
        <p className="eyebrow">UN’ORIGINE DA CONOSCERE</p>
        <h2>
          Dalla terra
          <br />
          alla bottiglia.
        </h2>
        <p>
          A Roda Dea Sega è l’azienda agricola che Antonio ha fondato nel 1998.
          Coltivazioni stagionali, cura del suolo e biodiversità sono parte
          della sua storia. Da questo mondo nasce il progetto Foglie Bio Plus.
        </p>
      </div>
      <figure className="farm-photograph">
        <img
          src={photography.farm.src}
          srcSet={photography.farm.srcSet}
          sizes="(max-width: 700px) 88vw, (max-width: 1700px) 86vw, 1450px"
          width={photography.farm.width}
          height={photography.farm.height}
          alt={photography.farm.alt}
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          <span><strong>A Roda Dea Sega</strong> · Il mondo agricolo di Antonio</span>
          <a href={antonioSources.farm} target="_blank" rel="noopener noreferrer">Scopri l’azienda sul sito di Antonio <ArrowUpRight size={14} /></a>
        </figcaption>
      </figure>
      <img className="brand-process-illustration" src={brandAssets.process} width="720" height="240" alt="" aria-hidden="true" loading="lazy" />
      <div className="process-grid">
        {process.map((step, i) => (
          <article key={step.title}>
            <span className="step-number">0{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function FounderStory() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          trackEvent("story_view");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="storia" className="founder section-space" ref={ref}>
      <div className="founder-heading">
        <p className="eyebrow">ANTONIO BERTI / IL FONDATORE</p>
        <h2>
          Una storia iniziata
          <br />
          molto prima
          <br />
          <span>della bottiglia.</span>
        </h2>
        <p>
          Prima c’era il disegno meccanico. Poi, nel 1998, la scelta di cambiare
          strada e dedicarsi alla terra.
        </p>
        <p>
          Con A Roda Dea Sega, Antonio porta avanti un lavoro fatto di coltivazione,
          sperimentazione e condivisione dei saperi agricoli. L’interesse per le foglie d’olivo apre un nuovo percorso
          di studio, prove e confronto. Da quel percorso nasce Foglie Bio Plus.
        </p>
        <details>
          <summary>
            Leggi di più sulla sua scelta <ArrowUpRight size={18} />
          </summary>
          <p>
            Il passaggio all’agricoltura porta Antonio a occuparsi di
            coltivazione, biodiversità e sperimentazione. Nel 2013 comincia ad
            approfondire la composizione delle foglie d’olivo. Nel 2022 il
            lavoro degli anni precedenti diventa un prodotto: Foglie Bio Plus®.
          </p>
        </details>
        <a className="text-link founder-source" href={antonioSources.story} target="_blank" rel="noopener noreferrer">La storia raccontata da Antonio <ArrowUpRight size={18} /></a>
      </div>
      <figure className="founder-portrait">
        <img
          src={photography.portrait.src}
          srcSet={photography.portrait.srcSet}
          sizes="(max-width: 700px) 88vw, (max-width: 1100px) 40vw, 480px"
          width={photography.portrait.width}
          height={photography.portrait.height}
          alt={photography.portrait.alt}
          loading="lazy"
          decoding="async"
        />
        <figcaption><span>Antonio Berti</span><a href={photography.portrait.source} target="_blank" rel="noopener noreferrer">Dal suo sito ufficiale <ArrowUpRight size={14} /></a></figcaption>
      </figure>
      <div className="timeline">
        {timeline.map((item) => (
          <article key={item.year}>
            <span>{item.year}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Composition() {
  return (
    <section id="composizione" className="composition section-space" aria-labelledby="composition-title">
      <p className="eyebrow">CONOSCERE LA MATERIA PRIMA</p>
      <div className="composition-heading">
        <h2 id="composition-title">
          Dentro una foglia,
          <br />
          un mondo da studiare.
        </h2>
        <p>
          Oleuropeina, idrossitirosolo, polifenoli: nomi che ricorrono nello
          studio dell’olivo. Conoscere la composizione delle foglie è uno dei
          punti di partenza del percorso di Antonio.
        </p>
      </div>
      <div className="compound-grid">
        <article>
          <span>01</span>
          <h3>Oleuropeina</h3>
          <p>
            Uno dei composti fenolici descritti nella letteratura sulle foglie
            d’olivo.
          </p>
        </article>
        <article>
          <span>02</span>
          <h3>Idrossitirosolo</h3>
          <p>
            Un composto fenolico presente negli studi sulla composizione
            dell’olivo.
          </p>
        </article>
        <article>
          <span>03</span>
          <h3>Polifenoli e flavonoidi</h3>
          <p>
            Famiglie di composti vegetali che aiutano a descrivere la
            complessità della pianta.
          </p>
        </article>
      </div>
    </section>
  );
}
