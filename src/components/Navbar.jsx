import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, FileDown } from 'lucide-react';
import { getResume } from '../api/portfolioService';

const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Skills', id: 'skills' },
  { name: 'Experience', id: 'experience' },
  { name: 'Education', id: 'education' },
  { name: 'Certifications', id: 'certifications' },
  { name: 'Contact', id: 'contact' },
];

const Navbar = ({ activeSection, setActiveSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Check applied theme
    if (document.documentElement.classList.contains('light')) {
      setIsLight(true);
    }

    const loadResume = async () => {
      try {
        const data = await getResume();
        if (data && data.downloadUrl) {
          setResumeUrl(data.downloadUrl);
        }
      } catch (err) {
        setResumeUrl('#');
      }
    };
    loadResume();
    
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

  const handleNavClick = (link) => {
    setIsOpen(false);
    if (link.id === 'resume') {
      if (resumeUrl && resumeUrl !== '#') {
        window.open(resumeUrl, '_blank');
      } else {
        alert('Resume link is currently unavailable.');
      }
      return;
    }
    setActiveSection(link.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary/80 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <button
          onClick={() => {
            setActiveSection('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="relative text-2xl md:text-3xl font-black font-sans tracking-tighter flex items-center group bg-transparent border-0 outline-none"
        >
          <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-[#00f2fe]/20 to-[#4facfe]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative flex items-baseline">
            <span className="text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00f2fe] group-hover:to-[#4facfe] transition-all duration-700">
              Piyush
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#4facfe] group-hover:text-white transition-all duration-700">
              Folio
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-5">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              className={`transition-colors cursor-pointer text-[10px] lg:text-[11px] xl:text-xs font-semibold tracking-wide uppercase bg-transparent border-0 outline-none pb-1 relative ${
                activeSection === link.id
                  ? 'text-accent-start'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 gradient-bg rounded"
                />
              )}
            </button>
          ))}
          
          {/* Resume Quick Access Button */}
          {resumeUrl && resumeUrl !== '#' && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-accent-start/50 text-xs font-semibold tracking-wide uppercase hover:bg-white/10 transition-all text-white"
            >
              <FileDown size={14} className="text-accent-start" /> Resume
            </a>
          )}

          <button 
            onClick={toggleTheme} 
            className="text-gray-400 hover:text-white transition-colors cursor-pointer bg-white/5 p-2 rounded-full hover:bg-white/10 no-invert flex items-center justify-center border-0 outline-none"
            aria-label="Toggle Theme"
          >
            {isLight ? <Moon size={18} className="text-[#141414]" /> : <Sun size={18} className="text-yellow-400" />}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            onClick={toggleTheme} 
            className="text-gray-400 hover:text-white transition-colors cursor-pointer bg-white/5 p-2 rounded-full no-invert border-0 outline-none"
            aria-label="Toggle Theme"
          >
            {isLight ? <Moon size={18} className="text-[#141414]" /> : <Sun size={18} className="text-yellow-400" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-accent-start bg-transparent border-0 outline-none">
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
            className="md:hidden absolute top-20 left-4 right-4 bg-primary/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-6 z-40 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-start/10 rounded-full blur-[40px] -z-10"></div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`text-left text-base font-bold cursor-pointer transition-colors border-b border-white/5 pb-2 last:border-0 bg-transparent border-0 outline-none ${
                    activeSection === link.id ? 'text-accent-start' : 'text-white/80 hover:text-accent-start'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              
              {resumeUrl && resumeUrl !== '#' && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-accent-start hover:bg-accent-end text-sm font-bold text-white transition-colors"
                >
                  <FileDown size={16} /> Download Resume
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
