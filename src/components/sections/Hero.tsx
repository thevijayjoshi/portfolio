import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ChevronDown, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { openAssistant } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]#*+=";

/** Cycles through the taglines, "decoding" each one from random glyphs. */
function DecodeText({ items }: { items: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(items[0]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % items.length), 3200);
    return () => window.clearInterval(timer);
  }, [items.length]);

  useEffect(() => {
    const target = items[index];
    if (reduceMotion) return setText(target);
    let revealed = 0;
    const timer = window.setInterval(() => {
      revealed += 2;
      setText(
        [...target]
          .map((ch, i) => (i < revealed || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
      if (revealed >= target.length) window.clearInterval(timer);
    }, 30);
    return () => window.clearInterval(timer);
  }, [index, items, reduceMotion]);

  return (
    <>
      <span aria-hidden="true">
        {text}
        <span className="caret" />
      </span>
      <span className="sr-only">{items.join(". ")}</span>
    </>
  );
}

/** Native <details> dropdown with the two resume versions; closes on outside click. */
function ResumeMenu() {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) ref.current.open = false;
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <details ref={ref} className="group relative">
      <summary className="btn btn-ghost list-none [&::-webkit-details-marker]:hidden">
        <Download size={16} />
        Resume
        <ChevronDown size={14} className="transition-transform group-open:rotate-180" />
      </summary>
      <div className="absolute left-1/2 z-20 mt-2 w-52 -translate-x-1/2 rounded-xl border border-card-border bg-card p-1 text-left shadow-xl lg:left-0 lg:translate-x-0">
        {profile.resumes.map((resume) => (
          <a
            key={resume.href}
            href={resume.href}
            download={resume.file}
            onClick={() => ref.current && (ref.current.open = false)}
            className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-section-alt"
          >
            {resume.label}
          </a>
        ))}
      </div>
    </details>
  );
}

export function Hero() {
  // Feeds the cursor spotlight (.hero::after in index.css).
  function trackPointer(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <section
      id="hero"
      onPointerMove={trackPointer}
      className="hero relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-24 pb-16 sm:px-6"
    >
      <div className="aurora" aria-hidden="true" />
      <div className="dot-grid" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-10 lg:flex-row lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center lg:text-left"
        >
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-card-border bg-card/60 px-3 py-1 text-xs text-muted backdrop-blur sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {profile.status}
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">{profile.name}</h1>
          <p className="mt-3 text-lg font-medium text-foreground/80 sm:text-xl">{profile.title}</p>
          <p className="mt-2 h-7 font-mono text-sm text-primary sm:text-base">
            <DecodeText items={profile.taglines} />
          </p>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted lg:mx-0">{profile.summary}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="#projects" className="btn btn-primary">
              View my work
              <ArrowDown size={16} />
            </a>
            <ResumeMenu />
            <button onClick={openAssistant} className="btn btn-ghost">
              <Sparkles size={16} className="text-primary" />
              Ask about me
            </button>
          </div>

          <div className="mt-7 flex justify-center gap-5 lg:justify-start">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-primary" aria-label="GitHub">
              <Github size={21} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-primary" aria-label="LinkedIn">
              <Linkedin size={21} />
            </a>
            <a href={`mailto:${profile.email}`} className="text-muted transition-colors hover:text-primary" aria-label="Email">
              <Mail size={21} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="shrink-0"
        >
          <div className="relative h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
            <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end opacity-25 blur-3xl" />
            <div className="ring-spin absolute -inset-[3px] rounded-full" />
            <img
              src={profile.photo}
              alt={profile.name}
              width={640}
              height={640}
              fetchPriority="high"
              className="relative h-full w-full rounded-full bg-background object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
