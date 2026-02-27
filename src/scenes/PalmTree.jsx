import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Single frond (leaf)
function Frond({ angle, tilt, color }) {
  return (
    <group rotation={[0, angle, 0]}>
      <mesh rotation={[tilt, 0, 0]} position={[0.3, 0, 0]}>
        <coneGeometry args={[0.05, 0.8, 4]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

export default function PalmTree({ position = [0,0,0], color = '#FF6EC7', accentColor = '#00FFFF', scale = 1, spinSpeed = 0.3 }) {
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (groupRef.current) {
      const boost = document.body.classList.contains('vapor-mode') ? 3.5 : 1
      groupRef.current.rotation.y += delta * spinSpeed * boost
    }
  })

  const frondCount = 7

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Trunk - tapered cylinder */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.04, 0.08, 1.5, 8]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.2} wireframe={false} />
      </mesh>
      {/* Trunk glow ring */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 1.5, 8]} />
        <meshStandardMaterial color={color} transparent opacity={0.1} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      {/* Crown */}
      <group position={[0, 1.5, 0]}>
        {Array.from({ length: frondCount }).map((_, i) => (
          <Frond
            key={i}
            angle={(i / frondCount) * Math.PI * 2}
            tilt={Math.PI * 0.35}
            color={color}
          />
        ))}
        {/* Center sphere */}
        <mesh>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  )
}
