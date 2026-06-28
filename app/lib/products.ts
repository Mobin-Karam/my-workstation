export type Product = {
  slug: string;
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
    slug: "مشاوره-شروع-فروش-آنلاین",

    code: "00-FC",
    title: "مشاوره شروع فروش آنلاین",
    tagline: "مسیر درست برای شروع فروش بدون سردرگمی",
    description:
      "در این جلسه بررسی می‌کنیم چطور می‌تونی از پیج اینستاگرام یا کسب‌وکارت یک فروشگاه آنلاین ساده بسازی.",

    features: [
      "بررسی وضعیت فعلی",
      "انتخاب مسیر فروش",
      "پیشنهاد ابزار مناسب",
      "پاسخ به سوالات",
    ],

    deliveryTime: "۳۰ دقیقه آنلاین",
    startingPrice: "رایگان",
    badge: "شروع سریع",
  },

  {
    id: "simple-shopify-store",
    slug: "فروشگاه-ساده-اینستاگرامی",

    code: "01-SS",
    title: "فروشگاه ساده اینستاگرامی",
    tagline: "فروش سریع بدون پیچیدگی",
    description: "ساخت فروشگاه آماده برای شروع سریع فروش.",

    features: [
      "راه‌اندازی فروشگاه",
      "قالب آماده",
      "افزودن محصولات",
      "اتصال اینستاگرام",
    ],

    deliveryTime: "۳ تا ۵ روز",
    startingPrice: "از ۳٬۰۰۰٬۰۰۰ تومان",
    badge: "پرفروش",
  },

  {
    id: "instagram-setup",
    slug: "آماده-سازی-پیج-فروشگاهی",

    code: "02-IG",
    title: "آماده‌سازی پیج فروشگاهی",
    tagline: "تبدیل فالوور به مشتری",
    description: "بهینه‌سازی کامل پیج برای فروش بیشتر.",

    features: ["بایو حرفه‌ای", "هایلایت", "استایل پست", "کپشن فروش"],

    deliveryTime: "۲ تا ۴ روز",
    startingPrice: "از ۱٬۵۰۰٬۰۰۰ تومان",
  },

  {
    id: "product-content-pack",
    slug: "پکیج-محتوای-فروش",

    code: "03-PC",
    title: "پکیج محتوای فروش",
    tagline: "متن‌هایی که می‌فروشن",
    description: "ساخت محتوای حرفه‌ای برای فروش بهتر.",

    features: ["توضیحات محصول", "کپشن", "سناریو استوری", "ایده تبلیغ"],

    deliveryTime: "۲ تا ۳ روز",
    startingPrice: "از ۱٬۰۰۰٬۰۰۰ تومان",
  },

  {
    id: "monthly-support",
    slug: "پشتیبانی-ماهانه",

    code: "04-MS",
    title: "پشتیبانی ماهانه",
    tagline: "بدون درگیری مدیریت کن",
    description: "مدیریت سبک فروشگاه به‌صورت ماهانه.",

    features: ["آپدیت محصولات", "تغییر قیمت", "پشتیبانی", "بررسی عملکرد"],

    deliveryTime: "ماهانه",
    startingPrice: "از ۱٬۵۰۰٬۰۰۰ تومان / ماه",
  },

  {
    id: "full-launch-light",
    slug: "راه‌اندازی-کامل-فروش-آنلاین",

    code: "05-FL",
    title: "راه‌اندازی کامل فروش آنلاین",
    tagline: "از صفر تا فروش واقعی",
    description: "پکیج کامل برای شروع حرفه‌ای فروش آنلاین.",

    features: [
      "راه‌اندازی فروشگاه",
      "ساخت پیج",
      "ساخت ساختار فروش",
      "اتصال کامل",
    ],

    deliveryTime: "۷ تا ۱۰ روز",
    startingPrice: "از ۵٬۵۰۰٬۰۰۰ تومان",
    badge: "پکیج کامل",
  },
];

export function getProductById(id: string | null | undefined) {
  return products.find((p) => p.id === id) ?? null;
}
