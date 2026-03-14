import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" className="bg-section-alt py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeading
            title="Get in Touch"
            subtitle="Have a project in mind or want to chat? Reach out!"
          />
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <ScrollReveal direction="left">
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-foreground">
                Let's work together
              </h3>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>

              <div className="space-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-primary"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light">
                    <Mail size={16} className="text-primary" />
                  </div>
                  {profile.email}
                </a>
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-primary"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light">
                    <Phone size={16} className="text-primary" />
                  </div>
                  {profile.phone}
                </a>
                <div className="flex items-center gap-3 text-sm text-muted">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  {profile.location}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-card-border text-muted transition-colors hover:text-primary"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-card-border text-muted transition-colors hover:text-primary"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form (Visual Only) */}
          <ScrollReveal direction="right">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4 rounded-xl border border-card-border bg-card p-5 sm:p-6"
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-lg border border-card-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gradient-start to-gradient-end px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                <Send size={16} />
                Send Message
              </button>
              <p className="text-center text-xs text-muted-light">
                Form is visual only — use email or LinkedIn to contact me directly.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
