import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 110;
const CONNECTION_DIST = 2.35;

function NeuralMesh({ intensity = 1 }) {
  const pointsRef = useRef();
  const linesRef = useRef();
  const groupRef = useRef();

  const { positions, velocities, linePositions, pointsGeo, linesGeo } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      velocities[i * 3] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.006;
    }

    const maxPairs = PARTICLE_COUNT * 10;
    const linePositions = new Float32Array(maxPairs * 6);

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    linesGeo.setDrawRange(0, 0);

    return { positions, velocities, linePositions, pointsGeo, linesGeo };
  }, []);

  const chroma = useMemo(
    () => [
      new THREE.Color("#67e8f9"),
      new THREE.Color("#c4b5fd"),
      new THREE.Color("#fda4af"),
      new THREE.Color("#fde68a"),
    ],
    []
  );
  const mixColor = useMemo(() => new THREE.Color("#ffffff"), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pts = pointsRef.current;
    const lines = linesRef.current;
    if (!pts || !lines) return;

    const posAttr = pointsGeo.getAttribute("position");
    const pos = posAttr.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      for (let a = 0; a < 3; a++) {
        const limit = a === 1 ? 4 : a === 2 ? 3 : 7;
        if (Math.abs(pos[i * 3 + a]) > limit) velocities[i * 3 + a] *= -1;
      }
    }
    posAttr.needsUpdate = true;

    let lineIdx = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECTION_DIST && lineIdx < linePositions.length / 6 - 1) {
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

    const c = chroma[Math.floor((t * 0.35) % chroma.length)];
    const mix = 0.45 + Math.sin(t * 0.6) * 0.3;
    mixColor.copy(chroma[0]).lerp(c, mix);
    pts.material.color.copy(mixColor);
    lines.material.color.copy(mixColor);
    pts.material.opacity = 0.55 * intensity;
    lines.material.opacity = 0.16 * intensity;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={pointsGeo}>
        <pointsMaterial
          size={0.055}
          color="#ffffff"
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeo}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.16} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

const NeuralField = ({ className = "", intensity = 1 }) => (
  <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#050505", 7, 16]} />
      <NeuralMesh intensity={intensity} />
    </Canvas>
  </div>
);

export default NeuralField;
