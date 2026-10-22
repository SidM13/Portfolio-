import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Download, Mail, Phone, Linkedin, Github, Menu, X, MapPin, ShieldCheck, Workflow, Sparkles, Target, Check, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EDUCATION, EMAIL, EXPERIENCE, METRICS, NAV, NAV_MORE, OVERVIEW, RESUME, ROLE_LABEL, LINKEDIN, PHONE, PORTFOLIO, ROLE_LOGOS, SCHOOL_LOGOS, CREDENTIAL_DETAILS, PROJECT_DETAILS, ENRICHMENT_LABELS, LEARNING_LABELS, INSIGHT_DETAILS } from "@/content/portfolio";
import { PORTFOLIO_ASSETS } from "@/content/portfolio-assets";
import { ContactDraftForm } from "@/components/contact-draft";
import { ALIGNMENT, ENRICHMENT, FOCUS, INSIGHTS, LEARNING, PILLARS, PROJECTS, ROLE_TAGS, SKILLS } from "@/content/portfolio-details";

const TITLE = "Siddharth Manchanda — MBA Candidate | Project Management, Audit & Digital Transformation";
const DESC = "Siddharth Manchanda, MBA candidate at NYIT Vancouver and project professional with five years across premium audit, operations, delivery, and AI-enabled transformation.";
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Siddharth Manchanda",
  jobTitle: ROLE_LABEL,
  email: `mailto:${EMAIL}`,
  telephone: "+1-236-339-3276",
  url: PORTFOLIO,
  sameAs: [LINKEDIN, PORTFOLIO],
  address: { "@type": "PostalAddress", addressLocality: "Vancouver", addressRegion: "BC", addressCountry: "CA" },
  alumniOf: EDUCATION.map(entry => ({ "@type": "EducationalOrganization", name: entry.school })),
  knowsAbout: OVERVIEW.capabilities,
};
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE }, { name: "description", content: DESC },
      { property: "og:title", content: TITLE }, { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" }, { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE }, { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(PERSON_JSON_LD) }],
  }),
  component: Index,
});
const ICONS = [Target, Workflow, ShieldCheck, Sparkles];
const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" };
const VISIBLE_BULLETS = 3;

function Section({ id, number, label, title, children }: { id: string; number: string; label: string; title: string; children: ReactNode }) {
  return <section id={id} aria-labelledby={`${id}-h`} className="border-t border-border py-16 md:py-24">
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <header className="mb-10 grid gap-5 md:grid-cols-[220px_1fr] md:gap-12">
        <p className="eyebrow flex items-start gap-3 pt-2"><span className="font-mono text-highlight">{number}</span>{label}</p>
        <h2 id={`${id}-h`} className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      </header>
      {children}
    </div>
  </section>;
}
function Chips({ items }: { items: string[] }) {
  return <ul className="flex flex-wrap gap-2">{items.map(item => <li key={item} className="border border-border px-2.5 py-1 text-xs text-muted-foreground">{item}</li>)}</ul>;
}
function Logo({ asset, name }: { asset: string; name: string }) {
  const src = PORTFOLIO_ASSETS[asset];
  return <span className="logo-slot">{src ? <img src={src} alt={`${name} logo`} loading="lazy" width="64" height="64" /> : <span className="font-display text-xs font-bold">{name.split(" ").map(word => word[0]).slice(0, 3).join("")}</span>}</span>;
}
function LearningList({ items, enrichment = false }: { items: { school: string; course: string; date: string }[]; enrichment?: boolean }) {
  return <ul className="grid gap-4 md:grid-cols-3">{items.map((item, index) => <li key={item.course} className="border border-border bg-card p-5">
    <div className="flex items-center gap-4"><Logo asset={SCHOOL_LOGOS[item.school] ?? ""} name={item.school} /><p className="text-xs text-muted-foreground">{enrichment ? ENRICHMENT_LABELS[index]?.type : LEARNING_LABELS[index]}</p></div>
    <h4 className="mt-5 text-lg font-semibold">{item.school}</h4>
    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">{item.course.replace(/^Student (program|exchange) · /, "").split("; ").map(course => <li key={course}>{course}</li>)}</ul>
    {enrichment && <p className="mt-3 text-xs text-muted-foreground">{ENRICHMENT_LABELS[index]?.during}</p>}
    <p className="mt-5 border-t border-border pt-3 font-mono text-xs text-muted-foreground">{item.date}</p>
  </li>)}</ul>;
}
function ValueEcosystem() {
  return <div id="value-ecosystem" className="mt-14 border-t border-border pt-10">
    <p className="eyebrow">Personal Brand · Value Ecosystem</p>
    <h3 className="mt-4 max-w-2xl text-2xl font-bold md:text-3xl">Where three disciplines meet — and where I create the most value.</h3>
    <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
      <div className="ecosystem-map" role="img" aria-label="Financial Consulting, Project and Operations, and Strategy and AI overlap around Siddharth, integrating into Business Transformation.">
        <div className="ecosystem-disc ecosystem-finance"><span>Financial<br />Consulting</span></div>
        <div className="ecosystem-disc ecosystem-operations"><span>Project &amp;<br />Operations</span></div>
        <div className="ecosystem-disc ecosystem-strategy"><span>Strategy &amp; AI</span></div>
        <div className="ecosystem-center"><span className="font-mono text-xs text-highlight">SIDDHARTH</span><strong>Business<br />Transformation</strong></div>
      </div>
      <div><p className="mb-6 text-lg leading-relaxed">Transforming business performance through the integration of Finance, Operations, Strategy &amp; AI.</p>
        <ul className="space-y-3">{[{ title: "Financial Consulting", copy: "Auditing, P&L analysis, decision support.", icon: ShieldCheck }, { title: "Project & Operations", copy: "Agile delivery, process design, governance.", icon: Workflow }, { title: "Strategy & AI", copy: "Digital transformation, AI adoption, growth strategy.", icon: Sparkles }].map(item => <li key={item.title} className="flex gap-4 border-l-2 border-primary bg-card p-4"><item.icon className="h-5 w-5 shrink-0 text-highlight" aria-hidden /><div><h4 className="font-semibold">{item.title}</h4><p className="mt-1 text-sm text-muted-foreground">{item.copy}</p></div></li>)}</ul>
      </div>
    </div>
  </div>;
}
function ProjectCard({ project, index, featured }: { project: (typeof PROJECTS)[number]; index: number; featured: boolean }) {
  const detail = PROJECT_DETAILS[index];
  return <AccordionItem value={`project-${index}`} className={`border border-border bg-card p-5 md:p-6 ${featured ? "border-t-2 border-t-primary" : ""}`}>
    <p className="eyebrow">{project.org} / {project.category}</p><h3 className="mt-4 text-xl font-bold">{project.title}</h3>
    <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground"><p><span className="font-semibold text-foreground">Problem · </span>{project.problem}</p><p><span className="font-semibold text-foreground">Approach · </span>{project.approach}</p></div>
    <p className="mb-3 mt-5 font-mono text-xs text-muted-foreground">TOOLS</p><Chips items={detail?.tools ?? []} />
    <div className="mt-5 border-l-2 border-primary bg-accent p-4"><p className="font-mono text-xs text-foreground">IMPACT</p><p className="mt-2 text-sm leading-relaxed">{project.impact}</p></div>
    <AccordionTrigger aria-label={`View details: ${project.title}`} className="mt-2 gap-3 hover:text-highlight hover:no-underline"><span className="detail-label"><span className="detail-closed">View details</span><span className="detail-open">Hide details</span><span className="sr-only"> — {project.title}</span></span></AccordionTrigger>
    <AccordionContent forceMount className="accordion-body"><div className="space-y-5 border-t border-border pt-5">{[{ label: "Context", copy: detail?.context }, { label: "Objective", copy: detail?.objective }, { label: "Approach", copy: detail?.approach }].map(item => <div key={item.label}><h4 className="mb-2 text-sm font-semibold">{item.label}</h4><p className="text-sm leading-relaxed text-muted-foreground">{item.copy}</p></div>)}</div></AccordionContent>
    <div className="border-t border-border pt-4"><Chips items={detail?.tags ?? []} /></div>
  </AccordionItem>;
}
function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <div aria-hidden ref={ref} className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left scale-x-0 bg-highlight motion-reduce:hidden" />;
}

function Index() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }); }, { rootMargin: "-20% 0px -65% 0px" });
    [...NAV, ...NAV_MORE].forEach(item => { const el = document.getElementById(item.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); document.getElementById("menu-toggle")?.focus(); } };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  const featured = PROJECTS.map((project, index) => ({ project, index })).filter(item => item.project.featured);
  const additional = PROJECTS.map((project, index) => ({ project, index })).filter(item => !item.project.featured);

  return <>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
    <ProgressBar />
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <nav aria-label="Primary" className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-5 px-5 md:px-8">
        <Button asChild variant="ghost" className="h-auto shrink-0 rounded-none px-0 hover:bg-transparent"><a href="#home" aria-label="Siddharth Manchanda home" onClick={() => setOpen(false)}><span className="identity-monogram"><img src={PORTFOLIO_ASSETS["sm-monogram.png"]} alt="SM monogram" width="40" height="40" /></span><span className="hidden text-sm font-semibold sm:inline">Siddharth Manchanda</span></a></Button>
        <ul className="hidden items-center gap-4 text-sm xl:flex">{NAV.map(item => <li key={item.id}><Button asChild variant="ghost" className={`h-auto rounded-none px-0 py-1 hover:bg-transparent hover:text-highlight ${active === item.id ? "text-highlight" : "text-muted-foreground"}`}><a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}>{item.label}</a></Button></li>)}<li className="relative"><details className="nav-more"><summary className="cursor-pointer py-2 text-muted-foreground">More</summary><ul className="absolute right-0 top-full w-44 border border-border bg-background p-3">{NAV_MORE.map(item => <li key={item.id}><Button asChild variant="ghost" className={`w-full justify-start rounded-none ${active === item.id ? "text-highlight" : ""}`}><a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} onClick={event => event.currentTarget.closest("details")?.removeAttribute("open")}>{item.label}</a></Button></li>)}</ul></details></li></ul>
        <Button asChild variant="outline" className="hidden rounded-none xl:inline-flex"><a href={RESUME} download><Download aria-hidden />Resume</a></Button>
        <span className="ml-auto text-sm font-semibold sm:hidden">Siddharth Manchanda</span>
        <Button id="menu-toggle" size="icon" variant="ghost" className="shrink-0 xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </nav>
      {open && <nav id="mobile-nav" aria-label="Mobile" className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border px-5 py-4 xl:hidden"><ul className="grid grid-cols-2 gap-x-5">{[...NAV, ...NAV_MORE].map(item => <li key={item.id}><Button asChild variant="ghost" className="h-auto w-full justify-start rounded-none px-0 py-3 text-lg"><a href={`#${item.id}`} onClick={() => setOpen(false)}>{item.label}</a></Button></li>)}</ul><Button asChild variant="outline" className="mt-3 rounded-none"><a href={RESUME} download><Download aria-hidden />Download resume</a></Button></nav>}
    </header>
    <main id="main">
      <section id="home" aria-labelledby="hero-h" className="relative mx-auto max-w-6xl px-5 pb-8 pt-8 md:px-8 md:pb-18 md:pt-20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <p className="eyebrow max-w-xl leading-relaxed">MBA Candidate · Project Management · Audit · Digital Transformation</p>
          <p className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5 text-highlight" aria-hidden />Vancouver, Canada</p>
        </div>
        <p className="mt-6 font-display text-lg font-semibold md:mt-9">Siddharth Manchanda<span className="text-highlight"> /</span></p>
        <p className="mt-3 w-fit border border-primary px-3 py-1.5 font-mono text-xs uppercase text-primary">{ROLE_LABEL}</p>
        <h1 id="hero-h" className="mt-4 max-w-5xl text-3xl font-extrabold leading-[1.08] sm:mt-5 sm:text-5xl lg:text-7xl">Building clarity across <span className="text-highlight">audit, operations,</span> and <span className="hero-emphasis">AI-enabled transformation.</span></h1>
        <div className="mt-6 flex flex-col justify-between gap-4 md:mt-8 md:flex-row md:items-end md:gap-6">
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">Siddharth Manchanda — MBA candidate and project professional with five years across premium audit, delivery, and operations in the U.S., Canada, and India.</p>
          <Button asChild variant="ghost" className="h-auto w-fit rounded-none px-0 text-muted-foreground hover:bg-transparent hover:text-highlight"><a href={LINKEDIN} {...EXTERNAL}><Linkedin aria-hidden />LinkedIn<ArrowUpRight aria-hidden /></a></Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
          <Button asChild className="h-12 rounded-none px-6 font-semibold hover:bg-primary/90"><a href="#projects">View Projects<ArrowDown aria-hidden /></a></Button>
          <Button asChild variant="outline" className="h-12 rounded-none px-6 font-semibold"><a href="#contact">Contact Me<ArrowUpRight aria-hidden /></a></Button>
          <Button asChild variant="ghost" className="h-12 rounded-none px-4 text-muted-foreground"><a href={RESUME} download><Download aria-hidden />Resume</a></Button>
        </div>
      </section>
      <section aria-label="Key results" className="border-y border-primary bg-card">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
          {METRICS.map(metric => <li key={metric.value} className="border-border p-5 even:border-l md:p-8 lg:border-l lg:first:border-l-0"><p className="font-display text-4xl font-extrabold">{metric.value}<span className="ml-2 text-lg text-highlight">/</span></p><p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{metric.label}</p></li>)}
        </ul>
      </section>
      <Section id="overview" number="01" label="Recruiter Overview" title="The sixty-second version.">
        <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
          <div className="bg-background p-6 md:p-8">
            <p className="eyebrow">Positioning</p>
            <p className="mt-4 text-2xl font-bold leading-snug">{OVERVIEW.positioning}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 shrink-0 text-highlight" aria-hidden />{OVERVIEW.status}</p>
            <p className="mb-3 mt-7 font-mono text-xs text-muted-foreground">SUPPORTING CAPABILITIES</p>
            <Chips items={OVERVIEW.capabilities} />
            <p className="mb-3 mt-7 font-mono text-xs text-muted-foreground">TARGET OPPORTUNITIES</p>
            <Chips items={OVERVIEW.targets} />
          </div>
          <div className="bg-background p-6 md:p-8">
            <p className="eyebrow">Strongest proof</p>
            <ul className="mt-4 space-y-3">{OVERVIEW.proof.map(item => <li key={item} className="flex gap-3 leading-relaxed"><Check className="mt-1 h-4 w-4 shrink-0 text-highlight" aria-hidden />{item}</li>)}</ul>
            <p className="mb-3 mt-7 font-mono text-xs text-muted-foreground">QUICK LINKS</p>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {[{ label: "Experience", href: "#experience" }, { label: "Featured Case Studies", href: "#projects" }, { label: "Skills", href: "#skills" }, { label: "Education & Credentials", href: "#education" }, { label: "Contact", href: "#contact" }].map(link => <li key={link.label}><Button asChild variant="outline" className="h-auto w-full justify-start rounded-none px-3 py-2.5 font-normal"><a href={link.href}>{link.label}</a></Button></li>)}
              <li><Button asChild className="h-auto w-full justify-start rounded-none px-3 py-2.5 font-normal hover:bg-primary/90"><a href={RESUME} download><Download aria-hidden />Resume</a></Button></li>
            </ul>
          </div>
        </div>
      </Section>
      <Section id="about" number="02" label="About" title="At the intersection of audit, operations, and digital transformation.">
        <div className="md:ml-[268px]"><p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">MBA candidate at NYIT Vancouver, with an M.S. in Project Management from Northeastern and a BBA from The NorthCap University. Five years across professional roles and internships in premium audit, delivery, and operations—including 500+ audits at EXL Service, an operational framework for ONGC, and project planning for Toshiba Water Solutions. Interests span consulting, audit, operations excellence, and AI-enabled transformation, informed by Stanford executive learning in AI and business models.</p>
          <ul aria-label="Credentials" className="mt-7 grid gap-2 sm:grid-cols-2">{CREDENTIAL_DETAILS.slice(0, 5).map(cert => <li key={cert.title} className="flex items-center gap-3 border border-border bg-card px-4 py-3 text-sm"><ShieldCheck className="h-4 w-4 shrink-0 text-highlight" aria-hidden />{cert.title}</li>)}</ul></div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">{FOCUS.map((focus, index) => { const Icon = [ShieldCheck, Workflow, Sparkles][index] ?? Sparkles; return <div key={focus.title} className="border border-border border-t-2 border-t-primary bg-card p-6"><Icon className="mb-4 h-6 w-6 text-highlight" aria-hidden /><h3 className="text-lg font-bold">{focus.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{focus.copy}</p></div>; })}</div>
      </Section>
      <Section id="expertise" number="03" label="Core Expertise" title="A four-pillar framework for business transformation.">
        <p className="mb-7 max-w-3xl text-lg leading-relaxed text-muted-foreground">Each pillar maps to capabilities I bring into financial consulting and project engagements — integrated, not siloed.</p>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{PILLARS.map((pillar, index) => { const Icon = ICONS[index] ?? Target; return <div key={pillar.title} className="bg-background p-6"><div className="flex items-center justify-between"><Icon className="h-6 w-6 text-highlight" aria-hidden /><span className="font-mono text-xs text-muted-foreground">0{index + 1}</span></div><h3 className="mt-6 text-xl font-bold">{pillar.title}</h3><ul className="mt-5 space-y-3 text-sm text-muted-foreground">{pillar.items.map(item => <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul></div>; })}</div>
        <ValueEcosystem />
      </Section>
      <Section id="experience" number="04" label="Experience" title="Five years. Three geographies. A connected perspective.">
        <Accordion type="multiple" asChild><ol className="border-l border-primary md:ml-5">{EXPERIENCE.map((entry, index) => {
          const visible = entry.bullets.slice(0, VISIBLE_BULLETS);
          const rest = entry.bullets.slice(VISIBLE_BULLETS);
          return <li key={entry.org} className="relative pb-6 pl-5 last:pb-0 md:pl-8"><span aria-hidden className={`absolute -left-[5px] top-2 h-2.5 w-2.5 ${entry.current ? "bg-highlight" : "bg-primary"}`} />
            <AccordionItem value={`role-${index}`} asChild><article className="border border-border bg-card p-5 md:p-7"><div className="mb-5 flex items-center gap-4"><Logo asset={ROLE_LOGOS[index] ?? ""} name={entry.org} /><div className="min-w-0"><p className="font-mono text-xs leading-relaxed text-muted-foreground">{entry.date} · {entry.place}</p><h3 className="text-xl font-bold md:text-2xl">{entry.org}</h3></div></div><p className="mt-2 font-semibold">{entry.role}{entry.current && <span className="ml-3 text-xs text-highlight">CURRENT</span>}</p><ul className="mt-5 space-y-2.5">{visible.map(bullet => <li key={bullet} className="relative pl-4 leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-3 before:h-px before:w-2 before:bg-primary">{bullet}</li>)}</ul>
              {rest.length > 0 && <>
                <AccordionTrigger aria-label={`View full experience: ${entry.org}`} className="mt-3 gap-3 hover:text-highlight hover:no-underline"><span className="detail-label"><span className="detail-closed">View full experience ({rest.length} more)</span><span className="detail-open">Show less</span><span className="sr-only"> — {entry.org}</span></span></AccordionTrigger>
                <AccordionContent forceMount className="accordion-body"><ul className="space-y-2.5 border-t border-border pt-5">{rest.map(bullet => <li key={bullet} className="relative pl-4 leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-3 before:h-px before:w-2 before:bg-primary">{bullet}</li>)}</ul></AccordionContent>
              </>}
              <div className="mt-5"><Chips items={ROLE_TAGS[index] ?? []} /></div></article></AccordionItem>
          </li>;
        })}</ol></Accordion>
      </Section>
      <Section id="projects" number="05" label="Selected Projects" title="From business challenges to structured delivery.">
        <h3 className="mb-5 text-lg font-bold">Featured Case Studies</h3>
        <Accordion type="multiple" className="grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">{featured.map(item => <ProjectCard key={item.project.title} project={item.project} index={item.index} featured />)}</Accordion>
        <h3 className="mb-5 mt-12 border-t border-border pt-8 text-lg font-bold">Additional Work</h3>
        <Accordion type="multiple" className="grid items-start gap-5 md:grid-cols-2">{additional.map(item => <ProjectCard key={item.project.title} project={item.project} index={item.index} featured={false} />)}</Accordion>
      </Section>
      <Section id="education" number="06" label="Education & Credentials" title="A foundation in business. A commitment to learning.">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4"><h3 id="formal-education-title" className="text-lg font-bold">Degrees</h3><Button asChild variant="outline" className="rounded-none"><a href={RESUME} download><Download aria-hidden />Download Resume</a></Button></div>
        <ul className="grid gap-4 md:grid-cols-3">{EDUCATION.map((entry, index) => <li key={entry.school} className="border border-border bg-card p-5"><div className="flex items-center gap-4"><Logo asset={SCHOOL_LOGOS[entry.school] ?? ""} name={entry.school} /><p className="text-xs text-muted-foreground">{["MBA · In Progress", "Master’s Degree", "Bachelor’s Degree"][index]}</p></div><h4 className="mt-5 text-lg font-semibold">{entry.school}</h4><p className="mt-2 text-muted-foreground">{entry.degree}</p><p className="mt-3 text-sm text-muted-foreground">{entry.place}</p><p className="mt-5 border-t border-border pt-3 font-mono text-xs text-muted-foreground">{entry.date}</p><p className="mt-2 text-sm font-semibold">GPA {entry.gpa}</p></li>)}</ul>
        <h3 id="exchange-title" className="mb-5 mt-10 text-lg font-bold">Academic Exchange &amp; Student Programs</h3><LearningList items={ENRICHMENT} enrichment />
        <h3 id="credentials" className="mb-5 mt-10 text-lg font-bold">Professional Certifications</h3><ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{CREDENTIAL_DETAILS.map(cert => <li key={cert.title} className="flex items-center gap-4 border border-border bg-card p-5"><span className="grid h-12 w-12 shrink-0 place-items-center border border-primary font-display text-sm font-bold">{cert.code}</span><div><h4 className="font-semibold">{cert.title}</h4><p className="mt-1 text-xs text-muted-foreground">{cert.issuer}</p><p className={`mt-1.5 w-fit px-1.5 py-0.5 font-mono text-[10px] uppercase ${cert.kind === "Certification" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>{cert.kind}</p></div></li>)}</ul>
        <h3 id="continuous-title" className="mb-5 mt-10 text-lg font-bold">Executive &amp; Continuous Learning</h3><LearningList items={LEARNING} />
      </Section>
      <Section id="skills" number="07" label="Skills & Expertise" title="The tools and disciplines behind the work.">
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{SKILLS.map((skill, index) => <div key={skill.title} className="bg-background p-5"><h3 className="flex gap-3 text-base font-bold"><span className="pt-0.5 font-mono text-xs font-normal text-highlight">0{index + 1}</span>{skill.title}</h3><div className="mt-4"><Chips items={skill.items} /></div></div>)}</div>
      </Section>
      <Section id="alignment" number="08" label="Professional Alignment" title="Built for advisory thinking and hands-on execution.">
        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">Aligned with consulting, audit, business advisory, operations, and transformation roles—combining analytical rigor, structured delivery, and clear stakeholder communication.</p>
        <h3 className="mb-2 mt-9 text-lg font-bold">What I Bring</h3>
        <ol className="grid gap-x-10 md:grid-cols-2">{ALIGNMENT.map((item, index) => <li key={item.title} className="border-t border-border py-5"><h4 className="flex items-baseline gap-3 text-base font-semibold"><span className="font-mono text-xs font-normal text-highlight">{String(index + 1).padStart(2, "0")}</span>{item.title}</h4><p className="mt-2 pl-8 text-sm leading-relaxed text-muted-foreground">{item.copy}</p></li>)}</ol>
      </Section>
      <Section id="insights" number="09" label="Insights / Thought Leadership" title="Perspectives on better business performance.">
        <div className="grid gap-5 md:grid-cols-3">{INSIGHTS.map((insight, index) => <article key={insight} className="flex flex-col border border-border bg-card p-6"><div className="flex items-center justify-between"><BookOpen className="h-5 w-5 text-primary" aria-hidden /><span className="font-mono text-xs text-highlight">In Development</span></div><h3 className="my-7 text-xl font-bold leading-snug">{insight}</h3><p className="mb-6 text-sm leading-relaxed text-muted-foreground">{INSIGHT_DETAILS[index]?.description}</p><p className="mt-auto border-t border-border pt-4 text-xs text-muted-foreground">{INSIGHT_DETAILS[index]?.category}</p></article>)}</div>
        <Button asChild variant="ghost" className="mt-7 h-auto rounded-none px-0 hover:bg-transparent hover:text-highlight"><a href={LINKEDIN} {...EXTERNAL}><Linkedin aria-hidden />Follow on LinkedIn<ArrowUpRight aria-hidden /></a></Button>
      </Section>
      <section id="contact" aria-labelledby="contact-h" className="border-t border-primary bg-card py-16 md:py-24"><div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2"><div><p className="eyebrow"><span className="mr-3 text-highlight">10</span>Contact</p><h2 id="contact-h" className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">Let’s turn complexity<br className="hidden sm:block" /> into clarity<span className="text-highlight">.</span></h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">Open to consulting, audit, project management, and transformation opportunities.</p><p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-highlight" aria-hidden />Vancouver, BC · Available across Canada and the U.S.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild className="h-12 rounded-none px-6 font-semibold hover:bg-primary/90"><a href={`mailto:${EMAIL}`}><Mail aria-hidden />Email Me</a></Button>
          <Button asChild variant="outline" className="h-12 rounded-none px-6 font-semibold"><a href={LINKEDIN} {...EXTERNAL}><Linkedin aria-hidden />Connect on LinkedIn<ArrowUpRight aria-hidden /></a></Button>
        </div>
        <ul className="mt-10 grid border-t border-border sm:grid-cols-2">{[{ icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, ext: false }, { icon: Phone, label: "Phone", value: PHONE, href: "tel:+12363393276", ext: false }, { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/siddharthmspm", href: LINKEDIN, ext: true }, { icon: Github, label: "Portfolio", value: "sidm13.github.io", href: PORTFOLIO, ext: true }].map(contact => <li key={contact.label} className="min-w-0 border-b border-border sm:odd:border-r"><Button asChild variant="ghost" className="h-auto w-full justify-start whitespace-normal rounded-none px-4 py-6 sm:px-6"><a href={contact.href} {...(contact.ext ? EXTERNAL : {})}><contact.icon className="mr-2 shrink-0 text-highlight" aria-hidden /><span className="min-w-0 text-left"><span className="block text-xs font-normal text-muted-foreground">{contact.label}</span><span className="mt-1 block break-words">{contact.value}</span></span><ArrowUpRight className="ml-auto shrink-0" aria-hidden /></a></Button></li>)}</ul>
        <Button asChild variant="outline" className="mt-8 h-12 rounded-none px-6"><a href={RESUME} download><Download aria-hidden />Download resume (PDF)</a></Button></div><ContactDraftForm /></div>
      </div></section>
    </main>
    <footer className="border-t border-border"><div className="mx-auto max-w-6xl px-5 py-10 md:px-8"><div className="flex flex-col justify-between gap-7 sm:flex-row"><div><a href="#home" className="flex items-center gap-3 font-display text-lg font-bold"><span className="identity-monogram"><img src={PORTFOLIO_ASSETS["sm-monogram.png"]} alt="SM monogram" width="40" height="40" /></span>Siddharth Manchanda</a><p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">Project professional working at the intersection of audit, operations, and AI-enabled transformation. Clarity. Structure. Impact.</p></div><nav aria-label="Footer" className="flex flex-wrap items-start gap-5 text-sm"><a href="#contact" className="link-underline">Contact</a><a href={LINKEDIN} {...EXTERNAL} className="link-underline">LinkedIn</a><a href="#home" className="link-underline">Back to top ↑</a></nav></div><p className="mt-8 border-t border-border pt-5 text-xs text-muted-foreground">© 2026 Siddharth Manchanda</p></div></footer>
  </>;
}
