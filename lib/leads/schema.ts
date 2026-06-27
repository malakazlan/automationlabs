import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  company: z.string().optional(),
  email: z.email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone"),
  industry: z.string().optional(),
  source: z.string().optional(),
  message: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
