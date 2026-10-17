import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { highlight } from "@/lib/utils";

export function Experience() {
  const timeline = useRef<HTMLDivElement>(null);
  // The coloured line grows as you scroll through the timeline.
  const { scrollYProgress } = useScroll({ target: timeline, offset: ["start 75%", "end 60%"] });

  return (
    <section id="experience" className="bg-section-alt py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeading index="02" title="Experience" subtitle="Where I've worked, newest first." />
        </ScrollReveal>

        <div ref={timeline} className="relative">
          <div className="absolute top-3 bottom-3 left-[7px] w-0.5 rounded-full bg-timeline-line" aria-hidden="true" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute top-3 bottom-3 left-[7px] w-0.5 origin-top rounded-full bg-gradient-to-b from-gradient-start to-gradient-end"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {experiences.map((exp) => (
              <ScrollReveal key={exp.id}>
                <div className="relative pl-9 sm:pl-12">
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0.4 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-35% 0px -35% 0px" }}
                    className="absolute top-7 left-0 h-4 w-4 rounded-full border-[3px] border-primary bg-section-alt"
                    aria-hidden="true"
                  />
                  <Card id={exp.id}>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                        <p className="font-medium text-primary">{exp.company}</p>
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={13} />
                          {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={13} />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{exp.summary}</p>

                    {exp.points && (
                      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/85">
                        {exp.points.map((point) => (
                          <li key={point} className="flex gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.products && (
                      <ol className="mt-5 space-y-2">
                        {projects
                          .filter((p) => exp.products?.includes(p.id))
                          .map((p) => (
                            <li
                              key={p.id}
                              className="flex flex-col gap-2 rounded-xl border border-card-border bg-background/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                            >
                              <div>
                                <p className="font-medium text-foreground">
                                  {p.name} <span className="font-normal text-muted">· {p.kind}</span>
                                </p>
                                <p className="mt-0.5 font-mono text-xs text-muted">
                                  {p.role} · {p.period}
                                </p>
                              </div>
                              <button
                                onClick={() => highlight(p.id)}
                                className="shrink-0 self-start text-sm font-medium text-primary hover:underline sm:self-center"
                              >
                                Case study ↓
                              </button>
                            </li>
                          ))}
                      </ol>
                    )}
                  </Card>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
