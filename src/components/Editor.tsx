
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Save, Lock, Flower, Flower2, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEditorStore } from "@/store/editorStore";
import Scene3D from "@/components/Scene3D";
import AssetBrowser from "@/components/AssetBrowser";
import TransformControls from "@/components/TransformControls";
import Timeline from "@/components/Timeline";
import AssetDropzone from "@/components/AssetDropzone";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Editor = () => {
  const { toast } = useToast();
  const assets = useEditorStore(state => state.assets);
  const cameraKeyframes = useEditorStore(state => state.cameraKeyframes);
  const setPasswordDialogOpen = useEditorStore(state => state.setPasswordDialogOpen);
  
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

  const handleChangePassword = () => {
    setPasswordDialogOpen(true);
  };
  
  return (
    <div className="h-screen flex flex-col">
      <div className="border-b py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Flower2 className="h-6 w-6 text-yellow-500" />
          <h1 className="text-xl font-semibold">WaspWorld 3D Editor</h1>
        </div>
        <div className="flex space-x-2 items-center">
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
        </div>
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
                <div className="relative h-full">
                  {/* Landing Page UI Backdrop */}
                  <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
                    <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-600">
                      {/* Simplified version of landing page UI */}
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

                        {/* Simplified flower decorations */}
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
                  
                  {/* 3D Scene or Upload Prompt */}
                  <div className="absolute inset-0 z-10">
                    {assets.length === 0 ? (
                      <AssetDropzone />
                    ) : (
                      <Scene3D />
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
          
          {/* Right Sidebar */}
          <ResizablePanel defaultSize={20}>
            <div className="h-full border rounded-md p-4">
              <h3 className="font-semibold mb-4">Help & Tips</h3>
              <div className="space-y-3 text-sm">
                <p>• Drag & drop .glb files onto the canvas</p>
                <p>• Use the transform tools to position, rotate, and scale your assets</p>
                <p>• Add keyframes at different points in the timeline</p>
                <p>• Play the animation to preview your work</p>
                <p>• Click "Save & Implement" when you're satisfied with your scene</p>
                <p>• Use "Change Password" to update your editor access password</p>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      
      {/* Password Change Modal */}
      <ChangePasswordModal />
    </div>
  );
};

export default Editor;
