
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEditorStore } from "@/store/editorStore";

const AssetDropzone = () => {
  const { toast } = useToast();
  const addAsset = useEditorStore(state => state.addAsset);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      if (!file.name.endsWith('.glb')) {
        toast({
          title: "Unsupported File",
          description: "Only .glb files are supported.",
          variant: "destructive"
        });
        return;
      }
      
      // Create a URL for the file
      const url = URL.createObjectURL(file);
      
      // Add the asset to the store
      addAsset({
        name: file.name,
        url,
        visible: true,
        selected: false,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        keyframes: [],
        canvasLocked: false // Add the missing property
      });
      
      toast({
        title: "Asset Added",
        description: `${file.name} has been added to the scene.`
      });
    });
  }, [addAsset, toast]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'model/gltf-binary': ['.glb']
    }
  });
  
  return (
    <div 
      {...getRootProps()} 
      className={`
        border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center
        cursor-pointer transition-colors duration-300 h-full
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-border'}
      `}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 text-muted-foreground mb-4" />
      <p className="text-center text-muted-foreground">
        {isDragActive
          ? "Drop your .glb files here"
          : "Drag & Drop your .glb files here or click to upload"}
      </p>
    </div>
  );
};

export default AssetDropzone;
