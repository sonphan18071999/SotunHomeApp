'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Table, Alert, Spin } from 'antd';
import { PageHeader } from '@/components/common/PageHeader';
import { DEMAND_LOCATIONS, DAYS_OF_WEEK } from '@/constants/demand';
import { getNextWeekdayDates } from '@/lib/demand-utils';

const API_SEARCH_PATH = '/api/demand/search';

interface CountRow {
  dayOfWeek: string;
  weekday: number;
  [locationName: string]: string | number;
}

async function fetchCount(cityId: number, checkin: string): Promise<{ count: number; mock?: boolean }> {
  const params = new URLSearchParams({ cityId: String(cityId), checkin });
  const res = await fetch(`${API_SEARCH_PATH}?${params}`);
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json();
}

export default function DemandPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mockUsed, setMockUsed] = useState(false);
  const [rows, setRows] = useState<CountRow[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setMockUsed(false);
    const weekdayDates = getNextWeekdayDates();
    const dayLabelByWeekday = Object.fromEntries(DAYS_OF_WEEK.map((d) => [d.key, d.label]));

    try {
      const counts: Record<number, Record<string, number>> = {};
      for (const { weekday, date } of weekdayDates) {
        counts[weekday] = {};
        for (const loc of DEMAND_LOCATIONS) {
          const result = await fetchCount(loc.id, date);
          counts[weekday][loc.name] = result.count;
          if (result.mock) setMockUsed(true);
        }
      }

      const nextRows: CountRow[] = DAYS_OF_WEEK.map((d) => {
        const row: CountRow = {
          dayOfWeek: d.label,
          weekday: d.key,
        };
        for (const loc of DEMAND_LOCATIONS) {
          row[loc.name] = counts[d.key]?.[loc.name] ?? 0;
        }
        return row;
      });
      setRows(nextRows);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load demand data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const columns = [
    { title: 'Day of week', dataIndex: 'dayOfWeek', key: 'dayOfWeek', width: 140 },
    ...DEMAND_LOCATIONS.map((loc) => ({
      title: loc.name,
      dataIndex: loc.name,
      key: loc.name,
      align: 'right' as const,
    })),
  ];

  return (
    <>
      <PageHeader
        title="Demand by location"
        subtitle="Accommodation count per day of week for Da Lat and Nha Trang (Booking.com Demand API)"
      />
      {mockUsed && (
        <Alert
          type="info"
          message="Demo data"
          description="Booking.com Demand API is not configured. Showing mock counts. Set BOOKING_DEMAND_API_KEY and BOOKING_DEMAND_AFFILIATE_ID to use live data."
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      {error && (
        <Alert type="error" message="Error" description={error} showIcon style={{ marginBottom: 16 }} />
      )}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          rowKey="weekday"
          columns={columns}
          dataSource={rows}
          pagination={false}
          size="small"
        />
      )}
    </>
  );
}
