'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroText from './HeroText';

export default function Navbar() {
  const [replayTrigger, setReplayTrigger] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isInSprint, setIsInSprint] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sprintEl = document.getElementById('sprint');
      if (sprintEl) {
        const rect = sprintEl.getBoundingClientRect();
        // In sprint when top has reached navbar (<= 60) and bottom is still below navbar (>= 60)
        const inSprint = rect.top <= 60 && rect.bottom >= 60;
        setIsInSprint(inSprint);
      } else {
        setIsInSprint(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    const lenis = (window as unknown as {
      lenis?: {
        on: (event: string, cb: () => void) => void;
        off: (event: string, cb: () => void) => void;
      };
    }).lenis;

    if (lenis) {
      lenis.on('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (lenis) {
        lenis.off('scroll', handleScroll);
      }
    };
  }, []);

  const handleLogoClick = () => {
    // 1. Smooth scroll to top via Lenis if available
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: string | number) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 2. Replay brand typing, smash, and stitch animation
    setReplayTrigger((prev) => prev + 1);
  };

  const navLinks = [
    { label: '01. Manifesto', href: '#manifesto' },
    { label: '02. The Sprint', href: '#sprint' },
    { label: '03. Selected Cases', href: '#cases' },
    { label: '04. Masterwork', href: '#masterwork' },
    { label: '05. Connect', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;

    const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(target);
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent ${
        isInSprint ? 'backdrop-blur-none' : 'backdrop-blur-[2px]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-12 sm:h-11 flex items-center justify-between">
        {/* Left: Brand Logo with Interactive Click Replay */}
        <button
          id="navbar-logo-button"
          onClick={handleLogoClick}
          className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
          aria-label="Fillablank Studio - Scroll to top and replay brand animation"
          data-cursor-text="Top"
        >
          <div className="relative text-[#d4a359] shrink-0 transition-colors duration-300 group-hover:text-[#f4f3ef]">
            <svg width="22" height="22" viewBox="0 0 44 44" fill="none">
              <path
                d="M14,4 L4,4 L4,40 L14,40"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d="M30,4 L40,4 L40,40 L30,40"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <rect
                x="15"
                y="19"
                width="14"
                height="4"
                rx="2"
                fill="currentColor"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* Exact company-porto typing, dropping, smashing, stitching animation */}
          <HeroText replayTrigger={replayTrigger} className="my-0" />
        </button>

        {/* Desktop Editorial Navigation Index */}
        <nav className="hidden lg:flex items-center gap-8 font-mono text-[13px] tracking-wider text-[#8e8e93]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="hover:text-[#f4f3ef] transition-colors relative py-1 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4a359] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Action: Availability Status & Fast Inquiry Trigger */}
        <div className="hidden sm:flex items-center gap-5">
          <a
            id="navbar-cta-button"
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="font-mono text-xs uppercase tracking-widest px-4 py-2 border border-[#d4a359]/40 hover:border-[#d4a359] text-[#f4f3ef] hover:bg-[#d4a359] hover:text-[#0a0a0c] transition-all duration-300 rounded-sm"
          >
            Say Hi!
          </a>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          id="mobile-menu-trigger"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#f4f3ef] hover:text-[#d4a359] focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-current transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 /* unslop-ignore */ }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-[#0a0a0c] border-b border-white/[0.08] px-6 py-8"
        >
          <div className="flex flex-col gap-6 font-mono text-sm uppercase tracking-widest text-[#8e8e93]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="hover:text-[#d4a359] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available Q2/Q3
              </span>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="text-xs uppercase px-4 py-2 bg-[#d4a359] text-[#0a0a0c] font-bold"
              >
                Let&apos;s Build
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
