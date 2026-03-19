import type { RoomStatus, BookingStatus } from './entities';

/** Form values for editing room name, status, and main image URL */
export interface RoomDetailFormValues {
  name: string;
  status: RoomStatus;
  mainImageUrl: string;
}

/** Form values for manually adding a booking to a room */
export interface AddManualBookingFormValues {
  status: BookingStatus;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  notes: string;
}
