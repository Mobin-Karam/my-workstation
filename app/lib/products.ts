export type Product = {
  id: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  deliveryTime: string;
  startingPrice: string;

  // optional UI helpers
  badge?: string;
};

export const products: Product[] = [
  {
    id: "free-consultation",
    code: "00-FC",
    title: "مشاوره شروع فروش آنلاین",
    tagline: "مسیر درست برای شروع فروش بدون سردرگمی",
    description:
      "در این جلسه بررسی می‌کنیم چطور می‌تونی از پیج اینستاگرام یا کسب‌وکارت یک فروشگاه آنلاین ساده بسازی. هدف این جلسه اینه که بدونی دقیقاً باید از کجا شروع کنی و چه پکیجی برای تو مناسب‌تره.",
    features: [
      "بررسی وضعیت فعلی پیج یا کسب‌وکار",
      "انتخاب بهترین مسیر فروش (اینستاگرام + سایت)",
      "پیشنهاد ابزار مناسب (مثل Shopify)",
      "پاسخ به سوالات شروع کار",
    ],
    deliveryTime: "۳۰ دقیقه آنلاین",
    startingPrice: "رایگان",
    badge: "شروع سریع",
  },

  {
    id: "simple-shopify-store",
    code: "01-SS",
    title: "راه‌اندازی فروشگاه ساده اینستاگرامی",
    tagline: "فروشگاه آماده فروش برای شروع سریع",
    description:
      "ساخت یک فروشگاه اینترنتی ساده و سریع برای پیج‌های اینستاگرامی. بدون طراحی پیچیده، فقط تمرکز روی فروش.",
    features: [
      "راه‌اندازی فروشگاه روی Shopify یا مشابه",
      "انتخاب قالب ساده و آماده",
      "افزودن محصولات (تا 15 محصول اولیه)",
      "دسته‌بندی محصولات",
      "اتصال اینستاگرام",
      "تنظیم پرداخت و ارسال",
      "تست خرید",
    ],
    deliveryTime: "۳ تا ۵ روز کاری",
    startingPrice: "از ۳٬۰۰۰٬۰۰۰ تومان",
    badge: "پرفروش",
  },

  {
    id: "instagram-setup",
    code: "02-IG",
    title: "آماده‌سازی پیج اینستاگرام فروشگاهی",
    tagline: "پیج حرفه‌ای برای تبدیل فالوور به مشتری",
    description: "بهینه‌سازی کامل پیج برای فروش: اعتمادسازی + افزایش تبدیل.",
    features: [
      "بهینه‌سازی بایو",
      "چیدمان هایلایت",
      "استایل پست‌ها",
      "راهنمای کپشن فروش",
    ],
    deliveryTime: "۲ تا ۴ روز کاری",
    startingPrice: "از ۱٬۵۰۰٬۰۰۰ تومان",
  },

  {
    id: "product-content-pack",
    code: "03-PC",
    title: "پکیج محتوای فروش محصول",
    tagline: "متن و ساختار فروش حرفه‌ای",
    description:
      "کمک به فروش بیشتر با متن‌های حرفه‌ای و ساختار درست معرفی محصول.",
    features: [
      "توضیحات محصول",
      "قالب معرفی محصول",
      "سناریوی استوری",
      "ایده کپشن تبلیغاتی",
    ],
    deliveryTime: "۲ تا ۳ روز کاری",
    startingPrice: "از ۱٬۰۰۰٬۰۰۰ تومان",
  },

  {
    id: "monthly-support",
    code: "04-MS",
    title: "پشتیبانی و مدیریت ماهانه",
    tagline: "مدیریت بدون درگیری",
    description: "مدیریت سبک فروشگاه برای کسانی که نمی‌خوان درگیر روزمره بشن.",
    features: [
      "افزودن محصولات",
      "تغییر قیمت",
      "پشتیبانی فروشگاه",
      "بررسی عملکرد",
    ],
    deliveryTime: "ماهانه",
    startingPrice: "از ۱٬۵۰۰٬۰۰۰ تومان / ماه",
  },

  {
    id: "full-launch-light",
    code: "05-FL",
    title: "راه‌اندازی کامل فروش آنلاین (سبک)",
    tagline: "از صفر تا فروش واقعی",
    description: "پکیج کامل: پیج + فروشگاه + مسیر فروش ساده بدون پیچیدگی.",
    features: [
      "راه‌اندازی فروشگاه",
      "آماده‌سازی پیج",
      "ساخت ساختار فروش",
      "اتصال پیج و سایت",
      "راهنمای شروع",
    ],
    deliveryTime: "۷ تا ۱۰ روز کاری",
    startingPrice: "از ۵٬۵۰۰٬۰۰۰ تومان",
    badge: "پکیج کامل",
  },
];

export function getProductById(id: string | null | undefined) {
  return products.find((p) => p.id === id) ?? null;
}
