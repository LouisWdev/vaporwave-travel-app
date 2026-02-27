import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import PalmTree from './PalmTree'

function SpinningPalm({ color, accentColor, isHovered }) {
  return <PalmTree color={color} accentColor={accentColor} scale={0.9} spinSpeed={isHovered ? 1.5 : 0.3} />
}

function SpinningPlane({ color, isHovered }) {
  const ref = useRef()
  useFrame((state, delta) => {
    if (ref.current) {
      const boost = document.body.classList.contains('vapor-mode') ? 3 : 1
      ref.current.rotation.y += delta * (isHovered ? 1.5 : 0.4) * boost
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15
    }
  })
  return (
    <group ref={ref}>
      {/* Fuselage */}
      <mesh>
        <capsuleGeometry args={[0.08, 0.6, 4, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
      </mesh>
      {/* Wings */}
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.03, 0.2]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.9} />
      </mesh>
      {/* Tail */}
      <mesh position={[0, 0.1, -0.3]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.25, 0.15, 0.03]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function SpinningCube({ color, isHovered }) {
  const ref = useRef()
  useFrame((state, delta) => {
    if (ref.current) {
      const boost = document.body.classList.contains('vapor-mode') ? 3 : 1
      ref.current.rotation.y += delta * (isHovered ? 1.2 : 0.3) * boost
      ref.current.rotation.x += delta * (isHovered ? 0.5 : 0.1) * boost
    }
  })
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe={false} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.72, 0.72, 0.72]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.5} emissive={color} emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}

function SpinningPyramid({ color, isHovered }) {
  const ref = useRef()
  useFrame((state, delta) => {
    if (ref.current) {
      const boost = document.body.classList.contains('vapor-mode') ? 3 : 1
      ref.current.rotation.y += delta * (isHovered ? 1.0 : 0.25) * boost
    }
  })
  return (
    <mesh ref={ref}>
      <coneGeometry args={[0.5, 0.9, 4]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} wireframe={false} />
    </mesh>
  )
}

export default function DestinationPreview({ model = 'palm', color = '#FF6EC7', accentColor = '#00FFFF' }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      style={{ width: '100%', height: '160px', cursor: 'pointer' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0.5, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 2, 2]} color={color} intensity={2} />
        <pointLight position={[-2, -1, -1]} color={accentColor} intensity={1} />

        {model === 'palm' && <SpinningPalm color={color} accentColor={accentColor} isHovered={isHovered} />}
        {model === 'plane' && <SpinningPlane color={color} isHovered={isHovered} />}
        {model === 'cube' && <SpinningCube color={color} isHovered={isHovered} />}
        {model === 'pyramid' && <SpinningPyramid color={color} isHovered={isHovered} />}
      </Canvas>
    </div>
  )
}
