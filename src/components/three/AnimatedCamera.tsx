
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

interface AnimatedCameraProps {
  keyframes: Array<{
    time: number;
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
  }>;
  currentTime: number;
}

const AnimatedCamera = ({ keyframes, currentTime }: AnimatedCameraProps) => {
  const { camera } = useThree();
  
  useEffect(() => {
    if (keyframes.length < 2) return;
    
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
      camera.position.set(
        firstKeyframe.position.x, 
        firstKeyframe.position.y, 
        firstKeyframe.position.z
      );
      camera.rotation.set(
        firstKeyframe.rotation.x, 
        firstKeyframe.rotation.y, 
        firstKeyframe.rotation.z
      );
      return;
    }
    
    const t = (currentTime - prevKeyframe.time) / (nextKeyframe.time - prevKeyframe.time);
    
    // Position interpolation
    camera.position.x = THREE.MathUtils.lerp(
      prevKeyframe.position.x, 
      nextKeyframe.position.x, 
      t
    );
    camera.position.y = THREE.MathUtils.lerp(
      prevKeyframe.position.y, 
      nextKeyframe.position.y, 
      t
    );
    camera.position.z = THREE.MathUtils.lerp(
      prevKeyframe.position.z, 
      nextKeyframe.position.z, 
      t
    );
    
    // Rotation interpolation
    camera.rotation.x = THREE.MathUtils.lerp(
      prevKeyframe.rotation.x, 
      nextKeyframe.rotation.x, 
      t
    );
    camera.rotation.y = THREE.MathUtils.lerp(
      prevKeyframe.rotation.y, 
      nextKeyframe.rotation.y, 
      t
    );
    camera.rotation.z = THREE.MathUtils.lerp(
      prevKeyframe.rotation.z, 
      nextKeyframe.rotation.z, 
      t
    );
    
  }, [camera, currentTime, keyframes]);
  
  return null;
};

export default AnimatedCamera;
