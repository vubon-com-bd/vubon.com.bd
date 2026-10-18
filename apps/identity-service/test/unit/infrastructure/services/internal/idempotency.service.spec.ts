/**
 * IdempotencyService unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { IdempotencyService } from '@infrastructure/services/internal/idempotency.service.js';

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
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
      tryLock: jest.fn(),
      releaseLock: jest.fn(),
    };
    service = new IdempotencyService(cache as never);
  });

  it('lookup returns null on cache miss', async () => {
    cache.get.mockResolvedValueOnce(null);
    expect(await service.lookup('key')).toBeNull();
  });

  it('lookup returns result from cache', async () => {
    cache.get.mockResolvedValueOnce({ result: 'result' });
    expect(await service.lookup('key')).toBe('result');
  });

  it('remember delegates to cache.set', async () => {
    await service.remember('key', 'result');
    expect(cache.set).toHaveBeenCalledWith('key', 'result');
  });

  it('forget delegates to cache.delete', async () => {
    await service.forget('key');
    expect(cache.delete).toHaveBeenCalledWith('key');
  });

  it('tryLock delegates to cache.tryLock', async () => {
    cache.tryLock.mockResolvedValueOnce(true);
    expect(await service.tryLock('key')).toBe(true);
  });

  it('releaseLock delegates to cache.releaseLock', async () => {
    await service.releaseLock('key');
    expect(cache.releaseLock).toHaveBeenCalledWith('key');
  });
});
