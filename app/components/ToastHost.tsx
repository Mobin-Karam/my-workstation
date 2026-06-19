"use client";

import { useEffect, useState } from "react";
import { appEventBus } from "@/lib/appEventBus";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
};

export default function ToastHost() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsub = appEventBus.subscribe((message, type) => {
      const id = Date.now() + Math.random();

      setToasts((prev) => [
        ...prev,
        {
          id,
          message,
          type: type ?? "info",
        },
      ]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    });

    return unsub;
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm shadow-md border backdrop-blur-md transition-all animate-[fadeIn_0.2s_ease-out]
            ${
              t.type === "success"
                ? "bg-success/10 text-text border-success/20"
                : t.type === "error"
                  ? "bg-error/10 text-text border-error/20"
                  : "bg-surface text-text border-border"
            }`}
        >
          {/* ICON */}
          <div className="mt-0.5">
            {t.type === "success" && <span className="text-success">✓</span>}
            {t.type === "error" && <span className="text-error">!</span>}
            {t.type === "info" && <span className="text-muted">•</span>}
          </div>

          {/* MESSAGE */}
          <p className="leading-6">{t.message}</p>
        </div>
      ))}
    </div>
  );
}
