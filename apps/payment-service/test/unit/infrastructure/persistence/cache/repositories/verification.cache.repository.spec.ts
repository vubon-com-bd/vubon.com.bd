/**
 * VerificationCacheRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { VerificationCacheRepository } from '@infrastructure/cache/repositories/verification.cache.repository';
import { makeMockRedisService, type MockRedisService } from '@test-infra/redis-mock';

describe('VerificationCacheRepository', () => {
  let redis: MockRedisService;
  let repo: VerificationCacheRepository;

  beforeEach(() => {
    redis = makeMockRedisService();
    repo = new VerificationCacheRepository(redis as never);
  });

  describe('getAttempts()', () => {
    it('returns null when no attempts', async () => {
      expect(await repo.getAttempts('ver-1')).toBeNull();
    });
  });

  describe('recordAttempt()', () => {
    it('starts at attempts=1', async () => {
      const record = await repo.recordAttempt('ver-1');
      expect(record.attempts).toBe(1);
      expect(record.lockedOut).toBe(false);
      expect(record.lastAttemptAt).toBeDefined();
    });

    it('increments attempts', async () => {
      await repo.recordAttempt('ver-1');
      await repo.recordAttempt('ver-1');
      const record = await repo.recordAttempt('ver-1');
      expect(record.attempts).toBe(3);
    });

    it('locks out after 5 attempts', async () => {
      for (let i = 0; i < 4; i++) {
        await repo.recordAttempt('ver-1');
      }
      const record = await repo.recordAttempt('ver-1');
      expect(record.attempts).toBe(5);
      expect(record.lockedOut).toBe(true);
    });

    it('uses 15-minute TTL', async () => {
      await repo.recordAttempt('ver-1');
      const setCall = redis.set.mock.calls[0] as [string, unknown, number];
      expect(setCall[2]).toBe(900);
    });

    it('uses prefixed key', async () => {
      await repo.recordAttempt('ver-1');
      expect(redis.__store.has('payment-service:verification:ver-1')).toBe(true);
    });
  });

  describe('clear()', () => {
    it('removes all attempts for the key', async () => {
      await repo.recordAttempt('ver-1');
      await repo.clear('ver-1');
      expect(await repo.getAttempts('ver-1')).toBeNull();
    });
  });

  describe('isLockedOut()', () => {
    it('false with no attempts', async () => {
      expect(await repo.isLockedOut('ver-1')).toBe(false);
    });

    it('false with < 5 attempts', async () => {
      for (let i = 0; i < 4; i++) {
        await repo.recordAttempt('ver-1');
      }
      expect(await repo.isLockedOut('ver-1')).toBe(false);
    });

    it('true after 5 attempts', async () => {
      for (let i = 0; i < 5; i++) {
        await repo.recordAttempt('ver-1');
      }
      expect(await repo.isLockedOut('ver-1')).toBe(true);
    });
  });
});
