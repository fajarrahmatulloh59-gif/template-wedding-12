import React, { useState, useEffect } from 'react';
import { CalendarHeart, BellRing } from 'lucide-react';
import { WeddingConfig } from '../../types/wedding';
import { calculateTimeLeft, TimeLeft, createGoogleCalendarUrl } from '../../utils/dateUtils';
import { SigerIcon } from '../common/SigerIcon';

interface CountdownSectionProps {
  config: WeddingConfig;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ config }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(config.countdownTargetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(config.countdownTargetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [config.countdownTargetDate]);

  const primaryEvent = config.events[0];
  const gcalUrl = primaryEvent
    ? createGoogleCalendarUrl({
        title: `Pernikahan ${config.couple.coupleDisplayName}`,
        description: `Hari Bahagia Pernikahan Adat Sunda ${config.couple.coupleDisplayName}.`,
        location: primaryEvent.venueName,
        startDate: primaryEvent.date,
        startTime: primaryEvent.startTime,
        endTime: primaryEvent.endTime,
      })
    : '#';

  const timeUnits = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <section className="relative w-full py-16 px-6 bg-[#332E27] text-[#F8F5EF] overflow-hidden">
      {/* Decorative Traditional Background Subtle Flourish */}
      <div className="absolute inset-0 bg-radial-[circle_at_top] from-[#453E35] to-[#24201A] opacity-90" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
        <SigerIcon size={280} color="#D4B779" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 mb-2 text-[#D4B779]">
          <CalendarHeart className="w-5 h-5" />
          <span className="text-xs uppercase tracking-[0.2em] font-medium">
            Menghitung Hari
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-8">
          Menuju Hari Bahagia
        </h2>

        {timeLeft.isExpired ? (
          <div className="p-6 rounded-2xl bg-white/10 border border-[#D4B779]/40 text-stone-200">
            <p className="font-serif text-2xl text-[#D4B779]">Acara Telah Berlangsung</p>
            <p className="text-xs text-stone-300 mt-1">
              Hatur nuhun atas segala doa restu dan kehadiran sanak saudara sekalian.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-lg mb-8">
            {timeUnits.map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center justify-center py-4 px-2 sm:py-5 rounded-2xl bg-stone-900/60 border border-[#D4B779]/40 backdrop-blur-xs shadow-lg"
              >
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#D4B779] tabular-nums leading-none">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-300 font-medium mt-2">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Add to Calendar Action */}
        <a
          href={gcalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4B779] hover:bg-[#c4a55f] text-[#24201A] font-medium text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-98 min-h-[44px]"
        >
          <BellRing className="w-4 h-4" />
          <span>Ingatkan Saya di Google Calendar</span>
        </a>
      </div>
    </section>
  );
};
