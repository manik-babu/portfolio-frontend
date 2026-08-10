import { z } from "zod";

/**
 * Single source of truth for "what a valid contact submission looks like."
 * Imported by both the client component (real-time field validation) and
 * the API route (server-side validation) so the two can never drift apart.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name (at least 2 characters).")
    .max(80, "Keep the name under 80 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Enter an email address.")
    .email("Enter a valid email address, like you@example.com."),
  subject: z
    .string()
    .trim()
    .min(4, "Give the message a short subject.")
    .max(120, "Keep the subject under 120 characters."),
  message: z
    .string()
    .trim()
    .min(20, "Say a bit more — at least 20 characters.")
    .max(2000, "Keep the message under 2000 characters."),
  // Honeypot: real visitors never see or fill this field (see the
  // `sr-only`/`tabIndex={-1}` field in ContactMe.tsx). Bots that
  // auto-fill every input will trip it, so it must stay empty.
  company: z
    .string()
    .max(0, "Spam check failed.")
    .optional()
    .or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
