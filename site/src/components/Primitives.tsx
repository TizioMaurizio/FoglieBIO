"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { Minus, Plus, X } from "lucide-react";
import { integrations } from "../config/integrations";
import { product } from "../data/product";

export function Bottle({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`bottle ${className}`}>
    <img
      className="bottle-photo"
      src={product.image}
      alt="Bottiglia originale di Foglie Bio Plus, infuso di foglie d’olivo italiane"
      width="1080"
      height="1488"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
    </span>
  );
}
export function QuantitySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="quantity" role="group" aria-label="Quantità di bottiglie">
      <button
        type="button"
        aria-label="Diminuisci quantità"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={16} />
      </button>
      <output aria-live="polite" aria-label="Numero di bottiglie">
        {value}
      </output>
      <button
        type="button"
        aria-label="Aumenta quantità"
        disabled={value >= integrations.maxQuantity}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
export function Modal({
  title,
  onClose,
  children,
  className = "",
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    dialog?.querySelector<HTMLButtonElement>("button")?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-labelledby="dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="modal-heading">
        <h2 id="dialog-title">{title}</h2>
        <button
          className="icon-button"
          type="button"
          aria-label="Chiudi"
          onClick={onClose}
        >
          <X size={24} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
