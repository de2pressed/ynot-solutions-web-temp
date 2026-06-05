import { notFound } from "next/navigation";
import { AmbientSystem } from "@/components/AmbientSystem";
import { Button } from "@/components/Button";
import { servicesData } from "@/lib/servicesData";
import { ServiceVisualizer } from "@/components/ServiceVisualizers";

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const service = servicesData.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="service-detail-page">
      <AmbientSystem />

      {/* 1. Technical Hero */}
      <section className="service-detail-hero">
        <div className="service-detail-hero__content">
          <p className="eyebrow">Services / Details</p>
          <h1>{service.title}</h1>
          <p>{service.headline}</p>
          <div className="button-row">
            <Button href="/contact" variant="primary">Schedule Infrastructure Consultation</Button>
            <Button href="/services" variant="secondary">All Services</Button>
          </div>
        </div>

        <div className="service-detail-hero__visual">
          <ServiceVisualizer type={service.visualType} />
        </div>
      </section>

      {/* 2. Content Focus & Capabilities checklist */}
      <section className="capabilities-split">
        <div className="narrative-col">
          <p className="eyebrow">Ecosystem Focus</p>
          <h2>Operational Focus</h2>
          <p>{service.contentFocus}</p>
          <p>{service.description}</p>
        </div>

        <div className="narrative-col">
          <p className="eyebrow">Specifications</p>
          <h2>Key Capabilities</h2>
          <div className="capabilities-grid">
            {service.capabilities.map((cap) => (
              <div key={cap} className="capability-item">
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Technology Integration Details */}
      <section className="tooling-section" style={{ borderTop: "1px solid rgba(17, 16, 11, 0.1)" }}>
        <div className="tooling-section__header">
          <p className="eyebrow">Engine Stack</p>
          <h2>Integration Tooling &amp; Capabilities</h2>
          <p>
            Our deployments leverage industry-standard runtimes configured for strict policy and performance boundaries. We do not just run tools; we manage their state templates.
          </p>
        </div>

        <div className="tools-grid" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {service.tools.map((tool) => (
            <div key={tool.name} className="tool-item">
              <strong>{tool.name}</strong>
              <p>{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Outcomes / Metrics statistics cards */}
      <section className="metrics-section">
        <p className="eyebrow" style={{ textAlign: "center" }}>Impact</p>
        <h2>Measurable Outcomes</h2>
        <div className="metrics-row">
          {service.metrics.map((metric) => (
            <div key={metric.label} className="metric-card">
              <span className="metric-value">{metric.value}</span>
              <span className="metric-label">{metric.label}</span>
              <p className="metric-desc">{metric.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Closing CTA section */}
      <section className="about-cta">
        <div className="about-cta__content">
          <p className="eyebrow">Get Started</p>
          <h2>Discuss Your Infrastructure Architecture</h2>
          <p>
            Coordinate a validation review of your cloud resource layouts, security policies, and deployment velocities. Let us map your next operational step.
          </p>
          <div className="button-row">
            <Button href="/contact" variant="primary">Schedule Assessment</Button>
            <Button href="/services" variant="secondary">Explore Other Services</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
