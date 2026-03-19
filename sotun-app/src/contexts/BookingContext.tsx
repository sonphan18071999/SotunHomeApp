'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Booking } from '@/types/entities';
import { MOCK_BOOKINGS } from '@/lib/mock-data';
import { fetchBookingsFromApi } from '@/lib/booking-api';
import {
  USE_REAL_BOOKING_API,
  BOOKING_API_BASE_URL,
  BOOKING_SYNC_INTERVAL_MS,
} from '@/lib/booking-config';

interface BookingContextValue {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  refreshBookings: () => Promise<void>;
  isLoading: boolean;
  syncError: string | null;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [isLoading, setLoading] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addBooking = useCallback((booking: Booking) => {
    setBookings((prev) => [...prev, booking]);
  }, []);

  const load = useCallback(async () => {
    const useApi = USE_REAL_BOOKING_API && Boolean(BOOKING_API_BASE_URL);
    if (!useApi) {
      setBookings(MOCK_BOOKINGS);
      setSyncError(null);
      return;
    }
    setLoading(true);
    setSyncError(null);
    try {
      const data = await fetchBookingsFromApi();
      setBookings(data);
    } catch (e) {
      setSyncError(e instanceof Error ? e.message : 'Failed to sync bookings');
      setBookings(MOCK_BOOKINGS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!USE_REAL_BOOKING_API || !BOOKING_API_BASE_URL || BOOKING_SYNC_INTERVAL_MS <= 0) {
      return;
    }
    intervalRef.current = setInterval(load, BOOKING_SYNC_INTERVAL_MS);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [load]);

  const value = useMemo<BookingContextValue>(
    () => ({
      bookings,
      addBooking,
      refreshBookings: load,
      isLoading,
      syncError,
    }),
    [bookings, addBooking, load, isLoading, syncError]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
