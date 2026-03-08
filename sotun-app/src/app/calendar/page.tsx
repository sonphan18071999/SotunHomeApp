'use client';

import React, { useCallback, useState } from 'react';
import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { PageHeader } from '@/components/common/PageHeader';
import { useHomestay } from '@/contexts/HomestayContext';
import { useBooking } from '@/contexts/BookingContext';
import { MOCK_ROOMS } from '@/lib/mock-data';
import { getBookingsForDate, isDateBooked } from '@/lib/calendar-utils';
import { CalendarDateModal } from '@/components/calendar/CalendarDateModal';

const MAX_SNIPPET_BOOKINGS = 2;

export default function CalendarPage() {
  const { selectedHomestay } = useHomestay();
  const { bookings } = useBooking();
  const [value, setValue] = useState<Dayjs>(() => dayjs());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleSelect = useCallback((date: Dayjs) => {
    setValue(date);
    setSelectedDate(date.format('YYYY-MM-DD'));
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const dateCellRender = useCallback(
    (date: Dayjs) => {
      if (!selectedHomestay) return null;
      const d = date.format('YYYY-MM-DD');
      const dayBookings = getBookingsForDate(d, selectedHomestay.id, bookings);
      if (dayBookings.length === 0) return null;
      return (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 12 }}>
          {dayBookings.slice(0, MAX_SNIPPET_BOOKINGS).map((b) => {
            const room = MOCK_ROOMS.find((r) => r.id === b.roomId);
            return (
              <li key={b.id} style={{ marginTop: 2 }}>
                {room?.name ?? b.roomId}: {b.guestName}
              </li>
            );
          })}
          {dayBookings.length > MAX_SNIPPET_BOOKINGS && (
            <li>+{dayBookings.length - MAX_SNIPPET_BOOKINGS} more</li>
          )}
        </ul>
      );
    },
    [selectedHomestay, bookings]
  );

  const fullCellRender = useCallback(
    (date: Dayjs, info: { originNode: React.ReactElement }) => {
      if (!selectedHomestay) return info.originNode;
      const d = date.format('YYYY-MM-DD');
      const booked = isDateBooked(d, selectedHomestay.id, bookings);
      return (
        <div className={booked ? 'calendar-cell-booked' : undefined}>
          {info.originNode}
        </div>
      );
    },
    [selectedHomestay, bookings]
  );

  return (
    <>
      <PageHeader
        title="Calendar"
        subtitle="Per homestay → per room. Click date to see bookings; edit daily price on calendar."
      />
      <Calendar
        fullscreen={false}
        value={value}
        onChange={(v) => v && setValue(v)}
        onSelect={handleSelect}
        cellRender={dateCellRender}
        fullCellRender={fullCellRender}
      />
      <CalendarDateModal
        open={modalOpen}
        onCancel={closeModal}
        selectedDate={selectedDate}
        homestayId={selectedHomestay?.id ?? null}
      />
    </>
  );
}
