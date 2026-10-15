/**
 * CartTaxRedisRepository — Unit Tests (stub)
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartTaxRedisRepository } from '@infrastructure/persistence/redis/repositories/cart-tax.redis.repository.js';
import {
  makeMockCartRedisService,
  type MockCartRedisService,
} from '@test-infra/index';

describe('CartTaxRedisRepository (stub)', () => {
  let redis: MockCartRedisService;
  let repo: CartTaxRedisRepository;

  beforeEach(() => {
    redis = makeMockCartRedisService();
    repo = new CartTaxRedisRepository(redis as never);
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

  it('findByCartId returns []', async () => {
    expect(await repo.findByCartId('any')).toEqual([]);
  });

  it('findInclusiveByCartId returns []', async () => {
    expect(await repo.findInclusiveByCartId('any')).toEqual([]);
  });

  it('findExclusiveByCartId returns []', async () => {
    expect(await repo.findExclusiveByCartId('any')).toEqual([]);
  });

  it('deleteByCartId returns 0', async () => {
    expect(await repo.deleteByCartId('any')).toBe(0);
  });

  it('recalculateByCartId returns 0', async () => {
    expect(await repo.recalculateByCartId('any', 100)).toBe(0);
  });

  it('delete is no-op', async () => {
    await expect(repo.delete('any')).resolves.toBeUndefined();
  });
});
