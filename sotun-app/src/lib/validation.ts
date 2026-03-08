/** Sanitize string for display / storage: trim and limit length */
const MAX_TEXT_LENGTH = 2000;

export function sanitizeText(input: unknown): string {
  if (input == null) return '';
  const s = String(input).trim();
  return s.length > MAX_TEXT_LENGTH ? s.slice(0, MAX_TEXT_LENGTH) : s;
}

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/** Validate YYYY-MM-DD date string */
export function isValidDateString(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  if (!DATE_REGEX.test(value)) return false;
  const d = new Date(value);
  return !Number.isNaN(d.getTime());
}
