"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
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
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [scratched, setScratched] = useState(0); // 0 → 100%

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 400,
    damping: 25,
  });

  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 400,
    damping: 25,
  });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(px);
    y.set(py);

    // cursor glow position
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);

    // SCRATCH PROGRESS (fake but feels real)
    setScratched((prev) => Math.min(prev + 1.2, 100));
  }

  function reset() {
    x.set(0);
    y.set(0);

    if (!selected) {
      setScratched(0); // reset scratch if not selected
    }
  }

  const revealOpacity = scratched / 100;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className={`
        group relative rounded-2xl border overflow-hidden
        bg-card will-change-transform
        transition-all
        ${
          selected
            ? "border-primary shadow-xl ring-2 ring-primary/20"
            : "border-border hover:border-primary/40 hover:shadow-lg"
        }
      `}
    >
      {/* 🌈 CURSOR GLOW */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(
              280px circle at var(--mx, 50%) var(--my, 50%),
              rgba(120,75,160,0.25),
              transparent 60%
            )
          `,
        }}
      />

      {/* 🪙 SCRATCH LAYER (LOTTERY EFFECT) */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-opacity"
        style={{
          opacity: 1 - revealOpacity,
          background:
            "repeating-linear-gradient(45deg,#9992 0 10px,#bbb3 10px 20px)",
        }}
      />

      {/* 🧠 HIDDEN CONTENT (REVEAL AREA) */}
      <div
        className="relative z-10 p-5"
        style={{
          opacity: revealOpacity,
          filter: `blur(${(1 - revealOpacity) * 6}px)`,
          transition: "all 0.2s ease",
        }}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">
            {product.code}
          </span>

          {selected && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              انتخاب‌شده
            </span>
          )}
        </div>

        {/* BODY */}
        <h3 className="text-lg font-bold mt-3">{product.title}</h3>

        <p className="text-sm text-muted-foreground mt-1">
          {product.tagline}
        </p>

        <p className="text-sm leading-7 text-muted-foreground/90 mt-3">
          {product.description}
        </p>

        <ul className="space-y-2 mt-4">
          {product.features.map((f) => (
            <li key={f} className="flex gap-2 text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 mt-1 rounded-full bg-primary" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* 🎯 INSTRUCTION OVERLAY */}
      {scratched < 60 && (
        <div className="absolute inset-0 z-30 flex items-center justify-center text-center px-6">
          <div className="bg-background/80 backdrop-blur-md border border-border rounded-xl px-4 py-3 text-xs text-muted-foreground">
            🪄 برای دیدن محتوا روی کارت بکشید (Scratch کنید)
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="relative z-10 px-5 py-4 flex items-center justify-between">
        <div className="text-[11px] text-muted-foreground">
          <div>{product.deliveryTime}</div>
          <div className="text-foreground font-medium">
            {product.startingPrice}
          </div>
        </div>

        <button
          onClick={() => {
            onSelect();

            // reset scratch when switching selection
            setScratched(0);
          }}
          className={`
            px-4 py-2 rounded-xl text-xs font-medium transition
            ${
              selected
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }
          `}
        >
          {selected ? "انتخاب شد ✓" : "انتخاب"}
        </button>
      </div>
    </motion.div>
  );
}