
import { Play, Pause, Key, RotateCcw, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TimelineControlsProps {
  playing: boolean;
  selectedAssetId: string | null;
  setPlaying: (playing: boolean) => void;
  handleAddKeyframe: () => void;
  handleAddCameraKeyframe: () => void;
  handleReset: () => void;
}

const TimelineControls = ({
  playing,
  selectedAssetId,
  setPlaying,
  handleAddKeyframe,
  handleAddCameraKeyframe,
  handleReset
}: TimelineControlsProps) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleAddKeyframe}
        disabled={!selectedAssetId}
        title="Record current asset position, rotation and scale"
      >
        <Key className="h-4 w-4 mr-1" />
        Record Position
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleAddCameraKeyframe}
        title="Record current camera position and rotation"
      >
        <Camera className="h-4 w-4 mr-1" />
        Record Camera
      </Button>
      <Button
        variant={playing ? "default" : "outline"}
        size="sm"
        onClick={() => {
          setPlaying(!playing);
          if (!playing) {
            toast.info("Playing animation...");
          }
        }}
      >
        {playing ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
      <Button 
        variant="outline"
        size="sm"
        onClick={handleReset}
        title="Reset animation"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TimelineControls;
