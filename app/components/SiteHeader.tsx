import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-surface/80 border-b border-border">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

        {/* Brand */}
        <Link
          href="/"
          className="font-bold text-lg tracking-tight text-text hover:text-accent transition-colors"
        >
          مبین کرم
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1 sm:gap-2">

          <Link
            href="/"
            className="px-3 py-2 text-sm text-muted hover:text-text transition-colors"
          >
            خانه
          </Link>

          <Link
            href="/products"
            className="px-3 py-2 text-sm text-muted hover:text-text transition-colors"
          >
            خدمات
          </Link>

          <span className="w-px h-5 bg-border mx-1 sm:mx-2" />

          {/* GitHub */}
          <a
            href="https://github.com/Mobin-Karam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="گیت‌هاب"
            className="p-2 text-muted hover:text-accent transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.82 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.42.36.78 1.07.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.21.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/mobin-karam/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="لینکدین"
            className="p-2 text-muted hover:text-accent transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
            </svg>
          </a>

        </nav>
      </div>
    </header>
  );
}