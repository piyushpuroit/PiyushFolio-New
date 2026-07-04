import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Terminal, Code2, Database, Layout } from 'lucide-react';
const events = [
  {
    year: "2024",
    title: "Hackathon Champion",
    desc: "Spearheaded UI/UX design & technical architecture to win CCC Hackathon 2024."
  },
  {
    year: "2024",
    title: "Frontend Engineer Intern",
    desc: "Engineered responsive, high-converting platforms at Codsoft."
  },
  {
    year: "2025",
    title: "Full Stack Engineer",
    desc: "Architecting the core frontend infrastructure at Trivana Hospitality."
  },
  {
    year: "2026",
    title: "GATE CSE Qualified",
    desc: "Qualified GATE CSE 2026 with a score of 423."
  },
  {
    year: "2027",
    title: "CS Engineering",
    desc: "B.Tech candidate at Engineering College Bikaner."
  }
];

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="about" className="pb-12 relative overflow-hidden">
      {/* Organic gradient morphing background blob */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-start/10 blur-[100px] -z-10 pointer-events-none animate-blob"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Behind the <span className="gradient-text animate-wave">Code</span>
            </h2>
            <div className="h-1 w-20 gradient-bg mx-auto rounded-full"></div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Narrative */}
            <motion.div variants={itemVariants} className="lg:w-1/2 space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                I am a passionate Full Stack Engineer obsessed with crafting exceptional digital experiences. By bridging the gap between rigorous backend architecture and intuitive frontend design, I build systems that are both powerful and beautiful.
              </p>
              <p>
                Whether I'm engineering scalable SaaS platforms, optimizing database performance, or designing pixel-perfect user interfaces, I thrive on translating complex technical challenges into simple, elegant solutions that drive real-world impact.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3 text-white">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10"><Terminal size={20} className="text-accent-start" /></div>
                  <span className="font-tech text-sm">Data Structures</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10"><Code2 size={20} className="text-accent-end" /></div>
                  <span className="font-tech text-sm">Agile Dev</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10"><Database size={20} className="text-accent-start" /></div>
                  <span className="font-tech text-sm">System Design</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10"><Layout size={20} className="text-accent-end" /></div>
                  <span className="font-tech text-sm">Performance</span>
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div variants={itemVariants} className="lg:w-1/2 w-full">
              <div className="relative border-l-2 border-white/10 ml-3 md:ml-0 space-y-8 pl-8">
                {events.map((event, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="relative group cursor-default"
                  >
                    <div className="absolute -left-[41px] w-5 h-5 bg-secondary border-2 border-accent-start group-hover:border-accent-end rounded-full transition-colors duration-300"></div>
                    <div className="card-glass p-6 rounded-2xl group-hover:shadow-[0_0_25px_rgba(221,36,118,0.15)] transition-shadow duration-300 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full gradient-bg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="text-xs font-tech text-accent-start tracking-wider uppercase">{event.year}</span>
                      <h3 className="text-xl font-bold text-white mt-1 mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-400">{event.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
