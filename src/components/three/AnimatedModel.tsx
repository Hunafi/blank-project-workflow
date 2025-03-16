
import { useRef, useEffect, useState, memo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface AnimatedModelProps {
  url: string;
  keyframes: Array<{
    time: number;
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
    scale: { x: number; y: number; z: number };
  }>;
  currentTime: number;
}

const AnimatedModel = memo(({ url, keyframes, currentTime }: AnimatedModelProps) => {
  const { scene } = useGLTF(url, true);
  const modelRef = useRef<THREE.Group>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Clone the scene when it's loaded
  useEffect(() => {
    if (scene && !isLoaded && modelRef.current) {
      try {
        // Clear any existing children
        while (modelRef.current.children.length > 0) {
          modelRef.current.remove(modelRef.current.children[0]);
        }
        
        // Add the cloned scene as a child
        const clonedScene = scene.clone();
        modelRef.current.add(clonedScene);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error cloning scene:", error);
      }
    }
    
    return () => {
      // Clean up when component unmounts
      if (modelRef.current) {
        modelRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (object.material instanceof THREE.Material) {
              object.material.dispose();
            } else if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            }
          }
        });
      }
    };
  }, [scene, isLoaded]);
  
  // Animate based on keyframes
  useEffect(() => {
    if (!modelRef.current || keyframes.length < 2) return;
    
    let prevKeyframe = keyframes[0];
    let nextKeyframe = keyframes[0];
    let foundKeyframes = false;
    
    for (let i = 0; i < keyframes.length; i++) {
      if (keyframes[i].time <= currentTime) {
        prevKeyframe = keyframes[i];
      }
      if (keyframes[i].time >= currentTime && (i === 0 || keyframes[i-1].time <= currentTime)) {
        nextKeyframe = keyframes[i];
        if (prevKeyframe !== nextKeyframe) {
          foundKeyframes = true;
        }
        break;
      }
    }
    
    if (!foundKeyframes) {
      // If no keyframe pair is found, use the first keyframe values directly
      const firstKeyframe = keyframes[0];
      modelRef.current.position.set(
        firstKeyframe.position.x, 
        firstKeyframe.position.y, 
        firstKeyframe.position.z
      );
      modelRef.current.rotation.set(
        firstKeyframe.rotation.x, 
        firstKeyframe.rotation.y, 
        firstKeyframe.rotation.z
      );
      modelRef.current.scale.set(
        firstKeyframe.scale.x, 
        firstKeyframe.scale.y, 
        firstKeyframe.scale.z
      );
      return;
    }
    
    const t = (currentTime - prevKeyframe.time) / (nextKeyframe.time - prevKeyframe.time);
    
    // Position interpolation
    modelRef.current.position.x = THREE.MathUtils.lerp(
      prevKeyframe.position.x, 
      nextKeyframe.position.x, 
      t
    );
    modelRef.current.position.y = THREE.MathUtils.lerp(
      prevKeyframe.position.y, 
      nextKeyframe.position.y, 
      t
    );
    modelRef.current.position.z = THREE.MathUtils.lerp(
      prevKeyframe.position.z, 
      nextKeyframe.position.z, 
      t
    );
    
    // Rotation interpolation
    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      prevKeyframe.rotation.x, 
      nextKeyframe.rotation.x, 
      t
    );
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      prevKeyframe.rotation.y, 
      nextKeyframe.rotation.y, 
      t
    );
    modelRef.current.rotation.z = THREE.MathUtils.lerp(
      prevKeyframe.rotation.z, 
      nextKeyframe.rotation.z, 
      t
    );
    
    // Scale interpolation
    modelRef.current.scale.x = THREE.MathUtils.lerp(
      prevKeyframe.scale.x, 
      nextKeyframe.scale.x, 
      t
    );
    modelRef.current.scale.y = THREE.MathUtils.lerp(
      prevKeyframe.scale.y, 
      nextKeyframe.scale.y, 
      t
    );
    modelRef.current.scale.z = THREE.MathUtils.lerp(
      prevKeyframe.scale.z, 
      nextKeyframe.scale.z, 
      t
    );
    
  }, [currentTime, keyframes]);
  
  return <group ref={modelRef} />;
});

AnimatedModel.displayName = 'AnimatedModel';

export default AnimatedModel;
