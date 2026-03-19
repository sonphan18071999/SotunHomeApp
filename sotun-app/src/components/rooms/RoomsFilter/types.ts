import type { RoomStatus, RoomType } from '@/types/entities';

export const ROOMS_FILTER_KEY_SEARCH = 'search' as const;
export const ROOMS_FILTER_KEY_STATUS = 'status' as const;
export const ROOMS_FILTER_KEY_ROOM_TYPE_ID = 'roomTypeId' as const;

export type RoomsFilterKey =
  | typeof ROOMS_FILTER_KEY_SEARCH
  | typeof ROOMS_FILTER_KEY_STATUS
  | typeof ROOMS_FILTER_KEY_ROOM_TYPE_ID;

export interface RoomsFilterValue {
  search: string;
  status: RoomStatus | 'all';
  roomTypeId: RoomType['id'] | 'all';
}

export const ROOMS_FILTER_STATUS_ALL = 'all' as const;
export const ROOMS_FILTER_ROOM_TYPE_ALL = 'all' as const;

export const DEFAULT_ROOMS_FILTER_VALUE: RoomsFilterValue = {
  search: '',
  status: ROOMS_FILTER_STATUS_ALL,
  roomTypeId: ROOMS_FILTER_ROOM_TYPE_ALL,
};

export type RoomsFilterItem =
  | {
      key: typeof ROOMS_FILTER_KEY_SEARCH;
      kind: 'search';
      placeholder: string;
    }
  | {
      key: typeof ROOMS_FILTER_KEY_STATUS;
      kind: 'status';
      labelAll: string;
    }
  | {
      key: typeof ROOMS_FILTER_KEY_ROOM_TYPE_ID;
      kind: 'roomType';
      labelAll: string;
    };

