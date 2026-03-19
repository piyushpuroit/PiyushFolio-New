import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.classList.contains('clickable')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full mix-blend-screen pointer-events-none z-[9999] border-2 border-accent-start hidden md:block"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "rgba(0, 242, 254, 0.2)" : "transparent",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />
      {/* Soft trailing glow */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 rounded-full mix-blend-screen pointer-events-none z-[9998] opacity-30 blur-[40px] hidden md:block"
        style={{
          background: 'radial-gradient(circle, #00f2fe 0%, transparent 70%)'
        }}
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.4 }}
      />
    </>
  );
};

export default CustomCursor;
