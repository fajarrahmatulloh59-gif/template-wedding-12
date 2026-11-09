import React, { useState } from 'react';
import { Gift, Copy, Check, CreditCard, PackageCheck } from 'lucide-react';
import { WeddingConfig } from '../../types/wedding';
import { FloralDivider } from '../common/FloralDivider';
import { SigerIcon } from '../common/SigerIcon';

interface GiftSectionProps {
  config: WeddingConfig;
  onShowToast: (msg: string) => void;
}

export const GiftSection: React.FC<GiftSectionProps> = ({ config, onShowToast }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const { giftInfo } = config;
  if (!giftInfo.enabled) return null;

  const handleCopyAccount = (accountNumber: string, bankName: string, idx: number) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedIndex(idx);
    onShowToast(`Nomor rekening ${bankName} berhasil disalin`);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleCopyAddress = () => {
    if (!giftInfo.physicalGiftAddress) return;
    navigator.clipboard.writeText(
      `${giftInfo.physicalGiftAddress.recipientName}\n${giftInfo.physicalGiftAddress.phoneNumber}\n${giftInfo.physicalGiftAddress.fullAddress}`
    );
    setCopiedAddress(true);
    onShowToast('Alamat penerima kado berhasil disalin');
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-6 bg-[#F8F5EF] text-[#39342D] border-t border-[#E8DFC9]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <SigerIcon size={32} color="#D4B779" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A98743]">
            Tanda Kasih
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2620] font-normal mt-1">
            Amplop Digital & Kado
          </h2>
          <FloralDivider variant="simple" />
          <p className="text-xs sm:text-sm text-[#686054] max-w-lg mx-auto leading-relaxed -mt-2">
            {giftInfo.greeting}
          </p>
        </div>

        {/* Bank Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
          {giftInfo.bankAccounts.map((acc, idx) => (
            <div
              key={acc.accountNumber + idx}
              className="p-6 rounded-3xl bg-white border border-[#E8DFC9] shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-[#39342D] uppercase tracking-wider">
                  {acc.bankName}
                </span>
                <CreditCard className="w-5 h-5 text-[#A98743]" />
              </div>

              <div className="my-2">
                <p className="text-[11px] uppercase tracking-wider text-[#81786D]">
                  Nomor Rekening:
                </p>
                <p className="font-mono text-xl sm:text-2xl text-[#2B2620] font-bold tracking-wider my-1">
                  {acc.accountNumber}
                </p>
                <p className="text-xs text-[#5E574D]">
                  a.n. <span className="font-medium text-[#39342D]">{acc.accountHolder}</span>
                </p>
              </div>

              <button
                onClick={() => handleCopyAccount(acc.accountNumber, acc.bankName, idx)}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#D4B779] bg-[#FAF7F0] hover:bg-[#D4B779]/20 text-xs font-medium text-[#39342D] transition-colors min-h-[44px]"
                aria-label={`Salin nomor rekening ${acc.bankName}`}
              >
                {copiedIndex === idx ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Nomor Rekening Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#A98743]" />
                    <span>Salin Nomor Rekening</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Physical Gift Option */}
        {giftInfo.physicalGiftAddress && (
          <div className="max-w-2xl mx-auto p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DFC9] shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#D4B779]/60 flex items-center justify-center text-[#A98743] shrink-0">
                <PackageCheck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-serif text-lg text-[#2B2620] font-medium mb-1">
                  Kirim Kado Fisik
                </h4>
                <p className="text-xs text-[#5E574D] leading-relaxed mb-3">
                  {giftInfo.physicalGiftAddress.notes}
                </p>
                <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#EFE8D8] text-xs text-[#39342D] mb-4 space-y-1">
                  <p className="font-semibold text-sm">
                    {giftInfo.physicalGiftAddress.recipientName}
                  </p>
                  <p className="text-[#81786D]">{giftInfo.physicalGiftAddress.phoneNumber}</p>
                  <p className="leading-relaxed">{giftInfo.physicalGiftAddress.fullAddress}</p>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#D4B779] bg-white hover:bg-[#FAF7F0] text-xs font-medium text-[#39342D] transition-colors min-h-[44px]"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Alamat Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#A98743]" />
                      <span>Salin Alamat Lengkap</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
