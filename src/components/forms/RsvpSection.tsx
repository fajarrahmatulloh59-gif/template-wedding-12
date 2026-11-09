import React, { useState } from 'react';
import { Send, CheckCircle2, UserCheck, Users, MessageSquareQuote } from 'lucide-react';
import { WeddingConfig, RsvpSubmission } from '../../types/wedding';
import { spreadsheetService } from '../../services/spreadsheetService';
import { FloralDivider } from '../common/FloralDivider';
import { SigerIcon } from '../common/SigerIcon';

interface RsvpSectionProps {
  config: WeddingConfig;
  defaultGuestName: string;
  onShowToast: (msg: string) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  config,
  defaultGuestName,
  onShowToast,
}) => {
  const [name, setName] = useState(defaultGuestName === 'Tamu Undangan' ? '' : defaultGuestName);
  const [status, setStatus] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      onShowToast('Mohon masukkan nama Anda.');
      return;
    }

    setLoading(true);

    const submission: RsvpSubmission = {
      timestamp: new Date().toISOString(),
      invitation_id: config.invitationId,
      guest_name: name.trim(),
      attendance_status: status,
      guest_count: guestCount,
      message: message.trim(),
    };

    const result = await spreadsheetService.submitRsvp(
      config.spreadsheet.webAppUrl,
      submission
    );

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      onShowToast(result.message);
    } else {
      onShowToast(result.message || 'Gagal mengirim konfirmasi kehadiran.');
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-6 bg-[#F8F5EF] text-[#39342D] border-t border-[#E8DFC9]">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <SigerIcon size={32} color="#D4B779" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A98743]">
            Konfirmasi Kehadiran
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2620] font-normal mt-1">
            Reservasi (RSVP)
          </h2>
          <FloralDivider variant="simple" />
          {config.rsvp.deadlineText && (
            <p className="text-xs text-[#81786D] italic -mt-2">
              {config.rsvp.deadlineText}
            </p>
          )}
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-sm">
          {submitted ? (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-[#2B2620] font-medium mb-1">
                Hatur Nuhun!
              </h3>
              <p className="text-sm text-[#5E574D] max-w-sm mb-6">
                Konfirmasi kehadiran Anda telah berhasil kami terima. Kehadiran dan doa restu Anda merupakan kehormatan besar bagi kami.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#A98743] hover:underline font-medium min-h-[44px] flex items-center"
              >
                Kirim Pembaharuan Kehadiran
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Guest Name */}
              <div>
                <label className="block text-xs font-semibold text-[#39342D] uppercase tracking-wider mb-1.5">
                  Nama Lengkap / Tamu *
                </label>
                <div className="relative">
                  <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A98743]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Bpk. Bambang & Keluarga"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D4B779]/50 focus:border-[#A98743] focus:ring-1 focus:ring-[#A98743] outline-hidden text-sm bg-[#FAF7F0] text-[#39342D]"
                  />
                </div>
              </div>

              {/* Attendance Status Radios (Styled cleanly without pills) */}
              <div>
                <label className="block text-xs font-semibold text-[#39342D] uppercase tracking-wider mb-2">
                  Status Kehadiran *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus('hadir')}
                    className={`py-3 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer min-h-[44px] flex items-center justify-center ${
                      status === 'hadir'
                        ? 'bg-[#39342D] text-[#F8F5EF] border-[#39342D] shadow-xs'
                        : 'bg-[#FAF7F0] text-[#554E44] border-[#E8DFC9] hover:bg-white'
                    }`}
                  >
                    Ya, Hadir
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('ragu')}
                    className={`py-3 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer min-h-[44px] flex items-center justify-center ${
                      status === 'ragu'
                        ? 'bg-[#39342D] text-[#F8F5EF] border-[#39342D] shadow-xs'
                        : 'bg-[#FAF7F0] text-[#554E44] border-[#E8DFC9] hover:bg-white'
                    }`}
                  >
                    Masih Ragu
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('tidak_hadir')}
                    className={`py-3 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer min-h-[44px] flex items-center justify-center ${
                      status === 'tidak_hadir'
                        ? 'bg-[#39342D] text-[#F8F5EF] border-[#39342D] shadow-xs'
                        : 'bg-[#FAF7F0] text-[#554E44] border-[#E8DFC9] hover:bg-white'
                    }`}
                  >
                    Tidak Hadir
                  </button>
                </div>
              </div>

              {/* Guest Count (if applicable) */}
              {config.rsvp.allowGuestCount && status === 'hadir' && (
                <div>
                  <label className="block text-xs font-semibold text-[#39342D] uppercase tracking-wider mb-1.5">
                    Jumlah Orang yang Hadir
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A98743]" />
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D4B779]/50 focus:border-[#A98743] focus:ring-1 focus:ring-[#A98743] outline-hidden text-sm bg-[#FAF7F0] text-[#39342D]"
                    >
                      {Array.from({ length: config.rsvp.maxGuestsPerSubmission }, (_, i) => i + 1).map(
                        (num) => (
                          <option key={num} value={num}>
                            {num} Orang
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              )}

              {/* Optional Message */}
              <div>
                <label className="block text-xs font-semibold text-[#39342D] uppercase tracking-wider mb-1.5">
                  Pesan atau Catatan (Opsional)
                </label>
                <div className="relative">
                  <MessageSquareQuote className="absolute left-3.5 top-3.5 w-4 h-4 text-[#A98743]" />
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Sampaikan kabar atau konfirmasi khusus..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D4B779]/50 focus:border-[#A98743] focus:ring-1 focus:ring-[#A98743] outline-hidden text-sm bg-[#FAF7F0] text-[#39342D] resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4B779] hover:bg-[#c4a55f] text-[#24201A] font-medium text-sm tracking-wider uppercase shadow-xs transition-colors cursor-pointer disabled:opacity-50 min-h-[44px]"
              >
                {loading ? (
                  <span>Mengirimkan...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Konfirmasi</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
