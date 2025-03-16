
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GallerySection = () => {
  return (
    <section id="gallery" className="px-8 md:px-16 lg:px-24 py-20 bg-green-600/40">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl font-bold text-yellow-200 mb-12 text-left">Gallery</h2>
        <p className="text-xl text-yellow-50 max-w-2xl text-left mb-10">
          Explore our 3D wasp models and animations created with our editor.
        </p>
        <div className="flex justify-start">
          <Link to="/editor">
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold">
              Try the Editor Yourself
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
