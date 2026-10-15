/**
 * CartVoucherRedisRepository — Unit Tests (stub)
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartVoucherRedisRepository } from '@infrastructure/persistence/redis/repositories/cart-voucher.redis.repository.js';
import {
  makeMockCartRedisService,
  type MockCartRedisService,
} from '@test-infra/index';

describe('CartVoucherRedisRepository (stub)', () => {
  let redis: MockCartRedisService;
  let repo: CartVoucherRedisRepository;

  beforeEach(() => {
    redis = makeMockCartRedisService();
    repo = new CartVoucherRedisRepository(redis as never);
  });

  it('findById should return null', async () => {
    expect(await repo.findById('any')).toBeNull();
  });

  it('findAll should return []', async () => {
    expect(await repo.findAll()).toEqual([]);
  });

  it('exists should return false', async () => {
    expect(await repo.exists('any')).toBe(false);
  });

  it('findByCartId should return []', async () => {
    expect(await repo.findByCartId('any')).toEqual([]);
  });

  it('findUsableByCartId should return null', async () => {
    expect(await repo.findUsableByCartId('any')).toBeNull();
  });

  it('existsByCartAndCode should return false', async () => {
    expect(await repo.existsByCartAndCode('any', 'code')).toBe(false);
  });

  it('findByCartAndCode should return null', async () => {
    expect(await repo.findByCartAndCode('any', 'code')).toBeNull();
  });

  it('findByCode should return []', async () => {
    expect(await repo.findByCode('code')).toEqual([]);
  });

  it('findByStatus should return []', async () => {
    expect(await repo.findByStatus('active')).toEqual([]);
  });

  it('findExpired should return []', async () => {
    expect(await repo.findExpired(new Date())).toEqual([]);
  });

  it('deleteByCartId should return 0', async () => {
    expect(await repo.deleteByCartId('any')).toBe(0);
  });

  it('bulkUpdateStatus should return 0', async () => {
    expect(await repo.bulkUpdateStatus([], 'active')).toBe(0);
  });

  it('delete should be a no-op', async () => {
    await expect(repo.delete('any')).resolves.toBeUndefined();
  });

  it('softDelete should be a no-op', async () => {
    await expect(repo.softDelete('any')).resolves.toBeUndefined();
  });

  it('restore should be a no-op', async () => {
    await expect(repo.restore('any')).resolves.toBeUndefined();
  });
});
