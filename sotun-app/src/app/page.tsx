'use client';

import React from 'react';
import { Row, Col } from 'antd';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { useHomestay } from '@/contexts/HomestayContext';
import { MOCK_BOOKINGS, MOCK_EXPENSES } from '@/lib/mock-data';

function useDashboardStats(homestayId: string | undefined) {
  if (!homestayId) return { revenue: 0, expenses: 0, profit: 0, bookings: 0 };
  const bookings = MOCK_BOOKINGS.filter((b) => b.homestayId === homestayId && b.status !== 'Cancelled');
  const expenses = MOCK_EXPENSES.filter((e) => e.homestayId === homestayId).reduce((s, e) => s + e.amount, 0);
  const revenue = 5000;
  return { revenue, expenses, profit: revenue - expenses, bookings: bookings.length };
}

export default function DashboardPage() {
  const { selectedHomestay } = useHomestay();
  const stats = useDashboardStats(selectedHomestay?.id);

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Revenue, costs, occupancy by homestay" />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard title="Gross revenue" value={stats.revenue} suffix={selectedHomestay?.currency ?? ''} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard title="Expenses" value={stats.expenses} suffix={selectedHomestay?.currency ?? ''} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard title="Profit" value={stats.profit} suffix={selectedHomestay?.currency ?? ''} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard title="Bookings" value={stats.bookings} />
        </Col>
      </Row>
    </>
  );
}
