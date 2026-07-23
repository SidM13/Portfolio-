document.addEventListener("DOMContentLoaded", () => {
  const removeLegacyBadge = () => {
    document.querySelectorAll('#lovable-badge, [id*="lovable-badge"]').forEach((badge) => badge.remove());
  };
  removeLegacyBadge();
  const badgeObserver = new MutationObserver(removeLegacyBadge);
  badgeObserver.observe(document.body, { childList: true, subtree: true });

  const siteBase = window.location.pathname.startsWith("/Portfolio-") ? "/Portfolio-" : "";
  const assetBase = `${siteBase}/assets`;
  const redesignStyles = document.createElement("link");
  redesignStyles.rel = "stylesheet";
  redesignStyles.href = `${siteBase}/about-redesign.css`;
  document.head.appendChild(redesignStyles);

  document.querySelectorAll('[style*="opacity:0"]').forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "none";
  });

  const aboutSection = document.querySelector("#about");
  if (aboutSection) {
    const credentials = [
      "Certified Scrum Master (CSM)",
      "Certified Scrum Product Owner (CSPO)",
      "SAFe Agilist",
      "ASQ Six Sigma",
      "Stanford · AI for Business Models",
    ];
    aboutSection.className = "about-brief";
    aboutSection.innerHTML = `
      <div class="about-brief__inner">
        <div class="about-brief__eyebrow">About</div>
        <h2 class="about-brief__title">At the intersection of <span>audit, operations</span><br> and <em>digital transformation</em>.</h2>
        <div class="about-brief__rule"><span></span></div>

        <div class="about-brief__body">
          <p class="about-brief__bio">MBA candidate at NYIT Vancouver, with an M.S. in Project Management from Northeastern and a BBA from The NorthCap University. Five years across premium audit, delivery, and operations — including 500+ audits at EXL Service, an operational framework for ONGC, and project planning for Toshiba Water Solutions. Interests span consulting, audit, operations excellence, and AI-enabled transformation, informed by Stanford executive learning in AI and business models.</p>
          <div class="about-brief__credentials">
            <div class="about-brief__credentials-title">Credentials</div>
            <div class="about-brief__credential-grid">
              ${credentials.map((credential) => `<div class="about-brief__credential"><img src="${assetBase}/11cbe220267923c4.svg" alt=""><span>${credential}</span></div>`).join("")}
            </div>
          </div>
        </div>

        <div class="about-brief__pillars">
          <article class="about-brief__pillar">
            <div class="about-brief__icon"><img src="${assetBase}/03dc95de9e74058c.svg" alt=""></div>
            <div><h3>Audit &amp; Assurance</h3><p>500+ audits at EXL Service with a focus on quality, risk, and control effectiveness.</p></div>
          </article>
          <article class="about-brief__pillar">
            <div class="about-brief__icon about-brief__icon--teal"><img src="${assetBase}/1874da7b1d0f6f6f.svg" alt=""></div>
            <div><h3>Operations &amp; Delivery</h3><p>Designed operational frameworks for ONGC and led project planning for Toshiba Water Solutions.</p></div>
          </article>
          <article class="about-brief__pillar">
            <div class="about-brief__icon"><img src="${assetBase}/151a2cc95929fc7a.svg" alt=""></div>
            <div><h3>AI-Enabled Transformation</h3><p>Applying AI and business models to drive efficiency, insight, and sustainable impact across organizations.</p></div>
          </article>
        </div>
      </div>`;
  }

  const educationGrid = document.querySelector("#education .grid.sm\\:grid-cols-2.gap-4");
  if (educationGrid) {
    const combinedStanfordCard = [...educationGrid.querySelectorAll("article")].find((card) =>
      card.querySelector("h3")?.textContent.trim() === "Stanford University"
    );
    if (combinedStanfordCard) {
      combinedStanfordCard.querySelector("div").textContent = "Executive Program";
      combinedStanfordCard.querySelector("p").textContent = "Digital Media and Social Networks";
      combinedStanfordCard.querySelector("div:last-child").innerHTML = "<span>Jun 2022 – Aug 2022</span>";

      const stanfordAiPrograms = combinedStanfordCard.parentElement.cloneNode(true);
      stanfordAiPrograms.querySelector("article > div").textContent = "Executive Education · 3 Courses";
      stanfordAiPrograms.querySelector("p").innerHTML = "Harnessing AI to Transform Organizations · Build a Better Business Model · AI-Powered Go-to-Market Strategies for Business Growth";
      stanfordAiPrograms.querySelector("article > div:last-child").innerHTML = "<span>Jun 2025 – Nov 2025</span>";
      combinedStanfordCard.parentElement.insertAdjacentElement("afterend", stanfordAiPrograms);
    }

    const stanfordPrograms = document.createElement("div");
    stanfordPrograms.innerHTML = `
      <article class="h-full rounded-xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.07] hover:border-brand-teal/40 transition">
        <div class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-brand-teal">Stanford Programs</div>
        <h3 class="mt-3 font-display font-bold text-lg leading-snug">Stanford University</h3>
        <p class="mt-1.5 text-sm text-surface/70 leading-relaxed">Building the Future of Finance · Introduction to Python Programming</p>
        <div class="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-surface/60">
          <span>May 2026 – Aug 2026</span>
        </div>
      </article>`;
    educationGrid.appendChild(stanfordPrograms);

    const schoolLogoByName = {
      "New York Institute of Technology": "nyit.png",
      "Northeastern University": "northeastern.png",
      "The NorthCap University": "northcap.png",
      "Stanford University": "stanford.png",
      "UC Berkeley": "berkeley.svg",
    };
    educationGrid.querySelectorAll("article").forEach((card) => {
      const schoolName = card.querySelector("h3")?.textContent.trim();
      const logoFile = schoolLogoByName[schoolName];
      const label = card.querySelector("div");
      if (!logoFile || !label) return;
      label.querySelector("svg")?.remove();
      const logo = document.createElement("img");
      logo.src = `${assetBase}/universities/${logoFile}`;
      logo.alt = `${schoolName} logo`;
      logo.width = 28;
      logo.height = 28;
      logo.style.cssText = "width:28px;height:28px;object-fit:contain;background:#fff;border-radius:6px;padding:2px;flex:none";
      label.prepend(logo);
    });
  }

  const menuButton = document.querySelector('button[aria-label="Toggle menu"]');
  const desktopNav = document.querySelector("header nav");
  if (menuButton && desktopNav) {
    const mobileNav = document.createElement("nav");
    mobileNav.setAttribute("aria-label", "Mobile navigation");
    mobileNav.className = "fixed top-16 inset-x-0 z-40 bg-navy border-t border-white/10 px-6 py-5 lg:hidden";
    mobileNav.style.display = "none";
    mobileNav.innerHTML = `<div class="flex flex-col gap-4">${desktopNav.innerHTML}</div>`;
    document.body.appendChild(mobileNav);

    menuButton.addEventListener("click", () => {
      const isOpen = mobileNav.style.display !== "none";
      mobileNav.style.display = isOpen ? "none" : "block";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
    });

    mobileNav.addEventListener("click", () => {
      mobileNav.style.display = "none";
      menuButton.setAttribute("aria-expanded", "false");
    });
  }

  const details = [
    ["A high-volume premium audit pipeline spanning the United States and India required improved turnaround without compromising accuracy or regulatory compliance.", "Reduce audit cycle time and improve documentation quality across a multi-geography portfolio.", "Standardized review workflows on proprietary audit platforms, developed Excel models for 941 and P&L reconciliation, and introduced proactive coordination cadences with insureds and agents."],
    ["ONGC's Project Management division required a documented, end-to-end project governance framework spanning planning through closure.", "Codify a reusable operational playbook to standardize project governance across the division.", "Captured leading practices for planning, scheduling, execution, monitoring, control, and closure into a structured framework."],
    ["A new water treatment engagement required clearly defined scope, deliverables, and a unified source of truth for client status reporting.", "Establish a clear project management plan and consolidated reporting cadence.", "Analyzed requirements, defined deliverables, authored the plan, and structured client status reporting."],
    ["A multi-disciplinary professional background required a recruiter-ready, structured personal brand suitable for consulting and Big 4 audiences.", "Design and deliver a production-grade personal brand site using AI-enabled tooling.", "Used AI tooling to structure messaging, case studies, and ship a production-ready site."],
    ["AITMC lacked a coordinated digital presence across Facebook, LinkedIn, and Instagram.", "Establish a measurable baseline and improve audience engagement across channels.", "Executed channel-specific strategies and iterated using analytics."],
  ];

  document.querySelectorAll("button").forEach((button) => {
    if (button.textContent.trim() !== "View details") return;
    const buttons = [...document.querySelectorAll("button")].filter((item) => item.textContent.trim() === "View details");
    const index = buttons.indexOf(button);
    const content = details[index];
    if (!content) return;
    const panel = document.createElement("dl");
    panel.className = "mt-5 grid gap-3 border-t border-border pt-5 text-sm";
    panel.hidden = true;
    panel.innerHTML = `<div><dt class="font-semibold text-navy">Context</dt><dd class="mt-1 text-muted-foreground">${content[0]}</dd></div><div><dt class="font-semibold text-navy">Objective</dt><dd class="mt-1 text-muted-foreground">${content[1]}</dd></div><div><dt class="font-semibold text-navy">Approach</dt><dd class="mt-1 text-muted-foreground">${content[2]}</dd></div>`;
    button.insertAdjacentElement("afterend", panel);
    button.addEventListener("click", () => {
      panel.hidden = !panel.hidden;
      button.textContent = panel.hidden ? "View details" : "Hide details";
      button.setAttribute("aria-expanded", String(!panel.hidden));
    });
  });
});
