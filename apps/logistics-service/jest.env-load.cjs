/**
 * Pre-load .env BEFORE any test file imports @vubon/shared-config.
 *
 * Strategy:
 *  1. Force-safe test values are written to process.env FIRST.
 *  2. .env is loaded but does NOT overwrite already-set keys.
 *  3. Result: tests always get valid DATABASE_URL + disabled integrations.
 *
 * CJS file — always runs synchronously first via jest `setupFiles`.
 */
const path = require('node:path');
const fs = require('node:fs');

// ═══ STEP 1: Force-safe test values (highest priority) ═══
const TEST_OVERRIDES = {
  NODE_ENV: 'test',
  LOG_LEVEL: 'error',

  // Valid DB URL (dummy — tests use mocks, not real DB)
  DATABASE_URL: 'postgresql://test:test@localhost:5432/test_db?schema=public',
  REDIS_URL: 'redis://localhost:6379',
  REDIS_KEY_PREFIX: 'test:',

  // Disable all external integrations (prevent real HTTP calls)
  COURIER_ENABLED: 'false',
  PATHAO_ENABLED: 'false',
  REDX_ENABLED: 'false',
  STEADFAST_ENABLED: 'false',
  SA_PARIBAHAN_ENABLED: 'false',
  SUNDARBAN_ENABLED: 'false',
  PAPERFLY_ENABLED: 'false',
  DHL_ENABLED: 'false',
  FEDEX_ENABLED: 'false',
  UPS_ENABLED: 'false',
  ARAMEX_ENABLED: 'false',
  KARATOYA_ENABLED: 'false',
  SHOHAGH_ENABLED: 'false',
  TRC_ENABLED: 'false',
  ECOURIER_ENABLED: 'false',
  GOOGLE_MAPS_ENABLED: 'false',
  EMAIL_ENABLED: 'false',
  SMS_ENABLED: 'false',
  PUSH_ENABLED: 'false',
  WAREHOUSE_ENABLED: 'false',
  QUEUE_ENABLED: 'false',
};

for (const [key, val] of Object.entries(TEST_OVERRIDES)) {
  process.env[key] = val;
}

// ═══ STEP 2: Load .env (will NOT overwrite already-set keys) ═══
const candidatePaths = [
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, './.env'),
  path.resolve(__dirname, './.env.test'),
];

for (const p of candidatePaths) {
  if (!fs.existsSync(p)) continue;
  const content = fs.readFileSync(p, 'utf8');
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    const val = line.slice(eq + 1).trim();
    // Critical: only set if not already set by TEST_OVERRIDES
    if (!(key in process.env)) {
      process.env[key] = val;
    }
  }
  // eslint-disable-next-line no-console
  console.log(`[jest.env-load] loaded ${p} (test overrides preserved)`);
}
