# Portfolio Website

## EmailJS contact form setup

1. Create an EmailJS account and connect the inbox that should receive portfolio inquiries.
2. Create an email template for the contact form.
3. Use these template variables in EmailJS:
   - `from_name`
   - `from_email`
   - `message`
4. Copy [.env.example](/c:/Users/Vijay%20Joshi/Desktop/Portfolio%20Website/portfolio/.env.example) to `.env.local` and replace the placeholder values with your EmailJS IDs:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
5. Restart `pnpm dev` after updating `.env.local`.

If the env vars are missing, the contact form will show an inline configuration error in development and fall back to direct contact guidance in production.
