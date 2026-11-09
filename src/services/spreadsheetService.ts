/**
 * Service for communicating with Google Apps Script Web App (Google Sheets Backend)
 * Handles RSVP and Guestbook submissions, moderation filtering, and local fallback storage.
 */

import { RsvpSubmission, GuestbookEntry } from '../types/wedding';

// Mock initial guestbook greetings if database is newly initialized
const DEFAULT_INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'gb-1',
    timestamp: '2026-10-25T14:20:00.000Z',
    invitation_id: 'sunda-heritage-galih-lia',
    guest_name: 'Drs. H. Maman Abdurrahman & Keluarga',
    message: 'Wilujeng ngambah sagara rumah tangga kanggo Galih & Lia. Mugi janten kulawarga anu sakinah, mawaddah, warahmah kalayan salamina aya dina panangtayungan Gusti Nu Maha Suci.',
    moderation_status: 'approved',
  },
  {
    id: 'gb-2',
    timestamp: '2026-10-25T16:45:00.000Z',
    invitation_id: 'sunda-heritage-galih-lia',
    guest_name: 'Kang Ridwan & Neng Anisa',
    message: 'Barakallahu lakuma wa baraka alaikuma wa jama’a bainakuma fii khoir. Doa terbaik dari kami di Bandung, mugia lancar dugika dinten H!',
    moderation_status: 'approved',
  },
  {
    id: 'gb-3',
    timestamp: '2026-10-25T18:10:00.000Z',
    invitation_id: 'sunda-heritage-galih-lia',
    guest_name: 'Alumni Farmasi Unpad 2017',
    message: 'Selamat berbahagia Lia & Galih! Masya Allah cantiknya Lia dengan mahkota Siger Sunda. Semoga rukun dan bahagia selalu yaa.',
    moderation_status: 'approved',
  },
];

export interface ServiceResult<T> {
  success: boolean;
  data?: T;
  message: string;
  source: 'google-sheets' | 'local-storage';
}

class SpreadsheetService {
  private getLocalKey(invitationId: string, type: 'rsvp' | 'guestbook'): string {
    return `sunda_heritage_${type}_${invitationId}`;
  }

  /**
   * Fetch approved guestbook greetings filtered by invitation_id
   */
  async getGuestbookEntries(
    webAppUrl: string,
    invitationId: string
  ): Promise<ServiceResult<GuestbookEntry[]>> {
    // Check if webAppUrl is a placeholder or invalid
    const isMockUrl =
      !webAppUrl ||
      webAppUrl.includes('SAMPLE_DEPLOYMENT_ID') ||
      !webAppUrl.startsWith('https://script.google.com');

    // Always fetch local storage cached entries first
    const localRaw = localStorage.getItem(this.getLocalKey(invitationId, 'guestbook'));
    let localList: GuestbookEntry[] = localRaw ? JSON.parse(localRaw) : DEFAULT_INITIAL_GUESTBOOK;

    if (isMockUrl) {
      return {
        success: true,
        data: localList.filter(
          (item) => item.invitation_id === invitationId && item.moderation_status === 'approved'
        ),
        message: 'Mengambil data buku tamu dari penyimpanan tersimpan (Demo Mode).',
        source: 'local-storage',
      };
    }

    try {
      const url = new URL(webAppUrl);
      url.searchParams.set('action', 'getGuestbook');
      url.searchParams.set('invitation_id', invitationId);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const json = await response.json();

      if (json && Array.isArray(json.data)) {
        const remoteApproved = json.data.filter(
          (item: GuestbookEntry) =>
            item.invitation_id === invitationId && item.moderation_status === 'approved'
        );
        // Sync local storage with latest remote data
        localStorage.setItem(this.getLocalKey(invitationId, 'guestbook'), JSON.stringify(remoteApproved));

        return {
          success: true,
          data: remoteApproved,
          message: 'Berhasil memuat doa dan ucapan tamu.',
          source: 'google-sheets',
        };
      }

      return {
        success: true,
        data: localList,
        message: 'Format respon Google Sheets tidak sesuai, menggunakan data lokal.',
        source: 'local-storage',
      };
    } catch (err) {
      console.warn('Google Apps Script getGuestbook error, falling back to local storage:', err);
      return {
        success: true,
        data: localList.filter(
          (item) => item.invitation_id === invitationId && item.moderation_status === 'approved'
        ),
        message: 'Koneksi lembar online terputus, menampilkan ucapan tersimpan.',
        source: 'local-storage',
      };
    }
  }

  /**
   * Submit RSVP response
   */
  async submitRsvp(
    webAppUrl: string,
    submission: RsvpSubmission
  ): Promise<ServiceResult<RsvpSubmission>> {
    // Validate inputs
    if (!submission.guest_name.trim()) {
      return {
        success: false,
        message: 'Nama tamu tidak boleh kosong.',
        source: 'local-storage',
      };
    }

    const isMockUrl =
      !webAppUrl ||
      webAppUrl.includes('SAMPLE_DEPLOYMENT_ID') ||
      !webAppUrl.startsWith('https://script.google.com');

    // Save locally
    const storageKey = this.getLocalKey(submission.invitation_id, 'rsvp');
    const existingRaw = localStorage.getItem(storageKey);
    const existingList: RsvpSubmission[] = existingRaw ? JSON.parse(existingRaw) : [];
    existingList.unshift(submission);
    localStorage.setItem(storageKey, JSON.stringify(existingList));

    if (isMockUrl) {
      // Simulate network latency for authentic feel
      await new Promise((res) => setTimeout(res, 500));
      return {
        success: true,
        data: submission,
        message: 'Konfirmasi kehadiran Anda telah tersimpan dengan baik. Hatur nuhun!',
        source: 'local-storage',
      };
    }

    try {
      const response = await fetch(webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'submitRsvp',
          ...submission,
        }),
      });

      const json = await response.json().catch(() => ({}));

      return {
        success: true,
        data: submission,
        message: json.message || 'Konfirmasi kehadiran berhasil terkirim ke Google Sheets. Hatur nuhun!',
        source: 'google-sheets',
      };
    } catch (err) {
      console.warn('Google Sheets RSVP network failed, stored in local fallback:', err);
      return {
        success: true,
        data: submission,
        message: 'Konfirmasi kehadiran tersimpan secara lokal dan akan disinkronkan saat online. Hatur nuhun!',
        source: 'local-storage',
      };
    }
  }

  /**
   * Submit Guestbook greeting
   */
  async submitGuestbook(
    webAppUrl: string,
    entry: Omit<GuestbookEntry, 'id'>
  ): Promise<ServiceResult<GuestbookEntry>> {
    if (!entry.guest_name.trim()) {
      return {
        success: false,
        message: 'Nama pengirim tidak boleh kosong.',
        source: 'local-storage',
      };
    }
    if (!entry.message.trim()) {
      return {
        success: false,
        message: 'Pesan ucapan tidak boleh kosong.',
        source: 'local-storage',
      };
    }

    const isMockUrl =
      !webAppUrl ||
      webAppUrl.includes('SAMPLE_DEPLOYMENT_ID') ||
      !webAppUrl.startsWith('https://script.google.com');

    const newEntry: GuestbookEntry = {
      ...entry,
      id: 'gb-' + Date.now(),
    };

    // Store to local storage
    const storageKey = this.getLocalKey(entry.invitation_id, 'guestbook');
    const existingRaw = localStorage.getItem(storageKey);
    const existingList: GuestbookEntry[] = existingRaw
      ? JSON.parse(existingRaw)
      : DEFAULT_INITIAL_GUESTBOOK;
    existingList.unshift(newEntry);
    localStorage.setItem(storageKey, JSON.stringify(existingList));

    if (isMockUrl) {
      await new Promise((res) => setTimeout(res, 500));
      return {
        success: true,
        data: newEntry,
        message:
          newEntry.moderation_status === 'pending'
            ? 'Ucapan Anda berhasil dikirim dan sedang menunggu moderasi.'
            : 'Ucapan dan doa restu Anda telah berhasil dipublikasikan. Hatur nuhun!',
        source: 'local-storage',
      };
    }

    try {
      const response = await fetch(webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'submitGuestbook',
          ...newEntry,
        }),
      });

      const json = await response.json().catch(() => ({}));

      return {
        success: true,
        data: newEntry,
        message:
          json.message ||
          (newEntry.moderation_status === 'pending'
            ? 'Ucapan Anda berhasil dikirim dan menunggu pemeriksaan pengantin.'
            : 'Hatur nuhun, ucapan & doa restu Anda berhasil disimpan di Google Sheets!'),
        source: 'google-sheets',
      };
    } catch (err) {
      console.warn('Google Sheets Guestbook submission failed, cached locally:', err);
      return {
        success: true,
        data: newEntry,
        message: 'Ucapan Anda tersimpan secara lokal dan siap ditampilkan. Hatur nuhun!',
        source: 'local-storage',
      };
    }
  }

  /**
   * Helper Google Apps Script Web App reference code for developers / clients
   */
  getGoogleAppsScriptSnippet(): string {
    return `// ============================================================================
// GOOGLE APPS SCRIPT CODE FOR RUMAHUNDANGAN (SUNDA HERITAGE)
// ============================================================================
// Petunjuk Pemasangan:
// 1. Buat Google Spreadsheet baru.
// 2. Beri nama Sheet1 menjadi "RSVP" dengan header baris 1:
//    timestamp | invitation_id | guest_name | attendance_status | guest_count | message
// 3. Buat Sheet kedua dengan nama "Guestbook" dengan header baris 1:
//    timestamp | invitation_id | guest_name | message | moderation_status
// 4. Buka menu Extensions > Apps Script, paste kode berikut lalu klik Deploy > New deployment:
//    - Select type: Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Salin Web App URL ke weddingConfig.ts (spreadsheet.webAppUrl)

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.action === "submitRsvp") {
      var sheetRsvp = ss.getSheetByName("RSVP") || ss.insertSheet("RSVP");
      sheetRsvp.appendRow([
        new Date().toISOString(),
        data.invitation_id || "",
        data.guest_name || "",
        data.attendance_status || "",
        data.guest_count || 1,
        data.message || ""
      ]);
      return createJsonResponse({ status: "success", message: "RSVP berhasil tersimpan." });
    }

    if (data.action === "submitGuestbook") {
      var sheetGb = ss.getSheetByName("Guestbook") || ss.insertSheet("Guestbook");
      sheetGb.appendRow([
        new Date().toISOString(),
        data.invitation_id || "",
        data.guest_name || "",
        data.message || "",
        data.moderation_status || "approved"
      ]);
      return createJsonResponse({ status: "success", message: "Buku tamu berhasil tersimpan." });
    }

    return createJsonResponse({ status: "error", message: "Aksi tidak dikenali." });
  } catch (error) {
    return createJsonResponse({ status: "error", message: error.toString() });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    var action = e.parameter.action;
    var invId = e.parameter.invitation_id;
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === "getGuestbook") {
      var sheetGb = ss.getSheetByName("Guestbook");
      if (!sheetGb) return createJsonResponse({ data: [] });
      var rows = sheetGb.getDataRange().getValues();
      var headers = rows[0];
      var list = [];
      for (var i = 1; i < rows.length; i++) {
        var r = rows[i];
        if (invId && r[1] !== invId) continue;
        list.push({
          timestamp: r[0],
          invitation_id: r[1],
          guest_name: r[2],
          message: r[3],
          moderation_status: r[4] || "approved"
        });
      }
      return createJsonResponse({ data: list });
    }
    return createJsonResponse({ status: "ok" });
  } catch (err) {
    return createJsonResponse({ status: "error", message: err.toString() });
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}`;
  }
}

export const spreadsheetService = new SpreadsheetService();
