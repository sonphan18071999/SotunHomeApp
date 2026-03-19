'use client';

import React, { useEffect, useState } from 'react';
import { Modal, Empty, Button, Form } from 'antd';
import type { Room, RoomType, Booking } from '@/types/entities';
import type { RoomDetailFormValues } from '@/types/room-detail';
import { RoomDetailForm, RoomDetailContent, RoomDetailBookings } from '@/components/rooms';
import { sanitizeText } from '@/lib/validation';
import {
  ROOM_DETAIL_LABEL_EDIT,
  ROOM_DETAIL_LABEL_CANCEL,
  ROOM_DETAIL_LABEL_SAVE,
} from '@/constants/room';

interface RoomDetailModalProps {
  open: boolean;
  onCancel: () => void;
  room: Room | null;
  roomType: RoomType | undefined;
  bookings: Booking[];
  currency: string;
  onSaveRoom?: (room: Room) => void;
}

export function RoomDetailModal({
  open,
  onCancel,
  room,
  roomType,
  bookings,
  currency,
  onSaveRoom,
}: RoomDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm<RoomDetailFormValues>();

  useEffect(() => {
    if (!open || room == null) {
      setIsEditing(false);
      return;
    }
    form.setFieldsValue({
      name: room.name,
      status: room.status,
      mainImageUrl: room.mainImageUrl ?? '',
    });
    setIsEditing(false);
  }, [open, room, form]);

  if (room == null) {
    return (
      <Modal open={open} onCancel={onCancel} footer={null} destroyOnHidden width={520} title={null}>
        <Empty description="No room selected" />
      </Modal>
    );
  }

  const handleSave = (values: RoomDetailFormValues) => {
    const updated: Room = {
      ...room,
      name: sanitizeText(values.name) || room.name,
      status: values.status,
      mainImageUrl: sanitizeText(values.mainImageUrl) || undefined,
    };
    onSaveRoom?.(updated);
    setIsEditing(false);
  };

  const footer =
    onSaveRoom == null
      ? null
      : isEditing
        ? [
            <Button key="cancel" onClick={() => setIsEditing(false)}>
              {ROOM_DETAIL_LABEL_CANCEL}
            </Button>,
            <Button key="save" type="primary" onClick={() => form.submit()}>
              {ROOM_DETAIL_LABEL_SAVE}
            </Button>,
          ]
        : [
            <Button key="edit" type="primary" onClick={() => setIsEditing(true)}>
              {ROOM_DETAIL_LABEL_EDIT}
            </Button>,
          ];

  return (
    <Modal
      title={`Room ${room.name}${roomType != null ? ` · ${roomType.name}` : ''}`}
      open={open}
      onCancel={onCancel}
      footer={footer}
      destroyOnHidden
      width={520}
    >
      {isEditing ? (
        <>
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
        <RoomDetailContent room={room} roomType={roomType} bookings={bookings} currency={currency} />
      )}
    </Modal>
  );
}
