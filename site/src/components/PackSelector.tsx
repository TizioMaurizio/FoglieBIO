import { useId } from "react";
import { shopCopy, type Language } from "../data/shopCopy";
import { stripeTest } from "../services/stripeTest";
import { formatMoney } from "../services/validation";

export function PackSelector({ quantity, onChange, language }: {
  quantity: number;
  onChange: (quantity: number) => void;
  language: Language;
}) {
  const groupName = useId();
  const t = shopCopy[language];
  const money = (amount: number) => formatMoney(amount, language);
  return <fieldset className="shop-packs">
    <legend>{t.choose}</legend>
    {stripeTest.offers.map(item => {
      const saving = stripeTest.baseUnitAmountCents * item.bottles - item.amountCents;
      return <label className={"shop-pack" + (item.bottles === quantity ? " selected" : "")} key={item.bottles}>
        <input type="radio" name={groupName} value={item.bottles} checked={item.bottles === quantity} onChange={() => onChange(item.bottles)} />
        <span className="shop-pack-title">{item.bottles === 1 ? t.single : item.bottles + " " + t.bottles}</span>
        <strong>{money(item.amountCents)}</strong>
        <span>{money(item.amountCents / item.bottles)} {t.each}</span>
        {item.discountPercent > 0 ? <>
          <small className="shop-pack-badge">−{item.discountPercent}% · {t.save} {money(saving)}</small>
          <small>{t.firstOrderDiscount}</small>
        </> : <small>{t.oneOff}</small>}
      </label>;
    })}
  </fieldset>;
}
