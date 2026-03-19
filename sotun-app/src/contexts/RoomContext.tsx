'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MOCK_ROOMS } from '@/lib/mock-data';
import { useHomestay } from '@/contexts/HomestayContext';
import type { Room } from '@/types/entities';

interface RoomContextValue {
  rooms: Room[];
  updateRoom: (room: Room) => void;
  getRoomById: (id: string) => Room | undefined;
}

const RoomContext = createContext<RoomContextValue | null>(null);

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const { selectedHomestay } = useHomestay();
  const [rooms, setRooms] = useState<Room[]>([]);

  const initialRooms = useMemo(
    () => (selectedHomestay ? MOCK_ROOMS.filter((r) => r.homestayId === selectedHomestay.id) : []),
    [selectedHomestay]
  );

  useEffect(() => {
    setRooms(initialRooms);
  }, [initialRooms]);

  const updateRoom = useCallback((room: Room) => {
    setRooms((prev) => {
      const next = prev.length > 0 ? [...prev] : [...initialRooms];
      const idx = next.findIndex((r) => r.id === room.id);
      if (idx >= 0) next[idx] = room;
      else next.push(room);
      return next;
    });
  }, [initialRooms]);

  const getRoomById = useCallback(
    (id: string) => {
      const source = rooms.length > 0 ? rooms : initialRooms;
      return source.find((r) => r.id === id);
    },
    [rooms, initialRooms]
  );

  const value = useMemo<RoomContextValue>(
    () => ({ rooms, updateRoom, getRoomById }),
    [rooms, updateRoom, getRoomById]
  );

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}

export function useRoom() {
  const ctx = useContext(RoomContext);
  if (!ctx) throw new Error('useRoom must be used within RoomProvider');
  return ctx;
}
