/**
 * Jest setup — runs before every test file.
 */
import 'reflect-metadata';

// Increase default timeout for integration-style tests
jest.setTimeout(30000);

// Silence NestJS logger in tests unless explicitly needed
beforeAll(() => {
  process.env.LOG_LEVEL = 'error';
  process.env.NODE_ENV = 'test';
});
