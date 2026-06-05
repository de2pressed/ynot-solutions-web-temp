"use client";

import React, { useState, useEffect } from "react";

function useThemeColor() {
  const [themeColor, setThemeColor] = useState<string>("white");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme-color") || "white";
      setThemeColor(theme);
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

    return () => observer.disconnect();
  }, []);

  return themeColor;
}

// ==========================================================================
// 1. Signal Correlation & Event Normalization Flow
// ==========================================================================
export function SignalCorrelationFlow() {
  const theme = useThemeColor();
  const isBlueTheme = theme === "blue";
  const [isNormalizing, setIsNormalizing] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const [alertTriggered, setAlertTriggered] = useState(false);

  const triggerCorrelation = () => {
    if (isNormalizing) return;
    setIsNormalizing(true);
    setAlertTriggered(false);
    setPulseActive(false);

    // Timeline of normalization
    setTimeout(() => {
      setPulseActive(true);
    }, 1200);

    setTimeout(() => {
      setAlertTriggered(true);
      setIsNormalizing(false);
    }, 2000);
  };

  return (
    <div className="ai-ops-card visual-card">
      <div className="visual-card__header">
        <span className="visual-card__title">telemetry signal correlation normalizer</span>
        <span className="visual-card__status">
          <span className={`status-light ${isNormalizing ? "active" : ""}`} />
          {isNormalizing ? "analyzing event stream" : alertTriggered ? "alert consolidated" : "listening"}
        </span>
      </div>

      <div className="visual-card__body correlation-visualizer-body" style={{ minHeight: "220px", position: "relative" }}>
        <svg viewBox="0 0 400 200" width="100%" height="100%" className="visual-svg">
          {/* Background grid lines */}
          <line x1="220" y1="10" x2="220" y2="190" stroke={isBlueTheme ? "rgba(255, 255, 255, 0.08)" : "rgba(17,16,11,0.04)"} strokeDasharray="3 3" />
          <line x1="100" y1="10" x2="100" y2="190" stroke={isBlueTheme ? "rgba(255, 255, 255, 0.08)" : "rgba(17,16,11,0.04)"} strokeDasharray="3 3" />

          {/* Paths from left nodes to central hub */}
          <path d="M 40,30 Q 150,30 220,100" fill="none" stroke={isNormalizing ? "var(--yellow-core)" : (isBlueTheme ? "rgba(255, 255, 255, 0.15)" : "rgba(17,16,11,0.08)")} strokeWidth="1.5" className={isNormalizing ? "flow-line-active" : ""} />
          <path d="M 40,65 Q 150,65 220,100" fill="none" stroke={isNormalizing ? "var(--yellow-core)" : (isBlueTheme ? "rgba(255, 255, 255, 0.15)" : "rgba(17,16,11,0.08)")} strokeWidth="1.5" className={isNormalizing ? "flow-line-active" : ""} />
          <path d="M 40,100 L 220,100" fill="none" stroke={isNormalizing ? "var(--yellow-core)" : (isBlueTheme ? "rgba(255, 255, 255, 0.15)" : "rgba(17,16,11,0.08)")} strokeWidth="1.5" className={isNormalizing ? "flow-line-active" : ""} />
          <path d="M 40,135 Q 150,135 220,100" fill="none" stroke={isNormalizing ? "var(--yellow-core)" : (isBlueTheme ? "rgba(255, 255, 255, 0.15)" : "rgba(17,16,11,0.08)")} strokeWidth="1.5" className={isNormalizing ? "flow-line-active" : ""} />
          <path d="M 40,170 Q 150,170 220,100" fill="none" stroke={isNormalizing ? "var(--yellow-core)" : (isBlueTheme ? "rgba(255, 255, 255, 0.15)" : "rgba(17,16,11,0.08)")} strokeWidth="1.5" className={isNormalizing ? "flow-line-active" : ""} />

          {/* Connection path to output node */}
          <line x1="220" y1="100" x2="330" y2="100" stroke={alertTriggered ? "#c9403a" : (isBlueTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(17,16,11,0.1)")} strokeWidth="2" style={{ transition: "stroke 0.4s ease" }} />

          {/* Normalizing particles */}
          {isNormalizing && (
            <>
              <circle r="3" fill="var(--yellow-core)">
                <animateMotion dur="1.2s" repeatCount="indefinite" path="M 40,30 Q 150,30 220,100" />
              </circle>
              <circle r="3" fill="var(--yellow-core)">
                <animateMotion dur="1.2s" repeatCount="indefinite" path="M 40,65 Q 150,65 220,100" begin="0.3s" />
              </circle>
              <circle r="3" fill="var(--yellow-core)">
                <animateMotion dur="1.2s" repeatCount="indefinite" path="M 40,100 L 220,100" begin="0.1s" />
              </circle>
              <circle r="3" fill="var(--yellow-core)">
                <animateMotion dur="1.2s" repeatCount="indefinite" path="M 40,135 Q 150,135 220,100" begin="0.5s" />
              </circle>
              <circle r="3" fill="var(--yellow-core)">
                <animateMotion dur="1.2s" repeatCount="indefinite" path="M 40,170 Q 150,170 220,100" begin="0.2s" />
              </circle>
            </>
          )}

          {/* Left Signal Sources */}
          {[
            { y: 30, label: "EKS OOM Logs" },
            { y: 65, label: "VPC Flow Drops" },
            { y: 100, label: "APM Latency" },
            { y: 135, label: "RDS Queue Spikes" },
            { y: 170, label: "Auth Failures" },
          ].map((src, i) => (
            <g key={i}>
              <circle cx="40" cy={src.y} r="5" fill={isNormalizing ? "var(--yellow-core)" : (isBlueTheme ? "rgba(255, 255, 255, 0.4)" : "var(--black)")} style={{ transition: "fill 0.3s ease" }} />
              <text x="52" y={src.y + 3} fontFamily="var(--font-mono)" fontSize="6.5" fill={isBlueTheme ? "rgba(238, 242, 255, 0.75)" : "#88857a"} fontWeight="bold">
                {src.label}
              </text>
            </g>
          ))}

          {/* Central Hub Node (Correlation Engine) */}
          <g transform="translate(220, 100)">
            {pulseActive && (
              <circle r="18" fill="none" stroke="var(--yellow-core)" strokeWidth="1" opacity="0.6" className="pulse-circle-ring" />
            )}
            <circle r="12" fill={pulseActive ? "var(--yellow-core)" : "#ffffff"} stroke={isBlueTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(17,16,11,0.18)"} strokeWidth="1.5" style={{ transition: "all 0.3s ease" }} />
            <text textAnchor="middle" y="2" fontFamily="var(--font-mono)" fontSize="5.5" fontWeight="bold" fill={isBlueTheme ? "#050a2e" : "var(--black)"}>
              CO-1
            </text>
            <text textAnchor="middle" y="22" fontFamily="var(--font-mono)" fontSize="6" fill={isBlueTheme ? "rgba(238, 242, 255, 0.6)" : "#88857a"} fontWeight="bold">
              ENG-CORE
            </text>
          </g>

          {/* Consolidated Output Node */}
          <g transform="translate(330, 100)">
            <circle
              r={alertTriggered ? 14 : 10}
              fill={alertTriggered ? "#c9403a" : "#ffffff"}
              stroke={alertTriggered ? "#c9403a" : (isBlueTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(17,16,11,0.18)")}
              strokeWidth="2"
              style={{ transition: "all 0.4s ease" }}
            />
            <path
              d="M -3,-5 L 3,-5 L 3,1 L -3,1 Z M -3,3 L 3,3 L 3,5 L -3,5 Z"
              fill={alertTriggered ? "#ffffff" : (isBlueTheme ? "rgba(238, 242, 255, 0.6)" : "rgba(17,16,11,0.4)")}
              transform="scale(0.8)"
            />
            {alertTriggered && (
              <circle r="20" fill="none" stroke="#c9403a" strokeWidth="1" opacity="0.45" className="pulse-circle-ring" />
            )}
            <text textAnchor="middle" y="25" fontFamily="var(--font-mono)" fontSize="6" fill={alertTriggered ? "#c9403a" : (isBlueTheme ? "rgba(238, 242, 255, 0.6)" : "#88857a")} fontWeight="bold">
              ROOT ALERT
            </text>
          </g>
        </svg>

        {/* Overlay normalizer telemetry console */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            right: "10px",
            background: isBlueTheme ? "#050a2e" : "#080808",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "6px",
            padding: "8px 12px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--yellow-core)",
            textAlign: "left",
          }}
        >
          {isNormalizing ? (
            <div>
              <span style={{ color: isBlueTheme ? "#93c5fd" : "#8a8578" }}>[STREAM]</span> Deduplicating 4,821 telemetry indicators...
            </div>
          ) : alertTriggered ? (
            <div>
              <span style={{ color: isBlueTheme ? "#f87171" : "#c9403a", fontWeight: "bold" }}>[ALIGNED ROOT CAUSE]</span> 5 systems mapped. Cause: DB connection leaks in order-api deployment commit #814-F.
            </div>
          ) : (
            <div>
              <span style={{ color: isBlueTheme ? "#93c5fd" : "#8a8578" }}>[SYSTEM IDLE]</span> Telemetry normalizer running. No anomalous signals.
            </div>
          )}
        </div>
      </div>

      <div className="visual-card__footer" style={{ borderTop: "1px solid rgba(17,16,11,0.06)", padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.74rem", color: isBlueTheme ? "rgba(255, 255, 255, 0.6)" : "#666359", fontFamily: "var(--font-mono)" }}>
          {alertTriggered ? "Compression: 4,821 logs -> 1 alert" : "99.98% noise reduction ratio"}
        </span>
        <button
          onClick={triggerCorrelation}
          className="playback-btn"
          style={{
            background: isBlueTheme ? "#eef2ff" : "var(--black)",
            color: isBlueTheme ? "#2563EB" : "var(--yellow-core)",
            border: isBlueTheme ? "1px solid #eef2ff" : "1px solid var(--black)",
            padding: "5px 12px",
            borderRadius: "4px",
            fontSize: "0.7rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          {isNormalizing ? "Processing..." : alertTriggered ? "Reset Stream" : "Simulate Alert Storm"}
        </button>
      </div>
    </div>
  );
}

// ==========================================================================
// 2. Interactive Dependency & Blast Radius Map
// ==========================================================================
interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  type: string;
  description: string;
}

export function DependencyBlastRadiusMap() {
  const theme = useThemeColor();
  const isBlueTheme = theme === "blue";
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes: Node[] = [
    { id: "gateway", name: "api-gateway", x: 200, y: 30, type: "service", description: "Edge Router & Ingress Gateway" },
    { id: "auth", name: "auth-svc", x: 100, y: 95, type: "service", description: "Identity & Tokens Controller" },
    { id: "payment", name: "payment-api", x: 200, y: 95, type: "service", description: "Transaction Router" },
    { id: "order", name: "order-svc", x: 300, y: 95, type: "service", description: "Order Processing Engine" },
    { id: "userdb", name: "user-db-replica", x: 80, y: 165, type: "database", description: "Auth Read Replica Datastore" },
    { id: "maindb", name: "main-sql-cluster", x: 250, y: 165, type: "database", description: "Order Write Leader Database" },
  ];

  const connections = [
    { from: "gateway", to: "auth" },
    { from: "gateway", to: "payment" },
    { from: "gateway", to: "order" },
    { from: "payment", to: "maindb" },
    { from: "order", to: "maindb" },
    { from: "auth", to: "userdb" },
  ];

  // Helper to determine downstream blast radius based on hovered node
  const getBlastRadius = (nodeId: string | null): string[] => {
    if (!nodeId) return [];
    const affected = [nodeId];

    if (nodeId === "maindb") {
      affected.push("payment", "order", "gateway");
    } else if (nodeId === "userdb") {
      affected.push("auth", "gateway");
    } else if (nodeId === "payment") {
      affected.push("gateway");
    } else if (nodeId === "order") {
      affected.push("gateway");
    } else if (nodeId === "auth") {
      affected.push("gateway");
    }

    return affected;
  };

  const blastRadiusList = getBlastRadius(hoveredNode);

  return (
    <div className="ai-ops-card visual-card">
      <div className="visual-card__header">
        <span className="visual-card__title">interactive topology blast radius analyzer</span>
        <span className="visual-card__status">
          <span className={`status-light ${hoveredNode ? "active" : ""}`} style={{ background: hoveredNode ? "#c9403a" : (isBlueTheme ? "#eef2ff" : "var(--yellow-core)") }} />
          {hoveredNode ? "simulating cascade failure" : "hover node to analyze"}
        </span>
      </div>

      <div className="visual-card__body dependency-map-body">
        {/* Topology Map */}
        <div style={{ position: "relative" }}>
          <svg viewBox="0 0 400 200" width="100%" height="100%" className="visual-svg">
            {/* Connection Links */}
            {connections.map((conn, idx) => {
              const fromNode = nodes.find((n) => n.id === conn.from)!;
              const toNode = nodes.find((n) => n.id === conn.to)!;
              const isAffected = blastRadiusList.includes(conn.from) && blastRadiusList.includes(conn.to);

              return (
                <line
                  key={idx}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isAffected ? "#c9403a" : (isBlueTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(17,16,11,0.12)")}
                  strokeWidth={isAffected ? "2.5" : "1.2"}
                  strokeDasharray={isAffected ? "5 3" : "none"}
                  style={{ transition: "all 0.3s ease" }}
                  className={isAffected ? "neural-edge-glow" : ""}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const isHovered = hoveredNode === node.id;
              const isAffected = blastRadiusList.includes(node.id);

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Blast Radius Pulse */}
                  {isHovered && (
                    <circle r="32" fill="none" stroke="#c9403a" strokeWidth="1" opacity="0.4" className="pulse-circle-ring" />
                  )}
                  <circle
                    r={isHovered ? 14 : 11}
                    fill={isAffected ? (isHovered ? "#c9403a" : "#fcdad7") : "#ffffff"}
                    stroke={isAffected ? "#c9403a" : (isBlueTheme ? "rgba(255, 255, 255, 0.3)" : "rgba(17,16,11,0.18)")}
                    strokeWidth={isHovered ? "2.5" : "1.5"}
                    style={{ transition: "all 0.25s ease" }}
                  />
                  <text
                    textAnchor="middle"
                    y="3"
                    fontFamily="var(--font-mono)"
                    fontSize="5"
                    fontWeight="bold"
                    fill={isHovered ? "#ffffff" : (isBlueTheme ? "#050a2e" : "var(--black)")}
                  >
                    {node.type === "database" ? "DB" : "SVC"}
                  </text>
                  <text
                    textAnchor="middle"
                    y="22"
                    fontFamily="var(--font-mono)"
                    fontSize="5.5"
                    fontWeight={isHovered ? "bold" : "normal"}
                    fill={isAffected ? "#c9403a" : (isBlueTheme ? "rgba(238, 242, 255, 0.82)" : "#666359")}
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend / Metrics sidebar */}
        <div
          style={{
            background: isBlueTheme ? "rgba(255, 255, 255, 0.05)" : "rgba(17,16,11,0.03)",
            borderLeft: isBlueTheme ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(17,16,11,0.06)",
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "left",
          }}
        >
          {hoveredNode ? (
            (() => {
              const node = nodes.find((n) => n.id === hoveredNode)!;
              return (
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", textTransform: "uppercase", color: isBlueTheme ? "rgba(238, 242, 255, 0.5)" : "#8a8578", fontWeight: "bold" }}>
                    SIMULATING IMPACT
                  </div>
                  <strong style={{ display: "block", fontSize: "0.9rem", color: isBlueTheme ? "#ffffff" : "var(--black)", marginTop: "4px" }}>
                    {node.name}
                  </strong>
                  <span style={{ fontSize: "0.74rem", color: isBlueTheme ? "rgba(238, 242, 255, 0.8)" : "#666359", display: "block", marginTop: "2px" }}>
                    {node.description}
                  </span>

                  <div style={{ borderTop: isBlueTheme ? "1px dashed rgba(255, 255, 255, 0.2)" : "1px dashed rgba(17,16,11,0.15)", marginTop: "10px", paddingTop: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "4px" }}>
                      <span style={{ color: isBlueTheme ? "rgba(238, 242, 255, 0.8)" : "#666359" }}>Blast Radius:</span>
                      <strong style={{ color: blastRadiusList.length > 3 ? "#c9403a" : "var(--yellow-deep)" }}>
                        {blastRadiusList.length > 3 ? "SYSTEMIC" : "LOCAL"}
                      </strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "4px" }}>
                      <span style={{ color: isBlueTheme ? "rgba(238, 242, 255, 0.8)" : "#666359" }}>Affected Nodes:</span>
                      <strong style={{ color: isBlueTheme ? "#ffffff" : "var(--black)" }}>{blastRadiusList.length} / 6</strong>
                    </div>
                    <div style={{ fontSize: "0.7rem", color: isBlueTheme ? "rgba(238, 242, 255, 0.6)" : "#888078", fontFamily: "var(--font-mono)", lineHeight: "1.3", marginTop: "6px" }}>
                      Impact Path: <br />
                      {blastRadiusList.join(" -> ")}
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div style={{ textAlign: "center", width: "100%" }}>
              <p style={{ fontSize: "0.82rem", color: isBlueTheme ? "rgba(238, 242, 255, 0.8)" : "#666359", margin: 0, lineHeight: "1.4" }}>
                Hover any node inside the topology map to execute a live **blast radius simulation** and observe cascade paths.
              </p>
              <div style={{ display: "flex", gap: "8px", marginTop: "12px", fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: isBlueTheme ? "rgba(238, 242, 255, 0.8)" : "inherit" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: isBlueTheme ? "rgba(255, 255, 255, 0.4)" : "rgba(17,16,11,0.2)" }} /> Normal
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c9403a" }} /> Affected
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 3. Predictive Capacity Drift Chart
// ==========================================================================
export function PredictiveDriftChart() {
  const theme = useThemeColor();
  const isBlueTheme = theme === "blue";
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Time-series mock telemetry
  const data = [
    { time: "11:00", actual: 42, baseline: 40, forecast: 42, isDrifting: false },
    { time: "11:05", actual: 44, baseline: 40, forecast: 44, isDrifting: false },
    { time: "11:10", actual: 43, baseline: 41, forecast: 43, isDrifting: false },
    { time: "11:15", actual: 48, baseline: 40, forecast: 48, isDrifting: false },
    { time: "11:20", actual: 55, baseline: 41, forecast: 55, isDrifting: true }, // Drift start detected
    { time: "11:25", actual: 64, baseline: 40, forecast: 65, isDrifting: true },
    { time: "11:30", actual: 78, baseline: 41, forecast: 82, isDrifting: true },
    { time: "11:35", actual: 91, baseline: 40, forecast: 95, isDrifting: true }, // Near exhaustion
  ];

  // Convert points to SVG polyline coordinates
  const getCoordinates = (type: "actual" | "baseline" | "forecast") => {
    return data
      .map((pt, idx) => {
        const x = 30 + idx * 48;
        const val = type === "actual" && idx > 7 ? pt.forecast : pt[type];
        const y = 150 - (val / 100) * 120;
        return `${x},${y}`;
      })
      .join(" ");
  };

  const actualCoords = getCoordinates("actual");
  const baselineCoords = getCoordinates("baseline");
  const forecastCoords = getCoordinates("forecast");

  return (
    <div className="ai-ops-card visual-card">
      <div className="visual-card__header">
        <span className="visual-card__title">early anomaly & resource exhaustion forecaster</span>
        <span className="visual-card__status">
          <span className="status-light active" style={{ background: "var(--yellow-deep)" }} />
          early drift alarm active
        </span>
      </div>

      <div className="visual-card__body drift-chart-body" style={{ minHeight: "220px", position: "relative" }}>
        <svg viewBox="0 0 400 180" width="100%" height="100%" className="visual-svg">
          {/* Chart Y Grid lines */}
          <line x1="20" y1="30" x2="380" y2="30" stroke={isBlueTheme ? "rgba(255, 255, 255, 0.08)" : "rgba(17,16,11,0.04)"} strokeWidth="1" />
          <line x1="20" y1="90" x2="380" y2="90" stroke={isBlueTheme ? "rgba(255, 255, 255, 0.08)" : "rgba(17,16,11,0.04)"} strokeWidth="1" />
          <line x1="20" y1="150" x2="380" y2="150" stroke={isBlueTheme ? "rgba(255, 255, 255, 0.15)" : "rgba(17,16,11,0.08)"} strokeWidth="1.2" />

          {/* Chart Y Labels */}
          <text x="12" y="33" fontFamily="var(--font-mono)" fontSize="6" fill={isBlueTheme ? "rgba(238, 242, 255, 0.6)" : "#88857a"} textAnchor="end">100%</text>
          <text x="12" y="93" fontFamily="var(--font-mono)" fontSize="6" fill={isBlueTheme ? "rgba(238, 242, 255, 0.6)" : "#88857a"} textAnchor="end">50%</text>
          <text x="12" y="153" fontFamily="var(--font-mono)" fontSize="6" fill={isBlueTheme ? "rgba(238, 242, 255, 0.6)" : "#88857a"} textAnchor="end">0%</text>

          {/* Baseline path */}
          <polyline points={baselineCoords} fill="none" stroke={isBlueTheme ? "rgba(255, 255, 255, 0.4)" : "rgba(17,16,11,0.22)"} strokeWidth="1.2" strokeDasharray="3 3" />

          {/* Forecasted drift boundary */}
          <polyline points={forecastCoords} fill="none" stroke="rgba(242,200,75,0.4)" strokeWidth="4" strokeLinecap="round" />

          {/* Actual telemetry path */}
          <polyline points={actualCoords} fill="none" stroke={isBlueTheme ? "#ffffff" : "var(--black)"} strokeWidth="2" strokeLinecap="round" />

          {/* Early warning trigger marker at Index 4 (11:20) */}
          <g transform="translate(222, 84)">
            <circle r="5" fill={isBlueTheme ? "#eef2ff" : "var(--yellow-deep)"} stroke={isBlueTheme ? "#eef2ff" : "#ffffff"} strokeWidth="1.5" />
            <circle r="10" fill="none" stroke="var(--yellow-core)" strokeWidth="1" opacity="0.65" className="pulse-circle-ring" />
            <line x1="0" y1="0" x2="0" y2="-30" stroke={isBlueTheme ? "#eef2ff" : "var(--yellow-deep)"} strokeWidth="1" strokeDasharray="2 2" />
            <rect x="-35" y="-42" width="70" height="10" rx="2" fill={isBlueTheme ? "#050a2e" : "var(--black)"} />
            <text x="0" y="-35" fontFamily="var(--font-mono)" fontSize="5" fill="#ffffff" textAnchor="middle" fontWeight="bold">
              DRIFT ALARM (38m)
            </text>
          </g>

          {/* Data Points */}
          {data.map((pt, idx) => {
            const x = 30 + idx * 48;
            const y = 150 - (pt.actual / 100) * 120;
            const isHovered = hoveredIdx === idx;

            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 3.5}
                  fill={pt.isDrifting ? "var(--yellow-core)" : (isBlueTheme ? "#ffffff" : "var(--black)")}
                  style={{ transition: "all 0.2s ease" }}
                />
                {isHovered && (
                  <line x1={x} y1={y} x2={x} y2="150" stroke={isBlueTheme ? "rgba(255, 255, 255, 0.3)" : "rgba(17,16,11,0.2)"} strokeWidth="1" strokeDasharray="2 2" />
                )}
                {/* X labels */}
                <text x={x} y="166" fontFamily="var(--font-mono)" fontSize="6" fill={isBlueTheme ? "rgba(238, 242, 255, 0.6)" : "#88857a"} textAnchor="middle">
                  {pt.time}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Telemetry info box */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: isBlueTheme ? "rgba(5, 10, 46, 0.85)" : "rgba(255,255,255,0.85)",
            backdropFilter: "blur(4px)",
            border: isBlueTheme ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(17,16,11,0.1)",
            borderRadius: "6px",
            padding: "8px 12px",
            textAlign: "left",
            fontSize: "0.72rem",
            color: isBlueTheme ? "#ffffff" : "inherit"
          }}
        >
          {hoveredIdx !== null ? (
            (() => {
              const pt = data[hoveredIdx];
              return (
                <div>
                  <strong style={{ display: "block", fontSize: "0.78rem" }}>Time: {pt.time}</strong>
                  <div style={{ color: isBlueTheme ? "rgba(238, 242, 255, 0.8)" : "#666359", marginTop: "2px" }}>
                    Allocation: <strong style={{ color: isBlueTheme ? "#ffffff" : "var(--black)" }}>{pt.actual}%</strong><br />
                    Baseline: <strong>{pt.baseline}%</strong><br />
                    State: <strong style={{ color: pt.isDrifting ? "var(--yellow-deep)" : "#28c840" }}>
                      {pt.isDrifting ? "ANOMALOUS DRIFT" : "NORMAL"}
                    </strong>
                  </div>
                </div>
              );
            })()
          ) : (
            <div>
              <strong style={{ display: "block", fontSize: "0.78rem" }}>Drift Forecasting</strong>
              <span style={{ color: isBlueTheme ? "rgba(238, 242, 255, 0.8)" : "#666359", fontSize: "0.68rem" }}>
                Hover chart nodes to trace RAM utilization baselines vs predictive forecast vectors.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 4. Autonomous Remediation Playbook Run
// ==========================================================================
export function AutonomousRemediationTimeline() {
  const theme = useThemeColor();
  const isBlueTheme = theme === "blue";
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. Detection",
      subtitle: "Anomaly Identified",
      desc: "API gateway latency spikes above p99 threshold (+4200ms). Memory leak classification triggered.",
      log: [
        "[11:24:02] ALERT: api-gateway ingress latency > 4000ms threshold",
        "[11:24:05] SRE-ENGINE: Classifying incident telemetry... signature match: Leak",
        "[11:24:08] AIOPS: Triggering priority-1 triage loop. Incident Ticket #9108 created."
      ]
    },
    {
      title: "2. Correlation",
      subtitle: "Blast Radius & Traces",
      desc: "Isolated transaction logs, deployment registries, and traces. Traced cause to Git Commit #1904-B.",
      log: [
        "[11:24:12] ENGINE: Graphing active dependencies. Blast radius: local payment system",
        "[11:24:15] APM: Trace validation shows connection pool lock in payment-svc container",
        "[11:24:18] GIT: Cross-correlating telemetry. Trigger event: Git push commit #1904-B"
      ]
    },
    {
      title: "3. Mitigation",
      subtitle: "Autonomous Remediation",
      desc: "Triggered self-healing playbook. Diverted traffic to secondary zone and initiated rollback.",
      log: [
        "[11:24:22] REMEDIATION: Initializing auto-mitigation runbook 'Zone-Failover'",
        "[11:24:25] TRAFFIC: Rerouting 100% gateway traffic to zone us-east-1b. Success.",
        "[11:24:29] GITOPS: Dispatching rollback task: reverting commit #1904-B on payment-svc"
      ]
    },
    {
      title: "4. Recovery",
      subtitle: "System Restored",
      desc: "Deployment reverted, latency returned to 110ms normal baseline. MTTR: 82s.",
      log: [
        "[11:25:10] HELM: Rollback completed. Pods starting up in healthy states.",
        "[11:25:15] APM: Ingress latency dropped to 110ms normal baseline.",
        "[11:25:24] RESOLVED: Closing incident ticket #9108. Auto-remediation run successful."
      ]
    }
  ];

  return (
    <div className="ai-ops-card visual-card timeline-card">
      {/* Timeline Steps */}
      <div className="timeline-steps">
        {steps.map((step, idx) => {
          const isActive = idx === activeStep;
          const isCompleted = idx < activeStep;

          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              style={{
                background: "transparent",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                backgroundColor: isActive ? (isBlueTheme ? "rgba(255, 255, 255, 0.12)" : "rgba(242, 200, 75, 0.08)") : "transparent",
                borderLeft: isActive ? (isBlueTheme ? "3px solid #ffffff" : "3px solid var(--yellow-core)") : "3px solid transparent",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: isActive ? (isBlueTheme ? "#ffffff" : "var(--yellow-deep)") : isCompleted ? "#28c840" : (isBlueTheme ? "rgba(255, 255, 255, 0.5)" : "#88857a"), fontWeight: "bold" }}>
                {step.title}
              </div>
              <strong style={{ display: "block", fontSize: "0.8rem", color: isBlueTheme ? "#ffffff" : "var(--black)", marginTop: "2px" }}>
                {step.subtitle}
              </strong>
            </button>
          );
        })}
      </div>

      {/* active Step Detail & Console Log Output */}
      <div className="timeline-split">
        {/* Detail */}
        <div style={{ textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h4 style={{ margin: "0 0 6px 0", fontSize: "0.95rem", fontWeight: "bold", color: isBlueTheme ? "#ffffff" : "var(--black)" }}>
            {steps[activeStep].subtitle}
          </h4>
          <p style={{ margin: 0, fontSize: "0.86rem", color: isBlueTheme ? "rgba(238, 242, 255, 0.85)" : "#555246", lineHeight: "1.45" }}>
            {steps[activeStep].desc}
          </p>
        </div>

        {/* Console Log */}
        <div
          style={{
            background: isBlueTheme ? "#050a2e" : "#080808",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            padding: "12px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: "#e8e5d8",
            textAlign: "left",
            minHeight: "100px",
            boxShadow: "inset 0 1px 4px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ color: isBlueTheme ? "#ffffff" : "var(--yellow-core)", borderBottom: isBlueTheme ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(242,200,75,0.15)", paddingBottom: "4px", marginBottom: "6px", fontSize: "0.6rem" }}>
            AUTONOMOUS OPERATIONS LOG TRAIL // STAGE: {steps[activeStep].title.toUpperCase()}
          </div>
          {steps[activeStep].log.map((line, i) => (
            <div key={i} style={{ marginBottom: "3px", lineHeight: "1.4" }}>
              {line}
            </div>
          ))}
          <div style={{ color: isBlueTheme ? "rgba(238, 242, 255, 0.5)" : "#8a8578", marginTop: "4px" }}>_</div>
        </div>
      </div>
    </div>
  );
}
