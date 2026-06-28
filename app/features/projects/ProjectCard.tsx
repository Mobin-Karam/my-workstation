"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

import { Project } from "./projects";
import { ImageLightbox } from "./ImageLightBox";

export function ProjectCard({ project }: { project: Project }) {
  const images = project.images?.length ? project.images : [project.image];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border border-border/60 bg-card/70 backdrop-blur-md hover:border-primary/30 transition-all duration-300">

        {/* 🖼 IMAGE + LIGHTBOX */}
        <ImageLightbox images={images} alt={project.name}>
          <div className="relative h-52 w-full cursor-pointer group">

            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />

            {/* hint */}
            <div className="absolute bottom-2 right-2 text-[10px] text-white/80 bg-black/40 px-2 py-1 rounded-md backdrop-blur">
              View gallery
            </div>
          </div>
        </ImageLightbox>

        {/* HEADER */}
        <CardHeader className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground line-clamp-1">
            {project.name}
          </h2>

          {project.author && (
            <p className="text-xs text-muted-foreground">
              by {project.author}
            </p>
          )}
        </CardHeader>

        {/* BODY */}
        <CardContent className="flex flex-col gap-4 flex-1">

          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>

          {/* STACK */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Badge
                key={tech}
                className="text-[10px] px-2 py-0.5 bg-muted/60 text-muted-foreground hover:bg-muted/80 transition"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="mt-auto flex flex-col gap-2">

            <Button asChild variant="outline" className="w-full">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                Code
              </a>
            </Button>

            {project.demo && (
              <Button asChild className="w-full">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live
                </a>
              </Button>
            )}

          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}