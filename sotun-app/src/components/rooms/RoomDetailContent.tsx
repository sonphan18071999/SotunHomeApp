'use client';

import React from 'react';
import { Descriptions, Tag } from 'antd';
import type { Room, RoomType, Booking } from '@/types/entities';
import { ROOM_STATUSES, ROOM_STATUS_ACTIVE } from '@/constants/room';
import { RoomDetailBookings } from './RoomDetailBookings';

interface RoomDetailContentProps {
  room: Room;
  roomType: RoomType | undefined;
  bookings: Booking[];
  currency: string;
}

export function RoomDetailContent({ room, roomType, bookings, currency }: RoomDetailContentProps) {
  const statusOpt = ROOM_STATUSES.find((s) => s.value === room.status);
  const isActive = room.status === ROOM_STATUS_ACTIVE;

  return (
    <>
      <Descriptions column={1} size="small" bordered>
        <Descriptions.Item label="Room status">
          <Tag color={isActive ? 'green' : 'default'}>{statusOpt?.label ?? room.status}</Tag>
        </Descriptions.Item>
        {roomType != null && (
          <Descriptions.Item label="Capacity (max guests)">{roomType.capacity}</Descriptions.Item>
        )}
      </Descriptions>

      <RoomDetailBookings
        roomId={room.id}
        homestayId={room.homestayId}
        roomType={roomType}
        bookings={bookings}
        currency={currency}
      />
    </>
  );
}
