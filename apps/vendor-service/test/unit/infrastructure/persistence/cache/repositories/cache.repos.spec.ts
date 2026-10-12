/**
 * Cache repositories — bulk tests with mocked Redis
 */
import { jest } from '@jest/globals';
import { VendorCacheRepository } from '../../../../../../src/module/infrastructure/persistence/cache/repositories/vendor.cache.repository.js';
import { VendorSlugCacheRepository } from '../../../../../../src/module/infrastructure/persistence/cache/repositories/vendor-slug.cache.repository.js';
import { VendorStatsCacheRepository } from '../../../../../../src/module/infrastructure/persistence/cache/repositories/vendor-stats.cache.repository.js';
import { VendorSearchCacheRepository } from '../../../../../../src/module/infrastructure/persistence/cache/repositories/vendor-search.cache.repository.js';
import type { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeRedis(): jest.Mocked<RedisService> {
  return {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue(undefined),
    del: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
    isHealthy: jest.fn().mockResolvedValue(true),
  } as unknown as jest.Mocked<RedisService>;
}

describe('VendorCacheRepository', () => {
  let redis: jest.Mocked<RedisService>; let repo: VendorCacheRepository;
  beforeEach(() => { redis = makeRedis(); repo = new VendorCacheRepository(redis); });

  it('getSnapshot delegates redis.get', async () => {
    await repo.getSnapshot(UUID);
    expect(redis.get).toHaveBeenCalled();
  });
  it('setSnapshot calls redis.set twice', async () => {
    await repo.setSnapshot({ id: UUID, slug: 'acme' } as never);
    expect(redis.set).toHaveBeenCalledTimes(2);
  });
  it('invalidate deletes snapshot + slug', async () => {
    await repo.invalidate(UUID, 'acme');
    expect(redis.del).toHaveBeenCalledTimes(2);
  });
  it('invalidate without slug deletes only snapshot', async () => {
    await repo.invalidate(UUID);
    expect(redis.del).toHaveBeenCalledTimes(1);
  });
  it('exists delegates redis.exists', async () => {
    await repo.exists(UUID);
    expect(redis.exists).toHaveBeenCalled();
  });
  it('isHealthy delegates', async () => {
    expect(await repo.isHealthy()).toBe(true);
  });
});

describe('VendorSlugCacheRepository', () => {
  let redis: jest.Mocked<RedisService>; let repo: VendorSlugCacheRepository;
  beforeEach(() => { redis = makeRedis(); repo = new VendorSlugCacheRepository(redis); });

  it('getAvailability delegates', async () => {
    await repo.getAvailability('acme');
    expect(redis.get).toHaveBeenCalled();
  });
  it('setAvailability writes with checkedAt', async () => {
    await repo.setAvailability({ slug: 'acme', available: true });
    expect(redis.set).toHaveBeenCalled();
  });
  it('invalidateAvailability deletes', async () => {
    await repo.invalidateAvailability('acme');
    expect(redis.del).toHaveBeenCalled();
  });
  it('getVendorId delegates', async () => {
    await repo.getVendorId('acme');
    expect(redis.get).toHaveBeenCalled();
  });
  it('setVendorId writes twice (mapping + availability)', async () => {
    await repo.setVendorId('acme', UUID);
    expect(redis.set).toHaveBeenCalledTimes(2);
  });
  it('invalidate deletes both keys', async () => {
    await repo.invalidate('acme');
    expect(redis.del).toHaveBeenCalledTimes(2);
  });
});

describe('VendorStatsCacheRepository', () => {
  let redis: jest.Mocked<RedisService>; let repo: VendorStatsCacheRepository;
  beforeEach(() => { redis = makeRedis(); repo = new VendorStatsCacheRepository(redis); });

  it('getOverview delegates', async () => {
    await repo.getOverview(UUID);
    expect(redis.get).toHaveBeenCalled();
  });
  it('setOverview writes', async () => {
    await repo.setOverview({ vendorId: UUID } as never);
    expect(redis.set).toHaveBeenCalled();
  });
  it('invalidateOverview deletes', async () => {
    await repo.invalidateOverview(UUID);
    expect(redis.del).toHaveBeenCalled();
  });
  it('getPeriod delegates', async () => {
    await repo.getPeriod(UUID, '2026-01-01', '2026-01-31');
    expect(redis.get).toHaveBeenCalled();
  });
  it('setPeriod writes', async () => {
    await repo.setPeriod({
      vendorId: UUID, periodStart: '2026-01-01', periodEnd: '2026-01-31',
      currency: 'BDT', totalOrders: 0, totalRevenue: 0,
      totalCommission: 0, totalPayout: 0, totalRefunds: 0,
    });
    expect(redis.set).toHaveBeenCalled();
  });
  it('invalidateAll deletes overview', async () => {
    await repo.invalidateAll(UUID);
    expect(redis.del).toHaveBeenCalled();
  });
});

describe('VendorSearchCacheRepository', () => {
  let redis: jest.Mocked<RedisService>; let repo: VendorSearchCacheRepository;
  beforeEach(() => { redis = makeRedis(); repo = new VendorSearchCacheRepository(redis); });

  it('getSearchResult delegates', async () => {
    await repo.getSearchResult('hash');
    expect(redis.get).toHaveBeenCalled();
  });
  it('setSearchResult writes', async () => {
    await repo.setSearchResult('hash', { items: [], total: 0, page: 1, limit: 20, totalPages: 0 });
    expect(redis.set).toHaveBeenCalled();
  });
  it('invalidateSearch deletes', async () => {
    await repo.invalidateSearch('hash');
    expect(redis.del).toHaveBeenCalled();
  });
  it('getTopRated delegates', async () => {
    await repo.getTopRated(10);
    expect(redis.get).toHaveBeenCalled();
  });
  it('setTopRated writes', async () => {
    await repo.setTopRated(10, []);
    expect(redis.set).toHaveBeenCalled();
  });
  it('invalidateTopRated deletes 4 limits', async () => {
    await repo.invalidateTopRated();
    expect(redis.del).toHaveBeenCalledTimes(4);
  });
  it('getFeatured delegates', async () => {
    await repo.getFeatured(10);
    expect(redis.get).toHaveBeenCalled();
  });
  it('setFeatured writes', async () => {
    await repo.setFeatured(10, []);
    expect(redis.set).toHaveBeenCalled();
  });
  it('invalidateFeatured deletes 4 limits', async () => {
    await repo.invalidateFeatured();
    expect(redis.del).toHaveBeenCalledTimes(4);
  });
});
