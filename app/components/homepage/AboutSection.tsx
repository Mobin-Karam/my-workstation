"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative px-4 sm:px-6 md:px-8 py-24 overflow-hidden"
    >
      {/* 🌈 background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-primary/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-[320px] h-[320px] bg-pink-500/10 blur-3xl rounded-full" />
      </div>

      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* GLASS CARD */}
        <motion.div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
          variants={itemVariants}
        >
          {/* HEADER PROFILE */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8">
            {/* AVATAR */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="https://github.com/Mobin-Karam.png"
                alt="Mobin Karam"
                fill
                className="object-cover"
              />
            </div>

            {/* NAME + ROLE */}
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-right">
                مبین کرم
              </h2>

              <p className="text-muted-foreground mt-1">
                Software Engineer • Next.js • UI/UX • Digital Growth
              </p>
            </div>
          </div>

          {/* LABEL */}
          <motion.p className="text-xs text-muted-foreground tracking-widest mb-3">
            ABOUT ME
          </motion.p>

          {/* TITLE */}
          <motion.h3 className="text-2xl sm:text-4xl font-bold mb-6 leading-tight">
            ترکیب توسعه نرم‌افزار و{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">
              فروش واقعی
            </span>
          </motion.h3>

          {/* BIO */}
          <div className="space-y-5 text-muted-foreground leading-8">
            <motion.p variants={itemVariants}>
              من <span className="text-foreground font-medium">مبین کرم</span>{" "}
              هستم؛ توسعه‌دهنده فرانت‌اند با تمرکز روی Next.js و ساخت محصولات
              واقعی و مقیاس‌پذیر.
            </motion.p>

            <motion.p variants={itemVariants}>
              علاوه بر توسعه، روی طراحی UI/UX، رشد برندهای دیجیتال و افزایش فروش
              آنلاین کار می‌کنم.
            </motion.p>

            <motion.p variants={itemVariants}>
              هدف من این است که تکنولوژی را به{" "}
              <span className="text-foreground font-medium">
                درآمد واقعی و کسب‌وکار قابل رشد
              </span>{" "}
              تبدیل کنم.
            </motion.p>
          </div>

          {/* SOCIAL LINKS */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 mt-8"
          >
            <a
              href="https://github.com/Mobin-Karam"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm"
            >
              <FiGithub className="text-lg" />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/mobin-karam/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm"
            >
              <FiLinkedin className="text-lg" />
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
