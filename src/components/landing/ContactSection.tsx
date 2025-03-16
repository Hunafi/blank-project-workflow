
import React from "react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
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
  );
};

export default ContactSection;
