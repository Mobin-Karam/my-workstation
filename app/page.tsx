import Link from "next/link";
import SiteHeader from "./components/SiteHeader";

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "طراحی پیج اینستاگرام",
  "راه‌اندازی فروشگاه دیجیتال",
  "استراتژی محتوا",
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/* ---------------- HERO ---------------- */}
      <section className="relative px-5 sm:px-8 pt-16 sm:pt-24 pb-20 overflow-hidden">
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-10"
          style={{
            background: "var(--gradient-primary)",
          }}
        />

        <div className="max-w-5xl mx-auto grid sm:grid-cols-[auto_1fr] gap-10 sm:gap-14 items-center">
          {/* Avatar */}
          <div className="relative mx-auto sm:mx-0 shrink-0">
            <div
              className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-2xl flex items-center justify-center text-5xl font-bold shadow-md"
              style={{
                background: "var(--gradient-primary)",
                color: "white",
              }}
            >
              MK
              {/* corner accents */}
              <span className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-border rounded-tr-md" />
              <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-border rounded-bl-md" />
            </div>

            <span className="block text-center mt-3 text-[11px] tracking-widest text-muted">
              MOBIN.KARAM
            </span>
          </div>

          {/* Content */}
          <div className="text-center sm:text-right">
            <p className="text-xs sm:text-sm text-muted mb-3 tracking-wide">
              توسعه‌دهنده و طراح حضور دیجیتال
            </p>

            <h1 className="text-3xl sm:text-5xl font-bold leading-[1.3] text-text mb-5">
              کسب‌وکارت رو از یه پیج ساده،
              <br />
              به یه برند دیجیتال جدی تبدیل می‌کنم
            </h1>

            <p className="text-muted text-sm sm:text-base leading-7 max-w-xl mx-auto sm:mx-0 mb-7">
              برای فروشگاه‌ها و برندهایی که توی اینستاگرام و تلگرام و بله و گوگل
              مپ فعالن، ولی هنوز مسیر فروش حرفه‌ای ندارن. از طراحی تا
              راه‌اندازی، قدم‌به‌قدم کنارتم.
            </p>

            {/* Skills */}
            <ul className="flex flex-wrap gap-2 justify-center sm:justify-start mb-9">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-full border border-border text-muted bg-surface"
                >
                  {skill}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
              <a
                href="#about"
                className="px-6 py-3 rounded-xl text-sm font-medium text-white shadow-md transition hover:opacity-90"
                style={{
                  background: "var(--gradient-primary)",
                }}
              >
                درباره من ↓
              </a>

              <Link
                href="/products"
                className="px-6 py-3 rounded-xl text-sm font-medium border border-border text-text bg-surface hover:bg-accent-soft transition"
              >
                خدمات و محصولات ←
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT ---------------- */}
      <section
        id="about"
        className="px-5 sm:px-8 py-20 border-t border-border bg-surface"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-muted mb-3 tracking-wide">درباره من</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-6">
            یه برنامه‌نویس که زبان فروشگاه‌داری رو هم بلده
          </h2>

          <div className="space-y-4 text-muted text-sm sm:text-base leading-8">
            <p>
              اسمم مبین هست. کارم ساختن محصولات پایداره، ولی چیزی که بیشتر بهش
              علاقه دارم اینه که این مهارت رو بذارم پای کسب‌وکارهای کوچیک و
              برندهایی که فقط توی اینستاگرام یا تلگرام دیده می‌شن.
            </p>

            <p>
              برای همین یه مسیر ساده طراحی کردم: از طراحی پیج و کانال گرفته تا
              راه‌اندازی کامل کسب‌وکار دیجیتالی، همه‌چیز رو خودم پیگیری می‌کنم
              تا تو فقط روی فروش تمرکز کنی.
            </p>
          </div>

          {/* links */}
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="https://github.com/Mobin-Karam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-4 py-2 rounded-lg border border-border text-muted hover:text-text hover:bg-accent-soft transition"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/mobin-karam/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-4 py-2 rounded-lg border border-border text-muted hover:text-text hover:bg-accent-soft transition"
            >
              LinkedIn
            </a>
          </div>

          <div className="mt-10">
            <Link
              href="/products"
              className="inline-block px-6 py-3 rounded-xl text-sm font-medium text-white shadow-md hover:opacity-90 transition"
              style={{
                background: "var(--gradient-primary)",
              }}
            >
              مشاهده خدمات و محصولات ←
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
