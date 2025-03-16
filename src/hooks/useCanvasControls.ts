
import { useState, useRef, useEffect, useCallback } from 'react';
import { useEditorStore } from "@/store/editorStore";
import { toast } from "sonner";

type HandlePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface CanvasControlsState {
  position: Position;
  size: Size;
  isDragging: boolean;
  activeHandle: HandlePosition | null;
  isVisible: boolean;
  isRearranging: boolean;
}

interface CanvasControlsActions {
  handleMouseDown: (e: React.MouseEvent, handle?: HandlePosition) => void;
  handleResize: (e: MouseEvent) => void;
  handleMove: (e: MouseEvent) => void;
  handleMouseUp: () => void;
  toggleCanvasVisibility: () => void;
  toggleRearrangingMode: () => void;
}

// Throttle function to limit function calls
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const useCanvasControls = (): [CanvasControlsState, CanvasControlsActions] => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 600, height: 400 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeHandle, setActiveHandle] = useState<HandlePosition | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRearranging, setIsRearranging] = useState(true);
  
  const initialPosition = useRef({ x: 0, y: 0 });
  const initialSize = useRef({ width: 0, height: 0 });
  const initialPointer = useRef({ x: 0, y: 0 });
  
  // Get state from store
  const selectedAssetId = useEditorStore(state => state.selectedAssetId);
  
  // Only show toast once when asset is selected
  useEffect(() => {
    if (selectedAssetId && isRearranging) {
      toast.info("Canvas locked while editing asset", {
        duration: 2000,
      });
    }
  }, [selectedAssetId, isRearranging]);

  const handleMouseDown = useCallback((e: React.MouseEvent, handle?: HandlePosition) => {
    // Don't allow canvas manipulation if we're working with an asset
    if (!isRearranging || selectedAssetId) return;
    
    e.stopPropagation();
    
    if (handle) {
      setActiveHandle(handle);
    } else {
      setIsDragging(true);
    }
    
    initialPosition.current = { x: position.x, y: position.y };
    initialSize.current = { width: size.width, height: size.height };
    initialPointer.current = { x: e.clientX, y: e.clientY };
  }, [isRearranging, selectedAssetId, position, size]);

  const handleResize = useCallback(throttle((e: MouseEvent) => {
    if (!activeHandle || !isRearranging || selectedAssetId) return;

    const dx = e.clientX - initialPointer.current.x;
    const dy = e.clientY - initialPointer.current.y;

    switch (activeHandle) {
      case 'top-left':
        setPosition({
          x: initialPosition.current.x + dx,
          y: initialPosition.current.y + dy
        });
        setSize({
          width: Math.max(200, initialSize.current.width - dx),
          height: Math.max(200, initialSize.current.height - dy)
        });
        break;
      case 'top-right':
        setPosition({
          x: initialPosition.current.x,
          y: initialPosition.current.y + dy
        });
        setSize({
          width: Math.max(200, initialSize.current.width + dx),
          height: Math.max(200, initialSize.current.height - dy)
        });
        break;
      case 'bottom-left':
        setPosition({
          x: initialPosition.current.x + dx,
          y: initialPosition.current.y
        });
        setSize({
          width: Math.max(200, initialSize.current.width - dx),
          height: Math.max(200, initialSize.current.height + dy)
        });
        break;
      case 'bottom-right':
        setSize({
          width: Math.max(200, initialSize.current.width + dx),
          height: Math.max(200, initialSize.current.height + dy)
        });
        break;
    }
  }, 16), [activeHandle, isRearranging, selectedAssetId]); // 60fps throttle

  const handleMove = useCallback(throttle((e: MouseEvent) => {
    if (!isDragging || !isRearranging || selectedAssetId) return;
    
    const dx = e.clientX - initialPointer.current.x;
    const dy = e.clientY - initialPointer.current.y;
    
    setPosition({
      x: initialPosition.current.x + dx,
      y: initialPosition.current.y + dy
    });
  }, 16), [isDragging, isRearranging, selectedAssetId]); // 60fps throttle

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setActiveHandle(null);
  }, []);

  // Cleanup function for mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e);
      } else if (activeHandle) {
        handleResize(e);
      }
    };

    // Add mouse event listeners to window
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, activeHandle, handleMove, handleResize, handleMouseUp]);

  const toggleCanvasVisibility = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  const toggleRearrangingMode = useCallback(() => {
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
  }, [selectedAssetId, isRearranging]);

  return [
    { position, size, isDragging, activeHandle, isVisible, isRearranging },
    { 
      handleMouseDown, 
      handleResize, 
      handleMove, 
      handleMouseUp, 
      toggleCanvasVisibility, 
      toggleRearrangingMode 
    }
  ];
};
