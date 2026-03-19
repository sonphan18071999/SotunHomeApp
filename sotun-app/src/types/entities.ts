/** Homestay: id, name, address, timezone, currency */
export interface Homestay {
  id: string;
  name: string;
  address: string;
  timezone: string;
  currency: string;
}

/** RoomType: id, homestayId, name, capacity, defaultBasePrice */
export interface RoomType {
  id: string;
  homestayId: string;
  name: string;
  capacity: number;
  defaultBasePrice: number;
}

/** Room status */
export type RoomStatus = 'active' | 'inactive';

/** Room: id, homestayId, roomTypeId, name/number, status, optional main image */
export interface Room {
  id: string;
  homestayId: string;
  roomTypeId: string;
  name: string;
  status: RoomStatus;
  /** Main image URL for the room */
  mainImageUrl?: string;
}

/** Booking channel */
export type BookingChannel =
  | 'Airbnb'
  | 'Booking'
  | 'Agoda'
  | 'Direct'
  | 'Walk-in';

/** Booking status */
export type BookingStatus =
  | 'Inquiry'
  | 'Pending'
  | 'Confirmed'
  | 'Checked-in'
  | 'Checked-out'
  | 'Cancelled'
  | 'No-show';

/** Payout status */
export type PayoutStatus = 'Unpaid' | 'Partially' | 'Paid';

/** Booking: id, homestayId, roomId, guest, channel, dates, status, payoutStatus, notes */
export interface Booking {
  id: string;
  homestayId: string;
  roomId: string;
  guestName: string;
  phone?: string;
  email?: string;
  channel: BookingChannel;
  checkInDate: string;
  checkOutDate: string;
  status: BookingStatus;
  payoutStatus: PayoutStatus;
  notes?: string;
}

/** DailyRate (RateCalendar): room or roomType, date, price, overrides */
export interface DailyRate {
  id: string;
  homestayId: string;
  roomId?: string;
  roomTypeId?: string;
  date: string;
  basePrice: number;
  extraGuestFee?: number;
  channelOverrides?: Record<string, number>;
  minStay?: number;
  closedToArrival?: boolean;
}

/** Fee/Adjustment type */
export type FeeAdjustmentType =
  | 'Cleaning'
  | 'Extra bed'
  | 'Pet'
  | 'Early check-in'
  | 'Late check-out'
  | 'Service'
  | 'Discount';

/** Fee / Adjustment: id, bookingId, type, amount, applyDate */
export interface FeeAdjustment {
  id: string;
  bookingId: string;
  type: FeeAdjustmentType;
  amount: number;
  applyDate?: string;
}

/** Expense category */
export type ExpenseCategory =
  | 'Utilities'
  | 'Staff'
  | 'Laundry'
  | 'Amenities'
  | 'Repair'
  | 'Platform fee'
  | 'Tax'
  | 'Other';

/** Expense: id, homestayId, roomId?, date, category, amount, note, recurring? */
export interface Expense {
  id: string;
  homestayId: string;
  roomId?: string;
  date: string;
  category: ExpenseCategory;
  amount: number;
  note?: string;
  recurring?: boolean;
}

/** Calendar cell status (what users see on grid) */
export type CalendarCellStatus =
  | 'Available'
  | 'Blocked'
  | 'Booked'
  | 'Pending'
  | 'Maintenance';
