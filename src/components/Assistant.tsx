import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, Copy, Download, SendHorizontal, Sparkles, X } from "lucide-react";
import { answers, fallback, greeting, type Answer } from "@/data/assistant";
import { profile } from "@/data/profile";
import { answerQuestion, matchJobDescription } from "@/lib/match";
import { cn, highlight, prefersReducedMotion } from "@/lib/utils";

type Message = { from: "bot" | "user"; text: string; evidence?: Answer["evidence"] };
type JdResult = ReturnType<typeof matchJobDescription>;

const suggestions = answers.filter((a) => a.question);
const chipClass = "rounded-full border border-card-border px-3 py-1 text-xs text-foreground transition-colors hover:border-primary/60";
const fieldClass =
  "w-full rounded-xl border border-card-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-light focus:border-primary";

/** Scripted "Ask about me" chat: pre-written answers picked by keyword match, no AI or network calls. */
export function Assistant() {
  const dialog = useRef<HTMLDialogElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const [tab, setTab] = useState<"ask" | "jd">("ask");
  const [messages, setMessages] = useState<Message[]>([{ from: "bot", text: greeting }]);
  const [typing, setTyping] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [input, setInput] = useState("");
  const [jd, setJd] = useState("");
  const [jdResult, setJdResult] = useState<JdResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Opens from the navbar/hero buttons (openAssistant) and toggles with Ctrl/⌘+K.
  useEffect(() => {
    const open = () => {
      if (!dialog.current?.open) dialog.current?.showModal();
    };
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else open();
      }
    };
    window.addEventListener("assistant:open", open);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("assistant:open", open);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight });
  }, [messages, typing]);

  // Suggestion chips pass their own answer; typed questions are matched.
  function ask(question: string, preset?: Answer) {
    const text = question.trim();
    if (!text || busy.current) return;
    busy.current = true;
    const match = preset ? { text: preset.answer, evidence: preset.evidence } : answerQuestion(text);
    const reply: Message = { from: "bot", text: match?.text ?? fallback, evidence: match?.evidence };
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    if (prefersReducedMotion()) return deliver(reply, false);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      typeOut(reply);
    }, 600);
  }

  // Reveals the reply a few characters per frame; the evidence links appear once it's complete.
  function typeOut(reply: Message) {
    let shown = 0;
    setMessages((m) => [...m, { from: "bot", text: "" }]);
    const timer = window.setInterval(() => {
      shown += 6;
      if (shown < reply.text.length) {
        setMessages((m) => [...m.slice(0, -1), { from: "bot", text: reply.text.slice(0, shown) }]);
        return;
      }
      window.clearInterval(timer);
      deliver(reply, true);
    }, 16);
  }

  function deliver(reply: Message, replaceLast: boolean) {
    setMessages((m) => [...(replaceLast ? m.slice(0, -1) : m), reply]);
    setAnnouncement(reply.text);
    busy.current = false;
  }

  function showEvidence(target: string) {
    dialog.current?.close();
    requestAnimationFrame(() => highlight(target));
  }

  function checkJd(event: FormEvent) {
    event.preventDefault();
    setJdResult(matchJobDescription(jd));
  }

  function copyEmail() {
    navigator.clipboard.writeText(profile.email).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      },
      () => (window.location.href = `mailto:${profile.email}`),
    );
  }

  const asked = new Set(messages.filter((m) => m.from === "user").map((m) => m.text));
  const chips = suggestions.filter((a) => !asked.has(a.question)).slice(0, 4);

  return (
    <>
      <button
        onClick={() => dialog.current?.showModal()}
        className="btn btn-primary fixed right-4 bottom-4 z-40 rounded-full shadow-lg lg:hidden"
        aria-label="Ask about me"
      >
        <Sparkles size={16} />
        <span className="hidden sm:inline">Ask about me</span>
      </button>

      <dialog
        ref={dialog}
        className="assistant"
        aria-labelledby="assistant-title"
        onClick={(event) => event.target === event.currentTarget && event.currentTarget.close()}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-start justify-between gap-3 border-b border-card-border px-4 py-3">
            <div>
              <h2 id="assistant-title" className="flex items-center gap-2 font-semibold">
                <Sparkles size={16} className="text-primary" />
                Ask about Vijay
              </h2>
              <p className="text-xs text-muted">Instant, pre-written answers. Not AI.</p>
            </div>
            <button onClick={() => dialog.current?.close()} className="rounded-lg p-1.5 text-muted hover:text-foreground" aria-label="Close">
              <X size={18} />
            </button>
          </header>

          <div className="flex gap-1 border-b border-card-border p-2 text-sm">
            {(["ask", "jd"] as const).map((t) => (
              <button
                key={t}
                aria-pressed={tab === t}
                onClick={() => setTab(t)}
                className={cn(
                  "flex-1 rounded-lg px-3 py-1.5 font-medium transition-colors",
                  tab === t ? "bg-section-alt text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {t === "ask" ? "Ask a question" : "Match a job description"}
              </button>
            ))}
          </div>

          {tab === "ask" ? (
            <>
              <div ref={list} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-fit max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line",
                      m.from === "user" ? "ml-auto rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-section-alt text-foreground",
                    )}
                  >
                    {m.text}
                    {m.evidence && (
                      <span className="mt-2.5 flex flex-wrap gap-1.5">
                        {m.evidence.map((ev) => (
                          <button
                            key={ev.target}
                            onClick={() => showEvidence(ev.target)}
                            className="rounded-full border border-primary/40 px-2.5 py-0.5 text-xs font-medium text-primary hover:bg-primary/10"
                          >
                            See {ev.label} →
                          </button>
                        ))}
                      </span>
                    )}
                  </div>
                ))}
                {typing && (
                  <div className="typing-dots w-fit rounded-2xl rounded-bl-md bg-section-alt px-3.5 py-3" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                )}
              </div>

              {chips.length > 0 && (
                <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                  {chips.map((a) => (
                    <button key={a.id} onClick={() => ask(a.question, a)} className={chipClass}>
                      {a.question}
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  ask(input);
                }}
                className="flex gap-2 px-4 pb-3"
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  maxLength={300}
                  placeholder="Ask about skills, projects, AI…"
                  aria-label="Your question"
                  className={cn(fieldClass, "min-w-0 flex-1")}
                />
                <button type="submit" disabled={!input.trim()} className="btn btn-primary px-3 disabled:opacity-50" aria-label="Send">
                  <SendHorizontal size={16} />
                </button>
              </form>
            </>
          ) : (
            <form onSubmit={checkJd} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              <label htmlFor="jd-input" className="block text-sm text-muted">
                Paste a job description to see which of its technologies are on Vijay's list.
              </label>
              <textarea
                id="jd-input"
                value={jd}
                onChange={(event) => setJd(event.target.value)}
                rows={6}
                placeholder="Requirements: React, TypeScript, Node.js…"
                className={cn(fieldClass, "resize-none")}
              />
              <button type="submit" disabled={!jd.trim()} className="btn btn-primary w-full disabled:opacity-50">
                Check match
              </button>
              {jdResult && <JdReport result={jdResult} />}
            </form>
          )}

          <footer className="flex flex-wrap items-center gap-2 border-t border-card-border px-4 py-3 text-xs">
            {profile.resumes.map((resume) => (
              <a key={resume.href} href={resume.href} download={resume.file} className={cn(chipClass, "inline-flex items-center gap-1")}>
                <Download size={12} />
                {resume.label}
              </a>
            ))}
            <button onClick={copyEmail} className={cn(chipClass, "inline-flex items-center gap-1")}>
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied" : "Copy email"}
            </button>
          </footer>
        </div>
        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>
      </dialog>
    </>
  );
}

function JdReport({ result: { matched, missing } }: { result: JdResult }) {
  const total = matched.length + missing.length;
  if (total === 0) {
    return <p className="text-sm text-muted">No technologies I know of were found. Try pasting the requirements section.</p>;
  }

  return (
    <div className="space-y-3 text-sm" aria-live="polite">
      <p>
        <span className="font-semibold">
          {matched.length} of {total}
        </span>{" "}
        technologies in this description are on Vijay's list.
      </p>
      <div className="h-2 overflow-hidden rounded-full bg-section-alt">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gradient-start to-gradient-end"
          style={{ width: `${(matched.length / total) * 100}%` }}
        />
      </div>
      {[
        { title: "On his list", terms: matched, on: true },
        { title: "Not on his list", terms: missing, on: false },
      ].map(
        (group) =>
          group.terms.length > 0 && (
            <div key={group.title}>
              <p className="mb-1.5 font-mono text-xs text-muted uppercase">{group.title}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.terms.map((term) => (
                  <span
                    key={term}
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-xs",
                      group.on ? "border-primary/40 text-primary" : "border-card-border text-muted",
                    )}
                  >
                    {group.on ? "✓ " : ""}
                    {term}
                  </span>
                ))}
              </div>
            </div>
          ),
      )}
      <p className="text-xs text-muted">A simple keyword match, not an assessment. Related experience may cover a gap, so ask Vijay directly.</p>
    </div>
  );
}
