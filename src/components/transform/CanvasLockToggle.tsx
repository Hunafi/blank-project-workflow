
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Lock, Unlock } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";
import { toast } from "sonner";

interface CanvasLockToggleProps {
  assetId: string;
  canvasLocked: boolean;
}

const CanvasLockToggle = ({ assetId, canvasLocked }: CanvasLockToggleProps) => {
  const toggleAssetCanvasLock = useEditorStore(state => state.toggleAssetCanvasLock);
  const assets = useEditorStore(state => state.assets);
  
  // Handle canvas lock toggle
  const handleCanvasLockToggle = () => {
    toggleAssetCanvasLock(assetId);
    
    // Show toast notification
    const lockStatus = !canvasLocked;
    toast(lockStatus ? "Asset locked to canvas" : "Asset freed from canvas", {
      duration: 2000,
    });
  };
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Switch
          id="canvas-lock"
          checked={canvasLocked}
          onCheckedChange={handleCanvasLockToggle}
        />
        <Label htmlFor="canvas-lock" className="text-sm">
          {canvasLocked ? 'Locked to Canvas' : 'Free Positioning'}
        </Label>
      </div>
      {canvasLocked ? 
        <Lock className="h-4 w-4 text-orange-500" /> : 
        <Unlock className="h-4 w-4 text-green-500" />
      }
    </div>
  );
};

export default CanvasLockToggle;
