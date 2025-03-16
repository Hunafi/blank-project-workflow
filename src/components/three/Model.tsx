
import { useRef, useEffect, useState, useCallback, memo } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF, TransformControls } from "@react-three/drei";
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
  const modelRef = useRef<THREE.Group>(null);
  const { camera, gl } = useThree();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const updateAsset = useEditorStore(state => state.updateAsset);
  
  // Clone the scene when it's loaded
  useEffect(() => {
    if (scene && !isLoaded) {
      try {
        if (modelRef.current) {
          // Clear any existing children
          while (modelRef.current.children.length > 0) {
            modelRef.current.remove(modelRef.current.children[0]);
          }
          
          // Add the cloned scene as a child
          const clonedScene = scene.clone();
          modelRef.current.add(clonedScene);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Error cloning scene:", error);
        setHasError(true);
        toast.error("Failed to load 3D model");
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
  
  // Update model position, rotation, and scale when props change
  useEffect(() => {
    if (!modelRef.current) return;
    
    modelRef.current.position.set(position.x, position.y, position.z);
    modelRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
    modelRef.current.scale.set(scale.x, scale.y, scale.z);
  }, [position, rotation, scale]);
  
  // Handle transform changes
  const handleTransformChange = useCallback(() => {
    if (!modelRef.current || !selected) return;
    
    const pos = modelRef.current.position;
    const rot = modelRef.current.rotation;
    const scl = modelRef.current.scale;
    
    updateAsset(assetId, {
      position: { x: pos.x, y: pos.y, z: pos.z },
      rotation: { x: rot.x, y: rot.y, z: rot.z },
      scale: { x: scl.x, y: scl.y, z: scl.z }
    });
  }, [assetId, selected, updateAsset]);

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

  return (
    <>
      <group 
        ref={modelRef}
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        scale={[scale.x, scale.y, scale.z]}
        onClick={handleClick}
      />
      
      {selected && modelRef.current && (
        <TransformControls
          object={modelRef.current}
          mode={transformMode}
          size={0.7}
          translationSnap={0.25}
          rotationSnap={Math.PI / 8}
          scaleSnap={0.25}
          enabled={!canvasLocked}
          showX={true}
          showY={true}
          showZ={true}
          onObjectChange={handleTransformChange}
          onMouseUp={handleTransformChange}
          space="local"
          makeDefault
          camera={camera}
          domElement={gl.domElement}
        />
      )}
    </>
  );
});

// Set display name for React devtools
Model.displayName = 'Model';

export default Model;
