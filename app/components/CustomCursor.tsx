'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on fine pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor], input, textarea');
      if (interactive) {
        setIsHovered(true);
        const customText = interactive.getAttribute('data-cursor-text') || '';
        setCursorText(customText);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/40 mix-blend-difference flex items-center justify-center font-mono text-[9px] uppercase tracking-wider text-white font-medium"
        animate={{
          x: mousePosition.x - (isHovered ? (cursorText ? 44 : 28) : 16),
          y: mousePosition.y - (isHovered ? (cursorText ? 44 : 28) : 16),
          width: isHovered ? (cursorText ? 88 : 56) : 32,
          height: isHovered ? (cursorText ? 88 : 56) : 32,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.02)',
          borderColor: isHovered ? 'rgba(212, 163, 89, 0.8)' : 'rgba(255, 255, 255, 0.35)',
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 300,
          mass: 0.5,
        }}
      >
        {cursorText && (
          <span className="text-[#d4a359] font-bold text-[10px] tracking-widest animate-pulse">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Pin Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#d4a359] mix-blend-difference"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovered ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 600,
        }}
      />
    </div>
  );
}
