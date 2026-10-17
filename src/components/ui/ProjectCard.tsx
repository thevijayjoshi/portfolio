import { Badge } from "./Badge";
import { Card } from "./Card";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card id={project.id} className={cn("flex h-full flex-col", project.featured && "lg:p-8")}>
      <p className="font-mono text-xs tracking-wide text-primary uppercase">{project.kind}</p>
      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-semibold text-foreground sm:text-xl">{project.name}</h3>
        <span className="text-sm text-muted">
          {project.role} · {project.period}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{project.summary}</p>

      <ul className={cn("mt-4 text-sm leading-relaxed text-foreground/85", project.featured && "lg:columns-2 lg:gap-10")}>
        {project.built.map((item) => (
          <li key={item} className="mb-2 flex break-inside-avoid gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {project.tech.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    </Card>
  );
}
