import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scroll to an element and pulse it (assistant evidence links, skill finder, case-study links). */
export function highlight(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: el.offsetHeight > window.innerHeight * 0.7 ? "start" : "center",
  });
  el.classList.remove("is-highlighted");
  void el.offsetWidth; // restart the CSS animation if it's already running
  el.classList.add("is-highlighted");
  window.setTimeout(() => el.classList.remove("is-highlighted"), 2600);
}

export const openAssistant = () => window.dispatchEvent(new Event("assistant:open"));
