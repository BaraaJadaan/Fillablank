'use client';

import { useState } from 'react';
import MagneticButton from './ui/MagneticButton';
import CurvedArrow from './ui/CurvedArrow';

export default function ContactFooter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch your inquiry. Please try again.');
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        budget: '',
        message: '',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToTop = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="contact"
      className="bg-[#0a0a0c] text-[#f4f3ef] pt-32 pb-16 relative overflow-hidden"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#d4a359]/10 blur-[160px] pointer-events-none" style={{ borderRadius: '50%' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Unified Contact Grid: Direct Info on Left, Inquiry Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-white/[0.08]">
          {/* Left Column: Let's Connect, Direct Phone & Email */}
          <div className="lg:col-span-5 space-y-8">

            <h2 className="text-5xl sm:text-6xl md:text-7xl font-tusker tracking-normal uppercase leading-[0.9] text-[#f4f3ef]">
              Let&apos;s Connect.
            </h2>

            <p className="font-display text-base text-[#8e8e93] leading-relaxed max-w-md">
              Have an ambitious vision, a mission-critical platform to architect, or an engineering challenge that demands bespoke craft? Speak directly with our founding engineering team.
            </p>

            <div className="space-y-6 pt-4 border-t border-white/[0.08]">
              {/* Direct Phone / WhatsApp */}
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#8e8e93] block mb-1">
                  Direct Line & WhatsApp
                </span>
                <a
                  id="contact-whatsapp-link"
                  href="https://wa.me/963997748481"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-tusker text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide text-[#f4f3ef] hover:text-[#25D366] transition-colors inline-block"
                  data-cursor-text="WhatsApp"
                >
                  +963 997 748 481
                </a>
              </div>

              {/* Direct Email */}
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#8e8e93] block mb-1">
                  Direct Email Inquiry
                </span>
                <a
                  id="contact-email-link"
                  href="mailto:hello@fillablank.com"
                  className="font-tusker text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide text-[#f4f3ef] hover:text-[#d4a359] transition-colors inline-block"
                  data-cursor-text="Mail"
                >
                  hello@fillablank.com
                </a>
              </div>


            </div>
          </div>

          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="p-10 rounded border border-emerald-500/30 bg-emerald-500/05 text-center space-y-4">
                <span className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 font-syne text-2xl flex items-center justify-center mx-auto">
                  ✓
                </span>
                <h4 className="text-2xl font-bold font-syne text-[#f4f3ef]">
                  Inquiry Dispatched Directly to Founders
                </h4>
                <p className="font-mono text-xs text-[#8e8e93] max-w-md mx-auto uppercase tracking-wider">
                  Thank you. We will review your requirements and reach out within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="font-mono text-xs uppercase tracking-widest text-[#d4a359] underline pt-4"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="font-mono text-[11px] uppercase tracking-widest text-[#8e8e93] block mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Maya Doe"
                      className="w-full bg-[#141417] border border-white/[0.08] focus:border-[#d4a359] rounded px-4 py-3.5 text-sm text-[#f4f3ef] placeholder:text-[#8e8e93]/50 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="font-mono text-[11px] uppercase tracking-widest text-[#8e8e93] block mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="maya@company.com"
                      className="w-full bg-[#141417] border border-white/[0.08] focus:border-[#d4a359] rounded px-4 py-3.5 text-sm text-[#f4f3ef] placeholder:text-[#8e8e93]/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

               

                <div>
                  <label
                    htmlFor="inquiry-message"
                    className="font-mono text-[11px] uppercase tracking-widest text-[#8e8e93] block mb-2"
                  >
                    Project Brief & Technical Targets *
                  </label>
                  <textarea
                    id="inquiry-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us what you want, key timelines, and the biggest technical challenge... or just say hi"
                    className="w-full bg-[#141417] border border-white/[0.08] focus:border-[#d4a359] rounded px-4 py-3.5 text-sm text-[#f4f3ef] placeholder:text-[#8e8e93]/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="p-4 rounded border border-rose-500/30 bg-rose-500/10 text-rose-400 font-mono text-xs">
                    {errorMessage}
                  </div>
                )}

                <MagneticButton
                  strength={0.3}
                  id="inquiry-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-marquee group px-8 py-5 bg-[#d4a359] hover:bg-[#f4f3ef] text-[#0a0a0c] border border-transparent transition-all duration-300 w-full sm:w-auto"
                >
                  <span className="btn-label font-tusker text-lg sm:text-xl tracking-wider uppercase flex items-center justify-center gap-4 w-full">
                    <span>{isSubmitting ? 'Transmitting...' : 'Submit Strategic Brief'}</span>
                    <CurvedArrow direction="forward" className="w-8 h-4 text-current" />
                  </span>

                  <div className="marquee-track font-tusker text-base tracking-widest text-[#0a0a0c]">
                    <div className="flex gap-6 animate-marquee whitespace-nowrap">
                      <span>TRANSMIT BRIEF ✦ DISPATCH BRIEF ✦ TRANSMIT BRIEF ✦ DISPATCH BRIEF</span>
                    </div>
                  </div>
                </MagneticButton>
              </form>
            )}
          </div>
        </div>

        {/* Editorial Sub-Footer: Patrick David Scroll-To-Top & Status */}
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-[#8e8e93]">
          <div>
            <span>© 2026 Fillablank</span>
          </div>

          <div className="flex items-center gap-8">


            <button
              id="footer-back-to-top"
              type="button"
              onClick={handleBackToTop}
              className="group flex items-center gap-2 text-[#f4f3ef] hover:text-[#d4a359] transition-colors focus:outline-none cursor-pointer"
              data-cursor-text="Top"
            >
              <span>Back to top</span>
              <div className="w-6 text-current group-hover:-translate-y-1 transition-transform">
                <CurvedArrow direction="down" className="w-full h-auto text-current" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
