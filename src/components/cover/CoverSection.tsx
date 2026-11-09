import React, { useState } from 'react';
import { MailOpen, Calendar, MapPin } from 'lucide-react';
import { WeddingConfig } from '../../types/wedding';
import { SigerIcon } from '../common/SigerIcon';
import { formatIndonesianDate } from '../../utils/dateUtils';

interface CoverSectionProps {
  config: WeddingConfig;
  guestName: string;
  onOpenInvitation: () => void;
  isOpened: boolean;
}

export const CoverSection: React.FC<CoverSectionProps> = ({
  config,
  guestName,
  onOpenInvitation,
  isOpened,
}) => {
  const [imageError, setImageError] = useState(false);
  const primaryEvent = config.events[0];

  const handleOpenClick = () => {
    onOpenInvitation();
    // Smooth scroll down to main content
    const contentEl = document.getElementById('wedding-content');
    if (contentEl) {
      setTimeout(() => {
        contentEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <section
      className={`relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden transition-all duration-700 bg-[#1e1b18] text-[#F8F5EF]`}
      aria-label="Sampul Undangan Pernikahan Sunda Heritage"
    >
      {/* Background Wedding Gate Image with Graceful Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        {!imageError ? (
          <img
            src={config.coverImage}
            alt="Gapura Pernikahan Adat Sunda"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#2B2620] via-[#39342D] to-[#1E1B18] flex items-center justify-center">
            <SigerIcon size={80} color="#D4B779" className="opacity-40" />
          </div>
        )}

        {/* Elegant Sundanese Heritage Vignette & Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1815] via-black/45 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-[#1a1815]/30 to-[#1a1815]/80 pointer-events-none" />
      </div>

      {/* Top Ornamental Badge & Title */}
      <div className="relative z-10 pt-10 sm:pt-14 px-6 text-center flex flex-col items-center animate-in fade-in duration-700">
        <div className="flex items-center gap-2 mb-2">
          <SigerIcon size={34} color="#D4B779" />
        </div>
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#D4B779]">
          The Wedding Celebration Of
        </p>
      </div>

      {/* Center Couple Identity & Traditional Callout */}
      <div className="relative z-10 max-w-xl mx-auto px-6 py-6 text-center flex flex-col items-center">
        {/* Subtle decorative arch frame */}
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4B779] to-transparent mb-5" />

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-white tracking-wide leading-tight drop-shadow-md">
          {config.couple.coupleDisplayName}
        </h1>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4B779] to-transparent mt-4 mb-4" />

        {primaryEvent && (
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#F5E8C7]/90 font-light tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#D4B779]" />
            <span>{formatIndonesianDate(primaryEvent.date)}</span>
            <span aria-hidden="true">·</span>
            <MapPin className="w-3.5 h-3.5 text-[#D4B779]" />
            <span>Bandung, Jawa Barat</span>
          </div>
        )}
      </div>

      {/* Bottom Guest Personalization Box & Open Button */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6 pb-12 sm:pb-16 text-center flex flex-col items-center">
        <div className="w-full backdrop-blur-md bg-stone-900/60 border border-[#D4B779]/35 rounded-2xl p-6 shadow-2xl text-stone-200 mb-6">
          <p className="text-xs uppercase tracking-wider text-[#D4B779]/90 font-medium mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p className="font-serif text-2xl sm:text-3xl text-white font-medium my-1 tracking-wide">
            {guestName}
          </p>
          <p className="text-[11px] text-stone-300 font-light">
            *Mohon maaf apabila ada kesalahan penulisan nama atau gelar
          </p>
        </div>

        {/* Action Button: Buka Undangan */}
        <button
          onClick={handleOpenClick}
          className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#D4B779] hover:bg-[#c2a25c] active:scale-[0.98] text-[#24201A] font-medium text-sm tracking-wide shadow-lg shadow-black/40 transition-all duration-200 cursor-pointer min-h-[44px]"
          aria-label="Buka Undangan Pernikahan"
        >
          <MailOpen className="w-4 h-4 text-[#24201A] transition-transform group-hover:-translate-y-0.5" />
          <span>Buka Undangan</span>
        </button>

        {isOpened && (
          <div className="mt-3 text-[11px] text-[#D4B779]/80 font-light">
            Silakan gulir ke bawah untuk melihat rangkaian acara
          </div>
        )}
      </div>
    </section>
  );
};
