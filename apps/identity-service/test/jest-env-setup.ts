/**
 * Jest Env Setup — runs before each test file
 * @module identity-service/test
 *
 * Sets test-safe defaults for env vars, matching the shape required by
 * shared-config env schema validation (JWT_SECRET >= 32 chars, etc).
 */
process.env['NODE_ENV'] = process.env['NODE_ENV'] ?? 'test';
process.env['LOG_LEVEL'] = process.env['LOG_LEVEL'] ?? 'error';

// JWT — must be >= 32 chars
process.env['JWT_SECRET'] =
  process.env['JWT_SECRET'] ??
  'test_jwt_secret_must_be_at_least_32_characters_long_12345';

// Prisma
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] =
  process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] ?? 'true';

// DB Mode — InMemory for tests
process.env['DB_MODE'] = process.env['DB_MODE'] ?? 'memory';

// Database
process.env['DATABASE_URL'] =
  process.env['DATABASE_URL'] ??
  'postgresql://postgres@localhost:5432/vubon_identity?schema=public';

// Redis
process.env['REDIS_URL'] = process.env['REDIS_URL'] ?? 'redis://localhost:6379';
process.env['REDIS_KEY_PREFIX'] = process.env['REDIS_KEY_PREFIX'] ?? 'test:';

// Queue — disable in tests
process.env['QUEUE_ENABLED'] = process.env['QUEUE_ENABLED'] ?? 'false';
process.env['QUEUE_AUTO_START_WORKERS'] =
  process.env['QUEUE_AUTO_START_WORKERS'] ?? 'false';

// App
process.env['PORT'] = process.env['PORT'] ?? '3001';
process.env['API_PREFIX'] = process.env['API_PREFIX'] ?? 'api/v1';

// JWT extras (used by token config)
process.env['JWT_ISSUER'] = process.env['JWT_ISSUER'] ?? 'vubon-api';
process.env['JWT_AUDIENCE'] = process.env['JWT_AUDIENCE'] ?? 'vubon-client';
process.env['JWT_ACCESS_EXPIRY'] = process.env['JWT_ACCESS_EXPIRY'] ?? '15m';
process.env['JWT_REFRESH_EXPIRY'] = process.env['JWT_REFRESH_EXPIRY'] ?? '7d';

export {};
