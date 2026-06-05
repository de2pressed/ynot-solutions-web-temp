"use client";

import { useEffect, useState, useRef } from "react";

type AnimationPhase = "customer" | "reply" | "metrics";

function ScrambledText({ value }: { value: string }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let active = true;
    let frame = 0;
    const totalFrames = 28;
    const minScrambleFrames = 12;
    const chars = "0123456789%$-abcdefghijklmnopqrstuvwxyz#@*&";

    const scramble = () => {
      if (frame >= totalFrames) {
        if (active) setDisplayText(value);
        return;
      }

      const scrambled = value
        .split("")
        .map((char, index) => {
          if (char === " " || char === "-" || char === "%") return char;
          
          // Progressive sequential reveal with a guaranteed minimum scramble duration
          const indexSettleFrame = Math.max(
            minScrambleFrames,
            Math.floor((index / value.length) * (totalFrames - minScrambleFrames)) + minScrambleFrames
          );

          if (frame >= indexSettleFrame) {
            return char;
          }

          if (/\d/.test(char)) {
            return Math.floor(Math.random() * 10).toString();
          } else {
            return chars[Math.floor(Math.random() * chars.length)].toLowerCase();
          }
        })
        .join("");

      if (active) {
        setDisplayText(scrambled);
        frame++;
        setTimeout(scramble, 30);
      }
    };

    scramble();

    return () => {
      active = false;
    };
  }, [value]);

  return <>{displayText || value}</>;
}


export function DialogueConsoleVisual() {
  const [phase, setPhase] = useState<AnimationPhase>("customer");
  const [cycleKey, setCycleKey] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const runCycle = (key: number) => {
      // Force remount of customer bubble so animation replays every cycle
      setCycleKey(key);
      setPhase("customer");

      // 2. Transition to YNot reply after 2.2s
      timerRef.current = setTimeout(() => {
        setPhase("reply");

        // 3. Transition to metrics bar after 2.0s
        timerRef.current = setTimeout(() => {
          setPhase("metrics");

          // 4. Restart cycle after 5.0s
          timerRef.current = setTimeout(() => runCycle(key + 1), 5000);
        }, 2000);
      }, 2200);
    };

    runCycle(0);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="about-visual-card dialogue-console-card animate-appear is-chat-layout" data-testid="about-dialogue-console-visual">
      <div className="about-visual-card__body">
        <div className="dialogue-container">
          {/* Customer Message Bubble — key forces remount so animation replays each cycle */}
          <div key={`customer-${cycleKey}`} className="chat-bubble bubble-customer animate-slide-in">
            <div className="chat-avatar client-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor" className="avatar-svg">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A9.75 9.75 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="chat-content">
              <p className="chat-sender">Engineering Lead</p>
              <p className="chat-text">Hey, our deployment times are 1-2 hours!</p>
            </div>
          </div>

          {/* YNot Agent Message Reply Bubble */}
          {(phase === "reply" || phase === "metrics") && (
            <div className="chat-bubble bubble-ynot animate-slide-in-delayed">
              <div className="chat-avatar ynot-avatar">YNot</div>
              <div className="chat-content">
                <p className="chat-sender ynot-sender">Operations Automation</p>
                <p className="chat-text">Don&apos;t worry, we got you covered.</p>
              </div>
            </div>
          )}

          {/* Metrics Summary Bar */}
          {phase === "metrics" && (
            <div className="metrics-bar animate-scale-in">
              <div className="metric-bar-item">
                <span className="metric-bar-label">Deployment</span>
                <div className="metric-bar-values">
                  <span className="metric-old-val">
                    <ScrambledText value="1-2 hrs" />
                  </span>
                  <svg className="metric-arrow-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                  <span className="metric-new-val">
                    <ScrambledText value="5-10 mins" />
                  </span>
                </div>
              </div>

              <div className="metric-bar-divider" />

              <div className="metric-bar-item">
                <span className="metric-bar-label">Uptime</span>
                <div className="metric-bar-values">
                  <span className="metric-old-val">
                    <ScrambledText value="87%" />
                  </span>
                  <svg className="metric-arrow-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                  </svg>
                  <span className="metric-new-val">
                    <ScrambledText value="99%" />
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
