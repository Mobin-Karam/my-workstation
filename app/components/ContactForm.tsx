"use client";

import { useState } from "react";
import { z } from "zod";
import { appEventBus } from "@/lib/appEventBus";

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

  const canPay = !!sessionId && donation >= 10000 && !payLoading;

  /* ---------------- SUBMIT ---------------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          donation,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSessionId(data.sessionId);

        setForm({
          name: "",
          phone: "",
          email: "",
          message: "",
        });

        appEventBus.emit("پیام با موفقیت ارسال شد", "success");
      }
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- PAYMENT (FIXED) ---------------- */
  async function payDonation() {
    if (!sessionId) {
      appEventBus.emit("ابتدا پیام را ارسال کنید", "info");
      return;
    }

    if (donation < 10000) {
      appEventBus.emit("حداقل مبلغ 10000 است", "error");
      return;
    }

    setPayLoading(true);

    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email || "",
          amount: donation,
          sessionId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        appEventBus.emit("فاکتور پرداخت ساخته شد", "success");
      } else {
        appEventBus.emit("خطا در پرداخت", "error");
      }
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
          {/* NAME */}
          <input
            placeholder="نام *"
            autoComplete="name"
            className="w-full p-3 rounded-xl border border-border"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-xs text-error">{errors.name}</p>}

          {/* MESSAGE */}
          <textarea
            placeholder="پیام *"
            className="w-full p-3 rounded-xl border border-border"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          {errors.message && (
            <p className="text-xs text-error">{errors.message}</p>
          )}

          {/* OPTIONAL */}
          <input
            placeholder="تلفن"
            className="w-full p-3 rounded-xl border border-border"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            placeholder="ایمیل"
            className="w-full p-3 rounded-xl border border-border"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* DONATION */}
          <input
            type="number"
            placeholder="حمایت مالی (حداقل 10000)"
            className="w-full p-3 rounded-xl border border-border"
            value={donation}
            onChange={(e) => setDonation(Number(e.target.value))}
          />

          {/* PAYMENT */}
          <button
            type="button"
            onClick={payDonation}
            disabled={!canPay}
            className={`w-full py-3 rounded-xl font-medium ${
              canPay ? "bg-success text-white" : "bg-gray-300 text-gray-500"
            }`}
          >
            {payLoading ? "در حال پردازش..." : "پرداخت / حمایت مالی"}
          </button>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full py-3 rounded-xl font-medium ${
              canSubmit ? "bg-primary text-white" : "bg-gray-300 text-gray-500"
            }`}
          >
            {loading ? "در حال ارسال..." : "ارسال پیام"}
          </button>
        </form>
      </div>
    </section>
  );
}
