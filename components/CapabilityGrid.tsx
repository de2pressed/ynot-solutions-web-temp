import { capabilities } from "@/lib/copy";
export function CapabilityGrid() {
  return (
    <section className="capabilities-section section-panel dark-panel" id="capabilities" data-header-theme="dark">
      <div className="section-copy">
        <p className="eyebrow">CAPABILITIES / DEVOPS IMPLEMENTATION</p>
        <h2>DevOps implementation for teams that need production confidence.</h2>
        <p>We build the release systems, cloud foundations, automation, and observability that help teams ship faster without adding operational chaos.</p>
      </div>
      <div className="capability-grid">{capabilities.map(([title, body], i) => <article key={title} className="cap-card"><span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>
  );
}
