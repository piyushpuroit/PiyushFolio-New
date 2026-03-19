import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Award, Star } from 'lucide-react';

const Achievements = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <section id="achievements" className="py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-start/10 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Key <span className="gradient-text">Achievements</span>
          </h2>
          <div className="h-1 w-20 gradient-bg mx-auto rounded-full mb-16"></div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card-glass p-8 md:p-12 rounded-3xl relative overflow-hidden border border-accent-start/30 shadow-[0_0_50px_rgba(0,242,254,0.15)] group"
          >
            {/* Animated particles inside the card */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz4KPC9zdmc+')] opacity-50"
            ></motion.div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(79,172,254,0.6)] group-hover:shadow-[0_0_50px_rgba(0,242,254,0.8)] transition-shadow duration-500">
                <Trophy size={48} className="text-white" />
              </div>

              <div className="flex items-center justify-center space-x-2 text-accent-start mb-2">
                <Star size={20} fill="currentColor" />
                <Star size={24} fill="currentColor" />
                <Star size={20} fill="currentColor" />
              </div>

              <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">Winner – CCC Hackathon 2024</h3>
              <p className="text-xl text-gray-400 font-medium mb-6">UI/UX Designer & Team Representative</p>

              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Award size={18} className="text-accent-end mr-2" />
                <span className="text-sm font-tech text-gray-400">Recognized for outstanding design and technical execution</span>
              </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-1 gradient-bg"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 gradient-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
