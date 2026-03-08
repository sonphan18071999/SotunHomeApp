import { NextRequest, NextResponse } from 'next/server';
import { searchAccommodations } from '@/lib/demand-api';
import { isDemandConfigured } from '@/lib/demand-config';

const PARAM_CITY_ID = 'cityId';
const PARAM_CHECKIN = 'checkin';

/** Deterministic mock count by cityId and checkin for demo when API is not configured */
function mockCount(cityId: number, checkin: string): number {
  const day = new Date(checkin).getDay();
  const base = cityId < 0 ? Math.abs(cityId) % 50 : 30;
  return base + (day % 7) + 10;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cityIdRaw = searchParams.get(PARAM_CITY_ID);
  const checkin = searchParams.get(PARAM_CHECKIN);

  const cityId = cityIdRaw != null ? parseInt(cityIdRaw, 10) : NaN;
  if (!Number.isInteger(cityId) || !checkin || !/^\d{4}-\d{2}-\d{2}$/.test(checkin)) {
    return NextResponse.json(
      { error: 'Missing or invalid cityId and checkin (yyyy-mm-dd)' },
      { status: 400 }
    );
  }

  if (!isDemandConfigured()) {
    return NextResponse.json({ count: mockCount(cityId, checkin), mock: true });
  }

  const result = await searchAccommodations({ cityId, checkin });
  if (result === null) {
    return NextResponse.json({ count: 0, error: 'Search failed or invalid response' });
  }
  return NextResponse.json({ count: result.count, requestId: result.requestId });
}
