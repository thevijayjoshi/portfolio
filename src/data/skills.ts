import type { LucideIcon } from "lucide-react";
import { Monitor, Database, Server, Radio, Sparkles, Blocks } from "lucide-react";

export type SkillColor = "blue" | "purple" | "green" | "orange" | "pink" | "cyan";

export interface SkillCategory {
  name: string;
  icon: LucideIcon;
  color: SkillColor;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    icon: Monitor,
    color: "blue",
    skills: [
      "React.js",
      "TypeScript",
      "JavaScript",
      "Next.js",
      "Material UI",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
    ],
  },
  {
    name: "State & Data",
    icon: Database,
    color: "purple",
    skills: ["Redux Toolkit", "React Query", "Context API", "Zustand"],
  },
  {
    name: "Backend",
    icon: Server,
    color: "green",
    skills: ["Node.js", "Express.js", "MongoDB"],
  },
  {
    name: "Real-Time",
    icon: Radio,
    color: "orange",
    skills: ["Socket.IO", "WebSockets", "Twilio SDK"],
  },
  {
    name: "AI & Dev Tools",
    icon: Sparkles,
    color: "pink",
    skills: [
      "Claude Code",
      "Cursor AI",
      "VS Code",
      "Git",
      "GitHub",
      "Postman",
      "Docker",
      "Vite",
    ],
  },
  {
    name: "Architecture",
    icon: Blocks,
    color: "cyan",
    skills: [
      "Reusable Components",
      "Dynamic Form Systems",
      "Multi-Tenant",
      "RBAC",
      "Microservices",
      "REST APIs",
    ],
  },
];
