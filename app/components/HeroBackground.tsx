'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';

export default function HeroBackground() {
  const bgOpacity = useMotionValue(1);

  // Subtle parallax shift while scrolling
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], ['0%', '8%']);

  useEffect(() => {
    const updateOpacity = () => {
      const headline = document.getElementById('why-we-refuse');
      if (!headline) return;

      const rect = headline.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // The exact moment the top of "Why we refuse" enters the viewport from the bottom
      const fadeStart = windowHeight;
      // Completely faded away once "Why we refuse" reaches 35% from the top
      const fadeEnd = windowHeight * 0.35;

      if (rect.top >= fadeStart) {
        // Not yet in viewport: keep 100% full vibrant opacity
        bgOpacity.set(1);
      } else if (rect.top <= fadeEnd) {
        // Scrolled past the target threshold: fully faded
        bgOpacity.set(0);
      } else {
        // Smooth fade as it scrolls into the viewport
        const rawProgress = (fadeStart - rect.top) / (fadeStart - fadeEnd);
        // Smoothstep easing (3x^2 - 2x^3) for seamless optical fade
        const progress = rawProgress * rawProgress * (3 - 2 * rawProgress);
        bgOpacity.set(Math.max(0, Math.min(1, 1 - progress)));
      }
    };

    // Run initial sync on mount
    updateOpacity();

    // Listen to native scroll and resize
    window.addEventListener('scroll', updateOpacity, { passive: true });
    window.addEventListener('resize', updateOpacity, { passive: true });

    // Sync with Lenis smooth scroll if available
    const lenis = (window as unknown as {
      lenis?: {
        on: (event: string, cb: () => void) => void;
        off: (event: string, cb: () => void) => void;
      };
    }).lenis;

    if (lenis) {
      lenis.on('scroll', updateOpacity);
    }

    return () => {
      window.removeEventListener('scroll', updateOpacity);
      window.removeEventListener('resize', updateOpacity);
      if (lenis) {
        lenis.off('scroll', updateOpacity);
      }
    };
  }, [bgOpacity]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity: bgOpacity }}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none will-change-[opacity]"
    >
      {/* Background Image with slight vertical buffer for parallax drift */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -inset-x-0 -top-[10%] h-[120%] w-full"
      >
        <Image
          src="/paintings/hero-canvas.webp"
          alt="Genesis of Execution — Celestial Fine-Art Canvas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.85] contrast-[1.08] saturate-[1.28]"
        />
      </motion.div>

      {/* Soft, Transparent Scrims Preserving Vibrant Colors */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c]/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/70 via-[#0a0a0c]/20 to-transparent" />
    </motion.div>
  );
}
