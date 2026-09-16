'use client';

export default function Manifesto() {

  return (
    <section
      id="manifesto"
      className="py-32 bg-[#0a0a0c] text-[#f4f3ef] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#d4a359] mb-8">
          <span>01 / Manifesto</span>
          <span>—</span>
          <span className="text-[#8e8e93]">The Agency Ethos</span>
        </div>

        {/* 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Monumental Headline */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="font-tusker text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase text-[#f4f3ef]">
              Why we refuse
              <br />
              to be a regular
              <br />
              <span className="text-[#d4a359]">agency.</span>
            </h2>

            <p className="font-display text-lg sm:text-xl text-[#f4f3ef]/80 leading-relaxed font-normal">
              We operate without junior layers or bureaucratic handoffs. Founders collaborate directly with senior architects who write production code from day zero.
            </p>
          </div>

          {/* Right Column: High-Conviction Storytelling */}
          <div className="lg:col-span-6 space-y-8">
            <p className="text-xl sm:text-2xl font-display font-medium text-[#f4f3ef] leading-snug">
              We started with an uncompromising truth: software shouldn’t feel sluggish, bloated, or disconnected.
            </p>

            <div className="space-y-4 text-base text-[#8e8e93] leading-relaxed font-display font-normal">
              <p>
                Too many agencies hide behind layers of junior hires, account managers, and vague slide decks. Timelines slip, technical debt piles up, and the original vision gets lost in bureaucratic translation.
              </p>
              <p>
                Fillablank is built as an antidote: a focused studio of elite builders. When you speak with us, you speak directly with the engineers designing your data schemas, writing your backend microservices, and choreographing your user interfaces.
              </p>
              <p>
                From regional infrastructure apps to global platforms, we treat every project like a canvas worthy of enduring mastery.
              </p>
            </div>

            
          </div>
        </div>

        {/* Studio Metrics Bar */}
        <div className="mt-24 pt-12 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="font-tusker text-5xl sm:text-6xl md:text-7xl text-[#f4f3ef] block leading-none">
              10+
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#8e8e93] mt-2 block">
              Flagship Products Shipped
            </span>
          </div>

          <div>
            <span className="font-tusker text-5xl sm:text-6xl md:text-7xl text-[#f4f3ef] block leading-none">
              100%
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#8e8e93] mt-2 block">
              Production Reliability
            </span>
          </div>

          <div>
            <span className="font-tusker text-5xl sm:text-6xl md:text-7xl text-[#f4f3ef] block leading-none">
              0
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#8e8e93] mt-2 block">
              Missed Sprints
            </span>
          </div>

          <div>
            <span className="font-tusker text-5xl sm:text-6xl md:text-7xl text-[#f4f3ef] block leading-none">
              24/7
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#8e8e93] mt-2 block">
              Dedicated Support SLA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
