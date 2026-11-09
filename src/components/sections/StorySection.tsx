import React from 'react';
import { Heart } from 'lucide-react';
import { WeddingConfig } from '../../types/wedding';
import { FloralDivider } from '../common/FloralDivider';
import { SigerIcon } from '../common/SigerIcon';

interface StorySectionProps {
  config: WeddingConfig;
}

export const StorySection: React.FC<StorySectionProps> = ({ config }) => {
  if (!config.story || config.story.length === 0) return null;

  return (
    <section className="relative w-full py-16 sm:py-24 px-6 bg-[#FAF7F2] text-[#39342D]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-2">
            <SigerIcon size={32} color="#D4B779" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A98743]">
            Perjalanan Kasih
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2620] font-normal mt-1">
            Kisah Cinta Kami
          </h2>
          <FloralDivider variant="simple" />
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-[#D4B779]/40 ml-4 sm:ml-32 md:ml-40 space-y-12">
          {config.story.map((item, idx) => (
            <div key={item.id} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#FAF7F2] border-2 border-[#D4B779] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#A98743]" />
              </div>

              {/* Year badge aligned to left on tablet/desktop */}
              <div className="sm:absolute sm:-left-32 sm:top-0 sm:text-right sm:w-24">
                <span className="inline-block text-xs font-bold text-[#A98743] tracking-widest uppercase">
                  {item.year}
                </span>
              </div>

              {/* Story Content Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8DFC9] shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-3.5 h-3.5 text-[#A98743]" />
                  <h3 className="font-serif text-xl sm:text-2xl text-[#2B2620] font-medium">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm text-[#5E574D] leading-relaxed">
                  {item.description}
                </p>

                {item.photo && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-[#E8DFC9] max-h-56">
                    <img
                      src={item.photo}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-48 sm:h-56 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
