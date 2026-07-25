import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 160;
const pointer = { x: 0, y: 0 };

function bindPointer() {
  const onMove = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  return () => window.removeEventListener("pointermove", onMove);
}

function Core() {
  const mesh = useRef();
  const ring = useRef();
  const chroma = useMemo(
    () => [
      new THREE.Color("#7dd3fc"),
      new THREE.Color("#c4b5fd"),
      new THREE.Color("#fb7185"),
      new THREE.Color("#fbbf24"),
    ],
    []
  );
  const color = useMemo(() => new THREE.Color("#7dd3fc"), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!mesh.current || !ring.current) return;
    mesh.current.rotation.x = t * 0.18;
    mesh.current.rotation.y = t * 0.28;
    ring.current.rotation.z = -t * 0.22;
    ring.current.rotation.x = Math.sin(t * 0.4) * 0.35;

    const i = Math.floor(t * 0.35) % chroma.length;
    const next = chroma[(i + 1) % chroma.length];
    color.copy(chroma[i]).lerp(next, (t * 0.35) % 1);
    mesh.current.material.color.copy(color);
    mesh.current.material.emissive.copy(color);
    ring.current.material.color.copy(color);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh ref={mesh} scale={1.15}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial
          color="#7dd3fc"
          emissive="#7dd3fc"
          emissiveIntensity={0.55}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh ref={ring} scale={2.05}>
        <torusGeometry args={[1.1, 0.008, 16, 120]} />
        <meshBasicMaterial color="#c4b5fd" transparent opacity={0.55} />
      </mesh>
      <mesh scale={2.55} rotation={[Math.PI / 2.5, 0.4, 0]}>
        <torusGeometry args={[1.05, 0.004, 12, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </mesh>
    </Float>
  );
}

function ParticleField({ intensity = 1 }) {
  const pointsRef = useRef();
  const linesRef = useRef();

  const { phases, linePositions, pointsGeo, linesGeo, base } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const phases = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 2.2 + Math.random() * 4.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.72;
      positions[i * 3 + 2] = r * Math.cos(phi);
      phases[i] = Math.random() * Math.PI * 2;
    }
    const linePositions = new Float32Array(PARTICLE_COUNT * 12);
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    linesGeo.setDrawRange(0, 0);
    return { phases, linePositions, pointsGeo, linesGeo, base: new Float32Array(positions) };
  }, []);

  const mixColor = useMemo(() => new THREE.Color("#ffffff"), []);
  const chroma = useMemo(
    () => [
      new THREE.Color("#7dd3fc"),
      new THREE.Color("#c4b5fd"),
      new THREE.Color("#fb7185"),
      new THREE.Color("#fbbf24"),
    ],
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pts = pointsRef.current;
    const lines = linesRef.current;
    if (!pts || !lines) return;

    const pos = pointsGeo.getAttribute("position").array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const breathe = Math.sin(t * 0.7 + phases[i]) * 0.08;
      pos[i * 3] = base[i * 3] * (1 + breathe) + pointer.x * 0.4;
      pos[i * 3 + 1] = base[i * 3 + 1] * (1 + breathe * 0.6) + pointer.y * 0.28;
      pos[i * 3 + 2] = base[i * 3 + 2] * (1 + breathe * 0.4);
    }
    pointsGeo.getAttribute("position").needsUpdate = true;

    let lineIdx = 0;
    const maxDist = 1.85;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < maxDist && lineIdx < linePositions.length / 6 - 1) {
          const o = lineIdx * 6;
          linePositions[o] = pos[i * 3];
          linePositions[o + 1] = pos[i * 3 + 1];
          linePositions[o + 2] = pos[i * 3 + 2];
          linePositions[o + 3] = pos[j * 3];
          linePositions[o + 4] = pos[j * 3 + 1];
          linePositions[o + 5] = pos[j * 3 + 2];
          lineIdx++;
        }
      }
    }
    linesGeo.setDrawRange(0, lineIdx * 2);
    linesGeo.getAttribute("position").needsUpdate = true;

    const i = Math.floor(t * 0.4) % chroma.length;
    const next = chroma[(i + 1) % chroma.length];
    mixColor.copy(chroma[i]).lerp(next, (t * 0.4) % 1);
    pts.material.color.copy(mixColor);
    lines.material.color.copy(mixColor);
    pts.material.opacity = 0.7 * intensity;
    lines.material.opacity = 0.22 * intensity;
  });

  return (
    <group>
      <points ref={pointsRef} geometry={pointsGeo}>
        <pointsMaterial size={0.045} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeo}>
        <lineBasicMaterial transparent opacity={0.22} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

function SceneRig({ intensity }) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = pointer.x * 0.35 + state.clock.elapsedTime * 0.05;
    group.current.rotation.x = -pointer.y * 0.2;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 5]} intensity={1.2} color="#7dd3fc" />
      <pointLight position={[-4, -2, 3]} intensity={0.8} color="#fb7185" />
      <Core />
      <ParticleField intensity={intensity} />
    </group>
  );
}

const NeuralField = ({ className = "", intensity = 1 }) => {
  useEffect(() => bindPointer(), []);

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7.2], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
      >
        <fog attach="fog" args={["#030303", 5.5, 14]} />
        <SceneRig intensity={intensity} />
      </Canvas>
    </div>
  );
};

export default NeuralField;
