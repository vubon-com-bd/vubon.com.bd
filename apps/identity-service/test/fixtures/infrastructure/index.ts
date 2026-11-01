/**
 * Infrastructure Fixtures — Barrel
 * @module identity-service/test/fixtures/infrastructure
 */
export * from './mock-prisma.service.js';
export * from './mock-redis.service.js';
export * from './mock-queue.service.js';
export * from './mock-kernel-security.js';
export * from './mock-kernel-external.js';
export * from './prisma-rows.fixture.js';

// Re-export queue constants for convenience
export {
  AUTH_QUEUE_NAME,
  AUTH_JOB_NAME,
  AUTH_QUEUE_LIMITS,
} from '@infrastructure/queues/queue.constants.js';
