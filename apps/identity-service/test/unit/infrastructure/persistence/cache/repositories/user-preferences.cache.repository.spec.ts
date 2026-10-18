import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserPreferencesCacheRepository } from '@infrastructure/persistence/cache/repositories/user-preferences.cache.repository.js';
import { makeMockRedisService } from '@fixtures/index.js';

describe('UserPreferencesCacheRepository', () => {
  let repo: UserPreferencesCacheRepository;
  let redis: ReturnType<typeof makeMockRedisService>;

  beforeEach(() => {
    redis = makeMockRedisService();
    repo = new UserPreferencesCacheRepository(redis as never);
  });

  it('get returns null on miss', async () => {
    redis.get.mockResolvedValueOnce(null);
    expect(await repo.get('u-1')).toBeNull();
  });

  it('set stores under identity:preferences', async () => {
    await repo.set('u-1', { emailNotifications: true });
    expect(redis.set).toHaveBeenCalledWith(
      'identity:preferences:u-1',
      { emailNotifications: true },
      expect.any(Number),
    );
  });

  it('set then get returns data', async () => {
    redis.get.mockResolvedValueOnce({ emailNotifications: true } as never);
    expect(await repo.get('u-1')).not.toBeNull();
  });

  it('invalidate removes key', async () => {
    await repo.invalidate('u-1');
    expect(redis.del).toHaveBeenCalledWith('identity:preferences:u-1');
  });
});
