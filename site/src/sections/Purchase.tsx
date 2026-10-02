"use client";
import { ArrowUpRight, ArrowRight, MapPin, Package } from "lucide-react";
import { Bottle, QuantitySelector } from "../components/Primitives";
import { product } from "../data/product";
import { integrations } from "../config/integrations";
import { formatMoney } from "../services/validation";
export function Purchase({
  quantity,
  onQuantity,
  onPurchase,
  optionId,
  onOption,
}: {
  quantity: number;
  onQuantity: (quantity: number) => void;
  onPurchase: (source: string) => void;
  optionId: string;
  onOption: (id: string) => void;
}) {
  const options = product.options.filter(
    (o) =>
      o.enabled &&
      (o.kind !== "subscription" || integrations.subscriptionsEnabled),
  );
  return (
    <section id="prodotto" className="purchase section-space">
      <div className="purchase-visual">
        <span className="eyebrow">LA TERRA, IN UNA NUOVA FORMA</span>
        <Bottle />
        <span className="purchase-caption">
          FOGLIE D’OLIVO · ORIGINE ITALIA
        </span>
      </div>
      <div className="purchase-info">
        <p className="eyebrow">L’INFUSO DI FOGLIE D’OLIVO</p>
        <h2>
          Foglie
          <br />
          Bio Plus<sup>®</sup>
        </h2>
        <p className="product-description">{product.description}</p>
        <div className="product-facts">
          <span>
            <MapPin size={16} /> Foglie italiane
          </span>
          <span>
            <Package size={16} /> {product.format}
          </span>
        </div>
        <fieldset className="purchase-options">
          <legend>Confezione</legend>
          {options.map((option) => (
            <label className="purchase-option" key={option.id}>
              <input
                type="radio"
                name="purchase-option"
                value={option.id}
                checked={optionId === option.id}
                onChange={() => onOption(option.id)}
              />
              <span>
                {option.title}
                <small>{option.description}</small>
              </span>
              <span>
                {option.priceCents !== null
                  ? formatMoney(option.priceCents)
                  : "Prezzo in conferma"}
              </span>
            </label>
          ))}
        </fieldset>
        <div className="purchase-actions">
          <QuantitySelector value={quantity} onChange={onQuantity} />
          <button className="button" onClick={() => onPurchase("product")}>
            Acquista ora <ArrowUpRight size={20} />
          </button>
        </div>
        <p className="demo-note">
          Anteprima del negozio: puoi provare il checkout.
          <br />
          Nessun ordine o pagamento reale.
        </p>
        <div className="product-details">
          <details>
            <summary>
              Ingredienti e scheda prodotto <ArrowRight size={16} />
            </summary>
            <p>
              {product.ingredients ||
                "Integratore alimentare a base di foglie d’olivo. L’elenco completo degli ingredienti e la scheda tecnica aggiornata sono in attesa di conferma."}
            </p>
          </details>
          <details>
            <summary>
              Modalità d’uso e conservazione <ArrowRight size={16} />
            </summary>
            <p>
              {product.dosage ||
                "Segui le indicazioni sull’etichetta della confezione. Dosaggio, durata dopo l’apertura e conservazione saranno riportati qui dopo la verifica della scheda aggiornata."}
            </p>
            <p>
              Gli integratori non sostituiscono una dieta varia ed equilibrata e
              uno stile di vita sano. Non superare la dose giornaliera
              consigliata. Tenere fuori dalla portata dei bambini al di sotto
              dei tre anni.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
