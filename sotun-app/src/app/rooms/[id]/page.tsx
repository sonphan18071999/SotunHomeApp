'use client';

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Button, Card, Form, Empty, Space } from 'antd';
import { PageHeader } from '@/components/common/PageHeader';
import { RoomDetailForm, RoomDetailContent, RoomDetailBookings } from '@/components/rooms';
import { useHomestay } from '@/contexts/HomestayContext';
import { useRoom } from '@/contexts/RoomContext';
import { useBooking } from '@/contexts/BookingContext';
import { MOCK_ROOM_TYPES } from '@/lib/mock-data';
import { sanitizeText } from '@/lib/validation';
import {
  ROOM_DETAIL_LABEL_INPUT_ALL,
  ROOM_DETAIL_LABEL_CANCEL,
  ROOM_DETAIL_LABEL_SAVE,
} from '@/constants/room';

import type { Room, RoomDetailFormValues } from '@/types';

const ROOMS_PATH = '/rooms';
const LABEL_BACK_TO_ROOMS = 'Back to rooms';
const EDIT_ACTIONS_CARD_MARGIN_BOTTOM = 16;

export default function RoomDetailPage() {
  const params = useParams();
  const { selectedHomestay } = useHomestay();
  const roomId = typeof params?.id === 'string' ? params.id : null;

  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm<RoomDetailFormValues>();

  const { getRoomById, updateRoom } = useRoom();
  const { bookings: allBookings } = useBooking();
  const room = useMemo(
    () => (roomId ? getRoomById(roomId) ?? null : null),
    [roomId, getRoomById]
  );

  const roomTypes = useMemo(
    () => (selectedHomestay ? MOCK_ROOM_TYPES.filter((rt) => rt.homestayId === selectedHomestay.id) : []),
    [selectedHomestay]
  );

  const roomType = useMemo(
    () => (room ? roomTypes.find((rt) => rt.id === room.roomTypeId) : undefined),
    [room, roomTypes]
  );

  const bookings = useMemo(() => {
    if (!roomId) return [];
    return allBookings.filter((b) => b.roomId === roomId);
  }, [roomId, allBookings]);

  const currency = selectedHomestay?.currency ?? '';

  useEffect(() => {
    if (room == null) {
      setIsEditing(false);
      return;
    }
    form.setFieldsValue({
      name: room.name,
      status: room.status,
      mainImageUrl: room.mainImageUrl ?? '',
    });
    setIsEditing(false);
  }, [room, form]);

  const handleSave = useCallback(
    (values: RoomDetailFormValues) => {
      if (room == null) return;
      const updated: Room = {
        ...room,
        name: sanitizeText(values.name) || room.name,
        status: values.status,
        mainImageUrl: sanitizeText(values.mainImageUrl) || undefined,
      };
      updateRoom(updated);
      setIsEditing(false);
    },
    [room, updateRoom]
  );

  const headerExtra =
    room != null && !isEditing ? (
      <Button type="primary" onClick={() => setIsEditing(true)}>
        {ROOM_DETAIL_LABEL_INPUT_ALL}
      </Button>
    ) : null;

  if (roomId != null && room == null) {
    return (
      <>
        <PageHeader
          title="Room"
          subtitle="Room not found"
          back={{ href: ROOMS_PATH, label: LABEL_BACK_TO_ROOMS }}
        />
        <Empty description="Room not found" />
      </>
    );
  }

  if (room == null) {
    return (
      <>
        <PageHeader
          title="Room"
          subtitle="Select a room"
          back={{ href: ROOMS_PATH, label: LABEL_BACK_TO_ROOMS }}
        />
        <Empty description="No room selected" />
      </>
    );
  }

  const pageTitle = `Room ${room.name}${roomType != null ? ` · ${roomType.name}` : ''}`;

  return (
    <>
      <PageHeader
        title={pageTitle}
        subtitle="View and edit room details"
        extra={headerExtra}
        back={{ href: ROOMS_PATH, label: LABEL_BACK_TO_ROOMS }}
      />
      {isEditing ? (
        <>
          <Card size="small" style={{ marginBottom: EDIT_ACTIONS_CARD_MARGIN_BOTTOM }}>
            <Space>
              <Button onClick={() => setIsEditing(false)}>{ROOM_DETAIL_LABEL_CANCEL}</Button>
              <Button type="primary" onClick={() => form.submit()}>
                {ROOM_DETAIL_LABEL_SAVE}
              </Button>
            </Space>
          </Card>
          <RoomDetailForm form={form} onFinish={handleSave} roomType={roomType} />
          <RoomDetailBookings
            roomId={room.id}
            homestayId={room.homestayId}
            roomType={roomType}
            bookings={bookings}
            currency={currency}
          />
        </>
      ) : (
        <RoomDetailContent
          room={room}
          roomType={roomType}
          bookings={bookings}
          currency={currency}
        />
      )}
    </>
  );
}
