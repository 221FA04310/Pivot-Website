"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Generate Canvas textures for custom shapes dynamically on client-side
function createShapeTexture(shape: string) {
  if (typeof window === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, 64, 64);
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 5;

  if (shape === "circle") {
    ctx.beginPath();
    ctx.arc(32, 32, 24, 0, Math.PI * 2);
    ctx.fill();
  } else if (shape === "square") {
    ctx.strokeRect(12, 12, 40, 40);
  } else if (shape === "diamond") {
    ctx.beginPath();
    ctx.moveTo(32, 8);
    ctx.lineTo(56, 32);
    ctx.lineTo(32, 56);
    ctx.lineTo(8, 32);
    ctx.closePath();
    ctx.stroke();
  } else if (shape === "cross") {
    ctx.beginPath();
    ctx.moveTo(32, 8);
    ctx.lineTo(32, 56);
    ctx.moveTo(8, 32);
    ctx.lineTo(56, 32);
    ctx.stroke();
  } else if (shape === "glow") {
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 28);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 28, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

interface ParticleGroupProps {
  shape: "circle" | "square" | "diamond" | "cross" | "glow";
  count: number;
}

function ParticleGroup({ shape, count }: ParticleGroupProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  // Generate textures once on mount
  const texture = useMemo(() => createShapeTexture(shape), [shape]);

  // Brand colors mapping
  const brandColors = useMemo(() => [
    new THREE.Color("#39C8C9"), // Pivot Teal
    new THREE.Color("#5EDFE0"), // Soft Cyan
    new THREE.Color("#1F4E63"), // Muted Blue
    new THREE.Color("#ffffff")  // Subtle White
  ], []);

  // Initialize positions, colors, size/drift, and limits in 3D coordinate space
  const { positions, colors, sizeAndDrift } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    
    // index meanings: 0 = baseSize, 1 = vx, 2 = vy, 3 = vz, 4 = baseOpacity
    const sDrift = new Float32Array(count * 5);

    for (let i = 0; i < count; i++) {
      // Setup random points in a broad 3D bounding volume
      const x = (Math.random() - 0.5) * 35;
      const y = (Math.random() - 0.5) * 22;
      const z = Math.random() * 32 - 24; // depth range from -24 to 8

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Assign a random brand color
      const color = brandColors[Math.floor(Math.random() * brandColors.length)];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;

      // Drift velocity rates (extremely slow)
      const vx = (Math.random() - 0.5) * 0.012;
      const vy = (Math.random() - 0.5) * 0.012;
      const vz = (Math.random() - 0.5) * 0.012;

      // Particle size range
      let size = Math.random() * 0.08 + 0.04;
      if (shape === "glow") {
        size = Math.random() * 0.07 + 0.03;
      }

      // Base opacity
      let opacity = Math.random() * 0.5 + 0.25;
      if (color.r === 1 && color.g === 1 && color.b === 1) {
        opacity = Math.random() * 0.12 + 0.04; // white highlights are tiny and faint
      } else if (color.r === 31/255 && color.g === 78/255 && color.b === 99/255) {
        opacity = Math.random() * 0.55 + 0.25; // darker blue can be slightly more opaque
      }

      sDrift[i * 5] = size;
      sDrift[i * 5 + 1] = vx;
      sDrift[i * 5 + 2] = vy;
      sDrift[i * 5 + 3] = vz;
      sDrift[i * 5 + 4] = opacity;
    }

    return { positions: pos, colors: cols, sizeAndDrift: sDrift };
  }, [count, brandColors, shape]);

  // WebGL shader material with GPU-attenuated size and Y culling
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uTexture: { value: texture },
        uBottomFadeStart: { value: -4.0 }, // y coordinate threshold where fading starts
        uBottomFadeEnd: { value: -11.0 }   // y coordinate threshold where fading completes
      },
      vertexShader: `
        attribute float aSize;
        attribute float aOpacity;
        varying vec3 vColor;
        varying float vOpacity;
        varying float vWorldY;

        void main() {
          vColor = color;
          vOpacity = aOpacity;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // GPU Size attenuation based on perspective camera distance
          gl_PointSize = aSize * (350.0 / -mvPosition.z);
          
          vWorldY = position.y;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uBottomFadeStart;
        uniform float uBottomFadeEnd;
        varying vec3 vColor;
        varying float vOpacity;
        varying float vWorldY;

        void main() {
          vec4 texColor = texture2D(uTexture, gl_PointCoord);
          if (texColor.a < 0.05) discard;

          // GPU-accelerated bottom culling for a clean transition to footer
          float fade = 1.0;
          if (vWorldY < uBottomFadeStart) {
            fade = smoothstep(uBottomFadeEnd, uBottomFadeStart, vWorldY);
          }
          
          gl_FragColor = vec4(vColor, texColor.a * vOpacity * fade);
        }
      `,
      vertexColors: true
    });
  }, [texture]);

  // Mount custom attribute arrays
  useEffect(() => {
    if (geometryRef.current) {
      const sizeArray = new Float32Array(count);
      const opacityArray = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        sizeArray[i] = sizeAndDrift[i * 5];
        opacityArray[i] = sizeAndDrift[i * 5 + 4];
      }
      geometryRef.current.setAttribute("aSize", new THREE.BufferAttribute(sizeArray, 1));
      geometryRef.current.setAttribute("aOpacity", new THREE.BufferAttribute(opacityArray, 1));
    }
  }, [count, sizeAndDrift]);

  // Frame drift loop
  useFrame(() => {
    if (!pointsRef.current || !geometryRef.current) return;

    const positionsAttr = geometryRef.current.attributes.position;
    const array = positionsAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const vx = sizeAndDrift[i * 5 + 1];
      const vy = sizeAndDrift[i * 5 + 2];
      const vz = sizeAndDrift[i * 5 + 3];

      array[i * 3] += vx;
      array[i * 3 + 1] += vy;
      array[i * 3 + 2] += vz;

      // Wrapping space boundaries
      const limitX = 18;
      const limitY = 12;
      const limitZNear = 8;
      const limitZFar = -24;

      if (array[i * 3] < -limitX) array[i * 3] = limitX;
      else if (array[i * 3] > limitX) array[i * 3] = -limitX;

      if (array[i * 3 + 1] < -limitY) array[i * 3 + 1] = limitY;
      else if (array[i * 3 + 1] > limitY) array[i * 3 + 1] = -limitY;

      if (array[i * 3 + 2] < limitZFar) array[i * 3 + 2] = limitZNear;
      else if (array[i * 3 + 2] > limitZNear) array[i * 3 + 2] = limitZFar;
    }

    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial />
      <primitive object={shaderMaterial} attach="material" />
    </points>
  );
}

interface CameraControllerProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number; active: boolean; lastMoveTime: number }>;
}

function CameraController({ mouseRef }: CameraControllerProps) {
  const { camera } = useThree();
  const mouseWeight = useRef(0);

  useFrame(() => {
    // Easing timer logic when cursor is stationary
    const timeSinceLastMove = Date.now() - mouseRef.current.lastMoveTime;
    let targetWeight = 0;
    
    if (mouseRef.current.active && timeSinceLastMove < 1000) {
      targetWeight = 1.0;
    } else if (mouseRef.current.active && timeSinceLastMove >= 1000) {
      const fadeProgress = Math.min(1, (timeSinceLastMove - 1000) / 1500);
      targetWeight = 1.0 - fadeProgress;
    } else {
      targetWeight = 0;
    }

    mouseWeight.current += (targetWeight - mouseWeight.current) * 0.04;

    // Translation target: ±1.5 units X, ±1.0 units Y
    const targetX = mouseRef.current.active ? (mouseRef.current.x * 1.5 * mouseWeight.current) : 0;
    const targetY = mouseRef.current.active ? (mouseRef.current.y * 1.0 * mouseWeight.current) : 0;

    // Rotation target: ±1° X, ±1° Y (0.0175 rad)
    const targetRotY = mouseRef.current.active ? (-mouseRef.current.x * 0.0175 * mouseWeight.current) : 0;
    const targetRotX = mouseRef.current.active ? (mouseRef.current.y * 0.0175 * mouseWeight.current) : 0;

    // Easing/Inertia update
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z += (15 - camera.position.z) * 0.05;

    camera.rotation.y += (targetRotY - camera.rotation.y) * 0.05;
    camera.rotation.x += (targetRotX - camera.rotation.x) * 0.05;
  });

  return null;
}

export default function Scene3D() {
  const mouseRef = useRef({ x: 0, y: 0, active: false, lastMoveTime: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinate metrics between -1 and 1
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.active = true;
      mouseRef.current.lastMoveTime = Date.now();
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden">
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 15] }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <CameraController mouseRef={mouseRef} />
        
        {/* Render separate points systems for each custom canvas texture shape */}
        <ParticleGroup shape="circle" count={25} />
        <ParticleGroup shape="square" count={25} />
        <ParticleGroup shape="diamond" count={25} />
        <ParticleGroup shape="cross" count={25} />
        <ParticleGroup shape="glow" count={20} />
      </Canvas>
    </div>
  );
}
