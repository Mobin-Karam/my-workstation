import Link from "next/link";

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "UI/UX Design",
  "Instagram Growth Strategy",
  "Digital Store Setup",
  "Content Strategy",
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative px-5 sm:px-8 pt-20 pb-24 overflow-hidden">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-[auto_1fr] gap-10 sm:gap-14 items-center">

          {/* Avatar */}
          <div className="relative mx-auto sm:mx-0">
            <div
              className="w-44 h-44 sm:w-56 sm:h-56 rounded-2xl flex items-center justify-center text-5xl font-bold text-white shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
              }}
            >
              MK
            </div>

            <p className="text-center mt-3 text-[11px] tracking-[0.3em] text-muted-foreground">
              MOBIN KARAM
            </p>
          </div>

          {/* Content */}
          <div className="text-center sm:text-right">
            <p className="text-xs sm:text-sm text-muted-foreground tracking-wide mb-3">
              Frontend Developer • Digital Brand Builder
            </p>

            <h1 className="text-3xl sm:text-5xl font-bold leading-tight text-foreground mb-6">
              تبدیل ایده‌های دیجیتال به{" "}
              <span className="text-primary">محصول واقعی و فروش‌ساز</span>
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base leading-7 max-w-xl mx-auto sm:mx-0 mb-8">
              من به کسب‌وکارها کمک می‌کنم از یک حضور ساده آنلاین، به یک برند
              حرفه‌ای با استراتژی محتوا، طراحی و ساختار فروش تبدیل شوند.
            </p>

            {/* Skills */}
            <ul className="flex flex-wrap gap-2 justify-center sm:justify-start mb-8">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground transition"
                >
                  {skill}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
              <a
                href="#about"
                className="px-6 py-3 rounded-xl text-sm font-medium text-white bg-primary hover:opacity-90 transition shadow-md"
              >
                درباره من ↓
              </a>

              <Link
                href="/products"
                className="px-6 py-3 rounded-xl text-sm font-medium border border-border bg-card hover:bg-muted transition"
              >
                مشاهده خدمات
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="px-5 sm:px-8 py-24 border-t border-border bg-muted/40"
      >
        <div className="max-w-3xl mx-auto">

          <p className="text-xs text-muted-foreground mb-3 tracking-widest">
            درباره من
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 leading-snug">
            ترکیب توسعه نرم‌افزار و درک واقعی از فروش و برندینگ
          </h2>

          <div className="space-y-5 text-muted-foreground text-sm sm:text-base leading-8">
            <p>
              من <span className="text-foreground font-medium">مبین کرم</span> هستم؛
              توسعه‌دهنده فرانت‌اند با تمرکز روی Next.js و ساخت تجربه‌های وب
              سریع، تمیز و قابل توسعه.
            </p>

            <p>
              در کنار برنامه‌نویسی، روی طراحی حضور دیجیتال و رشد پیج‌های
              اینستاگرامی و فروشگاه‌های آنلاین کار می‌کنم؛ یعنی فقط سایت
              نمی‌سازم، بلکه کمک می‌کنم دیده بشی و بفروشی.
            </p>

            <p>
              هدف من اینه که بین “تکنولوژی” و “فروش واقعی” پل بزنم؛ چیزی که
              خیلی از پروژه‌ها ازش کم دارن.
            </p>
          </div>

          {/* Social */}
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="https://github.com/Mobin-Karam"
              target="_blank"
              className="text-xs px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted transition text-muted-foreground hover:text-foreground"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/mobin-karam/"
              target="_blank"
              className="text-xs px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted transition text-muted-foreground hover:text-foreground"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}