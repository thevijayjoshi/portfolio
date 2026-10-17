import { cn } from "@/lib/utils";

/** "VJ." monogram (Inter ExtraBold outlines): a tile in the text colour with the letters in the page colour. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("shrink-0", className)} aria-hidden="true">
      <rect width="64" height="64" rx="10" className="fill-foreground" />
      <path
        className="fill-background"
        d="M14 44.8 5.06 18.8H11.93L15.58 30.22Q16.43 33.02 17.29 36.04Q18.15 39.05 19.06 42.32H17.24Q18.12 39.05 18.94 36.04Q19.76 33.02 20.58 30.22L24.09 18.8H30.87L22.17 44.8ZM42.31 45.2Q38.13 45.2 35.8 43.01Q33.47 40.82 33.47 36.74V34.84H39.32V36.79Q39.32 38.33 40.08 39.15Q40.85 39.97 42.22 39.97Q43.58 39.97 44.35 39.15Q45.13 38.33 45.13 36.79V18.8H51.4V36.89Q51.4 40.9 49.01 43.05Q46.61 45.2 42.31 45.2Z"
      />
      <rect x="53.74" y="39.6" width="5.2" height="5.2" className="fill-logo-dot" />
    </svg>
  );
}
