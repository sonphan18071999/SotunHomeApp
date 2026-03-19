'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Row, Col } from 'antd';
import { PageHeader } from '@/components/common/PageHeader';
import { useHomestay } from '@/contexts/HomestayContext';
import { useRoom } from '@/contexts/RoomContext';
import { DEFAULT_ROOMS_FILTER_VALUE, RoomCard, RoomsFilter } from '@/components/rooms';
import { MOCK_ROOM_TYPES, MOCK_BOOKINGS } from '@/lib/mock-data';
import { ROOM_CARDS_PER_ROW } from '@/constants';
import type { Room } from '@/types/entities';
import type { RoomsFilterValue } from '@/components/rooms';

const GRID_SPAN = 24 / ROOM_CARDS_PER_ROW;

export default function RoomsPage() {
  const router = useRouter();
  const { selectedHomestay } = useHomestay();
  const { rooms } = useRoom();
  const [filterValue, setFilterValue] = useState<RoomsFilterValue>(DEFAULT_ROOMS_FILTER_VALUE);

  const roomTypes = useMemo(
    () => (selectedHomestay ? MOCK_ROOM_TYPES.filter((rt) => rt.homestayId === selectedHomestay.id) : []),
    [selectedHomestay]
  );

  const bookingsByRoomId = useMemo(() => {
    const map = new Map<string, typeof MOCK_BOOKINGS>();
    for (const b of MOCK_BOOKINGS) {
      const list = map.get(b.roomId) ?? [];
      list.push(b);
      map.set(b.roomId, list);
    }
    return map;
  }, []);

  const filteredRooms = useMemo(() => {
    const search = filterValue.search.trim().toLowerCase();
    const byRoomType = filterValue.roomTypeId === 'all' ? null : filterValue.roomTypeId;
    const byStatus = filterValue.status === 'all' ? null : filterValue.status;

    const matchesSearch = (room: Room) => {
      if (!search) return true;

      const roomTypeName = roomTypes.find((rt) => rt.id === room.roomTypeId)?.name ?? '';
      const bookings = bookingsByRoomId.get(room.id) ?? [];
      for (const b of bookings) {
        if (
          b.guestName.toLowerCase().includes(search) ||
          (b.phone?.toLowerCase().includes(search) ?? false) ||
          (b.email?.toLowerCase().includes(search) ?? false)
        ) {
          return true;
        }
      }

      return room.name.toLowerCase().includes(search) || roomTypeName.toLowerCase().includes(search);
    };

    return rooms.filter((room) => {
      if (byRoomType != null && room.roomTypeId !== byRoomType) return false;
      if (byStatus != null && room.status !== byStatus) return false;
      return matchesSearch(room);
    });
  }, [bookingsByRoomId, filterValue.search, filterValue.roomTypeId, filterValue.status, roomTypes, rooms]);

  const openDetail = useCallback(
    (room: Room) => {
      router.push(`/rooms/${room.id}`);
    },
    [router]
  );

  return (
    <>
      <PageHeader title="Rooms" subtitle="Manage rooms and view booking details" />
      <RoomsFilter value={filterValue} onChange={setFilterValue} roomTypes={roomTypes} />
      <Row gutter={[16, 16]}>
        {filteredRooms.map((room) => (
          <Col key={room.id} xs={24} sm={24} md={24 / ROOM_CARDS_PER_ROW} lg={GRID_SPAN}>
            <RoomCard
              room={room}
              roomType={roomTypes.find((rt) => rt.id === room.roomTypeId)}
              bookingCount={bookingsByRoomId.get(room.id)?.length ?? 0}
              currency={selectedHomestay?.currency ?? ''}
              onClick={openDetail}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
