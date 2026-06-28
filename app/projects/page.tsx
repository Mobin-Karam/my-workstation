import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectsClient } from "./ProjectsClient";
import { projects } from "@/features/projects/projects";

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: "پروژه‌ها | مبین کرم",
  description:
    "مشاهده تمام پروژه‌های من. طراحی سایت، اپلیکیشن وب، و حل‌های دیجیتال با Next.js، React، و TypeScript.",
  keywords: [
    "پروژه",
    "Portfolio",
    "Next.js",
    "React",
    "TypeScript",
    "مبین کرم",
  ],
};

// ============================================================================
// Page
// ============================================================================

interface Props {
  searchParams?: {
    search?: string;
    filter?: string;
  };
}

export default function ProjectsPage({ searchParams }: Props) {
  const allStacks = Array.from(new Set(projects.flatMap((p) => p.stack))).sort(
    (a, b) => a.localeCompare(b),
  );

  const initialSearch = searchParams?.search ?? "";
  const initialFilter = searchParams?.filter ?? "all";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "پروژه‌های من",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.slice(0, 10).map((project, index) => ({
        "@type": "CreativeWork",
        position: index + 1,
        name: project.name,
        description: project.description,
        keywords: project.stack.join(", "),
        url: project.link,
      })),
    },
  };

  return (
    <>
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* IMPORTANT: Suspense wrapper fixes build error */}
      <Suspense fallback={null}>
        <ProjectsClient
          projects={projects}
          allStacks={allStacks}
          initialSearch={initialSearch}
          initialFilter={initialFilter}
        />
      </Suspense>
    </>
  );
}
