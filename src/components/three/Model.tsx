
import { useRef, useEffect, useState, useCallback, memo } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF, TransformControls as DreiTransformControls } from "@react-three/drei";
import { useEditorStore } from "@/store/editorStore";
import * as THREE from "three";
import { toast } from "sonner";

interface ModelProps { 
  url: string; 
  position: { x: number; y: number; z: number }; 
  rotation: { x: number; y: number; z: number }; 
  scale: { x: number; y: number; z: number }; 
  selected: boolean; 
  transformMode: 'translate' | 'rotate' | 'scale';
  canvasLocked: boolean;
  assetId: string;
}

// Using memo to prevent unnecessary re-renders
const Model = memo(({ 
  url, 
  position, 
  rotation, 
  scale, 
  selected, 
  transformMode,
  canvasLocked,
  assetId
}: ModelProps) => {
  const { scene } = useGLTF(url, true);
  const cloneRef = useRef<THREE.Group | null>(null);
  const transformRef = useRef<THREE.Mesh>(null);
  const updateAsset = useEditorStore(state => state.updateAsset);
  const { camera } = useThree();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    if (scene && !cloneRef.current) {
      try {
        cloneRef.current = scene.clone();
        setIsLoaded(true);
      } catch (error) {
        console.error("Error cloning scene:", error);
        setHasError(true);
        toast.error("Failed to load 3D model");
      }
    }
    
    return () => {
      // Clean up when component unmounts
      if (cloneRef.current) {
        cloneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (object.material instanceof THREE.Material) {
              object.material.dispose();
            } else if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            }
          }
        });
        cloneRef.current = null;
      }
    };
  }, [scene]);
  
  // Update mesh position, rotation, and scale when props change
  useEffect(() => {
    if (!transformRef.current) return;
    
    transformRef.current.position.set(position.x, position.y, position.z);
    transformRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
    transformRef.current.scale.set(scale.x, scale.y, scale.z);
  }, [position, rotation, scale]);
  
  // Debounced update function with throttling to reduce update frequency
  const onTransformChange = useCallback(() => {
    if (!transformRef.current || !selected) return;
    
    const pos = transformRef.current.position;
    const rot = transformRef.current.rotation;
    const scl = transformRef.current.scale;
    
    // Only update if there's an actual change
    if (
      pos.x !== position.x || 
      pos.y !== position.y || 
      pos.z !== position.z ||
      rot.x !== rotation.x || 
      rot.y !== rotation.y || 
      rot.z !== rotation.z ||
      scl.x !== scale.x || 
      scl.y !== scale.y || 
      scl.z !== scale.z
    ) {
      updateAsset(assetId, {
        position: { x: pos.x, y: pos.y, z: pos.z },
        rotation: { x: rot.x, y: rot.y, z: rot.z },
        scale: { x: scl.x, y: scl.y, z: scl.z }
      });
    }
  }, [assetId, position, rotation, scale, selected, updateAsset]);

  // Use handleClick for selecting the model
  const handleClick = useCallback((e) => {
    if (selected) return;
    e.stopPropagation();
    useEditorStore.getState().selectAsset(assetId);
    toast.success(`Selected: ${url.split('/').pop()}`, {
      duration: 2000,
    });
  }, [assetId, selected, url]);

  if (hasError) {
    return null;
  }

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <mesh
        ref={transformRef}
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        scale={[scale.x, scale.y, scale.z]}
        onClick={handleClick}
      >
        {cloneRef.current && <primitive object={cloneRef.current} />}
      </mesh>
      
      {selected && cloneRef.current && (
        <DreiTransformControls
          object={transformRef}
          mode={transformMode}
          onObjectChange={onTransformChange}
          space="local"
          makeDefault
          enabled={true}
        />
      )}
    </>
  );
});

// Set display name for React devtools
Model.displayName = 'Model';

export default Model;
