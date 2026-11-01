/**
 * Deterministic test IDs & dynamic dates
 * @module cart-service/test/fixtures
 *
 * ⚠️ Dates are DYNAMIC (relative to now) to avoid expiry-based test failures.
 */

export const TEST_IDS = {
  CART_ID: '11111111-1111-4111-8111-111111111111',
  CART_ID_2: '11111111-1111-4111-8111-222222222222',
  CART_ITEM_ID: '22222222-2222-4222-8222-222222222222',
  CART_ITEM_ID_2: '22222222-2222-4222-8222-333333333333',
  USER_ID: '33333333-3333-4333-8333-333333333333',
  PRODUCT_ID: '44444444-4444-4444-8444-444444444444',
  PRODUCT_ID_2: '44444444-4444-4444-8444-555555555555',
  VARIANT_ID: '55555555-5555-4555-8555-555555555555',
  COUPON_ID: '66666666-6666-4666-8666-666666666666',
  VOUCHER_ID: '77777777-7777-4777-8777-777777777777',
  TAX_ID: '88888888-8888-4888-8888-888888888888',
  SHIPPING_ID: '99999999-9999-4999-8999-999999999999',
  SAVED_ITEM_ID: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  ABANDONED_CART_ID: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  GUEST_CART_ID: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
  MERGER_ID: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
  SESSION_ID: 'session-test-1234567890',
  ADDRESS_ID: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
  VENDOR_ID: 'ffffffff-ffff-4fff-8fff-ffffffffffff',
} as const;

// ═══════════════════════════════════════════
// Dynamic dates — relative to current time
// ═══════════════════════════════════════════
const NOW_MS = Date.now();
const HOUR = 3600 * 1000;
const DAY = 24 * HOUR;

export const TEST_DATES = {
  NOW: new Date(NOW_MS).toISOString(),
  YESTERDAY: new Date(NOW_MS - DAY).toISOString(),
  TWO_DAYS_AGO: new Date(NOW_MS - 2 * DAY).toISOString(),
  TOMORROW: new Date(NOW_MS + DAY).toISOString(),
  NEXT_WEEK: new Date(NOW_MS + 7 * DAY).toISOString(),
  NEXT_MONTH: new Date(NOW_MS + 30 * DAY).toISOString(),
  THIRTY_DAYS_AGO: new Date(NOW_MS - 30 * DAY).toISOString(),
  // For expiry-negative tests:
  PAST_EXPIRY: new Date(NOW_MS - 30 * DAY).toISOString(),
} as const;

export const TEST_CURRENCY = 'BDT';
export const TEST_CURRENCY_USD = 'USD';
