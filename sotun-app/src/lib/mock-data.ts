import type { Room, RoomType, Booking, Expense, DailyRate } from '@/types/entities';
import { ROOM_PLACEHOLDER_IMAGE } from '@/constants';

const H1 = 'h1';
const H2 = 'h2';

export const MOCK_ROOM_TYPES: RoomType[] = [
  { id: 'rt1', homestayId: H1, name: 'Phòng nhỏ ( ban công )', capacity: 2, defaultBasePrice: 1500 },
  { id: 'rt2', homestayId: H1, name: 'Phòng Giữa ( có máy chiếu )', capacity: 2, defaultBasePrice: 1000 },
  { id: 'rt3', homestayId: H2, name: 'Phòng Lớn (Phòng gần toilet)', capacity: 4, defaultBasePrice: 400 },
];

export const MOCK_ROOMS: Room[] = [
  { id: 'r1', homestayId: H1, roomTypeId: 'rt1', name: '101', status: 'active', mainImageUrl: ROOM_PLACEHOLDER_IMAGE },
  { id: 'r2', homestayId: H1, roomTypeId: 'rt1', name: '102', status: 'active', mainImageUrl: ROOM_PLACEHOLDER_IMAGE },
  { id: 'r3', homestayId: H1, roomTypeId: 'rt2', name: '201', status: 'active', mainImageUrl: ROOM_PLACEHOLDER_IMAGE },
  { id: 'r4', homestayId: H2, roomTypeId: 'rt3', name: 'A', status: 'active', mainImageUrl: ROOM_PLACEHOLDER_IMAGE },
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    homestayId: H1,
    roomId: 'r1',
    guestName: 'John Doe',
    email: 'john@example.com',
    channel: 'Airbnb',
    checkInDate: '2025-03-10',
    checkOutDate: '2025-03-12',
    status: 'Confirmed',
    payoutStatus: 'Unpaid',
    notes: 'Late check-in',
  },
  {
    id: 'b2',
    homestayId: H1,
    roomId: 'r2',
    guestName: 'Jane Smith',
    phone: '+66 12 345 6789',
    channel: 'Direct',
    checkInDate: '2025-03-15',
    checkOutDate: '2025-03-18',
    status: 'Pending',
    payoutStatus: 'Unpaid',
  },
  {
    id: 'b3',
    homestayId: H1,
    roomId: 'r1',
    guestName: 'Alex Chen',
    email: 'alex@example.com',
    channel: 'Booking',
    checkInDate: '2025-03-05',
    checkOutDate: '2025-03-08',
    status: 'Checked-out',
    payoutStatus: 'Paid',
  },
  {
    id: 'b4',
    homestayId: H1,
    roomId: 'r3',
    guestName: 'Maria Garcia',
    channel: 'Agoda',
    checkInDate: '2025-03-12',
    checkOutDate: '2025-03-14',
    status: 'Confirmed',
    payoutStatus: 'Unpaid',
  },
  {
    id: 'b5',
    homestayId: H1,
    roomId: 'r2',
    guestName: 'Tom Wilson',
    phone: '+66 98 765 4321',
    channel: 'Walk-in',
    checkInDate: '2025-03-20',
    checkOutDate: '2025-03-23',
    status: 'Confirmed',
    payoutStatus: 'Unpaid',
  },
  {
    id: 'b6',
    homestayId: H1,
    roomId: 'r3',
    guestName: 'Sarah Lee',
    email: 'sarah@example.com',
    channel: 'Airbnb',
    checkInDate: '2025-03-25',
    checkOutDate: '2025-03-28',
    status: 'Pending',
    payoutStatus: 'Unpaid',
  },
  {
    id: 'b7',
    homestayId: H1,
    roomId: 'r1',
    guestName: 'James Brown',
    channel: 'Direct',
    checkInDate: '2025-03-01',
    checkOutDate: '2025-03-04',
    status: 'Checked-out',
    payoutStatus: 'Paid',
  },
  {
    id: 'b8',
    homestayId: H2,
    roomId: 'r4',
    guestName: 'Emma Davis',
    email: 'emma@example.com',
    channel: 'Airbnb',
    checkInDate: '2025-03-08',
    checkOutDate: '2025-03-11',
    status: 'Confirmed',
    payoutStatus: 'Unpaid',
  },
  {
    id: 'b9',
    homestayId: H2,
    roomId: 'r4',
    guestName: 'Lucas Kim',
    channel: 'Booking',
    checkInDate: '2025-03-15',
    checkOutDate: '2025-03-17',
    status: 'Pending',
    payoutStatus: 'Unpaid',
  },
];

export const MOCK_EXPENSES: Expense[] = [
  { id: 'e1', homestayId: H1, date: '2025-03-01', category: 'Utilities', amount: 500, note: 'Electricity' },
  { id: 'e2', homestayId: H1, roomId: 'r1', date: '2025-03-02', category: 'Laundry', amount: 200 },
];

export const MOCK_DAILY_RATES: DailyRate[] = [
  { id: 'dr1', homestayId: H1, roomId: 'r1', date: '2025-03-10', basePrice: 1600 },
  { id: 'dr2', homestayId: H1, roomTypeId: 'rt1', date: '2025-03-15', basePrice: 1500, minStay: 2 },
];
