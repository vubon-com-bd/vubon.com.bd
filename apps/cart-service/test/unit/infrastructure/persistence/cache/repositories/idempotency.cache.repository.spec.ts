/**
 * IdempotencyCacheRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { IdempotencyCacheRepository } from '@infrastructure/persistence/cache/repositories/idempotency.cache.repository.js';
import { TEST_IDS } from '@fixtures/index';
import {
  makeMockKernelRedisService,
  type MockKernelRedisService,
} from '@test-infra/index';

const TEST_KEY = 'idem-key-test-1234567890';

describe('IdempotencyCacheRepository', () => {
  let redis: MockKernelRedisService;
  let repo: IdempotencyCacheRepository;

  beforeEach(() => {
    redis = makeMockKernelRedisService();
    repo = new IdempotencyCacheRepository(redis as never);
  });

  // ═══════════════ BASIC SET / GET ═══════════════

  describe('set() + get()', () => {
    it('should save and retrieve idempotency record', async () => {
      await repo.set(TEST_KEY, TEST_IDS.CART_ID);

      const record = await repo.get(TEST_KEY);
      expect(record).not.toBeNull();
      expect(record?.cartId).toBe(TEST_IDS.CART_ID);
      expect(record?.createdAt).toBeDefined();
    });

    it('should return null for unknown key', async () => {
      expect(await repo.get(TEST_KEY)).toBeNull();
    });

    it('should use correct key prefix', async () => {
      await repo.set(TEST_KEY, TEST_IDS.CART_ID);
      expect(redis.set).toHaveBeenCalledWith(
        `cart:idempotency:${TEST_KEY}`,
        expect.objectContaining({ cartId: TEST_IDS.CART_ID }),
        expect.any(Number),
      );
    });

    it('should include ISO timestamp', async () => {
      await repo.set(TEST_KEY, TEST_IDS.CART_ID);
      const record = await repo.get(TEST_KEY);
      expect(record?.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });

  // ═══════════════ DELETE ═══════════════

  describe('delete()', () => {
    it('should remove record', async () => {
      await repo.set(TEST_KEY, TEST_IDS.CART_ID);
      await repo.delete(TEST_KEY);

      expect(await repo.get(TEST_KEY)).toBeNull();
    });

    it('should call del with correct key', async () => {
      await repo.delete(TEST_KEY);
      expect(redis.del).toHaveBeenCalledWith(`cart:idempotency:${TEST_KEY}`);
    });
  });

  // ═══════════════ LOCKING ═══════════════

  describe('tryLock()', () => {
    it('should acquire lock when free', async () => {
      const acquired = await repo.tryLock(TEST_KEY);
      expect(acquired).toBe(true);
    });

    it('should fail when lock exists', async () => {
      await repo.tryLock(TEST_KEY);
      const second = await repo.tryLock(TEST_KEY);
      expect(second).toBe(false);
    });

    it('should set lock with correct prefix', async () => {
      await repo.tryLock(TEST_KEY);
      const lockKey = `cart:idempotency:lock:${TEST_KEY}`;
      expect(redis.set).toHaveBeenCalledWith(lockKey, 'locked', expect.any(Number));
    });
  });

  describe('releaseLock()', () => {
    it('should remove lock', async () => {
      await repo.tryLock(TEST_KEY);
      await repo.releaseLock(TEST_KEY);

      const lockKey = `cart:idempotency:lock:${TEST_KEY}`;
      expect(redis.del).toHaveBeenCalledWith(lockKey);
    });

    it('should allow re-acquiring after release', async () => {
      await repo.tryLock(TEST_KEY);
      await repo.releaseLock(TEST_KEY);
      const acquired = await repo.tryLock(TEST_KEY);
      expect(acquired).toBe(true);
    });
  });

  // ═══════════════ EDGE CASES ═══════════════

  describe('edge cases', () => {
    it('should overwrite existing record on set', async () => {
      await repo.set(TEST_KEY, TEST_IDS.CART_ID);
      await repo.set(TEST_KEY, TEST_IDS.CART_ID_2);

      const record = await repo.get(TEST_KEY);
      expect(record?.cartId).toBe(TEST_IDS.CART_ID_2);
    });

    it('should handle delete of non-existent key gracefully', async () => {
      await expect(repo.delete('missing-key')).resolves.toBeUndefined();
    });

    it('should handle releaseLock on non-existent lock gracefully', async () => {
      await expect(repo.releaseLock('missing-key')).resolves.toBeUndefined();
    });
  });
});
