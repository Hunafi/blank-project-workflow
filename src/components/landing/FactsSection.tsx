
import React from "react";
import { motion } from "framer-motion";

const FactsSection = () => {
  return (
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
  );
};

export default FactsSection;
