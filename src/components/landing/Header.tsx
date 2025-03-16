
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Info, Image, Phone } from "lucide-react";

const Header = () => {
  return (
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
  );
};

export default Header;
