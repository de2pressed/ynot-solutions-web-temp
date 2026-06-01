import { ControlPlaneDemo } from "@/components/ControlPlaneDemo";
import { AmbientSystem } from "@/components/AmbientSystem";
import { HeroScene } from "@/components/HeroScene";
import { InfrastructureLandscape } from "@/components/InfrastructureLandscape";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ProcessRoute } from "@/components/ProcessRoute";
import { GlobeClimax } from "@/components/GlobeClimax";

export default function Home() {
  return (
    <main className="home-shell">
      <AmbientSystem />
      <HeroScene />
      <InfrastructureLandscape />
      <CapabilityGrid />
      <section className="core-section section-panel dark-panel" id="modern-workloads" data-header-theme="dark">
        <div className="section-copy narrow">
          <p className="eyebrow">CONTROL PLANE / MODERN WORKLOADS</p>
          <h2>Built for modern workloads, not fragile release days.</h2>
          <p>
            Whether you are deploying SaaS products, internal platforms, or AI-enabled services, your infrastructure needs to be observable, repeatable, and ready to scale.
          </p>
        </div>
        <ControlPlaneDemo />
      </section>
      <ProcessRoute />
      <GlobeClimax />
    </main>
  );
}
