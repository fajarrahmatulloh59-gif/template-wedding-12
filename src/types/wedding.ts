/**
 * Type definitions for Template 14: Sunda Heritage - RumahUndangan
 */

export interface BrideGroomProfile {
  fullName: string;
  shortName: string;
  gender: 'bride' | 'groom';
  photo: string;
  fatherName: string;
  motherName: string;
  childOrderText: string; // e.g. "Putri pertama dari"
  instagramHandle?: string;
  instagramUrl?: string;
  bio?: string;
  visible: boolean;
}

export interface WeddingEvent {
  id: string;
  name: string; // e.g. "Akad Nikah", "Resepsi Pernikahan"
  subName?: string; // e.g. "Walimatul Ursy"
  date: string; // ISO format "2026-11-28"
  startTime: string; // e.g. "08:00"
  endTime: string; // e.g. "10:00" or "Selesai"
  timezone: string; // e.g. "WIB"
  venueName: string; // e.g. "Bumi Samami Bandung"
  venueAddress: string; // e.g. "Jl. Terusan Terusan No. 12, Bandung"
  mapsUrl: string; // Google Maps URL
  mapsEmbedUrl?: string; // Optional Google Maps embed iframe or direct link
  notes?: string; // e.g. "Hadir tepat waktu dengan mematuhi protokol kesehatan"
}

export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  photo?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title?: string;
  caption?: string;
  orientation: 'landscape' | 'portrait' | 'square';
  aspectRatioLabel?: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  bankLogo?: string;
  qrisImage?: string;
}

export interface GiftAddress {
  recipientName: string;
  phoneNumber: string;
  fullAddress: string;
  notes?: string;
}

export interface RsvpSubmission {
  timestamp: string;
  invitation_id: string;
  guest_name: string;
  attendance_status: 'hadir' | 'tidak_hadir' | 'ragu';
  guest_count: number;
  message?: string;
}

export interface GuestbookEntry {
  id?: string;
  timestamp: string;
  invitation_id: string;
  guest_name: string;
  message: string;
  moderation_status: 'pending' | 'approved' | 'rejected';
}

export interface WeddingConfig {
  invitationId: string; // ID unik undangan klien untuk isolasi data
  metaTitle: string;
  metaDescription: string;
  coverImage: string;
  coverGateFallback: string;
  couple: {
    bride: BrideGroomProfile;
    groom: BrideGroomProfile;
    coupleInitials: string; // e.g. "G & L"
    coupleDisplayName: string; // e.g. "Galih & Lia"
  };
  opening: {
    quoteGreeting: string; // e.g. "Bismillahirrohmaanirrohiim" or "Salam Sejahtera"
    quoteText: string;
    quoteSource: string; // e.g. "QS. Ar-Rum: 21"
    welcomeMessage: string;
  };
  events: WeddingEvent[];
  countdownTargetDate: string; // ISO date-time string e.g. "2026-11-28T08:00:00+07:00"
  story: StoryMilestone[];
  gallery: GalleryPhoto[];
  giftInfo: {
    enabled: boolean;
    greeting: string;
    bankAccounts: BankAccount[];
    physicalGiftAddress?: GiftAddress;
  };
  rsvp: {
    enabled: boolean;
    allowGuestCount: boolean;
    maxGuestsPerSubmission: number;
    deadlineText?: string;
  };
  guestbook: {
    enabled: boolean;
    requireModeration: boolean;
    placeholderMessage: string;
  };
  music: {
    enabled: boolean;
    audioUrl: string;
    songTitle: string;
    artist: string;
  };
  visibility: {
    showQuote: boolean;
    showCoupleProfiles: boolean;
    showEvents: boolean;
    showCountdown: boolean;
    showStory: boolean;
    showGallery: boolean;
    showLocation: boolean;
    showRsvp: boolean;
    showGuestbook: boolean;
    showGifts: boolean;
    showFooter: boolean;
  };
  spreadsheet: {
    // URL Web App Google Apps Script klien
    webAppUrl: string;
  };
}
