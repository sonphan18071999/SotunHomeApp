/** Whether to use real booking API; when false, use mock data */
export const USE_REAL_BOOKING_API =
  process.env.NEXT_PUBLIC_USE_REAL_BOOKING_API === 'true';

/** Base URL for booking API (e.g. https://api.example.com) */
export const BOOKING_API_BASE_URL =
  process.env.NEXT_PUBLIC_BOOKING_API_BASE_URL ?? '';

/** Sync interval in ms; 0 disables auto-sync */
export const BOOKING_SYNC_INTERVAL_MS = (() => {
  const raw = process.env.NEXT_PUBLIC_BOOKING_SYNC_INTERVAL_MS;
  if (raw == null || raw === '') return 60_000;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : 60_000;
})();
