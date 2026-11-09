import React from 'react';
import { WeddingConfig } from '../../types/wedding';
import { FloralDivider } from '../common/FloralDivider';
import { SigerIcon } from '../common/SigerIcon';

interface ClosingSectionProps {
  config: WeddingConfig;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ config }) => {
  return (
    <footer className="relative w-full py-20 px-6 bg-[#2B2620] text-[#F8F5EF] text-center overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_center] from-[#3E372E] to-[#1E1B17] opacity-80 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Prominent Siger Closing Icon */}
        <div className="mb-4">
          <SigerIcon size={48} color="#D4B779" />
        </div>

        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4B779] mb-3">
          Hatur Nuhun
        </span>

        <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-4">
          Ungkapan Terima Kasih
        </h3>

        <FloralDivider variant="simple" />

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-lg mb-8 font-light">
          Merupakan suatu kehormatan dan kebahagiaan yang mendalam bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu kepada kami. Atas kehadiran dan doa tulus yang dipanjatkan, kami haturkan terima kasih yang sebesar-besarnya.
        </p>

        <p className="font-serif text-sm italic text-[#D4B779] mb-2">
          Kami yang berbahagia beserta keluarga besar,
        </p>

        <h4 className="font-serif text-4xl sm:text-5xl text-white font-medium tracking-wide my-2">
          {config.couple.coupleDisplayName}
        </h4>

        <div className="mt-12 pt-6 border-t border-stone-700/60 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-3">
          <p>© {new Date().getFullYear()} {config.couple.coupleDisplayName} Wedding. All rights reserved.</p>
          <p className="text-stone-400">
            Dibuat dengan adat Kasundaan oleh <span className="text-[#D4B779] font-medium">RumahUndangan</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
