"use client";

import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";



export default function HomeClient() {
  const instagramImagePath = "/instagram-logo.avif";

  return (
    <main className="bg-background text-foreground">
      <HeroSection instagramImageSrc={instagramImagePath} />
    </main>
  );
}