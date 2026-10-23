"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, m } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { contactSchema, MESSAGE_MAX, type ContactInput, type ContactValues } from "@/lib/contact-schema";

const ENDPOINT = "https://api.web3forms.com/submit";

type Status = { state: "idle" } | { state: "success" } | { state: "error"; message: string };

const inputClass =
  "w-full rounded-[var(--radius-sm)] border bg-surface px-4 py-3 text-base text-fg placeholder:text-fg-muted " +
  "transition-[border-color,box-shadow] outline-none focus-visible:border-accent focus-visible:shadow-[0_0_0_4px_var(--accent-soft)]";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}

function Field({ id, label, error, hint, children }: FieldProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
        {hint}
      </div>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-danger">
          <AlertCircle aria-hidden className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const id = useId();
  const statusRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", message: "", botcheck: "" },
  });

  const messageLength = useWatch({ control, name: "message" })?.length ?? 0;

  useEffect(() => {
    if (status.state !== "idle") statusRef.current?.focus();
  }, [status]);

  const onSubmit = async ({ botcheck, ...values }: ContactValues) => {
    setStatus({ state: "idle" });

    if (botcheck) {
      reset();
      setStatus({ state: "success" });
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      setStatus({
        state: "error",
        message: `The contact form isn't set up yet. Please email me at ${profile.email} instead.`,
      });
      return;
    }

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New portfolio message from ${values.name}`,
          from_name: "Portfolio contact form",
          ...values,
        }),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;
      if (!response.ok || !result?.success) throw new Error(result?.message || "Request failed");

      reset();
      setStatus({ state: "success" });
    } catch {
      setStatus({
        state: "error",
        message: `Sorry, your message couldn't be sent. Please try again, or email me at ${profile.email}.`,
      });
    }
  };

  const describedBy = (field: keyof ContactInput) => (errors[field] ? `${id}-${field}-error` : undefined);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-describedby={`${id}-required`}
      className="rounded-[var(--radius-xl)] border border-line bg-surface p-6 shadow-card sm:p-8"
    >
      <h2 className="text-2xl font-bold">Send a message</h2>
      <p id={`${id}-required`} className="mt-1 text-sm text-fg-muted">
        All fields are required.
      </p>

      <div className="mt-6 space-y-5">
        <Field id={`${id}-name`} label="Name" error={errors.name?.message}>
          <input
            id={`${id}-name`}
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={cn(inputClass, errors.name ? "border-danger" : "border-line")}
            {...register("name")}
          />
        </Field>

        <Field id={`${id}-email`} label="Email" error={errors.email?.message}>
          <input
            id={`${id}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="jane@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={cn(inputClass, errors.email ? "border-danger" : "border-line")}
            {...register("email")}
          />
        </Field>

        <Field
          id={`${id}-message`}
          label="Message"
          error={errors.message?.message}
          hint={
            <span className={cn("text-sm tabular-nums", messageLength > MESSAGE_MAX ? "text-danger" : "text-fg-muted")}>
              {messageLength}/{MESSAGE_MAX}
            </span>
          }
        >
          <textarea
            id={`${id}-message`}
            rows={6}
            placeholder="Tell me about your project, role or idea…"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
            className={cn(inputClass, "min-h-36 resize-y", errors.message ? "border-danger" : "border-line")}
            {...register("message")}
          />
        </Field>

        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${id}-botcheck`}>Leave this field empty</label>
          <input id={`${id}-botcheck`} type="text" tabIndex={-1} autoComplete="off" {...register("botcheck")} />
        </div>
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-8 w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send aria-hidden className="size-4" /> Send message
          </>
        )}
      </Button>

      <div aria-live="polite" className="mt-6">
        <AnimatePresence mode="wait">
          {status.state !== "idle" && (
            <m.div
              key={status.state}
              ref={statusRef}
              tabIndex={-1}
              role={status.state === "error" ? "alert" : "status"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "flex items-start gap-3 rounded-[var(--radius-md)] border p-4 outline-none",
                status.state === "success" ? "border-success text-success" : "border-danger text-danger",
              )}
            >
              {status.state === "success" ? (
                <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0" />
              ) : (
                <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
              )}
              <p className="text-fg">
                {status.state === "success" ? (
                  <>
                    <strong className="font-semibold">Thanks, your message is on its way!</strong> {profile.responseTime}.
                  </>
                ) : (
                  status.message
                )}
              </p>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
