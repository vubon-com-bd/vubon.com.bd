/**
 * IdempotencyService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { IdempotencyService } from '@infrastructure/services/internal/idempotency.service.js';
import { TEST_IDS } from '@fixtures/index';

const TEST_KEY = 'idem-key-test-1234567890';

describe('IdempotencyService', () => {
  let service: IdempotencyService;
  let cache: {
    get: jest.Mock;
    set: jest.Mock;
    delete: jest.Mock;
    tryLock: jest.Mock;
    releaseLock: jest.Mock;
  };

  beforeEach(() => {
    cache = {
      get: jest.fn(async () => null),
      set: jest.fn(async () => undefined),
      delete: jest.fn(async () => undefined),
      tryLock: jest.fn(async () => true),
      releaseLock: jest.fn(async () => undefined),
    };
    service = new IdempotencyService(cache as never);
  });

  describe('lookup()', () => {
    it('should return cartId when record exists', async () => {
      cache.get.mockResolvedValue({
        cartId: TEST_IDS.CART_ID,
        createdAt: new Date().toISOString(),
      });
      const result = await service.lookup(TEST_KEY);
      expect(result).toBe(TEST_IDS.CART_ID);
    });

    it('should return null when no record', async () => {
      cache.get.mockResolvedValue(null);
      const result = await service.lookup(TEST_KEY);
      expect(result).toBeNull();
    });
  });

  describe('remember()', () => {
    it('should store record', async () => {
      await service.remember(TEST_KEY, TEST_IDS.CART_ID);
      expect(cache.set).toHaveBeenCalledWith(TEST_KEY, TEST_IDS.CART_ID);
    });
  });

  describe('forget()', () => {
    it('should delete record', async () => {
      await service.forget(TEST_KEY);
      expect(cache.delete).toHaveBeenCalledWith(TEST_KEY);
    });
  });

  describe('tryLock()', () => {
    it('should acquire lock', async () => {
      cache.tryLock.mockResolvedValue(true);
      const acquired = await service.tryLock(TEST_KEY);
      expect(acquired).toBe(true);
      expect(cache.tryLock).toHaveBeenCalledWith(TEST_KEY);
    });

    it('should fail when lock exists', async () => {
      cache.tryLock.mockResolvedValue(false);
      const acquired = await service.tryLock(TEST_KEY);
      expect(acquired).toBe(false);
    });
  });

  describe('releaseLock()', () => {
    it('should release lock', async () => {
      await service.releaseLock(TEST_KEY);
      expect(cache.releaseLock).toHaveBeenCalledWith(TEST_KEY);
    });
  });
});
