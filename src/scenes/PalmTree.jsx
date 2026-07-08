import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Palms read as dark silhouettes against the sun — the classic outrun
// composition — instead of glowing neon props. Unlit material, so they
// need no lights and stay pure black against the bloom.
const SILHOUETTE = '#0D051E'

function Frond({ angle, droop, length }) {
  return (
    <group rotation={[0, angle, droop]}>
      {/* main blade */}
      <mesh
        position={[length / 2, 0, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[1, 1, 0.35]}
      >
        <coneGeometry args={[0.05, length, 6]} />
        <meshBasicMaterial color={SILHOUETTE} />
      </mesh>
      {/* drooping tip */}
      <group position={[length * 0.9, 0, 0]} rotation={[0, 0, -0.7]}>
        <mesh
          position={[length * 0.18, 0, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[1, 1, 0.35]}
        >
          <coneGeometry args={[0.03, length * 0.45, 6]} />
          <meshBasicMaterial color={SILHOUETTE} />
        </mesh>
      </group>
    </group>
  )
}

const FRONDS = [
  { angle: 0.0, droop: -0.25, length: 1.05 },
  { angle: 0.8, droop: -0.5, length: 0.95 },
  { angle: 1.6, droop: -0.15, length: 1.1 },
  { angle: 2.4, droop: -0.6, length: 0.9 },
  { angle: 3.1, droop: -0.35, length: 1.0 },
  { angle: 3.9, droop: -0.2, length: 1.05 },
  { angle: 4.7, droop: -0.55, length: 0.92 },
  { angle: 5.5, droop: -0.4, length: 1.0 },
]

const TRUNK_SEGMENTS = 4

export default function PalmTree({
  position = [0, 0, 0],
  scale = 1,
  lean = 0.08,
  phase = 0,
}) {
  const crownRef = useRef()

  useFrame((state) => {
    if (crownRef.current) {
      const boost = document.body.classList.contains('vapor-mode') ? 3 : 1
      const t = state.clock.elapsedTime
      crownRef.current.rotation.z =
        Math.sin(t * 0.6 * boost + phase) * 0.05
    }
  })

  const segH = 0.45
  const crownY = TRUNK_SEGMENTS * segH * 0.96

  return (
    <group position={position} scale={scale} rotation={[0, 0, lean]}>
      {/* curved trunk built from leaning segments */}
      {Array.from({ length: TRUNK_SEGMENTS }).map((_, i) => (
        <mesh
          key={i}
          position={[i * i * 0.022, i * segH * 0.95 + segH / 2, 0]}
          rotation={[0, 0, -i * 0.05]}
        >
          <cylinderGeometry
            args={[0.065 - i * 0.008, 0.075 - i * 0.008, segH, 7]}
          />
          <meshBasicMaterial color={SILHOUETTE} />
        </mesh>
      ))}

      {/* crown */}
      <group ref={crownRef} position={[0.28, crownY, 0]}>
        {FRONDS.map((f, i) => (
          <Frond key={i} {...f} />
        ))}
        {/* coconuts */}
        <mesh position={[0.08, -0.06, 0.05]}>
          <sphereGeometry args={[0.07, 6, 6]} />
          <meshBasicMaterial color={SILHOUETTE} />
        </mesh>
        <mesh position={[-0.07, -0.08, -0.04]}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshBasicMaterial color={SILHOUETTE} />
        </mesh>
      </group>
    </group>
  )
}
