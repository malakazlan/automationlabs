/* Shared header, footer, and behaviors for the Direction D mockup set. */
(function () {
  const site = {
    name: "Simple Automation Labs",
    phoneDisplay: "(612) 555-1234",
    phoneHref: "tel:+16125551234",
    email: "hello@simpleautomationlabs.com",
    nav: [
      { label: "How it works", href: "how-it-works.html" },
      { label: "Industries", href: "industries.html" },
      { label: "Pricing", href: "pricing.html" },
      { label: "Demo", href: "book-a-demo.html" },
    ],
  };

  const navLinks = site.nav
    .map((n) => `<a href="${n.href}" class="transition-colors hover:text-ink">${n.label}</a>`)
    .join("");

  const headerHTML = `
  <div id="top-sentinel" class="absolute top-0 h-px w-full"></div>
  <header id="nav" class="fixed inset-x-0 top-0 z-50 transition-colors duration-300">
    <div class="mx-auto flex h-[70px] max-w-content items-center justify-between px-5 sm:px-8">
      <a href="home.html" class="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-ink">
        <span class="grid h-8 w-8 place-items-center rounded-lg bg-cobalt text-white"><i class="ph-fill ph-waveform text-lg"></i></span>
        ${site.name}
      </a>
      <nav class="hidden items-center gap-8 text-sm font-medium text-ink/65 lg:flex">${navLinks}</nav>
      <div class="flex items-center gap-3">
        <a href="${site.phoneHref}" class="hidden text-sm font-medium text-ink/65 transition-colors hover:text-ink sm:block"><i class="ph ph-phone align-middle"></i> ${site.phoneDisplay}</a>
        <a href="book-a-demo.html" class="btn rounded-xl bg-cobalt px-4 py-2.5 text-sm font-semibold text-white hover:bg-cobalt-dark">Book a demo</a>
        <button id="navToggle" class="lg:hidden" aria-label="Menu"><i class="ph ph-list text-2xl"></i></button>
      </div>
    </div>
    <div id="mobileMenu" class="hidden border-t border-ink/10 bg-paper px-5 py-4 lg:hidden">
      <nav class="flex flex-col gap-3 text-sm font-medium text-ink/80">${navLinks}</nav>
    </div>
  </header>`;

  const footerHTML = `
  <footer class="bg-ink pb-10 text-paper/55">
    <div class="mx-auto grid max-w-content gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <div class="flex items-center gap-2.5 font-display text-lg font-semibold text-paper">
          <span class="grid h-8 w-8 place-items-center rounded-lg bg-cobalt text-white"><i class="ph-fill ph-waveform"></i></span>
          ${site.name}
        </div>
        <p class="mt-4 max-w-xs text-sm leading-relaxed">AI voice agents for home-services businesses across the US. Answer every call, book every job.</p>
      </div>
      <div>
        <p class="text-sm font-semibold text-paper">Product</p>
        <ul class="mt-4 space-y-2.5 text-sm">
          <li><a href="how-it-works.html" class="hover:text-paper">How it works</a></li>
          <li><a href="industries.html" class="hover:text-paper">Industries</a></li>
          <li><a href="pricing.html" class="hover:text-paper">Pricing</a></li>
          <li><a href="book-a-demo.html" class="hover:text-paper">Book a demo</a></li>
        </ul>
      </div>
      <div>
        <p class="text-sm font-semibold text-paper">Contact</p>
        <ul class="mt-4 space-y-2.5 text-sm">
          <li><a href="mailto:${site.email}" class="hover:text-paper">${site.email}</a></li>
          <li><a href="${site.phoneHref}" class="hover:text-paper">${site.phoneDisplay}</a></li>
        </ul>
      </div>
    </div>
    <div class="mx-auto max-w-content border-t border-paper/10 px-5 pt-6 text-xs sm:px-8">© 2026 ${site.name}. All rights reserved.</div>
  </footer>`;

  function mount(id, html) {
    const el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }

  document.addEventListener("DOMContentLoaded", function () {
    mount("site-header", headerHTML);
    mount("site-footer", footerHTML);

    // Mobile menu
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("mobileMenu");
    if (toggle && menu) toggle.addEventListener("click", () => menu.classList.toggle("hidden"));

    // Scroll reveal
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // Nav solidify
    const nav = document.getElementById("nav");
    const sentinel = document.getElementById("top-sentinel");
    if (nav && sentinel) {
      const navIO = new IntersectionObserver(([e]) => {
        nav.classList.toggle("bg-paper/85", !e.isIntersecting);
        nav.classList.toggle("backdrop-blur", !e.isIntersecting);
        nav.classList.toggle("border-b", !e.isIntersecting);
        nav.classList.toggle("border-ink/10", !e.isIntersecting);
        nav.classList.toggle("shadow-sm", !e.isIntersecting);
      }, { rootMargin: "-70px 0px 0px 0px" });
      navIO.observe(sentinel);
    }

    // Subtle tilt (respect reduced motion)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && window.VanillaTilt) {
      window.VanillaTilt.init(document.querySelectorAll(".js-tilt"), {
        max: 6, speed: 500, glare: true, "max-glare": 0.12, scale: 1.01, gyroscope: false,
      });
    }

    // Voice agent overlay (Alexa-style demo preview)
    const overlay = document.createElement("div");
    overlay.className = "voice-overlay";
    overlay.id = "voiceOverlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Voice agent demo");
    overlay.innerHTML = `
      <div class="relative w-full max-w-md rounded-3xl border border-ink/10 bg-white p-8 text-center shadow-2xl">
        <button id="voiceClose" class="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink/50 hover:bg-ink/5" aria-label="Close"><i class="ph ph-x text-lg"></i></button>
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-dark">Talk to our agent</p>
        <h3 class="mt-2 font-display text-2xl font-semibold text-ink">Simple Automation Labs</h3>
        <div class="mt-7 flex justify-center"><div class="voice-orb"><div class="voice-core"><div class="voice-eq"><span></span><span></span><span></span><span></span><span></span></div></div></div></div>
        <p id="voiceStatus" class="mt-7 text-sm font-semibold text-cobalt-dark">Connecting</p>
        <p id="voiceLine" class="mx-auto mt-2 min-h-[52px] max-w-xs text-ink/70"></p>
        <button id="voiceEnd" class="btn mt-4 inline-flex items-center gap-2 rounded-xl border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink/30"><i class="ph ph-phone-x"></i> End demo</button>
        <p class="mt-5 text-xs text-ink/45">Preview of the live voice agent. Full two-way voice connects in the production site.</p>
      </div>`;
    document.body.appendChild(overlay);

    const vStatus = overlay.querySelector("#voiceStatus");
    const vLine = overlay.querySelector("#voiceLine");
    const script = [
      { s: "Speaking", t: "Hi, I am the Simple Automation Labs agent. Ask me how we handle your calls." },
      { s: "Listening", t: "How fast can you go live?" },
      { s: "Speaking", t: "Most HVAC teams are answering within 48 hours, with no change to your phone system." },
      { s: "Listening", t: "Does it book into ServiceTitan?" },
      { s: "Speaking", t: "Yes. It books the job into ServiceTitan while the caller is still on the line." },
    ];
    let timers = [];
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }
    function step(i) {
      if (i >= script.length) { vStatus.textContent = "Ready"; vLine.textContent = "Ask me anything."; overlay.classList.remove("listening"); return; }
      const turn = script[i];
      vStatus.textContent = turn.s;
      vLine.textContent = turn.t;
      overlay.classList.toggle("listening", turn.s === "Listening");
      timers.push(setTimeout(() => step(i + 1), 2800));
    }
    function openVoice(e) {
      if (e) e.preventDefault();
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
      vStatus.textContent = "Connecting";
      vLine.textContent = "";
      clearTimers();
      timers.push(setTimeout(() => step(0), 900));
    }
    function closeVoice() { overlay.classList.remove("open", "listening"); document.body.style.overflow = ""; clearTimers(); }

    overlay.querySelector("#voiceClose").addEventListener("click", closeVoice);
    overlay.querySelector("#voiceEnd").addEventListener("click", closeVoice);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) closeVoice(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeVoice(); });

    // Wire any "Hear the agent" / "Start voice demo" control to the overlay
    document.querySelectorAll("a, button").forEach((el) => {
      const label = (el.textContent || "").trim().toLowerCase();
      if (label.includes("hear the agent") || label.includes("start voice demo")) {
        el.addEventListener("click", openVoice);
      }
    });
  });
})();
