'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
  id?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  strength = 0.35,
  id,
  ariaLabel,
  type = 'button',
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 15, mass: 0.1 }}
      className={`inline-block cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a
        id={id}
        href={href}
        aria-label={ariaLabel}
        className="inline-block"
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className="inline-block bg-transparent border-0 p-0 text-inherit focus:outline-none"
    >
      {content}
    </button>
  );
}
