
import React from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import FactsSection from "@/components/landing/FactsSection";
import AboutSection from "@/components/landing/AboutSection";
import GallerySection from "@/components/landing/GallerySection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-600 overflow-hidden">
      <Header />
      <Hero />
      <FactsSection />
      <AboutSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Landing;
