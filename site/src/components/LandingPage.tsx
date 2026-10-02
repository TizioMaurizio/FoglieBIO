"use client";
import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { CheckoutDrawer } from "./CheckoutDrawer";
import { Hero } from "../sections/Hero";
import { FeatureStrip } from "../sections/FeatureStrip";
import { Organic } from '../sections/Organic';
import {
  OliveStory,
  FieldToBottle,
  FounderStory,
  Composition,
} from "../sections/Story";
import { Purchase } from "../sections/Purchase";
import { FAQ, FinalCTA, Footer, Reviews } from "../sections/Closing";
import { product } from "../data/product";
import { services, trackEvent } from "../services/providers";
import type { Review } from "../services/contracts";
export function LandingPage() {
  const [checkout, setCheckout] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [optionId, setOptionId] = useState("single");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [commerceError, setCommerceError] = useState("");
  useEffect(() => {
    trackEvent("page_view");
    const target = document.getElementById("prodotto");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          trackEvent("view_item", {
            product_id: product.id,
            product_name: product.name,
            currency: product.currency,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (target) observer.observe(target);
    let active = true;
    services.reviews
      .list(product.id)
      .then((result) => {
        if (active) setReviews(result);
      })
      .catch(() => {
        /* An unavailable reviews service must not invent reviews or block purchase. */
      });
    return () => {
      active = false;
      observer.disconnect();
    };
  }, []);
  async function purchase(source: string) {
    setCommerceError("");
    trackEvent("cta_click", { source });
    try {
      const status = await services.inventory.getStatus(product.id);
      if (status === "out-of-stock") {
        setCommerceError("Il prodotto non è al momento disponibile.");
        return;
      }
      const payload = {
        product_id: product.id,
        product_name: product.name,
        quantity,
        currency: product.currency,
        simulated: true,
      };
      trackEvent("add_to_cart", payload);
      trackEvent("begin_checkout", payload);
      setCheckout(true);
    } catch {
      setCommerceError("Non è stato possibile aprire il checkout. Riprova.");
    }
  }
  function changeOption(id: string) {
    setOptionId(id);
    trackEvent("select_product", {
      product_id: product.id,
      source: id,
      simulated: true,
    });
  }
  return (
    <>
      <Navbar onPurchase={purchase} />
      <main id="contenuto">
        <Hero />
        <FeatureStrip />
        <Organic />
        <OliveStory />
        <FieldToBottle />
        <FounderStory />
        <Composition />
        <Purchase
          quantity={quantity}
          onQuantity={setQuantity}
          onPurchase={purchase}
          optionId={optionId}
          onOption={changeOption}
        />
        <Reviews reviews={reviews} />
        <FAQ />
        <FinalCTA onPurchase={purchase} />
      </main>
      <Footer />
      {commerceError && (
        <div role="alert" className="commerce-error">
          {commerceError}
          <button onClick={() => setCommerceError("")}>Chiudi</button>
        </div>
      )}
      {checkout && (
        <CheckoutDrawer
          quantity={quantity}
          setQuantity={setQuantity}
          optionId={optionId}
          onClose={() => setCheckout(false)}
        />
      )}
    </>
  );
}
