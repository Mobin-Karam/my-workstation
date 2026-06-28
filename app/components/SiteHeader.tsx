"use client";

import Link from "next/link";
import {
  FiHome,
  FiBox,
  FiFolder,
  FiUser,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";

export default function SiteHeader() {
  return (
    <>
      {/* 🍎 APPLE GLASS BOTTOM NAV */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div
          className="flex items-center gap-5 px-6 py-3 rounded-2xl
                     bg-white/10 backdrop-blur-xl
                     border border-white/20
                     shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
        >
          <MobileIcon href="/" icon={<FiHome />} label="خانه" />
          <MobileIcon href="/aboutme" icon={<FiUser />} label="درباره من" />
          <MobileIcon href="/products" icon={<FiBox />} label="خدمات" />
          <MobileIcon href="/projects" icon={<FiFolder />} label="پروژه" />

          {/* divider */}
          <span className="w-px h-6 bg-white/20" />

          {/* social */}
          <a
            href="https://github.com/Mobin-Karam"
            target="_blank"
            className="flex flex-col items-center text-white/80 hover:text-white transition"
          >
            <FiGithub className="text-xl" />
            <span className="text-[10px] mt-1">GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/mobin-karam/"
            target="_blank"
            className="flex flex-col items-center text-white/80 hover:text-white transition"
          >
            <FiLinkedin className="text-xl" />
            <span className="text-[10px] mt-1">LinkedIn</span>
          </a>
        </div>
      </div>
    </>
  );
}

/* 📱 Mobile Icon */
function MobileIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center text-white/80 hover:text-white transition"
    >
      <div className="text-xl">{icon}</div>
      <span className="text-[10px] mt-1">{label}</span>
    </Link>
  );
}
