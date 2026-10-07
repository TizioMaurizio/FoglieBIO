"use client";
import { useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";
import { brand, navigation } from "../data/content";
import { assetUrl } from "../config/site";
import { Modal } from "./Primitives";
import { BrandLogo } from './BrandLogo';
import { pagePath, type Language } from '../data/shopCopy';

export function Navbar({
  onPurchase,
  language = "it",
}: {
  onPurchase: (source: string) => void;
  language?: Language;
}) {
  const [open, setOpen] = useState(false);
  const items = language === "it" ? navigation : [
    {href:"#prodotto",label:"The product"}, {href:"#biologico",label:"Organic"},
    {href:"#storia",label:"The story"}, {href:"#origine",label:"Its origins"}, {href:"#faq",label:"FAQ"}
  ];
  return (
    <>
      <a className="skip-link" href="#contenuto">
        {language === "it" ? "Vai al contenuto" : "Skip to content"}
      </a>
      <header className="nav presentation-nav">
        <a
          className="wordmark"
          href="#inizio"
          aria-label={language === "it" ? "Foglie Bio Plus, inizio pagina" : "Foglie Bio Plus, top of page"}
        >
          <BrandLogo decorative />
          <span>
            foglie bio plus<sup>®</sup>
            <small>{language === "it" ? "UNA STORIA LA RUOTA BIO" : "A LA RUOTA BIO STORY"}</small>
          </span>
        </a>
        <nav aria-label={language === "it" ? "Navigazione principale" : "Main navigation"}>
          {items.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="parent-site-link" href={brand.website} aria-label={language === "it" ? "Vai al sito La Ruota Bio" : "Visit the La Ruota Bio website"}>
          <img src={assetUrl("brand/la-ruota-bio.jpg")} alt="" width="300" height="139" />
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <div className="nav-actions">
          <div className="shop-language" role="group" aria-label={language === "it" ? "Lingua" : "Language"}>
            <a href={pagePath("it")} hrefLang="it" lang="it" aria-current={language === "it" ? "page" : undefined}>IT</a>
            <a href={pagePath("en")} hrefLang="en" lang="en" aria-current={language === "en" ? "page" : undefined}>EN</a>
          </div>
          <button className="button" onClick={() => onPurchase("navigation")}>
            {language === "it" ? "Acquista" : "Buy"} <ArrowUpRight size={16} />
          </button>
          <button
            className="icon-button menu-button"
            aria-label={language === "it" ? "Apri menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>
      {open && (
        <Modal
          title={language === "it" ? "Esplora" : "Explore"}
          closeLabel={language === "it" ? "Chiudi" : "Close"}
          className="mobile-menu"
          onClose={() => setOpen(false)}
        >
          <nav aria-label={language === "it" ? "Navigazione mobile" : "Mobile navigation"}>
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
                <ArrowUpRight size={24} />
              </a>
            ))}
          </nav>
          <p>
            {language === "it" ? "Foglie d’olivo italiane." : "Italian olive leaves."}
            <br />
            {language === "it" ? "Una storia La Ruota Bio." : "A La Ruota Bio story."}
          </p>
        </Modal>
      )}
    </>
  );
}
