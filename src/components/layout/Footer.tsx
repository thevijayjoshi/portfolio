import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-card-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-muted transition-colors hover:text-foreground"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <button
            onClick={scrollToTop}
            className="ml-2 rounded-full border border-card-border p-1.5 text-muted transition-colors hover:text-primary hover:border-primary"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
