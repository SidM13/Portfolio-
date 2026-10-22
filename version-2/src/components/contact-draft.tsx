import { useState, type FormEvent } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createContactDraft } from "@/lib/contact-draft";

export function ContactDraftForm() {
  const [draft, setDraft] = useState<string>();
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const read = (name: string) => String(data.get(name) ?? "");
    const url = createContactDraft({ name: read("name"), email: read("email"), company: read("company"), subject: read("subject"), message: read("message") });
    setDraft(url);
    window.location.href = url;
  }
  return <form onSubmit={handleSubmit} className="border-t-2 border-primary bg-background p-5 md:p-7">
    <h3 className="text-xl font-bold">Create an email draft <span className="text-sm font-normal text-muted-foreground">(optional)</span></h3>
    <p id="draft-help" className="mt-3 text-sm leading-relaxed text-muted-foreground">Prefer to write here? This opens a draft in your email app. Nothing is submitted or stored; review and send the email yourself.</p>
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      {[{ name: "name", label: "Name", type: "text", placeholder: "Your name", required: true }, { name: "email", label: "Email", type: "email", placeholder: "you@company.com", required: true }, { name: "company", label: "Company", type: "text", placeholder: "Optional", required: false }, { name: "subject", label: "Subject", type: "text", placeholder: "What's this about?", required: true }].map(field => <label key={field.name} className="text-sm font-semibold" htmlFor={`contact-${field.name}`}>{field.label}{field.required ? " *" : ""}<input id={`contact-${field.name}`} name={field.name} type={field.type} required={field.required} placeholder={field.placeholder} autoComplete={field.name === "name" ? "name" : field.name === "email" ? "email" : field.name === "company" ? "organization" : "off"} className="mt-2 block h-11 w-full min-w-0 border border-input bg-card px-3 font-normal text-foreground placeholder:text-muted-foreground" /></label>)}
      <label htmlFor="contact-message" className="text-sm font-semibold sm:col-span-2">Message *<textarea id="contact-message" name="message" required rows={5} placeholder="Tell me about the role, project, or initiative…" className="mt-2 block w-full resize-y border border-input bg-card p-3 font-normal text-foreground placeholder:text-muted-foreground" /></label>
    </div>
    <Button type="submit" aria-describedby="draft-help" className="mt-6 h-12 w-full rounded-none"><Mail aria-hidden />Create email draft<ArrowUpRight aria-hidden /></Button>
    {draft && <p role="status" className="mt-4 text-sm text-muted-foreground">Draft prepared. If your email app didn’t open, <a href={draft} className="underline text-foreground">open the email draft</a> or use the direct email link.</p>}
  </form>;
}
