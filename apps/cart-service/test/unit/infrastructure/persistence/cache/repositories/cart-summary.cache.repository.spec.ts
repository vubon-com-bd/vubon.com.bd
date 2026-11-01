/**
 * CartSummaryCacheRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartSummaryCacheRepository } from '@infrastructure/persistence/cache/repositories/cart-summary.cache.repository.js';
import { TEST_IDS } from '@fixtures/index';
import {
  makeMockKernelRedisService,
  type MockKernelRedisService,
} from '@test-infra/index';

function makeSummary() {
  return {
    id: TEST_IDS.CART_ID,
    itemCount: 3,
    total: 500,
    currency: 'BDT',
  };
}

describe('CartSummaryCacheRepository', () => {
  let redis: MockKernelRedisService;
  let repo: CartSummaryCacheRepository;

  beforeEach(() => {
    redis = makeMockKernelRedisService();
    repo = new CartSummaryCacheRepository(redis as never);
  });

  // ═══════════════ BY CART ID ═══════════════

  describe('set() + get() by cart id', () => {
    it('should cache and retrieve summary', async () => {
      const summary = makeSummary();
      await repo.set(TEST_IDS.CART_ID, summary);

      const found = await repo.get(TEST_IDS.CART_ID);
      expect(found).toEqual(summary);
    });

    it('should return null for missing', async () => {
      expect(await repo.get(TEST_IDS.CART_ID)).toBeNull();
    });

    it('should use cart-prefixed key', async () => {
      await repo.set(TEST_IDS.CART_ID, makeSummary());
      expect(redis.set).toHaveBeenCalledWith(
        `cart:summary:${TEST_IDS.CART_ID}`,
        expect.anything(),
        expect.any(Number),
      );
    });
  });

  // ═══════════════ BY USER ═══════════════

  describe('setByUser() + getByUser()', () => {
    it('should cache and retrieve by user', async () => {
      const summary = makeSummary();
      await repo.setByUser(TEST_IDS.USER_ID, summary);

      const found = await repo.getByUser(TEST_IDS.USER_ID);
      expect(found).toEqual(summary);
    });

    it('should return null for unknown user', async () => {
      expect(await repo.getByUser(TEST_IDS.USER_ID)).toBeNull();
    });

    it('should use user-prefixed key', async () => {
      await repo.setByUser(TEST_IDS.USER_ID, makeSummary());
      expect(redis.set).toHaveBeenCalledWith(
        `cart:summary:user:${TEST_IDS.USER_ID}`,
        expect.anything(),
        expect.any(Number),
      );
    });
  });

  // ═══════════════ INVALIDATE ═══════════════

  describe('invalidate()', () => {
    it('should remove cart cache entry', async () => {
      await repo.set(TEST_IDS.CART_ID, makeSummary());
      await repo.invalidate(TEST_IDS.CART_ID);

      expect(await repo.get(TEST_IDS.CART_ID)).toBeNull();
    });

    it('should also remove user cache entry when userId given', async () => {
      await repo.set(TEST_IDS.CART_ID, makeSummary());
      await repo.setByUser(TEST_IDS.USER_ID, makeSummary());

      await repo.invalidate(TEST_IDS.CART_ID, TEST_IDS.USER_ID);

      expect(await repo.get(TEST_IDS.CART_ID)).toBeNull();
      expect(await repo.getByUser(TEST_IDS.USER_ID)).toBeNull();
    });

    it('should only remove cart entry when userId not given', async () => {
      await repo.setByUser(TEST_IDS.USER_ID, makeSummary());
      await repo.invalidate(TEST_IDS.CART_ID);

      expect(await repo.getByUser(TEST_IDS.USER_ID)).not.toBeNull();
    });
  });
});
