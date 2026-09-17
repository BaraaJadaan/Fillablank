'use client';

import { useState } from 'react';
import IntroSplash from './components/IntroSplash';
import Navbar from './components/Navbar';
import HeroBackground from './components/HeroBackground';
import Hero from './components/Hero';
import HowWeSprint from './components/HowWeSprint';
import SelectedCases from './components/SelectedCases';
import MasterworkSection from './components/MasterworkSection';
import Manifesto from './components/Manifesto';
import ContactFooter from './components/ContactFooter';

export default function Home() {
  const [introCompleted, setIntroCompleted] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#0a0a0c] text-[#f4f3ef] overflow-x-hidden selection:bg-[#d4a359] selection:text-[#0a0a0c]">
      {/* Brand Splash Screen with company-porto physics */}
      {!introCompleted && (
        <IntroSplash onComplete={() => setIntroCompleted(true)} />
      )}

      {/* Sticky Navbar with Interactive Logo Replay */}
      <Navbar />

      {/* Page-level Celestial Canvas Background — Fades out when 'Why we refuse' appears */}
      <HeroBackground />

      {/* 1. Hero: The Blank Canvas */}
      <Hero />

      {/* 2. Studio Manifesto & Ethos */}
      <Manifesto />

      {/* 3. The 4-Phase Sprint Cycle */}
      <HowWeSprint />

      {/* 4. Selected Cases */}
      <SelectedCases />

      {/* 5. The Masterwork Unveiling */}
      <MasterworkSection />

      {/* 6. Let's Connect & Editorial Footer */}
      <ContactFooter />
    </main>
  );
}
