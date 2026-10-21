/**
 * IdempotencyCacheRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { IdempotencyCacheRepository } from '@infrastructure/cache/repositories/idempotency.cache.repository';
import { makeMockRedisService, type MockRedisService } from '@test-infra/redis-mock';

describe('IdempotencyCacheRepository', () => {
  let redis: MockRedisService;
  let repo: IdempotencyCacheRepository;

  beforeEach(() => {
    redis = makeMockRedisService();
    repo = new IdempotencyCacheRepository(redis as never);
  });

  describe('get()', () => {
    it('returns null when key missing', async () => {
      expect(await repo.get('idem-key-1')).toBeNull();
    });

    it('returns record after set', async () => {
      await repo.set('idem-key-1', 'result-1');
      const record = await repo.get('idem-key-1');
      expect(record).not.toBeNull();
      expect(record?.resultId).toBe('result-1');
      expect(record?.createdAt).toBeDefined();
    });
  });

  describe('set()', () => {
    it('stores record with 24h TTL', async () => {
      await repo.set('idem-key-1', 'result-1');
      const setCall = redis.set.mock.calls[0] as [string, unknown, number];
      expect(setCall[0]).toBe('payment-service:idempotency:idem-key-1');
      expect(setCall[2]).toBe(86400);
    });
  });

  describe('delete()', () => {
    it('removes the key', async () => {
      await repo.set('idem-key-1', 'result-1');
      await repo.delete('idem-key-1');
      expect(await repo.get('idem-key-1')).toBeNull();
    });
  });

  describe('tryLock()', () => {
    it('acquires lock when free', async () => {
      const ok = await repo.tryLock('idem-key-1');
      expect(ok).toBe(true);
      expect(redis.__store.has('payment-service:idempotency:lock:idem-key-1')).toBe(true);
    });

    it('fails when already locked', async () => {
      await repo.tryLock('idem-key-1');
      const second = await repo.tryLock('idem-key-1');
      expect(second).toBe(false);
    });

    it('uses 30-second TTL', async () => {
      await repo.tryLock('idem-key-1');
      const lockSet = redis.set.mock.calls.find(
        (c) => (c[0] as string).includes(':lock:'),
      ) as [string, unknown, number];
      expect(lockSet[2]).toBe(30);
    });
  });

  describe('releaseLock()', () => {
    it('removes the lock key', async () => {
      await repo.tryLock('idem-key-1');
      await repo.releaseLock('idem-key-1');
      const second = await repo.tryLock('idem-key-1');
      expect(second).toBe(true);
    });
  });

  describe('exists()', () => {
    it('true after set', async () => {
      await repo.set('idem-key-1', 'result-1');
      expect(await repo.exists('idem-key-1')).toBe(true);
    });

    it('false when missing', async () => {
      expect(await repo.exists('missing')).toBe(false);
    });
  });
});
