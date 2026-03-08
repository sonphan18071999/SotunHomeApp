'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Homestay } from '@/types/entities';

const HOMESTAY_STORAGE_KEY = 'sotun-app-selected-homestay';

interface HomestayContextValue {
  selectedHomestay: Homestay | null;
  setSelectedHomestay: (homestay: Homestay | null) => void;
  homestays: Homestay[];
}

const HomestayContext = createContext<HomestayContextValue | null>(null);

const MOCK_HOMESTAYS: Homestay[] = [
  {
    id: 'h1',
    name: 'Sotun 01',
    address: 'Address 01',
    timezone: 'Asia/Bangkok',
    currency: 'VND',
  },
  {
    id: 'h2',
    name: 'Sotun 02',
    address: 'Address 02',
    timezone: 'Asia/Bangkok',
    currency: 'VND',
  },
];

export function HomestayProvider({ children }: { children: React.ReactNode }) {
  const [selectedHomestay, setSelectedState] = useState<Homestay | null>(() => {
    if (typeof window === 'undefined') return MOCK_HOMESTAYS[0] ?? null;
    try {
      const raw = localStorage.getItem(HOMESTAY_STORAGE_KEY);
      if (!raw) return MOCK_HOMESTAYS[0] ?? null;
      const parsed = JSON.parse(raw) as Homestay;
      return MOCK_HOMESTAYS.find((h) => h.id === parsed.id) ?? MOCK_HOMESTAYS[0] ?? null;
    } catch {
      return MOCK_HOMESTAYS[0] ?? null;
    }
  });

  const setSelectedHomestay = useCallback((homestay: Homestay | null) => {
    setSelectedState(homestay);
    if (typeof window !== 'undefined') {
      if (homestay) {
        localStorage.setItem(HOMESTAY_STORAGE_KEY, JSON.stringify({ id: homestay.id, name: homestay.name }));
      } else {
        localStorage.removeItem(HOMESTAY_STORAGE_KEY);
      }
    }
  }, []);

  const value = useMemo<HomestayContextValue>(
    () => ({
      selectedHomestay,
      setSelectedHomestay,
      homestays: MOCK_HOMESTAYS,
    }),
    [selectedHomestay, setSelectedHomestay]
  );

  return <HomestayContext.Provider value={value}>{children}</HomestayContext.Provider>;
}

export function useHomestay() {
  const ctx = useContext(HomestayContext);
  if (!ctx) throw new Error('useHomestay must be used within HomestayProvider');
  return ctx;
}
