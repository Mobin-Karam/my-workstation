"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { FC } from "react";

interface Skill {
  id: string;
  label: string;
}

const SKILLS: Skill[] = [
  { id: "nextjs", label: "Next.js" },
  { id: "react", label: "React" },
  { id: "typescript", label: "TypeScript" },
  { id: "design", label: "UI/UX Design" },
  { id: "instagram", label: "Instagram Growth" },
];

interface HeroSectionProps {
  instagramImageSrc: string;
}

/* ---------------- Variants ---------------- */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const skillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function HeroSection({ instagramImageSrc }: HeroSectionProps) {
  return (
    <section className="relative px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 blur-3xl opacity-10 bg-gradient-to-br from-primary to-accent rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 blur-3xl opacity-10 bg-gradient-to-tr from-pink-500 to-primary rounded-full" />
      </div>

      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-10 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar */}
        <motion.div
          className="w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-2xl bg-center bg-cover shadow-2xl border border-white/10"
          style={{ backgroundImage: `url(${instagramImageSrc})` }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        />

        {/* Content */}
        <div className="text-center sm:text-right">
          <motion.p variants={itemVariants} className="text-muted-foreground">
            Frontend Developer • Digital Brand Builder
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl font-bold mt-4 mb-6"
          >
            تبدیل ایده‌ها به{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">
              محصول واقعی
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground mb-8"
          >
            ساخت برندهای دیجیتال، طراحی UI و رشد کسب‌وکار آنلاین
          </motion.p>

          {/* Skills */}
          <motion.ul
            className="flex flex-wrap gap-2 justify-center sm:justify-start mb-8"
            variants={containerVariants}
          >
            {SKILLS.map((skill) => (
              <motion.li
                key={skill.id}
                className="text-xs px-3 py-1.5 rounded-full border border-border bg-card/50 text-muted-foreground"
                variants={skillVariants}
                whileHover={{ scale: 1.05 }}
              >
                {skill.label}
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA */}
          <motion.div variants={itemVariants} className="flex gap-3">
            <Link
              href="/aboutme"
              className="px-6 py-3 bg-primary text-white rounded-xl"
            >
              درباره من
            </Link>

            <Link href="/products" className="px-6 py-3 border rounded-xl">
              خدمات
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
