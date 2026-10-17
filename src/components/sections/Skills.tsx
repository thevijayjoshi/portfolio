import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { projectsUsing } from "@/lib/match";
import { cn, highlight } from "@/lib/utils";

export function Skills() {
  const [active, setActive] = useState<string | null>(null);
  const usedIn = active ? projectsUsing(active, projects) : [];

  return (
    <section id="skills" className="bg-section-alt py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeading index="04" title="Skills" subtitle="Click any technology to see which projects used it." />
        </ScrollReveal>

        <div
          aria-live="polite"
          className="sticky top-[4.25rem] z-10 mb-8 flex min-h-12 flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-card-border bg-card/90 px-4 py-3 text-sm backdrop-blur"
        >
          {!active && <span className="text-muted">Pick a technology below.</span>}
          {active && <span className="font-semibold text-foreground">{active}</span>}
          {active && usedIn.length === 0 && <span className="text-muted">On my resume; not part of the projects above.</span>}
          {usedIn.length > 0 && <span className="text-muted">used in</span>}
          {usedIn.map((p) => (
            <button key={p.id} onClick={() => highlight(p.id)} className="font-medium text-primary hover:underline">
              {p.name} ↑
            </button>
          ))}
        </div>

        <div id="skills-list" className="grid gap-x-12 gap-y-7 rounded-2xl md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.name}>
              <h3 className="mb-2.5 font-mono text-xs tracking-wide text-muted uppercase">{group.name}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <button
                    key={skill}
                    aria-pressed={active === skill}
                    onClick={() => setActive(active === skill ? null : skill)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-sm transition-colors",
                      active === skill
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-card-border bg-card text-foreground hover:border-primary/60",
                    )}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
