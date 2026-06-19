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
          type: type ?? "info", // fallback
        },
      ]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    });
    return unsub;
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center px-4 w-full max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`w-full font-mono-ui text-sm rounded-lg px-4 py-3 shadow-lg border text-center animate-[fadeIn_0.2s_ease-out]
            ${
              t.type === "success"
                ? "bg-success text-white border-transparent"
                : t.type === "error"
                  ? "bg-error text-white border-transparent"
                  : "bg-muted text-primary border-primary"
            }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
