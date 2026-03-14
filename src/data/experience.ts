export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  projects: {
    name: string;
    description: string;
  }[];
}

export const experiences: Experience[] = [
  {
    role: "Software Engineer",
    company: "Thinkitive Technologies Pvt. Ltd.",
    location: "Pune, India",
    period: "Nov 2024 – Present",
    highlights: [
      "Owned end-to-end frontend development for large-scale Healthcare SaaS platforms supporting EHR, RPM, RTM, and CCM workflows.",
      "Built 15+ complex multi-step dynamic forms using React Hook Form and Material UI, reducing manual data entry time by 30%.",
      "Implemented React Query caching and optimized API calls, reducing network requests by 40% and improving page load performance.",
      "Led reusable component architecture, significantly improving development speed and reducing duplicate code.",
      "Accelerated feature delivery by 25% using AI-assisted development tools (Claude Code, Cursor AI).",
    ],
    projects: [
      {
        name: "Primary Plus (EHR Platform)",
        description:
          "Large-scale EHR platform with 7-8 independent portals. Built patient management, charting (ICD-10), prescriptions, real-time messaging via Socket.IO, and HIPAA-aligned data handling.",
      },
      {
        name: "Unity Health Platform",
        description:
          "Production Healthcare SaaS for RPM/RTM/CCM workflows. Built care-plan workflows, billing modules, patient monitoring dashboards, and real-time communication using Twilio SDK.",
      },
    ],
  },
  {
    role: "Software Developer",
    company: "Sutradhar Project Consultancy Pvt. Ltd.",
    location: "Pune, India",
    period: "Jun 2023 – Oct 2024",
    highlights: [
      "Led the migration of a Core Banking System used by 150+ banks from legacy stack to React, improving performance and scalability.",
      "Developed reusable React component libraries and published them as internal npm packages using AWS CodeArtifact.",
      "Built the Admin Panel for Chitale CMDS (Milk Distribution System) including driver master, SKU master, rate cards, and access control.",
      "Engineered the Point of Purchase (POP) Admin Panel with MFA-based authentication.",
      "Designed and deployed a support application using CoreUI and Redux, reducing complaint retrieval time by 20%.",
    ],
    projects: [
      {
        name: "Core Banking Migration",
        description:
          "Migrated legacy banking system used by 150+ banks to React. Built reusable component libraries published as npm packages.",
      },
      {
        name: "Chitale CMDS & POP Admin Panel",
        description:
          "Admin panels for milk distribution and point-of-purchase management with MFA, role-based access, and order management.",
      },
    ],
  },
];
