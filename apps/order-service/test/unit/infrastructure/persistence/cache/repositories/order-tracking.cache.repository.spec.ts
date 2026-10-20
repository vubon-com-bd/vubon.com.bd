import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderTrackingCacheRepository } from '@infrastructure/cache/repositories/order-tracking.cache.repository';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

describe('OrderTrackingCacheRepository', () => {
  let repo: OrderTrackingCacheRepository;
  let mockRedis: { get: jest.Mock; set: jest.Mock; del: jest.Mock };

  beforeEach(() => {
    mockRedis = { get: jest.fn(), set: jest.fn(), del: jest.fn() };
    repo = new OrderTrackingCacheRepository(mockRedis as never);
  });

  it('getEntry returns entry', async () => {
    const dto = { id: 'tracking-1' };
    mockRedis.get.mockResolvedValue(dto);
    expect(await repo.getEntry('tracking-1')).toEqual(dto);
    expect(mockRedis.get).toHaveBeenCalledWith(
      'order-service:tracking:entry:tracking-1',
    );
  });

  it('setEntry caches with ONE_MINUTE TTL', async () => {
    await repo.setEntry('tracking-1', { id: 'tracking-1' } as never);
    expect(mockRedis.set).toHaveBeenCalledWith(
      'order-service:tracking:entry:tracking-1',
      { id: 'tracking-1' },
      CACHE_TTL.ONE_MINUTE,
    );
  });

  it('getSummary returns summary', async () => {
    const dto = { orderId: 'order-1' };
    mockRedis.get.mockResolvedValue(dto);
    expect(await repo.getSummary('order-1')).toEqual(dto);
    expect(mockRedis.get).toHaveBeenCalledWith(
      'order-service:tracking:summary:order-1',
    );
  });

  it('setSummary caches with FIVE_MINUTES TTL', async () => {
    await repo.setSummary('order-1', { orderId: 'order-1' } as never);
    expect(mockRedis.set).toHaveBeenCalledWith(
      'order-service:tracking:summary:order-1',
      { orderId: 'order-1' },
      CACHE_TTL.FIVE_MINUTES,
    );
  });

  it('invalidate deletes summary key', async () => {
    await repo.invalidate('order-1');
    expect(mockRedis.del).toHaveBeenCalledWith(
      'order-service:tracking:summary:order-1',
    );
  });
});
