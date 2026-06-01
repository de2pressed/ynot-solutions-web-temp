"use client";

import { useRef, useMemo, Suspense } from "react";
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

const GLOBE_RADIUS = 1.4;
const ARC_ALTITUDE = 0.32;
const GOLD = new THREE.Color("#f2c84b");
const GOLD_DIM = new THREE.Color("#a08420");
const GRID_COLOR = new THREE.Color("#f2c84b");

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

/* ── Single animated arc ────────────────────────────────────── */
function DataArc({ route, index }: { route: [number, number, number, number]; index: number }) {
  const dotRef  = useRef<THREE.Mesh>(null);
  const dot2Ref = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => buildArcCurve(route[0], route[1], route[2], route[3]), [route]);
  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.006, 8, false), [curve]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p1 = ((t * 0.16 + index * 0.22) % 1);
    if (dotRef.current) dotRef.current.position.copy(curve.getPoint(p1));
    const p2 = ((t * 0.16 + index * 0.22 + 0.4) % 1);
    if (dot2Ref.current) dot2Ref.current.position.copy(curve.getPoint(p2));
  });

  return (
    <group>
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial color={GOLD_DIM} transparent opacity={0.4} />
      </mesh>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshBasicMaterial color={GOLD} />
      </mesh>
      <mesh ref={dot2Ref}>
        <sphereGeometry args={[0.015, 10, 10]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

/* ── Atmosphere glow ────────────────────────────────────────── */
function AtmosphereGlow() {
  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS + 0.05, 64, 64]} />
      <meshBasicMaterial color={GOLD} transparent opacity={0.04} side={THREE.BackSide} />
    </mesh>
  );
}

/* ── Grid wireframe ─────────────────────────────────────────── */
function GlobeWireframe() {
  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS + 0.004, 36, 18]} />
      <meshBasicMaterial color={GRID_COLOR} wireframe transparent opacity={0.055} />
    </mesh>
  );
}

/* ── City endpoint dots ─────────────────────────────────────── */
function CityDots() {
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
          <meshBasicMaterial color={GOLD} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Globe with real NASA texture ───────────────────────────── */
function GlobeInner() {
  const globeRef = useRef<THREE.Group>(null);
  const earthTex = useLoader(THREE.TextureLoader, EARTH_TEXTURE_URL);

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={earthTex}
          emissiveMap={earthTex}
          emissive={new THREE.Color("#f2c84b")}
          emissiveIntensity={0.35}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      <GlobeWireframe />
      <AtmosphereGlow />
      <CityDots />

      {ROUTES.map((route, i) => (
        <DataArc key={i} route={route} index={i} />
      ))}
    </group>
  );
}

/* ── Exported Canvas wrapper ────────────────────────────────── */
export default function GlobeScene() {
  return (
    <Canvas
      className="globe-canvas"
      camera={{ position: [0, 0.4, 6.8], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} color="#f2c84b" />
      <directionalLight position={[3, 2, 5]} intensity={0.6} color="#f7f3e8" />
      <pointLight position={[-4, -2, -3]} intensity={0.2} color="#f2c84b" />
      <Suspense fallback={null}>
        <GlobeInner />
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
