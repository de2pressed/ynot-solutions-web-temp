"use client";

import dynamic from "next/dynamic";
import { Button } from "./Button";

const GlobeScene = dynamic<{ variant: "pulse" | "laser" | "burst" }>(
  () => import("./GlobeScene"),
  {
    ssr: false,
    loading: () => <div className="globe-canvas-fallback" aria-hidden="true" />,
  }
);

export function GlobeClimax() {
  return (
    <section className="globe-section dark-panel" id="scale" data-header-theme="dark">
      <div className="globe-copy">
        <p className="eyebrow">GLOBAL INFRASTRUCTURE SCALE</p>
        <h2>Infrastructure with a wider operating radius.</h2>
        <p>From first deployment to scaled cloud operations, YNot Solutions builds the DevOps foundation your team can rely on.</p>
        <Button href="/contact">Plan Your Infrastructure</Button>
      </div>
      <div className="globe-canvas-wrap" data-testid="visible-globe" aria-label="Interactive 3D globe with deployment routes">
        <GlobeScene variant="laser" />
      </div>
    </section>
  );
}
