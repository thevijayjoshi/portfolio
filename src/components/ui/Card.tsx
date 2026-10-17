import type { HTMLAttributes, PointerEvent } from "react";
import { cn } from "@/lib/utils";

/** Bordered card with a soft glow that follows the cursor (.spotlight in index.css). */
export function Card({ className, onPointerMove, ...props }: HTMLAttributes<HTMLDivElement>) {
  function trackPointer(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
    onPointerMove?.(event);
  }

  return (
    <div
      onPointerMove={trackPointer}
      className={cn("spotlight rounded-2xl border border-card-border bg-card p-5 sm:p-6", className)}
      {...props}
    />
  );
}
