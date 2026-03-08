'use client';

import React, { useMemo } from 'react';
import { Tabs, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PageHeader } from '@/components/common/PageHeader';
import { useHomestay } from '@/contexts/HomestayContext';
import { MOCK_ROOMS, MOCK_ROOM_TYPES } from '@/lib/mock-data';
import { ROOM_STATUSES } from '@/constants';

export default function RoomsPage() {
  const { selectedHomestay } = useHomestay();

  const roomTypes = useMemo(
    () => (selectedHomestay ? MOCK_ROOM_TYPES.filter((rt) => rt.homestayId === selectedHomestay.id) : []),
    [selectedHomestay]
  );

  const rooms = useMemo(
    () => (selectedHomestay ? MOCK_ROOMS.filter((r) => r.homestayId === selectedHomestay.id) : []),
    [selectedHomestay]
  );

  const roomTypeColumns: ColumnsType<{ id: string; name: string; capacity: number; defaultBasePrice: number }> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Capacity', dataIndex: 'capacity', key: 'capacity', width: 100 },
    {
      title: 'Default price',
      dataIndex: 'defaultBasePrice',
      key: 'defaultBasePrice',
      render: (v: number) => `${v} ${selectedHomestay?.currency ?? ''}`,
    },
  ];

  const roomColumns: ColumnsType<{ id: string; name: string; status: string; roomTypeId: string }> = [
    { title: 'Room', dataIndex: 'name', key: 'name' },
    {
      title: 'Type',
      dataIndex: 'roomTypeId',
      key: 'roomTypeId',
      render: (id: string) => roomTypes.find((rt) => rt.id === id)?.name ?? id,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const opt = ROOM_STATUSES.find((s) => s.value === status);
        return <Tag color={status === 'active' ? 'green' : 'default'}>{opt?.label ?? status}</Tag>;
      },
    },
  ];

  return (
    <>
      <PageHeader title="Rooms & Room Types" subtitle="Manage room types and rooms per homestay" />
      <Tabs
        items={[
          {
            key: 'types',
            label: 'Room types',
            children: (
              <Table
                rowKey="id"
                dataSource={roomTypes}
                columns={roomTypeColumns}
                pagination={false}
                size="small"
              />
            ),
          },
          {
            key: 'rooms',
            label: 'Rooms',
            children: (
              <Table rowKey="id" dataSource={rooms} columns={roomColumns} pagination={false} size="small" />
            ),
          },
        ]}
      />
    </>
  );
}
