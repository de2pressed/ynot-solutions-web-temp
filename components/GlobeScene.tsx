"use client";

import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ── Geo helpers ────────────────────────────────────────────── */
function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta)
  );
}

/* ── Arc routes (city pairs) ────────────────────────────────── */
const ROUTES: [number, number, number, number][] = [
  [40.7, -74.0,   51.5,   -0.1],   // New York → London
  [35.7, 139.7,  -33.9,  151.2],   // Tokyo → Sydney
  [-23.5, -46.6,   6.5,    3.4],   // São Paulo → Lagos
  [37.8, -122.4,  1.3,   103.9],   // San Francisco → Singapore
  [48.9,   2.3,  28.6,    77.2],   // Paris → Delhi
  [55.8,  37.6, -1.3,    36.8],    // Moscow → Nairobi
];

const GLOBE_RADIUS = 2.0;
const ARC_ALTITUDE = 0.32;


/* ── NASA Earth texture URL (public domain, night-lights) ── */
const EARTH_TEXTURE_URL = "https://unpkg.com/three-globe@2.41.12/example/img/earth-night.jpg";

/* ── Arc geometry builder ───────────────────────────────────── */
function buildArcCurve(lat1: number, lon1: number, lat2: number, lon2: number) {
  const start = latLonToVec3(lat1, lon1, GLOBE_RADIUS);
  const end   = latLonToVec3(lat2, lon2, GLOBE_RADIUS);
  const mid   = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  mid.normalize().multiplyScalar(GLOBE_RADIUS + ARC_ALTITUDE + mid.length() * 0.12);
  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

/* ── Per-route speed multipliers for variety ─────────────────── */
const ROUTE_SPEEDS = [0.14, 0.11, 0.17, 0.13, 0.15, 0.12];

/* ── Single animated arc with realistic data packets ────────── */
function DataArc({ route, index, variant = "pulse", mainColor, dimColor }: { route: [number, number, number, number]; index: number; variant?: "pulse" | "laser" | "burst"; mainColor: THREE.Color; dimColor: THREE.Color }) {
  const groupRef = useRef<THREE.Group>(null);
  /* Lead dot + glow halo */
  const dotRef  = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  /* Second packet */
  const dot2Ref  = useRef<THREE.Mesh>(null);
  const glow2Ref = useRef<THREE.Mesh>(null);

  /* Third packet */
  const dot3Ref  = useRef<THREE.Mesh>(null);
  const glow3Ref = useRef<THREE.Mesh>(null);

  /* Trail particles (up to 15) */
  const trailRefs = useRef<(THREE.Mesh | null)[]>([]);

  const curve = useMemo(() => buildArcCurve(route[0], route[1], route[2], route[3]), [route]);
  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.005, 8, false), [curve]);
  const speed = ROUTE_SPEEDS[index % ROUTE_SPEEDS.length];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const trailCount = variant === "laser" ? 15 : variant === "pulse" ? 5 : 0;
    const trailSpacing = variant === "laser" ? 0.012 : 0.04;

    /* ── Packet 1 Position ── */
    const raw1 = (t * speed + index * 0.18) % 1;
    const eased1 = 0.5 - 0.5 * Math.cos(raw1 * Math.PI * 2);
    const pos1 = curve.getPoint(eased1);
    
    if (dotRef.current) {
      dotRef.current.position.copy(pos1);
      const pulse = 1 + 0.3 * Math.sin(t * 4 + index);
      dotRef.current.scale.setScalar(pulse);
    }
    if (glowRef.current) {
      glowRef.current.position.copy(pos1);
      const glowPulse = 1 + 0.5 * Math.sin(t * 3.5 + index);
      glowRef.current.scale.setScalar(glowPulse);
    }

    /* ── Trail particles ── */
    for (let i = 0; i < 15; i++) {
      const trailMesh = trailRefs.current[i];
      if (trailMesh) {
        if (i < trailCount) {
          trailMesh.visible = true;
          const trailT = Math.max(0, raw1 - (i + 1) * trailSpacing);
          const easedTrail = 0.5 - 0.5 * Math.cos(trailT * Math.PI * 2);
          trailMesh.position.copy(curve.getPoint(easedTrail));
          
          const fade = 1 - (i + 1) / (trailCount + 1);
          const sizeScale = variant === "laser" ? 0.65 : 0.7;
          trailMesh.scale.setScalar(fade * sizeScale);
          (trailMesh.material as THREE.MeshBasicMaterial).opacity = fade * (variant === "laser" ? 0.8 : 0.6);
        } else {
          trailMesh.visible = false;
        }
      }
    }

    /* ── Packet 2 & 3 positions based on variant ── */
    if (variant === "pulse") {
      // Packet 2: separate offset trailing packet
      const raw2 = (t * speed * 0.8 + index * 0.18 + 0.52) % 1;
      const eased2 = 0.5 - 0.5 * Math.cos(raw2 * Math.PI * 2);
      const pos2 = curve.getPoint(eased2);
      
      if (dot2Ref.current) {
        dot2Ref.current.visible = true;
        dot2Ref.current.position.copy(pos2);
        dot2Ref.current.scale.setScalar(1 + 0.2 * Math.sin(t * 3 + index + 2));
      }
      if (glow2Ref.current) {
        glow2Ref.current.visible = true;
        glow2Ref.current.position.copy(pos2);
      }
      
      if (dot3Ref.current) dot3Ref.current.visible = false;
      if (glow3Ref.current) glow3Ref.current.visible = false;
      
    } else if (variant === "burst") {
      // Packet 2: closely trailing packet 1 (middle of burst train)
      const raw2 = Math.max(0, raw1 - 0.035);
      const eased2 = 0.5 - 0.5 * Math.cos(raw2 * Math.PI * 2);
      const pos2 = curve.getPoint(eased2);

      if (dot2Ref.current) {
        dot2Ref.current.visible = raw1 > 0.035;
        dot2Ref.current.position.copy(pos2);
        dot2Ref.current.scale.setScalar(0.85);
      }
      if (glow2Ref.current) {
        glow2Ref.current.visible = raw1 > 0.035;
        glow2Ref.current.position.copy(pos2);
      }

      // Packet 3: closely trailing packet 2 (tail of burst train)
      const raw3 = Math.max(0, raw1 - 0.07);
      const eased3 = 0.5 - 0.5 * Math.cos(raw3 * Math.PI * 2);
      const pos3 = curve.getPoint(eased3);

      if (dot3Ref.current) {
        dot3Ref.current.visible = raw1 > 0.07;
        dot3Ref.current.position.copy(pos3);
        dot3Ref.current.scale.setScalar(0.7);
      }
      if (glow3Ref.current) {
        glow3Ref.current.visible = raw1 > 0.07;
        glow3Ref.current.position.copy(pos3);
      }
      
    } else { // laser
      if (dot2Ref.current) dot2Ref.current.visible = false;
      if (glow2Ref.current) glow2Ref.current.visible = false;
      if (dot3Ref.current) dot3Ref.current.visible = false;
      if (glow3Ref.current) glow3Ref.current.visible = false;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Arc tube */}
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial color={dimColor} transparent opacity={0.35} />
      </mesh>

      {/* Packet 1 */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.032, 14, 14]} />
        <meshBasicMaterial color={mainColor} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color={mainColor} transparent opacity={0.18} />
      </mesh>

      {/* Trail particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={i} ref={(el) => { trailRefs.current[i] = el; }}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshBasicMaterial color={mainColor} transparent opacity={0.5} />
        </mesh>
      ))}

      {/* Packet 2 */}
      <mesh ref={dot2Ref}>
        <sphereGeometry args={[0.024, 12, 12]} />
        <meshBasicMaterial color={mainColor} transparent opacity={0.8} />
      </mesh>
      <mesh ref={glow2Ref}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshBasicMaterial color={mainColor} transparent opacity={0.12} />
      </mesh>

      {/* Packet 3 */}
      <mesh ref={dot3Ref}>
        <sphereGeometry args={[0.024, 12, 12]} />
        <meshBasicMaterial color={mainColor} transparent opacity={0.8} />
      </mesh>
      <mesh ref={glow3Ref}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshBasicMaterial color={mainColor} transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

/* ── City endpoint dots ─────────────────────────────────────── */
function CityDots({ mainColor }: { mainColor: THREE.Color }) {
  const positions = useMemo(() => {
    const cities: [number, number][] = [
      [40.7, -74], [51.5, -0.1], [35.7, 139.7], [-33.9, 151.2],
      [-23.5, -46.6], [6.5, 3.4], [37.8, -122.4], [1.3, 103.9],
      [48.9, 2.3], [28.6, 77.2], [55.8, 37.6], [-1.3, 36.8],
    ];
    return cities.map(([lat, lon]) => latLonToVec3(lat, lon, GLOBE_RADIUS + 0.01));
  }, []);

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.016, 8, 8]} />
          <meshBasicMaterial color={mainColor} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Globe with real NASA texture ───────────────────────────── */
function GlobeInner({ variant = "pulse", accentColor = "#f2c84b" }: { variant?: "pulse" | "laser" | "burst"; accentColor?: string }) {
  const globeRef = useRef<THREE.Group>(null);
  const earthTex = useLoader(THREE.TextureLoader, EARTH_TEXTURE_URL);

  const mainColor = useMemo(() => new THREE.Color(accentColor), [accentColor]);
  const dimColor = useMemo(() => mainColor.clone().multiplyScalar(0.4), [mainColor]);

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 128, 128]} />
        <meshStandardMaterial
          map={earthTex}
          onUpdate={(self) => {
            if (self.map) {
              self.map.minFilter = THREE.LinearMipmapLinearFilter;
              self.map.magFilter = THREE.LinearFilter;
              self.map.generateMipmaps = true;
              self.map.anisotropy = 16;
              self.map.needsUpdate = true;
            }
          }}
          emissiveMap={earthTex}
          emissive={mainColor}
          emissiveIntensity={2.2}
          roughness={1.0}
          metalness={0.0}
        />
      </mesh>

      <CityDots mainColor={mainColor} />

      {ROUTES.map((route, i) => (
        <DataArc key={i} route={route} index={i} variant={variant} mainColor={mainColor} dimColor={dimColor} />
      ))}
    </group>
  );
}

/* ── Exported Canvas wrapper ────────────────────────────────── */
export default function GlobeScene({ variant = "pulse" }: { variant?: "pulse" | "laser" | "burst" }) {
  const [accentColor, setAccentColor] = useState(() => {
    if (typeof window !== "undefined") {
      const rootStyle = window.getComputedStyle(document.documentElement);
      const coreColor = rootStyle.getPropertyValue("--theme-accent-rgb").trim();
      if (coreColor) return `rgb(${coreColor})`;
    }
    return "#f2c84b";
  });

  useEffect(() => {
    const handle = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setAccentColor(customEvent.detail);
      }
    };
    window.addEventListener("themeColorChange", handle);
    return () => window.removeEventListener("themeColorChange", handle);
  }, []);

  return (
    <Canvas
      className="globe-canvas"
      camera={{ position: [0, 0.4, 7.8], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1.5} color="#ffffff" />
      <Suspense fallback={null}>
        <GlobeInner variant={variant} accentColor={accentColor} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
        enableRotate={true}
        rotateSpeed={0.3}
      />
    </Canvas>
  );
}
