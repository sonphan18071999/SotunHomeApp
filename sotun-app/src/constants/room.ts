import type { RoomStatus } from '@/types/entities';

export const ROOM_STATUSES: readonly { value: RoomStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
] as const;

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_DISPLAY_FORMAT = 'DD MMM YYYY';

export const ROOM_CARDS_PER_ROW = 3;

/** Fallback image when room has no mainImageUrl */
export const ROOM_PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop';

export const ROOM_STATUS_ACTIVE = 'active' as const;

export const ROOM_DETAIL_LABEL_EDIT = 'Edit';
export const ROOM_DETAIL_LABEL_INPUT_ALL = 'Input all information';
export const ROOM_DETAIL_LABEL_CANCEL = 'Cancel';
export const ROOM_DETAIL_LABEL_SAVE = 'Save';
export const ROOM_DETAIL_NOT_AVAILABLE = '—';
