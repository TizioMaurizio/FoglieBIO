"use client";
import { useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";
import { navigation } from "../data/content";
import { Modal } from "./Primitives";
import { BrandLogo } from './BrandLogo';

export function Navbar({
  onPurchase,
}: {
  onPurchase: (source: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#contenuto">
        Vai al contenuto
      </a>
      <header className="nav">
        <a
          className="wordmark"
          href="#inizio"
          aria-label="Foglie Bio Plus, inizio pagina"
        >
          <BrandLogo decorative />
          <span>
            foglie bio plus<sup>®</sup>
            <small>UNA STORIA LA RUOTA BIO</small>
          </span>
        </a>
        <nav aria-label="Navigazione principale">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="button" onClick={() => onPurchase("navigation")}>
            Acquista <ArrowUpRight size={16} />
          </button>
          <button
            className="icon-button menu-button"
            aria-label="Apri menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>
      {open && (
        <Modal
          title="Esplora"
          className="mobile-menu"
          onClose={() => setOpen(false)}
        >
          <nav aria-label="Navigazione mobile">
            {navigation.map((item) => (
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
            Foglie d’olivo italiane.
            <br />
            Una storia La Ruota Bio.
          </p>
        </Modal>
      )}
    </>
  );
}
