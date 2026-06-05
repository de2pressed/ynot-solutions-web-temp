"use client";

import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// ── Geographic Coordinate Helper ──────────────────────────────────────────
function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// ── Great Arc Geometry Helper ──────────────────────────────────────
class GreatCircleCurve extends THREE.Curve<THREE.Vector3> {
  v1: THREE.Vector3;
  v2: THREE.Vector3;
  radius: number;
  altitude: number;

  constructor(v1: THREE.Vector3, v2: THREE.Vector3, radius: number, altitude = 0.12) {
    super();
    this.v1 = v1.clone().normalize();
    this.v2 = v2.clone().normalize();
    this.radius = radius;
    this.altitude = altitude;
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()): THREE.Vector3 {
    const angle = this.v1.angleTo(this.v2);
    const sinTotal = Math.sin(angle);

    let base: THREE.Vector3;
    if (sinTotal === 0) {
      base = this.v1.clone();
    } else {
      const tAngle = t * angle;
      const f1 = Math.sin(angle - tAngle) / sinTotal;
      const f2 = Math.sin(tAngle) / sinTotal;
      base = this.v1.clone().multiplyScalar(f1).addScaledVector(this.v2, f2).normalize();
    }

    const height = Math.sin(t * Math.PI) * this.altitude;
    return optionalTarget.copy(base).multiplyScalar(this.radius + height);
  }
}

// ── Configuration Data ───────────────────────────────────────────────────
const GLOBE_RADIUS = 2.0;

const HUBS = [
  { name: "New York", lat: 40.7128, lon: -74.0060, volume: 0.95 },
  { name: "London", lat: 51.5074, lon: -0.1278, volume: 0.85 },
  { name: "Frankfurt", lat: 50.1109, lon: 8.6821, volume: 0.80 },
  { name: "Singapore", lat: 1.3521, lon: 103.8198, volume: 0.90 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, volume: 1.00 }
];

const PATHS = [
  [0, 1], // NY to London
  [1, 2], // London to Frankfurt
  [2, 3], // Frankfurt to Singapore
  [3, 4], // Singapore to Tokyo
  [4, 0]  // Tokyo to NY
];

const TEXTURE_URL = "https://unpkg.com/three-globe@2.41.12/example/img/earth-topology.png";

// ── Hub Ring Pulses ──────────────────────────────────────────────────────
interface SignalProps {
  hubPos: THREE.Vector3;
  volume: number;
  isGreenTheme: boolean;
  isVibrantTheme: boolean;
  isSandTheme: boolean;
  isPastelTheme: boolean;
  isBlackTheme: boolean;
  isCyanTheme: boolean;
  isBlueTheme: boolean;
  isGoldTheme: boolean;
}

function HubSignal({ hubPos, volume, isGreenTheme, isVibrantTheme, isSandTheme, isPastelTheme, isBlackTheme, isCyanTheme, isBlueTheme, isGoldTheme }: SignalProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);
  const normal = useMemo(() => hubPos.clone().normalize(), [hubPos]);

  const quat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return q;
  }, [normal]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const time = timeRef.current;
    const speed = 0.4 + volume * 0.4;

    const t1 = (time * speed) % 2.5;
    const scale1 = t1 * 0.45;
    const alpha1 = Math.max(0, 1.0 - t1 / 2.5);

    if (ringRef.current) {
      ringRef.current.scale.set(scale1, scale1, 1.0);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = alpha1 * volume * 0.6;
    }

    const t2 = (time * speed + 1.25) % 2.5;
    const scale2 = t2 * 0.45;
    const alpha2 = Math.max(0, 1.0 - t2 / 2.5);

    if (ringRef2.current) {
      ringRef2.current.scale.set(scale2, scale2, 1.0);
      (ringRef2.current.material as THREE.MeshBasicMaterial).opacity = alpha2 * volume * 0.6;
    }
  });

  const color = isGoldTheme ? "#ffd700" : isBlueTheme ? "#2563eb" : isCyanTheme ? "#00f0ff" : isGreenTheme ? "#00ff66" : isVibrantTheme ? "#ffd21c" : isSandTheme ? "#f2af4b" : isPastelTheme ? "#fdfd96" : isBlackTheme ? "#000000" : "#f2af4b";

  return (
    <group position={hubPos.clone().multiplyScalar(1.004)} quaternion={quat}>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.01, 0.4, 32]} />
        <meshBasicMaterial color={color} transparent depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ringRef2}>
        <ringGeometry args={[0.01, 0.4, 32]} />
        <meshBasicMaterial color={color} transparent depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.016, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

// ── Great Circle Travel Signals ──────────────────────────────────────────
interface PathSignalProps {
  curve: GreatCircleCurve;
  speedOffset: number;
  volume: number;
  isGreenTheme: boolean;
  isVibrantTheme: boolean;
  isSandTheme: boolean;
  isPastelTheme: boolean;
  isBlackTheme: boolean;
  isCyanTheme: boolean;
  isBlueTheme: boolean;
  isGoldTheme: boolean;
}

function PathSignal({ curve, speedOffset, volume, isGreenTheme, isVibrantTheme, isSandTheme, isPastelTheme, isBlackTheme, isCyanTheme, isBlueTheme, isGoldTheme }: PathSignalProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);

  // Initialize progress with speedOffset to stagger start positions
  useEffect(() => {
    progressRef.current = (speedOffset * 0.2) % 1.0;
  }, [speedOffset]);

  useFrame((_, delta) => {
    const duration = 5.0 / (0.7 + volume * 0.5);
    progressRef.current = (progressRef.current + (delta / duration)) % 1.0;

    const t = progressRef.current;
    const pos = curve.getPoint(t);
    const tangent = curve.getTangent(t);

    if (ringRef.current) {
      ringRef.current.position.copy(pos);

      const quat = new THREE.Quaternion();
      quat.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
      ringRef.current.quaternion.copy(quat);

      const scale = 0.08 + t * 0.18;
      ringRef.current.scale.set(scale, scale, 1.0);

      const opacity = Math.sin(t * Math.PI) * volume * 0.75;
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  const color = isGoldTheme ? "#ffd700" : isBlueTheme ? "#2563eb" : isCyanTheme ? "#00f0ff" : isGreenTheme ? "#00ff66" : isVibrantTheme ? "#ffd21c" : isSandTheme ? "#f2af4b" : isPastelTheme ? "#fdfd96" : isBlackTheme ? "#000000" : "#f2c84b";

  return (
    <mesh ref={ringRef}>
      <ringGeometry args={[0.04, 0.06, 24]} />
      <meshBasicMaterial color={color} transparent depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ── Inner Occluder & Earth Silhouette ─────────────────────────────────────
interface SolidInnerGlobeProps {
  isGreenTheme: boolean;
  isVibrantTheme: boolean;
  isSandTheme: boolean;
  isPastelTheme: boolean;
  isBlackTheme: boolean;
  isCyanTheme: boolean;
  isBlueTheme: boolean;
  isGoldTheme: boolean;
}

function SolidInnerGlobe({ isGreenTheme, isVibrantTheme, isSandTheme, isPastelTheme, isBlackTheme, isCyanTheme, isBlueTheme, isGoldTheme }: SolidInnerGlobeProps) {
  const topologyTex = useLoader(THREE.TextureLoader, TEXTURE_URL);

  const uniforms = useMemo(
    () => ({
      uMap: { value: topologyTex },
      uIsGreenTheme: { value: isGreenTheme ? 1.0 : 0.0 },
      uIsVibrantTheme: { value: isVibrantTheme ? 1.0 : 0.0 },
      uIsSandTheme: { value: isSandTheme ? 1.0 : 0.0 },
      uIsPastelTheme: { value: isPastelTheme ? 1.0 : 0.0 },
      uIsBlackTheme: { value: isBlackTheme ? 1.0 : 0.0 },
      uIsCyanTheme: { value: isCyanTheme ? 1.0 : 0.0 },
      uIsBlueTheme: { value: isBlueTheme ? 1.0 : 0.0 },
      uIsGoldTheme: { value: isGoldTheme ? 1.0 : 0.0 }
    }),
    [topologyTex]
  );

  useEffect(() => {
    uniforms.uIsGreenTheme.value = isGreenTheme ? 1.0 : 0.0;
    uniforms.uIsVibrantTheme.value = isVibrantTheme ? 1.0 : 0.0;
    uniforms.uIsSandTheme.value = isSandTheme ? 1.0 : 0.0;
    uniforms.uIsPastelTheme.value = isPastelTheme ? 1.0 : 0.0;
    uniforms.uIsBlackTheme.value = isBlackTheme ? 1.0 : 0.0;
    uniforms.uIsCyanTheme.value = isCyanTheme ? 1.0 : 0.0;
    uniforms.uIsBlueTheme.value = isBlueTheme ? 1.0 : 0.0;
    uniforms.uIsGoldTheme.value = isGoldTheme ? 1.0 : 0.0;
  }, [isGreenTheme, isVibrantTheme, isSandTheme, isPastelTheme, isBlackTheme, isCyanTheme, isBlueTheme, isGoldTheme, uniforms]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uMap;
        uniform float uIsGreenTheme;
        uniform float uIsVibrantTheme;
        uniform float uIsSandTheme;
        uniform float uIsPastelTheme;
        uniform float uIsBlackTheme;
        uniform float uIsCyanTheme;
        uniform float uIsBlueTheme;
        uniform float uIsGoldTheme;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          float mask = texture2D(uMap, vUv).r;
          float isLand = smoothstep(0.01, 0.15, mask);
          
          vec3 water = vec3(1.0, 1.0, 1.0);
          vec3 land = vec3(0.96, 0.955, 0.94); // warm soft cream/beige
          
          if (uIsBlueTheme > 0.5) {
            water = vec3(1.0, 1.0, 1.0); // white
            land = vec3(0.145, 0.388, 0.922);  // blue
          } else if (uIsGreenTheme > 0.5) {
            water = vec3(0.02, 0.04, 0.03); // dark green/black
            land = vec3(0.05, 0.35, 0.18);  // medium-dark forest green
          } else if (uIsVibrantTheme > 0.5) {
            water = vec3(0.0, 0.0, 0.0); // black
            land = vec3(1.0, 0.82, 0.11);  // yellow
          } else if (uIsSandTheme > 0.5) {
            water = vec3(1.0, 1.0, 1.0); // white
            land = vec3(0.96, 0.88, 0.64);  // sand color
          } else if (uIsPastelTheme > 0.5) {
            water = vec3(0.0, 0.0, 0.0); // black
            land = vec3(0.99, 0.99, 0.59);  // pastel yellow
          } else if (uIsBlackTheme > 0.5) {
            water = vec3(1.0, 1.0, 1.0); // white
            land = vec3(0.0, 0.0, 0.0);  // black
          } else if (uIsCyanTheme > 0.5) {
            water = vec3(0.0, 0.0, 0.0); // black
            land = vec3(0.0, 0.72, 0.9);  // cyan
          } else if (uIsGoldTheme > 0.5) {
            water = vec3(0.0, 0.0, 0.0); // black
            land = vec3(1.0, 0.84, 0.0);  // gold
          }
          
          vec3 baseColor = mix(water, land, isLand);
          
          vec3 normal = normalize(vNormal);
          float dotNL = dot(normal, normalize(vec3(0.5, 0.7, 1.0)));
          
          // Shading and ambient factors to create volumetric depth
          float shading = max(0.0, dotNL) * 0.08 + 0.92;
          float fresnel = pow(1.0 - max(0.0, dot(normal, vec3(0.0, 0.0, 1.0))), 3.5);
          
          // Warm gold atmosphere glow, neon green glow, or neon yellow glow
          vec3 glow = vec3(0.95, 0.78, 0.29); 
          if (uIsBlueTheme > 0.5) {
            glow = vec3(0.145, 0.388, 0.922); // blue glow
          } else if (uIsGreenTheme > 0.5) {
            glow = vec3(0.0, 1.0, 0.4); // bright neon green
          } else if (uIsVibrantTheme > 0.5) {
            glow = vec3(1.0, 0.82, 0.11); // bright neon yellow/gold
          } else if (uIsPastelTheme > 0.5) {
            glow = vec3(0.99, 0.99, 0.59); // pastel yellow glow
          } else if (uIsSandTheme > 0.5) {
            glow = vec3(0.95, 0.78, 0.29); // sand gold glow
          } else if (uIsBlackTheme > 0.5) {
            glow = vec3(0.0, 0.0, 0.0); // black theme glow (no glow/black)
          } else if (uIsCyanTheme > 0.5) {
            glow = vec3(0.0, 0.9, 1.0); // bright neon cyan
          } else if (uIsGoldTheme > 0.5) {
            glow = vec3(1.0, 0.84, 0.0); // gold glow
          }
          
          vec3 finalColor = baseColor * shading + glow * fresnel * 0.24;
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
  }, [uniforms]);

  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

// ── Globe Scene ───────────────────────────────────────────────────────────
interface GlobeSceneProps {
  isGreenTheme: boolean;
  isVibrantTheme: boolean;
  isSandTheme: boolean;
  isPastelTheme: boolean;
  isBlackTheme: boolean;
  isCyanTheme: boolean;
  isBlueTheme: boolean;
  isGoldTheme: boolean;
}

function GlobeScene({ isGreenTheme, isVibrantTheme, isSandTheme, isPastelTheme, isBlackTheme, isCyanTheme, isBlueTheme, isGoldTheme }: GlobeSceneProps) {
  const globeGroupRef = useRef<THREE.Group>(null);

  const hubObjects = useMemo(() => {
    return HUBS.map(h => ({
      ...h,
      pos: latLonToVec3(h.lat, h.lon, GLOBE_RADIUS)
    }));
  }, []);

  const pathCurves = useMemo(() => {
    return PATHS.map(([startIdx, endIdx]) => {
      const start = hubObjects[startIdx].pos;
      const end = hubObjects[endIdx].pos;
      return new GreatCircleCurve(start, end, GLOBE_RADIUS, 0.12);
    });
  }, [hubObjects]);

  useFrame((_, delta) => {
    const dt = Math.min(0.1, delta || 0.016);
    if (globeGroupRef.current) {
      // Visible spinning: 2.86 degrees per second = 0.05 radians per second
      globeGroupRef.current.rotation.y += 0.05 * dt;
    }
  });

  const pathColor = isGoldTheme ? "#ffd700" : isBlueTheme ? "#2563eb" : isCyanTheme ? "#00f0ff" : isGreenTheme ? "#00ff66" : isVibrantTheme ? "#ffd21c" : isSandTheme ? "#f2af4b" : isPastelTheme ? "#fdfd96" : isBlackTheme ? "#000000" : "#f2c84b";

  return (
    <group ref={globeGroupRef}>
      <SolidInnerGlobe isGreenTheme={isGreenTheme} isVibrantTheme={isVibrantTheme} isSandTheme={isSandTheme} isPastelTheme={isPastelTheme} isBlackTheme={isBlackTheme} isCyanTheme={isCyanTheme} isBlueTheme={isBlueTheme} isGoldTheme={isGoldTheme} />

      {/* Hub Locations & Pulsing Signals */}
      {hubObjects.map((hub, idx) => (
        <HubSignal key={idx} hubPos={hub.pos} volume={hub.volume} isGreenTheme={isGreenTheme} isVibrantTheme={isVibrantTheme} isSandTheme={isSandTheme} isPastelTheme={isPastelTheme} isBlackTheme={isBlackTheme} isCyanTheme={isCyanTheme} isBlueTheme={isBlueTheme} isGoldTheme={isGoldTheme} />
      ))}

      {/* Great-Circle Path Tracks & Signals */}
      {pathCurves.map((curve, idx) => {
        const points = curve.getPoints(40);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({ color: pathColor, transparent: true, opacity: 0.25 });
        const lineMesh = new THREE.Line(lineGeo, lineMat);
        return (
          <group key={idx}>
            <primitive object={lineMesh} />
            <PathSignal curve={curve} speedOffset={idx * 1.5} volume={hubObjects[idx % 5].volume} isGreenTheme={isGreenTheme} isVibrantTheme={isVibrantTheme} isSandTheme={isSandTheme} isPastelTheme={isPastelTheme} isBlackTheme={isBlackTheme} isCyanTheme={isCyanTheme} isBlueTheme={isBlueTheme} isGoldTheme={isGoldTheme} />
            <PathSignal curve={curve} speedOffset={idx * 1.5 + 3.0} volume={hubObjects[idx % 5].volume} isGreenTheme={isGreenTheme} isVibrantTheme={isVibrantTheme} isSandTheme={isSandTheme} isPastelTheme={isPastelTheme} isBlackTheme={isBlackTheme} isCyanTheme={isCyanTheme} isBlueTheme={isBlueTheme} isGoldTheme={isGoldTheme} />
          </group>
        );
      })}
    </group>
  );
}

// ── Exported Component ────────────────────────────────────────────────────
// ── Fallback 2D Globe Component (Non-WebGL support) ────────────────────────
function FallbackGlobe({
  isGreenTheme,
  isVibrantTheme,
  isSandTheme,
  isPastelTheme,
  isBlackTheme,
  isCyanTheme,
  isBlueTheme,
  isGoldTheme
}: {
  isGreenTheme: boolean;
  isVibrantTheme: boolean;
  isSandTheme: boolean;
  isPastelTheme: boolean;
  isBlackTheme: boolean;
  isCyanTheme: boolean;
  isBlueTheme: boolean;
  isGoldTheme: boolean;
}) {
  const [angle, setAngle] = useState(0);
  const [packetProgress, setPacketProgress] = useState(0);

  useEffect(() => {
    let animId: number;
    let lastTime = Date.now();
    const tick = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      
      setAngle((a) => (a + 0.25 * delta) % (Math.PI * 2));
      setPacketProgress((p) => (p + 0.2 * delta) % 1.0);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  let waterColor = "#ffffff";
  let landColor = "#e8e5de";
  let glowColor = "rgba(242, 200, 75, 0.2)";
  let signalColor = "#f2af4b";

  if (isGoldTheme) {
    waterColor = "#000000";
    landColor = "#ffd700";
    glowColor = "rgba(255, 215, 0, 0.25)";
    signalColor = "#ffd700";
  } else if (isBlueTheme) {
    waterColor = "#ffffff";
    landColor = "#bfe4ff";
    glowColor = "rgba(37, 99, 235, 0.25)";
    signalColor = "#2563eb";
  } else if (isGreenTheme) {
    waterColor = "#022312";
    landColor = "#0b4d27";
    glowColor = "rgba(0, 255, 102, 0.25)";
    signalColor = "#00ff66";
  } else if (isCyanTheme) {
    waterColor = "#00222b";
    landColor = "#024a5c";
    glowColor = "rgba(0, 240, 255, 0.25)";
    signalColor = "#00f0ff";
  } else if (isVibrantTheme) {
    waterColor = "#000000";
    landColor = "#443a0a";
    glowColor = "rgba(255, 210, 28, 0.25)";
    signalColor = "#ffd21c";
  } else if (isSandTheme) {
    waterColor = "#ffffff";
    landColor = "#f5e0a3";
    glowColor = "rgba(242, 175, 75, 0.2)";
    signalColor = "#f2af4b";
  } else if (isPastelTheme) {
    waterColor = "#000000";
    landColor = "#e8e87d";
    glowColor = "rgba(253, 253, 150, 0.25)";
    signalColor = "#fdfd96";
  } else if (isBlackTheme) {
    waterColor = "#ffffff";
    landColor = "#d0d0d0";
    glowColor = "rgba(0, 0, 0, 0.08)";
    signalColor = "#000000";
  }

  const r = 145; // globe radius
  const hubObjects = useMemo(() => {
    return HUBS.map((h) => {
      const phi = (90 - h.lat) * (Math.PI / 180);
      const theta = (h.lon + 180) * (Math.PI / 180);
      return {
        name: h.name,
        volume: h.volume,
        x: -r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.cos(phi),
        z: r * Math.sin(phi) * Math.sin(theta)
      };
    });
  }, []);

  const rotatedHubs = useMemo(() => {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    return hubObjects.map((h) => {
      const rx = h.x * cosA - h.z * sinA;
      const rz = h.x * sinA + h.z * cosA;
      return {
        ...h,
        rx,
        rz,
        px: 200 + rx,
        py: 200 - h.y
      };
    });
  }, [hubObjects, angle]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}
    >
      {/* Ambient glow behind */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 1
        }}
      />
      
      <svg
        viewBox="0 0 400 400"
        style={{
          width: "90%",
          height: "90%",
          position: "relative",
          zIndex: 2,
          overflow: "visible"
        }}
      >
        {/* Globe base sphere */}
        <circle cx="200" cy="200" r={r} fill={waterColor} stroke={landColor} strokeWidth="1" />

        {/* Latitudes */}
        <ellipse cx="200" cy="200" rx={r} ry="35" fill="none" stroke={landColor} strokeWidth="0.8" opacity="0.4" />
        <ellipse cx="200" cy="200" rx={r} ry="75" fill="none" stroke={landColor} strokeWidth="0.8" opacity="0.4" />
        <line x1={200 - r} y1="200" x2={200 + r} y2="200" stroke={landColor} strokeWidth="0.8" opacity="0.5" />

        {/* Longitudes (spinning) */}
        {[0, 30, 60, 90, 120, 150].map((phaseOffset) => {
          const rad = (angle + phaseOffset * Math.PI / 180) % Math.PI;
          const rx = r * Math.abs(Math.cos(rad));
          const isFront = Math.sin(rad) >= 0;
          return (
            <ellipse
              key={phaseOffset}
              cx="200"
              cy="200"
              rx={rx}
              ry={r}
              fill="none"
              stroke={landColor}
              strokeWidth="0.8"
              opacity={isFront ? 0.45 : 0.12}
            />
          );
        })}

        {/* Path lines */}
        {PATHS.map(([startIdx, endIdx], idx) => {
          const start = rotatedHubs[startIdx];
          const end = rotatedHubs[endIdx];
          const isFront = start.rz > -10 && end.rz > -10;
          
          // Draw Bezier arc
          const ctrlX = (start.px + end.px) / 2 + (start.py - end.py) * 0.15;
          const ctrlY = (start.py + end.py) / 2 - 30;
          const pathD = `M ${start.px} ${start.py} Q ${ctrlX} ${ctrlY} ${end.px} ${end.py}`;

          // Calculate packet pos
          const t = (packetProgress + idx * 0.2) % 1.0;
          const pX = (1 - t) * (1 - t) * start.px + 2 * (1 - t) * t * ctrlX + t * t * end.px;
          const pY = (1 - t) * (1 - t) * start.py + 2 * (1 - t) * t * ctrlY + t * t * end.py;
          
          return (
            <g key={idx}>
              <path
                d={pathD}
                fill="none"
                stroke={signalColor}
                strokeWidth={isFront ? "1.5" : "0.75"}
                strokeDasharray={isFront ? undefined : "3 3"}
                opacity={isFront ? 0.35 : 0.12}
              />
              {isFront && (
                <circle cx={pX} cy={pY} r="3" fill={signalColor}>
                  <animate attributeName="r" values="2;4;2" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}

        {/* Hub points */}
        {rotatedHubs.map((hub, idx) => {
          const isFront = hub.rz > 0;
          return (
            <g key={idx} opacity={isFront ? 1.0 : 0.2}>
              {/* Outer pulsing ring for front hubs */}
              {isFront && (
                <circle cx={hub.px} cy={hub.py} r="10" fill="none" stroke={signalColor} strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" values="3;12;3" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              {/* Core dot */}
              <circle cx={hub.px} cy={hub.py} r={isFront ? "4" : "2"} fill={signalColor} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Exported Component ────────────────────────────────────────────────────
export default function SolutionsGlobe() {
  const [isGreenTheme, setIsGreenTheme] = useState(false);
  const [isVibrantTheme, setIsVibrantTheme] = useState(false);
  const [isSandTheme, setIsSandTheme] = useState(false);
  const [isPastelTheme, setIsPastelTheme] = useState(false);
  const [isBlackTheme, setIsBlackTheme] = useState(false);
  const [isCyanTheme, setIsCyanTheme] = useState(false);
  const [isBlueTheme, setIsBlueTheme] = useState(false);
  const [isGoldTheme, setIsGoldTheme] = useState(false);
  const [webglSupported, setWebglSupported] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme-color");
      setIsGreenTheme(theme === "green");
      setIsVibrantTheme(theme === "vibrant");
      setIsSandTheme(theme === "sand");
      setIsPastelTheme(theme === "pastel");
      setIsBlackTheme(theme === "black");
      setIsCyanTheme(theme === "cyan");
      setIsBlueTheme(theme === "blue");
      setIsGoldTheme(theme === "gold");
    };

    checkTheme();

    const supportsWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
        if (!gl) return false;
        const loseContext = gl.getExtension("WEBGL_lose_context");
        if (loseContext) loseContext.loseContext();
        return true;
      } catch (e) {
        return false;
      }
    };
    setWebglSupported(supportsWebGL());

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

  if (!webglSupported) {
    return (
      <FallbackGlobe
        isGreenTheme={isGreenTheme}
        isVibrantTheme={isVibrantTheme}
        isSandTheme={isSandTheme}
        isPastelTheme={isPastelTheme}
        isBlackTheme={isBlackTheme}
        isCyanTheme={isCyanTheme}
        isBlueTheme={isBlueTheme}
        isGoldTheme={isGoldTheme}
      />
    );
  }

  return (
    <div
      className="globe-visualizer-container"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <GlobeScene isGreenTheme={isGreenTheme} isVibrantTheme={isVibrantTheme} isSandTheme={isSandTheme} isPastelTheme={isPastelTheme} isBlackTheme={isBlackTheme} isCyanTheme={isCyanTheme} isBlueTheme={isBlueTheme} isGoldTheme={isGoldTheme} />
        </Suspense>
      </Canvas>
    </div>
  );
}
