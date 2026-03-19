import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative pt-12 pb-8 border-t border-white/5 overflow-hidden">
      {/* Top glowing divider line effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-accent-start/50 to-transparent"></div>
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold font-tech gradient-text mb-1">&lt;Piyush /&gt;</h2>
            <p className="text-sm text-gray-500">© 2026 Piyush Purohit. All rights reserved.</p>
          </div>
          
          <div className="flex items-center text-gray-400 text-sm">
            <span>Built with React and passion for engineering.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
