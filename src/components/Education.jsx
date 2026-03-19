import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Library, BookOpen } from 'lucide-react';

const GateBadge = () => (
  <div className="absolute bottom-4 right-4 md:-bottom-2 md:-right-4 w-16 h-16 md:w-28 md:h-28 flex items-center justify-center -rotate-12 drop-shadow-md z-10 transition-transform hover:rotate-0 duration-300 opacity-90">
    <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500 fill-current drop-shadow-sm">
      <path d="M50 2.5 L61.8 14.3 L78.5 14.3 L78.5 31 L90.3 42.8 L81.5 50 L90.3 57.2 L78.5 69 L78.5 85.7 L61.8 85.7 L50 97.5 L38.2 85.7 L21.5 85.7 L21.5 69 L9.7 57.2 L18.5 50 L9.7 42.8 L21.5 31 L21.5 14.3 L38.2 14.3 Z" />
      <circle cx="50" cy="50" r="34" className="fill-amber-100 dark:fill-amber-900" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" className="opacity-50" />
      <text x="50" y="46" fontFamily="sans-serif" fontSize="18" fontWeight="900" textAnchor="middle" fill="currentColor" className="text-amber-800 dark:text-amber-300 tracking-tight">
        GATE
      </text>
      <text x="50" y="62" fontFamily="sans-serif" fontSize="10" fontWeight="bold" textAnchor="middle" fill="currentColor" className="text-amber-800 dark:text-amber-300 tracking-widest">
        QUALIFIED
      </text>
      <path d="M35 70 L50 85 L65 70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-800 dark:text-amber-300 opacity-60" />
    </svg>
  </div>
);

const educationData = [
  {
    icon: <GraduationCap size={28} className="text-accent-start" />,
    level: "College (B.Tech)",
    degree: "Computer Science & Engineering",
    institution: "Engineering College Bikaner",
    grade: "CGPA: 9.33 / 10 (up to 5th Sem)",
    year: "2023 - 2027",
    isGateQualified: true,
    borderColor: "border-l-accent-start",
    highlights: [
      "Student Activity Cell Member — core organizer for college events",
      "Active participant in technical and cultural fests",
      "Participated in multiple Hackathons (ideation + coding rounds)",
      "Pitched startup ideas in pitching rounds/competitions",
      "Currently building and working on our own startup (present)"
    ]
  },
  {
    icon: <Library size={28} className="text-blue-500" />,
    level: "Higher Secondary (12th)",
    degree: "Class/School Topper",
    institution: "Bharti Niketan School",
    grade: "Score: 98.80%",
    year: "2021",
    borderColor: "border-l-blue-500",
    highlights: [
      "Maintained top rank with distinction",
      "Represented school in inter-school competitions"
    ]
  },
  {
    icon: <BookOpen size={28} className="text-accent-end" />,
    level: "Secondary (10th)",
    degree: "School Topper",
    institution: "Adarsh Vidya Mandir",
    grade: "Score: 93.17%",
    year: "2019",
    borderColor: "border-l-accent-end",
    highlights: [
      "Consistent academic topper throughout secondary school",
      "Actively participated in sports and extracurricular activities",
      "Student Community President — led school-level events and student initiatives",
      "Main Anchor (English) at Annual Function — hosted the flagship school event"
    ]
  }
];

const Education = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

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
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section id="education" className="py-16 md:py-24 relative bg-primary/20">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Academic <span className="gradient-text">Background</span>
            </h2>
            <div className="h-1 w-20 gradient-bg mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-6 md:space-y-8">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`card-glass p-5 md:p-8 rounded-xl md:rounded-2xl border-l-[3px] md:border-l-4 ${edu.borderColor} relative overflow-visible group hover:shadow-lg transition-all duration-300`}
              >
                {edu.isGateQualified && <GateBadge />}

                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-full bg-secondary border border-gray-200 dark:border-white/10 flex items-center justify-center shadow-sm">
                    {edu.icon}
                  </div>
                  
                  <div className="flex-grow pt-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5 md:gap-2 mb-1">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                        {edu.level}
                      </h3>
                      <span className="inline-block text-xs md:text-sm font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full w-fit">
                        {edu.year}
                      </span>
                    </div>
                    
                    <p className="text-base md:text-lg font-semibold text-accent-start mb-1">{edu.degree}</p>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">{edu.institution}</p>
                    
                    <div className="mt-2 md:mt-3 inline-block font-tech text-gray-800 dark:text-white font-bold text-xs md:text-sm bg-[#f0f4ff] dark:bg-white/5 border border-blue-100 dark:border-transparent px-2.5 md:px-3 py-1 md:py-1.5 rounded-md shadow-sm">
                      {edu.grade}
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-gray-100 dark:border-white/10 mt-2">
                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start text-sm md:text-base text-gray-600 dark:text-gray-300">
                        <span className="text-accent-start mr-3 mt-1 inline-block">•</span>
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Education;
