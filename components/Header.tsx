"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/navigation";

const getSwatchColor = (color: string) => {
  const mapping: Record<string, string> = {
    vibrant: "#ffd21c",
    sand: "#F5E1A2",
    pastel: "#FDFD96",
    white: "#f7f3e8",
    blackGold: "#000000",
    blackCyan: "#00F0FF",
    blackBlue: "#2563EB",
    blackGreen: "#00FF66"
  };
  return mapping[color] || "#ffd21c";
};

export function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [themeColor, setThemeColor] = useState<"vibrant" | "sand" | "pastel" | "white" | "blackGold" | "blackCyan" | "blackBlue" | "blackGreen">("vibrant");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  // Sync theme saturation colors with documentElement variables
  useEffect(() => {
    const root = document.documentElement;
    const config = {
      vibrant:    { bg: "255, 210, 28", accent: "255, 210, 28", ink: "#11100b", grid: "rgba(17, 16, 11, 0.09)", topo: "rgba(17, 16, 11, 0.28)", terminalBorder: "rgba(17, 16, 11, 0.86)", btnBg: "#050505", btnFg: "#ffd21c", btnBorder: "#050505" },
      sand:       { bg: "245, 225, 162", accent: "242, 200, 75",  ink: "#11100b", grid: "rgba(17, 16, 11, 0.09)", topo: "rgba(17, 16, 11, 0.28)", terminalBorder: "rgba(17, 16, 11, 0.86)", btnBg: "#050505", btnFg: "#F5E1A2", btnBorder: "#050505" },
      pastel:     { bg: "253, 253, 150", accent: "242, 200, 75",  ink: "#11100b", grid: "rgba(17, 16, 11, 0.09)", topo: "rgba(17, 16, 11, 0.28)", terminalBorder: "rgba(17, 16, 11, 0.86)", btnBg: "#050505", btnFg: "#FDFD96", btnBorder: "#050505" },
      white:      { bg: "247, 243, 232", accent: "242, 200, 75",  ink: "#11100b", grid: "rgba(17, 16, 11, 0.09)", topo: "rgba(17, 16, 11, 0.28)", terminalBorder: "rgba(17, 16, 11, 0.86)", btnBg: "#050505", btnFg: "#f7f3e8", btnBorder: "#050505" },
      blackGold:  { bg: "0, 0, 0",      accent: "242, 200, 75",  ink: "#f7f3e8",  grid: "rgba(247, 243, 232, 0.12)", topo: "rgba(247, 243, 232, 0.32)", terminalBorder: "rgba(247, 243, 232, 0.2)", btnBg: "#f2c84b", btnFg: "#050505", btnBorder: "#f2c84b" },
      blackCyan:  { bg: "0, 0, 0",      accent: "0, 240, 255",  ink: "#f7f3e8",  grid: "rgba(247, 243, 232, 0.12)", topo: "rgba(247, 243, 232, 0.32)", terminalBorder: "rgba(247, 243, 232, 0.2)", btnBg: "#00F0FF", btnFg: "#050505", btnBorder: "#00F0FF" },
      blackBlue:  { bg: "0, 0, 0",      accent: "37, 99, 235",  ink: "#f7f3e8",  grid: "rgba(247, 243, 232, 0.12)", topo: "rgba(247, 243, 232, 0.32)", terminalBorder: "rgba(247, 243, 232, 0.2)", btnBg: "#2563EB", btnFg: "#f7f3e8", btnBorder: "#2563EB" },
      blackGreen: { bg: "0, 0, 0",      accent: "0, 255, 102",  ink: "#f7f3e8",  grid: "rgba(247, 243, 232, 0.12)", topo: "rgba(247, 243, 232, 0.32)", terminalBorder: "rgba(247, 243, 232, 0.2)", btnBg: "#00FF66", btnFg: "#050505", btnBorder: "#00FF66" }
    };
    const current = config[themeColor];
    root.style.setProperty("--theme-yellow-rgb", current.bg);
    root.style.setProperty("--theme-accent-rgb", current.accent);
    root.style.setProperty("--ink", current.ink);
    root.style.setProperty("--grid-line-color", current.grid);
    root.style.setProperty("--topo-line-color", current.topo);
    root.style.setProperty("--mac-terminal-border", current.terminalBorder);
    root.style.setProperty("--btn-primary-bg", current.btnBg);
    root.style.setProperty("--btn-primary-fg", current.btnFg);
    root.style.setProperty("--btn-primary-border", current.btnBorder);
  }, [themeColor]);

  // Click out to close dropdown listener
  useEffect(() => {
    if (!dropdownOpen) return;
    const closeDropdown = () => setDropdownOpen(false);
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, [dropdownOpen]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

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
      <div className="header-controls">
        <Link className="header-cta" href="/contact">
          Plan a Deployment
        </Link>
        <div className="theme-dropdown">
          <button 
            type="button" 
            className="theme-dropdown-toggle theme-circle-toggle"
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen}
            aria-label="Toggle theme selection"
          >
            <span className="active-theme-circle" style={{ "--active-color": getSwatchColor(themeColor) } as React.CSSProperties} />
            <span className="dropdown-arrow">▼</span>
          </button>
          {dropdownOpen && (
            <div className="theme-dropdown-menu" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={`theme-dropdown-item ${themeColor === "vibrant" ? "active" : ""}`}
                onClick={() => { setThemeColor("vibrant"); setDropdownOpen(false); }}
              >
                <span className="dropdown-swatch" style={{ "--swatch-color": "#ffd21c" } as React.CSSProperties} />
                Vibrant
              </button>
              <button
                type="button"
                className={`theme-dropdown-item ${themeColor === "sand" ? "active" : ""}`}
                onClick={() => { setThemeColor("sand"); setDropdownOpen(false); }}
              >
                <span className="dropdown-swatch" style={{ "--swatch-color": "#F5E1A2" } as React.CSSProperties} />
                Sand
              </button>
              <button
                type="button"
                className={`theme-dropdown-item ${themeColor === "pastel" ? "active" : ""}`}
                onClick={() => { setThemeColor("pastel"); setDropdownOpen(false); }}
              >
                <span className="dropdown-swatch" style={{ "--swatch-color": "#FDFD96" } as React.CSSProperties} />
                Pastel
              </button>
              <button
                type="button"
                className={`theme-dropdown-item ${themeColor === "white" ? "active" : ""}`}
                onClick={() => { setThemeColor("white"); setDropdownOpen(false); }}
              >
                <span className="dropdown-swatch" style={{ "--swatch-color": "#f7f3e8" } as React.CSSProperties} />
                White
              </button>
              <button
                type="button"
                className={`theme-dropdown-item ${themeColor === "blackGold" ? "active" : ""}`}
                onClick={() => { setThemeColor("blackGold"); setDropdownOpen(false); }}
              >
                <span className="dropdown-swatch" style={{ "--swatch-color": "#000000" } as React.CSSProperties} />
                Black & Gold
              </button>
              <button
                type="button"
                className={`theme-dropdown-item ${themeColor === "blackCyan" ? "active" : ""}`}
                onClick={() => { setThemeColor("blackCyan"); setDropdownOpen(false); }}
              >
                <span className="dropdown-swatch" style={{ "--swatch-color": "#00F0FF" } as React.CSSProperties} />
                Black & Cyan
              </button>
              <button
                type="button"
                className={`theme-dropdown-item ${themeColor === "blackBlue" ? "active" : ""}`}
                onClick={() => { setThemeColor("blackBlue"); setDropdownOpen(false); }}
              >
                <span className="dropdown-swatch" style={{ "--swatch-color": "#2563EB" } as React.CSSProperties} />
                Black & Blue
              </button>
              <button
                type="button"
                className={`theme-dropdown-item ${themeColor === "blackGreen" ? "active" : ""}`}
                onClick={() => { setThemeColor("blackGreen"); setDropdownOpen(false); }}
              >
                <span className="dropdown-swatch" style={{ "--swatch-color": "#00FF66" } as React.CSSProperties} />
                Black & Green
              </button>
            </div>
          )}
        </div>
      </div>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
        <span />
        <span />
      </button>
    </header>
  );
}
