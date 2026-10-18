/**
 * Global test setup
 * - Configures test timeout
 * - Mocks environment
 * @module identity-service/test
 */
import { jest } from '@jest/globals';

// Set test environment defaults
process.env['NODE_ENV'] = 'test';
process.env['IDENTITY_ENABLED'] = 'true';
process.env['IDENTITY_JWT_SECRET'] = 'test-jwt-secret-do-not-use-in-prod';
process.env['IDENTITY_ACCESS_TOKEN_TTL'] = '900';
process.env['IDENTITY_REFRESH_TOKEN_TTL'] = '604800';
process.env['IDENTITY_MAX_LOGIN_ATTEMPTS'] = '5';
process.env['IDENTITY_LOCKOUT_DURATION'] = '900';
process.env['IDENTITY_MFA_ENABLED'] = 'true';
process.env['IDENTITY_OTP_TTL'] = '300';

// Increase timeout for slow CI
jest.setTimeout(30000);

// Silence console in tests (unless DEBUG_TESTS=true)
if (process.env['DEBUG_TESTS'] !== 'true') {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  };
}

export {};
