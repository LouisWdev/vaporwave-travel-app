import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import PalmTree from './PalmTree'
import VaporGrid from './VaporGrid'
import RetroSun from './RetroSun'

// Each card preview is a little postcard diorama: mini sun on the horizon,
// grid floor in the destination's color, and its landmark in front.
// No postprocessing here — eight canvases with bloom would tank the page.

function Turntable({ hovered, children }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * (hovered ? 0.9 : 0.2)
    }
  })
  return <group ref={ref}>{children}</group>
}

function Plane({ color }) {
  return (
    <group rotation={[0.1, 0, 0.08]}>
      <mesh>
        <capsuleGeometry args={[0.09, 0.65, 4, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.9, 0.03, 0.22]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.12, -0.32]}>
        <boxGeometry args={[0.28, 0.16, 0.03]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function Cube({ color }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.65, 0.65, 0.65]} />
        <meshStandardMaterial color="#0D051E" />
      </mesh>
      <mesh>
        <boxGeometry args={[0.66, 0.66, 0.66]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
    </group>
  )
}

function Pyramid({ color }) {
  return (
    <group>
      <mesh>
        <coneGeometry args={[0.5, 0.85, 4]} />
        <meshStandardMaterial color="#0D051E" />
      </mesh>
      <mesh>
        <coneGeometry args={[0.51, 0.86, 4]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
    </group>
  )
}

export default function DestinationPreview({
  model = 'palm',
  color = '#FF71CE',
  accentColor = '#01CDFE',
  hovered = false,
}) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0.7, 3.6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[2, 2, 2]} color={color} intensity={2} />
        <pointLight position={[-2, 1, -1]} color={accentColor} intensity={1.2} />

        <RetroSun position={[0, 0.9, -7]} radius={2.2} bottom={color} />
        <VaporGrid color={color} y={-0.62} size={40} fadeNear={2} fadeFar={14} />

        {model === 'palm' ? (
          <PalmTree position={[0.1, -0.62, 0.4]} scale={0.62} phase={1} />
        ) : (
          <Turntable hovered={hovered}>
            <group position={[0, 0.15, 0]}>
              {model === 'plane' && <Plane color={color} />}
              {model === 'cube' && <Cube color={color} />}
              {model === 'pyramid' && <Pyramid color={color} />}
            </group>
          </Turntable>
        )}
      </Canvas>
    </div>
  )
}
