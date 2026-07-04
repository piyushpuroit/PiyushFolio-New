import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Award, Star } from 'lucide-react';
import { getCertifications } from '../api/portfolioService';

const MOCK_ACHIEVEMENTS = [
  {
    id: 1,
    name: "Winner – CCC Hackathon 2024",
    issuingOrganization: "CCC",
    issueDate: "2024",
    credentialId: "UI/UX Designer & Team Representative",
    credentialUrl: "https://github.com/piyushpuroit"
  }
];

const SkeletonAchievementCard = () => (
  <div className="card-glass p-8 rounded-3xl animate-pulse h-64 border border-white/10 flex flex-col items-center justify-center space-y-3">
    <div className="w-16 h-16 rounded-full bg-white/5"></div>
    <div className="h-6 bg-white/5 rounded w-2/3"></div>
    <div className="h-4 bg-white/5 rounded w-1/2"></div>
  </div>
);

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getCertifications();
        if (data && data.length > 0) {
          setAchievements(data);
        } else {
          setAchievements(MOCK_ACHIEVEMENTS);
        }
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setAchievements(MOCK_ACHIEVEMENTS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <section id="achievements" className="pb-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-start/10 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
          }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Key <span className="gradient-text">Achievements</span>
          </h2>
          <div className="h-1 w-20 gradient-bg mx-auto rounded-full mb-16"></div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkeletonAchievementCard />
              <SkeletonAchievementCard />
            </div>
          ) : (
            <div className={`grid grid-cols-1 ${achievements.length > 1 ? 'md:grid-cols-2' : ''} gap-8 max-w-4xl mx-auto`}>
              {achievements.map((ach) => (
                <motion.div
                  key={ach.id}
                  whileHover={{ scale: 1.03 }}
                  className="card-glass p-8 md:p-10 rounded-3xl relative overflow-hidden border border-accent-start/30 shadow-[0_0_50px_rgba(0,242,254,0.15)] group flex flex-col justify-between"
                >
                  {/* Animated particles inside the card */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz4KPC9zdmc+')] opacity-50"></div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(79,172,254,0.6)] group-hover:shadow-[0_0_50px_rgba(0,242,254,0.8)] transition-shadow duration-500">
                      <Trophy size={36} className="text-white" />
                    </div>

                    <div className="flex items-center justify-center space-x-2 text-accent-start mb-2">
                      <Star size={16} fill="currentColor" />
                      <Star size={20} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug">{ach.name}</h3>
                    <p className="text-base text-gray-400 font-medium mb-4">{ach.credentialId}</p>

                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10">
                      <Award size={16} className="text-accent-end mr-2" />
                      <span className="text-xs font-tech text-gray-400">
                        {ach.issuingOrganization} • {ach.issueDate}
                      </span>
                    </div>
                  </div>

                  {ach.credentialUrl && ach.credentialUrl !== '#' && (
                    <div className="relative z-10 mt-6 pt-4 border-t border-white/10 w-full text-center">
                      <a
                        href={ach.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-accent-start hover:text-accent-end transition-colors"
                      >
                        Verify Credential
                      </a>
                    </div>
                  )}

                  <div className="absolute top-0 left-0 w-full h-1 gradient-bg"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 gradient-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
