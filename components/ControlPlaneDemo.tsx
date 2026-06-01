const serviceCards = [
  ["API Gateway", "10 pods", "routing stable"],
  ["Worker Pool", "24 jobs", "queue nominal"],
  ["Database Jobs", "6 tasks", "backups synced"]
] as const;

const pipeline = ["Build", "Test", "Registry", "Rollout", "Observe"];
const logs = [
  "10:41  rollout/api canary at 25%",
  "10:42  registry digest verified",
  "10:43  service mesh routes warmed",
  "10:44  alert policy quiet"
];

export function ControlPlaneDemo() {
  return (
    <div className="control-plane" data-testid="control-plane-demo" aria-label="YNot DevOps control plane dashboard">
      <div className="control-plane__chrome">
        <strong>YNot Control Plane</strong>
        <div>
          <span>prod</span>
          <span className="healthy">healthy</span>
          <span>0 incidents</span>
        </div>
      </div>
      <div className="status-grid">
        <article><span>deploy health</span><strong>99.98%</strong></article>
        <article><span>active services</span><strong>42</strong></article>
        <article><span>p95 latency</span><strong>42ms</strong></article>
      </div>
      <div className="cluster-map">
        <div className="cluster-lines" aria-hidden="true" />
        {serviceCards.map(([title, metric, desc]) => (
          <article key={title}>
            <span>{metric}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
      <div className="pipeline-strip" aria-label="deployment pipeline">
        {pipeline.map((step) => <span key={step}>{step}</span>)}
      </div>
      <div className="ops-bottom">
        <div className="log-stream">
          <strong>live ops log</strong>
          {logs.map((log) => <small key={log}>{log}</small>)}
        </div>
        <div className="alert-stack">
          <span>rollback ready</span>
          <span>alerts nominal</span>
          <span>SLO tracking</span>
        </div>
      </div>
    </div>
  );
}
