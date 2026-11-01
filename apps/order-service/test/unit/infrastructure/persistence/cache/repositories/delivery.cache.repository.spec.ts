import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { DeliveryCacheRepository } from '@infrastructure/cache/repositories/delivery.cache.repository';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

describe('DeliveryCacheRepository', () => {
  let repo: DeliveryCacheRepository;
  let mockRedis: { get: jest.Mock; set: jest.Mock; del: jest.Mock };

  beforeEach(() => {
    mockRedis = { get: jest.fn(), set: jest.fn(), del: jest.fn() };
    repo = new DeliveryCacheRepository(mockRedis as never);
  });

  it('get returns DTO', async () => {
    const dto = { id: 'delivery-1' };
    mockRedis.get.mockResolvedValue(dto);
    expect(await repo.get('delivery-1')).toEqual(dto);
  });

  it('set caches with FIVE_MINUTES TTL', async () => {
    await repo.set('delivery-1', { id: 'delivery-1' } as never);
    expect(mockRedis.set).toHaveBeenCalledWith(
      'order-service:delivery:delivery-1',
      { id: 'delivery-1' },
      CACHE_TTL.FIVE_MINUTES,
    );
  });

  it('invalidate deletes key', async () => {
    await repo.invalidate('delivery-1');
    expect(mockRedis.del).toHaveBeenCalledWith('order-service:delivery:delivery-1');
  });
});
