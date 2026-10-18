/**
 * Dynamic test dates — relative to current time
 * @module identity-service/test/fixtures
 *
 * ⚠️ Dates are DYNAMIC to avoid expiry-based test failures.
 */

const NOW_MS = Date.now();
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const TEST_DATES = {
  // Current
  NOW: new Date(NOW_MS).toISOString(),
  NOW_MS,

  // Past
  FIVE_MINUTES_AGO: new Date(NOW_MS - 5 * MINUTE).toISOString(),
  THIRTY_MINUTES_AGO: new Date(NOW_MS - 30 * MINUTE).toISOString(),
  ONE_HOUR_AGO: new Date(NOW_MS - HOUR).toISOString(),
  ONE_DAY_AGO: new Date(NOW_MS - DAY).toISOString(),
  SEVEN_DAYS_AGO: new Date(NOW_MS - 7 * DAY).toISOString(),
  THIRTY_DAYS_AGO: new Date(NOW_MS - 30 * DAY).toISOString(),
  NINETY_DAYS_AGO: new Date(NOW_MS - 90 * DAY).toISOString(),

  // Past expiry
  PAST_EXPIRY: new Date(NOW_MS - DAY).toISOString(),
  PAST_EXPIRY_EPOCH: Math.floor((NOW_MS - DAY) / 1000),

  // Future
  IN_FIVE_MINUTES: new Date(NOW_MS + 5 * MINUTE).toISOString(),
  IN_THIRTY_MINUTES: new Date(NOW_MS + 30 * MINUTE).toISOString(),
  IN_ONE_HOUR: new Date(NOW_MS + HOUR).toISOString(),
  IN_ONE_DAY: new Date(NOW_MS + DAY).toISOString(),
  IN_SEVEN_DAYS: new Date(NOW_MS + 7 * DAY).toISOString(),
  IN_THIRTY_DAYS: new Date(NOW_MS + 30 * DAY).toISOString(),

  // Future expiry
  FUTURE_EXPIRY: new Date(NOW_MS + HOUR).toISOString(),
  FUTURE_EXPIRY_EPOCH: Math.floor((NOW_MS + HOUR) / 1000),
  FAR_FUTURE_EXPIRY: new Date(NOW_MS + 30 * DAY).toISOString(),
  FAR_FUTURE_EXPIRY_EPOCH: Math.floor((NOW_MS + 30 * DAY) / 1000),

  // ✅ Legacy aliases (backwards-compat)
  FUTURE: new Date(NOW_MS + HOUR).toISOString(),
  FUTURE_EPOCH: Math.floor((NOW_MS + HOUR) / 1000),
  PAST: new Date(NOW_MS - DAY).toISOString(),
  FAR_FUTURE: new Date(NOW_MS + 30 * DAY).toISOString(),
  FAR_FUTURE_EPOCH: Math.floor((NOW_MS + 30 * DAY) / 1000),
} as const;

// ─── Fixed durations in seconds ────────────
export const TEST_DURATIONS = {
  FIVE_SECONDS: 5,
  THIRTY_SECONDS: 30,
  FIVE_MINUTES: 300,
  FIFTEEN_MINUTES: 900,
  THIRTY_MINUTES: 1800,
  ONE_HOUR: 3600,
  ONE_DAY: 86400,
  SEVEN_DAYS: 604800,
  THIRTY_DAYS: 2592000,
} as const;
