/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialWeddingConfig } from './data/weddingConfig';
import { WeddingConfig } from './types/wedding';
import { CoverSection } from './components/cover/CoverSection';
import { OpeningSection } from './components/sections/OpeningSection';
import { CoupleSection } from './components/sections/CoupleSection';
import { EventSection } from './components/sections/EventSection';
import { CountdownSection } from './components/sections/CountdownSection';
import { StorySection } from './components/sections/StorySection';
import { GallerySection } from './components/gallery/GallerySection';
import { LocationSection } from './components/sections/LocationSection';
import { RsvpSection } from './components/forms/RsvpSection';
import { GuestbookSection } from './components/forms/GuestbookSection';
import { GiftSection } from './components/sections/GiftSection';
import { ClosingSection } from './components/sections/ClosingSection';
import { AudioPlayer } from './components/audio/AudioPlayer';
import { ConfigDrawer } from './components/configModal/ConfigDrawer';
import { Toast } from './components/common/Toast';

export default function App() {
  const [config, setConfig] = useState<WeddingConfig>(initialWeddingConfig);
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [isOpened, setIsOpened] = useState(false);
  const [audioTriggered, setAudioTriggered] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Extract guest name from query string (?to=Nama+Tamu) or hash
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const toParam = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest');
      if (toParam && toParam.trim()) {
        setGuestName(toParam.trim());
      }
    } catch (e) {
      console.warn('Could not parse URL params', e);
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    // User interaction has occurred, safe to start background music
    setAudioTriggered(true);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#39342D] selection:bg-[#D4B779]/30">
      {/* 1. Sampul Undangan (Cover Section with Gate Photo) */}
      <CoverSection
        config={config}
        guestName={guestName}
        onOpenInvitation={handleOpenInvitation}
        isOpened={isOpened}
      />

      {/* Main Wedding Content Container */}
      <main className="w-full">
        {/* 2. Pembuka & Sambutan */}
        <OpeningSection config={config} />

        {/* 3. Profil Mempelai */}
        {config.visibility.showCoupleProfiles && (
          <CoupleSection config={config} />
        )}

        {/* 4. Detail Acara */}
        {config.visibility.showEvents && (
          <EventSection config={config} />
        )}

        {/* 5. Hitung Mundur Acara */}
        {config.visibility.showCountdown && (
          <CountdownSection config={config} />
        )}

        {/* 6. Kisah Perjalanan Kasih */}
        {config.visibility.showStory && (
          <StorySection config={config} />
        )}

        {/* 7. Galeri Foto */}
        {config.visibility.showGallery && (
          <GallerySection config={config} />
        )}

        {/* 8. Lokasi dan Petunjuk Arah */}
        {config.visibility.showLocation && (
          <LocationSection config={config} onShowToast={showToast} />
        )}

        {/* 9. RSVP / Konfirmasi Kehadiran */}
        {config.visibility.showRsvp && (
          <RsvpSection
            config={config}
            defaultGuestName={guestName}
            onShowToast={showToast}
          />
        )}

        {/* 10. Buku Tamu Digital */}
        {config.visibility.showGuestbook && (
          <GuestbookSection
            config={config}
            defaultGuestName={guestName}
            onShowToast={showToast}
          />
        )}

        {/* 11. Informasi Hadiah & Rekening */}
        {config.visibility.showGifts && (
          <GiftSection config={config} onShowToast={showToast} />
        )}

        {/* 12. Penutup & Signature */}
        {config.visibility.showFooter && (
          <ClosingSection config={config} />
        )}
      </main>

      {/* 13. Pemutar Musik Latar (Single Shared Audio) */}
      <AudioPlayer
        config={config}
        autoPlayTriggered={audioTriggered}
      />

      {/* 14. Pengaturan Template & Klien Drawer */}
      <ConfigDrawer
        config={config}
        onUpdateConfig={setConfig}
        guestName={guestName}
        onUpdateGuestName={setGuestName}
        onShowToast={showToast}
      />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
