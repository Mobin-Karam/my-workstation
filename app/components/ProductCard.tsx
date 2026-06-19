"use client";

import { Product } from "@/lib/products";

export default function ProductCard({
  product,
  selected,
  onSelect,
}: {
  product: Product;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`relative rounded-2xl border bg-card text-text overflow-hidden transition-all
        ${
          selected
            ? "border-border ring-2 ring-border/40 shadow-lg"
            : "border-border hover:border-border/60"
        }`}
    >
      {/* ticket header */}
      <div className="flex items-center justify-between px-5 pt-5">
        <span className="font-mono-ui text-[11px] text-muted tracking-widest">
          {product.code}
        </span>
        {selected && (
          <span className="font-mono-ui text-[11px] px-2 py-0.5 rounded-full bg-border text-white">
            انتخاب‌شده
          </span>
        )}
      </div>

      <div className="px-5 pt-3 pb-5">
        <h3 className="text-lg font-bold mb-1">{product.title}</h3>
        <p className="text-sm text-muted mb-4">{product.tagline}</p>
        <p className="text-sm leading-7 text-text/80 mb-4">
          {product.description}
        </p>

        <ul className="space-y-1.5 mb-5">
          {product.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-xs text-text/75"
            >
              <span className="mt-1 w-1 h-1 rounded-full bg-border shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* perforated divider */}
      <div className="relative px-5">
        <div className="border-t border-dashed border-border" />
        <span className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-bg" />
        <span className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-bg" />
      </div>

      {/* ticket footer — metadata + action */}
      <div className="px-5 py-4 flex items-center justify-between gap-3">
        <div className="font-mono-ui text-[11px] text-muted leading-5">
          <div>{product.deliveryTime}</div>
          <div className="text-text font-medium">
            {product.startingPrice}
          </div>
        </div>
        <button
          type="button"
          onClick={onSelect}
          className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-medium transition-colors
            ${
              selected
                ? "bg-success text-white"
                : "bg-bg text-text hover:bg-border"
            }`}
        >
          {selected ? "انتخاب شد ✓" : "انتخاب این خدمت"}
        </button>
      </div>
    </div>
  );
}
