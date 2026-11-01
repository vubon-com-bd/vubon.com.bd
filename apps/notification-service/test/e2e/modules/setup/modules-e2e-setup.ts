/**
 * Modules Layer E2E Setup
 * @module notification-service/test/e2e/modules/setup
 *
 * Runs BEFORE any imports — via setupFiles (not setupFilesAfterEnv).
 */
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['REDIS_LAZY_CONNECT'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';
process.env['LOG_LEVEL'] = 'error';
process.env['NODE_ENV'] = 'test';
process.env['DATABASE_URL'] = process.env['DATABASE_URL'] ?? 'postgresql://localhost:5432/vubon_test';
process.env['REDIS_URL'] = process.env['REDIS_URL'] ?? 'redis://localhost:6379';
