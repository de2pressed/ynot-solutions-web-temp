"use client";

import React, { useEffect } from "react";
import { AmbientSystem } from "@/components/AmbientSystem";
import { Button } from "@/components/Button";
import {
  SignalCorrelationFlow,
  DependencyBlastRadiusMap,
  PredictiveDriftChart,
  AutonomousRemediationTimeline,
} from "@/components/AIOpsVisualizers";

export default function AIOpsPage() {
  // Intersection Observer for scroll-triggered section animations
  useEffect(() => {
    const sections = document.querySelectorAll(".ai-ops-section, .ai-ops-hero");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.08 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="ai-ops-page" data-header-theme="light">
      <AmbientSystem />

      {/* ==========================================
          SECTION 1: HERO & INFRASTRUCTURE TENSION
          ========================================== */}
      <section className="ai-ops-hero">
        <div className="ai-ops-hero__content">
          <h1>Distributed Systems Observe, Predict, and Self-Heal.</h1>
          <p>
            Cloud-native infrastructure evolved faster than operational visibility. Teams now manage systems too distributed for intuition, too dynamic for static monitoring, and too critical for reactive operations.
          </p>
          <p>
            YNot Solutions engineers operationally intelligent infrastructure. We build systems that interpret their own behavior, predict degradation, and execute targeted autonomous remediation before alerts become outages.
          </p>
          <div className="button-row">
            <Button href="/contact" variant="primary">Discuss Observability Engineering</Button>
            <Button href="#timeline" variant="secondary">View Evolution Timeline</Button>
          </div>
        </div>

        <div className="ai-ops-hero__visual">
          <SignalCorrelationFlow />
        </div>
      </section>

      {/* ==========================================
          SECTION 2: FROM MONITORING TO UNDERSTANDING
          ========================================== */}
      <section className="ai-ops-section" id="timeline">
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>From Static Monitoring to Contextual Understanding</h2>

        <div className="evolution-container">
          <p className="evolution-intro">
            Traditional monitoring only answers <em>what</em> failed after the fact. AIOps shifts the paradigm to real-time behavioral understanding, forecasting anomalies, and correlating cascades.
          </p>

          <div className="evolution-table-wrapper">
            <table className="evolution-table">
              <thead>
                <tr>
                  <th>Operational Era</th>
                  <th>Core System Behavior</th>
                  <th>Infrastructure Narrative</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Monitoring</strong></td>
                  <td>Passive telemetry threshold checking (e.g. CPU &gt; 90%).</td>
                  <td><span className="narrative-tag reactive">&ldquo;Something failed.&rdquo;</span></td>
                </tr>
                <tr>
                  <td><strong>Observability</strong></td>
                  <td>Correlating metrics, traces, and logs to trace path execution.</td>
                  <td><span className="narrative-tag diagnostic">&ldquo;Here&apos;s where it failed.&rdquo;</span></td>
                </tr>
                <tr className="active-row">
                  <td><strong>AI Ops</strong></td>
                  <td>Continuous behavioral baselining, anomaly prediction, and auto-healing.</td>
                  <td><span className="narrative-tag predictive">&ldquo;Here&apos;s why it&apos;s failing, what happens next, and how to prevent it.&rdquo;</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 3: THE OPERATIONAL INTELLIGENCE ENGINE
          ========================================== */}
      <section className="ai-ops-section light-bg">
        <h2>The Operational Intelligence Engine</h2>
        <p className="section-desc">
          We construct an intelligent nervous system for your cloud platforms. Telemetry is unified, mapped, forecasted, and actioned across four distinct processing layers.
        </p>

        <div className="engine-grid">
          <div className="engine-layers">
            {/* Layer 1 */}
            <div className="engine-layer-card">
              <span className="layer-num">01</span>
              <h3>Signal Ingestion</h3>
              <p>
                Unifying fragmented telemetry pools—Kubernetes events, Prometheus metric streams, Jaeger traces, cloud audit records, and CI/CD deploy states—into a normalized data fabric.
              </p>
            </div>
            {/* Layer 2 */}
            <div className="engine-layer-card">
              <span className="layer-num">02</span>
              <h3>Contextual Correlation</h3>
              <p>
                Mapping active database-to-application topologies and dependencies in real time. Isolating alert clusters and correlating code releases to identify the primary failure triggers.
              </p>
            </div>
            {/* Layer 3 */}
            <div className="engine-layer-card">
              <span className="layer-num">03</span>
              <h3>Predictive Intelligence</h3>
              <p>
                Forecasting resource exhaustion timelines, memory leak patterns, and service queues anomalies before they violate SLOs.
              </p>
            </div>
            {/* Layer 4 */}
            <div className="engine-layer-card">
              <span className="layer-num">04</span>
              <h3>Autonomous Operations</h3>
              <p>
                Executing targeted self-healing scripts: auto-scaling bottlenecks, diverting traffic, executing rollback hooks, and scheduling container restarts under strict human policy control.
              </p>
            </div>
          </div>

          <div className="engine-visual">
            <DependencyBlastRadiusMap />
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: REAL PRODUCTION ENVIRONMENTS
          ========================================== */}
      <section className="ai-ops-section">
        <div className="env-layout">
          <div className="env-content">
            <h2>Designed for Actual Cloud Realities</h2>
            <p>
              AIOps is not plug-and-play magic. It is the result of mature telemetry pipelines, structured logs, database indexing audits, and precise observability engineering.
            </p>
            <p>
              We integrate AI Ops tools directly into your active workloads—running containerized microservices in AWS EKS, complex database shards in Azure SQL, multi-region GCP networks, and declarative Helm/ArgoCD GitOps configurations.
            </p>
            <div className="tech-badge-container">
              <span className="tech-badge">AWS EKS</span>
              <span className="tech-badge">Kubernetes</span>
              <span className="tech-badge">GCP GKE</span>
              <span className="tech-badge">ArgoCD</span>
              <span className="tech-badge">Terraform</span>
              <span className="tech-badge">OpenTelemetry</span>
            </div>
          </div>

          <div className="env-visual">
            <PredictiveDriftChart />
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 5: WHAT AI OPS ACTUALLY SOLVES
          ========================================== */}
      <section className="ai-ops-section dark-bg">
        <span className="eyebrow" style={{ display: "block", textAlign: "center", color: "rgba(255,255,255,0.7)" }}>Operational Impact</span>
        <h2 style={{ textAlign: "center", color: "var(--white)", marginBottom: "40px" }}>What AI Ops Resolves</h2>

        <div className="impact-grid">
          {/* Item 1 */}
          <div className="impact-card">
            <h3>Operational Noise Reduction</h3>
            <p>
              De-duplicate alarm storms, eliminate alert fatigue, and filter out transient metrics spikes, focusing your engineering attention only on systemic incidents.
            </p>
          </div>
          {/* Item 2 */}
          <div className="impact-card">
            <h3>Immediate Root Cause Inference</h3>
            <p>
              Correlate application errors to recent deployment pushes or capacity shifts instantly, replacing manual log parsing loops with contextual incident histories.
            </p>
          </div>
          {/* Item 3 */}
          <div className="impact-card">
            <h3>Drastic Reduction in MTTR</h3>
            <p>
              Detect, classify, and trigger auto-remediation playbooks in seconds, keeping service interruptions under strict SLA targets.
            </p>
          </div>
          {/* Item 4 */}
          <div className="impact-card">
            <h3>Post-Deployment Safety</h3>
            <p>
              Verify execution safety immediately after releases. Any anomalous deviation from baseline performance automatically triggers safety gates or rollbacks.
            </p>
          </div>
          {/* Item 5 */}
          <div className="impact-card">
            <h3>Reliability at Scale</h3>
            <p>
              Manage cluster nodes and microservices complexity without scaling your platform team linearly. Maintain absolute operational clarity as networks grow.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 6: HUMAN ENGINEEERS REMAIN CENTRAL
          ========================================== */}
      <section className="ai-ops-section">
        <div className="human-layout">
          <div className="human-content">
            <h2>Augmenting, Not Replacing, Systems Engineers</h2>
            <p>
              We design auto-healing systems that support human decisions, not hide them. AI Ops handles the repetitive burden of parsing massive telemetry logs so your team can focus on architecture, capacity modeling, and system design.
            </p>
            <p>
              Engineers remain the governors of execution policies, defining admission thresholds, approving critical remediation runbooks, and reviewing incident logs.
            </p>
          </div>

          <div className="human-visual">
            <AutonomousRemediationTimeline />
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 7: PHILOSOPHY
          ========================================== */}
      <section className="ai-ops-section light-bg">
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Our AI Ops Philosophy</h2>

        <div className="philosophy-grid">
          <article className="philosophy-card">
            <h3>Intelligence Over Automation</h3>
            <p>
              Automation without contextual intelligence creates fragile infrastructure cascades. We focus on correlating root cause signals before executing self-healing loops.
            </p>
          </article>
          <article className="philosophy-card">
            <h3>Signal Quality Before AI</h3>
            <p>
              Garbage telemetry results in erratic automation decisions. We audit logging scopes and normalise metric paths to ensure system predictions are accurate.
            </p>
          </article>
          <article className="philosophy-card">
            <h3>Human-Governed Autonomy</h3>
            <p>
              Critical production infrastructure must remain observable and explainable. AI executes runbooks; engineers set policy rules and boundaries.
            </p>
          </article>
          <article className="philosophy-card">
            <h3>Resilience Is a Product Value</h3>
            <p>
              Infrastructure uptime baseline directly influences business trust. We build self-healing operations to secure brand and customer confidence.
            </p>
          </article>
        </div>
      </section>

      {/* ==========================================
          SECTION 8: CAPABILITIES MATRIX
          ========================================== */}
      <section className="ai-ops-section">
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Capabilities Matrix</h2>

        <div className="matrix-wrapper">
          <table className="matrix-table">
            <thead>
              <tr>
                <th>Operational Dimension</th>
                <th>Traditional Operations Model</th>
                <th>YNot AI Ops Model</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Alert Handling</strong></td>
                <td>Manual triage of duplicate alarms, leading to alert fatigue.</td>
                <td className="highlight-col">Intelligent alert correlation, deduplication, and prioritization.</td>
              </tr>
              <tr>
                <td><strong>Scaling Decisions</strong></td>
                <td>Threshold-based rules (reactive, scaling after spikes).</td>
                <td className="highlight-col">Predictive capacity drift forecasting and adaptive scaling.</td>
              </tr>
              <tr>
                <td><strong>Incident Response</strong></td>
                <td>Reactive fire-fighting, manually executing runbooks.</td>
                <td className="highlight-col">Autonomous remediation timelines with human policy verification.</td>
              </tr>
              <tr>
                <td><strong>Failure Detection</strong></td>
                <td>Static thresholds and checks that miss silent failures.</td>
                <td className="highlight-col">Continuous behavioral profiling and anomaly pattern detection.</td>
              </tr>
              <tr>
                <td><strong>Root Cause Analysis</strong></td>
                <td>Manual correlation of logs and metrics across teams.</td>
                <td className="highlight-col">Topology-aware dependency mapping and automated inference.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ==========================================
          SECTION 9: OPERATIONAL FUTURES & CTA
          ========================================== */}
      <section className="ai-ops-cta">
        <div className="ai-ops-cta__content">
          <h2>Move from Reactive Firefighting to Autonomous Control</h2>
          <p>
            The future of cloud operations is not more dashboards or alert configs. It is operational intelligence embedded directly into the infrastructure lifecycle. Let&apos;s map out your transition.
          </p>
          <div className="button-row" style={{ justifyContent: "center" }}>
            <Button href="/contact" variant="primary">Request Operational Audit</Button>
            <Button href="/services" variant="secondary">Explore Services Grid</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
