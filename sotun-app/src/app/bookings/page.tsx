'use client';

import React, { useMemo } from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import { useHomestay } from '@/contexts/HomestayContext';
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

export default function BookingsPage() {
  const { selectedHomestay } = useHomestay();

  const data = useMemo(
    () => (selectedHomestay ? MOCK_BOOKINGS.filter((b) => b.homestayId === selectedHomestay.id) : []),
    [selectedHomestay]
  );

  const columns: ColumnsType<(typeof data)[0]> = [
    {
      title: 'Guest',
      dataIndex: 'guestName',
      key: 'guestName',
      render: (name: string, row: (typeof data)[0]) => (
        <Link href={`/bookings/${row.id}`}>{name}</Link>
      ),
    },
    {
      title: 'Room',
      dataIndex: 'roomId',
      key: 'roomId',
      render: (id: string) => MOCK_ROOMS.find((r) => r.id === id)?.name ?? id,
    },
    {
      title: 'Channel',
      dataIndex: 'channel',
      key: 'channel',
      render: (ch: string) => BOOKING_CHANNELS.find((c) => c.value === ch)?.label ?? ch,
    },
    { title: 'Check-in', dataIndex: 'checkInDate', key: 'checkInDate', width: 110 },
    { title: 'Check-out', dataIndex: 'checkOutDate', key: 'checkOutDate', width: 110 },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => <Tag color={STATUS_COLORS[s] ?? 'default'}>{BOOKING_STATUSES.find((x) => x.value === s)?.label ?? s}</Tag>,
    },
    {
      title: 'Payout',
      dataIndex: 'payoutStatus',
      key: 'payoutStatus',
      render: (s: string) => PAYOUT_STATUSES.find((x) => x.value === s)?.label ?? s,
    },
  ];

  return (
    <>
      <PageHeader title="Bookings" subtitle="Fees, payout, notes — open a row for details" />
      <Table rowKey="id" dataSource={data} columns={columns} pagination={{ pageSize: 10 }} size="small" />
    </>
  );
}
