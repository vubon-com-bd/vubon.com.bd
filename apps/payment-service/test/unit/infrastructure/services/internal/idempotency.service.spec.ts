/**
 * IdempotencyService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { IdempotencyService } from '@infrastructure/services/internal/idempotency.service';
import { IdempotencyCacheRepository } from '@infrastructure/cache/repositories/idempotency.cache.repository';

function makeCacheMock() {
  return {
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    tryLock: jest.fn(),
    releaseLock: jest.fn(),
    exists: jest.fn(),
    isLocked: jest.fn(),
  };
}

describe('IdempotencyService', () => {
  let cache: ReturnType<typeof makeCacheMock>;
  let service: IdempotencyService;

  beforeEach(() => {
    cache = makeCacheMock();
    service = new IdempotencyService(
      cache as unknown as IdempotencyCacheRepository,
    );
  });

  describe('lookup()', () => {
    it('returns { hit: false } when key missing', async () => {
      cache.get.mockResolvedValue(null);
      const result = await service.lookup('key-1');
      expect(result.hit).toBe(false);
    });

    it('returns { hit: true, resultId } when cached', async () => {
      cache.get.mockResolvedValue({
        resultId: 'pay-123',
        createdAt: '2025-01-15T10:00:00.000Z',
      });
      const result = await service.lookup('key-1');
      expect(result.hit).toBe(true);
      expect(result.resultId).toBe('pay-123');
    });
  });

  describe('remember()', () => {
    it('calls cache.set with key + resultId', async () => {
      cache.set.mockResolvedValue(undefined);
      await service.remember('key-1', 'pay-123');
      expect(cache.set).toHaveBeenCalledWith('key-1', 'pay-123');
    });
  });

  describe('forget()', () => {
    it('calls cache.delete', async () => {
      cache.delete.mockResolvedValue(undefined);
      await service.forget('key-1');
      expect(cache.delete).toHaveBeenCalledWith('key-1');
    });
  });

  describe('tryLock()', () => {
    it('delegates to cache.tryLock', async () => {
      cache.tryLock.mockResolvedValue(true);
      expect(await service.tryLock('key-1')).toBe(true);
      expect(cache.tryLock).toHaveBeenCalledWith('key-1');
    });

    it('returns false when lock held', async () => {
      cache.tryLock.mockResolvedValue(false);
      expect(await service.tryLock('key-1')).toBe(false);
    });
  });

  describe('releaseLock()', () => {
    it('delegates to cache.releaseLock', async () => {
      cache.releaseLock.mockResolvedValue(undefined);
      await service.releaseLock('key-1');
      expect(cache.releaseLock).toHaveBeenCalledWith('key-1');
    });
  });

  describe('isLocked()', () => {
    it('delegates to cache.isLocked (not cache.exists)', async () => {
      cache.isLocked.mockResolvedValue(true);
      const locked = await service.isLocked('key-1');
      expect(locked).toBe(true);
      expect(cache.isLocked).toHaveBeenCalledWith('key-1');
      expect(cache.exists).not.toHaveBeenCalled();
    });

    it('returns false when no lock', async () => {
      cache.isLocked.mockResolvedValue(false);
      expect(await service.isLocked('key-1')).toBe(false);
    });
  });
});
