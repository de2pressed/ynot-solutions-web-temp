import { Button } from "./Button";

const chips = ["CI/CD", "Cloud Infrastructure", "Kubernetes", "Automation"];
const steps = ["build", "test", "registry", "rollout", "observe"];
const logs = [
  "10:42:18  commit accepted from main",
  "10:42:31  image promoted to registry",
  "10:42:44  rollout health: 100%",
  "10:42:58  alerts nominal · SLO tracking"
];

export function HeroScene() {
  return (
    <section className="hero-section" data-header-theme="light">
      <div className="hero-copy">
        <p className="eyebrow tape">MODERN DEVOPS SYSTEMS</p>
        <h1>DevOps systems that keep shipping.</h1>
        <p className="hero-lede">Infrastructure that just works — so your team can focus on building, not firefighting.</p>
        <div className="button-row">
          <Button href="/contact">Plan a Deployment</Button>
          <Button href="#capabilities" variant="secondary">Explore Capabilities</Button>
        </div>
        <div className="hero-chips">{chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
      </div>
      <div className="hero-visual" aria-label="Operational DevOps deployment interface">
        <div className="mac-terminal" data-testid="hero-mac-terminal" aria-label="Mac terminal showing a DevOps deployment">
          <div className="mac-terminal__chrome">
            <span className="traffic red" aria-hidden="true" />
            <span className="traffic amber" aria-hidden="true" />
            <span className="traffic green" aria-hidden="true" />
            <span className="terminal-title">ynot-prod — deploy.sh</span>
          </div>
          <div className="mac-terminal__tabs">
            <span>production</span>
            <span>k8s-east</span>
            <span>healthy</span>
          </div>
          <div className="mac-terminal__body">
            <p><span className="prompt">$</span> yn deploy --env production --strategy rolling</p>
            <p className="output ok">✓ pipeline green · image promoted · rollback armed</p>
            <div className="deploy-steps" aria-hidden="true">
              {steps.map((step) => <span key={step}>{step}</span>)}
            </div>
            <p><span className="prompt">$</span> kubectl rollout status deployment/api</p>
            <p className="output">deployment &quot;api&quot; successfully rolled out</p>
            <div className="terminal-split">
              <div>
                <strong>observability stream</strong>
                {logs.map((log) => <small key={log}>{log}</small>)}
              </div>
              <div className="terminal-metrics">
                <span><b>42ms</b> latency</span>
                <span><b>0</b> errors</span>
                <span><b>99.98%</b> SLO</span>
              </div>
            </div>
            <p className="cursor-line"><span className="prompt">$</span> observing live cluster<span className="cursor" /></p>
          </div>
          <div className="mac-terminal__status">cluster synced · canary stable · next deploy window open</div>
        </div>
      </div>
    </section>
  );
}
