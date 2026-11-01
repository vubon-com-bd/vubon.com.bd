import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { IdempotencyCacheRepository } from '@infrastructure/cache/repositories/idempotency.cache.repository';

describe('IdempotencyCacheRepository', () => {
  let repo: IdempotencyCacheRepository;
  let mockRedis: {
    get: jest.Mock;
    set: jest.Mock;
    del: jest.Mock;
    exists: jest.Mock;
  };

  beforeEach(() => {
    mockRedis = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
      exists: jest.fn(),
    };
    repo = new IdempotencyCacheRepository(mockRedis as never);
  });

  it('get returns record', async () => {
    const record = { orderId: 'order-1', createdAt: '2024-01-01T00:00:00Z' };
    mockRedis.get.mockResolvedValue(record);
    expect(await repo.get('key-1')).toEqual(record);
    expect(mockRedis.get).toHaveBeenCalledWith('order-service:idempotency:key-1');
  });

  it('get returns null on miss', async () => {
    mockRedis.get.mockResolvedValue(null);
    expect(await repo.get('key-1')).toBeNull();
  });

  it('set stores record with 24h TTL', async () => {
    await repo.set('key-1', 'order-1');
    expect(mockRedis.set).toHaveBeenCalledWith(
      'order-service:idempotency:key-1',
      expect.objectContaining({
        orderId: 'order-1',
        createdAt: expect.any(String),
      }),
      24 * 60 * 60,
    );
  });

  it('delete removes key', async () => {
    await repo.delete('key-1');
    expect(mockRedis.del).toHaveBeenCalledWith('order-service:idempotency:key-1');
  });

  it('tryLock acquires lock when not present', async () => {
    mockRedis.exists.mockResolvedValue(false);
    const result = await repo.tryLock('key-1');
    expect(result).toBe(true);
    expect(mockRedis.exists).toHaveBeenCalledWith(
      'order-service:idempotency:lock:key-1',
    );
    expect(mockRedis.set).toHaveBeenCalledWith(
      'order-service:idempotency:lock:key-1',
      'locked',
      30,
    );
  });

  it('tryLock fails when already locked', async () => {
    mockRedis.exists.mockResolvedValue(true);
    expect(await repo.tryLock('key-1')).toBe(false);
    expect(mockRedis.set).not.toHaveBeenCalled();
  });

  it('releaseLock deletes lock key', async () => {
    await repo.releaseLock('key-1');
    expect(mockRedis.del).toHaveBeenCalledWith(
      'order-service:idempotency:lock:key-1',
    );
  });
});
