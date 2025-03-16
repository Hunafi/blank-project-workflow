
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Image } from "lucide-react";

const Hero = () => {
  return (
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
  );
};

export default Hero;
