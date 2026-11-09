import React from 'react';
import { Calendar, Clock, MapPin, Navigation, CalendarPlus } from 'lucide-react';
import { WeddingConfig, WeddingEvent } from '../../types/wedding';
import { formatIndonesianDate, createGoogleCalendarUrl } from '../../utils/dateUtils';
import { FloralDivider } from '../common/FloralDivider';
import { SigerIcon } from '../common/SigerIcon';

interface EventSectionProps {
  config: WeddingConfig;
}

const EventCard: React.FC<{
  event: WeddingEvent;
  coupleName: string;
}> = ({ event, coupleName }) => {
  const gcalUrl = createGoogleCalendarUrl({
    title: `${event.name} — ${coupleName}`,
    description: `${event.subName || event.name} pernikahan ${coupleName}. Bertempat di ${event.venueName}.`,
    location: `${event.venueName}, ${event.venueAddress}`,
    startDate: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
  });

  return (
    <div className="relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-sm hover:shadow-md transition-shadow">
      {/* Decorative Top Accent Line */}
      <div className="w-12 h-1 bg-[#D4B779] rounded-full mb-4" />

      <div>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2620] font-medium tracking-wide">
          {event.name}
        </h3>
        {event.subName && (
          <p className="text-xs uppercase tracking-wider text-[#A98743] font-medium mt-1 mb-6">
            {event.subName}
          </p>
        )}

        <div className="space-y-4 my-6 text-sm text-[#554E44]">
          {/* Date */}
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-[#A98743] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#2B2620]">{formatIndonesianDate(event.date)}</p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#A98743] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#2B2620]">
                Pukul {event.startTime} - {event.endTime} {event.timezone}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#A98743] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#2B2620]">{event.venueName}</p>
              <p className="text-xs text-[#736B60] leading-relaxed mt-1">{event.venueAddress}</p>
            </div>
          </div>

          {event.notes && (
            <p className="text-xs text-[#8C8274] italic border-t border-[#F0EBE0] pt-3">
              *{event.notes}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-[#F0EBE0] flex flex-wrap gap-2.5">
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#D4B779]/60 hover:bg-[#D4B779]/20 text-xs font-semibold text-[#39342D] transition-colors min-h-[44px]"
        >
          <Navigation className="w-3.5 h-3.5 text-[#A98743]" />
          <span>Lihat Peta Lokasi</span>
        </a>

        <a
          href={gcalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#39342D] hover:bg-[#25221D] text-xs font-semibold text-[#F8F5EF] transition-colors min-h-[44px]"
          title="Simpan Acara ke Google Calendar"
        >
          <CalendarPlus className="w-3.5 h-3.5 text-[#D4B779]" />
          <span>Google Calendar</span>
        </a>
      </div>
    </div>
  );
};

export const EventSection: React.FC<EventSectionProps> = ({ config }) => {
  return (
    <section className="relative w-full py-16 sm:py-24 px-6 bg-[#F8F5EF] text-[#39342D]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <SigerIcon size={32} color="#D4B779" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A98743]">
            Rangkaian Acara
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2620] font-normal mt-1">
            Hari Istimewa Kami
          </h2>
          <FloralDivider variant="simple" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {config.events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              coupleName={config.couple.coupleDisplayName}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
