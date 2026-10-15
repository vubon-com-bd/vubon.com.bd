/**
 * E2E Test Setup — environment configuration
 * @module cart-service/test
 */

import {
  beforeAll,
  afterAll,
  jest as jestGlobal,
} from '@jest/globals';

// ─── Environment ─────────────────────────────
process.env['NODE_ENV'] = 'test';
process.env['CART_ENABLED'] = 'true';
process.env['CART_DEFAULT_CURRENCY'] = 'BDT';
process.env['CART_ALLOW_GUEST'] = 'true';
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'false';

// Suppress BullMQ auto-start in tests
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

// ─── Timeouts ────────────────────────────────
jestGlobal.setTimeout(60000);

// ─── Suppress console noise ──────────────────
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const msg = String(args[0] ?? '');
    if (msg.includes('Prisma engine') || msg.includes('Redis init')) return;
    originalConsoleError(...args);
  };

  console.warn = (...args: unknown[]) => {
    const msg = String(args[0] ?? '');
    if (msg.includes('prisma:warn') || msg.includes('Prisma detected')) return;
    originalConsoleWarn(...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});
