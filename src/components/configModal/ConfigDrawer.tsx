import React, { useState } from 'react';
import { Settings, X, Sliders, Database, Eye, RefreshCw, Copy, Check } from 'lucide-react';
import { WeddingConfig } from '../../types/wedding';
import { spreadsheetService } from '../../services/spreadsheetService';

interface ConfigDrawerProps {
  config: WeddingConfig;
  onUpdateConfig: (updated: WeddingConfig) => void;
  guestName: string;
  onUpdateGuestName: (name: string) => void;
  onShowToast: (msg: string) => void;
}

export const ConfigDrawer: React.FC<ConfigDrawerProps> = ({
  config,
  onUpdateConfig,
  guestName,
  onUpdateGuestName,
  onShowToast,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  const toggleSection = (key: keyof WeddingConfig['visibility']) => {
    onUpdateConfig({
      ...config,
      visibility: {
        ...config.visibility,
        [key]: !config.visibility[key],
      },
    });
  };

  const handleCopyGasCode = () => {
    navigator.clipboard.writeText(spreadsheetService.getGoogleAppsScriptSnippet());
    setCopiedScript(true);
    onShowToast('Kode Google Apps Script berhasil disalin!');
    setTimeout(() => setCopiedScript(false), 2500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#39342D]/90 hover:bg-[#39342D] text-[#F8F5EF] border border-[#D4B779]/40 shadow-xl backdrop-blur-md text-xs font-medium cursor-pointer transition-transform hover:scale-102"
        title="Buka Pengaturan Template & Klien"
      >
        <Sliders className="w-3.5 h-3.5 text-[#D4B779]" />
        <span className="hidden sm:inline">Konfigurasi Template</span>
      </button>

      {/* Slide-over Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          {/* Drawer Body */}
          <div
            className="w-full max-w-md bg-[#FAF7F0] h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-6 text-[#39342D] animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DFC9]">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#A98743]" />
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#2B2620]">
                      Pengaturan Undangan
                    </h3>
                    <p className="text-[11px] text-[#81786D]">
                      Template 14: Sunda Heritage (RumahUndangan)
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-stone-200/60 text-stone-600 transition-colors"
                  aria-label="Tutup pengaturan"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Guest Personalization */}
              <div className="my-6 p-4 rounded-2xl bg-white border border-[#E8DFC9] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#39342D] uppercase tracking-wider">
                    Simulasi Nama Tamu
                  </span>
                  <span className="text-[10px] text-[#A98743] font-mono">?to=...</span>
                </div>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => onUpdateGuestName(e.target.value)}
                  placeholder="Masukkan nama tamu untuk pratinjau"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D4B779]/50 bg-[#FAF7F0] focus:outline-hidden focus:ring-1 focus:ring-[#A98743]"
                />
                <p className="text-[11px] text-[#81786D]">
                  Pada undangan asli, nama tamu dibaca otomatis dari parameter URL: <code className="text-[#39342D] font-mono">?to=Bpk+Budi</code>
                </p>
              </div>

              {/* Section Visibility Toggles */}
              <div className="my-6 p-4 rounded-2xl bg-white border border-[#E8DFC9] space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-[#A98743]" />
                  <span className="text-xs font-bold text-[#39342D] uppercase tracking-wider">
                    Visibilitas Bagian Halaman
                  </span>
                </div>

                <div className="space-y-2">
                  {[
                    { key: 'showQuote' as const, label: 'Kutipan / Ayat Suci' },
                    { key: 'showEvents' as const, label: 'Rangkaian Acara & Peta' },
                    { key: 'showCountdown' as const, label: 'Hitung Mundur Acara' },
                    { key: 'showStory' as const, label: 'Kisah Cinta Pasangan' },
                    { key: 'showGallery' as const, label: 'Galeri Foto' },
                    { key: 'showRsvp' as const, label: 'Formulir RSVP' },
                    { key: 'showGuestbook' as const, label: 'Buku Tamu Digital' },
                    { key: 'showGifts' as const, label: 'Kado & Rekening Digital' },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-stone-50 cursor-pointer text-xs"
                    >
                      <span className="text-[#554E44]">{item.label}</span>
                      <input
                        type="checkbox"
                        checked={config.visibility[item.key]}
                        onChange={() => toggleSection(item.key)}
                        className="w-4 h-4 rounded text-[#A98743] accent-[#A98743] focus:ring-0 cursor-pointer"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Google Apps Script Integration Info */}
              <div className="my-6 p-4 rounded-2xl bg-white border border-[#E8DFC9] space-y-3">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#A98743]" />
                  <span className="text-xs font-bold text-[#39342D] uppercase tracking-wider">
                    Integrasi Google Sheets
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] text-[#81786D] mb-1">
                    Invitation ID (Isolasi Data Tamu):
                  </label>
                  <input
                    type="text"
                    value={config.invitationId}
                    onChange={(e) =>
                      onUpdateConfig({ ...config, invitationId: e.target.value })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#D4B779]/50 bg-[#FAF7F0] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#81786D] mb-1">
                    Web App URL Google Apps Script:
                  </label>
                  <input
                    type="text"
                    value={config.spreadsheet.webAppUrl}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        spreadsheet: { ...config.spreadsheet, webAppUrl: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#D4B779]/50 bg-[#FAF7F0] font-mono"
                  />
                </div>

                <button
                  onClick={handleCopyGasCode}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#D4B779] hover:bg-[#FAF7F0] text-xs font-medium text-[#4D4539] transition-colors"
                >
                  {copiedScript ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Kode Apps Script Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#A98743]" />
                      <span>Salin Kode Backend Apps Script</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DFC9] text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#39342D] hover:bg-[#25221D] text-white text-xs font-medium tracking-wide transition-colors"
              >
                Terapkan & Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
