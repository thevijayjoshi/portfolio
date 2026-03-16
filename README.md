# Vijay Joshi Portfolio

A personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

It showcases professional experience, featured projects, technical skills, and a working contact form powered by EmailJS.

## Features

- Responsive single-page portfolio layout
- Sections for hero, about, skills, experience, projects, and contact
- Smooth animated reveals with `framer-motion`
- Resume, GitHub, LinkedIn, email, and phone contact links
- EmailJS-powered contact form with validation, loading state, success state, and error handling
- Centralized content management through `src/data/*`

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- EmailJS Browser SDK

## Project Structure

```text
src/
  components/
    layout/
    sections/
    ui/
  context/
  data/
  lib/
```

Main content is rendered in [src/App.tsx](/c:/Users/Vijay%20Joshi/Desktop/Portfolio%20Website/portfolio/src/App.tsx#L1).

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

3. Build for production:

```bash
pnpm build
```

4. Preview the production build:

```bash
pnpm preview
```

## Content Updates

Update portfolio content from these files:

- Personal details and contact info: [src/data/profile.ts](/c:/Users/Vijay%20Joshi/Desktop/Portfolio%20Website/portfolio/src/data/profile.ts#L1)
- Projects: [src/data/projects.ts](/c:/Users/Vijay%20Joshi/Desktop/Portfolio%20Website/portfolio/src/data/projects.ts#L1)
- Experience: `src/data/experience.ts`
- Skills: `src/data/skills.ts`

## Contact Form Setup

The contact form uses EmailJS on the client side.

1. Create an EmailJS account and connect the inbox that should receive portfolio inquiries.
2. Create an email template for the contact form.
3. Use these template variables in EmailJS:
   - `from_name`
   - `from_email`
   - `message`
4. Copy [.env.example](/c:/Users/Vijay%20Joshi/Desktop/Portfolio%20Website/portfolio/.env.example#L1) to `.env.local`.
5. Replace the placeholder values in `.env.local` with:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
6. Restart the dev server after updating env vars.

If the env vars are missing, the form shows an inline configuration error in development and falls back to direct-contact guidance in production.

## Notes

- `.env.local` is ignored by git and is the correct place for your real EmailJS values.
- The current build may be affected by local/native dependency issues in the environment if Vite or Tailwind native packages fail to load.
