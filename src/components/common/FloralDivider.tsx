import React from 'react';

interface FloralDividerProps {
  className?: string;
  variant?: 'simple' | 'ornate' | 'arch';
  color?: string;
}

export const FloralDivider: React.FC<FloralDividerProps> = ({
  className = '',
  variant = 'ornate',
  color = '#D4B779',
}) => {
  if (variant === 'simple') {
    return (
      <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4B779]/60" />
        <div className="w-1.5 h-1.5 rotate-45 bg-[#D4B779]" />
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4B779]/60" />
      </div>
    );
  }

  if (variant === 'arch') {
    return (
      <div className={`flex flex-col items-center justify-center my-8 ${className}`}>
        <svg
          width="120"
          height="24"
          viewBox="0 0 120 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#D4B779]"
        >
          <path
            d="M10 18C35 4 85 4 110 18"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="60" cy="8" r="3" fill="currentColor" />
          <circle cx="45" cy="11" r="1.8" fill="currentColor" opacity="0.7" />
          <circle cx="75" cy="11" r="1.8" fill="currentColor" opacity="0.7" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-3 my-7 ${className}`}>
      <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#D4B779]/40 to-[#D4B779]" />
      <svg
        width="32"
        height="18"
        viewBox="0 0 32 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#D4B779] shrink-0"
      >
        {/* Central flower bud & side petaled flourishes */}
        <circle cx="16" cy="9" r="2.5" fill="currentColor" />
        <path
          d="M16 3C16 6 13 8 10 9C13 10 16 12 16 15C16 12 19 10 22 9C19 8 16 6 16 3Z"
          fill="currentColor"
          opacity="0.8"
        />
        <circle cx="6" cy="9" r="1.2" fill="currentColor" opacity="0.6" />
        <circle cx="26" cy="9" r="1.2" fill="currentColor" opacity="0.6" />
      </svg>
      <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent via-[#D4B779]/40 to-[#D4B779]" />
    </div>
  );
};
