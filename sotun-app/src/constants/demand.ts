/**
 * Booking.com Demand API – focus locations (Vietnam).
 * City IDs can be resolved via POST common/locations/cities with country "vn".
 */
export const DEMAND_LOCATIONS = [
  { id: -1040078, name: 'Da Lat' },
  { id: -1040079, name: 'Nha Trang' },
] as const;

/** ISO weekday 1=Mon … 7=Sun */
export const DAYS_OF_WEEK = [
  { key: 1, label: 'Monday' },
  { key: 2, label: 'Tuesday' },
  { key: 3, label: 'Wednesday' },
  { key: 4, label: 'Thursday' },
  { key: 5, label: 'Friday' },
  { key: 6, label: 'Saturday' },
  { key: 7, label: 'Sunday' },
] as const;

export const BOOKER_COUNTRY_VIETNAM = 'vn';
export const BOOKER_PLATFORM_DESKTOP = 'desktop';
export const GUESTS_ROOMS_DEFAULT = 1;
export const GUESTS_ADULTS_DEFAULT = 2;
export const STAY_NIGHTS_DEFAULT = 2;
export const DEMAND_API_VERSION = '3.1';
export const SEARCH_ROWS_MAX = 100;
