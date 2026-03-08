'use client';

import React from 'react';
import { Card, Descriptions, Tag } from 'antd';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/common/PageHeader';
import { MOCK_BOOKINGS, MOCK_ROOMS } from '@/lib/mock-data';
import { BOOKING_CHANNELS, BOOKING_STATUSES, PAYOUT_STATUSES } from '@/constants';

const STATUS_COLORS: Record<string, string> = {
  Inquiry: 'default',
  Pending: 'gold',
  Confirmed: 'blue',
  'Checked-in': 'cyan',
  'Checked-out': 'green',
  Cancelled: 'red',
  'No-show': 'volcano',
};

export default function BookingDetailPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const booking = MOCK_BOOKINGS.find((b) => b.id === id);
  const room = booking ? MOCK_ROOMS.find((r) => r.id === booking.roomId) : undefined;

  if (!booking) {
    return (
      <>
        <PageHeader title="Booking not found" />
        <Card>No booking with id &quot;{id}&quot;.</Card>
      </>
    );
  }

  const channelLabel = BOOKING_CHANNELS.find((c) => c.value === booking.channel)?.label ?? booking.channel;
  const statusLabel = BOOKING_STATUSES.find((s) => s.value === booking.status)?.label ?? booking.status;
  const payoutLabel = PAYOUT_STATUSES.find((p) => p.value === booking.payoutStatus)?.label ?? booking.payoutStatus;

  return (
    <>
      <PageHeader
        title={`Booking: ${booking.guestName}`}
        subtitle={`${booking.checkInDate} – ${booking.checkOutDate}`}
        extra={
          <Tag color={STATUS_COLORS[booking.status] ?? 'default'}>{statusLabel}</Tag>
        }
      />
      <Card title="Details" size="small">
        <Descriptions column={1} size="small">
          <Descriptions.Item label="Guest">{booking.guestName}</Descriptions.Item>
          <Descriptions.Item label="Phone">{booking.phone ?? '–'}</Descriptions.Item>
          <Descriptions.Item label="Email">{booking.email ?? '–'}</Descriptions.Item>
          <Descriptions.Item label="Room">{room?.name ?? booking.roomId}</Descriptions.Item>
          <Descriptions.Item label="Channel">{channelLabel}</Descriptions.Item>
          <Descriptions.Item label="Check-in">{booking.checkInDate}</Descriptions.Item>
          <Descriptions.Item label="Check-out">{booking.checkOutDate}</Descriptions.Item>
          <Descriptions.Item label="Payout">{payoutLabel}</Descriptions.Item>
          <Descriptions.Item label="Notes">{booking.notes ?? '–'}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="Fees & adjustments" size="small" style={{ marginTop: 16 }}>
        <p style={{ color: '#888' }}>Fee/Adjustment list can be loaded here by bookingId.</p>
      </Card>
    </>
  );
}
