/**
 * Global test setup
 * - Configures test timeout
 * - Mocks environment
 * - Prisma mocked at module-resolution level (moduleNameMapper in jest configs)
 */
import { jest } from '@jest/globals';

process.env.NODE_ENV = 'test';
process.env.ORDER_ENABLED = 'true';
process.env.PRISMA_SKIP_ENGINE_BOOTSTRAP = 'true';

jest.setTimeout(30000);

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
