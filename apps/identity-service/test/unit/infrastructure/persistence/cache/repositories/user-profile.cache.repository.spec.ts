import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserProfileCacheRepository } from '@infrastructure/persistence/cache/repositories/user-profile.cache.repository.js';
import { makeMockRedisService } from '@fixtures/index.js';

describe('UserProfileCacheRepository', () => {
  let repo: UserProfileCacheRepository;
  let redis: ReturnType<typeof makeMockRedisService>;

  beforeEach(() => {
    redis = makeMockRedisService();
    repo = new UserProfileCacheRepository(redis as never);
  });

  it('get returns null on miss', async () => {
    redis.get.mockResolvedValueOnce(null);
    expect(await repo.get('u-1')).toBeNull();
  });

  it('set stores under identity:profile', async () => {
    await repo.set('u-1', { firstName: 'Test' });
    expect(redis.set).toHaveBeenCalledWith(
      'identity:profile:u-1',
      { firstName: 'Test' },
      expect.any(Number),
    );
  });

  it('set then get returns data', async () => {
    redis.get.mockResolvedValueOnce({ firstName: 'Test' } as never);
    expect(await repo.get('u-1')).not.toBeNull();
  });

  it('invalidate removes key', async () => {
    await repo.invalidate('u-1');
    expect(redis.del).toHaveBeenCalledWith('identity:profile:u-1');
  });
});
