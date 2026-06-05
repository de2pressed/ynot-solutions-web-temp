"use client";

import { useState, useEffect } from "react";
import { AmbientSystem } from "@/components/AmbientSystem";
import { Button } from "@/components/Button";
import { TechMarquee } from "@/components/TechMarquee";
import { DialogueConsoleVisual } from "@/components/AboutVisualizers";
import { MetricsBento } from "@/components/MetricsBento";


// Types for interactive components
interface Tool {
  name: string;
  desc: string;
}

interface ToolingCategory {
  id: string;
  name: string;
  description: string;
  tools: Tool[];
}

const toolingCategories: ToolingCategory[] = [
  {
    id: "platforms",
    name: "Cloud Platforms",
    description: "Enterprise-grade cloud architectures built for high availability and strict compliance.",
    tools: [
      { name: "Amazon Web Services", desc: "Multi-region EKS setups, transit gateways, IAM boundaries, and secure VPC routing." },
      { name: "Google Cloud Platform", desc: "Production GKE clusters, Shared VPC architectures, and scalable Cloud Run deployments." },
      { name: "Microsoft Azure", desc: "Enterprise AKS configurations, Azure Virtual WAN routing, and active-directory federations." }
    ]
  },
  {
    id: "containers",
    name: "Containers & Orchestration",
    description: "Resilient container runtime schedulers configured for zero-downtime rollouts and automated healing.",
    tools: [
      { name: "Kubernetes", desc: "Advanced ingress routing, network policies, horizontal pod autoscaling, and custom resource definitions." },
      { name: "Docker / Containerd", desc: "Secure multi-stage builds, minimal base images, and strict container isolation boundaries." }
    ]
  },
  {
    id: "automation",
    name: "Infrastructure Automation",
    description: "Declarative, version-controlled resource configurations representing the true state of infrastructure.",
    tools: [
      { name: "Terraform / OpenTofu", desc: "Dry-run verified module ecosystems, remote state management, and strict plan boundaries." },
      { name: "Ansible", desc: "Automated configuration drift control, server hardening, and baseline provisioning policies." },
      { name: "Crossplane", desc: "Kubernetes-native control planes managing external cloud APIs as custom resources." }
    ]
  },
  {
    id: "observability",
    name: "Observability",
    description: "Telemetry systems providing deep insights into cluster capacity, request tracing, and latency metrics.",
    tools: [
      { name: "Prometheus & Grafana", desc: "Custom operational dashboards, SLA alert parameters, and high-cardinality metric stores." },
      { name: "OpenTelemetry", desc: "Distributed request tracing, custom collector agents, and standardized telemetry APIs." },
      { name: "Datadog / Jaeger", desc: "End-to-end request profiling, database call logs, and microservice dependency maps." }
    ]
  },
  {
    id: "cicd",
    name: "CI/CD & GitOps",
    description: "Automated verification pipelines enforcing deployment quality gates and state reconciliation loops.",
    tools: [
      { name: "ArgoCD", desc: "Declarative GitOps engines reconciling cluster states directly from version control systems." },
      { name: "GitHub Actions / GitLab CI", desc: "Isolated build environments, parallel testing runner matrices, and automated image signing." }
    ]
  },
  {
    id: "security",
    name: "Security & Policy",
    description: "Continuous compliance tracking, secret isolation, and container boundary enforcement.",
    tools: [
      { name: "HashiCorp Vault", desc: "Dynamic credentials engine, automated secret rotation, and transit encryption targets." },
      { name: "Snyk / Trivy", desc: "Vulnerability analysis on package dependencies and base container image layers." },
      { name: "Kyverno / OPA", desc: "Automated cluster admission control checking security constraints before resource creation." }
    ]
  },
  {
    id: "ai-infra",
    name: "AI Infrastructure",
    description: "Hardware scheduling configurations designed for model caching, tensor distribution, and inference routing.",
    tools: [
      { name: "Ray Cluster Manager", desc: "Distributed execution frameworks optimizing memory layout for model training workloads." },
      { name: "vLLM / Triton", desc: "High-performance inference servers hosting large models with continuous batching logic." }
    ]
  }
];

export default function AboutPage() {
  const [activeCategory, setActiveCategory] = useState<string>("platforms");
  const activeData = toolingCategories.find((cat) => cat.id === activeCategory) || toolingCategories[0];

  useEffect(() => {
    const sections = document.querySelectorAll(".metrics-section, .about-cta");
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
    <main className="about-page">
      <AmbientSystem />

      {/* 1. Hero Section */}
      <section className="about-hero">
        <div className="about-hero__visual">
          <DialogueConsoleVisual />
        </div>

        <div className="about-hero__content">
          <h1>Reliable Systems. Automated Operations. Scalable Platforms.</h1>
          <p>
            We design, build, and operate resilient cloud infrastructures. We eliminate manual process errors, stabilize deployment workflows, and establish continuous observability to secure enterprise operations.
          </p>
          <div className="button-row">
            <Button href="/contact" variant="primary">Schedule Infrastructure Consultation</Button>
            <Button href="/services" variant="secondary">Explore Services</Button>
          </div>
        </div>
      </section>

      <TechMarquee />

      {/* 2. Who We Are & 3. Why YNot Exists */}
      <section className="narrative-grid">
        <div className="narrative-col">
          <p className="eyebrow">Who We Are</p>
          <h2>An Engineering-First Infrastructure Partner</h2>
          <p>
            YNot Solutions is a cloud-native platform engineering consultancy. We do not write standard landing site code or generic software solutions. Instead, we operate at the core systems layer—building pipelines, organizing container runtimes, automating network topologies, and securing configurations.
          </p>
          <p>
            We function as an integrated systems engineering team for companies scaling their digital products. We work directly in your repositories, mapping dependencies, optimizing cluster layout, and introducing reliable operational controls.
          </p>
        </div>
        <div className="narrative-col">
          <p className="eyebrow">Why We Exist</p>
          <h2>Targeting Operational Bottlenecks</h2>
          <p>
            Most deployment issues are not code failure issues. They stem from fragile release boundaries, manual infrastructure provisioning, poor telemetry context, and opaque configuration drift.
          </p>
          <ul>
            <li>Eliminating fragile manual scripts with code-defined pipelines.</li>
            <li>Replacing silent system failures with active tracing and validation gates.</li>
            <li>Enforcing baseline security and policies at the cluster scheduler layer.</li>
            <li>Stabilizing release days to turn deployments into non-events.</li>
          </ul>
        </div>
      </section>

      {/* 4. Engineering Philosophy */}
      <section className="philosophy-section">
        <p className="eyebrow" style={{ textAlign: "center" }}>Operating Principles</p>
        <h2>Our Engineering Philosophy</h2>
        <div className="philosophy-grid">
          <article className="philosophy-card">
            <h3>Automation First</h3>
            <p>
              Manual steps represent system vulnerabilities. We write clean, testable infrastructure configurations using Code-Defined paradigms so your platforms remain reproducible.
            </p>
          </article>
          <article className="philosophy-card">
            <h3>Reliability by Design</h3>
            <p>
              We construct systems prepared for downstream node loss. Load balancers, cluster schedulers, auto-healers, and metric collectors are baseline layout requirements, not retrofitted updates.
            </p>
          </article>
          <article className="philosophy-card">
            <h3>Scale as Foundation</h3>
            <p>
              We design core layout patterns that scale linearly. Our stateful container routing, multi-region structures, and configuration boundaries support traffic growth without platform redesign.
            </p>
          </article>
          <article className="philosophy-card">
            <h3>Operational Simplicity</h3>
            <p>
              We strip away unnecessary microservice tooling. We map and maintain clean dependencies, minimal networking policies, and direct pipelines to reduce infrastructure cognitive load.
            </p>
          </article>
          <article className="philosophy-card">
            <h3>Developer Enablement</h3>
            <p>
              Infrastructure must accelerate engineer velocity. We design internal developer platforms and self-service pipeline gates so teams build, test, and release code without friction.
            </p>
          </article>
        </div>
      </section>

      {/* 5. Technical Expertise / Tooling */}
      <section className="tooling-section">
        <div className="tooling-section__header">
          <p className="eyebrow">System Stack</p>
          <h2>Technical Expertise & Tooling</h2>
          <p>
            We maintain verified capabilities across the cloud-native ecosystem. We do not just run tools; we design declarative configurations that enforce active systems control.
          </p>
        </div>

        <div className="tooling-container">
          <div className="tooling-tabs" role="tablist" aria-label="Tooling Categories">
            {toolingCategories.map((category) => (
              <button
                key={category.id}
                role="tab"
                aria-selected={activeCategory === category.id}
                aria-controls={`panel-${category.id}`}
                id={`tab-${category.id}`}
                className={`tooling-tab ${activeCategory === category.id ? "active" : ""}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div 
            className="tooling-content" 
            role="tabpanel" 
            id={`panel-${activeData.id}`} 
            aria-labelledby={`tab-${activeData.id}`}
          >
            <p className="tooling-category-desc">{activeData.description}</p>
            <div className="tools-grid">
              {activeData.tools.map((tool) => (
                <div key={tool.name} className="tool-item">
                  <strong>{tool.name}</strong>
                  <p>{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Delivery Methodology */}
      <section className="methodology-section">
        <p className="eyebrow" style={{ textAlign: "center" }}>Execution Model</p>
        <h2>Delivery Methodology</h2>
        <div className="methodology-timeline">
          <article className="methodology-node">
            <span className="methodology-marker">1</span>
            <div className="methodology-card">
              <h3>Infrastructure Assessment</h3>
              <p>
                We execute dependency mapping, runtime stress checks, and configuration audit workflows to discover security gaps, build bottlenecks, and resource scaling limits.
              </p>
            </div>
          </article>
          <article className="methodology-node">
            <span className="methodology-marker">2</span>
            <div className="methodology-card">
              <h3>Architecture Planning</h3>
              <p>
                We construct clear network diagrams, database cluster topologies, and resource plans to guarantee high-performance schedules, proper isolation, and repeatable configurations.
              </p>
            </div>
          </article>
          <article className="methodology-node">
            <span className="methodology-marker">3</span>
            <div className="methodology-card">
              <h3>Automation & Implementation</h3>
              <p>
                We write Terraform config scopes, establish secure ArgoCD reconciliation loops, configure secret vaults, and program parallel testing steps within build containers.
              </p>
            </div>
          </article>
          <article className="methodology-node">
            <span className="methodology-marker">4</span>
            <div className="methodology-card">
              <h3>Optimization & Reliability</h3>
              <p>
                We connect tracing systems, fine-tune container autoscalers, specify health check timeouts, and balance queue worker sizes to stabilize workloads.
              </p>
            </div>
          </article>
          <article className="methodology-node">
            <span className="methodology-marker">5</span>
            <div className="methodology-card">
              <h3>Continuous Improvement</h3>
              <p>
                We evaluate SLO trends, trace error budgets, and audit configuration drift patterns to ensure your platforms adapt smoothly as application traffic grows.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* 7. Team Capabilities & 8. Operational Standards */}
      <section className="standards-grid">
        <div className="standards-col">
          <p className="eyebrow">Expertise</p>
          <h2>Team Capabilities</h2>
          <div className="standards-list">
            <div className="standard-item">
              <h3>SRE & Telemetry Architecture</h3>
              <p>Designing dynamic monitoring thresholds, logs aggregation patterns, and tracing frameworks to resolve errors before systems fail.</p>
            </div>
            <div className="standard-item">
              <h3>Kubernetes Cluster Control</h3>
              <p>Developing cluster custom resource engines, setting request/limit shapes, configuring storage links, and setting up service meshes.</p>
            </div>
            <div className="standard-item">
              <h3>Cloud Engineering</h3>
              <p>Building secure network routing, VPC peering arrays, database replications, and identity mappings across public platforms.</p>
            </div>
          </div>
        </div>
        <div className="standards-col">
          <p className="eyebrow">Compliance</p>
          <h2>Operational Standards</h2>
          <div className="standards-list">
            <div className="standard-item">
              <h3>Declarative Configuration (IaC)</h3>
              <p>We enforce code review triggers for all resource modifications. Manual configurations in production environments are strictly disabled.</p>
            </div>
            <div className="standard-item">
              <h3>GitOps Reconciliation</h3>
              <p>Cluster runtime states are continuously synchronized against repository sources, ensuring automated recovery from manual modifications.</p>
            </div>
            <div className="standard-item">
              <h3>Zero-Downtime Rollouts</h3>
              <p>All service deployments utilize rolling updates, green-blue routers, or canary gates with automated rollback configs triggered on error bounds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Metrics / Outcomes Section */}
      <section className="metrics-section">
        <p className="eyebrow" style={{ textAlign: "center" }}>Outcomes</p>
        <h2>Measurable Engineering Impact</h2>
        <MetricsBento />
      </section>

      {/* 10. Closing Section / CTA */}
      <section className="about-cta">
        <div className="about-cta__content">
          <p className="eyebrow">Get Started</p>
          <h2>Modernize Your Infrastructure Pipelines</h2>
          <p>
            Let us build reliable operations, stable release workflows, and observable cloud environments for your team. Start with a comprehensive assessment of your systems.
          </p>
          <div className="button-row">
            <Button href="/contact" variant="primary">Discuss Your Architecture</Button>
            <Button href="/services" variant="secondary">View Services Grid</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
