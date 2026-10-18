import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserCacheRepository } from '@infrastructure/persistence/cache/repositories/user.cache.repository.js';
import { makeMockRedisService } from '@fixtures/index.js';

describe('UserCacheRepository', () => {
  let repo: UserCacheRepository;
  let redis: ReturnType<typeof makeMockRedisService>;

  beforeEach(() => {
    redis = makeMockRedisService();
    repo = new UserCacheRepository(redis as never);
  });

  it('get returns null on miss', async () => {
    redis.get.mockResolvedValueOnce(null);
    expect(await repo.get('u-1')).toBeNull();
  });

  it('set stores user data under identity:user', async () => {
    await repo.set('u-1', { userId: 'u-1', email: 'test@x.com', status: 'active' });
    expect(redis.set).toHaveBeenCalledWith(
      'identity:user:u-1',
      { userId: 'u-1', email: 'test@x.com', status: 'active' },
      expect.any(Number),
    );
  });

  it('set then get returns data', async () => {
    redis.get.mockResolvedValueOnce({ userId: 'u-1', email: 'test@x.com', status: 'active' } as never);
    const result = await repo.get('u-1');
    expect(result).not.toBeNull();
    expect(result!.email).toBe('test@x.com');
  });

  it('invalidate removes key', async () => {
    await repo.invalidate('u-1');
    expect(redis.del).toHaveBeenCalledWith('identity:user:u-1');
  });

  it('exists delegates to redis.exists', async () => {
    await repo.exists('u-1');
    expect(redis.exists).toHaveBeenCalledWith('identity:user:u-1');
  });
});
