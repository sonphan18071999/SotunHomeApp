/** Server-side only: do not use in client components (keeps API key private). */

const DEMAND_API_VERSION = '3.1';
const HOST_SANDBOX = 'https://demandapi-sandbox.booking.com';
const HOST_PRODUCTION = 'https://demandapi.booking.com';

export function getDemandBaseUrl(): string {
  const sandbox = process.env.BOOKING_DEMAND_SANDBOX;
  const useSandbox = sandbox === undefined || sandbox === '' || sandbox.toLowerCase() === 'true';
  const host = useSandbox ? HOST_SANDBOX : HOST_PRODUCTION;
  return `${host}/${DEMAND_API_VERSION}`;
}

export function getDemandAuth(): { apiKey: string; affiliateId: string } | null {
  const apiKey = process.env.BOOKING_DEMAND_API_KEY?.trim();
  const affiliateId = process.env.BOOKING_DEMAND_AFFILIATE_ID?.trim();
  if (!apiKey || !affiliateId) return null;
  return { apiKey, affiliateId };
}

export function isDemandConfigured(): boolean {
  return getDemandAuth() !== null;
}
