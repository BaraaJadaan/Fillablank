interface CurvedArrowProps {
  className?: string;
  direction?: 'back' | 'forward' | 'down';
}

export default function CurvedArrow({
  className = '',
  direction = 'back',
}: CurvedArrowProps) {
  const rotationClass =
    direction === 'forward'
      ? 'rotate-180 scale-y-[-1]'
      : direction === 'down'
      ? 'rotate-90'
      : '';

  return (
    <svg
      width="120"
      height="38"
      viewBox="0 0 192 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 ${rotationClass} ${className}`}
      aria-hidden="true"
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
