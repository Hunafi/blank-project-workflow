
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEditorStore } from "@/store/editorStore";
import Scene3D from "@/components/Scene3D";
import AssetBrowser from "@/components/AssetBrowser";
import TransformControls from "@/components/TransformControls";
import Timeline from "@/components/Timeline";
import AssetDropzone from "@/components/AssetDropzone";

const Editor = () => {
  const { toast } = useToast();
  const assets = useEditorStore(state => state.assets);
  const cameraKeyframes = useEditorStore(state => state.cameraKeyframes);
  
  const handleSaveScene = () => {
    // Prepare the scene data
    const sceneData = {
      projectId: `project-${Date.now()}`,
      assets: assets.map(asset => ({
        id: asset.id,
        url: asset.url,
        keyframes: asset.keyframes
      })),
      cameraKeyframes
    };
    
    // For demo purposes, we'll just log the data
    console.log("Scene saved:", sceneData);
    
    // In a real app, you would send this data to a server
    // or save it to localStorage
    localStorage.setItem('saved-scene', JSON.stringify(sceneData));
    
    toast({
      title: "Scene Saved",
      description: "Your scene has been saved successfully!"
    });
  };
  
  return (
    <div className="h-screen flex flex-col">
      <div className="border-b py-2 px-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">3D Asset Editor</h1>
        <Button onClick={handleSaveScene}>
          <Save className="h-4 w-4 mr-2" />
          Save & Implement
        </Button>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Sidebar */}
          <ResizablePanel defaultSize={20} minSize={15}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50}>
                <AssetBrowser />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <TransformControls />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Main Content */}
          <ResizablePanel defaultSize={60}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70}>
                {assets.length === 0 ? (
                  <AssetDropzone />
                ) : (
                  <Scene3D />
                )}
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30}>
                <Timeline />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Right Sidebar - For future extensions */}
          <ResizablePanel defaultSize={20}>
            <div className="h-full border rounded-md p-4">
              <h3 className="font-semibold mb-4">Help & Tips</h3>
              <div className="space-y-3 text-sm">
                <p>• Drag & drop .glb files onto the canvas</p>
                <p>• Use the transform tools to position, rotate, and scale your assets</p>
                <p>• Add keyframes at different points in the timeline</p>
                <p>• Play the animation to preview your work</p>
                <p>• Click "Save & Implement" when you're satisfied with your scene</p>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Editor;
