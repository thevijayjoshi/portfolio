import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-card-border bg-badge-bg px-2 py-0.5 font-mono text-[11px] text-badge-text">
      {children}
    </span>
  );
}
