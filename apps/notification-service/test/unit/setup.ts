/**
 * Shared unit test setup
 * @module notification-service/test/unit
 *
 * Runs BEFORE test framework for all unit tests।
 */

// ─── Silence noise in test output ───
process.env['NODE_ENV'] = 'test';
process.env['LOG_LEVEL'] = 'error';
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['REDIS_LAZY_CONNECT'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

// ─── Silence Prisma warnings ───
process.env['PRISMA_HIDE_UPDATE_MESSAGE'] = 'true';

// ─── Increase default timeout for slow CI ───
if (typeof jest !== 'undefined') {
  jest.setTimeout(10_000);
}
