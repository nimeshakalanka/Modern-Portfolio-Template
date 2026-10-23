import { z } from "zod";

export const MESSAGE_MAX = 2000;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(80, "Please keep your name under 80 characters."),
  email: z.string().trim().min(1, "Please enter your email address.").pipe(z.email("Please enter a valid email address.")),
  message: z
    .string()
    .trim()
    .min(10, "Please write a message of at least 10 characters.")
    .max(MESSAGE_MAX, `Please keep your message under ${MESSAGE_MAX} characters.`),
  botcheck: z.string().optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactValues = z.output<typeof contactSchema>;
