'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate as fmAnimate } from 'framer-motion';

const FULL_TEXT = 'Fill a ____';

const BLINK_STYLE = `
  @keyframes _fab_blink {
    0%, 48%  { opacity: 1; }
    52%, 100% { opacity: 0; }
  }
  ._fab_cursor {
    animation: _fab_blink 0.9s step-end infinite;
    display: inline-block;
  }
`;

export default function HeroText({
  className = '',
  replayTrigger = 0,
}: {
  className?: string;
  replayTrigger?: number;
}) {
  const [typedIndex, setTypedIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isDropping, setIsDropping] = useState(false);
  const [stage, setStage] = useState<'typing' | 'drop' | 'stitch' | 'done'>('typing');
  const [spaceWidth, setSpaceWidth] = useState(7.7125);

  const measureRef = useRef<HTMLSpanElement>(null);

  const dropProgress = useMotionValue(0);
  const stitchProgress = useMotionValue(0);

  // clamp:false — spring overshoot gives blank a real visible bounce
  const blankY = useTransform(dropProgress, [0, 1], [-220, 0], { clamp: false });

  // ____ clamped — freeze at endpoint, no ghost on overshoot
  const underscoreOpacity = useTransform(dropProgress, [0.8, 1], [1, 0]);
  const underscoreY = useTransform(dropProgress, [0.88, 1], [0, 14]);
  const underscoreScaleY = useTransform(dropProgress, [0.88, 1], [1, 0.15]);

  // Stitch transforms: seamless closure of spaces from exact resting coordinates
  const aX = useTransform(stitchProgress, [0, 1], [0, -spaceWidth]);
  const blankX = useTransform(stitchProgress, [0, 1], [0, -2 * spaceWidth]);

  const dropAnimRef = useRef<ReturnType<typeof fmAnimate> | null>(null);
  const stitchAnimRef = useRef<ReturnType<typeof fmAnimate> | null>(null);

  const startStitch = useCallback(() => {
    setStage('stitch');
    stitchAnimRef.current?.stop();
    stitchAnimRef.current = fmAnimate(stitchProgress, 1, {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      onComplete: () => setStage('done'),
    });
  }, [stitchProgress]);

  const startDrop = useCallback(() => {
    setShowCursor(false);
    setIsDropping(true);
    setStage('drop');
    dropAnimRef.current?.stop();
    dropAnimRef.current = fmAnimate(dropProgress, 1, {
      type: 'spring',
      duration: 0.7,
      damping: 12,
      onComplete: startStitch,
    });
  }, [dropProgress, startStitch]);

  useEffect(() => {
    if (!document.getElementById('_fab_blink_style')) {
      const tag = document.createElement('style');
      tag.id = '_fab_blink_style';
      tag.innerHTML = BLINK_STYLE;
      document.head.appendChild(tag);
    }

    // Measure actual rendered font space width
    const measureSpace = () => {
      if (measureRef.current) {
        const w = measureRef.current.getBoundingClientRect().width;
        if (w > 0) {
          setSpaceWidth(w);
        }
      }
    };
    measureSpace();
    document.fonts?.ready?.then(measureSpace);

    // Cancel any in-flight animations
    dropAnimRef.current?.stop();
    stitchAnimRef.current?.stop();

    // Reset all animation state
    dropProgress.set(0);
    stitchProgress.set(0);
    setTypedIndex(0);
    setShowCursor(true);
    setIsDropping(false);
    setStage('typing');

    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const next = () => {
      i++;
      setTypedIndex(i);
      if (i >= FULL_TEXT.length) {
        t = setTimeout(startDrop, 380);
        return;
      }
      t = setTimeout(next, 120 + Math.random() * 60);
    };

    // On initial mount, 350ms delay for smooth page entry.
    // On re-click, 150ms for responsive restart.
    const initialDelay = replayTrigger === 0 ? 350 : 150;
    t = setTimeout(next, initialDelay);

    return () => {
      clearTimeout(t);
      dropAnimRef.current?.stop();
      stitchAnimRef.current?.stop();
    };
  }, [replayTrigger, startDrop, dropProgress, stitchProgress]);

  const font: React.CSSProperties = {
    fontFamily: "var(--font-syne), 'Syne', sans-serif",
    fontWeight: 700,
    lineHeight: 1.15,
    fontSize: className?.includes('compact') ? '1.05rem' : 'clamp(1.2rem, 2.4vw, 1.55rem)',
    whiteSpace: 'nowrap',
  };

  // Sliced text parts for smooth typing in identical DOM flow
  const fillPart = FULL_TEXT.slice(0, Math.min(typedIndex, 4));
  const underscoreCount = Math.max(0, Math.min(typedIndex - 7, 4));
  const underscorePart = '_'.repeat(underscoreCount);

  return (
    <div className={className} style={{ ...font, display: 'inline-block', position: 'relative' }}>
      {/* Hidden space width calibration target */}
      <span
        ref={measureRef}
        aria-hidden
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          whiteSpace: 'pre',
        }}
      >
        {' '}
      </span>

      {/* Stable spacer — guarantees the container width never shifts */}
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

      {/* ── UNIFIED ANIMATION LAYER ── */}
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
          {/* "Fill" */}
          <span>{fillPart}</span>
          {typedIndex <= 4 && showCursor && <span className="_fab_cursor text-[#d4a359]">|</span>}

          {/* Space 1 */}
          {typedIndex >= 5 && <span style={{ whiteSpace: 'pre' }}> </span>}
          {typedIndex === 5 && showCursor && <span className="_fab_cursor text-[#d4a359]">|</span>}

          {/* "a" — smoothly stitches to the left with transform */}
          {typedIndex >= 6 && (
            <motion.span style={{ x: aX, display: 'inline-block' }}>
              a
              {typedIndex === 6 && showCursor && <span className="_fab_cursor text-[#d4a359]">|</span>}
            </motion.span>
          )}

          {/* Space 2 */}
          {typedIndex >= 7 && <span style={{ whiteSpace: 'pre' }}> </span>}
          {typedIndex === 7 && showCursor && <span className="_fab_cursor text-[#d4a359]">|</span>}

          {/* Collision zone: ____ and blank — smoothly stitches left with transform */}
          {typedIndex >= 8 && (
            <motion.span
              style={{
                x: blankX,
                position: 'relative',
                display: 'inline-block',
              }}
            >
              {/* Sizer matches "____" so layout width is consistent */}
              <span aria-hidden style={{ visibility: 'hidden' }}>
                ____
              </span>

              {/* Underscores typed, then crushed upon blank impact */}
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
                  <span className="_fab_cursor text-[#d4a359]">|</span>
                )}
              </motion.span>

              {/* "blank" dropping from top with visible spring physics */}
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
        /* ── FINAL RESTING STATE ── */
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
  );
}
