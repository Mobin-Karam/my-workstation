"use client";

import { useMemo, useState, useCallback, useEffect, FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectGrid } from "@/features/projects/ProjectGrid";

// ✅ IMPORT REAL PROJECT TYPE (IMPORTANT FIX)
import type { Project } from "@/features/projects/projects";

// ============================================================================
// Types
// ============================================================================

interface ProjectsClientProps {
  projects: Project[];
  allStacks: string[];
  initialSearch?: string;
  initialFilter?: string;
}

// ============================================================================
// Animation Variants (FIXED - no custom interface)
// ============================================================================

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const filterCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const emptyStateVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

// ============================================================================
// Filter Section
// ============================================================================

interface FilterSectionProps {
  search: string;
  filter: string;
  allStacks: string[];
  projectCount: number;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onClear: () => void;
}

const FilterSection: FC<FilterSectionProps> = ({
  search,
  filter,
  allStacks,
  projectCount,
  onSearchChange,
  onFilterChange,
  onClear,
}) => {
  const isActive = search !== "" || filter !== "all";

  return (
    <motion.div initial="hidden" animate="visible">
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex justify-between">
            <h2>فیلتر</h2>
            <span>{projectCount} پروژه</span>
          </div>

          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="جستجو..."
          />

          <Select value={filter} onValueChange={onFilterChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه</SelectItem>
              {allStacks.map((stack) => (
                <SelectItem key={stack} value={stack}>
                  {stack}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {isActive && (
            <Button onClick={onClear} variant="outline">
              پاک کردن
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ============================================================================
// Empty State
// ============================================================================

const EmptyState: FC<{
  search: string;
  filter: string;
  onClear: () => void;
}> = ({ search, filter, onClear }) => {
  return (
    <motion.div initial="hidden" animate="visible">
      <h3>پیدا نشد</h3>
      <Button onClick={onClear}>ریست</Button>
    </motion.div>
  );
};

// ============================================================================
// Main Component
// ============================================================================

export const ProjectsClient: FC<ProjectsClientProps> = ({
  projects,
  allStacks,
  initialSearch = "",
  initialFilter = "all",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(initialSearch);
  const [filter, setFilter] = useState(initialFilter);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "all" || p.stack.includes(filter);

      return matchesSearch && matchesFilter;
    });
  }, [projects, search, filter]);

  const updateParams = useCallback(
    (newSearch?: string, newFilter?: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newSearch !== undefined) {
        newSearch ? params.set("search", newSearch) : params.delete("search");
      }

      if (newFilter !== undefined) {
        newFilter !== "all"
          ? params.set("filter", newFilter)
          : params.delete("filter");
      }

      const newUrl = params.toString() ? `?${params.toString()}` : "";

      router.push(`/projects${newUrl}`);
    },
    [searchParams, router],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    updateParams(value, filter);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
    updateParams(search, value);
  };

  const handleClear = () => {
    setSearch("");
    setFilter("all");
    updateParams("", "all");
  };

  if (!mounted) return null;

  return (
    <motion.main initial="hidden" animate="visible">
      <div className="p-6 space-y-6">
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div key="grid">
              <ProjectGrid projects={filtered} />
            </motion.div>
          ) : (
            <EmptyState
              key="empty"
              search={search}
              filter={filter}
              onClear={handleClear}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
};
