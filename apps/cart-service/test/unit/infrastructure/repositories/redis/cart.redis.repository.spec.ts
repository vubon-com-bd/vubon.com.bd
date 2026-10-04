import { jest } from '@jest/globals';

/**
 * CartRedisRepository — Unit Tests (mocked RedisService)
 */
import { CartRedisRepository } from '../../../../../src/module/infrastructure/persistence/redis/repositories/cart.redis.repository.js';
import { CartEntity } from '../../../../../src/module/domain/entities/cart.entity.js';
import { CartStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartSessionIdVO } from '../../../../../src/module/domain/value-objects/primitives/session-id.vo.js';
import type { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CART_STATUS, CART_TYPE } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeRedis(): jest.Mocked<RedisService> {
  return {
    get: jest.fn(),
    set: jest.fn(async () => undefined),
    del: jest.fn(async () => undefined),
    exists: jest.fn(),
    isHealthy: jest.fn(async () => true),
  } as unknown as jest.Mocked<RedisService>;
}

function makeCart(): CartEntity {
  return CartEntity.create({
    id: UUID,
    now: NOW,
    props: {
      type: CartTypeVO.create(CART_TYPE.USER),
      status: CartStatusVO.create(CART_STATUS.ACTIVE),
      userId: CartUserIdVO.create(USER),
      currency: 'BDT',
      expiresAt: FUTURE,
      lastActivityAt: NOW,
    },
  });
}

describe('CartRedisRepository', () => {
  let redis: jest.Mocked<RedisService>;
  let repo: CartRedisRepository;

  beforeEach(() => {
    redis = makeRedis();
    repo = new CartRedisRepository(redis);
  });

  describe('save()', () => {
    it('sets key with serialized cart', async () => {
      const cart = makeCart();
      await repo.save(cart);
      expect(redis.set).toHaveBeenCalled();
    });

    it('also caches by userId when present', async () => {
      await repo.save(makeCart());
      const calls = redis.set.mock.calls.filter((c) => String(c[0]).includes('user'));
      expect(calls.length).toBeGreaterThan(0);
    });
  });

  describe('findById()', () => {
    it('returns null when not found', async () => {
      redis.get.mockResolvedValue(null);
      const r = await repo.findById(UUID);
      expect(r).toBeNull();
    });

    it('reconstructs cart when data found', async () => {
      redis.get.mockResolvedValue({
        id: UUID,
        type: CART_TYPE.USER,
        status: CART_STATUS.ACTIVE,
        userId: USER,
        currency: 'BDT',
        expiresAt: FUTURE,
        lastActivityAt: NOW,
        createdAt: NOW,
        updatedAt: NOW,
      } as never);
      const r = await repo.findById(UUID);
      expect(r?.id).toBe(UUID);
    });
  });

  describe('exists()', () => {
    it('delegates to redis.exists', async () => {
      redis.exists.mockResolvedValue(true);
      expect(await repo.exists(UUID)).toBe(true);
    });
  });

  describe('delete()', () => {
    it('deletes key', async () => {
      await repo.delete(UUID);
      expect(redis.del).toHaveBeenCalled();
    });
  });

  describe('softDelete()', () => {
    it('deletes base key', async () => {
      await repo.softDelete(UUID, USER);
      expect(redis.del).toHaveBeenCalled();
    });
  });

  describe('findBySessionId()', () => {
    it('returns null when nothing found', async () => {
      redis.get.mockResolvedValue(null);
      const r = await repo.findBySessionId(CartSessionIdVO.create('session-abc-12345'));
      expect(r).toBeNull();
    });
  });

  describe('findByUserId()', () => {
    it('returns null when missing', async () => {
      redis.get.mockResolvedValue(null);
      const r = await repo.findByUserId(CartUserIdVO.create(USER));
      expect(r).toBeNull();
    });
  });
});
