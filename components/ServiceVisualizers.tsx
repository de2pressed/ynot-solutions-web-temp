"use client";

import { useEffect, useState } from "react";

// 1. Cloud Infrastructure: Multi-AZ Network Topology
export function CloudVisual() {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="visual-card" data-testid="cloud-visual">
      <div className="visual-card__header">
        <span className="visual-card__title">multi-az cloud topology</span>
        <span className="visual-card__status">network: nominal</span>
      </div>
      <div className="visual-card__body">
        <svg viewBox="0 0 400 240" className="visual-svg">
          {/* Availability Zone boundaries */}
          <rect x="20" y="50" width="165" height="160" rx="6" fill="transparent" stroke="rgba(17,16,11,0.06)" strokeDasharray="4 4" />
          <rect x="215" y="50" width="165" height="160" rx="6" fill="transparent" stroke="rgba(17,16,11,0.06)" strokeDasharray="4 4" />
          <text x="35" y="66" fontFamily="var(--font-mono)" fontSize="7" fill="#88857a">AZ-A (PRIMARY)</text>
          <text x="230" y="66" fontFamily="var(--font-mono)" fontSize="7" fill="#88857a">AZ-B (FAILOVER)</text>

          {/* Load Balancer */}
          <rect x="160" y="10" width="80" height="24" rx="4" fill="#ffffff" stroke="rgba(17,16,11,0.15)" strokeWidth="1.5" />
          <text x="200" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fontWeight="bold" fill="var(--black)" className="svg-dark-text">ELB-ROUTER</text>

          {/* Compute Nodes AZ-A */}
          <rect x="40" y="90" width="125" height="36" rx="4" fill="#ffffff" stroke="rgba(17,16,11,0.12)" strokeWidth="1" />
          <text x="50" y="106" fontFamily="var(--font-sans)" fontSize="8" fontWeight="bold" fill="var(--black)" className="svg-dark-text">ASG-WEB-NODE-A</text>
          <text x="50" y="118" fontFamily="var(--font-mono)" fontSize="7" fill="#666359" className="svg-dark-text">Status: Running</text>
          <circle cx="150" cy="108" r="3" fill="var(--yellow-core)" />

          {/* Compute Nodes AZ-B */}
          <rect x="235" y="90" width="125" height="36" rx="4" fill="#ffffff" stroke="rgba(17,16,11,0.12)" strokeWidth="1" />
          <text x="245" y="106" fontFamily="var(--font-sans)" fontSize="8" fontWeight="bold" fill="var(--black)" className="svg-dark-text">ASG-WEB-NODE-B</text>
          <text x="245" y="118" fontFamily="var(--font-mono)" fontSize="7" fill="#666359" className="svg-dark-text">Status: Hot-Standby</text>
          <circle cx="345" cy="108" r="3" fill="rgba(242, 200, 75, 0.4)" />

          {/* Database Layer */}
          <rect x="135" y="170" width="130" height="30" rx="4" fill="#ffffff" stroke="rgba(17,16,11,0.18)" strokeWidth="1.5" />
          <text x="200" y="184" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fontWeight="bold" fill="var(--black)" className="svg-dark-text">RDS-DB-CLUSTER (HA)</text>
          <text x="200" y="194" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#88857a" className="svg-dark-text">Multi-Region Synced</text>

          {/* Connectivity lines */}
          <path d="M 200,34 L 102,90" fill="none" stroke="rgba(17,16,11,0.12)" strokeWidth="1" />
          <path d="M 200,34 L 298,90" fill="none" stroke="rgba(17,16,11,0.12)" strokeWidth="1" />
          <path d="M 102,126 L 200,170" fill="none" stroke="rgba(17,16,11,0.12)" strokeWidth="1" />
          <path d="M 298,126 L 200,170" fill="none" stroke="rgba(17,16,11,0.12)" strokeWidth="1" />

          {/* Animated data pulses */}
          {pulse === 0 && <circle cx="200" cy="34" r="3" fill="var(--yellow-core)" style={{ transform: "translate(-98px, 56px)", transition: "all 1.5s linear" }} />}
          {pulse === 1 && <circle cx="102" cy="126" r="3" fill="var(--yellow-core)" style={{ transform: "translate(98px, 44px)", transition: "all 1.5s linear" }} />}
        </svg>
      </div>
    </div>
  );
}

// 2. DevOps Automation: CI/CD Pipeline Stage checks
export function PipelineVisual() {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const stages = [
    { label: "lint check", sub: "eslint verified" },
    { label: "image build", sub: "package digest" },
    { label: "karpenter iac", desc: "terraform applied" },
    { label: "reconcile", desc: "argocd active" }
  ];

  return (
    <div className="visual-card" data-testid="pipeline-visual">
      <div className="visual-card__header">
        <span className="visual-card__title">verification pipeline flow</span>
        <span className="visual-card__status">stage: {stages[activeStep].label}</span>
      </div>
      <div className="visual-card__body">
        <svg viewBox="0 0 400 240" className="visual-svg">
          {/* Pipelines route lines */}
          <line x1="50" y1="120" x2="350" y2="120" stroke="rgba(17,16,11,0.08)" strokeWidth="6" strokeLinecap="round" />
          <line x1="50" y1="120" x2={50 + activeStep * 100} y2="120" stroke="var(--yellow-core)" strokeWidth="3" strokeLinecap="round" style={{ transition: "all 0.5s ease" }} />

          {/* Nodes */}
          {[0, 1, 2, 3].map((idx) => {
            const isActive = idx <= activeStep;
            return (
              <g key={idx} transform={`translate(${50 + idx * 100}, 120)`}>
                <circle r="12" fill={isActive ? "var(--yellow-core)" : "#ffffff"} stroke={isActive ? "var(--yellow-core)" : "rgba(17,16,11,0.2)"} strokeWidth="2" style={{ transition: "all 0.3s ease" }} />
                <circle r="4" fill={isActive ? "var(--black)" : "rgba(17,16,11,0.1)"} />
                <text y="-22" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fontWeight="bold" fill={isActive ? "var(--black)" : "#88857a"}>
                  {stages[idx].label.toUpperCase()}
                </text>
                <text y="24" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="6" fill="#88857a">
                  {isActive ? "PASS" : "WAITING"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// 3. Kubernetes: Node Cluster and Pod Pulsing Node maps
export function K8sVisual() {
  return (
    <div className="visual-card" data-testid="k8s-visual">
      <div className="visual-card__header">
        <span className="visual-card__title">kubernetes pods distribution</span>
        <span className="visual-card__status">api-server: healthy</span>
      </div>
      <div className="visual-card__body">
        <svg viewBox="0 0 400 240" className="visual-svg">
          {/* Worker Node 01 */}
          <rect x="30" y="40" width="155" height="150" className="k8s-node" />
          <text x="40" y="56" fontFamily="var(--font-mono)" fontSize="8" fontWeight="bold" fill="var(--black)" className="svg-dark-text">k8s-worker-node-1</text>
          <text x="40" y="66" fontFamily="var(--font-mono)" fontSize="6" fill="#88857a" className="svg-dark-text">CPU: 42% | RAM: 61%</text>

          {/* Worker Node 02 */}
          <rect x="215" y="40" width="155" height="150" className="k8s-node" />
          <text x="225" y="56" fontFamily="var(--font-mono)" fontSize="8" fontWeight="bold" fill="var(--black)" className="svg-dark-text">k8s-worker-node-2</text>
          <text x="225" y="66" fontFamily="var(--font-mono)" fontSize="6" fill="#88857a" className="svg-dark-text">CPU: 38% | RAM: 54%</text>

          {/* Pods Node 1 */}
          <circle cx="65" cy="115" r="14" className="k8s-pod" />
          <circle cx="65" cy="115" r="4" className="k8s-pulse" />
          <text x="65" y="137" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="var(--black)" className="svg-dark-text">pod-api-1</text>

          <circle cx="140" cy="115" r="14" className="k8s-pod" />
          <circle cx="140" cy="115" r="4" className="k8s-pulse" />
          <text x="140" y="137" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="var(--black)" className="svg-dark-text">pod-web-1</text>

          {/* Pods Node 2 */}
          <circle cx="250" cy="115" r="14" className="k8s-pod" />
          <circle cx="250" cy="115" r="4" className="k8s-pulse" />
          <text x="250" y="137" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="var(--black)" className="svg-dark-text">pod-api-2</text>

          <circle cx="325" cy="115" r="14" className="k8s-pod" />
          <circle cx="325" cy="115" r="4" className="k8s-pulse" />
          <text x="325" y="137" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="var(--black)" className="svg-dark-text">pod-cache-1</text>
        </svg>
      </div>
    </div>
  );
}

// 4. Platform Engineering: Developer Portal interactive provision button
export function PortalVisual() {
  const [provisionState, setProvisionState] = useState<"idle" | "provisioning" | "ready">("idle");
  const [progress, setProgress] = useState(0);

  const triggerProvision = () => {
    if (provisionState !== "idle") return;
    setProvisionState("provisioning");
    setProgress(0);
  };

  useEffect(() => {
    if (provisionState !== "provisioning") return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setProvisionState("ready");
          clearInterval(interval);
          return 100;
        }
        return p + 20;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [provisionState]);

  return (
    <div className="visual-card" data-testid="portal-visual">
      <div className="visual-card__header">
        <span className="visual-card__title">internal developer portal (idp)</span>
        <span className="visual-card__status">Engine: Crossplane</span>
      </div>
      <div className="visual-card__body" style={{ display: "block" }}>
        <svg viewBox="0 0 350 200" className="visual-svg">
          {/* Service abstraction card */}
          <rect x="10" y="20" width="330" height="150" className="portal-card" />
          
          <text x="25" y="45" fontFamily="var(--font-sans)" fontSize="10" fontWeight="bold" fill="var(--black)" className="svg-dark-text">PROVISION COMPLIANT POSTGRESQL</text>
          <text x="25" y="60" fontFamily="var(--font-mono)" fontSize="7" fill="#88857a" className="svg-dark-text">spec.version: v15.4 | spec.size: db.m5.large | spec.backup: multi-az</text>

          {/* Progress Bar background */}
          <rect x="25" y="85" width="300" height="10" rx="3" fill="rgba(17,16,11,0.06)" />
          
          {/* Active progress */}
          <rect x="25" y="85" width={3 * progress} height="10" rx="3" fill="var(--yellow-core)" style={{ transition: "width 0.4s ease" }} />

          <text x="25" y="115" fontFamily="var(--font-mono)" fontSize="8" fill="var(--black)" className="svg-dark-text">
            {provisionState === "idle" && "Configuration ready. Awaiting developers trigger..."}
            {provisionState === "provisioning" && `PROVISIONING DATABASE CLUSTER... [${progress}%]`}
            {provisionState === "ready" && "DATABASE PROVISIONED AND ROUTED. Webhook fired successfully."}
          </text>

          {/* Clickable Button inside SVG */}
          {provisionState === "idle" ? (
            <g transform="translate(100, 135)" style={{ cursor: "pointer" }} onClick={triggerProvision}>
              <rect width="150" height="24" className="portal-btn" />
              <text x="75" y="15" textAnchor="middle" className="portal-btn-text">RUN DOCKER COMPOSE TARGET</text>
            </g>
          ) : (
            <g transform="translate(100, 135)">
              <rect width="150" height="24" fill="rgba(17,16,11,0.15)" rx="4" />
              <text x="75" y="15" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#555246" fontWeight="bold" className="svg-dark-text">
                {provisionState === "provisioning" ? "PROVISIONING..." : "RECONCILED"}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

// 5. Monitoring & Observability: Dynamic Telemetry graph streams
export function ObservabilityVisual() {
  const [dataPoints, setDataPoints] = useState<number[]>([40, 45, 38, 50, 48, 55, 62, 58, 65, 72, 70, 78]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const next = [...prev.slice(1)];
        // Generate random realistic telemetry metrics
        const last = next[next.length - 1];
        const change = Math.floor(Math.random() * 20) - 10;
        let nextVal = last + change;
        if (nextVal < 20) nextVal = 30;
        if (nextVal > 90) nextVal = 75;
        next.push(nextVal);
        return next;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Compute SVG polyline points path from metrics array
  const points = dataPoints.map((val, idx) => `${30 + idx * 30},${180 - (val / 100) * 120}`).join(" ");

  return (
    <div className="visual-card" data-testid="observability-visual">
      <div className="visual-card__header">
        <span className="visual-card__title">live telemetry: latency p95</span>
        <span className="visual-card__status">limit: &lt; 100ms</span>
      </div>
      <div className="visual-card__body">
        <svg viewBox="0 0 400 240" className="visual-svg">
          {/* Chart Grid Lines */}
          <line x1="30" y1="60" x2="370" y2="60" className="chart-grid-line" />
          <line x1="30" y1="120" x2="370" y2="120" className="chart-grid-line" />
          <line x1="30" y1="180" x2="370" y2="180" className="chart-grid-line" />

          {/* Limits markers */}
          <line x1="30" y1="80" x2="370" y2="80" stroke="rgba(255, 95, 87, 0.5)" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="35" y="76" fontFamily="var(--font-mono)" fontSize="6" fill="#ff5f57">SLA CRITICAL BOUNDARY</text>

          {/* Plot Path */}
          <polyline points={points} className="chart-line" />

          {/* Values markers */}
          {dataPoints.map((val, idx) => {
            if (idx === dataPoints.length - 1) {
              return (
                <g key={idx} transform={`translate(${30 + idx * 30}, ${180 - (val / 100) * 120})`}>
                  <circle r="5" fill="var(--yellow-core)" />
                  <text x="8" y="3" fontFamily="var(--font-mono)" fontSize="8" fontWeight="bold" fill="var(--black)">{val}ms</text>
                </g>
              );
            }
            return <circle key={idx} cx={30 + idx * 30} cy={180 - (val / 100) * 120} r="3" fill="var(--black)" opacity="0.3" />;
          })}
        </svg>
      </div>
    </div>
  );
}

// 6. DevSecOps: Padlock / Policy compliance visuals
export function SecurityVisual() {
  return (
    <div className="visual-card" data-testid="security-visual">
      <div className="visual-card__header">
        <span className="visual-card__title">secrets dynamic authentication</span>
        <span className="visual-card__status">policy: enforced</span>
      </div>
      <div className="visual-card__body">
        <svg viewBox="0 0 400 240" className="visual-svg">
          {/* Security boundaries ring */}
          <circle cx="200" cy="120" r="85" fill="transparent" stroke="rgba(17,16,11,0.06)" strokeWidth="2" />
          <circle cx="200" cy="120" r="85" fill="transparent" stroke="var(--yellow-core)" strokeWidth="2" strokeDasharray="40 160" style={{ transform: "rotate(30deg)", transformOrigin: "center", animation: "spin 12s linear infinite" }} />

          {/* Lock Body */}
          <rect x="165" y="110" width="70" height="52" rx="6" className="lock-body" />
          <circle cx="200" cy="132" r="5" fill="#ffffff" />
          <line x1="200" y1="137" x2="200" y2="150" stroke="#ffffff" strokeWidth="2" />

          {/* Lock Shackle */}
          <path d="M 180,110 L 180,88 C 180,72  220,72  220,88 L 220,110" className="lock-shackle" />

          <text x="200" y="195" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--black)" fontWeight="bold">VAULT SHIELD: CONNECTED</text>
          <text x="200" y="206" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#88857a">dynamic secret rotation active</text>
        </svg>
      </div>
    </div>
  );
}

// 7. Cloud Cost Optimization: Optimization comparison bars
export function CostVisual() {
  const [optimized, setOptimized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOptimized(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="visual-card" data-testid="cost-visual">
      <div className="visual-card__header">
        <span className="visual-card__title">karpenter scaling comparison</span>
        <span className="visual-card__status">savings: 38%</span>
      </div>
      <div className="visual-card__body">
        <svg viewBox="0 0 400 240" className="visual-svg">
          {/* Baseline labels */}
          <text x="100" y="40" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="9" fontWeight="bold" fill="var(--black)">BASELINE SETUP</text>
          <text x="300" y="40" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="9" fontWeight="bold" fill="var(--black)">OPTIMIZED STACK</text>

          {/* Baseline Bars */}
          <rect x="60" y="70" width="30" height="110" className="cost-bar-original" />
          <rect x="110" y="70" width="30" height="110" className="cost-bar-original" />
          <text x="100" y="195" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#666359">Idle Instance Waste</text>

          {/* Optimized Bars */}
          <rect x="260" y={optimized ? 120 : 70} width="30" height={optimized ? 60 : 110} className="cost-bar-optimized" />
          <rect x="310" y={optimized ? 138 : 70} width="30" height={optimized ? 42 : 110} className="cost-bar-optimized" />
          <text x="300" y="195" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--black)" fontWeight="bold">Scaled to demand</text>

          {/* Comparison indicator */}
          {optimized && (
            <g transform="translate(160, 100)">
              <text x="40" y="5" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#28c840" fontWeight="bold">-$4,210/mo</text>
              <path d="M 40,15 L 40,30" fill="none" stroke="#28c840" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

export function ServiceVisualizer({ type }: { type: string }) {
  switch (type) {
    case "cloud": return <CloudVisual />;
    case "pipeline": return <PipelineVisual />;
    case "k8s": return <K8sVisual />;
    case "portal": return <PortalVisual />;
    case "observability": return <ObservabilityVisual />;
    case "security": return <SecurityVisual />;
    case "cost": return <CostVisual />;
    default: return <CloudVisual />;
  }
}
