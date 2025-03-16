
import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useEditorStore } from "@/store/editorStore";
import * as THREE from "three";

const KeyframeAnimator = () => {
  const assets = useEditorStore(state => state.assets);
  const currentTime = useEditorStore(state => state.currentTime);
  const cameraKeyframes = useEditorStore(state => state.cameraKeyframes);
  const playing = useEditorStore(state => state.playing);
  const { camera } = useThree();
  
  // Use ref to track last update time to prevent too frequent updates
  const lastUpdateTime = useRef(0);
  const lastAssetStates = useRef(new Map());
  
  // Handle camera animation
  useEffect(() => {
    if (cameraKeyframes.length < 2) return;
    
    let prevKeyframe = cameraKeyframes[0];
    let nextKeyframe = cameraKeyframes[0];
    let foundKeyframes = false;
    
    for (let i = 0; i < cameraKeyframes.length; i++) {
      if (cameraKeyframes[i].time <= currentTime) {
        prevKeyframe = cameraKeyframes[i];
      }
      if (cameraKeyframes[i].time >= currentTime && (i === 0 || cameraKeyframes[i-1].time <= currentTime)) {
        nextKeyframe = cameraKeyframes[i];
        if (prevKeyframe !== nextKeyframe) {
          foundKeyframes = true;
        }
        break;
      }
    }
    
    if (!foundKeyframes) return;
    
    const t = (currentTime - prevKeyframe.time) / (nextKeyframe.time - prevKeyframe.time);
    
    camera.position.x = THREE.MathUtils.lerp(prevKeyframe.position.x, nextKeyframe.position.x, t);
    camera.position.y = THREE.MathUtils.lerp(prevKeyframe.position.y, nextKeyframe.position.y, t);
    camera.position.z = THREE.MathUtils.lerp(prevKeyframe.position.z, nextKeyframe.position.z, t);
    
    camera.rotation.x = THREE.MathUtils.lerp(prevKeyframe.rotation.x, nextKeyframe.rotation.x, t);
    camera.rotation.y = THREE.MathUtils.lerp(prevKeyframe.rotation.y, nextKeyframe.rotation.y, t);
    camera.rotation.z = THREE.MathUtils.lerp(prevKeyframe.rotation.z, nextKeyframe.rotation.z, t);
    
  }, [currentTime, cameraKeyframes, camera, playing]);
  
  // Asset animation using useFrame for better performance
  useFrame(() => {
    if (!playing) return;
    
    // Throttle updates to max 30 frames per second
    const now = performance.now();
    if (now - lastUpdateTime.current < 33.33) { // 1000ms / 30fps ≈ 33.33ms
      return;
    }
    lastUpdateTime.current = now;
    
    assets.forEach(asset => {
      if (asset.keyframes.length < 2) return;
      
      let prevKeyframe = asset.keyframes[0];
      let nextKeyframe = asset.keyframes[0];
      let foundKeyframes = false;
      
      for (let i = 0; i < asset.keyframes.length; i++) {
        if (asset.keyframes[i].time <= currentTime) {
          prevKeyframe = asset.keyframes[i];
        }
        if (asset.keyframes[i].time >= currentTime && (i === 0 || asset.keyframes[i-1].time <= currentTime)) {
          nextKeyframe = asset.keyframes[i];
          if (prevKeyframe !== nextKeyframe) {
            foundKeyframes = true;
          }
          break;
        }
      }
      
      if (!foundKeyframes) return;
      
      const t = (currentTime - prevKeyframe.time) / (nextKeyframe.time - prevKeyframe.time);
      
      const interpolatedPosition = {
        x: THREE.MathUtils.lerp(prevKeyframe.position.x, nextKeyframe.position.x, t),
        y: THREE.MathUtils.lerp(prevKeyframe.position.y, nextKeyframe.position.y, t),
        z: THREE.MathUtils.lerp(prevKeyframe.position.z, nextKeyframe.position.z, t)
      };
      
      const interpolatedRotation = {
        x: THREE.MathUtils.lerp(prevKeyframe.rotation.x, nextKeyframe.rotation.x, t),
        y: THREE.MathUtils.lerp(prevKeyframe.rotation.y, nextKeyframe.rotation.y, t),
        z: THREE.MathUtils.lerp(prevKeyframe.rotation.z, nextKeyframe.rotation.z, t)
      };
      
      const interpolatedScale = {
        x: THREE.MathUtils.lerp(prevKeyframe.scale.x, nextKeyframe.scale.x, t),
        y: THREE.MathUtils.lerp(prevKeyframe.scale.y, nextKeyframe.scale.y, t),
        z: THREE.MathUtils.lerp(prevKeyframe.scale.z, nextKeyframe.scale.z, t)
      };
      
      // Store the current state in the ref
      lastAssetStates.current.set(asset.id, {
        position: interpolatedPosition,
        rotation: interpolatedRotation,
        scale: interpolatedScale
      });
      
      // Update the asset in the store
      useEditorStore.getState().updateAsset(asset.id, {
        position: interpolatedPosition,
        rotation: interpolatedRotation,
        scale: interpolatedScale
      });
    });
  });
  
  return null;
};

export default KeyframeAnimator;
