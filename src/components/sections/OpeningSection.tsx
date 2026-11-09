import React from 'react';
import { WeddingConfig } from '../../types/wedding';
import { SigerIcon } from '../common/SigerIcon';
import { FloralDivider } from '../common/FloralDivider';

interface OpeningSectionProps {
  config: WeddingConfig;
}

export const OpeningSection: React.FC<OpeningSectionProps> = ({ config }) => {
  return (
    <section
      id="wedding-content"
      className="relative w-full py-16 sm:py-24 px-6 bg-[#F8F5EF] text-[#39342D] border-b border-[#E8DFC9]"
    >
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
        {/* Siger Crown Accent */}
        <div className="mb-4">
          <SigerIcon size={42} color="#D4B779" />
        </div>

        {/* Greeting Line */}
        <h2 className="font-serif text-2xl sm:text-3xl text-[#39342D] italic font-normal mb-4">
          {config.opening.quoteGreeting}
        </h2>

        {/* Optional Quote / Holy Verse */}
        {config.visibility.showQuote && (
          <div className="my-3 px-4 py-6 rounded-2xl bg-white/70 border border-[#D4B779]/30 shadow-xs">
            <blockquote className="font-serif text-base sm:text-lg text-[#554E44] italic leading-relaxed">
              "{config.opening.quoteText}"
            </blockquote>
            <p className="mt-3 text-xs uppercase tracking-widest text-[#A98743] font-semibold">
              — {config.opening.quoteSource}
            </p>
          </div>
        )}

        <FloralDivider variant="simple" />

        {/* Welcome Text */}
        <p className="text-sm sm:text-base text-[#686054] leading-relaxed max-w-xl">
          {config.opening.welcomeMessage}
        </p>
      </div>
    </section>
  );
};
