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
import type { Language } from "../data/shopCopy";
const icons = [Leaf, FlaskConical, Sprout];
const englishFeatures = [
  { title: "Olive leaves.\nItalian origin.", text: "Our starting point is the raw ingredient." },
  { title: "Curiosity,\ncultivated over time.", text: "Years of study and experimentation." },
  { title: "One product.\nA story of people.", text: "Antonio and La Ruota Bio’s project." }
];
export function FeatureStrip({ language = "it" }: { language?: Language }) {
  const items = language === "en" ? englishFeatures : features;
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
      aria-label={language === "it" ? "Tre prospettive su Foglie Bio Plus" : "Three perspectives on Foglie Bio Plus"}
    >
      <a className="story-panel" href="#storia">
        <span className="eyebrow">{language === "it" ? "01 / UNA SCELTA DI VITA" : "01 / A LIFE CHOICE"}</span>
        <h2>
          {language === "it" ? "Prima di una bottiglia," : "Before a bottle,"}
          <br />
          {language === "it" ? "c’è una persona." : "there is a person."}
        </h2>
        <span className="panel-link">
          {language === "it" ? "La storia di Antonio" : "Antonio’s story"} <ArrowUpRight size={20} />
        </span>
        <span className="panel-year" aria-hidden="true">
          2022
        </span>
      </a>
      <section
        className="feature-panel"
        aria-label={language === "it" ? "Caratteristiche del progetto" : "Project features"}
        aria-roledescription={language === "it" ? "carosello" : "carousel"}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setHovered(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
        }}
      >
        <div className="feature-top">
          <span className="eyebrow">{language === "it" ? "02 / IL NOSTRO PUNTO DI PARTENZA" : "02 / OUR STARTING POINT"}</span>
          <button
            className="icon-button"
            aria-label={
              paused
                ? (language === "it" ? "Riprendi le caratteristiche" : "Resume features")
                : (language === "it" ? "Pausa le caratteristiche" : "Pause features")
            }
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
        <div className="feature-content" key={index}>
          <Icon size={34} strokeWidth={1.2} />
          <h2>{items[index].title}</h2>
          <p>{items[index].text}</p>
        </div>
        <div className="indicators">
          {items.map((feature, i) => (
            <button
              key={feature.title}
              aria-label={(language === "it" ? "Caratteristica " : "Feature ") + (i + 1) + ": " + feature.title}
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
            {language === "it" ? "L’olivo," : "The olive tree,"}
            <br />
            {language === "it" ? "in una nuova forma." : "in a new form."}
          </h2>
          <p>
            {language === "it" ? "Infuso di foglie d’olivo" : "Olive-leaf infusion"}
            <br />
            {language === "it" ? "Formato da 1 litro" : "1-litre bottle"}
          </p>
        </div>
        <Bottle alt={language === "it" ? "Bottiglia originale di Foglie Bio Plus" : "Original bottle of Foglie Bio Plus"} />
        <span className="panel-link">
          {language === "it" ? "Conosci il prodotto" : "Discover the product"} <ArrowUpRight size={20} />
        </span>
      </a>
    </section>
  );
}
