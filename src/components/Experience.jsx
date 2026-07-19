import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar } from 'lucide-react';
import { getExperiences } from '../api/portfolioService';

const MOCK_EXPERIENCES = [
  {
    id: 1,
    role: "Chief Frontend Officer & Full Stack Developer",
    company: "Trivana Hospitality",
    period: "June 2025 – Present",
    ppoUrl: "/trivana offer latter ppo.jpg",
    description: [
      "Created the BookTrivana app using React Native, utilizing the same backend as the website (https://booktrivana.com/).",
      "Worked on POS billing and other core sections of our startup as Chief Frontend Officer.",
      "Leading frontend development for a hospitality management platform.",
      "Building reusable UI components with React and Tailwind CSS.",
      "Integrating REST APIs for booking workflows.",
      "Improving platform performance and scalability."
    ]
  },
  {
    id: 2,
    role: "Frontend Developer Intern",
    company: "Codsoft",
    period: "May 2024 – June 2024",
    description: [
      "Developed responsive web apps including a calculator and various landing pages.",
      "Implemented seamless cross-browser compatibility.",
      "Utilized Git and GitHub for team version control."
    ]
  }
];

const SkeletonExperienceCard = () => (
  <div className="relative pl-8 md:pl-12 animate-pulse mb-8">
    <div className="absolute -left-[11px] top-1 w-5 h-5 bg-white/5 border-4 border-white/10 rounded-full"></div>
    <div className="card-glass p-5 md:p-8 rounded-xl md:rounded-2xl h-48 flex flex-col space-y-3">
      <div className="h-6 bg-white/5 rounded w-1/3"></div>
      <div className="h-4 bg-white/5 rounded w-1/4"></div>
      <div className="h-4 bg-white/5 rounded w-full"></div>
      <div className="h-4 bg-white/5 rounded w-5/6"></div>
    </div>
  </div>
);

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await getExperiences();
        if (data && data.length > 0) {
          const formatted = data.map((item) => ({
            id: item.id,
            role: item.position,
            company: item.company,
            period: `${item.startDate} – ${item.endDate || 'Present'}`,
            ppoUrl: item.company?.toLowerCase().includes('trivana') ? '/trivana offer latter ppo.jpg' : '',
            description: item.description ? item.description.split('\n') : []
          }));
          setExperiences(formatted);
        } else {
          setExperiences(MOCK_EXPERIENCES);
        }
      } catch (err) {
        console.error('Error fetching experiences:', err);
        setExperiences(MOCK_EXPERIENCES);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <section id="experience" className="pt-10 pb-12 relative bg-primary/30">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Professional <span className="gradient-text">Journey</span>
            </h2>
            <div className="h-1 w-20 gradient-bg mx-auto rounded-full"></div>
          </motion.div>

          <div className="relative border-l-2 border-white/10 ml-4 md:ml-0 space-y-12 pb-4">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, i) => <SkeletonExperienceCard key={i} />)
            ) : (
              experiences.map((exp, index) => (
                <motion.div key={exp.id} variants={itemVariants} className="relative pl-8 md:pl-12">
                  {/* Timeline node */}
                  <div className="absolute -left-[11px] top-1 w-5 h-5 bg-secondary border-4 border-accent-start rounded-full shadow-[0_0_15px_rgba(0,242,254,0.5)]"></div>

                  <div className="card-glass p-5 md:p-8 rounded-xl md:rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -z-10"></div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4 gap-2 md:gap-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white flex items-center leading-tight">
                          <Briefcase className="mr-2 md:mr-3 text-accent-start shrink-0" size={20} />
                          {exp.role}
                        </h3>
                        <p className="text-base md:text-lg text-accent-end mt-1 font-medium">{exp.company}</p>
                      </div>
                      <div className="flex items-center text-xs md:text-sm font-tech text-gray-400 bg-white/5 px-3 md:px-4 py-1.5 md:py-2 rounded-full w-fit">
                        <Calendar className="mr-1.5 md:mr-2" size={14} />
                        {exp.period}
                      </div>
                    </div>

                    {exp.ppoUrl && (
                      <div className="mb-4 md:mb-5">
                        <a
                          href={exp.ppoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 rounded-full border border-accent-start/30 bg-white/5 text-sm font-semibold text-accent-start hover:text-accent-end hover:border-accent-end/40 transition-colors"
                        >
                          View PPO
                        </a>
                      </div>
                    )}

                    <ul className="space-y-2 md:space-y-3 mt-4 md:mt-6">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex items-start text-sm md:text-base text-gray-400">
                          <span className="text-accent-start mr-2 md:mr-3 mt-1 text-xs">▹</span>
                          <span className="leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
