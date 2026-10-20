import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CheckoutCacheRepository } from '@infrastructure/cache/repositories/checkout.cache.repository';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

describe('CheckoutCacheRepository', () => {
  let repo: CheckoutCacheRepository;
  let mockRedis: { get: jest.Mock; set: jest.Mock; del: jest.Mock };

  beforeEach(() => {
    mockRedis = { get: jest.fn(), set: jest.fn(), del: jest.fn() };
    repo = new CheckoutCacheRepository(mockRedis as never);
  });

  it('get returns DTO', async () => {
    const dto = { id: 'checkout-1' };
    mockRedis.get.mockResolvedValue(dto);
    const result = await repo.get('checkout-1');
    expect(result).toEqual(dto);
    expect(mockRedis.get).toHaveBeenCalledWith('order-service:checkout:checkout-1');
  });

  it('set caches with FIFTEEN_MINUTES TTL', async () => {
    const dto = { id: 'checkout-1' };
    await repo.set('checkout-1', dto as never);
    expect(mockRedis.set).toHaveBeenCalledWith(
      'order-service:checkout:checkout-1',
      dto,
      CACHE_TTL.FIFTEEN_MINUTES,
    );
  });

  it('invalidate deletes key', async () => {
    await repo.invalidate('checkout-1');
    expect(mockRedis.del).toHaveBeenCalledWith('order-service:checkout:checkout-1');
  });
});
