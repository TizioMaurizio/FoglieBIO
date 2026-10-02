"use client";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Leaf } from "lucide-react";
import { product } from "../data/product";
import { process, timeline } from "../data/content";
import { trackEvent } from "../services/providers";
export function OliveStory() {
  return (
    <section className="olive-story section-space" id="foglie">
      <div>
        <p className="eyebrow">UN ALBERO FAMILIARE. UN ALTRO SGUARDO.</p>
        <h2>
          Tutti conoscono
          <br />
          il frutto.
          <br />
          <span>
            Partiamo
            <br />
            dalle foglie.
          </span>
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
      <div className="botanical-panel">
        <div className="leaf-detail">
          <img
            src={product.labelImage}
            width="448"
            height="521"
            alt="Dettaglio della foglia d’olivo raffigurata sull’etichetta originale"
            loading="lazy"
          />
        </div>
        <div className="botanical-caption">
          <span>OLEA EUROPAEA</span>
          <span>Dettaglio dell’etichetta originale</span>
        </div>
        <div className="botanical-note">
          <Leaf size={24} strokeWidth={1} />
          <p>
            A volte, una nuova idea
            <br />
            comincia guardando più da vicino.
          </p>
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
          Il legame con l’agricoltura è il punto di partenza. Il percorso
          prosegue in laboratorio, dove le foglie vengono lavorate.
        </p>
      </div>
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
          Antonio sceglie l’agricoltura biologica e fa della curiosità un modo
          di lavorare. L’interesse per le foglie d’olivo apre un nuovo percorso
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
      </div>
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
