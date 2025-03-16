
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Flower, Flower2 } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-600 overflow-hidden">
      {/* Navigation */}
      <header className="py-6 px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Flower2 className="h-10 w-10 text-yellow-200" />
          <span className="text-2xl font-bold text-yellow-100">WaspWorld</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-yellow-100 hover:text-yellow-200 transition-colors">About</a>
          <a href="#" className="text-yellow-100 hover:text-yellow-200 transition-colors">Gallery</a>
          <a href="#" className="text-yellow-100 hover:text-yellow-200 transition-colors">Contact</a>
        </nav>
        <Link to="/">
          <Button variant="outline" className="bg-transparent border-yellow-200 text-yellow-100 hover:bg-yellow-200/10">
            Enter Editor
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-40 px-8 md:px-16 lg:px-24 flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="md:w-1/2 z-10">
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
          >
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold flex items-center gap-2">
              Learn more <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {/* Flower Decorations */}
        <div className="absolute top-40 right-20 transform rotate-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <img src="/public/lovable-uploads/a757fc8e-1b0d-49b9-9c80-8e1a36b7abc6.png" 
                 alt="Flower" 
                 className="w-60 h-60 object-contain" />
          </motion.div>
        </div>
        
        <div className="absolute bottom-20 left-40 transform -rotate-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Flower className="h-40 w-40 text-pink-400" />
          </motion.div>
        </div>
        
        <div className="absolute top-32 left-1/4 transform rotate-45">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Flower2 className="h-20 w-20 text-yellow-300" />
          </motion.div>
        </div>
      </section>
      
      {/* Facts Section */}
      <section className="px-8 md:px-16 lg:px-24 py-20 bg-green-600/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-bold text-yellow-200 mb-12">Fascinating Facts</h2>
          
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
      
      {/* Footer */}
      <footer className="py-8 px-8 md:px-16 lg:px-24 bg-green-700/30 text-yellow-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Flower2 className="h-8 w-8 text-yellow-200" />
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
