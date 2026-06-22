import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mobinkaram.ir"),

  title: {
    default:
      "مبین کرم | توسعه‌دهنده وب، طراح محصول دیجیتال و UX/UI Designer در ایران",
    template: "%s | مبین کرم",
  },

  description:
    "مبین کرم، توسعه‌دهنده وب و وب‌اپلیکیشن (Web App)، متخصص PWA و طراح محصول دیجیتال. فریلنسر فعال در ایران و پروژه‌های ریموت. تجربه در طراحی UX/UI، توسعه فرانت‌اند و ساخت محصولات دیجیتال مدرن.",

  keywords: [
    "مبین کرم",
    "Mobin Karam",
    "توسعه دهنده وب",
    "Web Developer Iran",
    "فریلنسر برنامه نویس ایران",
    "Freelance Developer Iran",
    "UX Designer",
    "UI Designer",
    "Product Designer",
    "Web App Developer",
    "ساخت وب اپلیکیشن",
    "PWA Developer",
    "Progressive Web App",
    "طراحی تجربه کاربری",
    "طراحی رابط کاربری",
    "Front-end Developer",
    "Next.js Developer",
    "React Developer",
    "Figma Designer",
    "Quera",
    "quera programmer",
    "برنامه نویس ریموت",
    "remote developer",
    "freelancer remote work",
  ],

  authors: [{ name: "Mobin Karam", url: "https://mobinkaram.ir" }],
  creator: "Mobin Karam",
  publisher: "Mobin Karam",

  alternates: {
    canonical: "https://mobinkaram.ir",
    languages: {
      "fa-IR": "https://mobinkaram.ir/fa",
      "en-US": "https://mobinkaram.ir/en",
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://mobinkaram.ir",
    title:
      "مبین کرم | توسعه‌دهنده وب و طراح محصول دیجیتال (Iran Freelancer)",
    description:
      "توسعه‌دهنده وب، متخصص Web App و PWA و طراح UX/UI. فریلنسر فعال در ایران و پروژه‌های ریموت.",
    siteName: "Mobin Karam Portfolio",
    locale: "fa_IR",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mobin Karam - Web Developer & Product Designer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "مبین کرم | Web Developer & UX/UI Designer",
    description:
      "Web Developer, PWA Builder, UX/UI & Product Designer - Iran Freelancer",
    images: ["/og-image.jpg"],
    creator: "@yourhandle",
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  manifest: "/site.webmanifest",

  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],

  appleWebApp: {
    capable: true,
    title: "Mobin Karam",
    statusBarStyle: "default",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CMRQ9HLNH8"
          strategy="afterInteractive"
        />

        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-CMRQ9HLNH8', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
