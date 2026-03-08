'use client';

import React from 'react';
import { Modal, List, Tag, Empty } from 'antd';
import { MOCK_ROOMS } from '@/lib/mock-data';
import { getBookingsOnDate } from '@/lib/calendar-utils';
import { BOOKING_STATUSES } from '@/constants';
import { useBooking } from '@/contexts/BookingContext';
import type { Booking } from '@/types/entities';

const STATUS_COLORS: Record<string, string> = {
  Inquiry: 'default',
  Pending: 'gold',
  Confirmed: 'blue',
  'Checked-in': 'cyan',
  'Checked-out': 'green',
  Cancelled: 'red',
  'No-show': 'volcano',
};

const MODAL_TITLE_PREFIX = 'Bookings for';

function getRoomName(roomId: string): string {
  return MOCK_ROOMS.find((r) => r.id === roomId)?.name ?? roomId;
}

function getStatusLabel(status: string): string {
  return BOOKING_STATUSES.find((s) => s.value === status)?.label ?? status;
}

interface CalendarDateModalProps {
  open: boolean;
  onCancel: () => void;
  selectedDate: string | null;
  homestayId: string | null;
  bookings?: Booking[];
}

export function CalendarDateModal({
  open,
  onCancel,
  selectedDate,
  homestayId,
  bookings: bookingsProp,
}: CalendarDateModalProps) {
  const { bookings: contextBookings } = useBooking();
  const bookingsSource = bookingsProp ?? contextBookings;
  const bookings: Booking[] =
    open && selectedDate && homestayId
      ? getBookingsOnDate(selectedDate, homestayId, bookingsSource)
      : [];

  const title =
    selectedDate != null ? `${MODAL_TITLE_PREFIX} ${selectedDate}` : MODAL_TITLE_PREFIX;

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      width={400}
    >
      {!homestayId ? (
        <Empty description="Select a homestay to view bookings" />
      ) : bookings.length === 0 ? (
        <Empty description="No bookings on this date" />
      ) : (
        <List
          size="small"
          dataSource={bookings}
          renderItem={(b) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <span>
                    {getRoomName(b.roomId)} – {b.guestName}
                  </span>
                }
                description={
                  <span>
                    {b.checkInDate} – {b.checkOutDate}
                    <Tag
                      color={STATUS_COLORS[b.status] ?? 'default'}
                      style={{ marginLeft: 8 }}
                    >
                      {getStatusLabel(b.status)}
                    </Tag>
                  </span>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
}
