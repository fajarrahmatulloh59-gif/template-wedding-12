import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check } from 'lucide-react';
import { WeddingConfig } from '../../types/wedding';
import { FloralDivider } from '../common/FloralDivider';
import { SigerIcon } from '../common/SigerIcon';

interface LocationSectionProps {
  config: WeddingConfig;
  onShowToast: (msg: string) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ config, onShowToast }) => {
  const [copied, setCopied] = useState(false);
  const primaryEvent = config.events[0];

  if (!primaryEvent) return null;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(primaryEvent.venueAddress);
    setCopied(true);
    onShowToast('Alamat lokasi berhasil disalin ke clipboard');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-6 bg-[#FAF7F2] text-[#39342D]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <SigerIcon size={32} color="#D4B779" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A98743]">
            Petunjuk Arah
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2620] font-normal mt-1">
            Lokasi Acara
          </h2>
          <FloralDivider variant="simple" />
        </div>

        {/* Location Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E8DFC9] shadow-sm text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-[#FAF7F0] border border-[#D4B779]/60 flex items-center justify-center mb-4 text-[#A98743] shadow-xs">
            <MapPin className="w-7 h-7" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2620] font-medium mb-2">
            {primaryEvent.venueName}
          </h3>

          <p className="text-sm text-[#5E574D] max-w-lg leading-relaxed mb-6">
            {primaryEvent.venueAddress}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
            <a
              href={primaryEvent.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#D4B779] hover:bg-[#c4a55f] text-[#24201A] font-semibold text-xs tracking-wider uppercase shadow-xs transition-colors min-h-[44px]"
            >
              <Navigation className="w-4 h-4" />
              <span>Buka Google Maps</span>
            </a>

            <button
              onClick={handleCopyAddress}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-[#D4B779] hover:bg-[#FAF7F0] text-xs font-medium text-[#4D4539] transition-colors min-h-[44px]"
              aria-label="Salin teks alamat lengkap"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#A98743]" />}
              <span>{copied ? 'Tersalin' : 'Salin Alamat'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
