import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, ExternalLink, Expand, RotateCcw, Star, X, ZoomIn, ZoomOut } from 'lucide-react';

const publicAsset = (path) => encodeURI(path);

const CERTIFICATIONS = [
  {
    id: 'gate-cse-2026',
    name: 'GATE CSE 2026 Qualified',
    issuingOrganization: 'IIT (GATE)',
    issueDate: '2026',
    credentialId: 'Score: 423',
    score: 423,
    thumbnail: '/Piyush-Purohit-Gate-2026-Scorecard.jpg',
    file: '/Piyush-Purohit-Gate-2026-Scorecard.jpg',
    buttonText: 'View Certificate'
  },
  {
    id: 'ccc-hackathon',
    name: 'CCC Hackathon Winner',
    issuingOrganization: 'CCC',
    issueDate: '2024',
    credentialId: 'HackHounds • Team Representative, UI/UX Designer & Frontend Developer • 3rd Place • Out of the Box Thinker Badge • Best Presentation Skills Award',
    thumbnail: '/hack.jpg',
    file: '/Hackathon.png',
    gallery: ['/hack.jpg', '/Hackathon.png'],
    startIndex: 1,
    buttonText: 'View Certificate'
  },
  {
    id: 'codsoft-internship',
    name: 'CodSoft Web Development Internship',
    issuingOrganization: 'CodSoft',
    issueDate: '2024',
    credentialId: 'Web Development Intern',
    thumbnail: '/Codsoft intern certificate Piyush purohit.jpg',
    file: '/Codsoft intern certificate Piyush purohit.jpg',
    buttonText: 'View Certificate'
  },
  {
    id: 'wadhwani-ignite',
    name: 'Wadhwani Ignite Bootcamp',
    issuingOrganization: 'Wadhwani Foundation',
    issueDate: '2025',
    credentialId: 'Ignite Bootcamp Participant',
    thumbnail: '/Wadhwani Foundation Certificate - piyush.jpg',
    file: '/Wadhwani Foundation Certificate - piyush.jpg',
    buttonText: 'View Certificate'
  },
  {
    id: 'eureka-startup',
    name: 'Eureka Startup Competition – 2nd Place',
    issuingOrganization: 'Eureka',
    issueDate: '2025',
    credentialId: 'Trivana Hospitality • Integrated Hotel & Restaurant Management Platform',
    thumbnail: '/Piyush-Eureka certificate.jpg',
    file: '/Piyush-Eureka certificate.jpg',
    buttonText: 'View Certificate'
  }
];

const Achievements = () => {
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const modalContentRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openCertification = (certification) => {
    setSelectedCertification(certification);
    setZoom(1);
    setImageIndex(certification.startIndex || 0);
  };

  const closeCertification = () => {
    setSelectedCertification(null);
    setZoom(1);
    setImageIndex(0);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setIsFullscreen(false);
  };

  const gallery = selectedCertification?.gallery?.length ? selectedCertification.gallery : (selectedCertification ? [selectedCertification.file] : []);
  const currentImage = gallery[imageIndex] || selectedCertification?.file;

  const showPrev = () => {
    if (gallery.length < 2) return;
    setImageIndex((value) => (value - 1 + gallery.length) % gallery.length);
    setZoom(1);
  };

  const showNext = () => {
    if (gallery.length < 2) return;
    setImageIndex((value) => (value + 1) % gallery.length);
    setZoom(1);
  };

  const toggleFullscreen = async () => {
    if (!modalContentRef.current) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        await modalContentRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const openInNewTab = () => {
    if (!selectedCertification) return;
    window.open(publicAsset(selectedCertification.file), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="achievements" className="pt-10 pb-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-start/10 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
          }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Key <span className="gradient-text">Certifications</span>
          </h2>
          <div className="h-1 w-20 gradient-bg mx-auto rounded-full mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {CERTIFICATIONS.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                className="card-glass p-6 md:p-8 rounded-3xl relative overflow-hidden border border-accent-start/30 shadow-[0_0_50px_rgba(0,242,254,0.15)] group flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz4KPC9zdmc+')] opacity-50"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/5 mb-5 shadow-[0_0_30px_rgba(79,172,254,0.18)] group-hover:shadow-[0_0_40px_rgba(0,242,254,0.28)] transition-shadow duration-300">
                    <img
                      src={publicAsset(cert.thumbnail)}
                      alt={cert.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 inline-flex items-center px-3 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-md">
                      <Star size={14} className="text-accent-start mr-1.5" fill="currentColor" />
                      <span className="text-[11px] font-tech text-white/90">Premium Preview</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2 text-accent-start mb-2">
                    <Star size={16} fill="currentColor" />
                    <Star size={20} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug">{cert.name}</h3>
                  <p className="text-base text-gray-400 font-medium mb-4">{cert.credentialId}</p>

                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5 w-fit mx-auto">
                    <Award size={16} className="text-accent-end mr-2" />
                    <span className="text-xs font-tech text-gray-400">
                      {cert.issuingOrganization} • {cert.issueDate}
                    </span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/10 w-full text-center">
                    <button
                      type="button"
                      onClick={() => openCertification(cert)}
                      className="text-sm font-semibold text-accent-start hover:text-accent-end transition-colors"
                    >
                      {cert.buttonText}
                    </button>
                  </div>

                  <div className="absolute top-0 left-0 w-full h-1 gradient-bg"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 gradient-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {selectedCertification && (
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center px-2 sm:px-4 py-3 sm:py-6 bg-black/80 backdrop-blur-md overflow-y-auto">
            <div className="absolute inset-0" onClick={closeCertification}></div>

            <div ref={modalContentRef} className="relative z-10 w-[calc(100%-0.5rem)] sm:w-full max-w-5xl card-glass border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] max-h-[calc(100vh-1.5rem)] sm:max-h-none">
              <div className="flex items-center justify-between gap-4 px-5 md:px-6 py-4 border-b border-white/10 bg-black/20">
                <div>
                  <h3 className="text-lg md:text-2xl font-bold text-white">{selectedCertification.name}</h3>
                  <p className="text-xs md:text-sm text-gray-400">
                    {selectedCertification.issuingOrganization} • {selectedCertification.issueDate}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeCertification}
                  className="p-2 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                  aria-label="Close certificate modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-0 max-h-[calc(100vh-8rem)] lg:max-h-none overflow-y-auto lg:overflow-visible">
                <div className="p-3 sm:p-4 md:p-6 bg-black/20">
                  <div className="flex items-center justify-center overflow-auto max-h-[55vh] sm:max-h-[70vh] rounded-2xl border border-white/10 bg-black/30 p-2 sm:p-3 md:p-4 relative">
                    <button
                      type="button"
                      onClick={showPrev}
                      disabled={gallery.length < 2}
                      className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full border border-white/10 bg-black/50 text-white hover:bg-black/70 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Previous certificate image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <img
                      src={publicAsset(currentImage || selectedCertification.file)}
                      alt={selectedCertification.name}
                      className="w-full max-w-full h-auto object-contain rounded-xl shadow-2xl transition-transform duration-200 sm:max-w-none sm:w-auto sm:max-h-[70vh]"
                      style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                    />
                    <button
                      type="button"
                      onClick={showNext}
                      disabled={gallery.length < 2}
                      className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full border border-white/10 bg-black/50 text-white hover:bg-black/70 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Next certificate image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {gallery.length > 1 && (
                    <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-1">
                      {gallery.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() => {
                            setImageIndex(index);
                            setZoom(1);
                          }}
                          className={`shrink-0 rounded-xl border transition-all duration-200 overflow-hidden ${index === imageIndex ? 'border-accent-start shadow-[0_0_20px_rgba(0,242,254,0.25)]' : 'border-white/10 opacity-75 hover:opacity-100'}`}
                        >
                          <img
                            src={publicAsset(image)}
                            alt={`${selectedCertification.name} thumbnail ${index + 1}`}
                            className="w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-5 md:p-6 border-t lg:border-t-0 lg:border-l border-white/10 bg-white/5 flex flex-col gap-4">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-2">Preview controls</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setZoom((value) => Math.max(0.5, +(value - 0.1).toFixed(1)))}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white hover:bg-white/10 transition-colors"
                      >
                        <ZoomOut size={16} />
                        Zoom Out
                      </button>
                      <button
                        type="button"
                        onClick={() => setZoom((value) => Math.min(2.5, +(value + 0.1).toFixed(1)))}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white hover:bg-white/10 transition-colors"
                      >
                        <ZoomIn size={16} />
                        Zoom In
                      </button>
                      <button
                        type="button"
                        onClick={() => setZoom(1)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white hover:bg-white/10 transition-colors"
                      >
                        <RotateCcw size={16} />
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white hover:bg-white/10 transition-colors"
                      >
                        <Expand size={16} />
                        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 space-y-2">
                    <p className="text-sm text-gray-300">{selectedCertification.credentialId}</p>
                    <p className="text-sm text-gray-400">
                      {selectedCertification.issuingOrganization} • {selectedCertification.issueDate}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 mt-auto">
                    <button
                      type="button"
                      onClick={openInNewTab}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full gradient-bg text-[#0b0f19] font-bold hover:opacity-95 transition-opacity"
                    >
                      <ExternalLink size={16} />
                      Open in New Tab
                    </button>
                    <button
                      type="button"
                      onClick={closeCertification}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-white/15 text-white hover:bg-white/5 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
