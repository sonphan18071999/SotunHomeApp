'use client';

import React from 'react';
import { Card, Tag, Typography } from 'antd';
import type { Room } from '@/types/entities';
import type { RoomType } from '@/types/entities';
import { ROOM_STATUSES, ROOM_PLACEHOLDER_IMAGE } from '@/constants';

const { Text } = Typography;

const ROOM_CARD_SIZE = 'small';
const ROOM_STATUS_ACTIVE = 'active';
const COVER_HEIGHT = 160;

interface RoomCardProps {
  room: Room;
  roomType: RoomType | undefined;
  bookingCount: number;
  currency: string;
  onClick: (room: Room) => void;
}

export function RoomCard({ room, roomType, bookingCount, currency, onClick }: RoomCardProps) {
  const statusOpt = ROOM_STATUSES.find((s) => s.value === room.status);
  const isActive = room.status === ROOM_STATUS_ACTIVE;
  const imageSrc = room.mainImageUrl?.trim() || ROOM_PLACEHOLDER_IMAGE;

  return (
    <Card
      size={ROOM_CARD_SIZE}
      hoverable
      onClick={() => onClick(room)}
      cover={
        <div style={{ height: COVER_HEIGHT, overflow: 'hidden', background: '#f0f0f0' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={room.name}
            style={{ width: '100%', height: COVER_HEIGHT, objectFit: 'cover', display: 'block' }}
          />
        </div>
      }
      title={
        <span>
          <Text strong>{room.name}</Text>
          {roomType != null && (
            <Text type="secondary" style={{ marginLeft: 8, fontWeight: 'normal' }}>
              {roomType.name}
            </Text>
          )}
        </span>
      }
      extra={
        <Tag color={isActive ? 'green' : 'default'}>{statusOpt?.label ?? room.status}</Tag>
      }
    >
      {roomType != null && (
        <div>
          <Text type="secondary">
            Capacity: {roomType.capacity} · Default: {roomType.defaultBasePrice} {currency}
          </Text>
        </div>
      )}
      {bookingCount > 0 && (
        <div style={{ marginTop: 4 }}>
          <Text type="secondary">{bookingCount} booking{bookingCount !== 1 ? 's' : ''}</Text>
        </div>
      )}
    </Card>
  );
}
