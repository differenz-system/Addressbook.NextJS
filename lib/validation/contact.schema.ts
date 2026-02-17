import { z } from "zod";

export const ContactSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(6, "Invalid phone number"),
});

export const ContactInputSchema = ContactSchema.omit({ id: true });

export type Contact = z.infer<typeof ContactSchema>;
export type ContactInput = z.infer<typeof ContactInputSchema>;
