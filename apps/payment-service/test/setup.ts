/**
 * Global test setup
 * - Configures test timeout
 * - Mocks environment
 */
import { jest } from '@jest/globals';

// Set test environment defaults
process.env.NODE_ENV = 'test';
process.env.PAYMENT_ENABLED = 'true';

// Increase timeout for slow CI
jest.setTimeout(30000);

// Silence console in tests (unless DEBUG_TESTS=true)
if (process.env.DEBUG_TESTS !== 'true') {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  };
}

export {};
