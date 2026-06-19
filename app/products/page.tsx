"use client";

import { useState } from "react";
import SiteHeader from "../components/SiteHeader";
import ProductCard from "../components/ProductCard";
import ContactForm from "../components/ContactForm";
import ToastHost from "../components/ToastHost";
import { products } from "@/lib/products";

export default function ProductsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleSelect(id: string) {
    setSelectedId(id);
    // smooth-scroll the contact form into view after state updates
    requestAnimationFrame(() => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <>
      <SiteHeader />
      <ToastHost />

      {/* ---------------- PRODUCT LIST ---------------- */}
      <section className="px-5 sm:px-8 pt-14 pb-10">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono-ui text-xs text-[var(--brass-bright)] mb-3 tracking-wide">
            خدمات و محصولات
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text-on-ink)] mb-3">
            یه خدمت رو انتخاب کن، بقیه‌ش با من
          </h1>
          <p className="text-[var(--muted-on-ink)] text-sm sm:text-base leading-7 max-w-2xl mb-10">
            هر کدوم از این چهار مسیر، بسته به نیاز فروشگاه یا برندت طراحی
            شدن. روی «انتخاب این خدمت» بزن تا فرم تماس با جزئیات همون خدمت
            براِت باز بشه.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selected={selectedId === product.id}
                onSelect={() => handleSelect(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CONTACT FORM ---------------- */}
      <section
        id="contact"
        className="px-5 sm:px-8 py-16 border-t border-[var(--border-on-ink)] bg-[var(--ink-soft)]"
      >
        <ContactForm
          selectedProductId={selectedId}
          onClearSelection={() => setSelectedId(null)}
        />
      </section>
    </>
  );
}
