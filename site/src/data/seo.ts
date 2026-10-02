import { product } from "./product";
import { brand } from "./content";
export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  brand: { "@type": "Brand", name: brand.parent },
  // No Offer, AggregateRating, certification or availability until substantiated.
};
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.legalName,
  url: brand.website,
  email: brand.email,
  vatID: `IT${brand.vat}`,
};
