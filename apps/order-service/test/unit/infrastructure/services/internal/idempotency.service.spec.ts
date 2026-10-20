/**
 * IdempotencyService tests
 * @module order-service/test/unit/infrastructure/services/internal
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { IdempotencyService } from '@infrastructure/services/internal/idempotency.service';

describe('IdempotencyService', () => {
  let service: IdempotencyService;
  let mockCache: {
    get: jest.Mock;
    set: jest.Mock;
    delete: jest.Mock;
    tryLock: jest.Mock;
    releaseLock: jest.Mock;
  };

  beforeEach(() => {
    mockCache = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
      tryLock: jest.fn(),
      releaseLock: jest.fn(),
    };
    service = new IdempotencyService(mockCache as never);
  });

  it('lookup returns orderId when hit', async () => {
    mockCache.get.mockResolvedValue({
      orderId: 'order-1',
      createdAt: '2024-01-01T00:00:00Z',
    });
    expect(await service.lookup('key-1')).toBe('order-1');
  });

  it('lookup returns null on miss', async () => {
    mockCache.get.mockResolvedValue(null);
    expect(await service.lookup('key-1')).toBeNull();
  });

  it('remember delegates to cache.set', async () => {
    await service.remember('key-1', 'order-1');
    expect(mockCache.set).toHaveBeenCalledWith('key-1', 'order-1');
  });

  it('forget delegates to cache.delete', async () => {
    await service.forget('key-1');
    expect(mockCache.delete).toHaveBeenCalledWith('key-1');
  });

  it('tryLock delegates to cache.tryLock', async () => {
    mockCache.tryLock.mockResolvedValue(true);
    expect(await service.tryLock('key-1')).toBe(true);
    expect(mockCache.tryLock).toHaveBeenCalledWith('key-1');
  });

  it('releaseLock delegates to cache.releaseLock', async () => {
    await service.releaseLock('key-1');
    expect(mockCache.releaseLock).toHaveBeenCalledWith('key-1');
  });
});
