'use client';

import { type ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // seconds for complete loop
  reverse?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  speed = 25,
  reverse = false,
  className = '',
}: MarqueeProps) {
  return (
    <div
      className={`group relative flex overflow-hidden whitespace-nowrap select-none ${className}`}
    >
      <div
        className={`flex min-w-full shrink-0 items-center justify-around gap-8 animate-marquee ${
          reverse ? 'animation-direction-reverse' : ''
        } group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`flex min-w-full shrink-0 items-center justify-around gap-8 animate-marquee ${
          reverse ? 'animation-direction-reverse' : ''
        } group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
        .animation-direction-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
}
