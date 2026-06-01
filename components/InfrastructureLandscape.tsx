type InfraNode = {
  id: string;
  name: string;
  desc: string;
  x: number;
  y: number;
  align?: "left" | "center" | "right";
};

/* ── Two-row pipeline layout ──────────────────────────────────
 *  Top row  (y≈24%):  Codebase → CI/CD → Registry → IaC
 *  Bottom   (y≈74%):  Kubernetes → Cloud Runtime → Observability → Incident Loop
 *  25% intervals on x-axis for maximum readability.
 * ──────────────────────────────────────────────────────────── */
const nodes: InfraNode[] = [
  { id: "01", name: "Codebase",       desc: "Source changes become controlled releases.",       x: 12,  y: 24 },
  { id: "02", name: "CI/CD",          desc: "Tests, builds, previews, and promotion gates.",    x: 37,  y: 24 },
  { id: "03", name: "Registry",       desc: "Versioned images ready for runtime.",              x: 62,  y: 24 },
  { id: "04", name: "IaC",            desc: "Cloud state reviewed and repeatable.",             x: 87,  y: 24 },
  { id: "05", name: "Kubernetes",     desc: "Workloads scheduled with operational patterns.",   x: 12,  y: 74 },
  { id: "06", name: "Cloud Runtime",  desc: "Services routed to scalable infrastructure.",      x: 37,  y: 74 },
  { id: "07", name: "Observability",  desc: "Metrics, logs, traces, and alert context.",        x: 62,  y: 74 },
  { id: "08", name: "Incident Loop",  desc: "Reliability feedback returns to the system.",      x: 87,  y: 74 },
];

/* SVG viewBox is 1440 × 720.  Multiply x% by 14.4, y% by 7.2. */
const px = (n: InfraNode) => n.x * 14.4;
const py = (n: InfraNode) => n.y * 7.2;
const pt = (n: InfraNode) => `${px(n)},${py(n)}`;

/* ── Top row path: 01 → 02 → 03 → 04 ── */
const topPath = [
  `M ${pt(nodes[0])}`,
  `C ${px(nodes[0]) + 140},${py(nodes[0])}  ${px(nodes[1]) - 140},${py(nodes[1])}  ${pt(nodes[1])}`,
  `S ${px(nodes[2]) - 140},${py(nodes[2])}  ${pt(nodes[2])}`,
  `S ${px(nodes[3]) - 140},${py(nodes[3])}  ${pt(nodes[3])}`,
].join(" ");

/* ── Bottom row path: 05 → 06 → 07 → 08 ── */
const bottomPath = [
  `M ${pt(nodes[4])}`,
  `C ${px(nodes[4]) + 140},${py(nodes[4])}  ${px(nodes[5]) - 140},${py(nodes[5])}  ${pt(nodes[5])}`,
  `S ${px(nodes[6]) - 140},${py(nodes[6])}  ${pt(nodes[6])}`,
  `S ${px(nodes[7]) - 140},${py(nodes[7])}  ${pt(nodes[7])}`,
].join(" ");

/* ── Vertical connectors: top ↔ bottom (aligned columns) ── */
const connectors = [
  `M ${pt(nodes[0])} L ${pt(nodes[4])}`,
  `M ${pt(nodes[1])} L ${pt(nodes[5])}`,
  `M ${pt(nodes[2])} L ${pt(nodes[6])}`,
  `M ${pt(nodes[3])} L ${pt(nodes[7])}`,
].join(" ");

/* ── Feedback arc: Incident Loop (08) curves back up to IaC (04) ── */
const feedbackArc = `M ${px(nodes[7]) + 20},${py(nodes[7])} C ${px(nodes[7]) + 80},${py(nodes[7]) - 200} ${px(nodes[3]) + 80},${py(nodes[3]) + 200} ${px(nodes[3]) + 20},${py(nodes[3])}`;

export function InfrastructureLandscape() {
  return (
    <section className="landscape-section section-panel" id="landscape" data-header-theme="light">
      <div className="section-copy">
        <p className="eyebrow">CONNECTED DEVOPS ECOSYSTEM</p>
        <h2>From commit to cloud, every layer coordinated.</h2>
        <p>YNot Solutions designs and operates the DevOps systems behind fast releases: pipelines, clusters, cloud automation, monitoring, and the handoffs between them.</p>
      </div>
      <div className="route-board" data-testid="route-board">
        <svg viewBox="0 0 1440 720" preserveAspectRatio="none" className="node-routes" aria-hidden="true">
          <path className="route-path primary"   d={topPath} />
          <path className="route-path secondary"  d={bottomPath} />
          <path className="route-path connector"  d={connectors} />
          <path className="route-path feedback"   d={feedbackArc} />
          {nodes.map((node) => (
            <g key={node.id}>
              <circle className="route-marker-halo" cx={px(node)} cy={py(node)} r="17" />
              <circle className="route-marker" data-testid={`route-marker-${node.id}`} cx={px(node)} cy={py(node)} r="6" />
            </g>
          ))}
        </svg>
        {nodes.map((node) => (
          <article
            className={`infra-node align-${node.align ?? "center"}`}
            data-testid={`infra-node-${node.id}`}
            key={node.id}
            style={{ "--x": `${node.x}%`, "--y": `${node.y}%` } as React.CSSProperties}
          >
            <span>{node.id}</span>
            <h3>{node.name}</h3>
            <p>{node.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
