import React, { useState, useEffect } from 'react';
import { getSocialLinks } from '../api/portfolioService';

const GitHubIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M12 .297a12 12 0 00-3.793 23.414c.6.111.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.469-2.382 1.235-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 016.008 0c2.292-1.552 3.299-1.23 3.299-1.23.653 1.652.242 2.873.119 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.803 5.624-5.475 5.921.43.372.814 1.102.814 2.222 0 1.605-.014 2.898-.014 3.293 0 .32.216.694.825.576A12 12 0 0012 .297z"/>
  </svg>
);

const LinkedInIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="2" fill="#0077B5" />
    <path d="M6.94 9.5H9.2v8.3H6.94zM8.06 6.9c.78 0 1.26.52 1.26 1.2-.01.68-.48 1.2-1.25 1.2H8.06c-.78 0-1.26-.52-1.26-1.2 0-.68.48-1.2 1.25-1.2zM11.4 9.5h2.15v1.14h.03c.3-.57 1.04-1.17 2.14-1.17 2.29 0 2.71 1.51 2.71 3.47v4.86h-2.26v-4.31c0-1.03-.02-2.36-1.44-2.36-1.44 0-1.66 1.12-1.66 2.29v4.38H11.4z" fill="#fff"/>
  </svg>
);

const InstagramIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="igGrad" x1="0%" x2="100%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="#f58529" />
        <stop offset="30%" stopColor="#dd2a7b" />
        <stop offset="60%" stopColor="#8134af" />
        <stop offset="100%" stopColor="#515bd4" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#igGrad)" />
    <path d="M12 7.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zm0 7.92a3.12 3.12 0 110-6.24 3.12 3.12 0 010 6.24z" fill="#fff"/>
    <circle cx="17.5" cy="6.5" r="0.9" fill="#fff" />
  </svg>
);

const MOCK_SOCIALS = [
  { platformName: "GitHub", url: "https://github.com/piyushpuroit", icon: "GitHub" },
  { platformName: "LinkedIn", url: "https://www.linkedin.com/in/piyush-purohit-qs5474/", icon: "LinkedIn" },
  { platformName: "Instagram", url: "https://www.instagram.com/piyush._.peeyush/", icon: "Instagram" }
];

const SocialBar = () => {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const data = await getSocialLinks();
        if (data && data.length > 0) {
          setSocialLinks(data);
        } else {
          setSocialLinks(MOCK_SOCIALS);
        }
      } catch (err) {
        console.error('Error fetching social links:', err);
        setSocialLinks(MOCK_SOCIALS);
      }
    };
    fetchSocials();
  }, []);

  const renderIcon = (name) => {
    const n = (name || '').toLowerCase();
    if (n.includes('github')) return <GitHubIcon />;
    if (n.includes('linkedin')) return <LinkedInIcon />;
    if (n.includes('instagram')) return <InstagramIcon />;
    return <span className="text-xs uppercase font-tech">{name.substring(0, 2)}</span>;
  };

  const getHoverBg = (name) => {
    const n = (name || '').toLowerCase();
    if (n.includes('github')) return 'group-hover:bg-white group-hover:text-[#181717]';
    if (n.includes('linkedin')) return 'group-hover:bg-[#0077b5] group-hover:text-white';
    if (n.includes('instagram')) return 'group-hover:bg-gradient-to-tr group-hover:from-[#f09433] group-hover:via-[#dc2743] group-hover:to-[#bc1888] group-hover:text-white';
    return 'group-hover:bg-accent-start group-hover:text-white';
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center space-y-4">
      {socialLinks.map((link, idx) => (
        <a 
          key={link.id || idx}
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label={link.platformName} 
          className="group"
        >
          <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white transition-all duration-300 transform-gpu group-hover:-translate-y-2 group-hover:scale-110 shadow-lg ring-0 group-hover:ring-4 group-hover:ring-accent-start/20 ${getHoverBg(link.platformName)}`}>
            {renderIcon(link.platformName)}
          </div>
        </a>
      ))}

      <style>{`
        @media (max-width: 767px) {
          .social-mobile { display: none; }
        }
      `}</style>
    </div>
  );
};

export default SocialBar;
