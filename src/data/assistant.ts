// Relative .ts import so scripts/match.check.ts can run this file directly with Node.
import { profile } from "./profile.ts";

export interface Answer {
  id: string;
  /** Suggestion chip text; empty = only reachable by typing. */
  question: string;
  /** Typed questions are scored by how many of these they mention (lowercase = any case). */
  keywords: string[];
  answer: string;
  /** Sections/cards to scroll to and highlight. */
  evidence: { label: string; target: string }[];
  /** Wins outright whenever any keyword matches. */
  priority?: boolean;
}

export const greeting =
  "Hi! Ask me about Vijay's experience, skills or projects. These are quick answers written from his resume, not AI.";

export const fallback = `I don't have a ready answer for that one. Try one of the questions below, or ask Vijay directly at ${profile.email}.`;

// Order matters on ties: more specific answers come first.
export const answers: Answer[] = [
  {
    id: "private",
    question: "",
    priority: true,
    keywords: ["salary", "ctc", "compensation", "expected pay", "current pay", "hike", "notice period", "serving notice", "joining date", "immediate joiner", "job search", "looking for", "open to work", "new job", "job change", "relocate", "relocation", "visa"],
    answer: `That's best discussed with Vijay directly. Email him at ${profile.email} or message him on LinkedIn.`,
    evidence: [{ label: "Contact", target: "contact-form" }],
  },
  {
    id: "interop",
    question: "",
    keywords: ["fhir", "hl7", "interoperability", "interop"],
    answer:
      "He hasn't worked directly with FHIR or HL7 interfaces yet. His healthcare work is in EHR product features, billing (claims, ERA, denials, ICD-10/CPT catalogs) and telehealth.",
    evidence: [{ label: "Projects", target: "case-compass" }],
  },
  {
    id: "summary",
    question: "Summarize Vijay in 30 seconds",
    keywords: ["summary", "summarize", "summarise", "who", "introduce", "introduction", "overview", "tldr", "30 seconds", "elevator", "yourself", "profile", "tell me about"],
    answer:
      "Vijay is a full-stack software engineer with 3+ years of experience, most of it building US healthcare SaaS at Thinkitive: EHR, telehealth and billing. He's strongest in React and TypeScript and has owned backend work in NestJS and Node.js since January 2026. Today he leads frontend and backend work on WellQor Compass, a multi-tenant behavioral-health EHR, and mentors the developers on that team. He received Thinkitive's Above & Beyond award in 2025.",
    evidence: [
      { label: "About", target: "about-story" },
      { label: "WellQor Compass", target: "case-compass" },
    ],
  },
  {
    id: "now",
    question: "What is he working on now?",
    keywords: ["now", "current", "currently", "today", "present", "wellqor", "compass", "latest", "recent"],
    answer:
      "WellQor Compass: a 100% telehealth behavioral-health EHR with revenue cycle management, built as 8 NestJS microservices and 2 React 19 portals. He's been on it since discovery and leads technical work across frontend and backend.\n\nHis work there includes per-tenant database provisioning, RBAC and audit trails, the scheduling engine with Kafka-driven reminders, a schema-driven form and assessment builder, Orval-generated API SDKs, the claims/ERA/denials billing suite and generative AI on AWS Bedrock. He's the #1 contributor on all three repositories.",
    evidence: [{ label: "WellQor Compass", target: "case-compass" }],
  },
  {
    id: "tenancy",
    question: "Has he built multi-tenant systems?",
    keywords: ["tenant", "tenants", "multi-tenant", "multitenant", "multi-tenancy", "multitenancy", "saas", "isolation", "provisioning", "subdomain", "white label", "white-label", "branding"],
    answer:
      "Yes, on three platforms.\n• WellQor Compass: tenant registry, a separate database per tenant, RBAC and tenant-branded emails.\n• EverBetter: turned a single-tenant product into a multi-tenant one with subdomain-based organizations, per-org branding, per-org secrets in GCP Secret Manager and organization-scoped AI; part of the team that moved live clients onto it.\n• Before that, a multi-tenant core banking system used by 150+ banks.",
    evidence: [
      { label: "WellQor Compass", target: "case-compass" },
      { label: "EverBetter", target: "case-everbetter" },
      { label: "Core banking", target: "exp-sutradhar" },
    ],
  },
  {
    id: "ai",
    question: "What AI work has he done?",
    keywords: ["ai", "llm", "llms", "genai", "gen ai", "generative", "bedrock", "claude", "openai", "gpt", "chatgpt", "prompt", "prompts", "machine learning", "ml", "rag", "agent", "agents", "artificial intelligence"],
    answer:
      "• WellQor Compass: HIPAA-compliant generative AI on AWS Bedrock (Claude): treatment-plan drafting and episode summaries with strict JSON output schemas, feature flags with offline fallbacks and cost-tiered model routing. In the UI, AI-drafted plans are pre-filled for clinician review and never auto-saved, plus an AI daily brief and task summaries.\n• EverBetter: made the LLM layer multi-tenant, with organization-scoped prompt execution, AI configuration, session summaries and per-organization OpenAI keys.\n• Day to day he works with Claude Code and Cursor.",
    evidence: [
      { label: "WellQor Compass", target: "case-compass" },
      { label: "EverBetter", target: "case-everbetter" },
    ],
  },
  {
    id: "stack",
    question: "Frontend or backend?",
    keywords: ["frontend", "front-end", "front end", "backend", "back-end", "back end", "full stack", "full-stack", "fullstack", "stack", "react", "node", "nestjs", "typescript", "javascript", "next.js", "nextjs", "ui", "api", "apis", "server", "database", "postgres", "postgresql", "mongodb", "tech", "technologies", "skills"],
    answer:
      "Both, frontend-strong.\n• Frontend: React 18/19, TypeScript, Next.js, Redux Toolkit, React Query, Zustand, Material UI, Tailwind/Shadcn, React Hook Form + Zod: complex forms, scheduling UIs, billing suites and shared component libraries.\n• Backend (since January 2026): NestJS microservices on an Nx monorepo, PostgreSQL with TypeORM, MongoDB, Kafka, NATS, Redis, and OpenAPI with Orval-generated typed clients.\nIn the Skills section you can click any technology to see where he used it.",
    evidence: [
      { label: "Skills", target: "skills-list" },
      { label: "WellQor Compass", target: "case-compass" },
    ],
  },
  {
    id: "healthcare",
    question: "What healthcare experience does he have?",
    keywords: ["healthcare", "health", "ehr", "emr", "hipaa", "clinical", "clinic", "clinician", "patient", "patients", "telehealth", "telemedicine", "rpm", "rtm", "ccm", "rcm", "billing", "claims", "medical", "provider", "providers", "behavioral", "icd", "cpt"],
    answer:
      "Four US healthcare products at Thinkitive:\n• UnityHealth360: remote patient monitoring (RPM, RTM, CCM)\n• Primary Plus: a 7-portal EHR (billing, messaging, charting)\n• EverBetter: an AI clinician platform\n• WellQor Compass: a behavioral-health telehealth EHR with revenue cycle management\nDomain work includes ICD-10/CPT/payer catalogs, claims, ERA and denials, PHQ-9/GAD-7 assessments, consents and e-signatures, telehealth video, and HIPAA-aware data handling with audit trails.",
    evidence: [
      { label: "Experience", target: "exp-thinkitive" },
      { label: "Projects", target: "case-compass" },
    ],
  },
  {
    id: "lead",
    question: "Has he led a team?",
    keywords: ["lead", "leads", "led", "leader", "leadership", "team", "mentor", "mentoring", "mentored", "manage", "manager", "management", "senior", "junior", "guide", "ownership", "own", "owned"],
    answer:
      "Yes. On WellQor Compass he leads technical work across frontend and backend and guides 3+ developers. He was on the project from day zero: discovery calls, estimation and user stories, then setup and delivery. He started mentoring on Primary Plus, mostly on the frontend, where he was also the go-to owner for billing and payments. He received Thinkitive's Above & Beyond award (2025) for ownership and delivery.",
    evidence: [
      { label: "Highlights", target: "about-story" },
      { label: "WellQor Compass", target: "case-compass" },
    ],
  },
  {
    id: "realtime",
    question: "Real-time systems & integrations?",
    keywords: ["real-time", "realtime", "real time", "socket", "sockets", "socket.io", "websocket", "websockets", "kafka", "nats", "events", "event-driven", "stripe", "twilio", "zoom", "jitsi", "payment", "payments", "video", "chat", "messaging", "integration", "integrations", "sdk", "sdks", "third-party", "calendar"],
    answer:
      "• Real-time and messaging: Socket.IO provider–patient messaging (Primary Plus), Kafka-driven appointment reminders (Compass), NATS microservices (EverBetter) and Twilio Conversations chat (UnityHealth360).\n• Payments: Stripe billing with autopay, invoices and statements; Stripe and Authorize.Net keys managed per organization.\n• Telehealth and calendars: Zoom Meeting SDK, Jitsi meeting links and an ICS calendar feed.\n• Also Keycloak and Auth0 auth, AWS SES email and Zoho CRM intake.",
    evidence: [
      { label: "Primary Plus", target: "case-primaryplus" },
      { label: "WellQor Compass", target: "case-compass" },
    ],
  },
  {
    id: "background",
    question: "Background & education",
    keywords: ["mechanical", "degree", "education", "educated", "college", "university", "graduate", "graduation", "cs", "computer science", "background", "self-taught", "self taught", "study", "studied", "cgpa", "gpa", "qualification"],
    answer:
      "He has a B.E. in Mechanical Engineering from Savitribai Phule Pune University (2022, CGPA 8.47) and taught himself software engineering. He started professionally in July 2023 as a React developer on a core banking system used by 150+ banks, joined Thinkitive in November 2024 and has worked full stack since January 2026.",
    evidence: [
      { label: "About", target: "about-story" },
    ],
  },
  {
    id: "hire",
    question: "Why should we hire him?",
    keywords: ["hire", "hiring", "why", "strength", "strengths", "strong", "best", "good fit", "fit", "value", "stand out", "unique", "different"],
    answer:
      "• He has shipped production healthcare SaaS on both sides of the stack: React/TypeScript frontends and NestJS/PostgreSQL/Kafka backends.\n• He takes ownership: #1 contributor on all three repositories of his current platform, the Above & Beyond award (2025), and a new EHR taken from discovery into active development.\n• He's comfortable with the hard parts of SaaS: multi-tenancy, RBAC, audit trails, billing and HIPAA-safe AI.\n• He learns fast: self-taught from Mechanical Engineering to leading full-stack work on a production EHR.",
    evidence: [
      { label: "WellQor Compass", target: "case-compass" },
      { label: "About", target: "about-story" },
    ],
  },
  {
    id: "contact",
    question: "How can I contact him?",
    keywords: ["contact", "email", "mail", "reach", "phone", "call", "number", "linkedin", "connect", "message", "resume", "cv", "interview", "meet"],
    answer: `Email: ${profile.email}\nPhone: ${profile.phone}\nLinkedIn: linkedin.com/in/the-vijay-joshi\nOr use the contact form at the bottom of the page. Both resumes (full-stack and frontend) are in the buttons below.`,
    evidence: [{ label: "Contact form", target: "contact-form" }],
  },
];

/** Non-skill words a job description might use that also describe Vijay's experience (name → spellings). */
export const domainTerms: Record<string, string[]> = {
  Healthcare: ["healthcare", "health tech", "healthtech", "digital health", "clinical"],
  "EHR / EMR": ["EHR", "EMR", "electronic health record", "electronic medical record"],
  Telehealth: ["telehealth", "telemedicine", "virtual care"],
  "Revenue cycle / billing": ["RCM", "revenue cycle", "medical billing", "claims"],
  SaaS: ["SaaS", "saas"],
  Fintech: ["fintech", "banking"],
  Payments: ["payments", "payment gateway"],
  "Event-driven": ["event-driven", "event driven", "pub/sub"],
  AWS: ["AWS", "Amazon Web Services"],
  GCP: ["GCP", "Google Cloud"],
  "Full stack": ["full stack", "full-stack", "fullstack"],
  Mentoring: ["mentor", "mentoring", "tech lead", "technical lead"],
};

/** Common job-description technologies Vijay doesn't list, so the match shows honest gaps. */
export const notListed = [
  "Python", "Golang", "Java", "Spring Boot", "Kotlin", "Swift", "C#", ".NET", "PHP", "Laravel", "Ruby on Rails", "Rust",
  "Angular", "Vue", "Svelte", "React Native", "Flutter", "GraphQL", "Kubernetes", "Terraform", "Azure", "Elasticsearch",
  "MySQL", "DynamoDB", "AWS Lambda", "Django", "FastAPI", "LangChain", "FHIR", "HL7", "Cypress", "Selenium", "Jenkins",
];
