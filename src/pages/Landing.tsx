
import React, { useEffect, useState } from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import FactsSection from "@/components/landing/FactsSection";
import AboutSection from "@/components/landing/AboutSection";
import GallerySection from "@/components/landing/GallerySection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import AnimatedScene from "@/components/AnimatedScene";
import { useEditorStore } from "@/store/editorStore";

const Landing = () => {
  const [savedScene, setSavedScene] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Try to load saved scene from localStorage
    try {
      const sceneData = localStorage.getItem('saved-scene');
      console.log("Attempting to load scene from localStorage");
      
      if (sceneData) {
        try {
          const parsedScene = JSON.parse(sceneData);
          console.log("Loaded scene data:", parsedScene);
          
          // Quick validation check
          if (!parsedScene || typeof parsedScene !== 'object') {
            console.error("Invalid scene data format");
            setLoadError(true);
          } else {
            setSavedScene(parsedScene);
          }
        } catch (error) {
          console.error("Error parsing saved scene:", error);
          setLoadError(true);
        }
      } else {
        console.log("No saved scene found in localStorage");
      }
    } catch (e) {
      console.error("Error accessing localStorage:", e);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderAnimatedScene = () => {
    if (isLoading) {
      return (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-white animate-pulse">Loading animation...</div>
        </div>
      );
    }
    
    if (loadError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-white bg-red-500 bg-opacity-70 p-3 rounded-md">
            Failed to load animation data
          </div>
        </div>
      );
    }
    
    if (!savedScene) {
      return null;
    }
    
    return (
      <div className="absolute inset-0 pointer-events-none z-10">
        <AnimatedScene savedScene={savedScene} autoPlay={true} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-600 overflow-hidden">
      <Header />
      
      {/* Hero section with animated 3D scene */}
      <div className="relative">
        <Hero />
        
        {/* Overlay the 3D scene on top of the hero section */}
        {!isLoading && renderAnimatedScene()}
      </div>
      
      <FactsSection />
      <AboutSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Landing;
