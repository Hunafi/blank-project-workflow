
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Info, Image, Phone } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-600 overflow-hidden">
      {/* Navigation */}
      <header className="py-6 px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-yellow-100">WaspWorld</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-yellow-100 hover:text-yellow-200 transition-colors flex items-center gap-1">
            <Info className="h-4 w-4" />
            About
          </a>
          <a href="#gallery" className="text-yellow-100 hover:text-yellow-200 transition-colors flex items-center gap-1">
            <Image className="h-4 w-4" />
            Gallery
          </a>
          <a href="#contact" className="text-yellow-100 hover:text-yellow-200 transition-colors flex items-center gap-1">
            <Phone className="h-4 w-4" />
            Contact
          </a>
        </nav>
        <Link to="/editor">
          <Button variant="outline" className="bg-transparent border-yellow-200 text-yellow-100 hover:bg-yellow-200/10">
            Enter Editor
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-20 pb-40 px-8 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content - Text aligned left */}
          <div className="md:w-1/2 z-10 text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-7xl md:text-8xl font-bold text-yellow-200 leading-none mb-6"
            >
              Wasp
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-yellow-50 max-w-lg mb-8"
            >
              We all know that wasps can sting repeatedly, but here are some facts about wasps you may not know
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-left"
            >
              <a href="#facts">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold flex items-center gap-2">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right Content - Image placeholder */}
          <div className="md:w-1/2 z-10 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="bg-green-600/50 rounded-lg p-4 flex items-center justify-center"
            >
              <div className="w-full h-80 bg-green-700/40 rounded-lg flex items-center justify-center">
                <Image className="h-20 w-20 text-yellow-200 opacity-50" />
                <p className="text-yellow-100 absolute">Image coming soon</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Facts Section */}
      <section id="facts" className="px-8 md:px-16 lg:px-24 py-20 bg-green-600/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-bold text-yellow-200 mb-12 text-left">Fascinating Facts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-green-700/40 p-8 rounded-2xl backdrop-blur-sm border border-green-600"
            >
              <div className="text-7xl font-bold text-yellow-200 mb-4">01</div>
              <h3 className="text-2xl font-semibold text-yellow-100 mb-3">Pollinators</h3>
              <p className="text-yellow-50">Wasps are important pollinators and help control pest populations in gardens and farms.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-green-700/40 p-8 rounded-2xl backdrop-blur-sm border border-green-600"
            >
              <div className="text-7xl font-bold text-yellow-200 mb-4">02</div>
              <h3 className="text-2xl font-semibold text-yellow-100 mb-3">Multiple Stings</h3>
              <p className="text-yellow-50">Most wasps are capable of stinging numerous times because their stinger is not barbed.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-green-700/40 p-8 rounded-2xl backdrop-blur-sm border border-green-600"
            >
              <div className="text-7xl font-bold text-yellow-200 mb-4">03</div>
              <h3 className="text-2xl font-semibold text-yellow-100 mb-3">Recovery Time</h3>
              <p className="text-yellow-50">Though wasp stings hurt, symptoms normally improve after a few hours with proper care.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="px-8 md:px-16 lg:px-24 py-20 bg-green-700/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-bold text-yellow-200 mb-12 text-left">About Wasps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-left"
            >
              <p className="text-lg text-yellow-50 mb-6">
                Wasps are insects of the order Hymenoptera, which also includes bees and ants. With over 30,000 identified species, wasps come in a variety of sizes and colors, but most feature yellow or orange and black stripes to warn potential predators.
              </p>
              <p className="text-lg text-yellow-50">
                Unlike bees, wasps can sting multiple times because their stinger is not barbed and remains intact after use. Most wasp species are parasitic and non-stinging, playing vital roles in ecosystems as pollinators and natural pest controllers.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-green-600/30 p-6 rounded-xl backdrop-blur-sm"
            >
              <h3 className="text-2xl font-semibold text-yellow-200 mb-4 text-left">Key Characteristics</h3>
              <ul className="list-disc list-inside space-y-2 text-yellow-50 text-left">
                <li>Thin waist connecting thorax and abdomen</li>
                <li>Two pairs of wings</li>
                <li>Smooth stinger that can be used repeatedly</li>
                <li>Some species build nests from paper-like material</li>
                <li>Most are predatory or parasitic</li>
                <li>Social wasps live in colonies with a queen</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
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
      
      {/* Contact Section */}
      <section id="contact" className="px-8 md:px-16 lg:px-24 py-20 bg-green-700/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-bold text-yellow-200 mb-12 text-left">Contact Us</h2>
          <div className="flex flex-col items-start">
            <p className="text-xl text-yellow-50 max-w-2xl text-left mb-8">
              Have questions about wasps or want to learn more? Reach out to our team!
            </p>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-8 md:px-16 lg:px-24 bg-green-700/30 text-yellow-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="text-xl font-bold text-yellow-200">WaspWorld</span>
          </div>
          <div className="text-sm text-yellow-100/70">
            © 2023 WaspWorld. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
