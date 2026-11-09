import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
  duration = 3500,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      role="alert"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-[#39342D] text-[#F8F5EF] shadow-xl border border-[#D4B779]/40 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-200 max-w-[90vw]"
    >
      {type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-[#D4B779] shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
      )}
      <span className="truncate">{message}</span>
      <button
        onClick={onClose}
        className="ml-1 text-stone-400 hover:text-white transition-colors"
        aria-label="Tutup notifikasi"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
