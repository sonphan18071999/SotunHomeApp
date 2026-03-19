import type { BookingChannel, BookingStatus, PayoutStatus } from '@/types/entities';

/** Tag color per booking status for consistent UI */
export const BOOKING_STATUS_TAG_COLORS: Record<BookingStatus, string> = {
  Inquiry: 'default',
  Pending: 'gold',
  Confirmed: 'blue',
  'Checked-in': 'cyan',
  'Checked-out': 'green',
  Cancelled: 'red',
  'No-show': 'volcano',
};

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

/** Two status options for manually added room bookings */
export const MANUAL_BOOKING_STATUSES: readonly { value: BookingStatus; label: string }[] = [
  { value: 'Confirmed', label: 'Confirmed' },
  { value: 'Checked-out', label: 'Checked-out' },
] as const;

export const ADD_BOOKING_MODAL_TITLE = 'Add booking';
export const ADD_BOOKING_BUTTON_TEXT = 'Add booking';
export const LABEL_BOOKING_STATUS = 'Booking status';
export const LABEL_GUEST_NAME = 'Guest name';
export const LABEL_CHECK_IN = 'Check-in';
export const LABEL_CHECK_OUT = 'Check-out';
export const LABEL_ADDITIONAL_NOTE = 'Additional note';
export const PLACEHOLDER_GUEST_NAME = 'Enter guest name';
export const PLACEHOLDER_NOTE = 'Optional note';
export const GUEST_NAME_REQUIRED = 'Guest name is required';
export const CHECK_IN_REQUIRED = 'Check-in date is required';
export const CHECK_OUT_REQUIRED = 'Check-out date is required';
export const CHECK_OUT_AFTER_CHECK_IN = 'Check-out must be after check-in';
export const MANUAL_BOOKING_CHANNEL: BookingChannel = 'Direct';
export const MANUAL_BOOKING_PAYOUT_STATUS: PayoutStatus = 'Unpaid';

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
