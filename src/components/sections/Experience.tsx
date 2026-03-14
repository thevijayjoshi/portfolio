import { useState } from "react";
import { Briefcase, ChevronDown, ChevronUp, MapPin, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { experiences } from "@/data/experience";

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="bg-section-alt py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeading
            title="Experience"
            subtitle="My professional journey so far."
          />
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-[1.375rem] w-0.5 bg-timeline-line sm:left-[1.875rem]" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="relative pl-12 sm:pl-16">
                  {/* Timeline dot */}
                  <div className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-gradient-start to-gradient-end ring-4 ring-background sm:left-2">
                    <Briefcase size={10} className="text-white" />
                  </div>

                  <div className="rounded-xl border border-card-border bg-card p-4 sm:p-6">
                    <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-foreground sm:text-lg">{exp.role}</h3>
                        <p className="text-sm font-medium text-primary">{exp.company}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted sm:text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={13} />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <ul className="mb-3 space-y-1.5 text-sm leading-relaxed text-muted">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                      className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:opacity-80"
                    >
                      {expandedIndex === i ? "Hide projects" : "View projects"}
                      {expandedIndex === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    <AnimatePresence>
                      {expandedIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 space-y-2 border-t border-card-border pt-3">
                            {exp.projects.map((proj) => (
                              <div
                                key={proj.name}
                                className="rounded-lg bg-section-alt p-3"
                              >
                                <h4 className="mb-1 text-sm font-semibold text-foreground">
                                  {proj.name}
                                </h4>
                                <p className="text-xs text-muted sm:text-sm">{proj.description}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
