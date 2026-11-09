import React from 'react';
import { Instagram } from 'lucide-react';
import { WeddingConfig, BrideGroomProfile } from '../../types/wedding';
import { FloralDivider } from '../common/FloralDivider';
import { SigerIcon } from '../common/SigerIcon';

interface CoupleSectionProps {
  config: WeddingConfig;
}

const ProfileCard: React.FC<{ profile: BrideGroomProfile; roleLabel: string }> = ({
  profile,
  roleLabel,
}) => {
  if (!profile.visible) return null;

  return (
    <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#E8DFC9] shadow-sm hover:shadow-md transition-shadow">
      {/* Traditional Sundanese Arched Frame for Photo */}
      <div className="relative w-52 sm:w-60 h-72 sm:h-80 mb-6 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#D4B779]/60 p-1.5 bg-[#FAF7F0] shadow-inner">
        <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden relative">
          <img
            src={profile.photo}
            alt={profile.fullName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A98743] mb-1">
        {roleLabel}
      </span>

      <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2620] font-medium tracking-wide mb-1">
        {profile.fullName}
      </h3>

      <p className="text-xs text-[#81786D] mb-3">
        ( {profile.shortName} )
      </p>

      <div className="text-xs sm:text-sm text-[#5E574D] leading-relaxed max-w-xs mb-4">
        <p className="font-light italic text-[#81786D]">{profile.childOrderText}</p>
        <p className="font-medium text-[#39342D] mt-0.5">{profile.fatherName}</p>
        <p className="text-xs text-[#81786D]">&amp;</p>
        <p className="font-medium text-[#39342D]">{profile.motherName}</p>
      </div>

      {profile.bio && (
        <p className="text-xs text-[#736B60] italic max-w-xs mb-5 border-t border-[#E8DFC9] pt-3">
          "{profile.bio}"
        </p>
      )}

      {profile.instagramHandle && (
        <a
          href={profile.instagramUrl || `https://instagram.com/${profile.instagramHandle.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D4B779]/60 text-xs font-medium text-[#5E5136] hover:bg-[#D4B779]/15 active:scale-95 transition-all min-h-[44px]"
          aria-label={`Kunjungi Instagram ${profile.shortName}`}
        >
          <Instagram className="w-3.5 h-3.5 text-[#A98743]" />
          <span>{profile.instagramHandle}</span>
        </a>
      )}
    </div>
  );
};

export const CoupleSection: React.FC<CoupleSectionProps> = ({ config }) => {
  const { bride, groom } = config.couple;

  return (
    <section className="relative w-full py-16 sm:py-24 px-6 bg-[#FAF7F2] text-[#39342D]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <SigerIcon size={32} color="#D4B779" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A98743]">
            Mempelai Pengantin
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2620] font-normal mt-1">
            Dua Insan Menuju Mahligai
          </h2>
          <FloralDivider variant="simple" />
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <ProfileCard profile={groom} roleLabel="Calon Pengantin Pria" />
          <ProfileCard profile={bride} roleLabel="Calon Pengantin Wanita" />
        </div>
      </div>
    </section>
  );
};
