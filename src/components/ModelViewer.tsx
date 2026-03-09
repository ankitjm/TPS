import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

const ModelViewer: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Load the GLB model from public folder
  const { scene } = useGLTF('/Embassy.glb');

  useFrame((state) => {
    if (scene) {
      scene.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      scene.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      scene.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
    }
  });

  return (
    <Center>
      <primitive 
        object={scene} 
        scale={[2, 2, 2]}
        ref={meshRef}
      />
    </Center>
  );
};

// Preload the model
useGLTF.preload('/Embassy.glb');

export default ModelViewer;