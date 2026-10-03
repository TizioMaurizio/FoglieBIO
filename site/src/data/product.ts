import { assetUrl } from "../config/site";
export interface PurchaseOption {
  id: string;
  title: string;
  bottles: number;
  priceCents: number | null;
  compareAtPriceCents?: number;
  badge?: string;
  description: string;
  enabled: boolean;
  kind: "one-time" | "bundle" | "subscription";
}
export const product = {
  id: "foglie-bio-plus",
  name: "Foglie Bio Plus®",
  description:
    "L’infuso di foglie d’olivo italiane. Un integratore alimentare nato da una storia agricola e da anni di studio.",
  image: assetUrl("images/bottle.jpg"),
  labelImage: assetUrl("images/label.jpg"),
  format: "1 litro",
  origin: "Italia",
  currency: "EUR",
  priceCents: null as number | null,
  ingredients: null as string | null,
  dosage: null as string | null,
  storage: null as string | null,
  certification: 'Biologico certificato',
  options: [
    {
      id: "single",
      title: "Bottiglia singola",
      bottles: 1,
      priceCents: null,
      description: "Formato da 1 litro",
      enabled: true,
      kind: "one-time",
    },
    {
      id: "duo",
      title: "Due bottiglie",
      bottles: 2,
      priceCents: null,
      description: "",
      enabled: false,
      kind: "bundle",
    },
    {
      id: "trio",
      title: "Tre bottiglie",
      bottles: 3,
      priceCents: null,
      description: "",
      enabled: false,
      kind: "bundle",
    },
    {
      id: "quarterly",
      title: "Fornitura trimestrale",
      bottles: 3,
      priceCents: null,
      description: "Quantità da verificare con la dose ufficiale",
      enabled: false,
      kind: "bundle",
    },
    {
      id: "subscription",
      title: "Acquisto periodico",
      bottles: 1,
      priceCents: null,
      description: "",
      enabled: false,
      kind: "subscription",
    },
  ] as PurchaseOption[],
};
