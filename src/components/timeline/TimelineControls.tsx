
import { Play, Pause, Key } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimelineControlsProps {
  playing: boolean;
  selectedAssetId: string | null;
  setPlaying: (playing: boolean) => void;
  handleAddKeyframe: () => void;
  handleAddCameraKeyframe: () => void;
}

const TimelineControls = ({
  playing,
  selectedAssetId,
  setPlaying,
  handleAddKeyframe,
  handleAddCameraKeyframe
}: TimelineControlsProps) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleAddKeyframe}
        disabled={!selectedAssetId}
      >
        <Key className="h-4 w-4 mr-1" />
        Add Asset Keyframe
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleAddCameraKeyframe}
      >
        <Key className="h-4 w-4 mr-1" />
        Add Camera Keyframe
      </Button>
      <Button
        variant={playing ? "default" : "outline"}
        size="sm"
        onClick={() => setPlaying(!playing)}
      >
        {playing ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default TimelineControls;
