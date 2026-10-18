/**
 * E2E Test Setup — environment configuration
 * @module identity-service/test
 */

import {
  beforeAll,
  afterAll,
  jest as jestGlobal,
} from '@jest/globals';

// ─── Environment ─────────────────────────────
process.env['NODE_ENV'] = 'test';
process.env['IDENTITY_ENABLED'] = 'true';
process.env['IDENTITY_JWT_SECRET'] = 'test-jwt-secret-e2e';
process.env['IDENTITY_JWT_ISSUER'] = 'identity-service-test';
process.env['IDENTITY_JWT_AUDIENCE'] = 'identity-test-client';
process.env['IDENTITY_ACCESS_TOKEN_TTL'] = '900';
process.env['IDENTITY_REFRESH_TOKEN_TTL'] = '604800';
process.env['IDENTITY_ID_TOKEN_TTL'] = '3600';
process.env['IDENTITY_RESET_TOKEN_TTL'] = '3600';
process.env['IDENTITY_VERIFY_TOKEN_TTL'] = '86400';
process.env['IDENTITY_MAX_LOGIN_ATTEMPTS'] = '5';
process.env['IDENTITY_MAX_LOGIN_ATTEMPTS_PER_IP'] = '20';
process.env['IDENTITY_LOCKOUT_DURATION'] = '900';
process.env['IDENTITY_ATTEMPT_WINDOW'] = '300';
process.env['IDENTITY_MAX_SESSIONS_PER_USER'] = '5';
process.env['IDENTITY_SESSION_IDLE_TIMEOUT'] = '1800';
process.env['IDENTITY_SESSION_ABSOLUTE_TIMEOUT'] = '604800';
process.env['IDENTITY_MFA_ENABLED'] = 'true';
process.env['IDENTITY_MFA_BACKUP_CODES'] = '10';
process.env['IDENTITY_OTP_TTL'] = '300';
process.env['IDENTITY_OTP_MAX_ATTEMPTS'] = '5';
process.env['IDENTITY_OTP_RESEND_COOLDOWN'] = '60';
process.env['IDENTITY_MAX_DEVICES_PER_USER'] = '10';
process.env['IDENTITY_DEVICE_TRUST_DAYS'] = '30';
process.env['IDENTITY_PASSWORD_HISTORY'] = '5';
process.env['IDENTITY_PASSWORD_EXPIRY_DAYS'] = '90';
process.env['IDENTITY_BCRYPT_ROUNDS'] = '10'; // faster in tests
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
