import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { GitCommitHorizontal, Route, Trophy, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { education, highlights, stats, story } from "@/data/profile";

const highlightIcons = [Trophy, GitCommitHorizontal, Users, Route];

/** Counts up from 0 the first time the number scrolls into view. */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (reduceMotion) {
      el.textContent = value.toLocaleString("en-US");
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => (el.textContent = Math.round(v).toLocaleString("en-US")),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return <span ref={ref}>0</span>;
}

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeading
            index="01"
            title="About"
            subtitle="Mechanical engineer by degree, self-taught software engineer shipping production SaaS."
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-card-border bg-card-border lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card p-5 sm:p-6">
                <p className="font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  <CountUp value={stat.value} />
                  {stat.suffix}
                </p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <ScrollReveal>
            <Card id="about-story" className="flex h-full flex-col">
              <h3 className="text-lg font-semibold text-foreground">From mechanical engineering to production SaaS</h3>
              <div className="mt-3 space-y-3 leading-relaxed text-muted">
                {story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-auto pt-5 font-mono text-xs text-muted">{education}</p>
            </Card>
          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {highlights.map((item, i) => {
              const Icon = highlightIcons[i];
              return (
                <ScrollReveal key={item.title} delay={i * 0.08} className="h-full">
                  <Card className="h-full">
                    <Icon size={20} className="text-primary" />
                    <h3 className="mt-3 font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
