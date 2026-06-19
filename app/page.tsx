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
        {/* ambient backdrop marks — quiet, not decorative noise */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-[0.07]"
          style={{ background: "var(--brass)" }}
        />

        <div className="max-w-5xl mx-auto grid sm:grid-cols-[auto_1fr] gap-10 sm:gap-14 items-center">
          {/* Photo — bracketed "order ticket" frame, not a plain circle */}
          <div className="relative mx-auto sm:mx-0 shrink-0">
            <div
              className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-2xl flex items-center justify-center text-6xl font-bold"
              style={{
                background:
                  "linear-gradient(160deg, var(--brass) 0%, var(--brass-bright) 100%)",
                color: "var(--ink)",
              }}
            >
              MK
              {/* corner brackets — signature device echoed on product cards */}
              <span className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-md" />
              <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-md" />
            </div>
            <span className="font-mono-ui text-[11px] text-muted block text-center mt-3 tracking-widest">
              MOBIN.KARAM
            </span>
          </div>

          {/* Headline + skills + CTAs */}
          <div className="text-center sm:text-right">
            <p className="font-mono-ui text-xs sm:text-sm text-primary mb-3 tracking-wide">
              توسعه‌دهنده و طراح حضور دیجیتال
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold leading-[1.3] text-primary mb-5">
              کسب‌وکارت رو از یه پیج ساده،
              <br />
              به یه برند دیجیتال جدی تبدیل می‌کنم
            </h1>
            <p className="text-muted text-sm sm:text-base leading-7 max-w-xl mx-auto sm:mx-0 mb-7">
              برای فروشگاه‌ها و برندهایی که توی اینستاگرام و تلگرام و بله و گوگل مپ فعالن، ولی
              هنوز شکل و مسیر فروش حرفه‌ای ندارن. از طراحی تا راه‌اندازی،
              قدم‌به‌قدم کنارتم.
            </p>

            {/* Skills row */}
            <ul className="flex flex-wrap gap-2 justify-center sm:justify-start mb-9">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="font-mono-ui text-xs px-3 py-1.5 rounded-full border border-primary text-muted"
                >
                  {skill}
                </li>
              ))}
            </ul>

            {/* Two CTA buttons — anchor rail */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
              <a
                href="#about"
                className="px-6 py-3 rounded-xl font-medium text-sm bg-bg text-text hover:bg-primary transition-colors text-center"
              >
                درباره من ↓
              </a>
              <Link
                href="/products"
                className="px-6 py-3 rounded-xl font-medium text-sm border border-border text-primary hover:bg-border hover:text-text transition-colors text-center"
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
        className="px-5 sm:px-8 py-20 border-t border-primary bg-bg"
      >
        <div className="max-w-3xl mx-auto">
          <p className="font-mono-ui text-xs text-primary mb-3 tracking-wide">
            درباره من
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
            یه برنامه‌نویس که زبان فروشگاه‌داری رو هم بلده
          </h2>
          <div className="space-y-4 text-muted text-sm sm:text-base leading-8">
            <p>
              اسمم مبین هست. کارم ساختن محصولات پایداره، ولی چیزی که بیشتر بهش
              علاقه دارم اینه که این مهارت رو بذارم پای کسب‌وکارهای کوچیک و
              برندهایی که فقط توی اینستاگرام یا تلگرام ویا جاهای دیگه دیده می‌شن.
            </p>
            <p>
              می‌دونم خیلی از فروشگاه‌ها زمان یا تیم فنی ندارن تا حضور
              دیجیتالشون رو حرفه‌ای کنن. برای همین یه مسیر ساده طراحی کردم: از
              طراحی پیج و کانال گرفته تا راه‌اندازی کامل کسب‌وکار دیجیتالی،
              همه‌چیز رو خودم پیگیری می‌کنم تا تو فقط روی فروش تمرکز کنی.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="https://github.com/Mobin-Karam"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-ui text-xs px-4 py-2 rounded-lg border border-primary text-muted hover:text-primary hover:border-border transition-colors"
            >
              github.com/Mobin-Karam
            </a>
            <a
              href="https://www.linkedin.com/in/mobin-karam/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-ui text-xs px-4 py-2 rounded-lg border border-primary text-muted hover:text-primary hover:border-border transition-colors"
            >
              linkedin.com/in/mobin-karam
            </a>
          </div>

          <div className="mt-10">
            <Link
              href="/products"
              className="inline-block px-6 py-3 rounded-xl font-medium text-sm bg-border text-text hover:bg-primary transition-colors"
            >
              مشاهده خدمات و محصولات ←
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
