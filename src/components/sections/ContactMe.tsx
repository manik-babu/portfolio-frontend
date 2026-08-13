"use client";

import { useCallback, useId, useRef, useState } from "react";
import { Phone } from "lucide-react"
import { sendEmail } from "@/actions/email";
/**
 * ContactMe
 * ---------------------------------------------------------------------------
 * Self-contained "Contact Me" section for a full-stack developer portfolio.
 *
 * - Two-column layout on lg+: form (left) / terminal-styled contact card (right)
 * - Real-time validation with accessible error messaging
 * - Honeypot spam trap (invisible "company" field)
 * - Calls POST /api/contact and surfaces loading / success / error states
 *
 * Usage:
 *   import { ContactMe } from "@/components/ContactMe";
 *   <ContactMe />
 *
 * Assumptions (adjust props/content to taste):
 *   - Contact details (email, location, links) are passed as props with
 *     sensible defaults so the component renders out of the box.
 *   - "Available for work" status is a boolean prop, not wired to a CMS.
 * ---------------------------------------------------------------------------
 */

type FieldName = "name" | "email" | "subject" | "message";

type FormState = Record<FieldName, string> & { company: string /* honeypot */ };

type FormErrors = Partial<Record<FieldName, string>>;

type SubmitStatus = "idle" | "loading" | "success" | "error";

export interface ContactMeProps {
  heading?: string;
  eyebrow?: string;
  description?: string;
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  location?: string;
  available?: boolean;
  socials?: { label: string; href: string }[];
  /** Endpoint the form posts to. Defaults to the included API route. */
  action?: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field: FieldName, value: string): string | undefined {
  const trimmed = value.trim();
  switch (field) {
    case "name":
      if (!trimmed) return "Enter your name.";
      if (trimmed.length < 2) return "Name must be at least 2 characters.";
      return undefined;
    case "email":
      if (!trimmed) return "Enter your email.";
      if (!EMAIL_PATTERN.test(trimmed)) return "Enter a valid email address.";
      return undefined;
    case "subject":
      if (!trimmed) return "Enter a subject.";
      if (trimmed.length < 3) return "Subject must be at least 3 characters.";
      return undefined;
    case "message":
      if (!trimmed) return "Enter a message.";
      if (trimmed.length < 10) return "Message must be at least 10 characters.";
      if (trimmed.length > 2000) return "Message must be under 2000 characters.";
      return undefined;
    default:
      return undefined;
  }
}

function validateAll(form: FormState): FormErrors {
  const errors: FormErrors = {};
  (["name", "email", "subject", "message"] as FieldName[]).forEach((field) => {
    const message = validateField(field, form[field]);
    if (message) errors[field] = message;
  });
  return errors;
}

function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function IconPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

function IconCopy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="m5 12 5 5 9-9" />
    </svg>
  );
}

function IconExternal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function IconSpinner(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="animate-spin" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity={0.25} />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function ContactMe({
  heading = "Let's build something",
  eyebrow = "// contact",
  description = "Have a project, a role, or just a gnarly bug you want a second pair of eyes on? Send a message and I'll get back to you within a couple of days.",
  name = "Md Manik Babu",
  role = "Full-Stack Web Developer",
  email = "manikbabu.dev@gmail.com",
  phone = "+8801571501672",
  location = "Remote — GMT+6",
  available = true,
  socials = [
    { label: "GitHub", href: "https://github.com/manik-babu" },
    { label: "LinkedIn", href: "https://linkedin.com/in/md-manik-babu" },
  ],
  action = "/api/contact",
}: ContactMeProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);


  const formStartedAt = useRef<number>(Date.now());
  const idPrefix = useId();

  const handleChange = useCallback(
    (field: FieldName) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      // Re-validate live once the field has been touched, so errors clear as the user fixes them.
      setTouched((prev) => {
        if (!prev[field]) return prev;
        setErrors((prevErrors) => ({ ...prevErrors, [field]: validateField(field, value) }));
        return prev;
      });
    },
    []
  );

  const handleBlur = useCallback(
    (field: FieldName) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({ ...prev, [field]: validateField(field, e.target.value) }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const nextErrors = validateAll(form);
      setErrors(nextErrors);
      setTouched({ name: true, email: true, subject: true, message: true });

      const firstInvalid = (["name", "email", "subject", "message"] as FieldName[]).find(
        (field) => nextErrors[field]
      );
      if (firstInvalid) {
        setStatus("error");
        setStatusMessage("Fix the highlighted fields and try again.");
        document.getElementById(`${idPrefix}-${firstInvalid}`)?.focus();
        return;
      }

      // Honeypot: real users never fill this in. Bots that fill every field will trip it.
      // Submissions completed in under 1.5s are also a strong bot signal.
      const elapsed = Date.now() - formStartedAt.current;
      if (form.company.trim() !== "" || elapsed < 1500) {
        // Fail silently/generic so bots don't learn the trap exists.
        setStatus("success");
        setStatusMessage("Thanks — your message is on its way.");
        setForm(EMPTY_FORM);
        setTouched({});
        return;
      }

      setStatus("loading");
      setStatusMessage("");

      try {
        const res = await sendEmail(form);

        if (!res.ok) {
          throw new Error("Something went wrong. Please try again.");
        }

        setStatus("success");
        setStatusMessage("Thanks — your message is on its way. I'll reply soon.");
        setForm(EMPTY_FORM);
        setTouched({});
        formStartedAt.current = Date.now();
      } catch (err) {
        setStatus("error");
        setStatusMessage(
          err instanceof Error ? err.message : "Couldn't send your message. Please try again."
        );
      }
    },
    [form, action, idPrefix]
  );

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — no-op, the email is still visible/selectable.
    }
  }, [email]);
  const handleCopyPhone = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setPhoneCopied(true);
      window.setTimeout(() => setPhoneCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — no-op, the email is still visible/selectable.
    }
  }, [phone]);

  const fieldError = (field: FieldName) => (touched[field] ? errors[field] : undefined);

  return (
    <section aria-labelledby={`${idPrefix}-heading`} id="contact">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeader />

        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border border-slate-200/80 dark:border-slate-700/50  lg:grid-cols-5">
          {/* Form */}
          <div className="bg-white/70 dark:bg-slate-900/60 p-6 sm:p-10 lg:col-span-3">
            <form noValidate onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field
                  id={`${idPrefix}-name`}
                  label="Name"
                  autoComplete="name"
                  value={form.name}
                  error={fieldError("name")}
                  onChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                  placeholder="Ada Lovelace"
                />
                <Field
                  id={`${idPrefix}-email`}
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  error={fieldError("email")}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholder="ada@example.com"
                />
              </div>

              <Field
                id={`${idPrefix}-subject`}
                label="Subject"
                autoComplete="off"
                value={form.subject}
                error={fieldError("subject")}
                onChange={handleChange("subject")}
                onBlur={handleBlur("subject")}
                placeholder="Freelance backend project"
              />

              <Field
                id={`${idPrefix}-message`}
                label="Message"
                as="textarea"
                rows={6}
                value={form.message}
                error={fieldError("message")}
                onChange={handleChange("message")}
                onBlur={handleBlur("message")}
                placeholder="Tell me a bit about what you're building and your timeline."
              />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" && <IconSpinner className="h-4 w-4" aria-hidden="true" />}
                  {status === "loading" ? "Sending…" : "Send message"}
                </button>

                <div aria-live="polite" className="min-h-[1.25rem] text-sm">
                  {status === "success" && (
                    <p className="flex items-center gap-1.5 font-medium text-emerald-700">
                      <IconCheck className="h-4 w-4" aria-hidden="true" />
                      {statusMessage}
                    </p>
                  )}
                  {status === "error" && (
                    <p role="alert" className="font-medium text-red-700">
                      {statusMessage}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Terminal-styled contact panel */}
          <aside className="flex flex-col justify-between bg-slate-950 p-6 text-slate-300 sm:p-10 lg:col-span-2">
            <div>
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" aria-hidden="true" />
                <span className="ml-2 font-mono text-xs text-slate-500">contact.sh</span>
              </div>

              <p className="mt-5 font-mono text-sm text-emerald-400">
                <span className="text-slate-500">~$</span> whoami
              </p>
              <p className="mt-1 text-lg font-semibold text-white">{name}</p>
              <p className="font-mono text-sm text-slate-400">{role}</p>

              {available && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-xs font-medium text-emerald-300">
                    Available for new projects
                  </span>
                </div>
              )}

              <div className="mt-8 space-y-4 font-mono text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2 text-slate-400">
                    <IconMail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{email}</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="shrink-0 rounded-md p-1.5 text-slate-500 transition hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    aria-label={emailCopied ? "Email copied" : "Copy email address"}
                  >
                    {emailCopied ? (
                      <IconCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    ) : (
                      <IconCopy className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2 text-slate-400">
                    <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{phone}</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="shrink-0 rounded-md p-1.5 text-slate-500 transition hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    aria-label={phoneCopied ? "Phone copied" : "Copy phone number"}
                  >
                    {phoneCopied ? (
                      <IconCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    ) : (
                      <IconCopy className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <IconPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{location}</span>
                </div>
              </div>
            </div>

            {socials.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-sm text-slate-400 underline-offset-4 transition hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    {s.label}
                    <IconExternal className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */

interface FieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  as?: "input" | "textarea";
  rows?: number;
}
function SectionHeader() {
  return (
    <div className="text-center mb-14 sm:mb-16">
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
      >
        Let's {" "}
        <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
          Build Something
        </span>
      </h2>

      <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Have a project, a role, or just a gnarly bug you want a second pair of eyes on? Send a message and I'll get back to you within a couple of days.
      </p>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  autoComplete,
  as = "input",
  rows,
}: FieldProps) {
  const errorId = `${id}-error`;
  const sharedClasses =
    "block w-full rounded-lg border border-slate-200/80 dark:border-slate-700/50 px-3.5 py-2.5 text-sm text-slate-900 transition placeholder:text-emerald-300!" +
    (error ? "border-red-400" : "border-slate-300 hover:border-slate-400");

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          rows={rows ?? 5}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={sharedClasses + " resize-y"}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={sharedClasses}
        />
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default ContactMe;
