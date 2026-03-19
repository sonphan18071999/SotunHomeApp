'use client';

import React, { useState } from 'react';
import { Descriptions, Tag, Empty, Typography, Button } from 'antd';
import type { RoomType, Booking } from '@/types/entities';
import { ROOM_DETAIL_NOT_AVAILABLE } from '@/constants/room';
import { BOOKING_STATUS_TAG_COLORS, ADD_BOOKING_BUTTON_TEXT } from '@/constants/booking';
import { getEstimatedPrice } from '@/lib/room-utils';
import { getBookingStatusLabel } from '@/lib/booking-utils';
import { AddBookingModal } from './AddBookingModal';

const { Text } = Typography;

const BOOKINGS_HEADING_MARGIN_TOP = 16;
const BOOKINGS_LIST_MARGIN_TOP = 8;
const EMPTY_MARGIN_TOP = 8;
const DESCRIPTIONS_ITEM_MARGIN_BOTTOM = 12;
const HEADER_BUTTON_MARGIN_LEFT = 8;

export const ROOM_DETAIL_BOOKINGS_HEADING = 'Bookings';

interface RoomDetailBookingsProps {
  roomId: string;
  homestayId: string;
  roomType: RoomType | undefined;
  bookings: Booking[];
  currency: string;
}

export function RoomDetailBookings({
  roomId,
  homestayId,
  roomType,
  bookings,
  currency,
}: RoomDetailBookingsProps) {
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <>
      <div style={{ marginTop: BOOKINGS_HEADING_MARGIN_TOP, display: 'flex', alignItems: 'center', gap: HEADER_BUTTON_MARGIN_LEFT }}>
        <Text strong>{ROOM_DETAIL_BOOKINGS_HEADING}</Text>
        <Button type="primary" size="small" onClick={() => setAddModalOpen(true)}>
          {ADD_BOOKING_BUTTON_TEXT}
        </Button>
      </div>
      <AddBookingModal
        open={addModalOpen}
        onCancel={() => setAddModalOpen(false)}
        roomId={roomId}
        homestayId={homestayId}
      />
      {bookings.length === 0 ? (
        <Empty
          description="No bookings"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: EMPTY_MARGIN_TOP }}
        />
      ) : (
        <div style={{ marginTop: BOOKINGS_LIST_MARGIN_TOP }}>
          {bookings.map((b) => {
            const estimatedPrice =
              roomType != null
                ? getEstimatedPrice(b.checkInDate, b.checkOutDate, roomType.defaultBasePrice)
                : 0;
            const tagColor = BOOKING_STATUS_TAG_COLORS[b.status] ?? 'default';
            return (
              <Descriptions
                key={b.id}
                column={1}
                size="small"
                bordered
                style={{ marginBottom: DESCRIPTIONS_ITEM_MARGIN_BOTTOM }}
              >
                <Descriptions.Item label="Booking status">
                  <Tag color={tagColor}>{getBookingStatusLabel(b.status)}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Guest name">{b.guestName}</Descriptions.Item>
                <Descriptions.Item label="Check-in">{b.checkInDate}</Descriptions.Item>
                <Descriptions.Item label="Check-out">{b.checkOutDate}</Descriptions.Item>
                <Descriptions.Item label="Price (est.)">
                  {roomType != null ? `${estimatedPrice} ${currency}` : ROOM_DETAIL_NOT_AVAILABLE}
                </Descriptions.Item>
                <Descriptions.Item label="Guest number">
                  {roomType != null ? `Up to ${roomType.capacity}` : ROOM_DETAIL_NOT_AVAILABLE}
                </Descriptions.Item>
                <Descriptions.Item label="Additional note">
                  {b.notes != null && b.notes.trim() !== '' ? b.notes : ROOM_DETAIL_NOT_AVAILABLE}
                </Descriptions.Item>
              </Descriptions>
            );
          })}
        </div>
      )}
    </>
  );
}
