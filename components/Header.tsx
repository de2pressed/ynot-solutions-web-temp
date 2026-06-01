"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme]"));
    if (!sections.length) return;

    const readTheme = () => {
      const probeY = 84;
      const active = sections
        .map((section) => ({ section, rect: section.getBoundingClientRect() }))
        .find(({ rect }) => rect.top <= probeY && rect.bottom >= probeY);
      setTheme(active?.section.dataset.headerTheme === "dark" ? "dark" : "light");
    };

    readTheme();
    window.addEventListener("scroll", readTheme, { passive: true });
    window.addEventListener("resize", readTheme);
    return () => {
      window.removeEventListener("scroll", readTheme);
      window.removeEventListener("resize", readTheme);
    };
  }, []);

  return (
    <header className={`site-header theme-${theme}`} data-testid="site-header">
      <Link className="brand" href="/" aria-label="YNot Solutions home" onClick={() => setOpen(false)}>
        <span>YNot Solutions</span>
      </Link>
      <nav className={`nav ${open ? "open" : ""}`} aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.href} onClick={() => setOpen(false)} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="header-cta" href="/contact">
        Plan a Deployment
      </Link>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
        <span />
        <span />
      </button>
    </header>
  );
}
