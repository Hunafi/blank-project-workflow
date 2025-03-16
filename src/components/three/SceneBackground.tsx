
import { useEditorStore } from "@/store/editorStore";
import * as THREE from "three";

interface SceneBackgroundProps {
  onClick: (e: THREE.Intersection) => void;
}

const SceneBackground = ({ onClick }: SceneBackgroundProps) => {
  return (
    <mesh 
      position={[0, 0, -10]} 
      rotation={[0, 0, 0]} 
      scale={[100, 100, 1]}
      onClick={(e) => {
        e.stopPropagation();
        useEditorStore.getState().selectAsset(null);
      }}
      userData={{ background: true }}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
};

export default SceneBackground;
