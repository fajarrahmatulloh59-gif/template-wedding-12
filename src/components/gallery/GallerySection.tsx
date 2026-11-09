import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { WeddingConfig, GalleryPhoto } from '../../types/wedding';
import { FloralDivider } from '../common/FloralDivider';
import { SigerIcon } from '../common/SigerIcon';

interface GallerySectionProps {
  config: WeddingConfig;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ config }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const photos = config.gallery;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowRight') {
        setSelectedIdx((prev) => (prev !== null ? (prev + 1) % photos.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIdx((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, photos.length]);

  return (
    <section className="relative w-full py-16 sm:py-24 px-6 bg-[#F8F5EF] text-[#39342D]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <SigerIcon size={32} color="#D4B779" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A98743]">
            Kenangan Indah
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2620] font-normal mt-1">
            Galeri Momen Bahagia
          </h2>
          <FloralDivider variant="simple" />
        </div>

        {/* Gallery Grid respecting portrait, landscape, and square orientations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((item, idx) => {
            const isLandscape = item.orientation === 'landscape';
            const isSquare = item.orientation === 'square';

            return (
              <div
                key={item.id}
                onClick={() => setSelectedIdx(idx)}
                className={`group relative rounded-2xl overflow-hidden border border-[#E8DFC9] bg-[#FAF7F0] p-1.5 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer ${
                  isLandscape ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden rounded-xl bg-stone-100 flex items-center justify-center ${
                    isLandscape ? 'aspect-16/9' : isSquare ? 'aspect-square' : 'aspect-3/4'
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.title || 'Foto Pernikahan Sunda'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                  />

                  {/* Hover Overlay with Icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#39342D] mb-2 shadow-sm">
                      <Maximize2 className="w-4 h-4 text-[#A98743]" />
                    </div>
                    {item.title && (
                      <p className="font-serif text-white text-lg font-medium drop-shadow-sm">
                        {item.title}
                      </p>
                    )}
                    {item.caption && (
                      <p className="text-stone-200 text-xs italic mt-0.5 line-clamp-1">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && photos[selectedIdx] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedIdx(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIdx(null)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Tutup galeri"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIdx((selectedIdx - 1 + photos.length) % photos.length);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIdx((selectedIdx + 1) % photos.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Foto berikutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Photo Container showing full intact photo without cropping */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[selectedIdx].url}
              alt={photos[selectedIdx].title || 'Foto Galeri Pernikahan'}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
            {(photos[selectedIdx].title || photos[selectedIdx].caption) && (
              <div className="mt-4 text-center text-stone-200">
                <p className="font-serif text-xl text-white font-medium">
                  {photos[selectedIdx].title}
                </p>
                <p className="text-xs text-stone-300 italic mt-1">
                  {photos[selectedIdx].caption}
                </p>
              </div>
            )}
            <div className="text-[11px] text-[#D4B779] mt-2">
              {selectedIdx + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
