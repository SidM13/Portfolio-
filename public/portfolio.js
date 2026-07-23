document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[style*="opacity:0"]').forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "none";
  });

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
