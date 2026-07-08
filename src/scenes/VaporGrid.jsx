import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Anti-aliased grid lines drawn in the fragment shader, fading with distance
// and scrolling toward the camera. Line color exceeds 1.0 slightly so peaks
// catch the bloom pass.
const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uFadeNear;
  uniform float uFadeFar;
  varying vec3 vWorld;

  void main() {
    vec2 coord = (vWorld.xz + vec2(0.0, uTime * 1.4)) * 0.5;
    vec2 g = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
    float line = 1.0 - min(min(g.x, g.y), 1.0);

    float dist = length(vWorld.xz);
    float fade = 1.0 - smoothstep(uFadeNear, uFadeFar, dist);

    gl_FragColor = vec4(uColor * (0.6 + line * 0.9), line * fade);
  }
`

export default function VaporGrid({
  color = '#FF71CE',
  y = -1.3,
  size = 120,
  fadeNear = 6,
  fadeFar = 42,
}) {
  const materialRef = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uFadeNear: { value: fadeNear },
      uFadeFar: { value: fadeFar },
    }),
    [fadeNear, fadeFar]
  )

  // Color can change at runtime (vapor mode) without rebuilding the material
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uColor.value.lerp(
        new THREE.Color(color),
        0.08
      )
    }
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}>
      <planeGeometry args={[size, size]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}
