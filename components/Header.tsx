"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";
  const [scrollTheme, setScrollTheme] = useState<"light" | "dark">("light");
  const [contactTheme, setContactTheme] = useState<"light" | "dark">("light");
  const theme = isContactPage ? contactTheme : scrollTheme;
  const [themeColor, setThemeColor] = useState<"vibrant" | "sand" | "pastel" | "black" | "white" | "cyan" | "blue" | "green">("white");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    const saved = localStorage.getItem("theme-color");
    const validThemes = ["vibrant", "sand", "pastel", "black", "white", "cyan", "blue", "green"];
    if (saved && validThemes.includes(saved)) {
      setThemeColor(saved as any);
    }
  }, []);

  useEffect(() => {
    if (!isContactPage) return;

    // Direct check on mount to prevent timing race conditions, deferred to avoid eslint warnings
    const existing = document.documentElement.getAttribute("data-contact-theme");
    if (existing === "light" || existing === "dark") {
      setTimeout(() => {
        setContactTheme(existing);
      }, 0);
    }

    const handleContactTheme = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: "light" | "dark" }>;
      setContactTheme(customEvent.detail.theme);
    };
    window.addEventListener("contactThemeChange", handleContactTheme);
    return () => {
      window.removeEventListener("contactThemeChange", handleContactTheme);
    };
  }, [isContactPage]);

  useEffect(() => {
    if (isContactPage) return;

    const readTheme = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme]"));
      if (!sections.length) {
        setScrollTheme("light");
        return;
      }
      const probeY = 84;
      const active = sections
        .map((section) => ({ section, rect: section.getBoundingClientRect() }))
        .find(({ rect }) => rect.top <= probeY && rect.bottom >= probeY);
      setScrollTheme(active?.section.dataset.headerTheme === "dark" ? "dark" : "light");
    };

    readTheme();
    window.addEventListener("scroll", readTheme, { passive: true });
    window.addEventListener("resize", readTheme);
    return () => {
      window.removeEventListener("scroll", readTheme);
      window.removeEventListener("resize", readTheme);
    };
  }, [isContactPage, pathname]);

  // Sync theme saturation colors with documentElement variables
  useEffect(() => {
    const root = document.documentElement;
    const config = {
      // ── Light-background themes (dark text on bright bg) ──────────────────
      vibrant: {
        bg: "255, 210, 28",  accent: "255, 210, 28",  ink: "#11100b",
        grid: "rgba(17,16,11,0.09)", topo: "rgba(17,16,11,0.28)", terminalBorder: "rgba(17,16,11,0.86)",
        btnBg: "#050505", btnFg: "#ffd21c", btnBorder: "#050505", transition: "#171206",
        // Semantic tokens
        surfacePrimary: "rgb(255,210,28)", surfaceSecondary: "rgba(255,255,255,0.65)", surfaceElevated: "#ffffff",
        textPrimary: "#11100b", textSecondary: "#3a3525", textMuted: "#6b5e30",
        cardBg: "rgba(255,255,255,0.65)", cardBgHover: "#ffffff", cardBorder: "rgba(17,16,11,0.1)", cardBorderHover: "rgba(17,16,11,0.2)", cardText: "#11100b", cardTextMuted: "#555246",
        stripBg: "rgba(255,255,255,0.9)", stripBorder: "rgba(17,16,11,0.08)",
        glowStrength: "0.6", overlayStrength: "0.09",
        borderSoft: "rgba(17,16,11,0.08)", borderStrong: "rgba(17,16,11,0.2)",
        interactiveBg: "#050505", interactiveFg: "#ffd21c", interactiveHover: "rgba(17,16,11,0.85)",
      },
      sand: {
        bg: "245, 225, 162", accent: "242, 200, 75", ink: "#11100b",
        grid: "rgba(17,16,11,0.09)", topo: "rgba(17,16,11,0.28)", terminalBorder: "rgba(17,16,11,0.86)",
        btnBg: "#050505", btnFg: "#F5E1A2", btnBorder: "#050505", transition: "#171206",
        surfacePrimary: "rgb(245,225,162)", surfaceSecondary: "rgba(255,255,255,0.65)", surfaceElevated: "#ffffff",
        textPrimary: "#11100b", textSecondary: "#3a3525", textMuted: "#6b5e30",
        cardBg: "rgba(255,255,255,0.65)", cardBgHover: "#ffffff", cardBorder: "rgba(17,16,11,0.1)", cardBorderHover: "rgba(17,16,11,0.2)", cardText: "#11100b", cardTextMuted: "#555246",
        stripBg: "rgba(255,255,255,0.9)", stripBorder: "rgba(17,16,11,0.08)",
        glowStrength: "0.55", overlayStrength: "0.09",
        borderSoft: "rgba(17,16,11,0.08)", borderStrong: "rgba(17,16,11,0.2)",
        interactiveBg: "#050505", interactiveFg: "#F5E1A2", interactiveHover: "rgba(17,16,11,0.85)",
      },
      pastel: {
        bg: "253, 253, 150", accent: "242, 200, 75", ink: "#11100b",
        grid: "rgba(17,16,11,0.09)", topo: "rgba(17,16,11,0.28)", terminalBorder: "rgba(17,16,11,0.86)",
        btnBg: "#050505", btnFg: "#FDFD96", btnBorder: "#050505", transition: "#171206",
        surfacePrimary: "rgb(253,253,150)", surfaceSecondary: "rgba(255,255,255,0.7)", surfaceElevated: "#ffffff",
        textPrimary: "#11100b", textSecondary: "#3a3a10", textMuted: "#666630",
        cardBg: "rgba(255,255,255,0.70)", cardBgHover: "#ffffff", cardBorder: "rgba(17,16,11,0.1)", cardBorderHover: "rgba(17,16,11,0.2)", cardText: "#11100b", cardTextMuted: "#555246",
        stripBg: "rgba(255,255,255,0.9)", stripBorder: "rgba(17,16,11,0.08)",
        glowStrength: "0.5", overlayStrength: "0.07",
        borderSoft: "rgba(17,16,11,0.08)", borderStrong: "rgba(17,16,11,0.2)",
        interactiveBg: "#050505", interactiveFg: "#FDFD96", interactiveHover: "rgba(17,16,11,0.85)",
      },
      white: {
        bg: "255, 255, 255", accent: "242, 200, 75", ink: "#11100b",
        grid: "rgba(17,16,11,0.09)", topo: "rgba(17,16,11,0.28)", terminalBorder: "rgba(17,16,11,0.86)",
        btnBg: "#050505", btnFg: "#ffffff", btnBorder: "#050505", transition: "#0a0a0a",
        surfacePrimary: "rgb(255,255,255)", surfaceSecondary: "rgba(255,255,255,0.65)", surfaceElevated: "#ffffff",
        textPrimary: "#11100b", textSecondary: "#555246", textMuted: "#888078",
        cardBg: "rgba(255,255,255,0.65)", cardBgHover: "#ffffff", cardBorder: "rgba(17,16,11,0.08)", cardBorderHover: "rgba(17,16,11,0.18)", cardText: "#11100b", cardTextMuted: "#555246",
        stripBg: "rgba(255,255,255,0.9)", stripBorder: "rgba(17,16,11,0.08)",
        glowStrength: "0.5", overlayStrength: "0.09",
        borderSoft: "rgba(17,16,11,0.08)", borderStrong: "rgba(17,16,11,0.2)",
        interactiveBg: "#050505", interactiveFg: "#ffffff", interactiveHover: "rgba(17,16,11,0.85)",
      },
      // Cyan: very bright — dark text + dark button
      cyan: {
        bg: "0, 240, 255", accent: "0, 240, 255", ink: "#031012",
        grid: "rgba(3,16,18,0.1)", topo: "rgba(3,16,18,0.26)", terminalBorder: "rgba(3,16,18,0.7)",
        btnBg: "#031012", btnFg: "#00F0FF", btnBorder: "#031012", transition: "#001a1d",
        surfacePrimary: "rgb(0,240,255)", surfaceSecondary: "rgba(255,255,255,0.7)", surfaceElevated: "#e0fdff",
        textPrimary: "#031012", textSecondary: "#0a2830", textMuted: "#1a4a52",
        cardBg: "rgba(255,255,255,0.7)", cardBgHover: "#e8fdff", cardBorder: "rgba(3,16,18,0.12)", cardBorderHover: "rgba(3,16,18,0.25)", cardText: "#031012", cardTextMuted: "#0a2830",
        stripBg: "rgba(224,253,255,0.9)", stripBorder: "rgba(3,16,18,0.1)",
        glowStrength: "0.7", overlayStrength: "0.1",
        borderSoft: "rgba(3,16,18,0.1)", borderStrong: "rgba(3,16,18,0.25)",
        interactiveBg: "#031012", interactiveFg: "#00F0FF", interactiveHover: "rgba(3,16,18,0.85)",
      },
      // Blue: medium-dark — light text + light button
      blue: {
        bg: "37, 99, 235", accent: "37, 99, 235", ink: "#eef2ff",
        grid: "rgba(255,255,255,0.12)", topo: "rgba(255,255,255,0.25)", terminalBorder: "rgba(255,255,255,0.3)",
        btnBg: "#eef2ff", btnFg: "#2563EB", btnBorder: "#eef2ff", transition: "#050A2E",
        surfacePrimary: "rgb(37,99,235)", surfaceSecondary: "rgba(255,255,255,0.12)", surfaceElevated: "rgba(255,255,255,0.2)",
        textPrimary: "#eef2ff", textSecondary: "rgba(238,242,255,0.82)", textMuted: "rgba(238,242,255,0.6)",
        cardBg: "rgba(255,255,255,0.1)", cardBgHover: "rgba(255,255,255,0.18)", cardBorder: "rgba(255,255,255,0.14)", cardBorderHover: "rgba(255,255,255,0.3)", cardText: "#eef2ff", cardTextMuted: "rgba(238,242,255,0.75)",
        stripBg: "rgba(37,99,235,0.92)", stripBorder: "rgba(255,255,255,0.15)",
        glowStrength: "0.85", overlayStrength: "0.12",
        borderSoft: "rgba(255,255,255,0.12)", borderStrong: "rgba(255,255,255,0.28)",
        interactiveBg: "#eef2ff", interactiveFg: "#2563EB", interactiveHover: "rgba(238,242,255,0.88)",
      },
      // Green: very bright — dark text + dark button
      green: {
        bg: "0, 255, 102", accent: "0, 255, 102", ink: "#012010",
        grid: "rgba(1,32,16,0.1)", topo: "rgba(1,32,16,0.26)", terminalBorder: "rgba(1,32,16,0.7)",
        btnBg: "#012010", btnFg: "#00FF66", btnBorder: "#012010", transition: "#00170A",
        surfacePrimary: "rgb(0,255,102)", surfaceSecondary: "rgba(255,255,255,0.7)", surfaceElevated: "#d6ffea",
        textPrimary: "#012010", textSecondary: "#03321a", textMuted: "#0a4a28",
        cardBg: "rgba(255,255,255,0.7)", cardBgHover: "#d6ffea", cardBorder: "rgba(1,32,16,0.12)", cardBorderHover: "rgba(1,32,16,0.25)", cardText: "#012010", cardTextMuted: "#0a3520",
        stripBg: "rgba(214,255,234,0.9)", stripBorder: "rgba(1,32,16,0.1)",
        glowStrength: "0.7", overlayStrength: "0.1",
        borderSoft: "rgba(1,32,16,0.1)", borderStrong: "rgba(1,32,16,0.25)",
        interactiveBg: "#012010", interactiveFg: "#00FF66", interactiveHover: "rgba(1,32,16,0.85)",
      },
      // Gold: bright — dark text + dark button
      gold: {
        bg: "255, 215, 0", accent: "255, 215, 0", ink: "#1a1200",
        grid: "rgba(26,18,0,0.1)", topo: "rgba(26,18,0,0.26)", terminalBorder: "rgba(26,18,0,0.7)",
        btnBg: "#1a1200", btnFg: "#FFD700", btnBorder: "#1a1200", transition: "#181000",
        surfacePrimary: "rgb(255,215,0)", surfaceSecondary: "rgba(255,255,255,0.7)", surfaceElevated: "#fffae0",
        textPrimary: "#1a1200", textSecondary: "#332400", textMuted: "#5c3d00",
        cardBg: "rgba(255,255,255,0.7)", cardBgHover: "#fffae0", cardBorder: "rgba(26,18,0,0.12)", cardBorderHover: "rgba(26,18,0,0.25)", cardText: "#1a1200", cardTextMuted: "#4a3500",
        stripBg: "rgba(255,250,224,0.9)", stripBorder: "rgba(26,18,0,0.1)",
        glowStrength: "0.65", overlayStrength: "0.1",
        borderSoft: "rgba(26,18,0,0.1)", borderStrong: "rgba(26,18,0,0.25)",
        interactiveBg: "#1a1200", interactiveFg: "#FFD700", interactiveHover: "rgba(26,18,0,0.85)",
      },
      // ── Dark-background theme ─────────────────────────────────────────────
      black: {
        bg: "5, 5, 5", accent: "242, 200, 75", ink: "#ffffff",
        grid: "rgba(255,255,255,0.12)", topo: "rgba(255,255,255,0.32)", terminalBorder: "rgba(255,255,255,0.2)",
        btnBg: "#f2c84b", btnFg: "#050505", btnBorder: "#f2c84b", transition: "#050505",
        surfacePrimary: "rgb(5,5,5)", surfaceSecondary: "rgba(255,255,255,0.05)", surfaceElevated: "rgba(255,255,255,0.09)",
        textPrimary: "#ffffff", textSecondary: "rgba(255,255,255,0.82)", textMuted: "rgba(255,255,255,0.5)",
        cardBg: "rgba(255,255,255,0.05)", cardBgHover: "rgba(255,255,255,0.09)", cardBorder: "rgba(255,255,255,0.1)", cardBorderHover: "rgba(255,255,255,0.22)", cardText: "#ffffff", cardTextMuted: "rgba(255,255,255,0.7)",
        stripBg: "rgba(5,5,5,0.95)", stripBorder: "rgba(255,255,255,0.1)",
        glowStrength: "1", overlayStrength: "0.12",
        borderSoft: "rgba(255,255,255,0.1)", borderStrong: "rgba(255,255,255,0.25)",
        interactiveBg: "#f2c84b", interactiveFg: "#050505", interactiveHover: "#f7da72",
      },
    };
    const current = config[themeColor as keyof typeof config] || config.white;

    // Helper functions for RGB to HSL conversion
    const parseRgbString = (rgbStr: string): [number, number, number] => {
      const parts = rgbStr.split(",").map(p => parseInt(p.trim(), 10));
      return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
    };

    const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
      r /= 255;
      g /= 255;
      b /= 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return [
        Math.round(h * 360),
        Math.round(s * 100),
        Math.round(l * 100)
      ];
    };

    const [accR, accG, accB] = parseRgbString(current.accent);
    const [accH, accS, accL] = rgbToHsl(accR, accG, accB);
    root.style.setProperty("--theme-accent-h", `${accH}`);
    root.style.setProperty("--theme-accent-s", `${accS}%`);
    root.style.setProperty("--theme-accent-l", `${accL}%`);

    const [bgR, bgG, bgB] = parseRgbString(current.bg);
    const [bgH, bgS, bgL] = rgbToHsl(bgR, bgG, bgB);
    root.style.setProperty("--theme-yellow-h", `${bgH}`);
    root.style.setProperty("--theme-yellow-s", `${bgS}%`);
    root.style.setProperty("--theme-yellow-l", `${bgL}%`);

    // Legacy properties (keep for backward compat)
    root.style.setProperty("--theme-yellow-rgb", current.bg);
    root.style.setProperty("--theme-accent-rgb", current.accent);
    root.style.setProperty("--ink", current.ink);
    root.style.setProperty("--grid-line-color", current.grid);
    root.style.setProperty("--topo-line-color", current.topo);
    root.style.setProperty("--mac-terminal-border", current.terminalBorder);
    root.style.setProperty("--btn-primary-bg", current.btnBg);
    root.style.setProperty("--btn-primary-fg", current.btnFg);
    root.style.setProperty("--btn-primary-border", current.btnBorder);
    root.style.setProperty("--transition-color", current.transition);

    // Semantic tokens — new additions
    root.style.setProperty("--surface-primary", current.surfacePrimary);
    root.style.setProperty("--surface-secondary", current.surfaceSecondary);
    root.style.setProperty("--surface-elevated", current.surfaceElevated);
    root.style.setProperty("--text-primary", current.textPrimary);
    root.style.setProperty("--text-secondary", current.textSecondary);
    root.style.setProperty("--text-muted", current.textMuted);
    root.style.setProperty("--card-bg", current.cardBg);
    root.style.setProperty("--card-bg-hover", current.cardBgHover);
    root.style.setProperty("--card-border", current.cardBorder);
    root.style.setProperty("--card-border-hover", current.cardBorderHover);
    root.style.setProperty("--card-text", current.cardText);
    root.style.setProperty("--card-text-muted", current.cardTextMuted);
    root.style.setProperty("--strip-bg", current.stripBg);
    root.style.setProperty("--strip-border", current.stripBorder);
    root.style.setProperty("--glow-strength", current.glowStrength);
    root.style.setProperty("--overlay-strength", current.overlayStrength);
    root.style.setProperty("--border-soft", current.borderSoft);
    root.style.setProperty("--border-strong", current.borderStrong);
    root.style.setProperty("--interactive-bg", current.interactiveBg);
    root.style.setProperty("--interactive-fg", current.interactiveFg);
    root.style.setProperty("--interactive-hover", current.interactiveHover);

    root.setAttribute("data-theme-color", themeColor);
    if (isMounted.current) {
      localStorage.setItem("theme-color", themeColor);
    }
    window.dispatchEvent(new CustomEvent("themeColorChange", { detail: `rgb(${current.accent})` }));
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
    <header className={`site-header theme-${theme} ${isContactPage ? "non-sticky" : ""}`} data-testid="site-header">
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
            <span className="active-theme-circle" style={{ "--active-color": themeColor === "vibrant" ? "#ffd21c" : themeColor === "sand" ? "#F5E1A2" : themeColor === "pastel" ? "#FDFD96" : themeColor === "black" ? "#050505" : themeColor === "white" ? "#ffffff" : themeColor === "cyan" ? "#00F0FF" : themeColor === "blue" ? "#2563EB" : "#00FF66" } as React.CSSProperties} />
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
                className={`theme-dropdown-item ${themeColor === "black" ? "active" : ""}`}
                onClick={() => { setThemeColor("black"); setDropdownOpen(false); }}
              >
                <span className="dropdown-swatch" style={{ "--swatch-color": "#050505" } as React.CSSProperties} />
                Black
              </button>
              <button
                type="button"
                className={`theme-dropdown-item ${themeColor === "white" ? "active" : ""}`}
                onClick={() => { setThemeColor("white"); setDropdownOpen(false); }}
              >
                <span className="dropdown-swatch" style={{ "--swatch-color": "#ffffff" } as React.CSSProperties} />
                White
              </button>
              <button
                type="button"
                className={`theme-dropdown-item ${themeColor === "cyan" ? "active" : ""}`}
                onClick={() => { setThemeColor("cyan"); setDropdownOpen(false); }}
              >
                <span className="dropdown-swatch" style={{ "--swatch-color": "#00F0FF" } as React.CSSProperties} />
                Cyan
              </button>
              <button
                type="button"
                className={`theme-dropdown-item ${themeColor === "blue" ? "active" : ""}`}
                onClick={() => { setThemeColor("blue"); setDropdownOpen(false); }}
              >
                <span className="dropdown-swatch" style={{ "--swatch-color": "#2563EB" } as React.CSSProperties} />
                Blue
              </button>
              <button
                type="button"
                className={`theme-dropdown-item ${themeColor === "green" ? "active" : ""}`}
                onClick={() => { setThemeColor("green"); setDropdownOpen(false); }}
              >
                <span className="dropdown-swatch" style={{ "--swatch-color": "#00FF66" } as React.CSSProperties} />
                Green
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
