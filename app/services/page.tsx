"use client";

import React, { useEffect, useState, useCallback } from "react";

import Link from "next/link";
import { AmbientSystem } from "@/components/AmbientSystem";
import { ServiceVisualizer } from "@/components/ServiceVisualizers";
import { servicesData } from "@/lib/servicesData";
import { processSteps } from "@/lib/copy";

// ── CountUp Component ─────────────────────────────────────────────────────────
function CountUp({
  end,
  suffix = "",
  prefix = "",
  trigger = false,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  trigger: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTimestamp: number | null = null;
    let cancelled = false;
    const duration = 1600;
    const step = (timestamp: number) => {
      if (cancelled) return;
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };
    setValue(0);
    window.requestAnimationFrame(step);
    return () => {
      cancelled = true;
    };
  }, [trigger, end]);

  return (
    <>
      {prefix}
      {value}
      {suffix}
    </>
  );
}

// ── Animated Hero Background: Floating Infrastructure Topology ─────────────────
function ServicesHeroBg() {

  // Deterministic node positions (no random per-render)
  const nodes = [
    { x: 12, y: 18, type: "cloud", dur: 7 },
    { x: 55, y: 8, type: "k8s", dur: 9 },
    { x: 80, y: 25, type: "pipe", dur: 11 },
    { x: 30, y: 40, type: "lock", dur: 8 },
    { x: 70, y: 55, type: "cloud", dur: 10 },
    { x: 18, y: 65, type: "k8s", dur: 6 },
    { x: 50, y: 72, type: "pipe", dur: 13 },
    { x: 88, y: 68, type: "lock", dur: 7.5 },
    { x: 40, y: 88, type: "cloud", dur: 9.5 },
    { x: 75, y: 85, type: "k8s", dur: 8.5 },
    { x: 8, y: 85, type: "pipe", dur: 11.5 },
    { x: 62, y: 38, type: "lock", dur: 7 },
  ];

  const connections = [
    [0, 1], [1, 2], [2, 5], [3, 0], [4, 2], [4, 7],
    [5, 3], [6, 4], [7, 9], [8, 6], [9, 10], [10, 3],
  ];

  // Phase offset per connection for staggered animation
  const phases = connections.map((_, i) => (i * 23) % 100);

  const nodeIcon = (type: string, x: number, y: number) => {
    const vx = x * 10;
    const vy = y * 5.6;
    switch (type) {
      case "cloud":
        return (
          <g key={`${x}-${y}-cloud`} transform={`translate(${vx}, ${vy})`} opacity="0.55">
            <ellipse cx="0" cy="0" rx="14" ry="9" fill="none" stroke="rgba(242,200,75,0.5)" strokeWidth="1.5" />
            <ellipse cx="-8" cy="2" rx="8" ry="6" fill="none" stroke="rgba(242,200,75,0.3)" strokeWidth="1" />
            <ellipse cx="8" cy="2" rx="8" ry="6" fill="none" stroke="rgba(242,200,75,0.3)" strokeWidth="1" />
          </g>
        );
      case "k8s":
        // Hexagon
        return (
          <g key={`${x}-${y}-k8s`} transform={`translate(${vx}, ${vy})`} opacity="0.5">
            <polygon
              points="0,-11 9.5,-5.5 9.5,5.5 0,11 -9.5,5.5 -9.5,-5.5"
              fill="none"
              stroke="rgba(17,16,11,0.35)"
              strokeWidth="1.5"
            />
            <circle cx="0" cy="0" r="3" fill="rgba(242,200,75,0.6)" />
          </g>
        );
      case "pipe":
        return (
          <g key={`${x}-${y}-pipe`} transform={`translate(${vx}, ${vy})`} opacity="0.45">
            <rect x="-10" y="-4" width="20" height="8" rx="2" fill="none" stroke="rgba(17,16,11,0.3)" strokeWidth="1.2" />
            <circle cx="-6" cy="0" r="2" fill="rgba(242,200,75,0.5)" />
            <circle cx="0" cy="0" r="2" fill="rgba(17,16,11,0.25)" />
            <circle cx="6" cy="0" r="2" fill="rgba(17,16,11,0.25)" />
          </g>
        );
      case "lock":
        return (
          <g key={`${x}-${y}-lock`} transform={`translate(${vx}, ${vy})`} opacity="0.4">
            <rect x="-6" y="0" width="12" height="10" rx="2" fill="none" stroke="rgba(242,200,75,0.6)" strokeWidth="1.5" />
            <path d="M -4,0 L -4,-5 C -4,-10 4,-10 4,-5 L 4,0" fill="none" stroke="rgba(242,200,75,0.45)" strokeWidth="1.5" />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <div className="svc-hero-bg" aria-hidden="true">
      <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        {/* Connection lines */}
        {connections.map(([a, b], i) => {
          const na = nodes[a];
          const nb = nodes[b];
          const x1 = na.x * 10;
          const y1 = na.y * 5.6;
          const x2 = nb.x * 10;
          const y2 = nb.y * 5.6;
          const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(17,16,11,0.07)"
              strokeWidth="1"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.07;0.22;0.07"
                dur={`${3 + (i % 4)}s`}
                begin={`${(phases[i] / 100) * 3}s`}
                repeatCount="indefinite"
              />
            </line>
          );
        })}

        {/* Animated sparks along connections */}
        {connections.map(([a, b], i) => {
          const na = nodes[a];
          const nb = nodes[b];
          const x1 = na.x * 10;
          const y1 = na.y * 5.6;
          const x2 = nb.x * 10;
          const y2 = nb.y * 5.6;
          return (
            <circle key={`spark-${i}`} r="2.5" fill="var(--yellow-core)" opacity="0.75">
              <animateMotion
                dur={`${3.5 + (i % 5) * 0.8}s`}
                begin={`${(phases[i] / 100) * 3}s`}
                repeatCount="indefinite"
                path={`M ${x1},${y1} L ${x2},${y2}`}
              />
              <animate
                attributeName="opacity"
                values="0;0.9;0"
                dur={`${3.5 + (i % 5) * 0.8}s`}
                begin={`${(phases[i] / 100) * 3}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}

        {/* Floating nodes with their own float animation */}
        {nodes.map((n, i) => (
          <g key={i}>
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0,0; 0,${-8 - (i % 4) * 2}; 0,0`}
              dur={`${n.dur}s`}
              repeatCount="indefinite"
              additive="sum"
            />
            {nodeIcon(n.type, n.x, n.y)}
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── The 5 featured services for tab showcase ──────────────────────────────────
const FEATURED_SLUGS = [
  "cloud-infrastructure",
  "devops-automation",
  "kubernetes-containerization",
  "platform-engineering",
  "devsecops",
];

const TAB_LABELS = ["Cloud Infra", "DevOps", "Kubernetes", "Platform Eng", "DevSecOps"];

// ── Main Page Component ────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [panelVisible, setPanelVisible] = useState(true);
  const [startCountUp, setStartCountUp] = useState(false);

  const featuredServices = FEATURED_SLUGS.map(
    (slug) => servicesData.find((s) => s.slug === slug)!
  ).filter(Boolean);

  // Tab switch with panel fade transition
  const handleTabChange = useCallback((idx: number) => {
    if (idx === activeTab) return;
    setPanelVisible(false);
    setTimeout(() => {
      setActiveTab(idx);
      setPanelVisible(true);
    }, 220);
  }, [activeTab]);

  // Intersection Observer for scroll-triggered section animations
  useEffect(() => {
    const sections = document.querySelectorAll(
      ".svc-hero-v2, .svc-process-section, .svc-tabs-section, .svc-metrics-v2, .svc-cta-v2"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            if (entry.target.classList.contains("svc-metrics-v2")) {
              setStartCountUp(true);
            }
          }
        });
      },
      { threshold: 0.08 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const activeService = featuredServices[activeTab];

  return (
    <main className="services-page" id="services-page-top">
      <AmbientSystem />

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section className="svc-hero-v2 fade-in-up" aria-label="Services Hero">
        <ServicesHeroBg />

        <div className="svc-hero-content">
          <h1 className="svc-hero-h1">
            Infrastructure that{" "}
            <em>holds.</em>
            <br />
            At 2am, under load,
            <br />
            in production.
          </h1>
          <p className="svc-hero-body">
            We don&apos;t just configure servers. We build the platforms your team
            relies on — the kind that disappear into the background because they
            simply work. From the first commit to the hundredth deployment.
          </p>
          <div className="svc-hero-buttons">
            <Link
              href="/contact"
              className="svc-cta-btn-primary"
              id="hero-cta-start-conversation"
              style={{ display: "inline-flex" }}
            >
              Start a Conversation →
            </Link>
            <Link
              href="#svc-process"
              className="svc-cta-btn-secondary"
              id="hero-cta-explore-services"
            >
              Explore Services ↓
            </Link>
          </div>
        </div>

        <div className="svc-hero-visual-col" aria-hidden="true">
          {/* Decorative floating stat cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "100%",
              maxWidth: "360px",
            }}
          >
            {[
              { num: "99.99%", label: "Uptime SLA", sub: "Multi-region clustering" },
              { num: "< 12min", label: "Build to Deploy", sub: "Parallel CI runners" },
              { num: "35%+", label: "Cost Reduction", sub: "Rightsizing + autoscaling" },
            ].map((stat, i) => (
              <div
                key={i}
                className="svc-hero-stat-card"
                style={{
                  backdropFilter: "blur(12px)",
                  borderRadius: "14px",
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  animation: `svcFadeUp 0.6s ${0.5 + i * 0.15}s cubic-bezier(0.16, 1, 0.3, 1) both`,
                  transform: `translateY(${i * -4}px)`,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "1.9rem",
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                      color: "var(--ink)",
                      lineHeight: 1,
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginTop: "4px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#888078",
                    textAlign: "right",
                    maxWidth: "120px",
                    lineHeight: 1.4,
                  }}
                >
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: PROCESS TIMELINE ─────────────────────────────────── */}
      <section
        className="svc-process-section"
        id="svc-process"
        aria-label="How We Work"
      >
        <span className="section-eyebrow">Our Process</span>
        <h2 className="section-h2">
          From messy to managed —<br />
          in four deliberate steps.
        </h2>

        <div className="svc-process-layout">
          {/* Left: Timeline */}
          <div style={{ position: "relative" }}>
            <div className="svc-process-timeline">
              <div className="svc-process-connector" aria-hidden="true" />
              <div className="svc-process-connector-fill" aria-hidden="true" />

              {processSteps.map(([title, desc], idx) => (
                <div
                  className="svc-process-node"
                  key={title}
                  id={`process-step-${idx + 1}`}
                >
                  <div className="svc-process-marker" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="svc-process-card">
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sticky stat blocks */}
          <div className="svc-process-right-col">
            <div className="svc-process-stat-block">
              <span className="svc-process-stat-num">92%</span>
              <span className="svc-process-stat-label">
                Fewer manual interventions after implementation
              </span>
            </div>
            <div className="svc-process-stat-block">
              <span className="svc-process-stat-num">100%</span>
              <span className="svc-process-stat-label">
                Infrastructure defined as code from day one
              </span>
            </div>
            <div className="svc-process-stat-block">
              <span className="svc-process-stat-num">&lt; 5min</span>
              <span className="svc-process-stat-label">
                Environment spin-up via self-service portals
              </span>
            </div>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.35)",
                borderRadius: "12px",
                padding: "20px 24px",
              }}
            >
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  color: "var(--ink)",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                &ldquo;Every engagement starts with understanding what&apos;s
                actually breaking — not just what looks broken on paper.&rdquo;
              </p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#888078",
                  marginTop: "10px",
                  marginBottom: 0,
                  fontFamily: "var(--font-mono)",
                }}
              >
                YNOT Engineering Philosophy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: SERVICES TAB SHOWCASE ────────────────────────────── */}
      <section
        className="svc-tabs-section"
        id="svc-services"
        aria-label="Core Services"
      >
        <span className="section-eyebrow">Core Expertise</span>
        <h2 className="section-h2">
          Five disciplines.
          <br />
          One integrated platform.
        </h2>

        {/* Tab strip */}
        <div
          className="svc-tab-strip"
          role="tablist"
          aria-label="Service categories"
        >
          {TAB_LABELS.map((label, idx) => (
            <button
              key={label}
              role="tab"
              id={`svc-tab-${idx}`}
              aria-selected={activeTab === idx}
              aria-controls={`svc-tabpanel-${idx}`}
              className={`svc-tab-btn${activeTab === idx ? " active" : ""}`}
              onClick={() => handleTabChange(idx)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab panel */}
        {activeService && (
          <div
            id={`svc-tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`svc-tab-${activeTab}`}
            className={`svc-tab-panel${panelVisible ? " panel-visible" : ""}`}
          >
            {/* Left: Copy */}
            <div className="svc-panel-content">
              <span className="svc-panel-tag">
                {activeService.visualType.toUpperCase()}
              </span>
              <h3>{activeService.headline}</h3>
              <p className="panel-desc">{activeService.contentFocus}</p>

              <ul className="svc-capabilities-list">
                {activeService.capabilities.slice(0, 5).map((cap) => (
                  <li key={cap}>{cap}</li>
                ))}
              </ul>

              <Link
                href={`/services/${activeService.slug}`}
                className="svc-panel-link"
                id={`svc-panel-link-${activeService.slug}`}
              >
                Explore {activeService.title} →
              </Link>
            </div>

            {/* Right: Visualizer */}
            <div className="svc-panel-visual">
              <ServiceVisualizer type={activeService.visualType} />
            </div>
          </div>
        )}

        <div className="svc-view-all">
          We also offer{" "}
          <Link href="/services/monitoring-observability" id="svc-view-observability">
            Monitoring &amp; Observability
          </Link>{" "}
          and{" "}
          <Link href="/services/cloud-cost-optimization" id="svc-view-cost">
            Cloud Cost Optimization
          </Link>
          .
        </div>
      </section>

      {/* ── SECTION 4: METRICS ──────────────────────────────────────────── */}
      <section
        className="svc-metrics-v2"
        id="svc-metrics"
        aria-label="Results and metrics"
      >
        <h2 className="section-h2">The numbers speak.</h2>

        <div className="svc-metrics-grid">
          {/* Metric 1 */}
          <div className="svc-metric-item">
            <div className="svc-metric-blob" aria-hidden="true" />
            <span
              className="svc-metric-number"
              aria-label="35 percent or more cloud cost reduction"
            >
              <CountUp end={35} suffix="%+" trigger={startCountUp} />
            </span>
            <span className="svc-metric-label">Cloud Cost Reduction</span>
            <p className="svc-metric-desc">
              Achieved via automated node autoscaling, container rightsizing, and
              scheduled resource cleanup routines.
            </p>
          </div>

          {/* Metric 2 */}
          <div className="svc-metric-item">
            <div className="svc-metric-blob" aria-hidden="true" />
            <span
              className="svc-metric-number"
              aria-label="Less than 10 minutes disaster recovery"
            >
              &lt;<CountUp end={10} suffix="min" trigger={startCountUp} />
            </span>
            <span className="svc-metric-label">Disaster Recovery (RTO)</span>
            <p className="svc-metric-desc">
              Stabilized recovery windows using GitOps declarative states and
              multi-region active-active routing configurations.
            </p>
          </div>

          {/* Metric 3 */}
          <div className="svc-metric-item">
            <div className="svc-metric-blob" aria-hidden="true" />
            <span
              className="svc-metric-number"
              aria-label="92 percent fewer deployment issues"
            >
              <CountUp end={92} suffix="%" trigger={startCountUp} />
            </span>
            <span className="svc-metric-label">Fewer Deployment Issues</span>
            <p className="svc-metric-desc">
              Eliminated manual script errors with standardized parallel
              verification pipelines and automated rollback gates.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CTA ──────────────────────────────────────────────── */}
      <section
        className="svc-cta-v2"
        id="svc-cta"
        aria-label="Call to action"
      >
        <div className="svc-cta-grain" aria-hidden="true" />
        <div className="svc-cta-glow" aria-hidden="true" />

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 var(--page-pad)",
          }}
        >
          <div className="svc-cta-layout">
            <div className="svc-cta-left">
              <h2>
                Let&apos;s build infrastructure
                <br />
                that doesn&apos;t fail{" "}
                <em>at 3am.</em>
              </h2>
            </div>
            <div className="svc-cta-right">
              <p>
                Whether you&apos;re scaling a growing product or untangling years of
                accumulated technical debt — we start with your reality, not a
                template. Reach out and let&apos;s map what&apos;s next.
              </p>
              <div className="svc-cta-buttons">
                <Link
                  href="/contact"
                  className="svc-cta-btn-primary"
                  id="cta-schedule-consultation"
                >
                  Schedule a Consultation
                </Link>
                <Link
                  href="/about"
                  className="svc-cta-btn-secondary"
                  id="cta-meet-the-team"
                >
                  Meet the Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
