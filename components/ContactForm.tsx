"use client";
import { FormEvent, useState, useRef, useEffect } from "react";

interface CustomSelectProps {
  name: string;
  options: string[];
  defaultValue: string;
}

function CustomSelect({ name, options, defaultValue }: CustomSelectProps) {
  const [selected, setSelected] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const closeDropdown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, [isOpen]);

  return (
    <div className="custom-select-container" ref={containerRef}>
      <input type="hidden" name={name} value={selected} />
      <button
        type="button"
        className={`custom-select-trigger ${isOpen ? "focused" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{selected}</span>
        <span className="custom-select-arrow">▼</span>
      </button>

      {isOpen && (
        <ul 
          className="custom-select-options"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {options.map((option) => (
            <li
              key={option}
              className={`custom-select-option ${option === selected ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelected(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ContactForm() {
  const [error, setError] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const message = String(form.get("message") || "").trim();
    if (!name || !email || !message) return setError("Name, work email, and message are required.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid work email.");
    setError("");
    const subject = encodeURIComponent(`YNot Solutions inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nCompany: ${form.get("company") || ""}\nHelp: ${form.get("help") || ""}\nTimeline: ${form.get("timeline") || ""}\n\nMessage:\n${message}`);
    window.location.href = `mailto:hello@ynotsolutions.com?subject=${subject}&body=${body}`;
  }
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="field-grid">
        <label>Name<input name="name" required /></label>
        <label>Work email<input name="email" type="email" required /></label>
      </div>
      <div className="field-grid">
        <label>Company<input name="company" /></label>
        <label>Phone number<input name="phone" type="tel" /></label>
      </div>
      <div className="field-grid">
        <label>
          What do you need help with?
          <CustomSelect
            name="help"
            defaultValue="CI/CD"
            options={[
              "CI/CD",
              "Cloud infrastructure",
              "Kubernetes",
              "Automation",
              "Observability",
              "Managed infrastructure",
              "Not sure yet"
            ]}
          />
        </label>
        <label>
          Timeline
          <CustomSelect
            name="timeline"
            defaultValue="This month"
            options={[
              "ASAP",
              "This month",
              "This quarter",
              "Planning ahead"
            ]}
          />
        </label>
      </div>
      <label>Message<textarea name="message" required rows={6} placeholder="Tell us what you are trying to deploy, scale, or stabilize." /></label>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <button className="btn primary" type="submit">Send Inquiry</button>
    </form>
  );
}
