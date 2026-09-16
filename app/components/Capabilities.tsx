'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  deliverables: string[];
}

const capabilities: CapabilityItem[] = [
  {
    id: 'web',
    number: '01',
    title: 'High-Performance Web Platforms',
    subtitle: 'Next.js, React 19, GSAP & Distributed Systems',
    description:
      'We construct lightning-fast web applications engineered for complex workflows, sub-second latency, and fluid interaction physics. Every layout is handcrafted without off-the-shelf template bloat.',
    stack: ['Next.js 16', 'React 19', 'GSAP Motion', 'Tailwind v4', 'Edge Runtime', 'TypeScript'],
    deliverables: ['Custom Web Applications', 'Founder Portals & SaaS', 'Interactive Editorial Experiences', 'Core Web Vitals Perfection'],
  },
  {
    id: 'mobile',
    number: '02',
    title: 'Mission-Critical Mobile Systems',
    subtitle: 'Flutter, React Native & Offline-First Architecture',
    description:
      'Robust mobile applications designed to perform flawlessly in high-friction environments. From Syrian ride-sharing networks with intermittent connectivity to enterprise field apps, we build resilient offline-first data sync.',
    stack: ['Flutter', 'React Native', 'Supabase', 'SQLite Local Persistence', 'WebSockets', 'TR-069'],
    deliverables: ['iOS & Android Native Builds', 'Realtime Geospatial Tracking', 'Hardware & Router Integrations', 'Offline Sync Engines'],
  },
  {
    id: 'erp',
    number: '03',
    title: 'Custom Enterprise Backbones & ERP',
    subtitle: 'Odoo, Python Microservices & Supply Chains',
    description:
      'Enterprise operations need custom software tailored to their exact business logic, not rigid commercial boxes. We develop and customize Odoo ecosystems, microservices, and inventory pipelines that scale alongside your balance sheet.',
    stack: ['Odoo Enterprise', 'Python', 'Flask / FastAPI', 'PostgreSQL', 'Docker', 'Redis'],
    deliverables: ['Custom Odoo Module Architecture', 'Multi-Warehouse Inventory Networks', 'B2B Retailer & Supplier Portals', 'Automated Financial Reconciliation'],
  },
  {
    id: 'ai',
    number: '04',
    title: 'Intelligent Automation & AI Workflows',
    subtitle: 'Custom LLM Workflows & Autonomous Pipeline Agents',
    description:
      'We move past superficial AI chatbots to build operational automation: document extraction, intelligent dispatching algorithms, automated triage, and proprietary business knowledge bases.',
    stack: ['OpenAI / Gemini SDKs', 'LangChain', 'Vector Embeddings', 'Python', 'Celery Queues'],
    deliverables: ['Autonomous Workflow Agents', 'Semantic Document Search', 'Intelligent Dispatch Engines', 'Proprietary Fine-Tuned Copilots'],
  },
  {
    id: 'uiux',
    number: '05',
    title: 'Bespoke UI/UX & Motion Engineering',
    subtitle: 'Brand Identity, Micro-Interactions & Interactive 3D',
    description:
      'Digital products that command respect. We fuse museum-grade aesthetics with ergonomic software design, delivering cohesive design systems, tactile button physics, and custom SVG flourishing.',
    stack: ['Figma Design Tokens', 'Framer Motion', 'Lenis Smooth Scroll', 'SVG Physics', 'Design Systems'],
    deliverables: ['Comprehensive Design Systems', 'Interactive Prototypes', 'Custom Iconography & Typography', 'Full Accessibility (a11y)'],
  },
];

export default function Capabilities() {
  const [activeItem, setActiveItem] = useState<string>('web');

  return (
    <section
      id="capabilities"
      className="py-28 bg-[#0a0a0c] text-[#f4f3ef] border-b border-white/[0.08] relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header - Clean & Monumental */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d4a359] block mb-3">
              03 / Capabilities
            </span>
            <h2 className="font-tusker text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase leading-[0.92]">
              Engineering What
              <br />
              <span className="text-[#d4a359]">Others Deem Impossible.</span>
            </h2>
          </div>

          <p className="max-w-sm font-display text-sm text-[#8e8e93] leading-relaxed">
            Zero generic templates. Zero outsourced code. Every capability below is executed directly by senior founding engineers.
          </p>
        </div>

        {/* Editorial Accordion / Index List */}
        <div className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
          {capabilities.map((item) => {
            const isOpen = activeItem === item.id;

            return (
              <div
                key={item.id}
                className="group transition-colors duration-300"
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => setActiveItem(isOpen ? '' : item.id)}
                  className="w-full py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                  data-cursor-text={isOpen ? 'Close' : 'Open'}
                  aria-expanded={isOpen}
                  id={`capability-btn-${item.id}`}
                >
                  <div className="flex items-baseline gap-6 md:gap-12">
                    <span className="font-mono text-sm md:text-base text-[#d4a359] group-hover:text-white transition-colors">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="font-tusker text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight uppercase group-hover:text-[#d4a359] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-display text-xs md:text-sm text-[#8e8e93] mt-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-center">
                    <div
                      className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-mono text-sm transition-transform duration-300 ${
                        isOpen ? 'rotate-45 border-[#d4a359] text-[#d4a359]' : 'group-hover:border-white'
                      }`}
                    >
                      +
                    </div>
                  </div>
                </button>

                {/* Expanded Drawer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 /* unslop-ignore */ }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pt-2 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t border-white/[0.04]">
                        {/* Description */}
                        <div className="md:col-span-6 space-y-4">
                          <span className="font-mono text-[11px] uppercase tracking-widest text-[#d4a359] block">
                            Scope & Execution
                          </span>
                          <p className="font-display text-base text-[#f4f3ef]/90 leading-relaxed font-normal">
                            {item.description}
                          </p>
                        </div>

                        {/* Deliverables */}
                        <div className="md:col-span-6 space-y-4">
                          <span className="font-mono text-[11px] uppercase tracking-widest text-[#d4a359] block">
                            Key Deliverables & Stack
                          </span>
                          <ul className="space-y-2 mb-4">
                            {item.deliverables.map((deliv) => (
                              <li
                                key={deliv}
                                className="font-display text-sm text-[#8e8e93] flex items-center gap-2"
                              >
                                <span className="text-[#d4a359]">›</span>
                                <span>{deliv}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-2 pt-2">
                            {item.stack.map((tech) => (
                              <span
                                key={tech}
                                className="font-mono text-[11px] px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] text-[#f4f3ef] rounded-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
