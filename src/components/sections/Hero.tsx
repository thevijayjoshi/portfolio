import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % profile.taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 pt-20 sm:px-6 lg:min-h-[85vh]"
    >
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-start/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-end/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col-reverse items-center gap-8 lg:flex-row lg:gap-16">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center lg:text-left"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Hello, I'm
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>

          <div className="mb-5 h-8 overflow-hidden sm:h-9">
            <AnimatePresence mode="wait">
              <motion.p
                key={taglineIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-lg font-medium text-transparent sm:text-xl"
              >
                {profile.taglines[taglineIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="mb-8 max-w-xl text-base leading-relaxed text-muted">
            {profile.summary}
          </p>

          {/* CTA Buttons */}
          <div className="mb-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gradient-start to-gradient-end px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              View My Work
              <ArrowDown size={16} />
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-card-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-card"
            >
              <Download size={16} />
              Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 lg:justify-start">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-primary"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-muted transition-colors hover:text-primary"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <div className="relative h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
            {/* Gradient glow behind photo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end opacity-20 blur-2xl" />
            {/* Gradient ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end p-[3px]">
              <div className="h-full w-full rounded-full bg-background" />
            </div>
            <img
              src={profile.photo}
              alt={profile.name}
              className="absolute inset-0 h-full w-full rounded-full object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
