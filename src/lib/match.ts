// Relative .ts imports keep this runnable by Node without the bundler (see scripts/match.check.ts).
import { answers, domainTerms, notListed, type Answer } from "../data/assistant.ts";
import { projects, type Project } from "../data/projects.ts";
import { skillAliases, skillGroups } from "../data/skills.ts";

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Whole-word match: "Java" doesn't hit "JavaScript", "ai" doesn't hit "said".
 * Terms with capitals are case-sensitive ("REST" isn't "the rest"); lowercase terms match any case.
 */
export function mentions(text: string, term: string) {
  const flags = /[A-Z]/.test(term) ? "" : "i";
  return new RegExp(`(?<![A-Za-z0-9])${escapeRegExp(term)}(?![A-Za-z0-9])`, flags).test(text);
}

const mentionsAny = (text: string, terms: string[]) => terms.some((t) => mentions(text, t));
const spellings = (skill: string) => [skill, ...(skillAliases[skill] ?? [])];

/** Best pre-written answer for a typed question; private topics (salary, notice period…) win outright. */
export function matchAnswer(question: string): Answer | undefined {
  let best: Answer | undefined;
  let bestScore = 0;
  for (const answer of answers) {
    const score = answer.keywords.filter((k) => mentions(question, k)).length;
    if (score > 0 && answer.priority) return answer;
    if (score > bestScore) [best, bestScore] = [answer, score];
  }
  return best;
}

const projectText = (p: Project) => [p.name, p.kind, p.summary, ...p.built, ...p.tech].join(" ");

export function projectsUsing(skill: string, projects: Project[]) {
  return projects.filter((p) => mentionsAny(projectText(p), spellings(skill)));
}

const allSkills = [...new Set(skillGroups.flatMap((g) => g.skills))];

// People type lowercase ("kubernetes", "postgres"), so typed questions match any case,
// skipping short or ambiguous spellings ("TS", "S3", "REST" as in "the rest of…").
const typedSpellings = (skill: string) =>
  spellings(skill)
    .filter((s) => s.length >= 3 && !["REST", "SES", "ES6"].includes(s))
    .map((s) => s.toLowerCase());

const joinNames = (names: string[]) => (names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`);

export interface Reply {
  text: string;
  evidence?: Answer["evidence"];
}

/**
 * Reply to a typed question. Pre-written answers come first, but a question naming technologies
 * he doesn't list ("does he know Kubernetes?") gets a direct, honest answer instead.
 */
export function answerQuestion(question: string): Reply | undefined {
  const canned = matchAnswer(question);
  const cannedReply = canned && { text: canned.answer, evidence: canned.evidence };
  if (canned?.priority) return cannedReply;

  const known = allSkills.filter((s) => mentionsAny(question, typedSpellings(s)));
  const unknown = notListed.filter((t) => mentions(question, t.toLowerCase()));
  if (cannedReply && unknown.length === 0) return cannedReply;
  if (known.length + unknown.length === 0) return undefined;

  const usage = known.map((skill) => ({ skill, used: projectsUsing(skill, projects) }));
  const lines = usage.map(({ skill, used }) =>
    used.length ? `• ${skill}: yes, used in ${joinNames(used.map((p) => p.name))}.` : `• ${skill}: yes, it's on his resume.`,
  );
  if (unknown.length) lines.push(`${joinNames(unknown)} ${unknown.length > 1 ? "aren't" : "isn't"} on his list yet.`);

  const cited = [...new Map(usage.flatMap((u) => u.used).map((p) => [p.id, { label: p.name, target: p.id }])).values()];
  return { text: lines.join("\n"), evidence: cited.length ? cited.slice(0, 2) : [{ label: "Skills", target: "skills-list" }] };
}

/** Plain keyword overlap between a pasted job description and the skills on this site. */
export function matchJobDescription(jd: string) {
  const matched = [
    ...allSkills.filter((s) => mentionsAny(jd, spellings(s))),
    ...Object.keys(domainTerms).filter((d) => mentionsAny(jd, domainTerms[d])),
  ];
  const missing = notListed.filter((t) => mentions(jd, t));
  return { matched, missing };
}
