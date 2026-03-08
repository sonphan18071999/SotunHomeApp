import type { RoomStatus } from '@/types/entities';

export const ROOM_STATUSES: readonly { value: RoomStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
] as const;

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_DISPLAY_FORMAT = 'DD MMM YYYY';
