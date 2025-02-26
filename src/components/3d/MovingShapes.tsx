import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Octahedron } from "@react-three/drei";

type ShapeProps = {
  position: [number, number, number];
  speed?: number;
};

export function Shape({ position, speed = 1 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * speed) * 0.2;
    meshRef.current.rotation.y =
      Math.cos(state.clock.elapsedTime * speed) * 0.2;
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
  });

  return (
    <Octahedron ref={meshRef} position={position} args={[0.2]}>
      <meshStandardMaterial
        color="#00A693"
        transparent
        opacity={0.5}
        roughness={0.5}
        metalness={0.8}
      />
    </Octahedron>
  );
}

export function MovingShapes() {
  return (
    <group>
      {Array.from({ length: 50 }).map((_, i) => (
        <Shape
          key={i}
          position={[
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
          ]}
          speed={0.5 + Math.random() * 0.5}
        />
      ))}
    </group>
  );
}
