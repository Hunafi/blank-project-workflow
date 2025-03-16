
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditorStore } from "@/store/editorStore";

interface PositionControlProps {
  position: { x: number; y: number; z: number };
  assetId: string | null;
}

const PositionControl = ({ position, assetId }: PositionControlProps) => {
  const updateAsset = useEditorStore(state => state.updateAsset);
  
  // Handle position changes
  const handlePositionChange = (axis: 'x' | 'y' | 'z', value: number) => {
    if (!assetId) return;
    
    const newPosition = { ...position, [axis]: value };
    updateAsset(assetId, { position: newPosition });
  };
  
  return (
    <div>
      <h4 className="text-sm font-medium mb-2">Position</h4>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label htmlFor="position-x" className="text-xs">X</Label>
          <Input
            id="position-x"
            type="number"
            value={position.x}
            onChange={(e) => handlePositionChange('x', parseFloat(e.target.value) || 0)}
            step={0.1}
          />
        </div>
        <div>
          <Label htmlFor="position-y" className="text-xs">Y</Label>
          <Input
            id="position-y"
            type="number"
            value={position.y}
            onChange={(e) => handlePositionChange('y', parseFloat(e.target.value) || 0)}
            step={0.1}
          />
        </div>
        <div>
          <Label htmlFor="position-z" className="text-xs">Z</Label>
          <Input
            id="position-z"
            type="number"
            value={position.z}
            onChange={(e) => handlePositionChange('z', parseFloat(e.target.value) || 0)}
            step={0.1}
          />
        </div>
      </div>
    </div>
  );
};

export default PositionControl;
