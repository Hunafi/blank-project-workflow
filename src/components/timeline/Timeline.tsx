
import { useState, useEffect } from "react";
import { useEditorStore } from "@/store/editorStore";
import TimelineControls from "./TimelineControls";
import TimelineScrubber from "./TimelineScrubber";
import TimelineInfo from "./TimelineInfo";
import { toast } from "sonner";

const Timeline = () => {
  const [duration, setDuration] = useState(5000); // 5 seconds default duration
  
  const assets = useEditorStore(state => state.assets);
  const selectedAssetId = useEditorStore(state => state.selectedAssetId);
  const currentTime = useEditorStore(state => state.currentTime);
  const playing = useEditorStore(state => state.playing);
  const setCurrentTime = useEditorStore(state => state.setCurrentTime);
  const setPlaying = useEditorStore(state => state.setPlaying);
  const addKeyframe = useEditorStore(state => state.addKeyframe);
  const removeKeyframe = useEditorStore(state => state.removeKeyframe);
  const cameraKeyframes = useEditorStore(state => state.cameraKeyframes);
  const addCameraKeyframe = useEditorStore(state => state.addCameraKeyframe);
  const removeCameraKeyframe = useEditorStore(state => state.removeCameraKeyframe);
  
  const selectedAsset = assets.find(asset => asset.id === selectedAssetId);
  
  const handleAddKeyframe = () => {
    if (!selectedAssetId || !selectedAsset) {
      toast("Please select an asset first");
      return;
    }
    
    const { position, rotation, scale } = selectedAsset;
    
    // Check if keyframe at this time already exists
    const existingKeyframeIndex = selectedAsset.keyframes.findIndex(
      keyframe => keyframe.time === currentTime
    );
    
    if (existingKeyframeIndex >= 0) {
      // Update existing keyframe
      toast("Updated existing keyframe");
    } else {
      toast(`Keyframe added at ${(currentTime/1000).toFixed(1)}s`);
    }
    
    addKeyframe(selectedAssetId, {
      time: currentTime,
      position: { ...position }, // Clone to ensure we get current values
      rotation: { ...rotation },
      scale: { ...scale }
    });
  };
  
  const handleAddCameraKeyframe = () => {
    const { camera } = useEditorStore.getState();
    if (camera) {
      addCameraKeyframe({
        time: currentTime,
        position: { 
          x: camera.position.x, 
          y: camera.position.y, 
          z: camera.position.z 
        },
        rotation: { 
          x: camera.rotation.x, 
          y: camera.rotation.y, 
          z: camera.rotation.z 
        }
      });
      toast(`Camera keyframe added at ${(currentTime/1000).toFixed(1)}s`);
    } else {
      toast.error("Cannot add camera keyframe");
    }
  };
  
  // Reset button handler
  const handleReset = () => {
    setPlaying(false);
    setCurrentTime(0);
    toast("Animation reset to start");
  };
  
  useEffect(() => {
    if (!playing) return;
    
    const interval = setInterval(() => {
      const newTime = currentTime + 16.67; // Roughly 60fps
      
      if (newTime >= duration) {
        setPlaying(false);
        setCurrentTime(0);
        toast("Animation complete");
      } else {
        setCurrentTime(newTime);
      }
    }, 16.67);
    
    return () => clearInterval(interval);
  }, [playing, duration, currentTime, setCurrentTime, setPlaying]);
  
  return (
    <div className="h-full border rounded-md flex flex-col">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="font-semibold">Timeline</h3>
        <TimelineControls 
          playing={playing}
          selectedAssetId={selectedAssetId}
          setPlaying={setPlaying}
          handleAddKeyframe={handleAddKeyframe}
          handleAddCameraKeyframe={handleAddCameraKeyframe}
          handleReset={handleReset}
        />
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <TimelineScrubber
          duration={duration}
          currentTime={currentTime}
          selectedAsset={selectedAsset}
          cameraKeyframes={cameraKeyframes}
          setCurrentTime={setCurrentTime}
          removeKeyframe={removeKeyframe}
          removeCameraKeyframe={removeCameraKeyframe}
        />
        
        <div className="mt-4">
          <TimelineInfo
            currentTime={currentTime}
            duration={duration}
            setDuration={setDuration}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
