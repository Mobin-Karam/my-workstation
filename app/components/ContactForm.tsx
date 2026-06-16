"use client";

import { appEventBus } from "@/lib/appEventBus";
import { useState } from "react";
import { z } from "zod";

/* ---------------- VALIDATION ---------------- */
const schema = z.object({
  name: z.string().min(2, "نام الزامی است"),
  message: z.string().min(5, "پیام الزامی است"),

  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [donation, setDonation] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    form.name.trim().length >= 2 && form.message.trim().length >= 5 && !loading;

  /* ---------------- SUBMIT ---------------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          donation,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        setSessionId(data.sessionId);
        setForm({ name: "", phone: "", email: "", message: "" });
        setDonation(0);
      }
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- PAYMENT ---------------- */
  async function payDonation() {
    if (!sessionId) {
      appEventBus.emit("اول پیام را ارسال کنید", "info");
      return;
    }

    setPayLoading(true);

    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          amount: donation,
          sessionId,
        }),
      });

      const data = await res.json();
      data.success
        ? appEventBus.emit("پرداخت ایجاد شد", "success")
        : appEventBus.emit("خطا در پرداخت", "error");

    } finally {
      setPayLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-card rounded-2xl shadow-card border border-border p-8">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-text">ارسال پیام</h1>
          <p className="text-sm text-muted mt-1">
            پاسخ سریع در کمتر از ۲۴ ساعت
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME (required) */}
          <input
            placeholder="نام *"
            autoComplete="name"
            className="w-full p-3 rounded-xl border border-border focus:border-primary outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-xs text-error">{errors.name}</p>}

          {/* MESSAGE (required) */}
          <textarea
            placeholder="پیام *"
            autoComplete="off"
            className="w-full p-3 rounded-xl border border-border focus:border-primary outline-none"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          {errors.message && (
            <p className="text-xs text-error">{errors.message}</p>
          )}

          {/* OPTIONAL FIELDS */}
          <input
            placeholder="تلفن (اختیاری)"
            autoComplete="tel"
            className="w-full p-3 rounded-xl border border-border"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            placeholder="ایمیل (اختیاری)"
            autoComplete="email"
            className="w-full p-3 rounded-xl border border-border"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* DONATION */}
          {/* <input
            type="number"
            placeholder="حمایت مالی (اختیاری)"
            className="w-full p-3 rounded-xl border border-border"
            value={donation}
            onChange={(e) => setDonation(Number(e.target.value))}
          /> */}

          {/* PAYMENT BUTTON */}
          {/* <button
            type="button"
            onClick={payDonation}
            disabled={payLoading}
            className="w-full bg-success text-white py-3 rounded-xl font-medium"
          >
            {payLoading ? "در حال پردازش..." : "پرداخت / حمایت مالی"}
          </button> */}

          {/* SUBMIT BUTTON (DISABLED LOGIC FIXED) */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full py-3 rounded-xl font-medium transition ${
              canSubmit
                ? "bg-primary text-white hover:opacity-90"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? "در حال ارسال..." : "ارسال پیام"}
          </button>
        </form>
      </div>
    </section>
  );
}
