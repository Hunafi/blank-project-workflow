
import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
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
  );
};

export default AboutSection;
