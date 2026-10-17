export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  points?: string[];
  /** Project ids (see projects.ts) built in this role. */
  products?: string[];
}

export const experiences: Experience[] = [
  {
    id: "exp-thinkitive",
    role: "Software Engineer (Full Stack)",
    company: "Thinkitive Technologies",
    location: "Pune, India",
    period: "Nov 2024 – Present",
    summary:
      "Healthcare SaaS for US providers. Four products so far, frontend first and full stack since January 2026. Above & Beyond Award (2025).",
    products: ["case-compass", "case-everbetter", "case-primaryplus", "case-unity"],
  },
  {
    id: "exp-sutradhar",
    role: "Software Developer",
    company: "Sutradhar Project Consultancy",
    location: "Pune, India",
    period: "Jul 2023 – Oct 2024",
    summary: "Fintech and enterprise web apps in React.",
    points: [
      "Worked on a multi-tenant Core Banking System built on React and Redux, used by 150+ banks across India.",
      "Built reusable React component libraries, published as internal npm packages via AWS CodeArtifact.",
      "Built admin panels with MFA login and role-based access, including the Chitale CMDS milk-distribution admin panel.",
    ],
  },
];
