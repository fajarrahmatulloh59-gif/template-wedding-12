/**
 * ============================================================================
 * RUMAHUNDANGAN - TEMPLATE 14: SUNDA HERITAGE
 * File: src/data/weddingConfig.ts
 *
 * Konfigurasi Utama Undangan Pernikahan Adat Sunda Modern.
 * Semua teks, foto, acara, rekening, dan pengaturan tampilan
 * diatur melalui satu berkas ini untuk memudahkan pergantian data klien.
 * ============================================================================
 */

import { WeddingConfig } from '../types/wedding';

// Jalur aset foto Sunda Heritage yang terverifikasi
const COVER_GATE_IMG = '/src/assets/images/sunda_wedding_gate_1792984687702.jpg';
const BRIDE_PORTRAIT_IMG = '/src/assets/images/sunda_bride_portrait_1792984688382.jpg';
const GROOM_PORTRAIT_IMG = '/src/assets/images/sunda_groom_portrait_1792984688388.jpg';
const COUPLE_GARDEN_IMG = '/src/assets/images/sunda_couple_garden_1792984689481.jpg';
const COUPLE_PORTRAIT_IMG = '/src/assets/images/sunda_couple_portrait_1792984689317.jpg';

export const initialWeddingConfig: WeddingConfig = {
  // EDIT DATA KLIEN: ID unik undangan klien untuk isolasi data RSVP & Buku Tamu di Google Sheets
  invitationId: 'sunda-heritage-galih-lia',

  // EDIT DATA KLIEN: Judul tab browser & deskripsi SEO
  metaTitle: 'Galih & Lia — Sunda Heritage Wedding Invitation',
  metaDescription: 'Walimatul Ursy Galih & Lia - Pernikahan Adat Sunda penuh berkah dan kehangatan.',

  // EDIT DATA KLIEN: Foto gerbang pernikahan Sunda (elemen identitas utama sampul)
  coverImage: COVER_GATE_IMG,
  coverGateFallback: COVER_GATE_IMG,

  // EDIT DATA KLIEN: Informasi mempelai pengantin
  couple: {
    coupleDisplayName: 'Galih & Lia',
    coupleInitials: 'G & L',
    groom: {
      fullName: 'Galih Permana Wijaya, S.T.',
      shortName: 'Galih',
      gender: 'groom',
      photo: GROOM_PORTRAIT_IMG,
      childOrderText: 'Putra kedua dari',
      fatherName: 'Bapak H. Dedi Suryana, M.M.',
      motherName: 'Ibu Hj. Nenden Kartika',
      instagramHandle: '@galihwijaya',
      instagramUrl: 'https://instagram.com',
      bio: 'Pribadi yang hangat dan penyabar, berakar pada keluhuran nilai Kasundaan silih asah, silih asih, silih asuh.',
      visible: true,
    },
    bride: {
      fullName: 'Lia Anindita Putri, S.Farm.',
      shortName: 'Lia',
      gender: 'bride',
      photo: BRIDE_PORTRAIT_IMG,
      childOrderText: 'Putri bungsu dari',
      fatherName: 'Bapak Ir. H. Asep Mulyadi',
      motherName: 'Ibu Hj. Rina Rostika',
      instagramHandle: '@liaanindita',
      instagramUrl: 'https://instagram.com',
      bio: 'Senyuman penuh keanggunan bermahkota Siger Sunda, siap melangkah dalam ikatan suci membina bahtera sakinah.',
      visible: true,
    },
  },

  // EDIT DATA KLIEN: Sambutan & kutipan pembuka (dapat bernuansa islami, universal, atau kearifan Sunda)
  opening: {
    quoteGreeting: 'Bismillaahirrohmaanirrohiim',
    quoteText:
      'Di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    quoteSource: 'Surat Ar-Rum Ayat 21',
    welcomeMessage:
      'Sampurasun. Kalayan nyuhunkeun widi ti Gusti Nu Maha Suci, kalayan bungahing manah, kami ngahaturanan kasumpingan saderek dina raraga walimatul ursy putra-putri kami:',
  },

  // EDIT DATA KLIEN: Daftar agenda acara (Akad Nikah, Resepsi, dsb.)
  events: [
    {
      id: 'akad-nikah',
      name: 'Akad Nikah',
      subName: 'Ijab Kabul & Upacara Adat Sunda',
      date: '2026-11-28',
      startTime: '08:00',
      endTime: '10:00',
      timezone: 'WIB',
      venueName: 'Gedung Bale Asri Pusdai',
      venueAddress: 'Jl. Diponegoro No. 63, Cihaur Geulis, Kec. Cibeunying Kaler, Kota Bandung, Jawa Barat 40122',
      mapsUrl: 'https://maps.google.com/?q=Pusdai+Bandung',
      notes: 'Khusus keluarga inti dan saksi akad. Diharapkan hadir 15 menit sebelum prosesi dimulai.',
    },
    {
      id: 'resepsi-nikah',
      name: 'Resepsi Pernikahan',
      subName: 'Walimatul Ursy & Pagelaran Seni Degung',
      date: '2026-11-28',
      startTime: '11:00',
      endTime: '14:00',
      timezone: 'WIB',
      venueName: 'Grand Ballroom Bale Asri Pusdai',
      venueAddress: 'Jl. Diponegoro No. 63, Cihaur Geulis, Kec. Cibeunying Kaler, Kota Bandung, Jawa Barat 40122',
      mapsUrl: 'https://maps.google.com/?q=Pusdai+Bandung',
      notes: 'Sesi ramah tamah, santap siang, serta doa restu bersama sanak saudara dan handai tolan tercinta.',
    },
  ],

  // EDIT DATA KLIEN: Tanggal patokan hitung mundur (countdown)
  countdownTargetDate: '2026-11-28T08:00:00+07:00',

  // EDIT DATA KLIEN: Kisah perjalanan cinta pasangan
  story: [
    {
      id: 'first-meet',
      year: '2021',
      title: 'Awal Mula Perjumpaan',
      description:
        'Pertemuan tak terduga di sebuah pameran seni budaya Parahyangan di Bandung. Percakapan santai tentang ketenangan gamelan degung mempertemukan frekuensi dua insan.',
      photo: COUPLE_PORTRAIT_IMG,
    },
    {
      id: 'commitment',
      year: '2023',
      title: 'Menjalin Komitmen',
      description:
        'Setelah saling mengenal kepribadian, visi masa depan, dan nilai keluarga, kami sepakat untuk melangkah bersama dengan niat tulus beribadah seumur hidup.',
      photo: COUPLE_GARDEN_IMG,
    },
    {
      id: 'engagement',
      year: '2025',
      title: 'Momen Lamaran & Restu Kolot',
      description:
        'Dihadapan kedua belah pihak keluarga besar dalam suasana adat Sunda yang hangat, ikatan resmi ditandai dengan seserahan dan doa restu para sesepuh.',
      photo: COVER_GATE_IMG,
    },
  ],

  // EDIT DATA KLIEN: Galeri dokumentasi pre-wedding & momen bahagia
  gallery: [
    {
      id: 'gal-1',
      url: COUPLE_GARDEN_IMG,
      title: 'Langkah Menuju Hari Bahagia',
      caption: 'Kebersamaan di taman Parahyangan penuh kehangatan',
      orientation: 'landscape',
      aspectRatioLabel: '16:9',
    },
    {
      id: 'gal-2',
      url: BRIDE_PORTRAIT_IMG,
      title: 'Anggun Bermahkota Siger',
      caption: 'Pesona pengantin wanita Sunda berbalut untaian melati suci',
      orientation: 'portrait',
      aspectRatioLabel: '3:4',
    },
    {
      id: 'gal-3',
      url: GROOM_PORTRAIT_IMG,
      title: 'Wibawa Pengantin Pria',
      caption: 'Keteguhan hati melangkah menjemput amanah suci',
      orientation: 'portrait',
      aspectRatioLabel: '3:4',
    },
    {
      id: 'gal-4',
      url: COUPLE_PORTRAIT_IMG,
      title: 'Silih Asih & Silih Asuh',
      caption: 'Senyum syukur yang terpatri di hadapan restu orang tua',
      orientation: 'square',
      aspectRatioLabel: '1:1',
    },
    {
      id: 'gal-5',
      url: COVER_GATE_IMG,
      title: 'Gapura Harapan Sunda',
      caption: 'Pintu gerbang pembuka perjalanan rumah tangga nan agung',
      orientation: 'portrait',
      aspectRatioLabel: '3:4',
    },
  ],

  // EDIT DATA KLIEN: Informasi amplop digital & kado pernikahan
  giftInfo: {
    enabled: true,
    greeting:
      'Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih berupa kado digital, kami sediakan saluran berikut:',
    bankAccounts: [
      {
        bankName: 'BCA (Bank Central Asia)',
        accountNumber: '7750982341',
        accountHolder: 'Galih Permana Wijaya',
      },
      {
        bankName: 'Bank Mandiri',
        accountNumber: '1310018928374',
        accountHolder: 'Lia Anindita Putri',
      },
    ],
    physicalGiftAddress: {
      recipientName: 'Keluarga Bpk. H. Dedi Suryana (Untuk Galih & Lia)',
      phoneNumber: '0812-3456-7890',
      fullAddress: 'Jl. Ranggamalela No. 18, Tamansari, Bandung Wetan, Kota Bandung, Jawa Barat 40116',
      notes: 'Penerimaan kado fisik dapat dikirimkan ke alamat kediaman orang tua mempelai.',
    },
  },

  // EDIT DATA KLIEN: Pengaturan RSVP
  rsvp: {
    enabled: true,
    allowGuestCount: true,
    maxGuestsPerSubmission: 5,
    deadlineText: 'Konfirmasi kehadiran paling lambat 20 November 2026',
  },

  // EDIT DATA KLIEN: Pengaturan Buku Tamu
  guestbook: {
    enabled: true,
    requireModeration: false,
    placeholderMessage: 'Tuliskan doa tulus dan harapan berkah untuk Galih & Lia...',
  },

  // EDIT DATA KLIEN: Pengaturan Lagu / Musik Latar
  music: {
    enabled: true,
    audioUrl: '/music/backsound.mp3', // Fallback audio sintetis gamelan degung aktif otomatis
    songTitle: 'Gending Degung Sunda — Karatagan Kembang Beureum',
    artist: 'Pusaka Parahyangan',
  },

  // EDIT DATA KLIEN: Toggle visibilitas tiap seksi undangan
  visibility: {
    showQuote: true,
    showCoupleProfiles: true,
    showEvents: true,
    showCountdown: true,
    showStory: true,
    showGallery: true,
    showLocation: true,
    showRsvp: true,
    showGuestbook: true,
    showGifts: true,
    showFooter: true,
  },

  // EDIT DATA KLIEN: URL Google Apps Script Web App untuk penyimpanan Google Sheets
  spreadsheet: {
    webAppUrl: 'https://script.google.com/macros/s/AKfycbz_SAMPLE_DEPLOYMENT_ID/exec',
  },
};
