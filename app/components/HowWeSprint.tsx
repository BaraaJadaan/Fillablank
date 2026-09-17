'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const phases = [
  {
    num: '01',
    plateNumber: 'Plate No. 02',
    act: 'Act II: Architectural Genesis',
    name: 'The Rendezvous',
    tagline: 'Strategic Architecture & Alignment',
    image: '/paintings/sprint/01-rendezvous.webp',
    desc: 'We strip away agency bureaucracy. Every bi-weekly cycle kicks off with a focused strategic summit between founders and engineering leads. We define technical boundaries, crystallize requirements, and lock down production milestones with zero ambiguity.',
  },
  {
    num: '02',
    plateNumber: 'Plate No. 03',
    act: 'Act III: Core Combustion',
    name: 'The Silence',
    tagline: 'Uninterrupted Deep Engineering',
    image: '/paintings/sprint/02-silence.webp',
    desc: 'Real breakthrough software requires intense, uninterrupted concentration. No endless Slack pings, no redundant status calls. Our senior builders enter deep execution mode—crafting clean architecture, high-velocity frontend flows, and robust backend logic.',
  },
  {
    num: '03',
    plateNumber: 'Plate No. 04',
    act: 'Act IV: Hardening & Audits',
    name: 'The Exhibition',
    tagline: 'Interactive Preview & Critical Review',
    image: '/paintings/sprint/03-exhibition.webp',
    desc: "We don't deliver static mockups or PDFs. We unveil live, interactive staging environments. You test real physics, live data pipelines, and responsive screens in your own hands. We dissect what works, validate edge cases, and gather surgical feedback.",
  },
  {
    num: '04',
    plateNumber: 'Plate No. 05',
    act: 'Act V: Production Launch',
    name: 'The Alterations',
    tagline: 'Hardening, Refinement & Production Launch',
    image: '/paintings/sprint/04-alterations.webp',
    desc: 'The difference between good software and iconic digital products is in the final 10%. We stress-test load capacities, refine micro-interactions to sub-pixel perfection, optimize Core Web Vitals, and ship directly to production.',
  },
];

export default function HowWeSprint() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const section = sectionRef.current;
      if (!container || !section) return;

      const getTotalScroll = () => container.scrollWidth - window.innerWidth;

      // Master horizontal scrub with clean 1:1 progression and no dead end scroll
      const scrubTween = gsap.to(container, {
        x: () => -getTotalScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getTotalScroll()}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              phases.length - 1,
              Math.floor(self.progress * phases.length)
            );
            setActivePhaseIndex(index);
          },
        },
      });

      return () => {
        scrubTween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sprint"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#0a0a0c] text-[#f4f3ef] border-b border-white/[0.08]"
    >
      {/* Top Fixed Navigation / Phase Counter */}
      

      {/* Horizontal Scrub Panels Container — Single GPU transformed wrapper */}
      <div
        ref={containerRef}
        className="flex h-full w-[400vw] will-change-transform"
      >
        {phases.map((phase, index) => (
          <div
            key={phase.num}
            className="sprint-panel relative flex h-full w-screen shrink-0 items-end justify-start px-8 sm:px-16 md:px-24 pb-20 pt-32 overflow-hidden"
          >
            {/* FULLSCREEN IMMERSIVE PAINTING BACKGROUND — Luminous & Sharp (NO BLUR) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={phase.image}
                alt={`${phase.name} — Classical Sprint Background`}
                fill
                priority={index === 0}
                sizes="100vw"
                className={`object-cover object-[center_45%] filter brightness-[0.84] contrast-[1.08] saturate-[1.28] ${
                  index === 0 || index === 2 ? 'scale-x-[-1]' : ''
                }`}
              />
              {/* Soft Directional Gradients at bottom-left preserving characters and faces */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/90 via-[#0a0a0c]/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/85 via-[#0a0a0c]/20 to-transparent" />
            </div>

            {/* FOREGROUND CONTENT — Clean Editorial Typography, NO BLACK BACKGROUND BOX */}
            <div className="relative z-10 max-w-2xl text-left space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase  text-[#d4a359] bg-black/60 px-3.5 py-1.5 border border-white/10 rounded-sm">
                <span>✦</span>
                <span>{phase.act}</span>
                <span>✦</span>
              </div>

              {/* Monumental Phase Title in Balanced Tusker Grotesk */}
              <h3 className="font-tusker text-5xl sm:text-7xl md:text-8xl font-semibold tracking-normal text-[#f4f3ef] uppercase leading-[0.9] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                {phase.name}
              </h3>

              {/* Tagline */}
              <p className="font-display text-lg sm:text-2xl text-[#e8be78] font-medium tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {phase.tagline}
              </p>

              {/* Copy */}
              <p className="font-display text-sm sm:text-base text-[#f4f3ef]/90 leading-relaxed max-w-xl font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {phase.desc}
              </p>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
