import type { Industry } from "../industry";

export const hvac: Industry = {
  slug: "hvac",
  name: "HVAC",
  published: true,
  seo: {
    title: "AI Receptionist for HVAC Companies",
    description:
      "An AI voice agent that answers every HVAC call in two rings, books the job into ServiceTitan, Jobber, or Housecall Pro, and works around the clock.",
  },
  hero: {
    eyebrow: "AI receptionist for HVAC",
    headline: "Never miss another HVAC call.",
    subhead:
      "Your AI agent answers in two rings, sounds human, and books the job into your CRM. Nights, weekends, and the busy season included.",
  },
  painStats: [
    { value: "27%", label: "of HVAC calls go unanswered. Industry estimate." },
    { value: "2", label: "rings to answer, every single time." },
    { value: "$1.5k", label: "average job value walking away." },
  ],
  problem: {
    heading: "In HVAC, the first company to answer usually wins the job.",
    body: "Heat waves and cold snaps bury your phones. Calls pile up after hours. Every missed call is a homeowner who dials the next contractor on the list.",
  },
  outcomes: [
    { metric: "11", caption: "jobs booked in week one. Illustrative." },
    { metric: "0", caption: "missed calls after going live." },
    { metric: "48h", caption: "from kickoff to answering." },
  ],
  integrations: ["ServiceTitan", "Housecall Pro", "Jobber", "Google Calendar"],
  faqs: [
    {
      q: "Does it work after hours and on weekends?",
      a: "Yes. The agent answers every hour of every day, including holidays and the busy season.",
    },
    {
      q: "Will it book into my CRM?",
      a: "Yes. It schedules the job into ServiceTitan, Housecall Pro, Jobber, or Google Calendar while the caller is still on the line.",
    },
    {
      q: "Can it transfer urgent calls to a person?",
      a: "Yes. You set the rules. Emergencies and complex jobs route straight to your on-call tech.",
    },
    {
      q: "How long does setup take?",
      a: "Most HVAC teams are live within 48 hours, with no changes to your phone system.",
    },
  ],
};
