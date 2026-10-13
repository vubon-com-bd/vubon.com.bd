/**
 * Jest Env Setup — runs before each test file
 * @module identity-service/test
 */
process.env['NODE_ENV'] = process.env['NODE_ENV'] ?? 'test';
process.env['LOG_LEVEL'] = process.env['LOG_LEVEL'] ?? 'error';
process.env['JWT_SECRET'] = process.env['JWT_SECRET'] ?? 'test_secret_32_chars_long_here';
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] =
  process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] ?? 'true';

export {};
