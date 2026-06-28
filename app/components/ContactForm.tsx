"use client";

import { useState } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
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
  const [shake, setShake] = useState(false);

  const [form, setForm] = useState<FormData>({
    name: "",
    brand: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedProduct = getProductById(selectedProductId);

  const progress =
    (Object.values(form).filter((v) => v?.toString().trim().length > 0).length /
      4) *
    100;

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const res = schema.safeParse(form);

    if (!res.success) {
      const flat = res.error.flatten().fieldErrors;
      const err: Record<string, string> = {};
      Object.entries(flat).forEach(([k, v]) => (err[k] = v?.[0] || ""));
      setErrors(err);

      setShake(true);
      setTimeout(() => setShake(false), 400);

      return false;
    }

    setErrors({});
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const composedMessage = [
        selectedProduct ? `🎯 خدمت: ${selectedProduct.title}` : "🎯 خدمت: -",
        `🏪 برند: ${form.brand}`,
        form.message?.trim(),
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          message: composedMessage,
          productId: selectedProduct?.id ?? null,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setDone(true);
        setForm({ name: "", brand: "", phone: "", email: "", message: "" });
        onClearSelection?.();

        appEventBus.emit("ارسال موفق ✨", "success");
      } else {
        appEventBus.emit("خطا در ارسال", "error");
      }
    } catch {
      appEventBus.emit("خطا در ارتباط", "error");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- INPUT ---------------- */
  const Input = ({
    name,
    placeholder,
    type = "text",
  }: {
    name: keyof FormData;
    placeholder: string;
    type?: string;
  }) => (
    <div className="relative group">
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className={`
          w-full p-3 rounded-xl border bg-background
          transition-all duration-200
          focus:border-primary focus:shadow-[0_0_0_4px_rgba(120,75,160,0.15)]
          hover:border-primary/60
        `}
      />

      <label
        className={`
          absolute right-3 top-3 text-xs transition-all pointer-events-none
          ${
            form[name]
              ? "-translate-y-5 scale-90 text-primary"
              : "text-muted-foreground"
          }
        `}
      >
        {placeholder}
      </label>

      {errors[name] && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-destructive mt-1"
        >
          {errors[name]}
        </motion.p>
      )}
    </div>
  );

  return (
    <div className="max-w-xl mx-auto relative">
      {/* 🌈 BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-40 bg-[radial-gradient(circle_at_top,rgba(120,75,160,0.25),transparent_60%)]" />

      <motion.div
        animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.3 }}
        className="bg-card rounded-2xl border p-6 sm:p-8 shadow-xl relative overflow-hidden"
      >
        {/* HEADER */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold">تکمیل درخواست</h2>
          <p className="text-xs text-muted-foreground mt-1">
            پاسخ سریع‌تر از ۲۴ ساعت
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div className="h-1 w-full bg-muted rounded-full mb-5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-purple-500 to-accent"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* SELECTED PRODUCT */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-5 p-3 rounded-xl border border-dashed bg-accent/10 flex justify-between items-center"
            >
              <div>
                <div className="text-xs text-muted-foreground">انتخاب شده</div>
                <div className="font-semibold text-sm">
                  {selectedProduct.title}
                </div>
              </div>

              <button
                onClick={onClearSelection}
                className="text-xs text-destructive hover:underline"
              >
                حذف
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SUCCESS */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-green-500/10 text-green-600 text-center"
            >
              درخواست ثبت شد ✓ به‌زودی تماس می‌گیرم
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" placeholder="نام و نام خانوادگی *" />
          <Input name="brand" placeholder="نام پیج *" />
          <Input name="phone" placeholder="شماره تماس *" type="tel" />
          <Input name="email" placeholder="ایمیل (اختیاری)" type="email" />

          <textarea
            placeholder="توضیحات بیشتر"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="
              w-full p-3 rounded-xl border border-border
              bg-background resize-none outline-none
              focus:border-primary transition
              hover:border-primary/60
            "
            rows={3}
          />

          {/* BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(120,75,160,0.25)",
            }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="
              w-full py-3 rounded-xl font-medium
              bg-gradient-to-r from-primary via-purple-500 to-accent
              text-white relative overflow-hidden
            "
          >
            {loading ? "در حال ارسال..." : "ارسال درخواست ✨"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
