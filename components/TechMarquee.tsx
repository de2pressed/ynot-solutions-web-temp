import React from 'react';

interface TechItem {
  name: string;
  filename: string;
}

const techItems: TechItem[] = [
  { name: "", filename: "kubernetes" },
  { name: "", filename: "aws" },
  { name: "", filename: "docker" },
  { name: "", filename: "terraform" },
  { name: "", filename: "githubactions" },
  { name: "", filename: "prometheus" },
  { name: "", filename: "grafana" },
  { name: "", filename: "argocd" },
  { name: "", filename: "azure" },
  { name: "", filename: "gcp" },
  { name: "", filename: "helm" },
  { name: "", filename: "istio" },
  { name: "", filename: "linkerd" },
  { name: "", filename: "rancher" },
  { name: "", filename: "openshift" },
  { name: "", filename: "jenkins" },
  { name: "", filename: "gitlab" },
  { name: "", filename: "flux" },
  { name: "", filename: "ansible" },
  { name: "", filename: "pulumi" },
  { name: "", filename: "vault" },
  { name: "", filename: "opentelemetry" },
  { name: "", filename: "datadog" },
  { name: "", filename: "elastic" },
  { name: "", filename: "nginx" },
  { name: "", filename: "kafka" },
  { name: "", filename: "redis" },
  { name: "", filename: "postgresql" },
  { name: "", filename: "cloudflare" },
  { name: "", filename: "nvidia" },
  { name: "", filename: "backstage" },
  { name: "", filename: "sentry" },
];

export function TechMarquee() {
  // Triple-duplicate to keep the seamless loop gap-free at 32 items
  const displayItems = [...techItems, ...techItems, ...techItems];

  return (
    <section className="tech-marquee-section" aria-label="Technology Stack Integration">
      <div className="tech-marquee-container">
        <div className="tech-marquee-track">
          {displayItems.map((item, idx) => (
            <div key={`${item.filename}-${idx}`} className="tech-marquee-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/logos/${item.filename}.svg`}
                alt={`${item.name || 'AWS'} Logo`}
                className="tech-marquee-logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
