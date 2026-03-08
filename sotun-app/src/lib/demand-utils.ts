/** ISO weekday: 1 = Monday, 7 = Sunday */
export function getWeekday(date: Date): number {
  const d = date.getDay();
  return d === 0 ? 7 : d;
}

/**
 * Returns 7 dates, one per weekday (Mon–Sun), as the next occurrence of each from today.
 * Dates are within the next 7 days so checkin is in the future as required by the API.
 */
export function getNextWeekdayDates(): { weekday: number; date: string }[] {
  const today = new Date();
  const result: { weekday: number; date: string }[] = [];
  const seen = new Set<number>();
  for (let i = 0; i < 14 && result.length < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const w = getWeekday(d);
    if (seen.has(w)) continue;
    seen.add(w);
    result.push({ weekday: w, date: d.toISOString().slice(0, 10) });
  }
  result.sort((a, b) => a.weekday - b.weekday);
  return result;
}
