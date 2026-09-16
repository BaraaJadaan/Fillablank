'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate as fmAnimate } from 'framer-motion';

interface IntroSplashProps {
  onComplete: () => void;
}

const FULL_TEXT = 'Fill a ____';

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [typedIndex, setTypedIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isDropping, setIsDropping] = useState(false);
  const [stage, setStage] = useState<'typing' | 'drop' | 'stitch' | 'done'>('typing');
  const [isExiting, setIsExiting] = useState(false);
  const [spaceWidth, setSpaceWidth] = useState(12);

  const measureRef = useRef<HTMLSpanElement>(null);
  const dropProgress = useMotionValue(0);
  const stitchProgress = useMotionValue(0);

  // Exact company-porto spring physics
  const blankY = useTransform(dropProgress, [0, 1], [-260, 0], { clamp: false });
  const underscoreOpacity = useTransform(dropProgress, [0.8, 1], [1, 0]);
  const underscoreY = useTransform(dropProgress, [0.88, 1], [0, 18]);
  const underscoreScaleY = useTransform(dropProgress, [0.88, 1], [1, 0.15]);

  // Space closure stitching
  const aX = useTransform(stitchProgress, [0, 1], [0, -spaceWidth]);
  const blankX = useTransform(stitchProgress, [0, 1], [0, -2 * spaceWidth]);

  const startStitch = useCallback(() => {
    setStage('stitch');
    fmAnimate(stitchProgress, 1, {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      onComplete: () => {
        setStage('done');
        // Hold on the finished brandmark, then exit
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 700);
        }, 600);
      },
    });
  }, [stitchProgress, onComplete]);

  const startDrop = useCallback(() => {
    setShowCursor(false);
    setIsDropping(true);
    setStage('drop');
    fmAnimate(dropProgress, 1, {
      type: 'spring',
      duration: 0.7,
      damping: 12,
      onComplete: startStitch,
    });
  }, [dropProgress, startStitch]);

  useEffect(() => {
    const measureSpace = () => {
      if (measureRef.current) {
        const w = measureRef.current.getBoundingClientRect().width;
        if (w > 0) setSpaceWidth(w);
      }
    };
    measureSpace();
    document.fonts?.ready?.then(measureSpace);

    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const next = () => {
      i++;
      setTypedIndex(i);
      if (i >= FULL_TEXT.length) {
        t = setTimeout(startDrop, 380);
        return;
      }
      t = setTimeout(next, 95 + Math.random() * 40);
    };
    t = setTimeout(next, 400);
    return () => clearTimeout(t);
  }, [startDrop]);

  // Sliced text parts
  const fillPart = FULL_TEXT.slice(0, Math.min(typedIndex, 4));
  const underscoreCount = Math.max(0, Math.min(typedIndex - 7, 4));
  const underscorePart = '_'.repeat(underscoreCount);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          id="intro-splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0c] overflow-hidden select-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,76,36,0.08)_0%,transparent_60%)] pointer-events-none" />

          {/* Hidden space width calibration target */}
          <span
            ref={measureRef}
            aria-hidden
            className="font-syne text-4xl sm:text-6xl md:text-7xl font-bold"
            style={{
              position: 'absolute',
              visibility: 'hidden',
              pointerEvents: 'none',
              whiteSpace: 'pre',
            }}
          >
            {' '}
          </span>

          {/* Centered Brand Mark + Typography */}
          <div className="relative flex items-center gap-4 sm:gap-6 font-syne text-4xl sm:text-6xl md:text-7xl font-bold text-[#f4f3ef]">
            {/* Animated [_] SVG Mark */}
            <motion.svg
              width="56"
              height="56"
              viewBox="0 0 44 44"
              fill="none"
              className="text-[#d4a359] shrink-0"
              initial={{ rotate: -8, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <path
                d="M14,4 L4,4 L4,40 L14,40"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M30,4 L40,4 L40,40 L30,40"
                stroke="currentColor"
                strokeWidth="4"
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
            </motion.svg>

            {/* Stable Spacer */}
            <div className="relative inline-block">
              <div
                aria-hidden
                style={{
                  visibility: 'hidden',
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  whiteSpace: 'pre',
                }}
              >
                Fill a ____
              </div>

              {/* Animation Layer */}
              {stage !== 'done' ? (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'inline-flex',
                    alignItems: 'baseline',
                    pointerEvents: 'none',
                  }}
                >
                  <span>{fillPart}</span>
                  {typedIndex <= 4 && showCursor && <span className="text-[#d4a359] animate-pulse">|</span>}

                  {typedIndex >= 5 && <span style={{ whiteSpace: 'pre' }}> </span>}
                  {typedIndex === 5 && showCursor && <span className="text-[#d4a359] animate-pulse">|</span>}

                  {typedIndex >= 6 && (
                    <motion.span style={{ x: aX, display: 'inline-block' }}>
                      a
                      {typedIndex === 6 && showCursor && <span className="text-[#d4a359] animate-pulse">|</span>}
                    </motion.span>
                  )}

                  {typedIndex >= 7 && <span style={{ whiteSpace: 'pre' }}> </span>}
                  {typedIndex === 7 && showCursor && <span className="text-[#d4a359] animate-pulse">|</span>}

                  {typedIndex >= 8 && (
                    <motion.span style={{ x: blankX, position: 'relative', display: 'inline-block' }}>
                      <span aria-hidden style={{ visibility: 'hidden' }}>____</span>

                      <motion.span
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          opacity: underscoreOpacity,
                          y: underscoreY,
                          scaleY: underscoreScaleY,
                          transformOrigin: 'bottom center',
                          whiteSpace: 'pre',
                        }}
                      >
                        {underscorePart}
                        {typedIndex >= 8 && typedIndex <= 11 && showCursor && (
                          <span className="text-[#d4a359] animate-pulse">|</span>
                        )}
                      </motion.span>

                      <motion.span
                        className="text-[#d4a359]"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          transformOrigin: 'bottom center',
                          y: blankY,
                          opacity: isDropping ? 1 : 0,
                          whiteSpace: 'pre',
                        }}
                      >
                        blank
                      </motion.span>
                    </motion.span>
                  )}
                </div>
              ) : (
                /* Resting Wordmark */
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                  }}
                >
                  Filla<span className="text-[#d4a359]">blank</span>
                </span>
              )}
            </div>
          </div>

          
        </motion.div>
      )}
    </AnimatePresence>
  );
}
