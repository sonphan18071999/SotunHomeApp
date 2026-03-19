'use client';

import React, { useCallback, useMemo } from 'react';
import { Card, Input, Select } from 'antd';
import type { RoomType } from '@/types/entities';
import { ROOM_STATUSES } from '@/constants';
import {
  DEFAULT_ROOMS_FILTER_VALUE,
  ROOMS_FILTER_KEY_ROOM_TYPE_ID,
  ROOMS_FILTER_KEY_SEARCH,
  ROOMS_FILTER_KEY_STATUS,
  ROOMS_FILTER_ROOM_TYPE_ALL,
  ROOMS_FILTER_STATUS_ALL,
} from './types';
import type { RoomsFilterItem, RoomsFilterValue } from './types';

const INPUT_ALLOW_CLEAR = true;
const SELECT_ALLOW_CLEAR = false;
const SEARCH_MAX_LENGTH = 120;
const CARD_RADIUS = 12;
const FILTER_GAP = 12;
const FILTER_FIELD_MIN_WIDTH = 220;
const FILTER_MARGIN_BOTTOM = 16;

const WRAP_STYLE: React.CSSProperties = { marginBottom: FILTER_MARGIN_BOTTOM };
const CARD_STYLE: React.CSSProperties = { borderRadius: CARD_RADIUS };
const ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  gap: FILTER_GAP,
  flexWrap: 'wrap',
  alignItems: 'center',
};
const FIELD_STYLE: React.CSSProperties = {
  minWidth: FILTER_FIELD_MIN_WIDTH,
  flex: `1 1 ${FILTER_FIELD_MIN_WIDTH}px`,
};

export interface RoomsFilterProps {
  value?: RoomsFilterValue;
  onChange: (next: RoomsFilterValue) => void;
  roomTypes: readonly RoomType[];
  items?: readonly RoomsFilterItem[];
}

const DEFAULT_ITEMS: readonly RoomsFilterItem[] = [
  { key: ROOMS_FILTER_KEY_SEARCH, kind: 'search', placeholder: 'Search room name / guest / phone / email' },
  { key: ROOMS_FILTER_KEY_STATUS, kind: 'status', labelAll: 'All statuses' },
  { key: ROOMS_FILTER_KEY_ROOM_TYPE_ID, kind: 'roomType', labelAll: 'All room types' },
] as const;

export function RoomsFilter({ value, onChange, roomTypes, items }: RoomsFilterProps) {
  const v = value ?? DEFAULT_ROOMS_FILTER_VALUE;
  const list = items ?? DEFAULT_ITEMS;

  const roomTypeOptions = useMemo(() => {
    return [
      { value: ROOMS_FILTER_ROOM_TYPE_ALL, label: 'All room types' },
      ...roomTypes.map((rt) => ({ value: rt.id, label: rt.name })),
    ];
  }, [roomTypes]);

  const statusOptions = useMemo(() => {
    return [{ value: ROOMS_FILTER_STATUS_ALL, label: 'All statuses' }, ...ROOM_STATUSES.map((s) => ({ value: s.value, label: s.label }))];
  }, []);

  const patch = useCallback(
    (nextPartial: Partial<RoomsFilterValue>) => {
      onChange({ ...DEFAULT_ROOMS_FILTER_VALUE, ...v, ...nextPartial });
    },
    [onChange, v]
  );

  return (
    <div style={WRAP_STYLE}>
      <Card style={CARD_STYLE} size="small">
        <div style={ROW_STYLE}>
          {list.map((item) => {
            if (item.kind === 'search') {
              return (
                <div key={item.key} style={FIELD_STYLE}>
                  <Input
                    allowClear={INPUT_ALLOW_CLEAR}
                    placeholder={item.placeholder}
                    value={v.search}
                    maxLength={SEARCH_MAX_LENGTH}
                    onChange={(e) => patch({ search: e.target.value })}
                  />
                </div>
              );
            }

            if (item.kind === 'status') {
              return (
                <div key={item.key} style={FIELD_STYLE}>
                  <Select
                    allowClear={SELECT_ALLOW_CLEAR}
                    options={statusOptions}
                    value={v.status}
                    onChange={(next) => patch({ status: next })}
                  />
                </div>
              );
            }

            if (item.kind === 'roomType') {
              return (
                <div key={item.key} style={FIELD_STYLE}>
                  <Select
                    allowClear={SELECT_ALLOW_CLEAR}
                    options={roomTypeOptions}
                    value={v.roomTypeId}
                    onChange={(next) => patch({ roomTypeId: next })}
                  />
                </div>
              );
            }

            return null;
          })}
        </div>
      </Card>
    </div>
  );
}

