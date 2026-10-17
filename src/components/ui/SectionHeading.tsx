interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ index, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-primary">{index}</span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h2>
        <span className="h-px flex-1 bg-card-border" aria-hidden="true" />
      </div>
      {subtitle && <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>}
    </div>
  );
}
