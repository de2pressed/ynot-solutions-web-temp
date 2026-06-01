"use client";
import { FormEvent, useState } from "react";

export function ContactForm() {
  const [error, setError] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    if (!name || !email || !message) return setError("Name, work email, and message are required.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid work email.");
    setError("");
    const subject = encodeURIComponent(`YNot Solutions inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${form.get("company") || ""}\nHelp: ${form.get("help") || ""}\nTimeline: ${form.get("timeline") || ""}\n\nMessage:\n${message}`);
    window.location.href = `mailto:hello@ynotsolutions.com?subject=${subject}&body=${body}`;
  }
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="field-grid"><label>Name<input name="name" required /></label><label>Work email<input name="email" type="email" required /></label></div>
      <label>Company<input name="company" /></label>
      <div className="field-grid"><label>What do you need help with?<select name="help" defaultValue="CI/CD"><option>CI/CD</option><option>Cloud infrastructure</option><option>Kubernetes</option><option>Automation</option><option>Observability</option><option>Managed infrastructure</option><option>Not sure yet</option></select></label><label>Timeline<select name="timeline" defaultValue="This month"><option>ASAP</option><option>This month</option><option>This quarter</option><option>Planning ahead</option></select></label></div>
      <label>Message<textarea name="message" required rows={6} placeholder="Tell us what you are trying to deploy, scale, or stabilize." /></label>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <button className="btn primary" type="submit">Compose Inquiry</button>
    </form>
  );
}
