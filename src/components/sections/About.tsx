import { Briefcase, GraduationCap, Heart, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { stats } from "@/data/profile";

const statIcons = [Briefcase, Heart, Sparkles, GraduationCap];

export function About() {
  return (
    <section id="about" className="bg-section-alt py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeading
            title="About Me"
            subtitle="A snapshot of who I am and what I bring to the table."
          />
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {stats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <Card className="flex flex-col items-center text-center">
                  <Icon className="mb-2 text-primary" size={22} />
                  <span className="text-xl font-bold text-foreground sm:text-2xl">{stat.value}</span>
                  <span className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</span>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>

        {/* AI Development Callout */}
        <ScrollReveal delay={0.2}>
          <div className="rounded-xl border border-gradient-start/20 bg-gradient-to-r from-gradient-start/5 to-gradient-end/5 p-5 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gradient-start to-gradient-end text-white">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  AI-Powered Development
                </h3>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  I leverage AI coding agents like <strong className="text-foreground">Claude Code</strong> and{" "}
                  <strong className="text-foreground">Cursor AI</strong> to accelerate development by 25%+.
                  From complex refactors to code generation and architectural decisions, I use AI-assisted
                  tools to deliver clean, maintainable code faster — while keeping full ownership of
                  quality and correctness.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
