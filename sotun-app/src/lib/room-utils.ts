import dayjs from 'dayjs';
import type { Booking, RoomType } from '@/types/entities';

export function getNights(checkInDate: string, checkOutDate: string): number {
  return Math.max(0, dayjs(checkOutDate).diff(dayjs(checkInDate), 'day'));
}

export function getEstimatedPrice(
  checkInDate: string,
  checkOutDate: string,
  defaultBasePrice: number
): number {
  return getNights(checkInDate, checkOutDate) * defaultBasePrice;
}
