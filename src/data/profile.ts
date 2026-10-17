export const profile = {
  name: "Vijay Joshi",
  title: "Software Engineer (Full Stack)",
  status: "Leading full-stack work on a behavioral-health EHR",
  taglines: [
    "EHR · telehealth · billing",
    "React + TypeScript frontends",
    "NestJS · PostgreSQL · Kafka",
    "Multi-tenant SaaS with RBAC",
    "Generative AI on AWS Bedrock",
  ],
  summary:
    "I build production healthcare SaaS for US providers: EHR, telehealth and revenue cycle management. 3+ years in, with frontend depth in React and TypeScript and backend ownership in NestJS microservices on PostgreSQL, MongoDB and Kafka.",
  email: "vijaymjoshi04@gmail.com",
  phone: "+91 70666 76446",
  location: "Pune, India",
  linkedin: "https://linkedin.com/in/the-vijay-joshi",
  github: "https://github.com/thevijayjoshi",
  photo: "/vijay-photo.webp",
  resumes: [
    { label: "Full-stack resume", href: "/resume.pdf", file: "Vijay_Joshi_Full_Stack_Developer.pdf" },
    { label: "Frontend resume", href: "/resume-frontend.pdf", file: "Vijay_Joshi_Frontend_Engineer.pdf" },
  ],
} as const;

export const stats = [
  { value: 3, suffix: "+", label: "years shipping production software" },
  { value: 4, suffix: "", label: "US healthcare products built" },
  { value: 150, suffix: "+", label: "banks on the core banking platform I worked on" },
  { value: 6000, suffix: "+", label: "commits across Thinkitive repositories" },
] as const;

export const story = [
  "I graduated in Mechanical Engineering in 2022 and taught myself software engineering.",
  "My first role was on a React-based core banking system used by 150+ banks. Since November 2024 I've been at Thinkitive building US healthcare products: four so far, frontend first and full stack since January 2026.",
  "Today I lead technical work across frontend and backend on WellQor Compass, a multi-tenant behavioral-health EHR, and mentor the developers on the team.",
] as const;

export const education = "B.E. Mechanical Engineering · Savitribai Phule Pune University · 2022 · CGPA 8.47";

export const highlights = [
  { title: "Above & Beyond Award", text: "Thinkitive, 2025, for ownership and delivery." },
  { title: "#1 contributor", text: "On all three WellQor Compass repositories." },
  { title: "Mentoring", text: "Guiding 3+ developers across frontend and backend." },
  { title: "Discovery → delivery", text: "Took a new EHR from discovery calls and estimates into active development." },
] as const;
