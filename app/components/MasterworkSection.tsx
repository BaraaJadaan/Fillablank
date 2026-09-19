'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function MasterworkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const paintingRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create master pinned timeline for the emergence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
          anticipatePin: 0,
          invalidateOnRefresh: true,
        },
      });

      // 1. Initial State: ONLY "From a Blank Canvas" is visible.
      // Painting is hidden (0% radius, 0 opacity).
      // line2 ("To Enduring Masterpiece"), description, and badge are all opacity: 0.

      // 2. Painting begins blooming from behind the center of "From a Blank Canvas"
      tl.fromTo(
        paintingRef.current,
        {
          clipPath: 'circle(0% at 50% 50%)',
          scale: 1.25,
          opacity: 0,
        },
        {
          clipPath: 'circle(140% at 50% 50%)',
          scale: 1,
          opacity: 1,
          ease: 'power2.inOut',
          duration: 2.4,
        },
        0
      )
      // Step A: "To Enduring Masterpiece" appears with the painting
      .fromTo(
        line2Ref.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.7,
        },
        0.5
      )
      // Step B: Then the white description text emerges
      .fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.7,
        },
        1.1
      )
      // Step C: Then the top badge "✦ Act IV: The Masterwork Unveiling ✦" appears
      .fromTo(
        badgeRef.current,
        {
          opacity: 0,
          y: -10,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.6,
        },
        1.6
      )
      // Rest buffer so visitor can absorb the final masterwork before unpinning
      .to({}, { duration: 0.4 });

      return () => {
        tl.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="masterwork"
      ref={sectionRef}
      className="relative h-screen w-full bg-[#0a0a0c] text-[#f4f3ef] overflow-hidden flex items-center justify-center border-b border-white/[0.08]"
    >
      {/* 1. THE EMERGING FINE-ART CANVAS — Positioned slightly UP so faces are clear of text */}
      <div
        ref={paintingRef}
        className="absolute -top-12 sm:-top-16 -bottom-12 sm:-bottom-16 inset-x-0 z-10 overflow-hidden pointer-events-none will-change-transform"
        style={{
          clipPath: 'circle(0% at 50% 50%)',
          opacity: 0,
        }}
      >
        <Image
          src="/paintings/masterwork.webp"
          alt="The Masterwork Unveiling — Classical Baroque Canvas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top filter saturate-[1.10] contrast-[1.08]"
        />
        {/* Soft, Transparent Vignette Preserving Luminous Colors — NO BLUR */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/85 via-transparent to-[#0a0a0c]/40" />
      </div>

      {/* 2. PINNED EDITORIAL TYPOGRAPHY — Positioned DOWN slightly so faces remain in full view */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-10 text-center flex flex-col items-center justify-center pt-24 sm:pt-32 md:pt-36 h-full">
        {/* Top Story Arc Badge — Appears last as user scrolls */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-3 font-mono text-xs uppercase text-[#d4a359] mb-8 bg-black/60 px-4 py-1.5 border border-white/10 rounded-sm"
          style={{ opacity: 0 }}
        >
          <span>✦</span>
          <span>Act IV: The Masterwork Unveiling</span>
          <span>✦</span>
        </div>

        {/* The Pinned Headline */}
        <div className="space-y-4 will-change-transform">
          <h2 className="font-tusker text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6rem] font-semibold tracking-normal uppercase leading-[0.92] text-[#f4f3ef] drop-shadow-[0_12px_24px_rgba(0,0,0,0.95)]">
            {/* Initially ONLY this line appears */}
            <span ref={line1Ref} className="block">
              From a Blank Canvas
            </span>
            {/* Appears as scrolling with the painting */}
            <span
              ref={line2Ref}
              className="block text-[#d4a359]"
              style={{ opacity: 0 }}
            >
              To Enduring Masterpiece.
            </span>
          </h2>
        </div>

        {/* Narrative Subtitle without any background box — Appears after headline */}
        <div
          ref={subtitleRef}
          className="mt-8 max-w-2xl mx-auto"
          style={{ opacity: 0 }}
        >
          <p className="font-display text-sm sm:text-base md:text-lg text-[#f4f3ef] leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            When you bring your vision to Fillablank, you don&apos;t receive an outsourced commodity. You walk away with an enterprise-grade product built on clean architecture, extreme performance, and bespoke craftsmanship that stands apart.
          </p>
        </div>
      </div>
    </section>
  );
}
