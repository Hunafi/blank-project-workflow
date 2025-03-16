
import { useState } from 'react';
import { toast } from "sonner";
import { useEditorStore } from "@/store/editorStore";

type HandlePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface CanvasInteractionState {
  isDragging: boolean;
  activeHandle: HandlePosition | null;
  isVisible: boolean;
  isRearranging: boolean;
}

export const useCanvasInteraction = (): [
  CanvasInteractionState,
  {
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
    setActiveHandle: React.Dispatch<React.SetStateAction<HandlePosition | null>>;
    toggleCanvasVisibility: () => void;
    toggleRearrangingMode: () => void;
  }
] => {
  const [isDragging, setIsDragging] = useState(false);
  const [activeHandle, setActiveHandle] = useState<HandlePosition | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRearranging, setIsRearranging] = useState(true);
  
  // Get state from store
  const selectedAssetId = useEditorStore(state => state.selectedAssetId);

  const toggleCanvasVisibility = () => {
    setIsVisible(prev => !prev);
  };

  const toggleRearrangingMode = () => {
    if (selectedAssetId) {
      toast.warning("Please deselect asset before unlocking canvas", {
        duration: 3000,
      });
      return;
    }
    setIsRearranging(prev => !prev);
    toast.success(isRearranging ? "Canvas locked" : "Canvas unlocked", {
      duration: 2000,
    });
  };

  return [
    { isDragging, activeHandle, isVisible, isRearranging },
    { setIsDragging, setActiveHandle, toggleCanvasVisibility, toggleRearrangingMode }
  ];
};
