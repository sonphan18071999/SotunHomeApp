import {
  BOOKER_COUNTRY_VIETNAM,
  BOOKER_PLATFORM_DESKTOP,
  GUESTS_ADULTS_DEFAULT,
  GUESTS_ROOMS_DEFAULT,
  SEARCH_ROWS_MAX,
  STAY_NIGHTS_DEFAULT,
} from '@/constants/demand';
import { getDemandBaseUrl, getDemandAuth } from '@/lib/demand-config';

const SEARCH_ENDPOINT = '/accommodations/search';
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function isValidDate(s: string): boolean {
  return typeof s === 'string' && DATE_REGEX.test(s);
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export interface SearchAccommodationsParams {
  cityId: number;
  checkin: string;
  checkout?: string;
}

export interface SearchAccommodationsResult {
  count: number;
  requestId?: string;
}

/**
 * Search accommodations via Booking.com Demand API (server-side only).
 * Returns count of results on the first page. When credentials are missing, returns null.
 */
export async function searchAccommodations(
  params: SearchAccommodationsParams
): Promise<SearchAccommodationsResult | null> {
  const auth = getDemandAuth();
  if (!auth) return null;

  const { cityId, checkin } = params;
  if (!Number.isInteger(cityId) || !isValidDate(checkin)) {
    return null;
  }

  const checkout =
    params.checkout && isValidDate(params.checkout)
      ? params.checkout
      : addDays(checkin, STAY_NIGHTS_DEFAULT);

  const body = {
    city: cityId,
    booker: { country: BOOKER_COUNTRY_VIETNAM, platform: BOOKER_PLATFORM_DESKTOP },
    checkin,
    checkout,
    guests: { number_of_rooms: GUESTS_ROOMS_DEFAULT, number_of_adults: GUESTS_ADULTS_DEFAULT },
    rows: SEARCH_ROWS_MAX,
  };

  const base = getDemandBaseUrl().replace(/\/$/, '');
  const url = `${base}${SEARCH_ENDPOINT}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.apiKey}`,
      'X-Affiliate-Id': auth.affiliateId,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) return null;
  const data = (await res.json()) as { data?: unknown[]; request_id?: string };
  const list = Array.isArray(data?.data) ? data.data : [];
  return { count: list.length, requestId: data.request_id };
}
