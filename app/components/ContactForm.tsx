"use client";

import { useState } from "react";
import { z } from "zod";
import { appEventBus } from "@/lib/appEventBus";
import { getProductById } from "@/lib/products";

/* ---------------- VALIDATION ---------------- */
const schema = z.object({
  name: z.string().min(2, "نام الزامی است"),
  brand: z.string().min(2, "نام پیج یا فروشگاه الزامی است"),
  phone: z.string().min(8, "شماره تماس معتبر وارد کنید"),
  email: z.string().email("ایمیل معتبر نیست").optional().or(z.literal("")),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm({
  selectedProductId,
  onClearSelection,
}: {
  selectedProductId?: string | null;
  onClearSelection?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState<FormData>({
    name: "",
    brand: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedProduct = getProductById(selectedProductId);

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const res = schema.safeParse(form);

    if (!res.success) {
      const flat = res.error.flatten().fieldErrors;
      const err: Record<string, string> = {};
      Object.entries(flat).forEach(([k, v]) => {
        err[k] = v?.[0] || "";
      });
      setErrors(err);
      return false;
    }

    setErrors({});
    return true;
  }

  const canSubmit =
    form.name.trim().length >= 2 &&
    form.brand.trim().length >= 2 &&
    form.phone.trim().length >= 8 &&
    !loading;

  /* ---------------- SUBMIT ---------------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const composedMessage = [
        selectedProduct
          ? `خدمت انتخاب‌شده: ${selectedProduct.title} (${selectedProduct.code})`
          : "خدمت انتخاب‌شده: -",
        `پیج/فروشگاه: ${form.brand}`,
        form.message?.trim() ? `توضیحات: ${form.message.trim()}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || "",
          message: composedMessage,
          productId: selectedProduct?.id ?? null,
          productTitle: selectedProduct?.title ?? null,
          brand: form.brand,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setForm({ name: "", brand: "", phone: "", email: "", message: "" });
        setDone(true);
        onClearSelection?.();
        appEventBus.emit("درخواست شما با موفقیت ارسال شد", "success");
      } else {
        appEventBus.emit("ارسال درخواست با خطا مواجه شد", "error");
      }
    } catch {
      appEventBus.emit("ارتباط با سرور برقرار نشد", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-card text-text rounded-2xl shadow-xl border border-border p-6 sm:p-8">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">تکمیل درخواست</h2>
          <p className="text-sm text-muted mt-1">
            پاسخ سریع در کمتر از ۲۴ ساعت
          </p>
        </div>

        {/* SELECTED PRODUCT SUMMARY */}
        {selectedProduct ? (
          <div className="mb-6 rounded-xl border border-dashed border-border bg-border/5 px-4 py-3 flex items-start justify-between gap-3">
            <div>
              <p className="font-mono-ui text-[11px] text-muted mb-0.5">
                شما انتخاب کرده‌اید
              </p>
              <p className="text-sm font-semibold">
                {selectedProduct.title}
              </p>
              <p className="text-xs text-muted mt-0.5">
                {selectedProduct.startingPrice} · {selectedProduct.deliveryTime}
              </p>
            </div>
            <button
              type="button"
              onClick={onClearSelection}
              className="font-mono-ui text-[11px] text-muted hover:text-error underline shrink-0"
            >
              حذف
            </button>
          </div>
        ) : (
          <div className="mb-6 rounded-xl border border-dashed border-border px-4 py-3 text-xs text-muted text-center">
            هنوز خدمتی انتخاب نکرده‌اید — می‌توانید از بالا انتخاب کنید یا
            توضیح خودتان را در پایین بنویسید.
          </div>
        )}

        {done && (
          <div className="mb-6 rounded-xl bg-success/10 border border-success px-4 py-3 text-sm text-success text-center">
            درخواستت ثبت شد ✓ به‌زودی باهات تماس می‌گیرم.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <div>
            <input
              placeholder="نام و نام خانوادگی *"
              autoComplete="name"
              className="w-full p-3 rounded-xl border border-border bg-white/60 focus:bg-white outline-none transition-colors"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && (
              <p className="text-xs text-error mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* BRAND / SHOP NAME */}
          <div>
            <input
              placeholder="نام پیج یا فروشگاه (اینستاگرام/تلگرام) *"
              className="w-full p-3 rounded-xl border border-border bg-white/60 focus:bg-white outline-none transition-colors"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />
            {errors.brand && (
              <p className="text-xs text-error mt-1">
                {errors.brand}
              </p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <input
              placeholder="شماره تماس *"
              type="tel"
              autoComplete="tel"
              dir="ltr"
              className="w-full p-3 rounded-xl border border-border bg-white/60 focus:bg-white outline-none transition-colors text-right"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            {errors.phone && (
              <p className="text-xs text-error mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* EMAIL (optional) */}
          <div>
            <input
              placeholder="ایمیل (اختیاری)"
              type="email"
              dir="ltr"
              className="w-full p-3 rounded-xl border border-border bg-white/60 focus:bg-white outline-none transition-colors text-right"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && (
              <p className="text-xs text-error mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* MESSAGE (optional) */}
          <textarea
            placeholder="توضیح بیشتر (اختیاری)"
            rows={3}
            className="w-full p-3 rounded-xl border border-border bg-white/60 focus:bg-white outline-none transition-colors resize-none"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full py-3 rounded-xl font-medium transition-colors ${
              canSubmit
                ? "bg-primary text-white hover:bg-(--primary-bright)"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? "در حال ارسال..." : "تکمیل درخواست"}
          </button>
        </form>
      </div>
    </div>
  );
}
