
import { Eye, EyeOff, Trash } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const AssetBrowser = () => {
  const assets = useEditorStore(state => state.assets);
  const selectedAssetId = useEditorStore(state => state.selectedAssetId);
  const selectAsset = useEditorStore(state => state.selectAsset);
  const toggleAssetVisibility = useEditorStore(state => state.toggleAssetVisibility);
  const removeAsset = useEditorStore(state => state.removeAsset);
  
  return (
    <div className="border rounded-md h-full flex flex-col">
      <div className="p-3 border-b">
        <h3 className="font-semibold">Assets</h3>
      </div>
      {assets.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-sm text-muted-foreground text-center">
            No assets uploaded yet. Drag and drop .glb files to add assets.
          </p>
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {assets.map(asset => (
              <div
                key={asset.id}
                className={`
                  flex items-center justify-between p-2 rounded-md cursor-pointer
                  ${selectedAssetId === asset.id ? 'bg-accent' : 'hover:bg-accent/50'}
                `}
                onClick={() => selectAsset(asset.id)}
              >
                <span className="text-sm truncate flex-1">{asset.name}</span>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAssetVisibility(asset.id);
                    }}
                  >
                    {asset.visible ? 
                      <Eye className="h-4 w-4" /> :
                      <EyeOff className="h-4 w-4" />
                    }
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAsset(asset.id);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default AssetBrowser;
