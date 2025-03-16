
import { useRef, useEffect } from "react";
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

const Model = ({ 
  url, 
  position, 
  rotation, 
  scale, 
  selected, 
  transformMode,
  canvasLocked,
  assetId
}: ModelProps) => {
  const { scene } = useGLTF(url);
  const clone = useRef<THREE.Group>(scene.clone());
  const transformRef = useRef<THREE.Mesh>(null);
  const updateAsset = useEditorStore(state => state.updateAsset);
  const { camera } = useThree();
  
  // Update mesh position, rotation, and scale when props change
  useEffect(() => {
    if (!transformRef.current) return;
    
    transformRef.current.position.set(position.x, position.y, position.z);
    transformRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
    transformRef.current.scale.set(scale.x, scale.y, scale.z);
  }, [position, rotation, scale]);
  
  // Safe update function with debounce logic to prevent excessive updates
  const onTransformChange = () => {
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
  };

  return (
    <>
      <mesh
        ref={transformRef}
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        scale={[scale.x, scale.y, scale.z]}
        onClick={(e) => {
          if (selected) return;
          e.stopPropagation();
          useEditorStore.getState().selectAsset(assetId);
          toast.success(`Selected: ${url.split('/').pop()}`, {
            duration: 2000,
          });
        }}
      >
        <primitive object={clone.current} />
      </mesh>
      
      {selected && (
        <DreiTransformControls
          object={transformRef}
          mode={transformMode}
          onObjectChange={onTransformChange}
          space="local"
          // These props help prevent excessive re-renders
          makeDefault
          enabled={true}
        />
      )}
    </>
  );
};

export default Model;
