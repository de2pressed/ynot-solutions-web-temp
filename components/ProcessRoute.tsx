import { processSteps } from "@/lib/copy";

export function ProcessRoute() {
  return (
    <section className="process-section section-panel dark-panel" id="process" data-header-theme="dark">
      <div className="section-copy narrow">
        <p className="eyebrow">DELIVERY ROUTE</p>
        <h2>A deployment process built around stability.</h2>
        <p>We map what exists, design what should exist, implement the missing systems, and keep improving the infrastructure your team depends on.</p>
      </div>
      <div className="process-track" data-testid="process-track">
        {processSteps.map(([title, body], i) => (
          <article className="process-card" tabIndex={0} key={title} data-testid={`process-card-${i + 1}`}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{body}</p>
            <small>{i === processSteps.length - 1 ? "continuous loop" : `${title} → ${processSteps[i + 1][0]}`}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
