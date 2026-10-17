# Vijay Joshi — Portfolio

Personal portfolio at **[vijayjoshi.vercel.app](https://vijayjoshi.vercel.app)**, built with React 19, TypeScript, Vite, Tailwind CSS 4 and Framer Motion. Deployed on Vercel from `master`.

## Scripts

```bash
pnpm install
pnpm dev       # local dev server
pnpm build     # type-check + production build
pnpm check     # sanity checks for the "Ask about me" keyword matching
```

## Editing content

All text lives in `src/data/`; components only render it.

| File | What it holds |
|---|---|
| `profile.ts` | Name, title, summary, contact links, stats, story, highlights, resume files |
| `experience.ts` | Roles and which projects belong to each |
| `projects.ts` | Project write-ups (also the targets of "Case study" and "See …" links) |
| `skills.ts` | Skill groups and alternative spellings used for matching |
| `assistant.ts` | "Ask about me" answers, keywords, and the job-description match word lists |

Resumes are served from `public/resume.pdf` (full-stack) and `public/resume-frontend.pdf` (frontend). To update one, copy the new PDF over the same file name.

## "Ask about me"

A scripted chat (`src/components/Assistant.tsx`): pre-written answers chosen by keyword match, a "does he know X" check against the skills list, and a keyword match for pasted job descriptions. No AI and no network calls, so it costs nothing to run. Opens with the Ask buttons or Ctrl/⌘ + K.

## Contact form (EmailJS, free plan)

1. Create a free account at [emailjs.com](https://www.emailjs.com) and connect the inbox that should receive messages (Email Services).
2. Create a template that uses `{{from_name}}`, `{{from_email}}` and `{{message}}`, and set its **Reply To** to `{{from_email}}`.
3. Under Account → Security, allow only `vijayjoshi.vercel.app` (and `localhost` for testing).
4. Add these in Vercel → Project → Settings → Environment Variables, then redeploy:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

For local testing, put the same three values in `.env.local` (git-ignored; see `.env.example`).
