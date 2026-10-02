import { jest } from '@jest/globals';
import { CartVoucherRedisRepository } from '../../../../../src/module/infrastructure/persistence/redis/repositories/cart-voucher.redis.repository.js';
import { CartIdVO } from '../../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import type { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
function makeRedis(): jest.Mocked<RedisService> {
  return { get: jest.fn(), set: jest.fn(async () => undefined), del: jest.fn(async () => undefined), exists: jest.fn(), isHealthy: jest.fn(async () => true) } as unknown as jest.Mocked<RedisService>;
}

describe('CartVoucherRedisRepository', () => {
  it('findByCartId returns null when missing', async () => {
    const redis = makeRedis();
    redis.get.mockResolvedValue(null);
    const repo = new CartVoucherRedisRepository(redis);
    expect(await repo.findByCartId(CartIdVO.create(UUID))).toBeNull();
  });
});
