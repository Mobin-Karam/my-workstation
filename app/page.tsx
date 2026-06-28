import type { Metadata } from "next";
import HomeClient from "./components/homepage/HomeClient";

export const metadata: Metadata = {
  title: "مبین کرم | Frontend Developer & Digital Brand Builder",
  description:
    "توسعه‌دهنده فرانت‌اند متخصص در Next.js و ساخت برند‌های دیجیتال حرفه‌ای. طراحی سایت، استراتژی کنتنت و رشد اینستاگرام.",
  keywords: [
    "Frontend Developer",
    "Next.js",
    "React",
    "UI/UX",
    "Digital Branding",
    "Instagram Growth",
  ],
  authors: [{ name: "Mobin Karam" }],
  creator: "Mobin Karam",
  openGraph: {
    title: "مبین کرم | Frontend Developer",
    description: "تبدیل ایده‌های دیجیتال به محصول واقعی و فروش‌ساز",
    type: "website",
    url: "https://mobinkaram.ir",
    siteName: "Mobin Karam Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mobin Karam Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "مبین کرم | Frontend Developer",
    description: "تبدیل ایده‌های دیجیتال به محصول واقعی و فروش‌ساز",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://mobinkaram.ir"),
};

export default function Page() {
  return <HomeClient />;
}
