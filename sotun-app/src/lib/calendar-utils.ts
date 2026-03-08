import dayjs from 'dayjs';
import type { Booking } from '@/types/entities';
import { MOCK_BOOKINGS } from '@/lib/mock-data';

const CANCELLED = 'Cancelled';

/** Bookings that include this date (checkIn <= date < checkOut), excluding cancelled */
export function getBookingsOnDate(
  date: string,
  homestayId: string,
  bookings: Booking[] = MOCK_BOOKINGS
): Booking[] {
  const d = dayjs(date);
  return bookings.filter(
    (b) =>
      b.homestayId === homestayId &&
      b.status !== CANCELLED &&
      (d.isSame(dayjs(b.checkInDate), 'day') || d.isAfter(dayjs(b.checkInDate), 'day')) &&
      d.isBefore(dayjs(b.checkOutDate), 'day')
  );
}

/** Whether the date has any active booking (for grey cell styling) */
export function isDateBooked(
  date: string,
  homestayId: string,
  bookings: Booking[] = MOCK_BOOKINGS
): boolean {
  return getBookingsOnDate(date, homestayId, bookings).length > 0;
}

/** Bookings with check-in on this exact day (for legacy/cell snippet) */
export function getBookingsForDate(
  date: string,
  homestayId: string,
  bookings: Booking[] = MOCK_BOOKINGS
): Booking[] {
  return bookings.filter(
    (b) =>
      b.homestayId === homestayId &&
      b.status !== CANCELLED &&
      dayjs(date).isSame(dayjs(b.checkInDate), 'day')
  );
}
