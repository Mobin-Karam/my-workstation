import type { Metadata } from "next";
import "./globals.css";
import AnimatedBorder from "./components/animation-border";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://mobinkaram.ir"),
  title: "مبین کرم | Frontend Developer & Digital Brand Builder",
  description:
    "توسعه‌دهنده فرانت‌اند متخصص در Next.js و ساخت برند‌های دیجیتال حرفه‌ای. طراحی سایت، استراتژی کنتنت و رشد اینستاگرام.",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Frontend Developer",
    "Digital Marketing",
    "استراتژی دیجیتال",
    "طراح وب",
    "برندینگ دیجیتال",
    "مبین کرم",
  ],
  authors: [{ name: "Mobin Karam", url: "https://mobinkaram.ir" }],
  creator: "Mobin Karam",
  publisher: "Mobin Karam",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://mobinkaram.ir",
    siteName: "مبین کرم",
    title: "مبین کرم | Frontend Developer",
    description: "تبدیل ایده‌های دیجیتال به محصول واقعی و فروش‌ساز",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        {/* 🌈 Animated background frame */}
        <AnimatedBorder />

        {/* 📦 APP FRAME (THIS CREATES SPACE AROUND EVERYTHING) */}
        <div className="relative z-10 min-h-screen p-4 sm:p-6 lg:p-8">
          
          {/* INNER SHELL */}
          <div className="min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)] rounded-2xl border border-border bg-background shadow-2xl overflow-hidden flex flex-col">
            
            {/* Header */}
            <SiteHeader />

            {/* Page Content */}
            <main id="main-content" className="flex-1">
              {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-border bg-muted/30 py-8 text-center text-sm text-muted-foreground">
              © 2024 مبین کرم — Next.js Portfolio
            </footer>

          </div>
        </div>
      </body>
    </html>
  );
}