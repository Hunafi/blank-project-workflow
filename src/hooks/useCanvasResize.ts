
import { useCallback, useRef } from 'react';
import { useEditorStore } from "@/store/editorStore";
import { throttle } from '@/utils/throttle';

type HandlePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface InitialState {
  position: Position;
  size: Size;
  pointer: Position;
}

export const useCanvasResize = (
  setPosition: React.Dispatch<React.SetStateAction<Position>>,
  setSize: React.Dispatch<React.SetStateAction<Size>>,
  isRearranging: boolean,
  activeHandle: HandlePosition | null
) => {
  const initialState = useRef<InitialState>({
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 },
    pointer: { x: 0, y: 0 }
  });
  
  // Get state from store
  const selectedAssetId = useEditorStore(state => state.selectedAssetId);

  const handleResize = useCallback(throttle((e: MouseEvent) => {
    if (!activeHandle || !isRearranging || selectedAssetId) return;

    const dx = e.clientX - initialState.current.pointer.x;
    const dy = e.clientY - initialState.current.pointer.y;

    switch (activeHandle) {
      case 'top-left':
        setPosition({
          x: initialState.current.position.x + dx,
          y: initialState.current.position.y + dy
        });
        setSize({
          width: Math.max(200, initialState.current.size.width - dx),
          height: Math.max(200, initialState.current.size.height - dy)
        });
        break;
      case 'top-right':
        setPosition({
          x: initialState.current.position.x,
          y: initialState.current.position.y + dy
        });
        setSize({
          width: Math.max(200, initialState.current.size.width + dx),
          height: Math.max(200, initialState.current.size.height - dy)
        });
        break;
      case 'bottom-left':
        setPosition({
          x: initialState.current.position.x + dx,
          y: initialState.current.position.y
        });
        setSize({
          width: Math.max(200, initialState.current.size.width - dx),
          height: Math.max(200, initialState.current.size.height + dy)
        });
        break;
      case 'bottom-right':
        setSize({
          width: Math.max(200, initialState.current.size.width + dx),
          height: Math.max(200, initialState.current.size.height + dy)
        });
        break;
    }
  }, 16), [activeHandle, isRearranging, selectedAssetId, setPosition, setSize]); // 60fps throttle

  return {
    initialState,
    handleResize
  };
};
