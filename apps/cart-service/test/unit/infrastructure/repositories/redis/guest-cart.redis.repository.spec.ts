import { jest } from '@jest/globals';

import { GuestCartRedisRepository } from '../../../../../src/module/infrastructure/persistence/redis/repositories/guest-cart.redis.repository.js';
import { GuestCartEntity } from '../../../../../src/module/domain/entities/guest-cart.entity.js';
import { GuestCartStatusVO } from '../../../../../src/module/domain/value-objects/primitives/guest-cart-status.vo.js';
import { GuestTokenVO } from '../../../../../src/module/domain/value-objects/primitives/guest-token.vo.js';
import type { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { GUEST_CART_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const TOKEN = 'a'.repeat(32);
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeRedis(): jest.Mocked<RedisService> {
  return {
    get: jest.fn(), set: jest.fn(async () => undefined),
    del: jest.fn(async () => undefined), exists: jest.fn(),
    isHealthy: jest.fn(async () => true),
  } as unknown as jest.Mocked<RedisService>;
}

function makeGuest() {
  return GuestCartEntity.create({
    id: UUID, now: NOW,
    props: {
      token: GuestTokenVO.create(TOKEN),
      status: GuestCartStatusVO.create(GUEST_CART_STATUS.ACTIVE),
      itemCount: 2, expiresAt: FUTURE,
    },
  });
}

describe('GuestCartRedisRepository', () => {
  it('save persists guest cart', async () => {
    const redis = makeRedis();
    const repo = new GuestCartRedisRepository(redis);
    await repo.save(makeGuest());
    expect(redis.set).toHaveBeenCalled();
  });

  it('findByToken returns null when missing', async () => {
    const redis = makeRedis();
    redis.get.mockResolvedValue(null);
    const repo = new GuestCartRedisRepository(redis);
    const r = await repo.findByToken(GuestTokenVO.create(TOKEN));
    expect(r).toBeNull();
  });

  it('exists delegates to redis', async () => {
    const redis = makeRedis();
    redis.exists.mockResolvedValue(true);
    const repo = new GuestCartRedisRepository(redis);
    expect(await repo.exists(UUID)).toBe(true);
  });
});
