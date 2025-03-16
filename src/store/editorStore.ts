import { create } from 'zustand';
import * as THREE from 'three';
import { passwordService } from '@/services/passwordService';

// Keyframe type
export interface Keyframe {
  time: number;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
}

// Asset type
export interface Asset {
  id: string;
  name: string;
  url: string;
  visible: boolean;
  selected: boolean;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  keyframes: Keyframe[];
}

// Camera keyframe type
export interface CameraKeyframe {
  time: number;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}

// Editor state
interface EditorState {
  assets: Asset[];
  selectedAssetId: string | null;
  cameraKeyframes: CameraKeyframe[];
  currentTime: number;
  playing: boolean;
  transformMode: 'translate' | 'rotate' | 'scale';
  isPasswordProtected: boolean;
  isAuthenticated: boolean;
  isPasswordDialogOpen: boolean;
  
  // Actions
  addAsset: (asset: Omit<Asset, 'id'>) => void;
  removeAsset: (id: string) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  selectAsset: (id: string | null) => void;
  toggleAssetVisibility: (id: string) => void;
  addKeyframe: (assetId: string, keyframe: Keyframe) => void;
  removeKeyframe: (assetId: string, time: number) => void;
  updateKeyframe: (assetId: string, time: number, updates: Partial<Keyframe>) => void;
  addCameraKeyframe: (keyframe: CameraKeyframe) => void;
  removeCameraKeyframe: (time: number) => void;
  updateCameraKeyframe: (time: number, updates: Partial<CameraKeyframe>) => void;
  setCurrentTime: (time: number) => void;
  setPlaying: (playing: boolean) => void;
  setTransformMode: (mode: 'translate' | 'rotate' | 'scale') => void;
  authenticate: (password: string) => Promise<boolean>;
  setPasswordDialogOpen: (isOpen: boolean) => void;
  updatePassword: (newPassword: string) => Promise<boolean>;
}

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Create the store
export const useEditorStore = create<EditorState>((set, get) => ({
  assets: [],
  selectedAssetId: null,
  cameraKeyframes: [
    {
      time: 0,
      position: { x: 0, y: 2, z: 5 },
      rotation: { x: -0.1, y: 0, z: 0 }
    }
  ],
  currentTime: 0,
  playing: false,
  transformMode: 'translate',
  isPasswordProtected: true,
  isAuthenticated: false,
  isPasswordDialogOpen: false,
  
  addAsset: (asset) => set((state) => ({
    assets: [...state.assets, { ...asset, id: generateId() }]
  })),
  
  removeAsset: (id) => set((state) => ({
    assets: state.assets.filter(asset => asset.id !== id),
    selectedAssetId: state.selectedAssetId === id ? null : state.selectedAssetId
  })),
  
  updateAsset: (id, updates) => set((state) => ({
    assets: state.assets.map(asset => 
      asset.id === id ? { ...asset, ...updates } : asset
    )
  })),
  
  selectAsset: (id) => set({ selectedAssetId: id }),
  
  toggleAssetVisibility: (id) => set((state) => ({
    assets: state.assets.map(asset => 
      asset.id === id ? { ...asset, visible: !asset.visible } : asset
    )
  })),
  
  addKeyframe: (assetId, keyframe) => set((state) => ({
    assets: state.assets.map(asset => 
      asset.id === assetId 
        ? { 
            ...asset, 
            keyframes: [...asset.keyframes.filter(k => k.time !== keyframe.time), keyframe].sort((a, b) => a.time - b.time) 
          } 
        : asset
    )
  })),
  
  removeKeyframe: (assetId, time) => set((state) => ({
    assets: state.assets.map(asset => 
      asset.id === assetId 
        ? { 
            ...asset, 
            keyframes: asset.keyframes.filter(k => k.time !== time) 
          } 
        : asset
    )
  })),
  
  updateKeyframe: (assetId, time, updates) => set((state) => ({
    assets: state.assets.map(asset => 
      asset.id === assetId 
        ? { 
            ...asset, 
            keyframes: asset.keyframes.map(k => 
              k.time === time ? { ...k, ...updates } : k
            ) 
          } 
        : asset
    )
  })),
  
  addCameraKeyframe: (keyframe) => set((state) => ({
    cameraKeyframes: [...state.cameraKeyframes.filter(k => k.time !== keyframe.time), keyframe].sort((a, b) => a.time - b.time)
  })),
  
  removeCameraKeyframe: (time) => set((state) => ({
    cameraKeyframes: state.cameraKeyframes.filter(k => k.time !== time)
  })),
  
  updateCameraKeyframe: (time, updates) => set((state) => ({
    cameraKeyframes: state.cameraKeyframes.map(k => 
      k.time === time ? { ...k, ...updates } : k
    )
  })),
  
  setCurrentTime: (time) => set({ currentTime: time }),
  
  setPlaying: (playing) => set({ playing }),
  
  setTransformMode: (mode) => set({ transformMode: mode }),
  
  authenticate: async (password) => {
    const isValid = await passwordService.verifyPassword(password);
    
    if (isValid) {
      set({ isAuthenticated: true });
    }
    
    return isValid;
  },
  
  setPasswordDialogOpen: (isOpen) => set({ isPasswordDialogOpen: isOpen }),
  
  updatePassword: async (newPassword) => {
    const success = await passwordService.updatePassword(newPassword);
    return success;
  }
}));
