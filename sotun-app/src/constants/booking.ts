import type { BookingChannel, BookingStatus, PayoutStatus } from '@/types/entities';

export const BOOKING_CHANNELS: readonly { value: BookingChannel; label: string }[] = [
  { value: 'Airbnb', label: 'Airbnb' },
  { value: 'Booking', label: 'Booking.com' },
  { value: 'Agoda', label: 'Agoda' },
  { value: 'Direct', label: 'Direct' },
  { value: 'Walk-in', label: 'Walk-in' },
] as const;

export const BOOKING_STATUSES: readonly { value: BookingStatus; label: string }[] = [
  { value: 'Inquiry', label: 'Inquiry' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Confirmed', label: 'Confirmed' },
  { value: 'Checked-in', label: 'Checked-in' },
  { value: 'Checked-out', label: 'Checked-out' },
  { value: 'Cancelled', label: 'Cancelled' },
  { value: 'No-show', label: 'No-show' },
] as const;

export const PAYOUT_STATUSES: readonly { value: PayoutStatus; label: string }[] = [
  { value: 'Unpaid', label: 'Unpaid' },
  { value: 'Partially', label: 'Partially Paid' },
  { value: 'Paid', label: 'Paid' },
] as const;

export const CALENDAR_CELL_STATUSES = [
  'Available',
  'Blocked',
  'Booked',
  'Pending',
  'Maintenance',
] as const;
