"use server";

import { leadSchema, type LeadInput } from "./schema";
import { getServiceClient } from "@/lib/db/supabase";
import { sendLeadNotification } from "@/lib/email/resend";

export async function createLead(
  raw: LeadInput,
): Promise<{ ok: boolean; error?: string }> {
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }
  const lead = parsed.data;

  try {
    const dbConfigured =
      !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (dbConfigured) {
      const { error } = await getServiceClient()
        .from("leads")
        .insert({ ...lead, status: "new" });
      if (error) {
        return { ok: false, error: "We could not save your request. Please call us." };
      }
    } else {
      // No database configured yet. Log so nothing is lost in the meantime.
      console.info("[lead] received (no DB configured):", lead.email, lead.phone);
    }
    await sendLeadNotification(lead);
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please call us." };
  }
}
