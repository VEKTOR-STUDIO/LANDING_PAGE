import React, { Suspense, useRef, useState, useEffect } from "react";
import type { Mesh } from "three";

const CssFallbackOrb: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="relative w-[500px] h-[500px] flex items-center justify-center">
      <div
        style={{
          position: "absolute",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.06)",
          animation: "orbRotate 20s linear infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.1)",
          animation: "orbRotate 14s linear infinite reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.07)",
          background: "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          animation: "orbFloat 8s ease-in-out infinite",
        }}
      />
    </div>
    <style>{`
      @keyframes orbFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-14px); }
      }
      @keyframes orbRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!ctx;
  } catch {
    return false;
  }
}

const ThreeOrb = React.lazy(async () => {
  const [{ Canvas, useFrame }, { Float }, THREE] = await Promise.all([
    import("@react-three/fiber"),
    import("@react-three/drei"),
    import("three"),
  ]);

  const Orb = () => {
    const meshRef = useRef<Mesh>(null);
    useFrame((state) => {
      if (!meshRef.current) return;
      const mouseX = (state.pointer.x * Math.PI) / 12;
      const mouseY = (state.pointer.y * Math.PI) / 12;
      meshRef.current.rotation.x += (mouseY + state.clock.elapsedTime * 0.06 - meshRef.current.rotation.x) * 0.04;
      meshRef.current.rotation.y += (mouseX + state.clock.elapsedTime * 0.1 - meshRef.current.rotation.y) * 0.04;
    });
    return (
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh ref={meshRef} scale={1.9}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>
        <mesh scale={1.85}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#ffffff"
            wireframe={false}
            transparent
            opacity={0.015}
          />
        </mesh>
      </Float>
    );
  };

  const ThreeScene: React.FC = () => (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 3]} intensity={0.4} color="#ffffff" />
        <Orb />
      </Canvas>
    </div>
  );

  return { default: ThreeScene };
});

export const OrbCanvas: React.FC = () => {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebGLSupported(detectWebGL());
  }, []);

  if (webGLSupported === null) return null;

  if (!webGLSupported) {
    return (
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <CssFallbackOrb />
      </div>
    );
  }

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Suspense fallback={<CssFallbackOrb />}>
        <ThreeOrb />
      </Suspense>
    </div>
  );
};

export default OrbCanvas;
