import { EMAIL } from "@/content/portfolio";

export type ContactDraft = { name: string; email: string; company: string; subject: string; message: string };
export function createContactDraft(fields: ContactDraft) {
  const body = `${fields.message.trim()}\n\nFrom: ${fields.name.trim()}\nEmail: ${fields.email.trim()}${fields.company.trim() ? `\nCompany: ${fields.company.trim()}` : ""}`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(fields.subject.trim())}&body=${encodeURIComponent(body)}`;
}
