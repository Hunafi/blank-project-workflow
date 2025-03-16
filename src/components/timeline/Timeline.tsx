
import { useState, useEffect } from "react";
import { useEditorStore } from "@/store/editorStore";
import TimelineControls from "./TimelineControls";
import TimelineScrubber from "./TimelineScrubber";
import TimelineInfo from "./TimelineInfo";

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
    if (!selectedAssetId || !selectedAsset) return;
    
    const { position, rotation, scale } = selectedAsset;
    
    addKeyframe(selectedAssetId, {
      time: currentTime,
      position,
      rotation,
      scale
    });
  };
  
  const handleAddCameraKeyframe = () => {
    // Find the current camera position/rotation from the scene
    // For simplicity, we'll use default values
    addCameraKeyframe({
      time: currentTime,
      position: { x: 0, y: 2, z: 5 },
      rotation: { x: -0.1, y: 0, z: 0 }
    });
  };
  
  useEffect(() => {
    if (!playing) return;
    
    const interval = setInterval(() => {
      const newTime = currentTime + 16.67; // Roughly 60fps
      
      if (newTime >= duration) {
        setPlaying(false);
        setCurrentTime(0);
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
