"use client";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Leaf,
  FlaskConical,
  Sprout,
  Pause,
  Play,
} from "lucide-react";
import { features } from "../data/content";
import { Bottle } from "../components/Primitives";
const icons = [Leaf, FlaskConical, Sprout];
export function FeatureStrip() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (
      paused ||
      hovered ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % features.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [paused, hovered]);
  const Icon = icons[index];
  return (
    <section
      className="feature-strip"
      aria-label="Tre prospettive su Foglie Bio Plus"
    >
      <a className="story-panel" href="#storia">
        <span className="eyebrow">01 / UNA SCELTA DI VITA</span>
        <h2>
          Prima di una bottiglia,
          <br />
          c’è una persona.
        </h2>
        <span className="panel-link">
          La storia di Antonio <ArrowUpRight size={20} />
        </span>
        <span className="panel-year" aria-hidden="true">
          2022
        </span>
      </a>
      <section
        className="feature-panel"
        aria-label="Caratteristiche del progetto"
        aria-roledescription="carosello"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setHovered(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
        }}
      >
        <div className="feature-top">
          <span className="eyebrow">02 / IL NOSTRO PUNTO DI PARTENZA</span>
          <button
            className="icon-button"
            aria-label={
              paused
                ? "Riprendi le caratteristiche"
                : "Pausa le caratteristiche"
            }
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
        <div className="feature-content" key={index}>
          <Icon size={34} strokeWidth={1.2} />
          <h2>{features[index].title}</h2>
          <p>{features[index].text}</p>
        </div>
        <div className="indicators">
          {features.map((feature, i) => (
            <button
              key={feature.title}
              aria-label={`Caratteristica ${i + 1}: ${feature.title}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <span className={i === index ? "active" : ""} />
            </button>
          ))}
        </div>
      </section>
      <a href="#composizione" className="product-panel">
        <span className="eyebrow">03 / FOGLIE BIO PLUS®</span>
        <div>
          <h2>
            L’olivo,
            <br />
            in una nuova forma.
          </h2>
          <p>
            Infuso di foglie d’olivo
            <br />
            Formato da 1 litro
          </p>
        </div>
        <Bottle />
        <span className="panel-link">
          Conosci il prodotto <ArrowUpRight size={20} />
        </span>
      </a>
    </section>
  );
}
