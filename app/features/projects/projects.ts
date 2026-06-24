export type Project = {
  name: string
  stack: string[]
  author: string
  image: string
  github: string
  demo?: string
  description: string
}

export const projects: Project[] = [
  {
    name: "Tea Flower Shop",
    description: "فروشگاه گل محمدی ارتباط از طریق ارسال پیام در بله.",
    stack: ["Next.js", "Tailwind", "Server Action", "Shadcn", "FramerMotion"],
    author: "Mobin Karam",
    image: "/projects/p1.png",
    github: "https://github.com/Mobin-Karam/flower-shop",
    demo: "https://gulify.ir",
  },
]