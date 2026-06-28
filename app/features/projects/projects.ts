export type Project = {
  id: string;
  name: string;
  description: string;
  stack: string[];
  image: string;        // main thumbnail
  images?: string[];    // 🆕 gallery
  github: string;
  demo?: string;
  link: string;
  author?: string;
};
export const projects: Project[] = [
  {
    id: "1",
    name: "Gulify",
    description: "فروشگاه گلیفای ارتباط از طریق ارسال پیام در بله.",
    stack: ["Next.js", "Tailwind", "Server Action", "Shadcn", "Framer Motion"],
    author: "Mobin Karam",
    image: "/projects/p1.png",
    images: [
      "/projects/p1.png",
      "/projects/p2.png",
      "/projects/p3.png",
      "/projects/p4.png",
      "/projects/p5.png",
    ],
    github: "https://github.com/Mobin-Karam/flower-shop",
    demo: "https://gulify.ir",
    link: "https://gulify.ir/projects",
  },
];
