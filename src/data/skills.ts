export interface SkillGroup {
  name: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Redux Toolkit", "React Query", "Zustand", "Material UI", "Tailwind CSS", "Shadcn UI", "Radix UI", "React Hook Form", "Zod"],
  },
  { name: "Backend", skills: ["Node.js", "NestJS", "Express.js", "REST APIs", "Microservices", "OpenAPI", "Orval", "TypeORM"] },
  { name: "Data & messaging", skills: ["PostgreSQL", "MongoDB", "Redis", "Kafka", "NATS", "Socket.IO", "WebSockets"] },
  { name: "AI", skills: ["Generative AI", "AWS Bedrock", "OpenAI", "Prompt engineering", "Claude Code", "Cursor"] },
  { name: "Cloud & DevOps", skills: ["AWS SES", "AWS S3", "AWS CodeArtifact", "Docker", "NGINX", "CI/CD", "Sentry", "OpenTelemetry"] },
  { name: "Auth & security", skills: ["OAuth 2.0 / OIDC", "Keycloak", "Auth0", "JWT", "RBAC", "Multi-tenancy", "Audit logging", "HIPAA"] },
  { name: "Integrations", skills: ["Stripe", "Authorize.Net", "Twilio", "Zoom Meeting SDK", "Jitsi", "Zoho CRM"] },
  { name: "Testing & tools", skills: ["Jest", "Vitest", "React Testing Library", "Playwright", "Git", "Postman", "Agile / Scrum"] },
];

/**
 * Other spellings to look for when matching a skill against text (project write-ups, pasted job descriptions).
 * Terms containing capitals match case-sensitively ("REST" is not "rest"); all-lowercase terms match any case.
 */
export const skillAliases: Record<string, string[]> = {
  React: ["react.js", "reactjs"],
  "Next.js": ["nextjs"],
  TypeScript: ["typescript", "TS"],
  JavaScript: ["javascript", "JS", "ES6"],
  "Redux Toolkit": ["Redux", "redux"],
  "React Query": ["TanStack", "react query"],
  "Material UI": ["MUI", "material ui"],
  "Tailwind CSS": ["Tailwind", "tailwind"],
  "Shadcn UI": ["shadcn"],
  "Radix UI": ["Radix"],
  "Node.js": ["node", "nodejs"],
  NestJS: ["Nest.js", "nestjs"],
  "Express.js": ["express.js", "expressjs"],
  "REST APIs": ["REST", "RESTful", "rest api"],
  Microservices: ["microservices", "microservice"],
  OpenAPI: ["Swagger", "openapi"],
  PostgreSQL: ["Postgres", "postgres", "postgresql", "SQL"],
  MongoDB: ["mongodb", "mongo"],
  Kafka: ["kafka"],
  "Socket.IO": ["socket.io"],
  WebSockets: ["WebSocket", "websocket", "websockets"],
  "Generative AI": ["generative ai", "GenAI", "LLM", "LLMs", "large language model"],
  "AWS Bedrock": ["Bedrock"],
  OpenAI: ["GPT", "ChatGPT"],
  "Prompt engineering": ["prompt engineering", "prompting"],
  "Claude Code": ["Claude"],
  "AWS SES": ["SES"],
  "AWS S3": ["S3"],
  "AWS CodeArtifact": ["CodeArtifact"],
  NGINX: ["Nginx", "nginx"],
  "CI/CD": ["ci/cd"],
  OpenTelemetry: ["OTel"],
  "OAuth 2.0 / OIDC": ["OAuth", "OIDC", "OpenID Connect", "SSO"],
  RBAC: ["role-based access"],
  "Multi-tenancy": ["multi-tenant", "multitenant", "multi tenant", "multi-tenancy"],
  "Audit logging": ["audit log", "audit logs", "audit logging", "audit trail"],
  "Zoom Meeting SDK": ["Zoom SDK"],
  "Zoho CRM": ["Zoho"],
  "React Testing Library": ["Testing Library"],
  "Agile / Scrum": ["agile", "scrum"],
};
