"use client";

import React, { useEffect, useState, useRef } from "react";
import { createTimeline, stagger } from "animejs";

export function MetricsBento() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // React states for animated values
  const [uptimeVal, setUptimeVal] = useState("90.00%");
  const [mttrVal, setMttrVal] = useState("240");
  const [freqVal, setFreqVal] = useState("1x");

  // Refs for SVG paths to animate stroke-dashoffset
  const uptimePathRef = useRef<SVGPathElement>(null);
  const uptimeAreaRef = useRef<SVGPathElement>(null);
  const mttrPathRef = useRef<SVGPathElement>(null);
  const mttrAreaRef = useRef<SVGPathElement>(null);
  const releaseLineRef = useRef<SVGPathElement>(null);

  // Ref for checking if animation already played
  const animatedRef = useRef(false);

  useEffect(() => {
    // 1. Prepare SVG path lengths for draw animation
    let uptimeLength = 0;
    let mttrLength = 0;
    let releaseLineLength = 0;

    if (uptimePathRef.current) {
      uptimeLength = uptimePathRef.current.getTotalLength();
      uptimePathRef.current.style.strokeDasharray = `${uptimeLength}`;
      uptimePathRef.current.style.strokeDashoffset = `${uptimeLength}`;
    }
    if (mttrPathRef.current) {
      mttrLength = mttrPathRef.current.getTotalLength();
      mttrPathRef.current.style.strokeDasharray = `${mttrLength}`;
      mttrPathRef.current.style.strokeDashoffset = `${mttrLength}`;
    }
    if (releaseLineRef.current) {
      releaseLineLength = releaseLineRef.current.getTotalLength();
      releaseLineRef.current.style.strokeDasharray = `${releaseLineLength}`;
      releaseLineRef.current.style.strokeDashoffset = `${releaseLineLength}`;
    }

    // Set initial scale of bars and opacity of areas to 0
    const bars = document.querySelectorAll(".velocity-bar");
    bars.forEach((bar) => {
      (bar as SVGElement).style.transform = "scaleY(0)";
      (bar as SVGElement).style.transformOrigin = "bottom";
    });

    if (uptimeAreaRef.current) {
      uptimeAreaRef.current.style.opacity = "0";
    }
    if (mttrAreaRef.current) {
      mttrAreaRef.current.style.opacity = "0";
    }

    // 2. Setup IntersectionObserver to trigger anime.js when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            triggerAnimations();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const triggerAnimations = () => {
      // Create master timeline
      const tl = createTimeline();

      // Target objects for value interpolation
      const countersObj = {
        uptime: 90.00,
        mttr: 240,
        freq: 1
      };

      // A. Animate counters (onRender callback updates the React state)
      tl.add(countersObj, {
        uptime: 99.99,
        round: 100, // round to 2 decimals
        duration: 2500,
        onRender: () => {
          setUptimeVal(countersObj.uptime.toFixed(2) + "%");
        }
      }, 0);

      tl.add(countersObj, {
        mttr: 8,
        round: 1,
        duration: 2200,
        onRender: () => {
          setUptimeVal((prev) => {
            // Keep the uptime state going and update mttr separately
            setMttrVal(Math.floor(countersObj.mttr).toString());
            return prev;
          });
        }
      }, 0);

      tl.add(countersObj, {
        freq: 10,
        round: 1,
        duration: 2000,
        onRender: () => {
          setFreqVal(Math.floor(countersObj.freq) + "x");
        }
      }, 200);

      // B. Animate Uptime SVG line and gradient fill
      if (uptimePathRef.current) {
        tl.add(uptimePathRef.current, {
          strokeDashoffset: 0,
          duration: 2200,
          ease: "easeInOutSine"
        }, 100);
      }

      if (uptimeAreaRef.current) {
        tl.add(uptimeAreaRef.current, {
          opacity: [0, 1],
          duration: 1500,
          ease: "linear"
        }, 1000);
      }

      // C. Animate MTTR SVG line and gradient fill
      if (mttrPathRef.current) {
        tl.add(mttrPathRef.current, {
          strokeDashoffset: 0,
          duration: 2000,
          ease: "easeInOutSine"
        }, 200);
      }

      if (mttrAreaRef.current) {
        tl.add(mttrAreaRef.current, {
          opacity: [0, 1],
          duration: 1500,
          ease: "linear"
        }, 1100);
      }

      // D. Stagger grow release velocity bars
      tl.add(".velocity-bar", {
        scaleY: [0, 1],
        opacity: [0.15, 0.85],
        duration: 1500,
        delay: stagger(80),
        ease: "easeOutElastic(1, 0.75)"
      }, 300);

      // E. Animate velocity spline line overlay
      if (releaseLineRef.current) {
        tl.add(releaseLineRef.current, {
          strokeDashoffset: 0,
          duration: 1800,
          ease: "easeInOutSine"
        }, 600);
      }
    };

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="metrics-bento-container" ref={containerRef}>
      <div className="metrics-bento">
        
        {/* Bento Card 1: Uptime Baseline (Width: 7 cols) */}
        <div className="bento-card bento-card-uptime">
          <div className="bento-card-header">
            <span className="bento-card-eyebrow">Availability SLA</span>
            <h3 className="bento-card-title">
              <span className="bento-counter-highlight">{uptimeVal}</span> Uptime Baseline
            </h3>
            <p className="bento-card-desc">
              Configured via self-healing cluster schedulers and multi-region database replications.
            </p>
          </div>
          
          <div className="bento-card-visual">
            <svg viewBox="0 0 500 150" className="bento-svg-graph">
              <defs>
                <linearGradient id="uptime-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--yellow-core)" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="var(--yellow-core)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="500" y2="20" stroke="var(--grid-line-color)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="var(--grid-line-color)" strokeWidth="1" />
              <line x1="0" y1="130" x2="500" y2="130" stroke="var(--grid-line-color)" strokeWidth="1" />
              
              {/* 95.0% SLA Threshold Limit Line */}
              <line x1="10" y1="100" x2="490" y2="100" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.65" />
              <text x="15" y="94" fill="#ef4444" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600" opacity="0.8">
                95.0% INDUSTRY SLA LIMIT
              </text>
              
              {/* Gradient Area Fill */}
              <path
                ref={uptimeAreaRef}
                d="M 10,80 C 60,95 100,50 140,110 C 170,140 190,125 210,120 C 230,120 250,45 280,35 C 310,20 350,20 490,20 L 490,140 L 10,140 Z"
                fill="url(#uptime-grad)"
              />
              
              {/* Main Graph Spline */}
              <path
                ref={uptimePathRef}
                d="M 10,80 C 60,95 100,50 140,110 C 170,140 190,125 210,120 C 230,120 250,45 280,35 C 310,20 350,20 490,20"
                fill="none"
                stroke="var(--yellow-core)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Glowing Interactive Current Dot */}
              <g transform="translate(490, 20)">
                <circle className="glowing-target-dot" r="6" fill="var(--yellow-core)" />
                <circle r="3" fill="var(--black)" />
              </g>
              
              <text x="440" y="14" fill="var(--muted)" fontSize="7.5" fontFamily="var(--font-mono)">
                CURRENT STATE
              </text>
            </svg>
          </div>
        </div>

        {/* Bento Card 2: MTTR (Width: 5 cols) */}
        <div className="bento-card bento-card-mttr">
          <div className="bento-card-header">
            <span className="bento-card-eyebrow">Recovery Threshold</span>
            <h3 className="bento-card-title">
              &lt; <span className="bento-counter-highlight">{mttrVal}m</span> MTTR
            </h3>
            <p className="bento-card-desc">
              Slashed recovery windows with GitOps state overrides and automated rollback triggers.
            </p>
          </div>
          
          <div className="bento-card-visual">
            <svg viewBox="0 0 400 150" className="bento-svg-graph">
              <defs>
                <linearGradient id="mttr-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.12" />
                  <stop offset="40%" stopColor="var(--yellow-core)" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="var(--yellow-core)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="0" y1="25" x2="400" y2="25" stroke="var(--grid-line-color)" strokeWidth="1" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="var(--grid-line-color)" strokeWidth="1" />
              <line x1="0" y1="130" x2="400" y2="130" stroke="var(--grid-line-color)" strokeWidth="1" />
              
              {/* Vertical Deployment Separator */}
              <line x1="160" y1="15" x2="160" y2="135" stroke="var(--grid-line-color)" strokeWidth="1.2" strokeDasharray="3 3" />
              <text x="166" y="22" fill="var(--muted)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="bold">
                YNOT ENFORCED
              </text>
              
              {/* Gradient Area Fill */}
              <path
                ref={mttrAreaRef}
                d="M 10,20 C 50,18 90,24 130,22 C 160,22 180,105 220,122 C 260,128 300,128 390,128 L 390,135 L 10,135 Z"
                fill="url(#mttr-grad)"
              />
              
              {/* Main Line showing recovery drop */}
              <path
                ref={mttrPathRef}
                d="M 10,20 C 50,18 90,24 130,22 C 160,22 180,105 220,122 C 260,128 300,128 390,128"
                fill="none"
                stroke="var(--yellow-core)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Glowing End Dot */}
              <g transform="translate(390, 128)">
                <circle className="glowing-target-dot" r="5" fill="var(--yellow-core)" />
                <circle r="2.5" fill="var(--black)" />
              </g>
              
              <text x="10" y="42" fill="#ef4444" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="600">
                MANUAL SRE: ~4 HRS
              </text>
              
              <text x="240" y="118" fill="var(--ink)" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="600">
                AUTO RECONCILED: 8 MIN
              </text>
            </svg>
          </div>
        </div>

        {/* Bento Card 3: Release Velocity (Width: 12 cols - full bottom) */}
        <div className="bento-card bento-card-velocity">
          <div className="bento-card-header bento-card-header-wide">
            <div className="wide-text-group">
              <span className="bento-card-eyebrow">Deployment Velocity</span>
              <h3 className="bento-card-title">
                <span className="bento-counter-highlight">{freqVal}</span> Release Frequency
              </h3>
              <p className="bento-card-desc">
                Enabled developers with containerized parallel check matrices and self-service deployment pathways.
              </p>
            </div>
            <div className="wide-stat-badge">
              <span className="badge-arrow">↑</span> 900% INCREASE
            </div>
          </div>
          
          <div className="bento-card-visual">
            <svg viewBox="0 0 1000 130" className="bento-svg-graph" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="1000" y2="20" stroke="var(--grid-line-color)" strokeWidth="1" />
              <line x1="0" y1="70" x2="1000" y2="70" stroke="var(--grid-line-color)" strokeWidth="1" />
              <line x1="0" y1="115" x2="1000" y2="115" stroke="var(--grid-line-color)" strokeWidth="1.2" />

              {/* 10 Columns representing Weeks 1-10 */}
              {[
                { week: 1, val: 10, label: "W1" },
                { week: 2, val: 10, label: "W2" },
                { week: 3, val: 18, label: "W3" },
                { week: 4, val: 18, label: "W4" },
                { week: 5, val: 32, label: "W5" }, // deploy
                { week: 6, val: 55, label: "W6" },
                { week: 7, val: 72, label: "W7" },
                { week: 8, val: 92, label: "W8" },
                { week: 9, val: 100, label: "W9" },
                { week: 10, val: 110, label: "W10" }
              ].map((item, idx) => {
                const barWidth = 44;
                const spacing = 50;
                const xCoord = 50 + idx * (barWidth + spacing);
                const height = item.val;
                const yCoord = 115 - height;
                
                return (
                  <g key={idx}>
                    {/* Background track */}
                    <rect
                      x={xCoord}
                      y="15"
                      width={barWidth}
                      height="100"
                      fill="rgba(17, 16, 11, 0.02)"
                      rx="4"
                    />
                    
                    {/* Active dynamic bar */}
                    <rect
                      className="velocity-bar"
                      x={xCoord}
                      y={yCoord}
                      width={barWidth}
                      height={height}
                      fill="var(--yellow-core)"
                      rx="4"
                      style={{
                        transformOrigin: `0px 115px`
                      }}
                    />
                    
                    {/* Week label */}
                    <text
                      x={xCoord + barWidth / 2}
                      y="126"
                      textAnchor="middle"
                      fill="var(--muted)"
                      fontSize="8"
                      fontFamily="var(--font-mono)"
                      fontWeight="bold"
                    >
                      {item.label}
                    </text>
                  </g>
                );
              })}

              {/* Overlay Trend Curve */}
              <path
                ref={releaseLineRef}
                d="M 72,105 C 166,105 260,97 354,83 C 448,83 542,60 636,43 C 730,23 824,15 918,5"
                fill="none"
                stroke="var(--black)"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.35"
              />
            </svg>
          </div>
        </div>
        
      </div>
    </div>
  );
}
