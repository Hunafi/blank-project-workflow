
import React from "react";

const Footer = () => {
  return (
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
  );
};

export default Footer;
