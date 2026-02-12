import { z } from "zod";

// This schema defines the structure of the data we want to extract from the phone call transcript
export const CallSchema = z.object({
  intent: z.enum([
    "appointment_booking",
    "prescription_refill",
    "billing_question",
    "urgent_medical_issue",
    "lab_results",
    "other",
  ]),
  name: z.string().nullable(),
  dob: z.string().nullable(),
  phone: z.string().nullable(),
  summary: z.string(),
  urgency: z.enum(["low", "medium", "high"]),
});

export type CallOutput = z.infer<typeof CallSchema>;
