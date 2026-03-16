import { type ChangeEvent, type FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Github,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { profile } from "@/data/profile";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type SubmitStatus =
  | { type: "idle"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const initialFormValues: FormValues = {
  name: "",
  email: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? "",
};

const missingEmailJsVars = (
  [
    ["VITE_EMAILJS_SERVICE_ID", emailJsConfig.serviceId],
    ["VITE_EMAILJS_TEMPLATE_ID", emailJsConfig.templateId],
    ["VITE_EMAILJS_PUBLIC_KEY", emailJsConfig.publicKey],
  ] as const
)
  .filter(([, value]) => !value)
  .map(([key]) => key);

function validateForm(values: FormValues) {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please add a short message.";
  }

  return errors;
}

export function Contact() {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setFormErrors((currentErrors) => {
      if (!currentErrors[name as keyof FormValues]) {
        return currentErrors;
      }

      return {
        ...currentErrors,
        [name]: undefined,
      };
    });

    if (submitStatus.type !== "idle") {
      setSubmitStatus({ type: "idle", message: "" });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const errors = validateForm(formValues);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitStatus({
        type: "error",
        message: "Please fix the highlighted fields and try again.",
      });
      return;
    }

    if (missingEmailJsVars.length > 0) {
      setSubmitStatus({
        type: "error",
        message: import.meta.env.DEV
          ? `EmailJS is not configured yet. Add ${missingEmailJsVars.join(", ")} to your .env.local file.`
          : "This contact form is not configured right now. Please use email or LinkedIn instead.",
      });
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    setSubmitStatus({ type: "idle", message: "" });

    try {
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: formValues.name.trim(),
          from_email: formValues.email.trim(),
          message: formValues.message.trim(),
        },
        {
          publicKey: emailJsConfig.publicKey,
        },
      );

      setFormValues(initialFormValues);
      setSubmitStatus({
        type: "success",
        message: "Thanks for reaching out. Your message has been sent successfully.",
      });
    } catch {
      setSubmitStatus({
        type: "error",
        message:
          "Something went wrong while sending your message. Please try again or contact me by email or LinkedIn.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-section-alt py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeading
            title="Get in Touch"
            subtitle="Have a project in mind or want to chat? Reach out!"
          />
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-foreground">
                Let's work together
              </h3>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>

              <div className="space-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-primary"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light">
                    <Mail size={16} className="text-primary" />
                  </div>
                  {profile.email}
                </a>
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-primary"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light">
                    <Phone size={16} className="text-primary" />
                  </div>
                  {profile.phone}
                </a>
                <div className="flex items-center gap-3 text-sm text-muted">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  {profile.location}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-card-border text-muted transition-colors hover:text-primary"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-card-border text-muted transition-colors hover:text-primary"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-xl border border-card-border bg-card p-5 sm:p-6"
              noValidate
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formValues.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(formErrors.name)}
                  aria-describedby={formErrors.name ? "contact-name-error" : undefined}
                  className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                {formErrors.name ? (
                  <p id="contact-name-error" className="mt-1.5 text-xs text-red-500">
                    {formErrors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formValues.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(formErrors.email)}
                  aria-describedby={formErrors.email ? "contact-email-error" : undefined}
                  className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                {formErrors.email ? (
                  <p id="contact-email-error" className="mt-1.5 text-xs text-red-500">
                    {formErrors.email}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={formValues.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(formErrors.message)}
                  aria-describedby={
                    formErrors.message ? "contact-message-error" : undefined
                  }
                  className="w-full resize-none rounded-lg border border-card-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                {formErrors.message ? (
                  <p
                    id="contact-message-error"
                    className="mt-1.5 text-xs text-red-500"
                  >
                    {formErrors.message}
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gradient-start to-gradient-end px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              {submitStatus.type !== "idle" ? (
                <p
                  className={`text-center text-xs ${
                    submitStatus.type === "success"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {submitStatus.message}
                </p>
              ) : null}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
