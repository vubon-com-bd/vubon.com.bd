import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserKycCacheRepository } from '@infrastructure/persistence/cache/repositories/user-kyc.cache.repository.js';
import { makeMockRedisService } from '@fixtures/index.js';

describe('UserKycCacheRepository', () => {
  let repo: UserKycCacheRepository;
  let redis: ReturnType<typeof makeMockRedisService>;

  beforeEach(() => {
    redis = makeMockRedisService();
    repo = new UserKycCacheRepository(redis as never);
  });

  it('get returns null on miss', async () => {
    redis.get.mockResolvedValueOnce(null);
    expect(await repo.get('u-1')).toBeNull();
  });

  it('set stores under identity:kyc', async () => {
    await repo.set('u-1', { status: 'pending' });
    expect(redis.set).toHaveBeenCalledWith(
      'identity:kyc:u-1',
      { status: 'pending' },
      expect.any(Number),
    );
  });

  it('set then get returns data', async () => {
    redis.get.mockResolvedValueOnce({ status: 'pending' } as never);
    expect(await repo.get('u-1')).not.toBeNull();
  });

  it('invalidate removes key', async () => {
    await repo.invalidate('u-1');
    expect(redis.del).toHaveBeenCalledWith('identity:kyc:u-1');
  });
});
