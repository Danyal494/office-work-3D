/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 public/sphere.glb -o src/components/Sphere.jsx -r public 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

import { MeshStandardMaterial } from 'three';
export function Sphere({ text, heading,rotateX,rotateY, createTextTexture, headingColor,mobile, color, textColor, buttonColor, ...props }) {

  const { nodes, materials } = useGLTF('/models/sphere.glb')
  const texture = createTextTexture(text,rotateX,rotateY, heading, 'Button Text', headingColor,color, textColor, buttonColor);

  return (
    <group {...props} dispose={null}>
      <mesh rotation={[rotateX,rotateY,0]} geometry={nodes.Sphere.geometry}  material-color={color} scale={mobile ? 0.70 : 1 } material={materials['Material.001']} >
      <meshStandardMaterial attach="material" 
  map={texture} 
  envMapIntensity={0} // Disable environment map intensity
  metalness={0} // Set metalness to 0 to reduce reflections
  roughness={1}  />
      </mesh>
    </group>
  )
}

useGLTF.preload('/sphere.glb')