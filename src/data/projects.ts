export interface Project {
  title: string;
  description: string;
  role: "Frontend" | "Fullstack" | "Library";
  tech: string[];
  highlights: string[];
}

export const projects: Project[] = [
  {
    title: "EverBetter Pro",
    description:
      "Clinician platform with multi-tenant architecture, RBAC, feature flags, and 12+ microservices. Delivered auth, billing, and patient management features across frontend and backend.",
    role: "Fullstack",
    tech: ["Next.js 15", "React 19", "Node.js", "MongoDB", "Auth0", "Zustand", "TypeScript"],
    highlights: [
      "Multi-tenant database-per-tenant architecture",
      "RBAC with 5-action permission model",
      "27 feature flags per organization",
      "NATS-based event-driven microservices",
    ],
  },
  {
    title: "Primary Plus (EHR)",
    description:
      "Large-scale Electronic Health Record platform with 7-8 independent portals serving US healthcare providers. Built patient management, clinical charting, and real-time communication.",
    role: "Frontend",
    tech: ["React", "TypeScript", "Material UI", "Redux Toolkit", "React Query", "Socket.IO"],
    highlights: [
      "Patient charting: medications, diagnoses (ICD-10), allergies, lab results",
      "Real-time provider-patient messaging via Socket.IO",
      "15+ complex multi-step dynamic forms",
      "HIPAA-aligned data handling and audit trails",
    ],
  },
  {
    title: "Unity Health Platform",
    description:
      "Production Healthcare SaaS supporting RPM, RTM, and CCM workflows. Built care-plan workflows, billing modules, and patient monitoring dashboards.",
    role: "Frontend",
    tech: ["React", "TypeScript", "Material UI", "Twilio SDK", "Redux", "React Query"],
    highlights: [
      "Care-plan workflows and billing modules",
      "Real-time communication via Twilio SDK",
      "Patient monitoring dashboards",
      "Thousands of patient records in production",
    ],
  },
  {
    title: "Custom Form Builder",
    description:
      "Drag-and-drop form builder library with multi-step forms, conditional logic, field validation, and JSON export. Published to AWS CodeArtifact.",
    role: "Library",
    tech: ["React", "TypeScript", "Rollup", "Radix UI", "Zod", "Storybook", "Tailwind CSS"],
    highlights: [
      "Visual drag-and-drop form builder",
      "Multi-step forms with progress indicators",
      "Conditional field visibility logic",
      "Published as npm package via AWS CodeArtifact",
    ],
  },
  {
    title: "Core Banking Migration",
    description:
      "Led migration of a Core Banking System used by 150+ banks from legacy stack to modern React architecture. Built reusable component libraries.",
    role: "Frontend",
    tech: ["React", "TypeScript", "CoreUI", "Redux", "AWS CodeArtifact"],
    highlights: [
      "Migrated system serving 150+ banks",
      "Reusable component libraries as npm packages",
      "Improved performance and scalability",
      "Support app reduced complaint retrieval by 20%",
    ],
  },
];
