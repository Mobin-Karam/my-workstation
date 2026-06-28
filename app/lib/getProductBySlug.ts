import { products } from "./products";

/* ---------------- NORMALIZE ---------------- */
function normalize(str: string) {
  return str.toLowerCase().trim().replace(/\s+/g, "-");
}

/* ---------------- DECODE (NEW) ---------------- */
/**
 * Handles:
 * - Persian URLs
 * - encoded URLs (%D9%85...)
 * - accidental spaces / weird input
 */
function decodeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

/* ---------------- SIMILARITY (IMPROVED) ---------------- */
function similarity(a: string, b: string) {
  const max = Math.max(a.length, b.length);
  if (max === 0) return 1;

  let matches = 0;

  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) matches++;
  }

  return matches / max;
}

/* ---------------- MAIN FUNCTION ---------------- */
export function getProductBySlug(slug: string) {
  // 1. decode first (IMPORTANT)
  const decoded = decodeSlug(slug);

  // 2. normalize
  const cleanSlug = normalize(decoded);

  // 3. exact match
  const exact = products.find((p) => normalize(p.slug) === cleanSlug);

  if (exact) {
    return {
      status: "exact",
      product: exact,
      suggestion: null,
    };
  }

  // 4. fuzzy match (best guess)
  let bestMatch = null;
  let bestScore = 0;

  for (const product of products) {
    const score = similarity(cleanSlug, normalize(product.slug));

    if (score > bestScore) {
      bestScore = score;
      bestMatch = product;
    }
  }

  // 5. suggestion mode
  if (bestMatch && bestScore > 0.45) {
    return {
      status: "suggestion",
      product: bestMatch,
      suggestion: {
        message: "منظورت این بود؟ 👀",
        confidence: Math.round(bestScore * 100),
      },
    };
  }

  // 6. not found fallback (fun UX)
  return {
    status: "not_found",
    product: null,
    suggestion: {
      message: "این محصول فعلاً پیدا نشد 😕",
      hint: "لینک یا اسم سرویس رو دوباره بررسی کن",
    },
  };
}
