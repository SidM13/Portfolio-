import { describe, expect, it } from "vitest";
import { createContactDraft } from "./contact-draft";
describe("Email draft", () => {
  const fields = { name: "Jane Smith", email: "jane@example.com", company: "Example & Co", subject: "Audit opportunity", message: "Let's discuss operations & AI." };
  it("addresses the draft to the approved direct email", () => {
    expect(createContactDraft(fields).split("?")[0]).toBe("mailto:smanch06@nyit.edu");
  });
  it("includes all five entered fields without losing special characters", () => {
    const query = new URLSearchParams(createContactDraft(fields).split("?")[1]);
    expect(query.get("subject")).toBe("Audit opportunity");
    expect(query.get("body")).toBe("Let's discuss operations & AI.\n\nFrom: Jane Smith\nEmail: jane@example.com\nCompany: Example & Co");
  });
});
