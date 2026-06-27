import { describe, it, expect, vi, beforeEach } from "vitest";

process.env.SUPABASE_URL = "https://x.supabase.co";
process.env.SUPABASE_SERVICE_ROLE_KEY = "service-key";

const { insert, notify } = vi.hoisted(() => ({
  insert: vi.fn().mockResolvedValue({ error: null }),
  notify: vi.fn().mockResolvedValue({ skipped: false }),
}));

vi.mock("@/lib/db/supabase", () => ({
  getServiceClient: () => ({ from: () => ({ insert }) }),
}));
vi.mock("@/lib/email/resend", () => ({ sendLeadNotification: notify }));

import { createLead } from "@/lib/leads/actions";

describe("createLead", () => {
  beforeEach(() => {
    insert.mockClear();
    notify.mockClear();
  });

  it("returns error on invalid input and does not insert", async () => {
    const res = await createLead({ name: "", email: "bad", phone: "" });
    expect(res.ok).toBe(false);
    expect(insert).not.toHaveBeenCalled();
  });

  it("inserts and notifies on valid input", async () => {
    const res = await createLead({
      name: "Dana Reyes",
      email: "dana@x.com",
      phone: "612-555-0199",
      industry: "hvac",
    });
    expect(res.ok).toBe(true);
    expect(insert).toHaveBeenCalledOnce();
    expect(notify).toHaveBeenCalledOnce();
  });
});
