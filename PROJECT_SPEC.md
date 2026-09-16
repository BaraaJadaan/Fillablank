# MASTER AI EXECUTION BLUEPRINT: FILLABLANK NEXT-GEN PORTFOLIO

> **Target Directory:** `D:\Projects\Fillablank`  
> **Source Reference Directory:** `D:\Projects\company-porto`  
> **Inspiration Sites:**  
> - [Honey (withhoney.com)](https://www.withhoney.com/) — Sprint methodology, classical fine-art integration, high-craft editorial structure.  
> - [Patrick David (bepatrickdavid.com)](https://bepatrickdavid.com/) — Interactive "Selected Cases" expanding grid, custom SVG flourishes, brutalist-editorial typography, bespoke scroll physics.  
> **Primary Goal:** Construct an award-worthy, amusement-inducing digital portfolio that feels like a bespoke high-end editorial art catalog meets high-performance software engineering studio. **Zero AI slop, zero generic Tailwind/shadcn patterns, zero purple gradients.**

---

## TABLE OF CONTENTS
1. [Core Philosophy & Anti-Slop Guardrails](#1-core-philosophy--anti-slop-guardrails)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [File Tree & Migration Plan](#3-file-tree--migration-plan)
4. [Design System & Typography](#4-design-system--typography)
5. [Page Flow & Detailed Section Specifications](#5-page-flow--detailed-section-specifications)
   - 5.1 [Intro Splash & Seamless Logo Morph](#51-intro-splash--seamless-logo-morph)
   - 5.2 [Sticky Navbar & Interactive Logo Replay](#52-sticky-navbar--interactive-logo-replay)
   - 5.3 [Hero: Framed Editorial Canvas (IMG_0375.webp)](#53-hero-framed-editorial-canvas-img_0375webp)
   - 5.4 [Capabilities Index (Services Modernized)](#54-capabilities-index-services-modernized)
   - 5.5 [How We Sprint: Pinned Horizontal Scrub (4 Paintings)](#55-how-we-sprint-pinned-horizontal-scrub-4-paintings)
   - 5.6 [Selected Cases: Interactive Asymmetric Grid](#56-selected-cases-interactive-asymmetric-grid)
   - 5.7 [The Masterwork Transformation (IMG_0370.webp)](#57-the-masterwork-transformation-img_0370webp)
   - 5.8 [Studio Manifesto & Proof Points](#58-studio-manifesto--proof-points)
   - 5.9 [Let's Connect & Editorial Footer](#59-lets-connect--editorial-footer)
6. [Component Blueprints & Code Snippets](#6-component-blueprints--code-snippets)
7. [Step-by-Step Execution Plan for the AI Implementer](#7-step-by-step-execution-plan-for-the-ai-implementer)

---

## 1. CORE PHILOSOPHY & ANTI-SLOP GUARDRAILS

### The "Anti-Slop" Directive
This site must immediately dispel any impression of AI generation or generic template design:
- **NO default Tailwind or shadcn templates:** Do not use rounded bento cards with uniform 1px gray borders and generic hover shadows.
- **NO purple-to-blue AI gradients:** The palette is grounded in museum obsidian, raw paper contrast, deep Prussian blues, and warm amber/vermilion accents drawn directly from the oil paintings.
- **NO centered hero with 3 identical cards below:** Every layout block is asymmetric, intentional, and paced with deliberate rhythm and breathing room.
- **NO emojis used as icons:** All iconography is bespoke, thin-stroke SVG with custom hand-drawn flourishes (like Patrick David's curved arrows and star badges).
- **Tactile Physicality:** Lenis smooth scrolling, GSAP ScrollTrigger timeline pins, magnetic button physics, and custom cursor blend modes create an interface that feels alive, weighty, and physical.

---

## 2. TECH STACK & ARCHITECTURE

The project in `D:\Projects\Fillablank` will migrate and elevate the stack from `D:\Projects\company-porto`:
- **Framework:** Next.js 16 (App Router, Server Components + Client Islands)
- **UI Runtime:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + Vanilla CSS Variables & Custom Animations
- **Motion Engine:**
  - `gsap` + `ScrollTrigger` for pinned horizontal scrubbing and complex layout synchronization
  - `framer-motion` for UI state changes, shared layout morphs, and modal transitions
- **Smooth Scroll:** `lenis` (`@studio-freight/lenis` or `lenis/react`)
- **Icons:** Custom SVG components + selective `lucide-react`
- **Data Layer:** `public/content.json` serving structured project data, editable by the CMS/admin layer.

---

## 3. FILE TREE & MIGRATION PLAN

```
D:\Projects\Fillablank/
├── public/
│   ├── paintings/
│   │   ├── hero-canvas.webp          <- Copied from IMG_0375.webp
│   │   ├── masterwork.webp           <- Copied from IMG_0370.webp
│   │   ├── 01-rendezvous.webp        <- From "New folder/01. Rendezvous.webp"
│   │   ├── 02-silence.webp           <- From "New folder/02. The Silence.webp"
│   │   ├── 03-exhibition.webp        <- From "New folder/03. The Exhibition.webp"
│   │   └── 04-alterations.webp       <- From "New folder/04. The Alterations.webp"
│   ├── projects/                     <- Project thumbnails & showcase mockups
│   ├── content.json                  <- Migrated & updated from company-porto
│   └── fonts/                        <- Syne & JetBrains Mono / Space Grotesk
├── app/
│   ├── layout.tsx                    <- Root layout, fonts, Lenis provider, Custom Cursor
│   ├── page.tsx                      <- Main single-page orchestration
│   ├── globals.css                   <- Custom utilities, grain overlay, typography tokens
│   ├── providers.tsx                 <- Smooth scroll & theme providers
│   └── components/
│       ├── IntroSplash.tsx           <- Initial center logo smash-and-stitch & morph
│       ├── Navbar.tsx                <- Sticky navbar with interactive resting logo
│       ├── Hero.tsx                  <- Framed Editorial Canvas with IMG_0375.webp
│       ├── Capabilities.tsx          <- Reimagined Services editorial index/accordion
│       ├── HowWeSprint.tsx           <- Pinned horizontal scrub across 4 sprint paintings
│       ├── SelectedCases.tsx         <- Patrick David style asymmetric clickable grid
│       ├── CaseStudyModal.tsx        <- Deep-dive fullscreen project presentation
│       ├── MasterworkSection.tsx     <- IMG_0370.webp transformation & client outcome
│       ├── Manifesto.tsx             <- High-agency About & Philosophy section
│       ├── ContactFooter.tsx         <- "Let's Connect" Patrick David style footer
│       ├── CustomCursor.tsx          <- Interactive cursor with mix-blend mode
│       └── ui/
│           ├── CurvedArrow.tsx       <- Hand-drawn SVG back & forward arrows
│           ├── Marquee.tsx           <- Subtle editorial text ticker
│           └── MagneticButton.tsx    <- Magnetic physics CTA button
├── lib/
│   ├── content/                      <- Hooks and utilities to read content.json
│   └── utils.ts
├── package.json
└── tsconfig.json
```

---

## 4. DESIGN SYSTEM & TYPOGRAPHY

### Typographic Hierarchy: "Editorial Brutalist meets Classic Art"
1. **Display Headings (H1, H2, Phase Titles):**  
   - Font: **`Syne`** (Weights: 700, 800)  
   - Tracking: `-0.03em` to `-0.05em` (tight, monumental, commanding).  
   - Styles: Uppercase and Mixed Title Case with italicized sub-phrases for editorial flair.
2. **Body & Curatorial Copy:**  
   - Font: **`Space Grotesk`** or **`Inter Tight`** (Weights: 400, 500).  
   - Line height: `1.6` for effortless reading and generous whitespace.
3. **Metadata, Index Numbers & Technical Badges:**  
   - Font: **`JetBrains Mono`** or **`GT Flexa Mono`** style monospace.  
   - Tracking: `+0.05em`, uppercase, small sizes (`11px - 13px`).

### Color System
- **Obsidian Dark (Background):** `#0a0a0c`
- **Charcoal Card Surface:** `#141417`
- **Paper White (Primary Text):** `#f4f3ef`
- **Muted Stone (Secondary Text):** `#8e8e93`
- **Fine-Art Prussian Navy (from IMG_0375):** `#1b2a47`
- **Warm Gilt Amber (from IMG_0370):** `#d4a359`
- **Editorial Vermilion Accent:** `#ff4c24` / `#f44849`
- **Border / Hairline Color:** `rgba(255, 255, 255, 0.08)`

---

## 5. PAGE FLOW & DETAILED SECTION SPECIFICATIONS

### 5.1 Intro Splash & Seamless Logo Morph
- **Initial State:** The viewport is covered in a deep `#0a0a0c` canvas with subtle film grain. The main page underneath is locked (`overflow: hidden`).
- **Logo Execution:**
  1. In the exact dead center of the screen, the large logo animation begins at `clamp(2.5rem, 8vw, 4.5rem)`.
  2. The `[_]` mark renders with its glowing pulsing center rect.
  3. Text types out character by character: `"Fill a ____"` with an authentic blinking cursor.
  4. The cursor disappears. The word `"blank"` in vermilion/amber drops from `-200px` above, slamming into `"____"` with spring overshoot physics (`damping: 12`), crushing the underscores.
  5. The spaces between words stitch together seamlessly until the text reads `"Fillablank"`.
- **The Morph Transition:**
  - Instead of a generic fade, the centered logo triggers a layout morph: it scales down and glides smoothly up into the top-left navbar slot (`top: 24px, left: 32px`).
  - Simultaneously, the intro canvas fades out to `opacity: 0` (`pointer-events: none`), revealing the hero section as the Lenis smooth scroll initializes.

### 5.2 Sticky Navbar & Interactive Logo Replay
- **Position:** Fixed top bar with ultra-subtle backdrop blur (`rgba(10, 10, 12, 0.75)` + `backdrop-blur-md`).
- **Logo Component:** Resides in the top-left.
- **Scroll Behavior:** It does **NOT** re-trigger the smash-and-stitch animation while the user scrolls down or up. It stays in its crisp resting state `"Filla[blank]"`.
- **Click Behavior:** Clicking the logo does a smooth Lenis scroll to `#top`, and simultaneously triggers a delightful replay of the `"blank"` drop-and-smash animation.
- **Nav Links:** Minimalist right-aligned index (`01. Cases`, `02. How We Sprint`, `03. Capabilities`, `04. Manifesto`, `05. Contact`).

### 5.3 Hero: Framed Editorial Canvas (IMG_0375.webp)
- **Layout:**
  - **Top Row / Header:** Editorial eyebrow: `"FILLABLANK STUDIO / DIGITAL PRODUCT ENGINEERING & BESPOKE CRAFT"` + Live Studio Availability Badge (`"● Available for Select Q2/Q3 Projects"` with pulsing emerald indicator).
  - **Core Statement:** Monumental Syne display heading spanning multiple lines:
    ```
    WE TURN THE AMBITIOUS
    BLANK CANVAS INTO
    HIGH-PERFORMANCE REALITY.
    ```
  - **Centerpiece Visual:** A museum-grade framed presentation of `IMG_0375.webp` (the deep Prussian blue celestial/classical painting):
    - Floating with a subtle 3D cursor-tracking perspective tilt (`rotateX`, `rotateY` via mouse move).
    - Framed with an ultra-thin 1px border and curatorial caption below:
      `"Plate No. 01 — The Genesis of Execution / Fillablank Studio Archive"`.
    - Subtle parallax lift on scroll.
  - **Action CTA:** Magnetic "Explore Selected Cases" button with curved arrow icon + Marquee scroll indicator.

### 5.4 Capabilities Index (Services Modernized)
- **Concept:** Replaces the generic 3-box card layout with an editorial capabilities index (inspired by high-fashion indexes and Swiss design).
- **Structure:**
  - A clean horizontal divider list numbered `01` through `05`:
    1. `01 / High-Performance Web Platforms` (Next.js, React, GSAP, Distributed Systems)
    2. `02 / Mission-Critical Mobile Systems` (Flutter, React Native, Offline-First Architecture)
    3. `03 / Custom Enterprise Backbones & ERP` (Odoo, Python, Microservices, Realtime Data)
    4. `04 / Intelligent Automation & AI Workflows` (Custom AI Integrations, Autonomous Agents)
    5. `05 / Bespoke UI/UX & Motion Systems` (Brand Identity, Interactive 3D, Design Engineering)
  - **Hover Interaction:** Hovering over an item reveals a floating cursor-following preview tag and smoothly expands technical capabilities, deliverables, and performance benchmarks.

### 5.5 How We Sprint: Pinned Horizontal Scrub (4 Paintings)
- **Concept:** Directly inspired by Honey's 4-phase methodology, but elevated with Patrick David-style creative scroll animation.
- **GSAP ScrollTrigger Implementation:**
  - The section pins vertically (`pin: true, scrub: 1, snap: 1 / 3`) while horizontally panning across 4 distinct "exhibition chambers".
  - Total scroll distance = `300vh` to `400vh` for smooth pacing.
- **The 4 Chambers & Copy:**
  - **Phase 01: The Rendezvous**  
    *Visual:* `New folder/01. Rendezvous.webp`  
    *Headline:* `Phase 01 / The Rendezvous`  
    *Subtitle:* `Strategic Architecture & Alignment`  
    *Copy:* *"We strip away agency bureaucracy. Every bi-weekly cycle kicks off with a focused strategic summit between founders and engineering leads. We define technical boundaries, crystallize requirements, and lock down production milestones with zero ambiguity."*
  - **Phase 02: The Silence**  
    *Visual:* `New folder/02. The Silence.webp`  
    *Headline:* `Phase 02 / The Silence`  
    *Subtitle:* `Uninterrupted Deep Engineering`  
    *Copy:* *"Real breakthrough software requires intense, uninterrupted concentration. No endless Slack pings, no redundant status calls. Our senior builders enter deep execution mode—crafting clean architecture, high-velocity frontend flows, and robust backend logic."*
  - **Phase 03: The Exhibition**  
    *Visual:* `New folder/03. The Exhibition.webp`  
    *Headline:* `Phase 03 / The Exhibition`  
    *Subtitle:* `Interactive Preview & Critical Review`  
    *Copy:* *"We don't deliver static mockups or PDFs. We unveil live, interactive staging environments. You test real physics, live data pipelines, and responsive screens in your own hands. We dissect what works, validate edge cases, and gather surgical feedback."*
  - **Phase 04: The Alterations**  
    *Visual:* `New folder/04. The Alterations.webp`  
    *Headline:* `Phase 04 / The Alterations`  
    *Subtitle:* `Hardening, Refinement & Production Launch`  
    *Copy:* *"The difference between good software and iconic digital products is in the final 10%. We stress-test load capacities, refine micro-interactions to sub-pixel perfection, optimize Core Web Vitals, and ship directly to production."*
- **Visual Presentation:** Each phase features the framed oil painting on one side with subtle parallax depth, and large monumental typography, phase counter (`01/04`, `02/04`...), and technical breakdown on the other.

### 5.6 Selected Cases: Interactive Asymmetric Grid
- **Concept:** Patrick David's signature showcase (`bepatrickdavid.com`), showcasing curated flagship projects from `content.json`.
- **Curated Flagship Cases (5-6 Projects):**
  1. **Lumytic ERP Showcase** (React, GSAP, Advanced CSS) — *Enterprise presentation site with cutting-edge visual hierarchy.*
  2. **Rafik Darbak Mobile Ecosystem** (Flutter, Supabase) — *Pioneering regional ride-sharing infrastructure.*
  3. **JumlaTech Supply Ecosystem** (Odoo, Python, Mobile) — *Retailer-to-supplier digital trade backbone.*
  4. **Archibest Competitions Platform** (Next.js, Architecture Showcase) — *Global designer challenge & jury evaluation portal.*
  5. **Alsharq Banking Microservices** (Flask, Python, Core Security) — *Mission-critical financial accounts & transaction platform.*
  6. **Enterprise ISP Network Platform** (React, .NET, TR-069) — *Fiber infrastructure, real-time diagnostic engine.*
- **Grid Layout:** Asymmetrical, staggered editorial layout with ample breathing room. Project titles feature bold uppercase lettering, category metadata, and a preview of the project mockups.
- **Click Interaction (Deep-Dive Modal / Stage):**
  - Clicking any project image triggers a smooth FLIP / Framer Motion layout expansion.
  - The screen transitions into a full-screen dedicated showcase:
    - **Header:** Custom hand-drawn SVG back button (`<CurvedArrow />`) with hover spring animation + project title in large Syne display.
    - **Visuals:** High-res mockup gallery with smooth scroll.
    - **Editorial Breakdown:** Challenge, Architecture, Solution, Impact.
    - **Metadata Matrix:** Category, Tech Stack pills, Timeline, Client.
    - **External Action:** Magnetic button `"Launch Live Demo"` or `"Visit Case Study"` with external link arrow.
    - **Dismissal:** Clicking Back or pressing `Escape` collapses smoothly back to the exact scroll position in the grid.

### 5.7 The Masterwork Transformation (IMG_0370.webp)
- **Concept:** "The Masterwork Unveiling" — Represents the culmination of working with Fillablank: turning an uncertain blank space into a timeless digital masterpiece.
- **Visual:** Monumental presentation of `IMG_0370.webp` (the warm amber / golden Baroque painting).
- **Scroll Animation:**
  - As the user scrolls into this section, the painting slowly emerges from darkness (`opacity: 0.2 -> 1.0`, `scale: 0.95 -> 1.05`) with a warm golden ambient backlight (`box-shadow: 0 0 120px rgba(212, 163, 89, 0.15)`).
- **Storytelling Copy:**
  ```
  THE TRANSFORMATION
  FROM A BLANK CANVAS TO AN ENDURING MASTERPIECE.
  
  When you bring your vision to Fillablank, you don't receive an outsourced commodity. 
  You walk away with an enterprise-grade digital product built on clean architecture, 
  extreme performance, and bespoke craftsmanship that stands apart from the digital noise.
  
  ✓ Zero Technical Debt   ✓ Founder-Led Velocity   ✓ Production-Hardened Code
  ```

### 5.8 Studio Manifesto & Proof Points
- **Concept:** The human, high-agency ethos of Fillablank (migrated from `about.story` in `content.json`).
- **Layout:** Bold 2-column editorial spread:
  - **Left Column:** `"WHY WE REFUSE TO BE A REGULAR AGENCY"` in oversized typography.
  - **Right Column:**
    - *"We started with a simple truth: software shouldn’t feel sluggish, bloated, or disconnected. Too many agencies hide behind layers of account managers, vague slide decks, and bloated timelines.*
    - *We are a focused studio of elite builders. Direct communication with the engineers actually writing the code. Fast iterations. Uncompromising craftsmanship."*
  - **Metrics Bar:**
    - `10+` Projects Delivered
    - `100%` Production Reliability
    - `0` Missed Milestones
    - `24/7` Enterprise Support

### 5.9 Let's Connect & Editorial Footer
- **Inspiration:** Patrick David's high-energy footer (`bepatrickdavid.com`).
- **Heading:**
  ```
  HAVE AN AMBITIOUS BLANK?
  LET'S BUILD SOMETHING EXTRAORDINARY.
  ```
- **Direct Connect CTAs:**
  - Direct Email: `hello@fillablank.com` (magnetic hover underline)
  - Direct WhatsApp: `+963 997 748 481` (instant chat trigger)
  - Integrated Fast-Inquiry Drawer / Quick RFQ form (Name, Email, Project Brief, Budget).
- **Sub-Footer:**
  - Studio Timezone / Local Status: `Damascus / CET / Remote Worldwide`
  - Copyright: `© 2026 Fillablank Studio. All rights reserved.`
  - Back to top trigger with smooth Lenis scroll.

---

## 6. COMPONENT BLUEPRINTS & CODE SNIPPETS

### 6.1 Intro Splash & Navbar Integration (`IntroSplash.tsx`)
```tsx
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroSplashProps {
  onComplete: () => void;
}

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [typedCount, setTypedCount] = useState(0);
  const [isCrushed, setIsCrushed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const fullText = "Fill a ____";

  useEffect(() => {
    // 1. Typing effect
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setTypedCount(current);
      if (current >= fullText.length) {
        clearInterval(interval);
        // 2. Drop "blank" to crush underscores after pause
        setTimeout(() => {
          setIsCrushed(true);
          // 3. Complete and trigger morph
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 800);
          }, 900);
        }, 400);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0c]"
        >
          <div className="relative flex items-center gap-4 text-3xl sm:text-5xl md:text-6xl font-bold font-syne text-[#f4f3ef]">
            {/* Animated [_] SVG Mark */}
            <svg width="48" height="48" viewBox="0 0 44 44" fill="none" className="text-[#ff4c24]">
              <path d="M14,4 L4,4 L4,40 L14,40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <path d="M30,4 L40,4 L40,40 L30,40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <rect x="15" y="19" width="14" height="4" rx="2" fill="currentColor" className="animate-pulse" />
            </svg>

            {/* Smash & Stitch Text */}
            <span className="tracking-tight">
              {!isCrushed ? (
                <>
                  {fullText.slice(0, typedCount)}
                  <span className="text-[#ff4c24] animate-pulse">|</span>
                </>
              ) : (
                <motion.span
                  initial={{ scale: 1.15, filter: 'blur(4px)' }}
                  animate={{ scale: 1, filter: 'blur(0px)' }}
                  transition={{ type: 'spring', damping: 14 }}
                >
                  Filla<span className="text-[#ff4c24]">blank</span>
                </motion.span>
              )}
            </span>
          </div>
          <p className="mt-6 text-xs uppercase tracking-widest font-mono text-[#8e8e93]">
            Digital Product Studio
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### 6.2 Pinned Horizontal Scrub for "How We Sprint" (`HowWeSprint.tsx`)
```tsx
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    num: "01",
    name: "The Rendezvous",
    tagline: "Strategic Architecture & Alignment",
    image: "/paintings/01-rendezvous.webp",
    desc: "We eliminate agency red tape. Every sprint begins with an intensive strategic session with founders and engineering architects to establish deliverables, API boundaries, and user journeys."
  },
  {
    num: "02",
    name: "The Silence",
    tagline: "Uninterrupted Deep Engineering",
    image: "/paintings/02-silence.webp",
    desc: "Uninterrupted focus creates masterwork software. Senior engineers dive into deep flow state—building scalable data contracts, snappy UI components, and bulletproof microservices."
  },
  {
    num: "03",
    name: "The Exhibition",
    tagline: "Interactive Staging & Real Feedback",
    image: "/paintings/03-exhibition.webp",
    desc: "No static slides. We unveil living, working environments on staging domains. You test real latency, authentic touch gestures, and responsive layouts directly on your devices."
  },
  {
    num: "04",
    name: "The Alterations",
    tagline: "Hardening & Production Launch",
    image: "/paintings/04-alterations.webp",
    desc: "We obsess over the final millimeter. Core Web Vital optimization, automated test suites, database indexing, and smooth production zero-downtime deployment."
  }
];

export default function HowWeSprint() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.sprint-panel');
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + (sectionRef.current?.offsetWidth || 3000),
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[#0a0a0c] text-[#f4f3ef]">
      <div className="absolute top-8 left-8 z-10 font-mono text-xs uppercase tracking-widest text-[#8e8e93]">
        Methodology / How We Sprint
      </div>

      <div ref={containerRef} className="flex h-full w-[400vw] will-change-transform">
        {phases.map((phase) => (
          <div key={phase.num} className="sprint-panel flex h-full w-screen flex-shrink-0 items-center justify-center px-8 md:px-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl w-full">
              {/* Framed Painting */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10 shadow-2xl group">
                <Image
                  src={phase.image}
                  alt={phase.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono tracking-wider uppercase border border-white/10">
                  Phase {phase.num}
                </div>
              </div>

              {/* Editorial Copy */}
              <div className="space-y-6">
                <span className="font-mono text-sm tracking-widest text-[#ff4c24] uppercase">
                  Phase {phase.num} — Methodology
                </span>
                <h3 className="text-3xl md:text-5xl font-bold font-syne tracking-tight">
                  {phase.name}
                </h3>
                <p className="text-lg text-[#d4a359] font-medium">
                  {phase.tagline}
                </p>
                <p className="text-[#8e8e93] leading-relaxed text-base md:text-lg">
                  {phase.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

### 6.3 Patrick David Style Hand-Drawn Back Arrow (`CurvedArrow.tsx`)
```tsx
export default function CurvedArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="120"
      height="38"
      viewBox="0 0 192 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M190.67 59.618c-3.755-6.474-8.055-8.114-15.08-12.037-29.012-16.203-60.856-27.41-93.698-33.032-23.62-4.042-47.563-3.598-70.249 3.098.924 1.042 2.057.631 3.013 1.476.703.62 1.135 1.93 1.81 2.68 1.814 2.007 10 9.118 12.865 7.498-2.329-1.766-5.88-3.105-8.504-4.314-5.608-2.583-11.812-7.142-17.819-8.491 2.17-2.823 19.724-19.765 22.96-12.718"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
```

---

## 7. STEP-BY-STEP EXECUTION PLAN FOR THE AI IMPLEMENTER

When another AI session picks up this specification, execute in this exact sequence:

### Step 1: Directory Setup & Asset Pipeline
1. In `D:\Projects\Fillablank`, copy the base setup from `D:\Projects\company-porto` (Next.js config, package.json, tsconfig, tailwind config).
2. Organize public assets:
   - Move `D:\Projects\Fillablank\IMG_0375.webp` -> `public/paintings/hero-canvas.webp`.
   - Move `D:\Projects\Fillablank\IMG_0370.webp` -> `public/paintings/masterwork.webp`.
   - Move `D:\Projects\Fillablank\New folder/` -> `public/paintings/sprint/` (`01-rendezvous.webp`, etc.).
   - Copy and enrich `content.json` into `public/content.json`.

### Step 2: Global Styling & Design Tokens
1. Configure `globals.css` with dark theme variables, custom scrollbar styling, and high-DPI grain texture overlay.
2. Load `@font-face` or `next/font/google` for **`Syne`** (display) and **`Space Grotesk`** + **`JetBrains Mono`** (body/meta).
3. Setup Lenis smooth scroll provider in `app/providers.tsx`.

### Step 3: Implement The Core Components
1. **`IntroSplash.tsx`:** Build the initial screen center logo typing, dropping, smashing underscores, and stitching into Fillablank.
2. **`Navbar.tsx`:** Sticky navigation bar containing the permanent resting logo with click-to-replay animation.
3. **`Hero.tsx`:** Museum-framed `IMG_0375.webp` with 3D mouse tilt and monumental Syne typography.
4. **`Capabilities.tsx`:** Editorial index replacing the old 3-card services block.
5. **`HowWeSprint.tsx`:** GSAP ScrollTrigger horizontal pinned scrub across the 4 sprint paintings with refined agency copy.
6. **`SelectedCases.tsx` & `CaseStudyModal.tsx`:** Patrick David-style asymmetric grid with expandable modal case study deep-dives and custom SVG back arrow.
7. **`MasterworkSection.tsx`:** Monumental presentation of `IMG_0370.webp` with scroll illumination.
8. **`Manifesto.tsx`:** Punchy 2-column agency story and proof metrics.
9. **`ContactFooter.tsx`:** High-energy Patrick David "Let's Connect" section with instant WhatsApp/Email triggers.

### Step 4: Quality & Anti-Slop Verification
1. Run `python scripts/devibe_scan.py` to ensure zero AI slop indicators.
2. Verify all interactive elements have unique IDs and keyboard navigation support.
3. Test smooth scrolling, scroll restoration, and responsiveness on mobile, tablet, and ultra-wide screens.
4. Run `npm run build` to guarantee zero TypeScript or Next.js build errors.

---

**STATUS:** Blueprint finalized and approved. Ready for execution in the implementation session.
