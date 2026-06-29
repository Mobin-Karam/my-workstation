"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FiHome, FiBox, FiFolder, FiUser } from "react-icons/fi";

const navItems = [
  { href: "/", icon: FiHome, label: "خانه" },
  { href: "/aboutme", icon: FiUser, label: "درباره من" },
  { href: "/products", icon: FiBox, label: "خدمات" },
  { href: "/projects", icon: FiFolder, label: "پروژه‌ها" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-3">
      <div
        className="
          relative flex items-center gap-1
          rounded-2xl
          bg-black/30 backdrop-blur-xl
          border border-white/10
          shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          px-2 py-2
        "
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="
                relative flex flex-col items-center justify-center
                px-3 py-2 rounded-xl
                text-white/70 hover:text-white
                transition
                min-w-[64px] sm:min-w-[80px]
              "
            >
              {/* ACTIVE BACKGROUND (MOVING PILL) */}
              {active && (
                <motion.div
                  layoutId="active-pill"
                  className="
                    absolute inset-0
                    rounded-xl
                    bg-white/10
                    border border-white/10
                  "
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}

              {/* ICON */}
              <div className="relative text-xl sm:text-2xl">
                <Icon />
              </div>

              {/* LABEL */}
              <span className="relative text-[10px] sm:text-xs mt-1">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}