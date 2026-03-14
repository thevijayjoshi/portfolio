import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { skillCategories, type SkillColor } from "@/data/skills";

const iconBgStyles: Record<SkillColor, string> = {
  blue: "bg-blue-500/15 text-blue-400",
  purple: "bg-purple-500/15 text-purple-400",
  green: "bg-emerald-500/15 text-emerald-400",
  orange: "bg-orange-500/15 text-orange-400",
  pink: "bg-pink-500/15 text-pink-400",
  cyan: "bg-cyan-500/15 text-cyan-400",
};

const borderAccent: Record<SkillColor, string> = {
  blue: "hover:border-blue-500/40",
  purple: "hover:border-purple-500/40",
  green: "hover:border-emerald-500/40",
  orange: "hover:border-orange-500/40",
  pink: "hover:border-pink-500/40",
  cyan: "hover:border-cyan-500/40",
};

export function Skills() {
  return (
    <section id="skills" className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeading
            title="Skills & Technologies"
            subtitle="The tools and technologies I work with daily."
          />
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {skillCategories.map((category, i) => {
            const Icon = category.icon;
            return (
              <ScrollReveal key={category.name} delay={i * 0.1} className="h-full">
                <div
                  className={`h-full rounded-xl border border-card-border bg-card p-5 transition-all duration-300 hover:shadow-lg ${borderAccent[category.color]}`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBgStyles[category.color]}`}
                    >
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">
                      {category.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill} color={category.color}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
