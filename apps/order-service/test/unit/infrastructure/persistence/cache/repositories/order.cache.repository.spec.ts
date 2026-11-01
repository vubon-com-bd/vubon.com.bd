/**
 * OrderCacheRepository tests
 * @module order-service/test/unit/infrastructure/persistence/cache
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderCacheRepository } from '@infrastructure/cache/repositories/order.cache.repository';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

describe('OrderCacheRepository', () => {
  let repo: OrderCacheRepository;
  let mockRedis: {
    get: jest.Mock;
    set: jest.Mock;
    del: jest.Mock;
  };

  beforeEach(() => {
    mockRedis = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    };
    repo = new OrderCacheRepository(mockRedis as never);
  });

  it('get returns cached DTO', async () => {
    const dto = { id: 'order-1', status: 'pending' };
    mockRedis.get.mockResolvedValue(dto);
    const result = await repo.get('order-1');
    expect(result).toEqual(dto);
    expect(mockRedis.get).toHaveBeenCalledWith('order-service:order:order-1');
  });

  it('get returns null on miss', async () => {
    mockRedis.get.mockResolvedValue(null);
    const result = await repo.get('order-1');
    expect(result).toBeNull();
  });

  it('set caches with FIVE_MINUTES TTL', async () => {
    const dto = { id: 'order-1', status: 'pending' };
    await repo.set('order-1', dto as never);
    expect(mockRedis.set).toHaveBeenCalledWith(
      'order-service:order:order-1',
      dto,
      CACHE_TTL.FIVE_MINUTES,
    );
  });

  it('invalidate deletes cache key', async () => {
    await repo.invalidate('order-1');
    expect(mockRedis.del).toHaveBeenCalledWith('order-service:order:order-1');
  });

  it('invalidateList deletes customer list', async () => {
    await repo.invalidateList('cust-1');
    expect(mockRedis.del).toHaveBeenCalledWith(
      'order-service:order:list:customer:cust-1',
    );
  });

  it('invalidateList without customerId clears all', async () => {
    await repo.invalidateList();
    expect(mockRedis.del).toHaveBeenCalledWith('order-service:order:list:all');
  });
});
