import React, { Suspense, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Loading from './components/Loading';
import CustomCursor from './components/CustomCursor';
import SocialBar from './components/SocialBar';
import { ToastProvider } from './components/Toast';
import AdminApp from './admin/AdminApp';
import HomeHighlights from './components/HomeHighlights';

const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Experience = React.lazy(() => import('./components/Experience'));
const Projects = React.lazy(() => import('./components/Projects'));
const Achievements = React.lazy(() => import('./components/Achievements'));
const Education = React.lazy(() => import('./components/Education'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));
const ParticlesBackground = React.lazy(() => import('./components/ParticlesBackground'));

function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Render admin SPA if path is /admin or startsWith /admin
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
    return <AdminApp />;
  }

  return (
    <ToastProvider>
      <div className="relative min-h-screen bg-secondary selection:bg-accent-start/30 selection:text-white cursor-none">
        <CustomCursor />
        <Suspense fallback={<Loading />}>
          <ParticlesBackground />
        </Suspense>

        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

        <SocialBar />

        <main>
          <Suspense fallback={<Loading />}>
            {activeSection === 'home' ? (
              <>
                <Hero setActiveSection={setActiveSection} />
                <HomeHighlights setActiveSection={setActiveSection} />
              </>
            ) : (
              <div className="pt-16 md:pt-20 pb-12 min-h-[80vh]">
                {activeSection === 'about' && <About />}
                {activeSection === 'skills' && <Skills />}
                {activeSection === 'experience' && <Experience />}
                {activeSection === 'projects' && <Projects />}
                {activeSection === 'education' && <Education />}
                {activeSection === 'certifications' && <Achievements />}
                {activeSection === 'contact' && <Contact />}
              </div>
            )}
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </ToastProvider>
  );
}

export default App;
