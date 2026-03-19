import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Java", "C", "C++"]
  },
  {
    title: "Web Technologies",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)"]
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React.js", "Next.js", "Express.js", "Tailwind CSS", "Bootstrap", "Java Swing"]
  },
  {
    title: "Database",
    skills: ["MySQL", "MongoDB"]
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "GitHub", "Docker", "Postman", "Figma", "VS Code"]
  },
  {
    title: "Concepts",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "REST APIs",
      "Agile",
      "Responsive Design",
      "Debugging",
      "Cross-Browser Compatibility"
    ]
  }
];

const Skills = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-16 relative overflow-hidden">
      {/* Organic gradient morphing background blob */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-end/10 blur-[120px] -z-10 pointer-events-none animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Technical <span className="gradient-text animate-wave">Arsenal</span>
            </h2>
            <div className="h-1 w-20 gradient-bg mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              A comprehensive toolkit of languages, frameworks, and concepts I use to bring ideas to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="h-full"
              >
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  scale={1.02}
                  transitionSpeed={2500}
                  gyroscope={true}
                  className="h-full"
                >
                  <div className="card-glass h-full rounded-2xl p-6 relative overflow-hidden group flex flex-col border border-white/10 hover:border-accent-start/50 transition-all duration-500 shadow-lg hover:shadow-[0_20px_40px_rgba(0,242,254,0.2)]">
                    {/* Animated Glow Border (Matches Projects section) */}
                    <div className="absolute inset-x-0 -bottom-1 h-1 gradient-bg scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center group-hover:text-accent-start transition-colors duration-300">
                        <span className="w-2 h-2 rounded-full gradient-bg mr-3"></span>
                        {category.title}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {category.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-gray-400 backdrop-blur-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
