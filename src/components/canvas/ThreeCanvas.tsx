"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

interface ThreeCanvasProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
}

export function ThreeCanvas({
  children,
  cameraPosition = [0, 0, 6],
  fov = 45,
}: ThreeCanvasProps) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        camera={{ position: cameraPosition, fov }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Subtle lighting matching editorial tone */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
          <pointLight position={[-5, -5, -5]} intensity={0.4} />
          
          {children}
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
export default ThreeCanvas;
