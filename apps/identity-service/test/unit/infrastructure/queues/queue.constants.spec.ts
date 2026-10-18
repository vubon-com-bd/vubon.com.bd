/**
 * Queue constants smoke tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  AUTH_QUEUE_NAME,
  AUTH_JOB_NAME,
  AUTH_QUEUE_LIMITS,
} from '@infrastructure/queues/queue.constants.js';

describe('Queue Constants', () => {
  it('AUTH_QUEUE_NAME has all expected keys', () => {
    expect(AUTH_QUEUE_NAME).toHaveProperty('AUTH');
    expect(AUTH_QUEUE_NAME).toHaveProperty('SESSION');
    expect(AUTH_QUEUE_NAME).toHaveProperty('TOKEN');
    expect(AUTH_QUEUE_NAME).toHaveProperty('SYNC');
    expect(AUTH_QUEUE_NAME).toHaveProperty('NOTIFICATION');
    expect(AUTH_QUEUE_NAME).toHaveProperty('ANALYTICS');
  });

  it('AUTH_JOB_NAME has all expected keys', () => {
    expect(AUTH_JOB_NAME).toHaveProperty('SESSION_CLEANUP');
    expect(AUTH_JOB_NAME).toHaveProperty('TOKEN_CLEANUP');
  });

  it('AUTH_QUEUE_LIMITS has expected values', () => {
    expect(AUTH_QUEUE_LIMITS.MAX_ATTEMPTS).toBeGreaterThan(0);
    expect(AUTH_QUEUE_LIMITS.CONCURRENCY).toBeGreaterThan(0);
  });
});
