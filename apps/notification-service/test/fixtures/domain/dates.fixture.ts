/**
 * Date Fixtures — mostly deterministic + relative future dates
 * @module notification-service/test/fixtures/domain
 */

export const BASE_NOW = '2025-01-15T10:00:00.000Z';
export const BASE_NOW_MS = new Date(BASE_NOW).getTime();

// Helper: N days from now (real clock — for validation tests)
const NOW_MS = Date.now();
const MS_DAY = 86_400_000;

export const DATES = {
  now: BASE_NOW,
  nowMs: BASE_NOW_MS,

  past: '2025-01-01T10:00:00.000Z',
  /** ⚠️ Dynamic future — always valid */
  future: new Date(NOW_MS + MS_DAY).toISOString(),
  future24h: new Date(NOW_MS + MS_DAY).toISOString(),
  future48h: new Date(NOW_MS + 2 * MS_DAY).toISOString(),

  expired: '2025-01-14T10:00:00.000Z',

  hourAgo: '2025-01-15T09:00:00.000Z',
  dayAgo: '2025-01-14T10:00:00.000Z',
  weekAgo: '2025-01-08T10:00:00.000Z',

  hourly: new Date(NOW_MS + 3_600_000).toISOString(),
  daily: new Date(NOW_MS + MS_DAY).toISOString(),
  weekly: new Date(NOW_MS + 7 * MS_DAY).toISOString(),
  biweekly: new Date(NOW_MS + 14 * MS_DAY).toISOString(),
  monthly: new Date(NOW_MS + 30 * MS_DAY).toISOString(),
  quarterly: new Date(NOW_MS + 90 * MS_DAY).toISOString(),
  yearly: new Date(NOW_MS + 365 * MS_DAY).toISOString(),
} as const;

export function isoAfter(seconds: number): string {
  return new Date(Date.now() + seconds * 1000).toISOString();
}

export function isoBefore(seconds: number): string {
  return new Date(Date.now() - seconds * 1000).toISOString();
}

export function isoInDays(days: number): string {
  return new Date(Date.now() + days * MS_DAY).toISOString();
}
