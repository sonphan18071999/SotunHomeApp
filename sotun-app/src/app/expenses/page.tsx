'use client';

import React, { useMemo } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PageHeader } from '@/components/common/PageHeader';
import { useHomestay } from '@/contexts/HomestayContext';
import { MOCK_EXPENSES, MOCK_ROOMS } from '@/lib/mock-data';
import { EXPENSE_CATEGORIES } from '@/constants';

export default function ExpensesPage() {
  const { selectedHomestay } = useHomestay();

  const data = useMemo(
    () => (selectedHomestay ? MOCK_EXPENSES.filter((e) => e.homestayId === selectedHomestay.id) : []),
    [selectedHomestay]
  );

  const columns: ColumnsType<(typeof data)[0]> = [
    { title: 'Date', dataIndex: 'date', key: 'date', width: 120 },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (c: string) => EXPENSE_CATEGORIES.find((x) => x.value === c)?.label ?? c,
    },
    {
      title: 'Room',
      dataIndex: 'roomId',
      key: 'roomId',
      render: (id: string | undefined) => (id ? MOCK_ROOMS.find((r) => r.id === id)?.name : '–') ?? '–',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (v: number) => `${v} ${selectedHomestay?.currency ?? ''}`,
    },
    { title: 'Note', dataIndex: 'note', key: 'note' },
    {
      title: 'Recurring',
      dataIndex: 'recurring',
      key: 'recurring',
      render: (r: boolean | undefined) => (r ? 'Yes' : '–'),
    },
  ];

  return (
    <>
      <PageHeader title="Expenses" subtitle="By homestay, optional room; category and date" />
      <Table rowKey="id" dataSource={data} columns={columns} pagination={{ pageSize: 10 }} size="small" />
    </>
  );
}
