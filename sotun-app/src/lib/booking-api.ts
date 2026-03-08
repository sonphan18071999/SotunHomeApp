import type { Booking, BookingChannel, BookingStatus, PayoutStatus } from '@/types/entities';
import { BOOKING_API_BASE_URL } from '@/lib/booking-config';

const VALID_CHANNELS: readonly BookingChannel[] = [
  'Airbnb',
  'Booking',
  'Agoda',
  'Direct',
  'Walk-in',
];
const VALID_STATUSES: readonly BookingStatus[] = [
  'Inquiry',
  'Pending',
  'Confirmed',
  'Checked-in',
  'Checked-out',
  'Cancelled',
  'No-show',
];
const VALID_PAYOUT: readonly PayoutStatus[] = ['Unpaid', 'Partially', 'Paid'];

const DEFAULT_CHANNEL: BookingChannel = 'Direct';
const DEFAULT_STATUS: BookingStatus = 'Pending';
const DEFAULT_PAYOUT: PayoutStatus = 'Unpaid';

const MAX_STRING_LENGTH = 2000;

function sanitizeString(value: unknown, maxLen: number = MAX_STRING_LENGTH): string {
  if (value == null) return '';
  const s = String(value).trim();
  return s.length > maxLen ? s.slice(0, maxLen) : s;
}

function parseDate(value: unknown): string {
  const s = sanitizeString(value, 10);
  if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return '';
  return s;
}

function toChannel(v: unknown): BookingChannel {
  const s = sanitizeString(v, 20);
  return (VALID_CHANNELS as readonly string[]).includes(s) ? (s as BookingChannel) : DEFAULT_CHANNEL;
}

function toStatus(v: unknown): BookingStatus {
  const s = sanitizeString(v, 20);
  return (VALID_STATUSES as readonly string[]).includes(s) ? (s as BookingStatus) : DEFAULT_STATUS;
}

function toPayout(v: unknown): PayoutStatus {
  const s = sanitizeString(v, 20);
  return (VALID_PAYOUT as readonly string[]).includes(s) ? (s as PayoutStatus) : DEFAULT_PAYOUT;
}

function normalizeBooking(raw: unknown): Booking | null {
  if (raw == null || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const id = sanitizeString(o.id, 100);
  const homestayId = sanitizeString(o.homestayId, 100);
  const roomId = sanitizeString(o.roomId, 100);
  const guestName = sanitizeString(o.guestName, 500);
  const checkInDate = parseDate(o.checkInDate);
  const checkOutDate = parseDate(o.checkOutDate);
  if (!id || !homestayId || !roomId || !guestName || !checkInDate || !checkOutDate) return null;
  return {
    id,
    homestayId,
    roomId,
    guestName,
    phone: sanitizeString(o.phone, 50) || undefined,
    email: sanitizeString(o.email, 255) || undefined,
    channel: toChannel(o.channel),
    checkInDate,
    checkOutDate,
    status: toStatus(o.status),
    payoutStatus: toPayout(o.payoutStatus),
    notes: sanitizeString(o.notes, 2000) || undefined,
  };
}

const BOOKINGS_PATH = '/bookings';

export async function fetchBookingsFromApi(): Promise<Booking[]> {
  const base = BOOKING_API_BASE_URL.replace(/\/$/, '');
  if (!base) return [];
  const url = `${base}${BOOKINGS_PATH}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  const data: unknown = await res.json();
  const list = Array.isArray(data) ? data : (data as Record<string, unknown>).bookings;
  if (!Array.isArray(list)) return [];
  const out: Booking[] = [];
  for (const item of list) {
    const b = normalizeBooking(item);
    if (b) out.push(b);
  }
  return out;
}
