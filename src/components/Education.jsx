import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Library, BookOpen } from 'lucide-react';
import { getEducation } from '../api/portfolioService';

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

const MOCK_EDUCATION_DATA = [
  {
    level: "College (B.Tech)",
    degree: "Computer Science & Engineering",
    institution: "Engineering College Bikaner",
    grade: "CGPA: 9.33 / 10 (up to 5th Sem)",
    year: "2023 - 2027",
    isGateQualified: true,
    borderColor: "border-l-accent-start",
    iconColor: "text-accent-start",
    icon: <GraduationCap size={28} className="text-accent-start" />,
    highlights: [
      "Student Activity Cell Member — core organizer for college events",
      "Active participant in technical and cultural fests",
      "Participated in multiple Hackathons (ideation + coding rounds)",
      "Pitched startup ideas in pitching rounds/competitions",
      "Currently building and working on our own startup (present)"
    ]
  },
  {
    level: "Higher Secondary (12th)",
    degree: "Class/School Topper",
    institution: "Bharti Niketan School",
    grade: "Score: 98.80%",
    year: "2021",
    borderColor: "border-l-blue-500",
    iconColor: "text-blue-500",
    icon: <Library size={28} className="text-blue-500" />,
    highlights: [
      "Maintained top rank with distinction",
      "Represented school in inter-school competitions"
    ]
  },
  {
    level: "Secondary (10th)",
    degree: "School Topper",
    institution: "Adarsh Vidya Mandir",
    grade: "Score: 93.17%",
    year: "2019",
    borderColor: "border-l-accent-end",
    iconColor: "text-accent-end",
    icon: <BookOpen size={28} className="text-accent-end" />,
    highlights: [
      "Consistent academic topper throughout secondary school",
      "Actively participated in sports and extracurricular activities",
      "Student Community President — led school-level events and student initiatives",
      "Main Anchor (English) at Annual Function — hosted the flagship school event"
    ]
  }
];

const SkeletonEducationCard = () => (
  <div className="card-glass p-5 md:p-8 rounded-xl md:rounded-2xl border-l-4 border-white/5 animate-pulse flex flex-col space-y-4">
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-full bg-white/5 shrink-0"></div>
      <div className="flex-grow space-y-2">
        <div className="h-6 bg-white/5 rounded w-1/3"></div>
        <div className="h-4 bg-white/5 rounded w-1/4"></div>
      </div>
    </div>
    <div className="h-4 bg-white/5 rounded w-full"></div>
    <div className="h-4 bg-white/5 rounded w-5/6"></div>
  </div>
);

const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await getEducation();
        if (data && data.length > 0) {
          const formatted = data.map((item, idx) => {
            let icon = <BookOpen size={28} className="text-accent-end" />;
            let borderColor = "border-l-accent-end";
            let iconColor = "text-accent-end";

            const fieldLower = (item.fieldOfStudy || '').toLowerCase();
            if (fieldLower.includes('college') || fieldLower.includes('b.tech') || fieldLower.includes('university') || idx === 0) {
              icon = <GraduationCap size={28} className="text-accent-start" />;
              borderColor = "border-l-accent-start";
              iconColor = "text-accent-start";
            } else if (fieldLower.includes('12th') || fieldLower.includes('higher') || idx === 1) {
              icon = <Library size={28} className="text-blue-500" />;
              borderColor = "border-l-blue-500";
              iconColor = "text-blue-500";
            }

            return {
              id: item.id,
              level: item.fieldOfStudy,
              degree: item.degree,
              institution: item.institution,
              grade: item.grade,
              year: `${item.startDate} - ${item.endDate || 'Present'}`,
              isGateQualified: fieldLower.includes('b.tech') || item.description?.toLowerCase().includes('gate'),
              borderColor,
              iconColor,
              icon,
              highlights: item.description ? item.description.split('\n') : []
            };
          });
          setEducationList(formatted);
        } else {
          setEducationList(MOCK_EDUCATION_DATA);
        }
      } catch (err) {
        console.error('Error fetching education:', err);
        setEducationList(MOCK_EDUCATION_DATA);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEducation();
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
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <section id="education" className="pb-12 relative bg-primary/20">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Academic <span className="gradient-text">Background</span>
            </h2>
            <div className="h-1 w-20 gradient-bg mx-auto rounded-full"></div>
          </motion.div>
          <div className="relative border-l-2 border-white/10 ml-4 md:ml-0 space-y-12 pb-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => <SkeletonEducationCard key={i} />)
            ) : (
              educationList.map((edu, index) => (
                <motion.div
                  key={edu.id || index}
                  variants={itemVariants}
                  className="relative pl-8 md:pl-12"
                >
                  {/* Timeline node */}
                  <div className="absolute -left-[11px] top-1 w-5 h-5 bg-secondary border-4 border-accent-start rounded-full shadow-[0_0_15px_rgba(0,242,254,0.5)]"></div>

                  <div className="card-glass p-5 md:p-8 rounded-xl md:rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -z-10"></div>
                    
                    {edu.isGateQualified && <GateBadge />}

                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 md:mb-4 gap-2 md:gap-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white flex items-center leading-tight">
                          <GraduationCap className="mr-2 md:mr-3 text-accent-start shrink-0" size={20} />
                          {edu.degree}
                        </h3>
                        <p className="text-base md:text-lg text-accent-end mt-1 font-medium">{edu.institution}</p>
                        <p className="text-xs text-gray-400 mt-1">{edu.level}</p>
                        <div className="mt-2.5 inline-block font-tech text-accent-start font-bold text-xs bg-white/5 px-2.5 py-1 rounded">
                          {edu.grade}
                        </div>
                      </div>
                      <div className="flex items-center text-xs md:text-sm font-tech text-gray-400 bg-white/5 px-3 md:px-4 py-1.5 md:py-2 rounded-full w-fit">
                        {edu.year}
                      </div>
                    </div>

                    {edu.highlights && edu.highlights.length > 0 && (
                      <ul className="space-y-2 md:space-y-3 mt-4 md:mt-6 pt-4 border-t border-white/5">
                        {edu.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start text-sm md:text-base text-gray-400">
                            <span className="text-accent-start mr-2 md:mr-3 mt-1 text-xs">▹</span>
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>        </motion.div>
      </div>
    </section>
  );
};

export default Education;
