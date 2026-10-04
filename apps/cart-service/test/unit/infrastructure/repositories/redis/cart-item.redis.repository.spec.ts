import { jest } from '@jest/globals';

import { CartItemRedisRepository } from '../../../../../src/module/infrastructure/persistence/redis/repositories/cart-item.redis.repository.js';
import { CartItemEntity } from '../../../../../src/module/domain/entities/cart-item.entity.js';
import { CartItemQuantityVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import type { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00Z';

function makeRedis(): jest.Mocked<RedisService> {
  return {
    get: jest.fn(), set: jest.fn(async () => undefined),
    del: jest.fn(async () => undefined), exists: jest.fn(),
    isHealthy: jest.fn(async () => true),
  } as unknown as jest.Mocked<RedisService>;
}

function makeItem() {
  return CartItemEntity.create({
    id: 'i1', now: NOW,
    props: {
      productId: CartProductIdVO.create(UUID),
      sku: 'SKU', name: 'Item', unitPrice: 100,
      quantity: CartItemQuantityVO.create(2),
      discountAmount: 0,
      status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
      isAvailable: true, currency: 'BDT',
    },
  });
}

describe('CartItemRedisRepository', () => {
  it('save persists item', async () => {
    const redis = makeRedis();
    const repo = new CartItemRedisRepository(redis);
    await repo.save(makeItem());
    expect(redis.set).toHaveBeenCalled();
  });

  it('exists delegates to redis', async () => {
    const redis = makeRedis();
    redis.exists.mockResolvedValue(true);
    const repo = new CartItemRedisRepository(redis);
    // id format requires cartId:itemId
    const r = await repo.exists(`${UUID}:i1`);
    expect(r).toBe(true);
  });

  it('findById returns null when not found', async () => {
    const redis = makeRedis();
    redis.get.mockResolvedValue(null);
    const repo = new CartItemRedisRepository(redis);
    const r = await repo.findById(`${UUID}:i1`);
    expect(r).toBeNull();
  });
});
