"use client";

import { useEffect, useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { AmbientSystem } from "@/components/AmbientSystem";

const words = ["deployed.", "scaled.", "stabilized."];

export default function ContactPage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-contact-theme", "light");
    window.dispatchEvent(
      new CustomEvent("contactThemeChange", {
        detail: { theme: "light" }
      })
    );
    return () => {
      document.documentElement.removeAttribute("data-contact-theme");
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText((prev) => {
          const next = prev.slice(0, -1);
          if (next === "") {
            setIsDeleting(false);
            setCurrentWordIndex((prevIdx) => (prevIdx + 1) % words.length);
          }
          return next;
        });
      }, 50);
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) => fullWord.slice(0, prev.length + 1));
      }, 100);
    }

    if (!isDeleting && displayText === fullWord) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex]);

  return (
    <main className="contact-page theme-light">
      <AmbientSystem />

      <section className="contact-hero">
        <div className="headline-wrapper">
          <h1>
            Tell us what<br />
            you need <span className="typing-word">{displayText}</span><span className="cursor-marker">|</span>
          </h1>
        </div>
        <p>Share a few details about your infrastructure, release process, or cloud environment. YNot Solutions will help map the next operational step.</p>
      </section>
      <ContactForm />
    </main>
  );
}
