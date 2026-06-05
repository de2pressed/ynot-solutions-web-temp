"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { AmbientSystem } from "@/components/AmbientSystem";
import { Button } from "@/components/Button";
import dynamic from "next/dynamic";

const SolutionsGlobe = dynamic(() => import("@/components/SolutionsGlobe"), {
  ssr: false,
});


// ==========================================================================
// Bento Grid Specific Visualizers
// ==========================================================================

interface SaasVisualProps {
  hoveredPod: number | null;
  setHoveredPod: (idx: number | null) => void;
}

interface AIVisualProps {
  hoveredNode: string | null;
  setHoveredNode: (node: string | null) => void;
  hoveredPod: number | null;
}

// 1. SaaS Auto-scaling Pods Telemetry
function SaasVisual({ hoveredPod, setHoveredPod }: SaasVisualProps) {
  const [active, setActive] = useState(0);
  const [replicaStats, setReplicaStats] = useState<number[]>([42, 55, 68, 71]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % 4);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setReplicaStats(prev => prev.map(val => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        return Math.max(30, Math.min(95, val + delta));
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bento-visual saas-visual">
      <svg viewBox="0 0 300 150" className="visual-svg" style={{ width: "80%", height: "80%" }}>
        {/* Graph Grid Lines */}
        <line x1="20" y1="120" x2="280" y2="120" stroke="rgba(17,16,11,0.06)" strokeWidth="1" />
        <line x1="20" y1="80" x2="280" y2="80" stroke="rgba(17,16,11,0.04)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="20" y1="40" x2="280" y2="40" stroke="rgba(17,16,11,0.04)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Replica scaling path */}
        <path 
          d={`M 20,120 L 80,120 L 160,${80 - (active >= 1 ? 20 : 0)} L 240,${40 + (active === 3 ? 0 : 20)} L 280,${40 - (active === 3 ? 10 : 0)}`} 
          fill="none" 
          stroke="var(--yellow-core)" 
          strokeWidth="2.5" 
          style={{ transition: "all 0.4s ease" }}
        />

        <text x="20" y="25" fontFamily="var(--font-mono)" fontSize="7" fill="#88857a" fontWeight="bold">REPLICAS STATUS: {active + 1} ACTIVE</text>

        {/* Pod circles */}
        {[0, 1, 2, 3].map((idx) => {
          const isLive = idx <= active;
          const px = 60 + idx * 60;
          const py = 100 - idx * 18;
          const isHovered = hoveredPod === idx;

          return (
            <g 
              key={idx} 
              transform={`translate(${px}, ${py}) scale(${isHovered ? 1.15 : 1})`}
              style={{ 
                cursor: "pointer",
                transition: "transform 0.3s ease"
              }}
              onMouseEnter={() => setHoveredPod(idx)}
              onMouseLeave={() => setHoveredPod(null)}
            >
              {/* Pulsing ring on hover */}
              {isHovered && isLive && (
                <circle r="18" fill="none" stroke="var(--yellow-core)" strokeWidth="1" opacity="0.5" className="pulse-circle-ring" />
              )}
              <circle 
                r={isHovered ? "14" : "12"} 
                fill={isLive ? "var(--yellow-core)" : "#ffffff"} 
                stroke={isLive ? "var(--yellow-core)" : "rgba(17,16,11,0.15)"} 
                strokeWidth={isHovered ? "2" : "1.5"} 
                style={{ transition: "all 0.2s ease" }} 
              />
              {isLive && <circle r="4" fill="var(--black)" className="pulse-circle" />}
              <text y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="#88857a">POD-0{idx + 1}</text>
            </g>
          );
        })}

        {/* Tooltip Overlay */}
        {hoveredPod !== null && (
          <g 
            className="tooltip" 
            role="tooltip"
            transform={`translate(${60 + hoveredPod * 60}, ${100 - hoveredPod * 18 - 22})`}
            style={{ pointerEvents: "none" }}
          >
            <rect x="-40" y="-18" width="80" height="15" rx="3" fill="var(--black)" opacity="0.95" />
            <text textAnchor="middle" y="-8" fontFamily="var(--font-mono)" fontSize="5.5" fill="#ffffff" fontWeight="bold">
              CPU: {replicaStats[hoveredPod]}% | RAM: 58%
            </text>
            <polygon points="-3,-2 3,-2 0,1" fill="var(--black)" opacity="0.95" />
          </g>
        )}
      </svg>
    </div>
  );
}

// 2. AI Infrastructure Distributed GPU compute clusters
function AIVisual({ hoveredNode, setHoveredNode, hoveredPod }: AIVisualProps) {
  const [stats, setStats] = useState({
    ray: 32,
    gpu1: 94,
    gpu2: 88,
    vdb: 1.2
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setStats({
        ray: Math.floor(25 + Math.random() * 15),
        gpu1: Math.floor(88 + Math.random() * 8),
        gpu2: Math.floor(82 + Math.random() * 12),
        vdb: parseFloat((1.0 + Math.random() * 0.4).toFixed(1))
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const isRayHeadHovered = hoveredNode === "RAY-HEAD" || hoveredPod !== null;

  return (
    <div className="bento-visual ai-visual">
      <svg viewBox="0 0 300 150" className="visual-svg" style={{ width: "80%", height: "80%" }}>
        {/* Ray Head Server node */}
        <g 
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setHoveredNode("RAY-HEAD")}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <rect 
            x="15" 
            y="55" 
            width="60" 
            height="40" 
            rx="4" 
            fill="#ffffff" 
            stroke={isRayHeadHovered ? "var(--yellow-core)" : "rgba(17,16,11,0.15)"} 
            strokeWidth={isRayHeadHovered ? "2" : "1.5"} 
            style={{ transition: "all 0.25s ease" }}
          />
          <text x="45" y="74" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fontWeight="bold" fill="var(--black)" className="svg-dark-text">RAY-HEAD</text>
          <text x="45" y="86" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="#88857a" className="svg-dark-text">10.0.0.4</text>
        </g>

        {/* GPU worker node cluster */}
        <g 
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setHoveredNode("GPU-WORK-1")}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <rect 
            x="210" 
            y="15" 
            width="75" 
            height="34" 
            rx="4" 
            fill="#ffffff" 
            stroke={hoveredNode === "GPU-WORK-1" ? "var(--yellow-core)" : "rgba(17,16,11,0.12)"} 
            strokeWidth={hoveredNode === "GPU-WORK-1" ? "2" : "1.5"} 
            style={{ transition: "all 0.25s ease" }}
          />
          <text x="247" y="32" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--black)" className="svg-dark-text">GPU-WORK-1</text>
          <circle cx="272" cy="23" r="3" fill="#28c840" />
        </g>

        <g 
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setHoveredNode("GPU-WORK-2")}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <rect 
            x="210" 
            y="58" 
            width="75" 
            height="34" 
            rx="4" 
            fill="#ffffff" 
            stroke={hoveredNode === "GPU-WORK-2" ? "var(--yellow-core)" : "rgba(17,16,11,0.12)"} 
            strokeWidth={hoveredNode === "GPU-WORK-2" ? "2" : "1.5"} 
            style={{ transition: "all 0.25s ease" }}
          />
          <text x="247" y="75" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--black)" className="svg-dark-text">GPU-WORK-2</text>
          <circle cx="272" cy="66" r="3" fill="#28c840" />
        </g>

        <g 
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setHoveredNode("VECTOR-DB")}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <rect 
            x="210" 
            y="101" 
            width="75" 
            height="34" 
            rx="4" 
            fill="#ffffff" 
            stroke={hoveredNode === "VECTOR-DB" ? "var(--yellow-core)" : "rgba(17,16,11,0.12)"} 
            strokeWidth={hoveredNode === "VECTOR-DB" ? "2" : "1.5"} 
            style={{ transition: "all 0.25s ease" }}
          />
          <text x="247" y="118" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--black)" className="svg-dark-text">VECTOR-DB</text>
          <circle cx="272" cy="109" r="3" fill="var(--yellow-core)" />
        </g>

        {/* Dynamic task packet lines */}
        <path d="M 75,75 L 210,32" className="neural-edge" />
        <path d="M 75,75 L 210,75" className="neural-edge" />
        <path d="M 75,75 L 210,118" className="neural-edge" />

        <path d="M 75,75 L 210,32" className="neural-edge-glow" />
        <path d="M 75,75 L 210,75" className="neural-edge-glow" style={{ animationDelay: "1.5s" }} />
        <path d="M 75,75 L 210,118" className="neural-edge-glow" style={{ animationDelay: "3s" }} />

        {/* Tooltip Overlay */}
        {isRayHeadHovered && (
          <g className="telemetry-tooltip" role="tooltip" transform="translate(45, 48)" style={{ pointerEvents: "none" }}>
            <rect x="-45" y="-16" width="90" height="13" rx="3" fill="var(--black)" opacity="0.95" />
            <text textAnchor="middle" y="-7" fontFamily="var(--font-mono)" fontSize="5.5" fill="#ffffff" fontWeight="bold">RAY-HEAD | CPU Utilization: {stats.ray}%</text>
            <polygon points="-3,-2 3,-2 0,1" fill="var(--black)" opacity="0.95" />
          </g>
        )}

        {hoveredNode === "GPU-WORK-1" && (
          <g className="telemetry-tooltip" role="tooltip" transform="translate(247.5, 8)" style={{ pointerEvents: "none" }}>
            <rect x="-50" y="-16" width="100" height="13" rx="3" fill="var(--black)" opacity="0.95" />
            <text textAnchor="middle" y="-7" fontFamily="var(--font-mono)" fontSize="5.5" fill="#ffffff" fontWeight="bold">GPU-1 | GPU Utilization: {stats.gpu1}%</text>
            <polygon points="-3,-2 3,-2 0,1" fill="var(--black)" opacity="0.95" />
          </g>
        )}

        {hoveredNode === "GPU-WORK-2" && (
          <g className="telemetry-tooltip" role="tooltip" transform="translate(247.5, 51)" style={{ pointerEvents: "none" }}>
            <rect x="-50" y="-16" width="100" height="13" rx="3" fill="var(--black)" opacity="0.95" />
            <text textAnchor="middle" y="-7" fontFamily="var(--font-mono)" fontSize="5.5" fill="#ffffff" fontWeight="bold">GPU-2 | GPU Utilization: {stats.gpu2}%</text>
            <polygon points="-3,-2 3,-2 0,1" fill="var(--black)" opacity="0.95" />
          </g>
        )}

        {hoveredNode === "VECTOR-DB" && (
          <g className="telemetry-tooltip" role="tooltip" transform="translate(247.5, 94)" style={{ pointerEvents: "none" }}>
            <rect x="-55" y="-16" width="110" height="13" rx="3" fill="var(--black)" opacity="0.95" />
            <text textAnchor="middle" y="-7" fontFamily="var(--font-mono)" fontSize="5.5" fill="#ffffff" fontWeight="bold">V-DB | QPS: {stats.vdb}k/s | HNSW</text>
            <polygon points="-3,-2 3,-2 0,1" fill="var(--black)" opacity="0.95" />
          </g>
        )}
      </svg>
    </div>
  );
}

// 3. E-Commerce Traffic load distribution
function EcommVisual() {
  const [trafficIndex, setTrafficIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTrafficIndex((t) => (t + 1) % 4);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bento-visual ecomm-visual">
      <svg viewBox="0 0 350 150" className="visual-svg" style={{ width: "85%", height: "85%" }}>
        {/* Load Balancer */}
        <circle cx="60" cy="75" r="18" fill="var(--yellow-core)" />
        <text x="60" y="78" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fontWeight="bold" fill="var(--black)">ALB</text>

        {/* Auto Scaling Group target server nodes */}
        {[0, 1, 2].map((idx) => {
          const isActive = idx === trafficIndex % 3;
          const yPos = 24 + idx * 50;
          return (
            <g key={idx} transform={`translate(180, ${yPos})`}>
              <rect x="0" y="0" width="120" height="28" rx="4" fill="#ffffff" stroke={isActive ? "var(--yellow-core)" : "rgba(17,16,11,0.12)"} strokeWidth={isActive ? "2" : "1"} style={{ transition: "all 0.3s ease" }} />
              <text x="50" y="17" fontFamily="var(--font-sans)" fontSize="7" fontWeight={isActive ? "bold" : "normal"} fill="var(--black)" className="svg-dark-text">ASG-NODE-0{idx + 1}</text>
              <circle cx="108" cy="14" r="3.5" fill={isActive ? "#28c840" : "rgba(17,16,11,0.2)"} style={{ transition: "all 0.3s ease" }} />
              
              {/* Traffic connection line */}
              <path 
                d={`M -120,${75 - yPos} L 0,14`} 
                fill="none" 
                stroke={isActive ? "var(--yellow-core)" : "rgba(17,16,11,0.06)"} 
                strokeWidth={isActive ? "2" : "1.2"} 
                strokeDasharray={isActive ? "6 4" : "none"}
                className={isActive ? "tx-line" : ""}
                style={{ transition: "all 0.3s ease" }} 
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// 4. Healthcare Isolated VPC compliance radar sweep
function HealthVisual() {
  return (
    <div className="bento-visual health-visual">
      <svg viewBox="0 0 300 150" className="visual-svg" style={{ width: "80%", height: "80%" }}>
        {/* Compliance Radar Rings */}
        <circle cx="150" cy="75" r="60" fill="none" stroke="rgba(17,16,11,0.05)" strokeWidth="1.5" />
        <circle cx="150" cy="75" r="40" fill="none" stroke="rgba(17,16,11,0.03)" strokeWidth="1" />
        <circle cx="150" cy="75" r="20" fill="none" stroke="rgba(17,16,11,0.03)" strokeWidth="1" />

        {/* Active compliance scanner sweep line */}
        <line x1="150" y1="75" x2="210" y2="75" className="radar-line" style={{ transformOrigin: "150px 75px", animation: "spin 6s linear infinite" }} />
        
        {/* Safe status scan arc */}
        <path 
          d="M 150,75 L 210,75 A 60,60 0 0,1 192,117 Z" 
          className="radar-sweep-bar" 
          style={{ transformOrigin: "150px 75px", animation: "spin 6s linear infinite" }}
        />

        {/* Segmented network boundaries */}
        <rect x="135" y="60" width="30" height="30" rx="6" fill="#ffffff" stroke="var(--yellow-core)" strokeWidth="2" />
        {/* Secure Shield SVG element */}
        <path d="M 145,70 L 155,70 L 155,78 C 155,83  150,85  150,85 C 150,85  145,83  145,78 Z" fill="var(--yellow-core)" />

        <text x="150" y="145" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--black)" fontWeight="bold" letterSpacing="0.05em">HIPAA COMPLIANT NETWORK</text>
      </svg>
    </div>
  );
}

// 5. FinTech Low-latency low-jitter transaction routes
function FintechVisual() {
  const [activeStep, setActiveStep] = useState(0);
  const [tps, setTps] = useState(12480);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((s) => (s + 1) % 4);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTps(prev => prev + Math.floor(Math.random() * 200 - 80));
    }, 900);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { title: "Client Request", sub: "HTTPS POST", x: 30 },
    { title: "API Gateway", sub: "8.4ms p99", x: 185 },
    { title: "Security Verification", sub: "Check: Pass", x: 340 },
    { title: "Settlement", sub: "Ledger: Sync", x: 495 },
  ];

  return (
    <div className="bento-visual fintech-visual">
      <svg viewBox="0 0 680 120" className="visual-svg" style={{ width: "96%", height: "86%" }}>
        <defs>
          <marker id="ft-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 2 L 6 5 L 0 8 Z" fill="rgba(17,16,11,0.15)" />
          </marker>
          <marker id="ft-arrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 2 L 6 5 L 0 8 Z" fill="var(--yellow-core)" />
          </marker>
        </defs>

        {/* Subtle grid */}
        {[20, 45, 70, 95].map((y) => (
          <line key={y} x1="10" y1={y} x2="670" y2={y} stroke="rgba(17,16,11,0.02)" strokeWidth="1" />
        ))}

        {/* Live TPS counter (top right) */}
        <text x="655" y="16" textAnchor="end" fontFamily="var(--font-mono)" fontSize="8" fill="#88857a">TPS</text>
        <text x="655" y="28" textAnchor="end" fontFamily="var(--font-mono)" fontSize="9" fontWeight="bold" fill="var(--black)">{tps.toLocaleString()}</text>
        <circle cx="660" cy="23" r="3.5" fill="#28c840">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
        </circle>

        {/* Background connector lines */}
        <path d="M 140,55 L 181,55" fill="none" stroke="rgba(17,16,11,0.06)" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#ft-arrow)" />
        <path d="M 295,55 L 336,55" fill="none" stroke="rgba(17,16,11,0.06)" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#ft-arrow)" />
        <path d="M 450,55 L 491,55" fill="none" stroke="rgba(17,16,11,0.06)" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#ft-arrow)" />

        {/* Animated data-packet flow overlays */}
        <path d="M 140,55 L 181,55" fill="none" className="tx-line" strokeWidth="2" markerEnd="url(#ft-arrow-active)" />
        <path d="M 295,55 L 336,55" fill="none" className="tx-line" strokeWidth="2" style={{ animationDelay: "0.6s" }} markerEnd="url(#ft-arrow-active)" />
        <path d="M 450,55 L 491,55" fill="none" className="tx-line" strokeWidth="2" style={{ animationDelay: "1.2s" }} markerEnd="url(#ft-arrow-active)" />

        {/* Pipeline stage boxes */}
        {steps.map((step, idx) => {
          const isActive = idx === activeStep;
          const isCompleted = idx < activeStep;
          const strokeColor = isActive ? "var(--yellow-core)" : isCompleted ? "#28c840" : "rgba(17,16,11,0.12)";
          const fillColor   = isActive ? "rgba(242,200,75,0.06)" : isCompleted ? "rgba(40,200,64,0.03)" : "#ffffff";
          const statusColor = isActive ? "var(--yellow-deep)" : isCompleted ? "#28c840" : "#88857a";

          return (
            <g key={idx} transform={`translate(${step.x}, 30)`} style={{ transition: "all 0.35s ease" }} className={isActive ? "active-node" : isCompleted ? "completed-node" : ""}>
              {/* Active glow ring */}
              {isActive && (
                <rect x="-3" y="-3" width="116" height="56" rx="9" fill="none" stroke="var(--yellow-core)" strokeWidth="1" opacity="0.3" />
              )}
              <rect x="0" y="0" width="110" height="50" rx="6"
                fill={fillColor} stroke={strokeColor}
                strokeWidth={isActive ? "2" : "1.5"}
                style={{ transition: "all 0.3s ease" }}
              />
              {/* Stage title */}
              <text 
                x="26" 
                y="18" 
                fontFamily="var(--font-sans)" 
                fontSize={idx === 2 ? "7.5" : "9"} 
                fontWeight={isActive ? "bold" : "600"} 
                fill="var(--black)"
                textLength={idx === 2 ? 78 : undefined}
                lengthAdjust={idx === 2 ? "spacingAndGlyphs" : undefined}
                className="svg-dark-text"
              >
                {step.title}
              </text>

              {/* Stage number badge */}
              <rect x="6" y="7" width="14" height="14" rx="3"
                fill={isActive ? "var(--yellow-core)" : isCompleted ? "#28c840" : "rgba(17,16,11,0.06)"}
                style={{ transition: "all 0.3s ease" }}
              />
              <text x="13" y="18" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7"
                fontWeight="bold" fill={isActive || isCompleted ? "var(--black)" : "#88857a"}
                className="svg-dark-text"
              >{idx + 1}</text>

              {/* Sub-label / telemetry */}
              <text x="8" y="38" fontFamily="var(--font-mono)" fontSize="7.5" fill={statusColor} fontWeight="bold" className="svg-dark-text">
                {step.sub}
              </text>

              {/* Status dot */}
              <circle cx="100" cy="12" r="3.5"
                fill={isActive ? "var(--yellow-core)" : isCompleted ? "#28c840" : "rgba(17,16,11,0.15)"}
                style={{ transition: "all 0.3s ease" }}
              />
            </g>
          );
        })}

        {/* SLA footer label */}
        <text x="340" y="112" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#88857a" fontWeight="bold">SLO: 99.99% UPTIME · P99 LATENCY &lt; 10ms</text>
      </svg>
    </div>
  );
}

export default function SolutionsPage() {
  const [bentoBg, setBentoBg] = useState("#f2ede4");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme-color");
      if (theme === "green") {
        setBentoBg("#022312");
      } else if (theme === "cyan") {
        setBentoBg("#00222b");
      } else if (theme === "pastel") {
        setBentoBg("#ffffe6");
      } else if (theme === "blue") {
        setBentoBg("#1e3a8a");
      } else {
        setBentoBg("#f2ede4");
      }
    };

    checkTheme();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "data-theme-color") {
          checkTheme();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme-color"]
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const isResizingRef = useRef(false);
  const resizeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastResizeTimeRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      isResizingRef.current = true;
      lastResizeTimeRef.current = Date.now();
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
      resizeTimerRef.current = setTimeout(() => {
        isResizingRef.current = false;
      }, 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(".metrics-section, .about-cta");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.08 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const [hoveredCard, setHoveredCardState] = useState<number | null>(null);
  const setHoveredCard = useCallback((val: number | null) => {
    if (val === null) {
      const timeSinceResize = Date.now() - lastResizeTimeRef.current;
      if (isResizingRef.current || timeSinceResize < 1200) {
        return;
      }
    }
    setHoveredCardState(val);
  }, []);

  const [hoveredPod, setHoveredPodState] = useState<number | null>(null);
  const setHoveredPod = useCallback((val: number | null) => {
    if (val === null) {
      const timeSinceResize = Date.now() - lastResizeTimeRef.current;
      if (isResizingRef.current || timeSinceResize < 1200) {
        return;
      }
    }
    setHoveredPodState(val);
  }, []);

  const [hoveredNode, setHoveredNodeState] = useState<string | null>(null);
  const setHoveredNode = useCallback((val: string | null) => {
    if (val === null) {
      const timeSinceResize = Date.now() - lastResizeTimeRef.current;
      if (isResizingRef.current || timeSinceResize < 1200) {
        return;
      }
    }
    setHoveredNodeState(val);
  }, []);

  return (
    <main className="solutions-page" data-header-theme="light">
      <AmbientSystem />

      {/* ==========================================
          1. Hero Section
          ========================================== */}
      <section className="solutions-hero">
        <div className="solutions-hero__content">
          <h1>Infrastructure Solutions Built for <span className="hero-text-gradient">Modern Digital Platforms.</span></h1>
          <p>
            Avoid generic operations. We engineer secure, autoscaling, and compliant cloud architectures aligned to the unique workloads of high-growth technical domains.
          </p>
          <div className="button-row">
            <Button href="/contact" variant="primary">Schedule Infrastructure Assessment</Button>
            <Button href="#sectors" variant="secondary">Explore Sectors Grid</Button>
          </div>
        </div>

        <div className="solutions-hero__visual">
          <div className="globe-ambient-glow" />
          <SolutionsGlobe />
        </div>
      </section>

      {/* ==========================================
          2. Industries Bento Grid Section
          ========================================== */}
      <section className="bento-section" id="sectors" style={{ backgroundColor: bentoBg }}>
        <div className="bento-section-curve">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" shapeRendering="geometricPrecision">
            <path d="M 0,120 Q 720,0 1440,120 Z" fill={bentoBg} />
          </svg>
        </div>

        {/* Dynamic Background Routing System */}
        <div className="bento-bg-system" aria-hidden="true">
          <svg viewBox="0 0 1440 1000" preserveAspectRatio="none" overflow="visible" shapeRendering="geometricPrecision">
            {/* SaaS Routing Pathway */}
            <path
              id="saas-path"
              d="M 100,350 C 80,200 150,80 350,80 C 500,80 650,180 750,285"
              className={`bento-bg-path ${hoveredCard === 0 ? "active" : ""}`}
            />

            {/* AI Routing Pathway */}
            <path
              id="ai-path"
              d="M 750,285 C 850,380 1100,380 1250,280 C 1380,180 1200,50 868,-120"
              className={`bento-bg-path ${hoveredCard === 1 ? "active" : ""}`}
            />

            {/* E-Commerce Routing Pathway */}
            <path
              id="ecomm-path"
              d="M 1310,714 C 1000,680 700,680 400,680 C 100,680 80,550 254,526"
              className={`bento-bg-path ${hoveredCard === 2 ? "active" : ""}`}
            />

            {/* Healthcare Routing Pathway */}
            <path
              id="health-path"
              d="M 254,526 C 500,430 900,430 1150,450 C 1350,470 1350,320 1000,320 C 700,320 400,330 140,306"
              className={`bento-bg-path ${hoveredCard === 3 ? "active" : ""}`}
            />

            {/* FinTech Routing Pathway */}
            <path
              id="fintech-path"
              d="M 1600,1120 C 1400,950 1000,920 600,900 C 200,880 100,800 200,760 C 300,720 700,780 1305,712"
              className={`bento-bg-path ${hoveredCard === 4 ? "active" : ""}`}
            />
          </svg>
        </div>

        <h2>Tailored Operations Architecture</h2>
        <p className="bento-section__intro">
          Different digital products face different operational bottlenecks. We map infrastructure designs to solve specific security, latency, and scaling demands.
        </p>

        <div className="bento-grid">
          {/* SaaS Startups Card */}
          <article 
            className="bento-card span-3"
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <SaasVisual hoveredPod={hoveredPod} setHoveredPod={setHoveredPod} />
            <div className="bento-card__content">
              <h3>SaaS Startups</h3>
              <p>Standardized autoscaling clusters and unified self-service environments built to remove configuration blocks, optimize staging expenses, and unlock rapid developer velocity.</p>
              <div className="bento-card__details">
                <div className="bento-card__detail-list">
                  <h4>Infrastructure Capabilities</h4>
                  <ul>
                    <li>Kubernetes Scaling &amp; Node Groups</li>
                    <li>GitOps release pipelines (ArgoCD)</li>
                    <li>Multi-environment layouts (IaC)</li>
                  </ul>
                </div>
                <div className="bento-card__detail-list">
                  <h4>Targets &amp; Outcomes</h4>
                  <ul>
                    <li>Zero manual deployment blocks</li>
                    <li>Staging cost reduction: ~40%</li>
                    <li>Developer commit-to-prod &lt; 8min</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* AI Infrastructure Card */}
          <article 
            className="bento-card span-3"
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <AIVisual hoveredNode={hoveredNode} setHoveredNode={setHoveredNode} hoveredPod={hoveredPod} />
            <div className="bento-card__content">
              <h3>AI Infrastructure</h3>
              <p>Distributed compute frameworks (Ray, Slurm), GPU cluster allocation policies, model registration flows, and vector database subnets designed to run model training and scale production inference.</p>
              <div className="bento-card__details">
                <div className="bento-card__detail-list">
                  <h4>Infrastructure Capabilities</h4>
                  <ul>
                    <li>GPU slice scheduling and autoscaling</li>
                    <li>Distributed model caches allocation</li>
                    <li>Inference latency telemetry tracks</li>
                  </ul>
                </div>
                <div className="bento-card__detail-list">
                  <h4>Targets &amp; Outcomes</h4>
                  <ul>
                    <li>GPU utilization parameters &gt; 90%</li>
                    <li>Model pipeline latency verification</li>
                    <li>Distributed storage budgets tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* E-Commerce Scaling Card */}
          <article 
            className="bento-card span-4"
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <EcommVisual />
            <div className="bento-card__content">
              <h3>E-Commerce Scaling</h3>
              <p>Dynamic CDN caching nodes, load-balancing arrays, and database read-replicas engineered to maintain checkout flow safety and transaction speed during unpredictable user spikes.</p>
              <div className="bento-card__details">
                <div className="bento-card__detail-list">
                  <h4>Infrastructure Capabilities</h4>
                  <ul>
                    <li>Dynamic Auto Scaling Groups (ASG)</li>
                    <li>Multi-region replica synchronization</li>
                    <li>Latency-based traffic balancing</li>
                  </ul>
                </div>
                <div className="bento-card__detail-list">
                  <h4>Targets &amp; Outcomes</h4>
                  <ul>
                    <li>Zero check-out interruptions on spike</li>
                    <li>Global page loading speeds &lt; 1s</li>
                    <li>Database read lag &lt; 150ms</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* Healthcare Systems Card */}
          <article 
            className="bento-card span-2"
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <HealthVisual />
            <div className="bento-card__content">
              <h3>Healthcare Systems</h3>
              <p>Secure, audit-ready VPC topologies, automated Secrets rotation (HashiCorp Vault), and compliance logging scripts configured to meet strict HIPAA security standards.</p>
              <div className="bento-card__details">
                <div className="bento-card__detail-list">
                  <h4>Infrastructure Capabilities</h4>
                  <ul>
                    <li>Strict network segmentations (VPC)</li>
                    <li>Audit trail collection (CloudTrail)</li>
                    <li>Unified Identity Access Management (IAM)</li>
                  </ul>
                </div>
                <div className="bento-card__detail-list">
                  <h4>Targets &amp; Outcomes</h4>
                  <ul>
                    <li>100% HIPAA compliant setups</li>
                    <li>Secure zero-trust cloud boundaries</li>
                    <li>Automated credential key rotation</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* FinTech Platforms Card */}
          <article 
            className="bento-card span-6"
            onMouseEnter={() => setHoveredCard(4)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <FintechVisual />
            <div className="bento-card__content">
              <h3>FinTech Platforms</h3>
              <p>Low-latency payment routing subnets, SRE reliability verification parameters, and real-time monitoring channels designed to secure high-frequency transaction networks.</p>
              <div className="bento-card__details">
                <div className="bento-card__detail-list">
                  <h4>Infrastructure Capabilities</h4>
                  <ul>
                    <li>Low-latency isolated payment zones</li>
                    <li>Real-time SRE metrics dashboards</li>
                    <li>High-availability failover architectures</li>
                  </ul>
                </div>
                <div className="bento-card__detail-list">
                  <h4>Targets &amp; Outcomes</h4>
                  <ul>
                    <li>Transaction routing speeds &lt; 10ms</li>
                    <li>SLO tracking criteria: 99.99% uptime</li>
                    <li>Instant warning thresholds &lt; 2s</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className="bento-section-curve-bottom">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" shapeRendering="geometricPrecision">
            <path d="M 0,0 Q 720,120 1440,0 Z" fill={bentoBg} />
          </svg>
        </div>
      </section>

      {/* ==========================================
          3. Challenges to Solutions Section
          ========================================== */}
      <section className="challenge-solution-section">
        <p className="eyebrow" style={{ textAlign: "center" }}>Operations Audit</p>
        <h2>Infrastructure Challenges &amp; Solutions</h2>
        <div className="comparison-table">
          <div className="comparison-row">
            <div className="comparison-panel challenge">
              <strong>Slow Deployment Cycles</strong>
              <p>Manual testing and packaging tasks delay release times and introduce runtime environment discrepancies.</p>
            </div>
            <div className="comparison-panel solution">
              <strong>GitOps Pipelines Automation</strong>
              <p>Code merges automatically trigger parallel checking containers and package deployments directly into clusters.</p>
            </div>
          </div>

          <div className="comparison-row">
            <div className="comparison-panel challenge">
              <strong>Unpredictable Resource Waste</strong>
              <p>Static instances running 24/7 create excessive cloud spend and compile-time bottlenecks during quiet cycles.</p>
            </div>
            <div className="comparison-panel solution">
              <strong>Karpenter Node Autoscaling</strong>
              <p>Cluster capacity automatically expands and scales down in real time to match compute demand, reducing waste.</p>
            </div>
          </div>

          <div className="comparison-row">
            <div className="comparison-panel challenge">
              <strong>Opaque System Failures</strong>
              <p>Silent data drift and missing metric correlations create long incident resolution (MTTR) windows during crashes.</p>
            </div>
            <div className="comparison-panel solution">
              <strong>Centralized Observability</strong>
              <p>Central logs, traces aggregation, and alert threshold notifications map dependencies to locate bugs instantly.</p>
            </div>
          </div>

          <div className="comparison-row">
            <div className="comparison-panel challenge">
              <strong>Scaling Instability</strong>
              <p>Unexpected application traffic surges overwhelm rigid servers, resulting in connection timeouts and customer drops.</p>
            </div>
            <div className="comparison-panel solution">
              <strong>Automated Cluster Balancing</strong>
              <p>Dynamic load distribution sweeps coordinate autoscaling layers to spread requests across healthy nodes seamlessly.</p>
            </div>
          </div>

          <div className="comparison-row">
            <div className="comparison-panel challenge">
              <strong>Environment Layout Drift</strong>
              <p>Ad-hoc changes made directly via cloud consoles make environments impossible to reproduce or track correctly.</p>
            </div>
            <div className="comparison-panel solution">
              <strong>Declarative Infrastructure as Code</strong>
              <p>All cloud resources are declared in Terraform files, ensuring staging and production match perfectly.</p>
            </div>
          </div>

          <div className="comparison-row">
            <div className="comparison-panel challenge">
              <strong>Security Complexity</strong>
              <p>Fragmented access keys and static database passwords increase the threat vector of cluster leaks.</p>
            </div>
            <div className="comparison-panel solution">
              <strong>Zero-Trust IAM &amp; Secret Rotation</strong>
              <p>Role-based policies and temporary, automatically rotated secrets enforce strict least-privilege operations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. Operational Outcomes Section
          ========================================== */}
      <section className="metrics-section">
        <p className="eyebrow" style={{ textAlign: "center" }}>Impact</p>
        <h2>Measurable Outcomes</h2>
        <div className="metrics-row">
          <div className="metric-card">
            <span className="metric-value">99.99%</span>
            <span className="metric-label">Uptime Baseline</span>
            <p className="metric-desc">Stabilized using automated cluster healing, read-replicas, and globalCDN cache failovers.</p>
          </div>
          <div className="metric-card">
            <span className="metric-value">&lt; 8min</span>
            <span className="metric-label">Mean Time to Recover</span>
            <p className="metric-desc">Minimized through GitOps configuration overrides and automated deployment rollbacks.</p>
          </div>
          <div className="metric-card">
            <span className="metric-value">12x</span>
            <span className="metric-label">Release Frequency</span>
            <p className="metric-desc">Enabled developers with containerized parallel check matrices and self-service deployment pathways.</p>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. Closing CTA Section
          ========================================== */}
      <section className="about-cta">
        <div className="about-cta__content">
          <p className="eyebrow">Consultation</p>
          <h2>Build Infrastructure Designed for Scale</h2>
          <p>
            Review your cloud configuration boundaries, scaling thresholds, and pipeline velocities. Let us map out your next system modernization step.
          </p>
          <div className="button-row">
            <Button href="/contact" variant="primary">Schedule Assessment</Button>
            <Button href="/services" variant="secondary">View Services Grid</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
