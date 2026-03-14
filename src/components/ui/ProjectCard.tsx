import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./Badge";
import { Card } from "./Card";
import type { Project } from "@/data/projects";

const roleStyles: Record<Project["role"], string> = {
  Frontend: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Fullstack: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  Library: "bg-green-500/10 text-green-600 dark:text-green-400",
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="flex h-full flex-col">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${roleStyles[project.role]}`}
        >
          {project.role}
        </span>
      </div>

      <p className="mb-3 text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-auto flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:opacity-80"
      >
        {expanded ? "Show less" : "Key highlights"}
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 space-y-1.5 overflow-hidden text-sm text-muted"
          >
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {h}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </Card>
  );
}
