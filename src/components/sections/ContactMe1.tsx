"use client";

import { useId, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { contactSchema, type ContactFormErrors, type ContactFormValues } from "@/lib/validation/contact";

type FieldName = keyof ContactFormValues;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

export interface ContactMeSocial {
  /** Short label, shown as `→ label` — e.g. "github", "linkedin", "resume". */
  label: string;
  href: string;
}

export interface ContactMeProps {
  heading?: string;
  description?: string;
  email?: string;
  location?: string;
  availability?: string;
  isAvailable?: boolean;
  socials?: ContactMeSocial[];
  /** Where the form POSTs to. Defaults to the bundled /api/contact route. */
  endpoint?: string;
  className?: string;
}

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

const MESSAGE_MAX = 2000;

const defaultSocials: ContactMeSocial[] = [
  { label: "github", href: "https://github.com/your-handle" },
  { label: "linkedin", href: "https://linkedin.com/in/your-handle" },
  { label: "resume", href: "/resume.pdf" },
];

function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

function IconPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

function IconArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

const fieldMeta: Record<
  "name" | "email" | "subject",
  { label: string; type: string; autoComplete: string; placeholder: string }
> = {
  name: { label: "Name", type: "text", autoComplete: "name", placeholder: "Ada Lovelace" },
  email: {
    label: "Email",
    type: "email",
    autoComplete: "email",
    placeholder: "ada@example.com",
  },
  subject: {
    label: "Subject",
    type: "text",
    autoComplete: "off",
    placeholder: "Full-stack contract, Q3",
  },
};

export default function ContactMe({
  heading = "Let's build something.",
  description = "Open to full-stack contract work, freelance projects, and full-time roles. Tell me what you're building and I'll reply within a couple of days.",
  email = "hello@yourname.dev",
  location = "Remote · GMT+6",
  availability = "Open to new projects",
  isAvailable = true,
  socials = defaultSocials,
  endpoint = "/api/contact",
  className = "",
}: ContactMeProps) {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>(
    "Fill out the form and I'll get back to you."
  );

  const formUid = useId();
  const isSubmitting = status === "submitting";

  const statusTag = useMemo(() => {
    switch (status) {
      case "submitting":
        return "SENDING";
      case "success":
        return "SENT";
      case "error":
        return "ERROR";
      default:
        return "READY";
    }
  }, [status]);

  function validate(nextValues: ContactFormValues): ContactFormErrors {
    const result = contactSchema.safeParse(nextValues);
    if (result.success) return {};
    const fieldErrors: ContactFormErrors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as FieldName;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return fieldErrors;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    // Only re-validate live once the user has already left the field once —
    // this avoids flashing "required" errors while they're mid-first-keystroke.
    if (touched[name as FieldName]) {
      setErrors(validate(nextValues));
    }
  }

  function handleBlur(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(values));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setTouched({ name: true, email: true, subject: true, message: true });

    const validation = contactSchema.safeParse(values);
    if (!validation.success) {
      setErrors(validate(values));
      setStatus("error");
      setStatusMessage("Fix the highlighted fields and try again.");
      return;
    }

    // Honeypot tripped: pretend success and drop the submission silently,
    // so bots don't learn that they've been caught.
    if (values.company) {
      setStatus("success");
      setStatusMessage("Message sent. I'll reply within a couple of days.");
      setValues(initialValues);
      setTouched({});
      return;
    }

    setStatus("submitting");
    setStatusMessage("Sending your message…");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message ?? "Something went wrong on the server.");
      }

      setStatus("success");
      setStatusMessage("Message sent. I'll reply within a couple of days.");
      setValues(initialValues);
      setTouched({});
      setErrors({});
    } catch (err) {
      setStatus("error");
      setStatusMessage(
        err instanceof Error ? err.message : "Couldn't send that. Try again in a moment."
      );
    }
  }

  function fieldId(name: FieldName) {
    return `${formUid}-${name}`;
  }
  function errorId(name: FieldName) {
    return `${formUid}-${name}-error`;
  }

  return (
    <section
      className={`bg-[var(--cm-bg)] text-[var(--cm-text)] ${className}`}
      aria-labelledby={`${formUid}-heading`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 sm:px-8 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-[var(--cm-border)] lg:px-10">
        {/* Form column */}
        <div className="lg:col-span-3 lg:pr-14">
          <p className="font-mono text-xs tracking-wide text-[var(--cm-accent)]">
            {"<ContactMe />"}
          </p>
          <h2
            id={`${formUid}-heading`}
            className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl"
          >
            {heading}
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--cm-muted)]">
            {description}
          </p>

          <form
            noValidate
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
            aria-describedby={`${formUid}-status`}
          >
            {/* Honeypot — hidden from sighted and screen-reader users, but
                present in the DOM so bots that blanket-fill forms trip it. */}
            <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor={fieldId("company")}>Company</label>
              <input
                id={fieldId("company")}
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.company}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {(["name", "email"] as const).map((name) => (
                <Field
                  key={name}
                  meta={fieldMeta[name]}
                  name={name}
                  value={values[name]}
                  error={touched[name] ? errors[name] : undefined}
                  fieldId={fieldId(name)}
                  errorId={errorId(name)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                />
              ))}
            </div>

            <Field
              meta={fieldMeta.subject}
              name="subject"
              value={values.subject}
              error={touched.subject ? errors.subject : undefined}
              fieldId={fieldId("subject")}
              errorId={errorId("subject")}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />

            <div>
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor={fieldId("message")}
                  className="text-sm font-medium text-[var(--cm-text)]"
                >
                  Message
                </label>
                <span className="font-mono text-xs text-[var(--cm-muted)]">
                  {values.message.length} / {MESSAGE_MAX}
                </span>
              </div>
              <textarea
                id={fieldId("message")}
                name="message"
                rows={6}
                maxLength={MESSAGE_MAX}
                placeholder="What are you building, and how can I help?"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                aria-invalid={touched.message && Boolean(errors.message)}
                aria-describedby={touched.message && errors.message ? errorId("message") : undefined}
                className={`mt-2 w-full resize-none rounded-md border bg-[var(--cm-surface)] px-3.5 py-2.5 text-[15px] text-[var(--cm-text)] outline-none transition placeholder:text-[var(--cm-muted)] focus:ring-2 focus:ring-[var(--cm-accent)] focus:ring-offset-2 focus:ring-offset-[var(--cm-bg)] disabled:opacity-60 ${touched.message && errors.message
                  ? "border-[var(--cm-danger)]"
                  : "border-[var(--cm-border)]"
                  }`}
              />
              {touched.message && errors.message ? (
                <p
                  id={errorId("message")}
                  role="alert"
                  className="mt-1.5 text-sm text-[var(--cm-danger)]"
                >
                  {errors.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-md bg-[var(--cm-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--cm-on-accent)] transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--cm-accent)] focus:ring-offset-2 focus:ring-offset-[var(--cm-bg)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending…" : "Send message"}
              {!isSubmitting && <IconArrow className="h-4 w-4" />}
            </button>

            {/* Status bar — a small nod to an editor's status line: a
                colored state dot plus a machine-readable tag, doubling as
                the form's accessible live region. */}
            <div
              id={`${formUid}-status`}
              role="status"
              aria-live="polite"
              className="flex items-center gap-2.5 border-t border-[var(--cm-border)] pt-4 font-mono text-xs"
            >
              <span
                className={`h-2 w-2 rounded-full ${status === "submitting"
                  ? "animate-pulse bg-[var(--cm-accent)]"
                  : status === "success"
                    ? "bg-[var(--cm-success)]"
                    : status === "error"
                      ? "bg-[var(--cm-danger)]"
                      : "bg-[var(--cm-muted)]"
                  }`}
                aria-hidden="true"
              />
              <span className="tracking-wider text-[var(--cm-muted)]">[{statusTag}]</span>
              <span className="text-[var(--cm-text)]">{statusMessage}</span>
            </div>
          </form>
        </div>

        {/* Contact details column */}
        <div className="lg:col-span-2 lg:pl-14">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span
              className={`h-2 w-2 rounded-full ${isAvailable ? "bg-[var(--cm-success)]" : "bg-[var(--cm-muted)]"
                }`}
              aria-hidden="true"
            />
            <span className="text-[var(--cm-muted)]">{availability}</span>
          </div>

          <dl className="mt-8 space-y-5">
            <div>
              <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[var(--cm-muted)]">
                <IconMail className="h-3.5 w-3.5" /> Email
              </dt>
              <dd className="mt-1.5">
                <a
                  href={`mailto:${email}`}
                  className="text-[15px] font-medium text-[var(--cm-text)] underline decoration-[var(--cm-border)] underline-offset-4 transition hover:decoration-[var(--cm-accent)]"
                >
                  {email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[var(--cm-muted)]">
                <IconPin className="h-3.5 w-3.5" /> Location
              </dt>
              <dd className="mt-1.5 text-[15px] text-[var(--cm-text)]">{location}</dd>
            </div>
          </dl>

          {socials.length > 0 && (
            <ul className="mt-8 space-y-1 border-t border-[var(--cm-border)] pt-6">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1.5 py-1 font-mono text-sm text-[var(--cm-muted)] transition hover:text-[var(--cm-accent)]"
                  >
                    <span aria-hidden="true">→</span>
                    {social.label}
                    <IconArrow className="h-3 w-3 -translate-y-px opacity-0 transition group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  meta,
  name,
  value,
  error,
  fieldId,
  errorId,
  onChange,
  onBlur,
  disabled,
}: {
  meta: { label: string; type: string; autoComplete: string; placeholder: string };
  name: FieldName;
  value: string;
  error?: string;
  fieldId: string;
  errorId: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}) {
  return (
    <div>
      <label htmlFor={fieldId} className="text-sm font-medium text-[var(--cm-text)]">
        {meta.label}
      </label>
      <input
        id={fieldId}
        name={name}
        type={meta.type}
        autoComplete={meta.autoComplete}
        placeholder={meta.placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2 w-full rounded-md border bg-[var(--cm-surface)] px-3.5 py-2.5 text-[15px] text-[var(--cm-text)] outline-none transition placeholder:text-[var(--cm-muted)] focus:ring-2 focus:ring-[var(--cm-accent)] focus:ring-offset-2 focus:ring-offset-[var(--cm-bg)] disabled:opacity-60 ${error ? "border-[var(--cm-danger)]" : "border-[var(--cm-border)]"
          }`}
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-[var(--cm-danger)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
