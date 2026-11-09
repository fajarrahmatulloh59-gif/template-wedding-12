import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, RefreshCw, HeartHandshake, ShieldCheck } from 'lucide-react';
import { WeddingConfig, GuestbookEntry } from '../../types/wedding';
import { spreadsheetService } from '../../services/spreadsheetService';
import { FloralDivider } from '../common/FloralDivider';
import { SigerIcon } from '../common/SigerIcon';

interface GuestbookSectionProps {
  config: WeddingConfig;
  defaultGuestName: string;
  onShowToast: (msg: string) => void;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({
  config,
  defaultGuestName,
  onShowToast,
}) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [senderName, setSenderName] = useState(
    defaultGuestName === 'Tamu Undangan' ? '' : defaultGuestName
  );
  const [message, setMessage] = useState('');

  const fetchEntries = async () => {
    setLoading(true);
    const result = await spreadsheetService.getGuestbookEntries(
      config.spreadsheet.webAppUrl,
      config.invitationId
    );
    if (result.success && result.data) {
      setEntries(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, [config.spreadsheet.webAppUrl, config.invitationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim()) {
      onShowToast('Mohon isi nama pengirim.');
      return;
    }
    if (!message.trim()) {
      onShowToast('Mohon tuliskan doa atau ucapan Anda.');
      return;
    }

    setSubmitting(true);
    const newEntry: Omit<GuestbookEntry, 'id'> = {
      timestamp: new Date().toISOString(),
      invitation_id: config.invitationId,
      guest_name: senderName.trim(),
      message: message.trim(),
      moderation_status: config.guestbook.requireModeration ? 'pending' : 'approved',
    };

    const res = await spreadsheetService.submitGuestbook(
      config.spreadsheet.webAppUrl,
      newEntry
    );

    setSubmitting(false);

    if (res.success) {
      setMessage('');
      onShowToast(res.message);
      // Refresh list to include newly approved message
      fetchEntries();
    } else {
      onShowToast(res.message || 'Gagal mengirim ucapan.');
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-6 bg-[#FAF7F2] text-[#39342D]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <SigerIcon size={32} color="#D4B779" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A98743]">
            Untaian Doa & Restu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2620] font-normal mt-1">
            Buku Tamu Digital
          </h2>
          <FloralDivider variant="simple" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Submission Form Column */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DFC9] shadow-sm">
            <h3 className="font-serif text-xl text-[#2B2620] font-medium mb-1">
              Kirimkan Doa & Ucapan
            </h3>
            <p className="text-xs text-[#81786D] mb-5">
              Tuliskan pesan penuh kasih untuk kedua mempelai
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#39342D] uppercase tracking-wider mb-1.5">
                  Nama Anda *
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Nama pengirim"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D4B779]/50 focus:border-[#A98743] focus:ring-1 focus:ring-[#A98743] outline-hidden text-sm bg-[#FAF7F0] text-[#39342D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#39342D] uppercase tracking-wider mb-1.5">
                  Doa & Ucapan *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={config.guestbook.placeholderMessage}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D4B779]/50 focus:border-[#A98743] focus:ring-1 focus:ring-[#A98743] outline-hidden text-sm bg-[#FAF7F0] text-[#39342D] resize-none"
                />
              </div>

              {config.guestbook.requireModeration && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#81786D] italic">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A98743]" />
                  <span>Ucapan akan ditinjau sebelum dipublikasikan</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#39342D] hover:bg-[#25221D] text-[#F8F5EF] font-medium text-xs tracking-wider uppercase shadow-xs transition-colors cursor-pointer disabled:opacity-50 min-h-[44px]"
              >
                {submitting ? (
                  <span>Mengirimkan...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#D4B779]" />
                    <span>Kirim Ucapan</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Greetings Feed Column */}
          <div className="lg:col-span-7 flex flex-col p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DFC9] shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE0] mb-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#39342D]">
                <MessageSquare className="w-4 h-4 text-[#A98743]" />
                <span>Ucapan Masuk ({entries.length})</span>
              </div>

              <button
                onClick={fetchEntries}
                disabled={loading}
                className="inline-flex items-center gap-1.5 text-xs text-[#81786D] hover:text-[#39342D] transition-colors cursor-pointer p-1"
                aria-label="Segarkan daftar ucapan"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span className="text-[11px]">Segarkan</span>
              </button>
            </div>

            {loading && entries.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#81786D]">
                Memuat doa dan ucapan tamu...
              </div>
            ) : entries.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center">
                <HeartHandshake className="w-10 h-10 text-[#D4B779] opacity-70 mb-2" />
                <p className="text-sm font-medium text-[#39342D]">Belum ada ucapan</p>
                <p className="text-xs text-[#81786D] mt-1">
                  Jadilah orang pertama yang mengirimkan doa restu untuk kedua mempelai!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[440px] overflow-y-auto pr-1">
                {entries.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EFE8D8] text-left"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-xs text-[#39342D]">
                        {item.guest_name}
                      </span>
                      <span className="text-[10px] text-[#A98743] font-mono">
                        {item.timestamp ? new Date(item.timestamp).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }) : ''}
                      </span>
                    </div>
                    <p className="text-xs text-[#5E574D] leading-relaxed whitespace-pre-wrap">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
