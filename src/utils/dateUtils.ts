/**
 * Utility functions for date formatting, countdown timer, and calendar integration
 */

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function calculateTimeLeft(targetDateIso: string): TimeLeft {
  const target = new Date(targetDateIso).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (isNaN(target) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
}

const INDO_DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const INDO_MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export function formatIndonesianDate(isoDateString: string): string {
  try {
    const d = new Date(isoDateString);
    if (isNaN(d.getTime())) return isoDateString;
    const dayName = INDO_DAYS[d.getDay()];
    const dateNum = d.getDate();
    const monthName = INDO_MONTHS[d.getMonth()];
    const year = d.getFullYear();
    return `${dayName}, ${dateNum} ${monthName} ${year}`;
  } catch {
    return isoDateString;
  }
}

export function formatShortIndonesianDate(isoDateString: string): string {
  try {
    const d = new Date(isoDateString);
    if (isNaN(d.getTime())) return isoDateString;
    const dateNum = d.getDate();
    const monthName = INDO_MONTHS[d.getMonth()];
    const year = d.getFullYear();
    return `${dateNum} ${monthName} ${year}`;
  } catch {
    return isoDateString;
  }
}

/**
 * Generates Google Calendar Add Event URL
 */
export function createGoogleCalendarUrl(params: {
  title: string;
  description: string;
  location: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}): string {
  try {
    const cleanDate = params.startDate.replace(/-/g, '');
    const cleanStart = params.startTime.replace(':', '') + '00';
    let cleanEnd = params.endTime.replace(':', '');
    if (cleanEnd.toLowerCase().includes('selesai') || isNaN(Number(cleanEnd))) {
      // Default 3 hours after start
      const startH = parseInt(params.startTime.split(':')[0], 10) || 8;
      const endH = (startH + 3) % 24;
      cleanEnd = `${endH < 10 ? '0' : ''}${endH}0000`;
    } else {
      cleanEnd = cleanEnd + '00';
    }

    const startDateTime = `${cleanDate}T${cleanStart}`;
    const endDateTime = `${cleanDate}T${cleanEnd}`;

    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.set('action', 'TEMPLATE');
    url.searchParams.set('text', params.title);
    url.searchParams.set('details', params.description);
    url.searchParams.set('location', params.location);
    url.searchParams.set('dates', `${startDateTime}/${endDateTime}`);
    return url.toString();
  } catch {
    return 'https://calendar.google.com';
  }
}
