"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "@phosphor-icons/react";
import { leadSchema, type LeadInput } from "@/lib/leads/schema";
import { createLead } from "@/lib/leads/actions";

const inputCls =
  "mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-ink outline-none transition focus:border-cobalt focus:ring-2 focus:ring-cobalt/20";

export function LeadForm({
  source = "site",
  industry,
}: {
  source?: string;
  industry?: string;
}) {
  const [done, setDone] = useState(false);
  const [software, setSoftware] = useState("ServiceTitan");
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({ resolver: zodResolver(leadSchema) });

  async function onSubmit(values: LeadInput) {
    setServerError(null);
    const res = await createLead({
      ...values,
      source,
      industry,
      message: `Uses ${software}`,
    });
    if (res.ok) setDone(true);
    else setServerError(res.error ?? "Something went wrong. Please call us.");
  }

  if (done) {
    return (
      <div className="py-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle weight="fill" className="text-3xl" />
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold text-ink">Request received.</h3>
        <p className="mt-2 text-ink/65">
          We will reach out within one business day to set a time.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink">Full name</label>
          <input id="name" {...register("name")} className={inputCls} placeholder="Dustin Vargas" />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-ink">Company</label>
          <input id="company" {...register("company")} className={inputCls} placeholder="Northline Heating and Air" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink">Email</label>
          <input id="email" type="email" {...register("email")} className={inputCls} placeholder="you@company.com" />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-ink">Phone</label>
          <input id="phone" type="tel" {...register("phone")} className={inputCls} placeholder="(612) 555-0199" />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="software" className="block text-sm font-medium text-ink">Which software do you use?</label>
        <select id="software" value={software} onChange={(e) => setSoftware(e.target.value)} className={inputCls}>
          <option>ServiceTitan</option>
          <option>Housecall Pro</option>
          <option>Jobber</option>
          <option>GoHighLevel</option>
          <option>Salesforce</option>
          <option>HubSpot</option>
          <option>Something else</option>
          <option>None yet</option>
        </select>
      </div>
      {serverError && <p className="text-sm text-red-600">{serverError}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-cobalt px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-cobalt-dark active:scale-[0.99] disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Request my demo"}
      </button>
      <p className="text-center text-xs text-ink/45">
        By submitting, you agree to be contacted about a demo. We never share your details.
      </p>
    </form>
  );
}
