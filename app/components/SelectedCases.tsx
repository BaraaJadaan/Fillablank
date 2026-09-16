'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import CurvedArrow from './ui/CurvedArrow';

export interface ProjectCase {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  links?: {
    demo?: string;
  };
  challenge: string;
  architecture: string;
  solution: string;
  impact: string;
  client: string;
  timeline: string;
}

export const curatedCases: ProjectCase[] = [
  {
    id: 'lumytic',
    title: 'LUMYTIC ERP',
    category: 'Web Architecture / Enterprise ERP Showcase',
    tagline: 'A BESPOKE CINEMATIC PLATFORM TRANSLATING COMPLEX ERP ARCHITECTURE INTO HIGH-CONVERTING ENTERPRISE DEMOS.',
    description:
      'Cinematic presentation website for Lumytic ERP software with cutting-edge visual hierarchy, fluid micro-interactions, and high-performance rendering.',
    image: '/projects/lumytic.png',
    imageAlt: 'Lumytic ERP software presentation showcase and interface',
    tags: ['React', 'GSAP Motion', 'Advanced CSS', 'Next.js'],
    links: {
      demo: 'https://lumytic.com/',
    },
    challenge:
      'Traditional enterprise ERP platforms suffer from dated, clinical presentations that fail to excite prospective enterprise buyers. Lumytic required a breathtaking, motion-rich presentation website that translates complex operational software into an irresistible value proposition.',
    architecture:
      'Built with Next.js and custom GSAP timelines orchestrated for 60fps rendering across desktop and mobile. Implemented responsive viewport transforms, bespoke SVG physics, and asset pre-caching.',
    solution:
      'We engineered an interactive product tour featuring dynamic UI choreography, fluid state transitions, and responsive typography that establishes Lumytic as a tier-one enterprise solution.',
    impact: '400% surge in enterprise pipeline inquiries and executive demos.',
    client: 'Lumytic Systems',
    timeline: '4-Week Sprint',
  },
  {
    id: 'rafik-darbak',
    title: 'RAFIK DARBAK',
    category: 'Mobile Systems / Ride-Sharing Network',
    tagline: 'A RESILIENT RIDE-SHARING NETWORK OVERCOMING LOW-BANDWIDTH CONSTRAINTS WITH OFFLINE-FIRST ARCHITECTURE.',
    description:
      'The premier ride-sharing application designed for the Syrian market, overcoming low-bandwidth constraints with offline-first data caching and resilient geospatial tracking.',
    image: '/projects/rafik-darbak.png',
    imageAlt: 'Rafik Darbak ride-sharing mobile application interface',
    tags: ['Flutter', 'Supabase', 'Offline-First', 'SQLite'],
    links: {
      demo: 'https://play.google.com/store/apps/details?id=com.saveride.app',
    },
    challenge:
      'Mobile internet in Syria experiences frequent dropouts and bandwidth throttling. Standard off-the-shelf ride-hailing software fails under intermittent connectivity, causing ghost rides, lost driver dispatches, and rider abandonment.',
    architecture:
      'Constructed a custom offline-first synchronization engine atop Flutter and SQLite. Driver locations are throttled intelligently and queued locally when connections drop, then synced with Supabase WebSockets upon reconnection.',
    solution:
      'Delivered a responsive cross-platform Flutter ecosystem (Rider & Driver apps) with sub-second driver matching and real-time mapping optimized for low data consumption.',
    impact: '50,000+ completed rides across Damascus with 99.8% dispatch reliability.',
    client: 'Rafik Darbak Ltd.',
    timeline: '6-Week Sprint',
  },
  {
    id: 'jumlatech',
    title: 'JUMLATECH',
    category: 'Enterprise Backbone / B2B Wholesale ERP',
    tagline: 'AN INTEGRATED DIGITAL TRADE ECOSYSTEM MERGING CUSTOM ODOO ERP WITH WHOLESALE LOGISTICS APPS.',
    description:
      'Integrated digital trade ecosystem bridging the gap between wholesale suppliers and FMCG retailers, merging a custom Odoo ERP backbone with specialized mobile apps.',
    image: '/projects/jumlatech.png',
    imageAlt: 'JumlaTech B2B supply chain ecosystem and mobile app',
    tags: ['Odoo Enterprise', 'Python', 'PostgreSQL', 'Flutter Mobile'],
    links: {
      demo: 'https://play.google.com/store/apps/details?id=com.tms.jumlatech&hl=ar',
    },
    challenge:
      'Wholesale FMCG distribution in the region relied on paper invoices, manual ledger entry, and phone-based orders, leading to severe warehouse stockouts and reconciliation disputes.',
    architecture:
      'Engineered a multi-tenant Odoo ERP backbone connected via REST and WebSockets to custom Flutter mobile applications for retailer ordering and warehouse pick-pack workflows.',
    solution:
      'Automated inventory allocation, real-time pricing tiers, automated credit limit checks, and digital proof-of-delivery signatures across all active fulfillment routes.',
    impact: '$2M+ monthly wholesale GMV processed with 0 inventory desync.',
    client: 'JumlaTech Distribution',
    timeline: '8-Week Sprint',
  },
  {
    id: 'archibest',
    title: 'ARCHIBEST',
    category: 'Web Architecture / Architecture Showcase',
    tagline: 'AN ARCHITECTURAL PLATFORM CONNECTING GLOBAL TALENT WITH JURIES FROM FOSTER + PARTNERS, ZHA, AND BIG.',
    description:
      'Global architectural competition platform connecting international architects and universities with prestigious juries from Foster + Partners, ZHA, and BIG.',
    image: '/projects/archibest.png',
    imageAlt: 'Archibest Competitions global architecture showcase',
    tags: ['Next.js', 'PostgreSQL', 'Stripe Global', 'Cloudflare'],
    links: {
      demo: 'https://archibestcompetitions.com',
    },
    challenge:
      'International competition deadlines generate massive traffic spikes with thousands of architects uploading multi-gigabyte portfolio packages simultaneously.',
    architecture:
      'Built with Next.js edge caching and direct-to-S3 multi-part resumable uploads. Jury evaluation scoring algorithms feature cryptographic blind reviews to guarantee complete impartiality.',
    solution:
      'A sleek, minimalist digital gallery presenting architectural briefs, jury profiles, multi-stage submission flows, and global voting leaderboards.',
    impact: '12,000+ architects from 80+ countries engaged across 14 major challenges.',
    client: 'Archibest Platform',
    timeline: '5-Week Sprint',
  },
  {
    id: 'alsharq-bank',
    title: 'ALSHARQ BANK',
    category: 'FinTech / Core Security & Banking',
    tagline: 'MISSION-CRITICAL FINANCIAL CORE POWERING ENTERPRISE ACCOUNT MANAGEMENT WITH ZERO DOWNTIME.',
    description:
      'Mission-critical financial infrastructure powering online account management, corporate bill payment APIs, and real-time transaction audit logs.',
    image: '/projects/alsharq-bank.png',
    imageAlt: 'Alsharq Bank e-banking microservices dashboard',
    tags: ['Python', 'Flask', 'Docker', 'Core Security', 'PostgreSQL'],
    challenge:
      'Modernizing legacy banking cores requires bulletproof isolation, zero downtime, strict PCI-DSS compliance, and airtight encryption without hindering transaction speed.',
    architecture:
      'Decoupled microservice architecture utilizing HMAC-signed tokens, automated double-entry ledger verification, and automated penetration testing harnesses.',
    solution:
      'Delivered high-throughput microservices handling customer authentication, scheduled payment execution, and continuous ledger audits.',
    impact: '99.999% uptime across critical transaction flows with 0 compliance violations.',
    client: 'Alsharq Banking Group',
    timeline: '10-Week Sprint',
  },
  {
    id: 'enterprise-isp',
    title: 'ENTERPRISE ISP',
    category: 'Network Systems / Telecommunications',
    tagline: 'A FIBER MANAGEMENT PLATFORM ORCHESTRATING NETWORK INFRASTRUCTURE AND LIVE HARDWARE DIAGNOSTICS.',
    description:
      'Full-stack management system orchestrating fiber network infrastructure, customer subscriptions, campaign pricing, and real-time router diagnostics via TR-069.',
    image: '/projects/enterprise-isp.png',
    imageAlt: 'Enterprise ISP network infrastructure and diagnostic dashboard',
    tags: ['React', '.NET Core', 'TR-069 ACS', 'SQL Server'],
    challenge:
      'Managing thousands of fiber switches, OLT ports, and customer optical terminals created immense support bottlenecks during network anomalies.',
    architecture:
      'Engineered an event-driven .NET Core backend communicating with network hardware via TR-069, coupled with a reactive TypeScript dashboard showing live signal degradation and telemetry.',
    solution:
      'A unified command center allowing tier-1 support agents to diagnose and resolve WiFi signal and fiber port issues without dispatching field technicians.',
    impact: '65% drop in field truck rolls and sub-10 second diagnostic times.',
    client: 'National Fiber Telecom',
    timeline: '8-Week Sprint',
  },
];

export default function SelectedCases() {
  const [selectedCase, setSelectedCase] = useState<ProjectCase | null>(null);

  // Prevent background body scrolling while deep-dive view is active
  useEffect(() => {
    if (selectedCase) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCase]);

  return (
    <section
      id="cases"
      className="relative py-28 md:py-36 bg-[#0a0a0c] text-[#f4f3ef] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Patrick David Authentic Header */}
        <div className="flex items-center gap-3 font-mono text-sm uppercase tracking-[0.25em] text-[#f4f3ef] mb-16 pb-6 border-b border-white/[0.08]">
          <span className="text-[#d4a359] text-lg">✦</span>
          <span className="font-semibold">SELECTED CASES</span>
        </div>

        {/* Alternating Project Rows (Title + Stack on one side, Horizontal image strip on the other) */}
        <div className="divide-y divide-white/[0.08]">
          {curatedCases.map((item, idx) => {
            const isImageOnRight = idx % 2 === 0;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedCase(item)}
                className="group cursor-pointer py-12 md:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-16 justify-between transition-colors duration-300"
                data-cursor-text="Inspect"
              >
                {isImageOnRight ? (
                  <>
                    {/* Left: Project Title & Stack */}
                    <div className="flex-1 w-full text-left space-y-3">
                      <h3 className="font-tusker text-5xl sm:text-7xl md:text-8xl font-semibold tracking-normal uppercase text-[#f4f3ef] group-hover:text-[#d4a359] transition-colors leading-[0.9]">
                        {item.title}
                      </h3>
                      <p className="font-mono text-xs sm:text-sm tracking-wider uppercase text-[#8e8e93]">
                        {item.tags.join(', ')}
                      </p>
                    </div>

                    {/* Right: Horizontal Image Strip */}
                    <div className="w-full md:w-[48%] relative aspect-[16/9] overflow-hidden rounded-sm border border-white/10 group-hover:border-white/30 transition-all duration-500 shadow-xl">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Left: Horizontal Image Strip */}
                    <div className="w-full md:w-[48%] relative aspect-[16/9] overflow-hidden rounded-sm border border-white/10 group-hover:border-white/30 transition-all duration-500 shadow-xl order-2 md:order-1">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                    </div>

                    {/* Right: Project Title & Stack */}
                    <div className="flex-1 w-full text-left space-y-3 order-1 md:order-2">
                      <h3 className="font-tusker text-5xl sm:text-7xl md:text-8xl font-semibold tracking-normal uppercase text-[#f4f3ef] group-hover:text-[#d4a359] transition-colors leading-[0.9]">
                        {item.title}
                      </h3>
                      <p className="font-mono text-xs sm:text-sm tracking-wider uppercase text-[#8e8e93]">
                        {item.tags.join(', ')}
                      </p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FULL-CANVAS INTERACTIVE EXPANDER (Matching Patrick David Reference Image) */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0c] overflow-y-auto flex flex-col justify-between"
          >
            {/* 1. Full-Bleed Fine-Art Canvas Background — Luminous & Sharp (NO BLUR) */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
              <Image
                src="/paintings/hero-canvas.webp"
                alt="Classical Painting Backdrop"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center filter brightness-[0.60] contrast-[1.10] saturate-[1.25]"
              />
              {/* Soft Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/40 to-[#0a0a0c]/80" />
            </div>

            {/* 2. Top Bar with Hand-Drawn Back Arrow */}
            <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-7xl mx-auto w-full">
              <button
                onClick={() => setSelectedCase(null)}
                className="group inline-flex items-center gap-4 text-[#d4a359] hover:text-[#e8be78] transition-colors cursor-pointer focus:outline-none"
                aria-label="Return to selected cases"
              >
                <div className="w-12 h-6 flex items-center justify-center">
                  <CurvedArrow direction="back" className="w-10 h-5 text-current transition-transform group-hover:-translate-x-1" />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-current">
                  Back to Cases
                </span>
              </button>
            </div>

            {/* 3. Main Split Stage: Text on Left, Transitioned Image on Right */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-12 w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-14 my-auto">
              {/* Left Column: Title, Bold Tagline, Story Details */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="w-full lg:w-1/2 space-y-6 text-left"
              >
                {/* Project Title in Tusker Grotesk 2600Semibold */}
                <h2 className="font-tusker text-5xl sm:text-7xl md:text-8xl font-semibold tracking-normal uppercase text-[#f4f3ef] leading-[0.9]">
                  {selectedCase.title}
                </h2>

                {/* Bold Patrick David Style Uppercase Tagline */}
                <p className="font-tusker text-lg sm:text-xl md:text-2xl text-[#f4f3ef] uppercase tracking-normal leading-snug max-w-lg font-semibold">
                  {selectedCase.tagline}
                </p>

                {/* Narrative Summary */}
                <p className="font-display text-sm sm:text-base text-[#f4f3ef]/85 leading-relaxed max-w-lg font-normal">
                  {selectedCase.description}
                </p>

                {/* Impact Metric Callout */}
                <div className="inline-block bg-black/70 border border-white/15 px-4 py-2.5 rounded-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#d4a359] block mb-0.5">
                    Verified Outcome
                  </span>
                  <span className="font-display text-sm font-medium text-[#f4f3ef]">
                    {selectedCase.impact}
                  </span>
                </div>
              </motion.div>

              {/* Right Column: Project Image Transitioned to Right Half */}
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full lg:w-[50%] relative aspect-[16/10] rounded-sm overflow-hidden border border-white/20 shadow-2xl"
              >
                <Image
                  src={selectedCase.image}
                  alt={selectedCase.imageAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </motion.div>
            </div>

            {/* 4. Bottom Divider Bar with Stack Disciplines & "see case ↗" */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-12 w-full pb-8 pt-6">
              <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
                {/* Left: Stack & Key Disciplines */}
                <div className="text-[#8e8e93] flex items-center gap-3">
                  <span className="text-[#f4f3ef] font-medium">{selectedCase.tags.join(', ')}</span>
                  <span>•</span>
                  <span className="text-[#d4a359]">{selectedCase.client}</span>
                </div>

                {/* Right: "see case ↗" Link or Close Button */}
                {selectedCase.links?.demo ? (
                  <a
                    href={selectedCase.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#f4f3ef] hover:text-[#d4a359] transition-colors py-1 group"
                  >
                    <span className="border-b border-white/40 group-hover:border-[#d4a359] pb-0.5">
                      see case
                    </span>
                    <span className="text-base">↗</span>
                  </a>
                ) : (
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="text-[#8e8e93] hover:text-white transition-colors"
                  >
                    [ close case ]
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
