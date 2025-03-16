
import React, { useState, useEffect } from "react";
import { useEditorStore } from "@/store/editorStore";
import AnimatedScene from "@/components/AnimatedScene";
import { Button } from "@/components/ui/button";
import { X, Eye } from "lucide-react";

interface AnimationPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnimationPreview = ({ isOpen, onClose }: AnimationPreviewProps) => {
  const [previewScene, setPreviewScene] = useState<any>(null);
  const assets = useEditorStore(state => state.assets);
  const cameraKeyframes = useEditorStore(state => state.cameraKeyframes);
  
  useEffect(() => {
    if (isOpen) {
      // Prepare the scene data in the same format as the saved scene
      const sceneData = {
        assets: assets.map(asset => ({
          id: asset.id,
          url: asset.url,
          keyframes: asset.keyframes,
          position: asset.position,
          rotation: asset.rotation,
          scale: asset.scale
        })),
        cameraKeyframes
      };
      
      setPreviewScene(sceneData);
    }
  }, [isOpen, assets, cameraKeyframes]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full max-w-7xl max-h-[80vh] bg-gradient-to-b from-green-500 to-green-600 rounded-lg overflow-hidden">
        {/* Close button */}
        <Button 
          onClick={onClose} 
          variant="outline" 
          size="icon" 
          className="absolute top-4 right-4 z-10 bg-white/90"
        >
          <X className="h-4 w-4" />
        </Button>
        
        {/* Preview label */}
        <div className="absolute top-4 left-4 z-10 bg-black/50 px-3 py-1 rounded-full flex items-center">
          <Eye className="h-4 w-4 text-white mr-2" />
          <span className="text-white text-sm font-medium">Preview Mode</span>
        </div>
        
        {/* Landing page content placeholder */}
        <div className="relative min-h-screen z-20">
          <header className="py-6 px-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-yellow-200" />
              <span className="text-2xl font-bold text-yellow-100">WaspWorld</span>
            </div>
            <div className="flex space-x-4">
              <div className="w-16 h-6 bg-white/20 rounded-full"></div>
              <div className="w-16 h-6 bg-white/20 rounded-full"></div>
              <div className="w-16 h-6 bg-white/20 rounded-full"></div>
            </div>
          </header>
          
          <section className="pt-20 pb-40 px-8 md:px-16">
            <div className="md:w-1/2">
              <div className="h-24 w-3/4 bg-yellow-200/80 rounded-lg mb-6"></div>
              <div className="h-32 w-full bg-yellow-50/40 rounded-lg mb-8"></div>
              <div className="h-12 w-40 bg-yellow-300/80 rounded-full"></div>
            </div>
          </section>
        </div>
        
        {/* 3D Scene overlay */}
        {previewScene && (
          <div className="absolute inset-0 pointer-events-none z-10">
            <AnimatedScene savedScene={previewScene} autoPlay={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimationPreview;
