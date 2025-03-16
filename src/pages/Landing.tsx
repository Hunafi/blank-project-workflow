
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

  useEffect(() => {
    // Try to load saved scene from localStorage
    const sceneData = localStorage.getItem('saved-scene');
    if (sceneData) {
      try {
        const parsedScene = JSON.parse(sceneData);
        setSavedScene(parsedScene);
      } catch (error) {
        console.error("Error parsing saved scene:", error);
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-600 overflow-hidden">
      <Header />
      
      {/* Hero section with animated 3D scene */}
      <div className="relative">
        <Hero />
        
        {/* Overlay the 3D scene on top of the hero section */}
        {!isLoading && (
          <div className="absolute inset-0 pointer-events-none">
            <AnimatedScene savedScene={savedScene} autoPlay={true} />
          </div>
        )}
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
