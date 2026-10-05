import { ArrowUpRight } from "lucide-react";
import { Hero } from "./Hero";
import { FeatureStrip } from "./FeatureStrip";
import { Organic } from "./Organic";
import { OliveStory, FieldToBottle, FounderStory, Composition } from "./Story";
import { EnglishHero, EnglishOrganic, EnglishOliveStory, EnglishFieldToBottle, EnglishFounderStory, EnglishComposition } from "./EnglishPresentation";
import { brandAssets } from "../data/brandAssets";
import type { Language } from "../data/shopCopy";

export function Presentation({ language }: { language: Language }) {
  if (language === "en") return <><EnglishHero/><FeatureStrip language="en"/><EnglishOrganic/><EnglishOliveStory/><EnglishFieldToBottle/><EnglishFounderStory/><EnglishComposition/></>;
  return <><Hero/><FeatureStrip/><Organic/><OliveStory/><FieldToBottle/><FounderStory/><Composition/></>;
}
export function PresentationClosing({ language, onPurchase }: { language: Language; onPurchase: () => void }) {
  return <section className="final-cta">
    <img className="brand-divider" src={brandAssets.divider} width="1000" height="333" alt="" aria-hidden="true" loading="lazy"/>
    <p className="eyebrow">{language === "it" ? "UNA FOGLIA. UNA STORIA. UN’IDEA ITALIANA." : "ONE LEAF. ONE STORY. AN ITALIAN IDEA."}</p>
    <h2>{language === "it" ? "Conosci la storia." : "Discover the story."}<br/>{language === "it" ? "Scopri il suo infuso." : "Explore its infusion."}</h2>
    <button className="button light-button" onClick={onPurchase}>{language === "it" ? "Scopri l’acquisto" : "Explore the purchase"}<ArrowUpRight size={19}/></button>
    <p className="fine-print">{language === "it" ? "Checkout di prova · Nessun addebito reale" : "Test checkout · No real charges"}</p>
  </section>;
}
