'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import CurvedArrow from './ui/CurvedArrow';
import MagneticButton from './ui/MagneticButton';
import Marquee from './ui/Marquee';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const bgDarkness = useTransform(scrollYProgress, [0, 0.85], [0, 0.95]);
  const bgOpacity = useTransform(scrollYProgress, [0.65, 1], [1, 0.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const handleScrollToCases = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: string) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo('#cases');
    } else {
      document.querySelector('#cases')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-16 overflow-hidden flex flex-col justify-between bg-[#0a0a0c]"
    >
      {/* 1. Immersive Full-Bleed Fine-Art Background — Vibrant, Parallax, Darkening on Scroll */}
      <motion.div
        style={{ y: bgY, opacity: bgOpacity }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <Image
          src="/paintings/hero-canvas.webp"
          alt="Genesis of Execution — Celestial Fine-Art Canvas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.85] contrast-[1.08] saturate-[1.28] scale-105"
        />
        {/* Soft, Transparent Scrims Preserving Vibrant Colors */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/70 via-[#0a0a0c]/20 to-transparent" />
        {/* Progressive Darkening Overlay Fading Into Next Section */}
        <motion.div
          style={{ opacity: bgDarkness }}
          className="absolute inset-0 bg-[#0a0a0c] pointer-events-none"
        />
      </motion.div>

      {/* 2. Foreground Content — Monumental Editorial Canvas */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10 flex-1 flex flex-col justify-center my-auto">
        <motion.div style={{ y: textY, opacity }} className="space-y-8">
          {/* Subtle Story Arc Plate Indicator */}
          <div className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#d4a359] bg-black/60 px-3.5 py-1.5 border border-white/10 rounded-sm">
            <span>✦</span>
              <span>Act I: The Blank Canvas</span>
            <span>✦</span>
          </div>

          {/* Monumental Headline in Tusker Grotesk */}
          <h1 className="font-tusker text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] font-semibold leading-[0.97] tracking-normal text-[#f4f3ef] uppercase ">
            We turn the ambitious   
            <span>
              {` `}
            </span>
            <span className="text-[#f4f3ef]">
              blank canvas
            </span>
            <br />
            into high-performance
            <br />
            <span className="text-[#d4a359]">digital reality.</span>
          </h1>

          {/* Editorial Subtitle in Neue Montreal */}
          <p className="max-w-2xl text-base sm:text-xl text-[#f4f3ef]/85 font-normal leading-relaxed pt-2 font-display">
            A focused studio of elite builders. We engineer mission-critical mobile systems, bespoke web platforms, and custom ERP backbones with zero compromise.
          </p>

          {/* Signature Marquee CTA Button */}
          <div className="pt-6 flex flex-wrap items-center gap-8">
            <MagneticButton
              id="hero-explore-cta"
              onClick={handleScrollToCases}
              strength={0.35}
              className="btn-marquee group px-8 py-5 bg-[#d4a359] hover:bg-[#f4f3ef] text-[#0a0a0c] border border-transparent shadow-xl transition-all duration-300 rounded-sm"
              data-cursor-text="Cases"
            >
              <span className="btn-label font-tusker text-lg sm:text-xl tracking-wider uppercase flex items-center gap-4">
                <span>Explore Selected Cases</span>
                <CurvedArrow direction="forward" className="w-8 h-4 text-current" />
              </span>

              {/* Hover Scrolling Marquee Track */}
              <div className="marquee-track font-tusker text-base tracking-widest text-[#0a0a0c]">
                <div className="flex gap-6 animate-marquee whitespace-nowrap">
                  <span>SELECTED CASES ✦ EXPLORE WORKS ✦ SELECTED CASES ✦ EXPLORE WORKS</span>
                </div>
              </div>
            </MagneticButton>

            <a
              id="hero-sprint-link"
              href="#sprint"
              className="font-mono text-xs uppercase tracking-[0.2em] text-[#8e8e93] hover:text-[#f4f3ef] transition-colors flex items-center gap-2 py-3"
            >
              <span>4-Phase Sprint Cycle</span>
              <span>↓</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* 3. Subtle Marquee Ticker at the bottom */}
      <div className="relative z-10 border-t border-white/[0.08] pt-4 bg-[#0a0a0c]/80">
        <Marquee speed={30} className="font-mono text-xs uppercase tracking-[0.25em] text-[#8e8e93]">
          <span className="flex items-center gap-6">
            <span className="text-[#d4a359]">✦</span> NEXT.JS 16 ARCHITECTURE
            <span className="text-[#d4a359]">✦</span> FLUTTER MOBILE ECOSYSTEMS
            <span className="text-[#d4a359]">✦</span> ODOO ERP BACKBONES
            <span className="text-[#d4a359]">✦</span> GSAP HIGH-VELOCITY MOTION
            <span className="text-[#d4a359]">✦</span> DISTRIBUTED MICROSERVICES
            <span className="text-[#d4a359]">✦</span> BESPOKE DESIGN SYSTEMS
          </span>
        </Marquee>
      </div>
    </section>
  );
}
