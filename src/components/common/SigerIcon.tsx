import React from 'react';

interface SigerIconProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
 * Custom handcrafted Sundanese Siger crown vector icon
 * Represents the iconic Mahkota Siger worn by Sundanese brides
 */
export const SigerIcon: React.FC<SigerIconProps> = ({
  className = '',
  size = 36,
  color = '#D4B779',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Central peak of Siger */}
      <path
        d="M32 6L35 18H29L32 6Z"
        fill={color}
        stroke={color}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="5" r="2.5" fill={color} />

      {/* Flanking peaks */}
      <path
        d="M24 10L27 20H21L24 10Z"
        fill={color}
        stroke={color}
        strokeWidth="0.8"
      />
      <circle cx="24" cy="9" r="2" fill={color} />

      <path
        d="M40 10L43 20H37L40 10Z"
        fill={color}
        stroke={color}
        strokeWidth="0.8"
      />
      <circle cx="40" cy="9" r="2" fill={color} />

      <path
        d="M16 16L19 23H13L16 16Z"
        fill={color}
        stroke={color}
        strokeWidth="0.8"
      />
      <circle cx="16" cy="15" r="1.8" fill={color} />

      <path
        d="M48 16L51 23H45L48 16Z"
        fill={color}
        stroke={color}
        strokeWidth="0.8"
      />
      <circle cx="48" cy="15" r="1.8" fill={color} />

      {/* Main Siger Crown Arch & Intricate Filigree */}
      <path
        d="M10 32C10 24 20 22 32 22C44 22 54 24 54 32C52 35 48 37 44 36C40 35 37 38 32 38C27 38 24 35 20 36C16 37 12 35 10 32Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Siger Forehead Band */}
      <path
        d="M12 34C18 38 24 40 32 40C40 40 46 38 52 34"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Decorative center gemstone / kembang goyang drop */}
      <path
        d="M32 26L34.5 30L32 34L29.5 30L32 26Z"
        fill={color}
      />
      <circle cx="23" cy="29" r="1.5" fill={color} />
      <circle cx="41" cy="29" r="1.5" fill={color} />

      {/* Drooping jasmine buds (ronce melati) representation */}
      <circle cx="14" cy="42" r="1.2" fill={color} opacity="0.8" />
      <circle cx="13" cy="47" r="1.2" fill={color} opacity="0.7" />
      <circle cx="12" cy="52" r="1.2" fill={color} opacity="0.6" />
      <circle cx="50" cy="42" r="1.2" fill={color} opacity="0.8" />
      <circle cx="51" cy="47" r="1.2" fill={color} opacity="0.7" />
      <circle cx="52" cy="52" r="1.2" fill={color} opacity="0.6" />
    </svg>
  );
};
