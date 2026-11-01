/**
 * Jest Env Setup — runs before each test file
 * @module product-service/test
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

// Database
process.env['DATABASE_URL'] =
  process.env['DATABASE_URL'] ??
  'postgresql://postgres@localhost:5432/vubon_product?schema=public';

// Redis
process.env['REDIS_URL'] = process.env['REDIS_URL'] ?? 'redis://localhost:6379';
process.env['REDIS_KEY_PREFIX'] = process.env['REDIS_KEY_PREFIX'] ?? 'test:';

// Queue
process.env['QUEUE_ENABLED'] = process.env['QUEUE_ENABLED'] ?? 'false';
process.env['QUEUE_AUTO_START_WORKERS'] = process.env['QUEUE_AUTO_START_WORKERS'] ?? 'false';

// App
process.env['PORT'] = process.env['PORT'] ?? '3002';

export {};
