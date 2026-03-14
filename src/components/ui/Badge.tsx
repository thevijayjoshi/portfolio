import { cn } from "@/lib/utils";
import type { SkillColor } from "@/data/skills";

const colorStyles: Record<SkillColor, string> = {
  blue: "bg-blue-500/10 text-blue-400 dark:bg-blue-500/15 dark:text-blue-300",
  purple: "bg-purple-500/10 text-purple-400 dark:bg-purple-500/15 dark:text-purple-300",
  green: "bg-emerald-500/10 text-emerald-400 dark:bg-emerald-500/15 dark:text-emerald-300",
  orange: "bg-orange-500/10 text-orange-400 dark:bg-orange-500/15 dark:text-orange-300",
  pink: "bg-pink-500/10 text-pink-400 dark:bg-pink-500/15 dark:text-pink-300",
  cyan: "bg-cyan-500/10 text-cyan-400 dark:bg-cyan-500/15 dark:text-cyan-300",
};

interface BadgeProps {
  children: React.ReactNode;
  color?: SkillColor;
  className?: string;
}

export function Badge({ children, color, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        color
          ? colorStyles[color]
          : "bg-badge-bg text-badge-text",
        className
      )}
    >
      {children}
    </span>
  );
}
