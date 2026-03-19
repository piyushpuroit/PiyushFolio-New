import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Menu, X, Moon, Sun } from 'lucide-react';

const navLinks = [
  { name: 'Home', to: 'hero' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Experience', to: 'experience' },
  { name: 'Projects', to: 'projects' },
  { name: 'Contact', to: 'contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Check applied theme
    if (document.documentElement.classList.contains('light')) {
      setIsLight(true);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove('light');
      setIsLight(false);
    } else {
      document.documentElement.classList.add('light');
      setIsLight(true);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/80 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link
          to="hero"
          smooth={true}
          duration={500}
          className="relative text-2xl md:text-3xl font-black font-sans tracking-tighter cursor-pointer flex items-center group"
        >
          {/* Animated background glow on hover */}
          <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-[#00f2fe]/20 to-[#4facfe]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative flex items-baseline">
            <span className="text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00f2fe] group-hover:to-[#4facfe] transition-all duration-700">
              Piyush
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#4facfe] group-hover:text-white transition-all duration-700">
              Folio
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
             <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              spy={true}
              activeClass="text-accent-start"
              className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm font-medium tracking-wide uppercase"
            >
              {link.name}
            </Link>
          ))}
          <button 
            onClick={toggleTheme} 
            className="text-gray-400 hover:text-white transition-colors cursor-pointer bg-white/5 p-2 rounded-full hover:bg-white/10 no-invert flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {isLight ? <Moon size={20} className="text-[#141414]" /> : <Sun size={20} className="text-yellow-400" />}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            onClick={toggleTheme} 
            className="text-gray-400 hover:text-white transition-colors cursor-pointer bg-white/5 p-2 rounded-full no-invert"
            aria-label="Toggle Theme"
          >
            {isLight ? <Moon size={20} className="text-[#141414]" /> : <Sun size={20} className="text-yellow-400" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-accent-start">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden absolute top-20 left-4 right-4 bg-primary/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-6 z-40 overflow-hidden"
          >
            {/* Inner aesthetic glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-start/10 rounded-full blur-[40px] -z-10"></div>
            <div className="flex flex-col space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-accent-start text-lg font-bold cursor-pointer transition-colors border-b border-white/5 pb-2 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

