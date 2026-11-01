/**
 * CartTotalsCacheRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartTotalsCacheRepository } from '@infrastructure/persistence/cache/repositories/cart-totals.cache.repository.js';
import { TEST_IDS } from '@fixtures/index';
import {
  makeMockKernelRedisService,
  type MockKernelRedisService,
} from '@test-infra/index';

function makeTotals() {
  return {
    subtotal: 100,
    discount: 10,
    taxableBase: 90,
    tax: 13.5,
    shipping: 50,
    total: 153.5,
    currency: 'BDT',
    itemCount: 3,
  };
}

describe('CartTotalsCacheRepository', () => {
  let redis: MockKernelRedisService;
  let repo: CartTotalsCacheRepository;

  beforeEach(() => {
    redis = makeMockKernelRedisService();
    repo = new CartTotalsCacheRepository(redis as never);
  });

  describe('set() + get()', () => {
    it('should cache and retrieve totals', async () => {
      const totals = makeTotals();
      await repo.set(TEST_IDS.CART_ID, totals);

      const found = await repo.get(TEST_IDS.CART_ID);
      expect(found).toEqual(totals);
    });

    it('should return null for missing key', async () => {
      const found = await repo.get(TEST_IDS.CART_ID);
      expect(found).toBeNull();
    });

    it('should use correct key prefix', async () => {
      await repo.set(TEST_IDS.CART_ID, makeTotals());
      expect(redis.set).toHaveBeenCalledWith(
        `cart:totals:${TEST_IDS.CART_ID}`,
        expect.anything(),
        expect.any(Number),
      );
    });
  });

  describe('invalidate()', () => {
    it('should remove cache entry', async () => {
      await repo.set(TEST_IDS.CART_ID, makeTotals());
      await repo.invalidate(TEST_IDS.CART_ID);

      const found = await repo.get(TEST_IDS.CART_ID);
      expect(found).toBeNull();
    });

    it('should call redis.del with correct key', async () => {
      await repo.invalidate(TEST_IDS.CART_ID);
      expect(redis.del).toHaveBeenCalledWith(`cart:totals:${TEST_IDS.CART_ID}`);
    });
  });

  describe('invalidateMany()', () => {
    it('should remove multiple cache entries', async () => {
      await repo.set(TEST_IDS.CART_ID, makeTotals());
      await repo.set(TEST_IDS.CART_ID_2, makeTotals());

      await repo.invalidateMany([TEST_IDS.CART_ID, TEST_IDS.CART_ID_2]);

      expect(await repo.get(TEST_IDS.CART_ID)).toBeNull();
      expect(await repo.get(TEST_IDS.CART_ID_2)).toBeNull();
    });

    it('should handle empty list', async () => {
      await expect(repo.invalidateMany([])).resolves.toBeUndefined();
    });
  });
});
