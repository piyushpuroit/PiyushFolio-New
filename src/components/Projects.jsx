import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';

import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { getProjects } from '../api/portfolioService';

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Hospitality Management Platform",
    description: "Architected a real-time booking ecosystem featuring a modern, responsive UI and a highly scalable backend to streamline complex hotel operations.",
    features: [
      "End-to-end billing and POS system for hospitality businesses",
      "Real-time order and table management dashboard",
      "Role-based access for staff and admin",
      "Invoice generation with GST compliance",
      "Integrated team and inventory management module"
    ],
    tags: ["React", "Tailwind CSS", "Node.js", "MySQL", "REST API", "React Native"],
    github: "https://github.com/piyushpuroit/Billing-pos",
    demo: "https://trivanahospitality.com/team",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    isAppMockup: false
  },
  {
    id: 2,
    title: "Fitness Playground Website",
    description: "Engineered a visually immersive, gamified fitness platform. Designed completely in Figma and brought to life with high-performance vanilla web technologies.",
    features: [
      "Interactive workout planner with custom routine builder",
      "Exercise library with animated visual guides",
      "Progress tracking with visual charts and streaks",
      "Responsive design optimised for mobile-first use",
      "No login required — instant access for users"
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Figma"],
    github: "https://github.com/piyushpuroit",
    demo: "#",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    isAppMockup: true
  },
  {
    id: 3,
    title: "Java Swing Resume Builder",
    description: "Developed a robust Java Swing desktop application that automates the generation, formatting, and structural validation of professional resumes.",
    features: [
      "Drag-and-drop resume builder with live preview",
      "Multiple ATS-friendly templates",
      "Export to PDF with one click",
      "Real-time editing with section reordering",
      "Clean, professional output without watermarks"
    ],
    tags: ["Java", "Swing", "OOP", "I/O"],
    github: "https://github.com/piyushpuroit/JavaSwing-Resume-Builder",
    demo: "#",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    isAppMockup: false
  },
  {
    id: 4,
    title: "Personal Portfolio",
    description: "A fast, smooth, and visually unique personal portfolio website with custom animations, custom cursor, and dynamic theme.",
    features: [
      "Dynamic light/dark theme with custom aesthetic toggles",
      "Seamless scroll animations using Framer Motion",
      "Interactive custom cursor and tailored cursor states",
      "Highly responsive mobile-first UI with Tailwind CSS",
      "Optimized performance and fast load times with Vite"
    ],
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    github: "https://github.com/piyushpuroit",
    demo: "https://piyushport-folio.netlify.app/",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    isAppMockup: false
  }
];

const SkeletonCard = () => (
  <div className="card-glass rounded-2xl overflow-hidden border border-white/10 h-[450px] animate-pulse p-6 flex flex-col space-y-4">
    <div className="bg-white/5 h-48 w-full rounded-xl"></div>
    <div className="h-6 bg-white/5 rounded w-3/4"></div>
    <div className="h-4 bg-white/5 rounded w-full"></div>
    <div className="h-4 bg-white/5 rounded w-5/6"></div>
    <div className="flex gap-2 pt-4">
      <div className="h-6 bg-white/5 rounded w-16"></div>
      <div className="h-6 bg-white/5 rounded w-16"></div>
    </div>
  </div>
);

const Projects = () => {
  const [projectsList, setProjectsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        if (data && data.length > 0) {
          // Map DB project format to local structure
          const formatted = data.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.shortDescription,
            features: item.longDescription ? item.longDescription.split('\n') : [],
            tags: item.technologies ? item.technologies.split(',') : [],
            github: item.githubUrl || '#',
            demo: item.liveUrl || '#',
            image: item.imageUrl || 'https://via.placeholder.com/600x400',
            isAppMockup: item.title.toLowerCase().includes('fitness') // Or infer
          }));
          setProjectsList(formatted);
        } else {
          setProjectsList(MOCK_PROJECTS);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setProjectsList(MOCK_PROJECTS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
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
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <section id="projects" className="pt-10 pb-12 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="h-1 w-20 gradient-bg mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              A selection of my best work demonstrating my ability to build polished, scalable applications from the ground up.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            ) : (
              projectsList.map((project) => (
                <motion.div 
                  key={project.id} 
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
                    <div className="card-glass h-full rounded-2xl overflow-hidden group flex flex-col border border-white/10 hover:border-accent-start/50 transition-all duration-500 relative shadow-lg hover:shadow-[0_20px_40px_rgba(0,242,254,0.2)]">
                      {/* Animated Glow Border */}
                      <div className="absolute inset-x-0 -bottom-1 h-1 gradient-bg scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

                      {/* Image Area */}
                      <div className={`h-40 md:h-48 w-full overflow-hidden relative border-b border-white/10 ${project.isAppMockup ? 'bg-[#f0f0f0] dark:bg-gray-800 p-2 pt-6 rounded-t-xl overflow-hidden shadow-inner' : 'bg-secondary'}`}>
                        {project.isAppMockup && (
                          <div className="absolute top-0 left-0 w-full h-5 md:h-6 bg-gray-200 dark:bg-gray-900 flex items-center px-2 space-x-1 border-b border-gray-300 dark:border-gray-700">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-400"></div>
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-400"></div>
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400"></div>
                          </div>
                        )}
                        {!project.isAppMockup && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-opacity duration-500 opacity-100 group-hover:opacity-0 mix-blend-overlay"></div>
                        )}
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className={`w-full h-full ${project.isAppMockup ? 'object-contain object-top rounded-b-[2px] shadow-sm' : 'object-cover'} transform group-hover:scale-105 transition-transform duration-700`}
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400/141414/ffffff?text=' + project.title.split(' ').join('+') }}
                        />
                      </div>

                      {/* Content Area */}
                      <div className="p-5 md:p-6 flex flex-col flex-grow">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent-start transition-colors leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3 md:mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Key Features */}
                        <ul className="mb-4 md:mb-6 space-y-1 md:space-y-1.5 flex-grow">
                          {project.features && project.features.map((feature, i) => (
                            <li key={i} className="text-xs text-gray-500 dark:text-gray-400 flex items-start">
                              <span className="text-accent-start mr-2 mt-0.5">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="text-xs font-tech text-accent-end bg-accent-end/10 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-white/10 mt-auto">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors flex items-center text-sm"
                          >
                              <svg className="mr-1.5 w-4 h-4 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M12 .297a12 12 0 00-3.793 23.414c.6.111.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.469-2.382 1.235-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 016.008 0c2.292-1.552 3.299-1.23 3.299-1.23.653 1.652.242 2.873.119 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.803 5.624-5.475 5.921.43.372.814 1.102.814 2.222 0 1.605-.014 2.898-.014 3.293 0 .32.216.694.825.576A12 12 0 0012 .297z"/></svg>
                              Code
                          </a>
                          {project.demo !== "#" && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-accent-end dark:text-gray-400 dark:hover:text-accent-end transition-colors flex items-center text-sm ml-auto"
                            >
                              <ExternalLink size={18} className="mr-1.5" /> Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              )))
            }
          </div>

          <motion.div variants={itemVariants} className="mt-16 text-center">
            <a href="https://github.com/piyushpuroit" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 border border-white/20 rounded-full text-white hover:bg-white/5 transition-colors group">
              View more on GitHub
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform text-accent-start" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
