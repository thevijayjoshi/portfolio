import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 text-center sm:mb-12", className)}>
      <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto max-w-2xl text-sm text-muted sm:text-base">{subtitle}</p>
      )}
      <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end" />
    </div>
  );
}
