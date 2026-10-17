export interface Project {
  /** DOM id; the assistant's evidence links and the skill finder scroll to it. */
  id: string;
  name: string;
  kind: string;
  period: string;
  role: string;
  summary: string;
  built: string[];
  tech: string[];
  featured?: boolean;
}

// Newest first.
export const projects: Project[] = [
  {
    id: "case-compass",
    name: "WellQor Compass",
    kind: "Behavioral-health EHR + revenue cycle management",
    period: "Jul 2026 – Present",
    role: "Full stack · technical lead",
    featured: true,
    summary:
      "A 100% telehealth EHR and billing platform: multi-tenant and event-driven, with 8 NestJS microservices and 2 React 19 portals. I've been on it since the first discovery call.",
    built: [
      "Took the platform from discovery, estimation and user stories into active development; I lead technical work across frontend and backend and mentor the developers on the team.",
      "Multi-tenant foundations in NestJS and PostgreSQL: tenant registry, per-tenant database provisioning, RBAC, and an audit trail with field-level change tracking.",
      "Scheduling end to end: availability search, recurring appointments, time-zone-safe rules, Kafka-driven reminders sent as tenant-branded AWS SES emails, and an ICS calendar feed.",
      "A schema-driven form engine and no-code assessment builder (scoring, severity bands, PHQ-9/GAD-7 library) with server-side scoring.",
      "Typed React Query SDKs for 4 microservices generated with Orval from OpenAPI, a claims, ERA and denials billing suite, and Zoom Meeting SDK telehealth.",
      "HIPAA-compliant generative AI on AWS Bedrock (Claude): treatment-plan drafting and episode summaries with strict JSON output schemas, feature flags with offline fallbacks, and cost-tiered model routing.",
      "#1 contributor on all 3 repositories.",
    ],
    tech: [
      "React 19",
      "TypeScript",
      "Material UI",
      "Redux Toolkit",
      "React Query",
      "Orval",
      "NestJS",
      "Nx",
      "PostgreSQL",
      "TypeORM",
      "Kafka",
      "AWS Bedrock",
      "AWS SES",
      "Zoom Meeting SDK",
      "Keycloak",
      "OpenTelemetry",
    ],
  },
  {
    id: "case-everbetter",
    name: "EverBetter",
    kind: "AI clinician platform",
    period: "Jan 2026 – Jun 2026",
    role: "Full stack",
    summary:
      "A clinician platform with live patient-session transcription and AI prompts. I joined to build the big platform pieces: multi-tenancy, RBAC and multi-tenant AI.",
    built: [
      "Turned a single-tenant product into a brandable multi-tenant platform with subdomain-based organizations, org branding and RBAC; part of the team that moved existing clients onto shared multi-tenant production.",
      "Made LLM features multi-tenant in Node.js microservices (MongoDB, NATS): organization-scoped prompt execution, AI configuration and session summaries.",
      "Per-organization secret management with GCP Secret Manager over NATS for OpenAI, Stripe, Authorize.Net and OneSignal keys, plus automated subdomain provisioning for new organizations.",
      "A form builder with public patient-form endpoints and configurable PDF headers, footers and watermarks.",
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "NATS", "Redis", "Auth0", "Zustand", "Shadcn UI", "OpenAI", "GCP Secret Manager"],
  },
  {
    id: "case-primaryplus",
    name: "Primary Plus",
    kind: "Multi-portal EHR",
    period: "May 2025 – Dec 2025",
    role: "Frontend",
    summary: "A large EHR with 7 portals covering patient management, charting, clinical workflows, billing and messaging.",
    built: [
      "Owned the Stripe billing and payments frontend: card and bank methods, autopay, coupons and credits, employer invoices, payment history and statements with PDF export.",
      "Real-time provider–patient messaging over Socket.IO: threads, categories, bookmarks, resolve/unresolve, scheduled messages, file previews and Jitsi meeting links.",
      "Built and published a shared component library (Radix UI, Tailwind CSS, Storybook, Rollup) used across the portals.",
      "Patient charting with RBAC (medications, ICD-10 diagnoses, allergies, labs, visits) and 15+ multi-step dynamic forms.",
    ],
    tech: ["React", "TypeScript", "Material UI", "Redux Toolkit", "React Query", "Socket.IO", "Stripe", "Keycloak", "Jitsi", "Radix UI", "Tailwind CSS", "Storybook"],
  },
  {
    id: "case-unity",
    name: "UnityHealth360",
    kind: "Remote patient monitoring (RPM, RTM, CCM)",
    period: "Nov 2024 – mid 2025",
    role: "Frontend",
    summary: "Admin and provider portals for remote patient monitoring and chronic care management.",
    built: [
      "Care-plan workflows, patient-monitoring dashboards, scheduling and PDF exports, taken to production.",
      "Real-time chat on the Twilio Conversations SDK.",
    ],
    tech: ["React", "TypeScript", "Material UI", "Redux Toolkit", "redux-saga", "React Query", "Twilio", "FullCalendar", "React Hook Form"],
  },
];
