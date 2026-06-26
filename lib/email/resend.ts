import { Resend } from "resend";

export async function sendLeadNotification(lead: {
  name: string;
  company?: string;
  email: string;
  phone: string;
  industry?: string;
  source?: string;
}) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!key || !to) return { skipped: true as const };
  const resend = new Resend(key);
  await resend.emails.send({
    from: "leads@simpleautomationlabs.com",
    to,
    subject: `New lead: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    text: [
      `Name: ${lead.name}`,
      `Company: ${lead.company ?? ""}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone}`,
      `Industry: ${lead.industry ?? ""}`,
      `Source: ${lead.source ?? ""}`,
    ].join("\n"),
  });
  return { skipped: false as const };
}
