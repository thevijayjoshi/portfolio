import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { profile } from "@/data/profile";

const handbooks = [
  { label: "AI Engineering Handbook", href: "https://thevijayjoshi.github.io/ai-engineering-handbook/" },
  { label: "Backend Engineering Handbook", href: "https://thevijayjoshi.github.io/backend-engineering-handbook/" },
];

export function Footer() {
  return (
    <footer className="border-t border-card-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 sm:px-6 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
          <p className="flex items-center gap-2.5 text-sm text-muted">
            <Logo className="h-6 w-6" />
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
          <p className="text-xs text-muted">
            {handbooks.map((h, i) => (
              <span key={h.href}>
                {i > 0 && " · "}
                <a href={h.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                  {h.label}
                </a>
              </span>
            ))}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-foreground" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-foreground" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${profile.email}`} className="text-muted transition-colors hover:text-foreground" aria-label="Email">
            <Mail size={20} />
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="ml-2 rounded-full border border-card-border p-1.5 text-muted transition-colors hover:border-primary hover:text-primary"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
