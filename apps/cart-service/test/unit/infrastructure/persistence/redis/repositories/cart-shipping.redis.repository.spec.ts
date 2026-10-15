/**
 * CartShippingRedisRepository — Unit Tests (stub)
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartShippingRedisRepository } from '@infrastructure/persistence/redis/repositories/cart-shipping.redis.repository.js';
import {
  makeMockCartRedisService,
  type MockCartRedisService,
} from '@test-infra/index';

describe('CartShippingRedisRepository (stub)', () => {
  let redis: MockCartRedisService;
  let repo: CartShippingRedisRepository;

  beforeEach(() => {
    redis = makeMockCartRedisService();
    repo = new CartShippingRedisRepository(redis as never);
  });

  it('findById returns null', async () => {
    expect(await repo.findById('any')).toBeNull();
  });

  it('findAll returns []', async () => {
    expect(await repo.findAll()).toEqual([]);
  });

  it('exists returns false', async () => {
    expect(await repo.exists('any')).toBe(false);
  });

  it('findByCartId returns null', async () => {
    expect(await repo.findByCartId('any')).toBeNull();
  });

  it('findByMethod returns []', async () => {
    expect(await repo.findByMethod('standard')).toEqual([]);
  });

  it('findWithoutAddress returns []', async () => {
    expect(await repo.findWithoutAddress()).toEqual([]);
  });

  it('findWithAddress returns []', async () => {
    expect(await repo.findWithAddress()).toEqual([]);
  });

  it('deleteByCartId returns 0', async () => {
    expect(await repo.deleteByCartId('any')).toBe(0);
  });
});
