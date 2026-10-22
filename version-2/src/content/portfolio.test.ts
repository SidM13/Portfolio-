import { describe, expect, it } from "vitest";
import { CREDENTIAL_DETAILS, EDUCATION, EXPERIENCE, METRICS, NAV, NAV_MORE, OVERVIEW, PROJECT_DETAILS } from "./portfolio";
import { PROJECTS } from "./portfolio-details";

describe("Portfolio facts", () => {
  it("retains the MBA timeline and GPA", () => {
    const mba = EDUCATION.find(entry => entry.school === "New York Institute of Technology");
    expect(mba).toMatchObject({ date: "Jan 2026 – Mar 2027", gpa: "3.8 / 4.0", current: true, place: "Vancouver, Canada" });
  });
  it("retains the completed Northeastern timeline and GPA", () => {
    expect(EDUCATION.find(entry => entry.school === "Northeastern University")).toMatchObject({ date: "Sep 2021 – Apr 2023", gpa: "3.8 / 4.0" });
  });
  it("retains the BBA timeline and GPA", () => {
    expect(EDUCATION.find(entry => entry.school === "The NorthCap University")).toMatchObject({ date: "Jul 2018 – Jun 2021", gpa: "3.0 / 4.0" });
  });
  it("retains all six roles and their dates", () => {
    expect(EXPERIENCE.map(entry => entry.date)).toEqual(["Jul 2026 – Present", "May 2023 – Oct 2025", "Jan 2022 – Apr 2023", "Feb 2021 – Apr 2021", "May 2020 – Jul 2020", "May 2020 – Jun 2020"]);
  });
  it("keeps the ONGC outcome limited to a reusable framework", () => {
    expect(PROJECTS.find(project => project.org === "ONGC")?.impact).toBe("A reusable framework for governance and reporting.");
  });
  it("keeps the four concrete proof metrics", () => {
    expect(METRICS.map(metric => metric.value)).toEqual(["500+", "5+", "3", "4"]);
    expect(METRICS.map(metric => metric.label)).toEqual([
      "Premium audits delivered",
      "Years across audit, operations, project delivery, and marketing",
      "Geographies: U.S., Canada, India",
      "Core credentials: CSM, CSPO, SAFe, Six Sigma",
    ]);
  });
  it("keeps the recruiter overview positioning, status, and targets", () => {
    expect(OVERVIEW.positioning).toBe("Business Operations & Transformation professional");
    expect(OVERVIEW.status).toBe("MBA candidate at NYIT Vancouver");
    expect(OVERVIEW.capabilities).toEqual(["Premium Audit", "Project Management", "Business Analysis", "Digital Marketing", "AI-Enabled Transformation"]);
    expect(OVERVIEW.targets).toHaveLength(6);
    expect(OVERVIEW.proof).toHaveLength(4);
  });
  it("features the three delivery case studies first and retains all five projects", () => {
    expect(PROJECTS).toHaveLength(5);
    expect(PROJECTS.filter(project => project.featured).map(project => project.org)).toEqual(["EXL Service", "ONGC", "Toshiba Water Solutions"]);
    expect(PROJECTS.filter(project => !project.featured).map(project => project.org)).toEqual(["AITMC", "Self-Initiated"]);
    expect(PROJECT_DETAILS).toHaveLength(5);
    expect(PROJECT_DETAILS[3]?.tools).toContain("Google Analytics");
    expect(PROJECT_DETAILS[4]?.tools).toContain("Lovable");
  });
  it("distinguishes formal certifications from course completions", () => {
    expect(CREDENTIAL_DETAILS.slice(0, 4).every(cert => cert.kind === "Certification")).toBe(true);
    expect(CREDENTIAL_DETAILS.slice(4).map(cert => cert.kind)).toEqual(["Executive Education", "Course Completion"]);
  });
  it("keeps every resume bullet across all six roles", () => {
    expect(EXPERIENCE.map(entry => entry.bullets.length)).toEqual([5, 5, 5, 5, 5, 5]);
  });
  it("keeps recruiter navigation primary and the rest in the More menu", () => {
    expect(NAV.map(item => item.id)).toEqual(["home", "overview", "experience", "projects", "education", "skills", "contact"]);
    expect(NAV_MORE.map(item => item.id)).toEqual(["about", "expertise", "alignment", "insights"]);
    expect(NAV_MORE.find(item => item.id === "alignment")?.label).toBe("What I Bring");
  });
});
