
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditorStore } from "@/store/editorStore";

interface RotationControlProps {
  rotation: { x: number; y: number; z: number };
  assetId: string | null;
}

const RotationControl = ({ rotation, assetId }: RotationControlProps) => {
  const updateAsset = useEditorStore(state => state.updateAsset);
  
  // Handle rotation changes
  const handleRotationChange = (axis: 'x' | 'y' | 'z', value: number) => {
    if (!assetId) return;
    
    const newRotation = { ...rotation, [axis]: value };
    updateAsset(assetId, { rotation: newRotation });
  };
  
  return (
    <div>
      <h4 className="text-sm font-medium mb-2">Rotation</h4>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label htmlFor="rotation-x" className="text-xs">X</Label>
          <Input
            id="rotation-x"
            type="number"
            value={rotation.x}
            onChange={(e) => handleRotationChange('x', parseFloat(e.target.value) || 0)}
            step={0.1}
          />
        </div>
        <div>
          <Label htmlFor="rotation-y" className="text-xs">Y</Label>
          <Input
            id="rotation-y"
            type="number"
            value={rotation.y}
            onChange={(e) => handleRotationChange('y', parseFloat(e.target.value) || 0)}
            step={0.1}
          />
        </div>
        <div>
          <Label htmlFor="rotation-z" className="text-xs">Z</Label>
          <Input
            id="rotation-z"
            type="number"
            value={rotation.z}
            onChange={(e) => handleRotationChange('z', parseFloat(e.target.value) || 0)}
            step={0.1}
          />
        </div>
      </div>
    </div>
  );
};

export default RotationControl;
