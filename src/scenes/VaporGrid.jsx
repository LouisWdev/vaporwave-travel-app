import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function VaporGrid({ color = '#FF6EC7', size = 20, divisions = 20 }) {
  const gridRef = useRef()

  useFrame((state) => {
    if (gridRef.current) {
      // Scroll grid slowly forward (z axis) for motion illusion
      gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % (size / divisions)
    }
  })

  return (
    <group ref={gridRef}>
      <gridHelper
        args={[size * 3, divisions * 3, color, color]}
        rotation={[0, 0, 0]}
        position={[0, -1.5, -size]}
      />
      {/* Floor plane with fresnel-like fade */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[size * 3, size * 3]} />
        <meshStandardMaterial
          color="#0A0015"
          emissive="#0A0015"
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  )
}
