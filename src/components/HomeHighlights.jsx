import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, GraduationCap, Award, ArrowRight } from 'lucide-react';

export default function HomeHighlights({ setActiveSection }) {
  const highlights = [
    {
      icon: <GraduationCap size={24} className="text-accent-start" />,
      title: "Academic Excellence",
      subtitle: "B.Tech CSE Candidate",
      description: "Pursuing Computer Science with a strong 9.33 CGPA, building dynamic applications, and running a tech startup."
    },
    {
      icon: <Award size={24} className="text-accent-end" />,
      title: "GATE CSE 2026",
      subtitle: "Qualified Milestone",
      description: "Ranked among elite candidates nationally with a GATE Score of 423."
    },
    {
      icon: <Trophy size={24} className="text-yellow-400" />,
      title: "CCC Hackathon Champion",
      subtitle: "UI/UX & Architecture Winner",
      description: "Led technical engineering and UI/UX design to claim first prize in the regional hackathon."
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Quick <span className="gradient-text">Highlights</span>
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            A fast overview of my core engineering milestones, academic achievements, and technical honors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card-glass p-6 rounded-2xl border border-white/10 hover:border-accent-start/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent-start transition-colors">
                  {item.title}
                </h3>
                <div className="text-xs font-semibold text-accent-start/80 tracking-wider uppercase mb-3">
                  {item.subtitle}
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={() => {
              setActiveSection('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent-start hover:bg-accent-end text-[#0b0f19] font-bold transition-colors shadow-lg shadow-accent-start/20 hover:shadow-accent-end/30"
          >
            Explore Projects <ArrowRight size={18} />
          </button>
          <button
            onClick={() => {
              setActiveSection('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-full border border-white/20 hover:border-white/40 text-white font-medium hover:bg-white/5 transition-all duration-200"
          >
            Learn More About Me
          </button>
        </div>
      </div>
    </section>
  );
}
