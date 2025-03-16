import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Save, Lock, Flower, Flower2, ArrowRight, Layers, LogOut, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEditorStore } from "@/store/editorStore";
import Scene3D from "@/components/Scene3D";
import AssetBrowser from "@/components/AssetBrowser";
import TransformControls from "@/components/TransformControls";
import Timeline from "@/components/Timeline";
import AssetDropzone from "@/components/AssetDropzone";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import CanvasOverlay from "@/components/CanvasOverlay";
import AnimationPreview from "@/components/preview/AnimationPreview";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const Editor = () => {
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();
  const assets = useEditorStore(state => state.assets);
  const cameraKeyframes = useEditorStore(state => state.cameraKeyframes);
  const setPasswordDialogOpen = useEditorStore(state => state.setPasswordDialogOpen);
  const [showCanvas, setShowCanvas] = useState(true); // Set to true by default
  const [showPreview, setShowPreview] = useState(false);
  
  const handleSaveScene = () => {
    // Prepare the scene data
    const sceneData = {
      projectId: `project-${Date.now()}`,
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
    
    // Save it to localStorage
    try {
      localStorage.setItem('saved-scene', JSON.stringify(sceneData));
      
      toast.success("Scene Saved Successfully!", {
        description: "Your animated scene will now display on the landing page",
        duration: 5000,
      });
      
      uiToast({
        title: "Scene Saved",
        description: "Your scene has been saved successfully!"
      });
      
      // Ask if user wants to view the landing page
      setTimeout(() => {
        if (confirm("Would you like to view the landing page with your animation?")) {
          navigate('/landing');
        }
      }, 1000);
    } catch (error) {
      console.error("Error saving scene:", error);
      toast.error("Failed to save scene");
    }
  };

  const handleChangePassword = () => {
    setPasswordDialogOpen(true);
  };
  
  const handleExit = () => {
    navigate('/landing');
  };
  
  return (
    <div className="h-screen flex flex-col">
      <div className="border-b py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Flower2 className="h-6 w-6 text-yellow-500" />
          <h1 className="text-xl font-semibold">WaspWorld 3D Editor</h1>
        </div>
        <div className="flex space-x-2 items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowPreview(true)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button 
            variant={showCanvas ? "default" : "outline"} 
            size="sm" 
            onClick={() => setShowCanvas(!showCanvas)}
          >
            <Layers className="h-4 w-4 mr-2" />
            {showCanvas ? "Hide Canvas" : "Show Canvas"}
          </Button>
          <Link to="/landing">
            <Button variant="ghost" size="sm">View Landing Page</Button>
          </Link>
          <Button variant="outline" onClick={handleChangePassword}>
            <Lock className="h-4 w-4 mr-2" />
            Change Password
          </Button>
          <Button onClick={handleSaveScene}>
            <Save className="h-4 w-4 mr-2" />
            Save & Implement
          </Button>
          <Button variant="destructive" onClick={handleExit}>
            <LogOut className="h-4 w-4 mr-2" />
            Exit Editor
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
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
          
          <ResizablePanel defaultSize={60}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70}>
                <div className="relative h-full">
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-600">
                      <header className="py-6 px-8 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Flower2 className="h-10 w-10 text-yellow-200" />
                          <span className="text-2xl font-bold text-yellow-100">WaspWorld</span>
                        </div>
                      </header>

                      <section className="relative pt-20 pb-40 px-8 md:px-16 lg:px-24">
                        <div className="md:w-1/2">
                          <h1 className="text-7xl md:text-8xl font-bold text-yellow-200 leading-none mb-6">
                            Wasp
                          </h1>
                          <p className="text-xl text-yellow-50 max-w-lg mb-8">
                            We all know that wasps can sting repeatedly, but here are some facts about wasps you may not know
                          </p>
                        </div>

                        <div className="absolute top-40 right-20 transform rotate-12">
                          <img src="/public/lovable-uploads/a757fc8e-1b0d-49b9-9c80-8e1a36b7abc6.png" 
                               alt="Flower" 
                               className="w-60 h-60 object-contain" />
                        </div>
                        
                        <div className="absolute bottom-20 left-40 transform -rotate-6">
                          <Flower className="h-40 w-40 text-pink-400" />
                        </div>
                      </section>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 z-10">
                    {showCanvas && (
                      assets.length === 0 ? (
                        <AssetDropzone />
                      ) : (
                        <CanvasOverlay>
                          <Scene3D />
                        </CanvasOverlay>
                      )
                    )}
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30}>
                <Timeline />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={20}>
            <div className="h-full border rounded-md p-4">
              <h3 className="font-semibold mb-4">Help & Tips</h3>
              <div className="space-y-3 text-sm">
                <p>• Click "Show Canvas" to display the 3D canvas</p>
                <p>• Drag & drop .glb files onto the canvas</p>
                <p>• Use the transform tools to position objects</p>
                <p>• Click "Record Position" to add a keyframe</p>
                <p>• Click "Record Camera" to store camera position</p>
                <p>• Add keyframes at different points in the timeline</p>
                <p>• Click Play to preview the animation</p>
                <p>• Click "Save & Implement" to display on landing page</p>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      
      <AnimationPreview 
        isOpen={showPreview} 
        onClose={() => setShowPreview(false)} 
      />
      
      <ChangePasswordModal />
    </div>
  );
};

export default Editor;
