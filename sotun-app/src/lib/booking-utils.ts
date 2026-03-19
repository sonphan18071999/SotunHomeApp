import { BOOKING_STATUSES } from '@/constants';

export function getBookingStatusLabel(status: string): string {
  return BOOKING_STATUSES.find((s) => s.value === status)?.label ?? status;
}
