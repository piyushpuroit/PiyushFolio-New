import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, Mail, ArrowRight, Code } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { getResume } from '../api/portfolioService';

const Hero = ({ setActiveSection }) => {
  const [resumeUrl, setResumeUrl] = useState('/Piyush_Purohit_Resume.pdf');

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResume();
        if (data && data.downloadUrl) {
          setResumeUrl(data.downloadUrl);
        }
      } catch (err) {
        console.error('Error fetching resume url:', err);
      }
    };
    fetchResume();
  }, []);
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 md:left-32 text-accent-start opacity-20 hidden md:block"
      >
        <Code size={120} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-10 md:right-32 text-accent-end opacity-20 hidden md:block"
      >
        <div className="w-32 h-32 rounded-full border-4 border-accent-end border-dashed"></div>
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 z-10 text-center md:text-left flex flex-col md:flex-row items-center">

        <div className="w-full md:w-3/5 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Availability Badge */}
            <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 mb-4 md:mb-6 rounded-full border border-00f2fe/30 bg-00f2fe/10 backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.2)]">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-00f2fe opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f2fe]"></span>
              </span>
              <span className="text-[10px] md:text-xs font-medium text-white tracking-wide">Available for new opportunities</span>
            </div>
            
            <h2 className="text-lg md:text-2xl font-tech text-gray-400 mb-1 md:mb-2"></h2>
            <h1 className="text-4xl md:text-7xl font-bold font-sans text-white mb-2 md:mb-4 tracking-tight">
              Piyush <span className="gradient-text animate-wave">Purohit</span>
            </h1>

            {/* Mobile-Only Profile Image Frame (Under Name) */}
            <div className="w-full flex md:hidden justify-center my-6">
              <Tilt
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                scale={1.05}
                transitionSpeed={2500}
                className="relative"
              >
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2 gradient-bg shadow-[0_0_20px_rgba(0,242,254,0.3)]">
                    <div className="w-full h-full rounded-full bg-secondary overflow-hidden border-4 border-secondary flex items-center justify-center relative">
                    <img src="/profile.jpg" alt="Piyush Purohit" loading="lazy" className="w-full h-full object-cover z-0" />
                  </div>
                  {/* GATE Badge SVG */}
                  <div className="absolute -bottom-1 -right-1 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center -rotate-12 drop-shadow-md z-20">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500 fill-current">
                      <path d="M50 2.5 L61.8 14.3 L78.5 14.3 L78.5 31 L90.3 42.8 L81.5 50 L90.3 57.2 L78.5 69 L78.5 85.7 L61.8 85.7 L50 97.5 L38.2 85.7 L21.5 85.7 L21.5 69 L9.7 57.2 L18.5 50 L9.7 42.8 L21.5 31 L21.5 14.3 L38.2 14.3 Z" />
                      <circle cx="50" cy="50" r="34" className="fill-amber-100 dark:fill-amber-900" />
                      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" className="opacity-50" />
                      <text x="50" y="46" fontFamily="sans-serif" fontSize="18" fontWeight="900" textAnchor="middle" fill="currentColor" className="text-amber-700 dark:text-amber-300 tracking-tight">GATE</text>
                      <text x="50" y="62" fontFamily="sans-serif" fontSize="10" fontWeight="bold" textAnchor="middle" fill="currentColor" className="text-amber-700 dark:text-amber-300 tracking-widest">QUALIFIED</text>
                    </svg>
                  </div>
                </div>
              </Tilt>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-4xl font-semibold text-gray-400 h-10 md:h-16"
          >
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'Software Engineer',
                2000,
                'Frontend Specialist',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-gray-400 max-w-xl mx-auto md:mx-0 leading-relaxed pt-2 md:pt-4"
          >
            Architecting high-performance web applications and seamless digital experiences. Specializing in modern React ecosystems, scalable Node.js backends, and elegant user-centric design. Let's build the extraordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-6 justify-center md:justify-start"
          >
            <button onClick={() => { setActiveSection('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer group relative inline-flex items-center justify-center px-6 md:px-8 py-2.5 md:py-3 font-medium text-white bg-[#0f0f0f] border border-[#00f2fe]/40 rounded-full overflow-hidden shadow-[0_0_15px_rgba(0,242,254,0.1)] hover:shadow-[0_0_30px_rgba(0,242,254,0.4)] hover:border-[#00f2fe] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent-start to-accent-end opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              View Projects
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 text-[#00f2fe] group-hover:translate-x-1 transition-transform" />
            </button>

            <button onClick={() => { setActiveSection('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer group inline-flex items-center justify-center px-6 md:px-8 py-2.5 md:py-3 font-medium text-white bg-[#141414] border-2 border-white/10 rounded-full hover:bg-white/5 hover:border-white/30 transition-all w-full sm:w-auto">
              Contact Me
              <Mail className="ml-2 w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>

            <a href={resumeUrl} download className="group inline-flex items-center justify-center px-6 md:px-8 py-2.5 md:py-3 font-medium text-gray-400 hover:text-white transition-colors w-full sm:w-auto">
              <Download className="mr-2 w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-1 transition-transform" />
              Resume
            </a>
          </motion.div>
        </div>

        {/* Desktop Profile Image Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:flex w-full md:w-2/5 justify-center"
        >
          <Tilt
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            scale={1.05}
            transitionSpeed={2500}
            gyroscope={true}
            className="w-full flex justify-center relative"
          >
            <div className="relative w-80 h-80 rounded-full p-2 gradient-bg shadow-[0_0_40px_rgba(0,242,254,0.3)] group cursor-pointer hover:shadow-[0_0_60px_rgba(79,172,254,0.5)] transition-shadow duration-500">
                <div className="w-full h-full rounded-full bg-secondary overflow-hidden border-4 border-secondary flex items-center justify-center relative">
                {/* Completely clear image with no grayscale or overlay */}
                <img src="/profile.jpg" alt="Piyush Purohit" loading="lazy" className="w-full h-full object-cover z-0" onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400/141414/ffffff?text=Piyush+Purohit' }} />
              </div>
              
              {/* Spinning ring decorative */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border border-dashed border-white/30 rounded-full"
              ></motion.div>

              {/* Glowing GATE Badge SVG */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-2 -right-2 w-20 h-20 flex items-center justify-center -rotate-12 drop-shadow-lg z-20 group-hover:rotate-0 transition-transform duration-300"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500 fill-current drop-shadow-sm">
                  <path d="M50 2.5 L61.8 14.3 L78.5 14.3 L78.5 31 L90.3 42.8 L81.5 50 L90.3 57.2 L78.5 69 L78.5 85.7 L61.8 85.7 L50 97.5 L38.2 85.7 L21.5 85.7 L21.5 69 L9.7 57.2 L18.5 50 L9.7 42.8 L21.5 31 L21.5 14.3 L38.2 14.3 Z" />
                  <circle cx="50" cy="50" r="34" className="fill-amber-100 dark:fill-amber-900" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" className="opacity-50" />
                  <text x="50" y="46" fontFamily="sans-serif" fontSize="18" fontWeight="900" textAnchor="middle" fill="currentColor" className="text-amber-700 dark:text-amber-300 tracking-tight">GATE</text>
                  <text x="50" y="62" fontFamily="sans-serif" fontSize="10" fontWeight="bold" textAnchor="middle" fill="currentColor" className="text-amber-700 dark:text-amber-300 tracking-widest">QUALIFIED</text>
                </svg>
              </motion.div>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
