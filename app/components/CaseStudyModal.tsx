'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import CurvedArrow from './ui/CurvedArrow';
import MagneticButton from './ui/MagneticButton';

export interface ProjectCase {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  links?: {
    demo?: string;
  };
  challenge?: string;
  architecture?: string;
  solution?: string;
  impact?: string;
  client?: string;
  timeline?: string;
}

interface CaseStudyModalProps {
  project: ProjectCase | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#0a0a0c]/95 backdrop-blur-xl overflow-y-auto"
      >
        <div className="min-h-screen max-w-6xl mx-auto px-6 md:px-12 py-12 flex flex-col justify-between">
          {/* Top Bar: Patrick David Hand-Drawn Back Arrow Button */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-12">
            <button
              id="modal-back-button"
              type="button"
              onClick={onClose}
              className="group flex items-center gap-4 text-[#8e8e93] hover:text-[#f4f3ef] transition-colors focus:outline-none cursor-pointer"
              data-cursor-text="Back"
            >
              <div className="w-12 text-[#d4a359] group-hover:-translate-x-2 transition-transform duration-300">
                <CurvedArrow direction="back" className="w-full h-auto text-current" />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.2em]">
                Back to Cases
              </span>
            </button>

            <div className="font-mono text-xs text-[#8e8e93] uppercase tracking-widest hidden sm:block">
              [ Esc to Close ]
            </div>
          </div>

          {/* Main Case Presentation Content */}
          <div className="space-y-12">
            {/* Title & Category Header */}
            <div>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#d4a359] mb-3">
                <span>{project.category}</span>
                <span>•</span>
                <span className="text-[#8e8e93]">{project.timeline || 'Sprint Cycle'}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-syne text-[#f4f3ef] tracking-tight uppercase">
                {project.title}
              </h2>
            </div>

            {/* Showcase Visual Framed Plate */}
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-white/[0.12] bg-[#141417] shadow-2xl">
              <Image
                src={project.image}
                alt={project.imageAlt || project.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>

            {/* Matrix Data Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded border border-white/[0.08] bg-[#141417]/60 font-mono text-xs">
              <div>
                <span className="text-[#8e8e93] block uppercase tracking-wider mb-1">Category</span>
                <span className="text-[#f4f3ef] font-semibold">{project.category}</span>
              </div>
              <div>
                <span className="text-[#8e8e93] block uppercase tracking-wider mb-1">Client / Origin</span>
                <span className="text-[#d4a359] font-semibold">{project.client || 'Enterprise Partner'}</span>
              </div>
              <div>
                <span className="text-[#8e8e93] block uppercase tracking-wider mb-1">Architecture</span>
                <span className="text-[#f4f3ef] font-semibold">{project.tags[0]}</span>
              </div>
              <div>
                <span className="text-[#8e8e93] block uppercase tracking-wider mb-1">Impact</span>
                <span className="text-[#d4a359] font-semibold">{project.impact || 'Production Live'}</span>
              </div>
            </div>

            {/* Deep-Dive Editorial Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-syne text-xl font-bold uppercase text-[#d4a359] mb-2">
                    01 / The Challenge
                  </h3>
                  <p className="text-[#8e8e93] leading-relaxed text-sm md:text-base">
                    {project.challenge || project.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-syne text-xl font-bold uppercase text-[#d4a359] mb-2">
                    02 / Architecture & Engineering
                  </h3>
                  <p className="text-[#8e8e93] leading-relaxed text-sm md:text-base">
                    {project.architecture ||
                      'Crafted with a clean separation of concerns, resilient state machines, automated CI/CD pipelines, and high-velocity rendering engines.'}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-syne text-xl font-bold uppercase text-[#f4f3ef] mb-2">
                    03 / The Solution & Craft
                  </h3>
                  <p className="text-[#8e8e93] leading-relaxed text-sm md:text-base">
                    {project.solution || project.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-[#8e8e93] mb-3">
                    Technologies Applied
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-3 py-1 bg-white/[0.04] border border-white/[0.1] text-[#f4f3ef] rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* External CTA Action */}
            {project.links?.demo && (
              <div className="pt-8 border-t border-white/[0.08] flex items-center justify-between">
                <MagneticButton
                  href={project.links.demo}
                  strength={0.3}
                  className="inline-flex items-center gap-3 bg-[#d4a359] hover:bg-[#f4f3ef] text-[#0a0a0c] font-syne font-bold px-8 py-4 rounded transition-all duration-300"
                >
                  <span className="uppercase text-sm tracking-wider">
                    Launch Live System
                  </span>
                  <span>↗</span>
                </MagneticButton>

                <button
                  type="button"
                  onClick={onClose}
                  className="font-mono text-xs uppercase tracking-widest text-[#8e8e93] hover:text-[#f4f3ef] transition-colors"
                >
                  Close Showcase
                </button>
              </div>
            )}
          </div>

          {/* Modal Sub-footer */}
          <div className="mt-16 pt-6 border-t border-white/[0.08] flex items-center justify-between font-mono text-[11px] text-[#8e8e93]">
            <span>Fillablank Studio Case Ledger</span>
            <span>Ref. {project.id.toUpperCase()}-2026</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
