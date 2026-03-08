'use client';

import React from 'react';
import { Card, Typography } from 'antd';

const { Text } = Typography;

interface StatCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  loading?: boolean;
}

export function StatCard({ title, value, suffix, loading }: StatCardProps) {
  const displayValue = typeof value === 'number' && suffix ? `${value} ${suffix}` : String(value);
  return (
    <Card loading={loading} size="small">
      <Text type="secondary">{title}</Text>
      <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}>{displayValue}</div>
    </Card>
  );
}
