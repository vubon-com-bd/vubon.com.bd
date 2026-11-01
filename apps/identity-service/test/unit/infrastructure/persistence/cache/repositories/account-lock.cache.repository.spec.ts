import { describe, it, expect, beforeEach } from '@jest/globals';
import { AccountLockCacheRepository } from '@infrastructure/persistence/cache/repositories/account-lock.cache.repository.js';
import { makeMockRedisService } from '@fixtures/index.js';

describe('AccountLockCacheRepository', () => {
  let repo: AccountLockCacheRepository;
  let redis: ReturnType<typeof makeMockRedisService>;

  beforeEach(() => {
    redis = makeMockRedisService();
    repo = new AccountLockCacheRepository(redis as never);
  });

  it('get returns null on miss', async () => {
    redis.get.mockResolvedValueOnce(null);
    expect(await repo.get('u-1')).toBeNull();
  });

  it('set stores entry under auth:lock', async () => {
    const entry = {
      userId: 'u-1',
      reason: 'test',
      lockedUntil: new Date(Date.now() + 3600000).toISOString(),
    } as never;
    await repo.set(entry);
    expect(redis.set).toHaveBeenCalledWith(
      'auth:lock:u-1',
      entry,
      expect.any(Number),
    );
  });

  it('isLocked delegates to redis.exists', async () => {
    await repo.isLocked('u-1');
    expect(redis.exists).toHaveBeenCalledWith('auth:lock:u-1');
  });

  it('clear removes key', async () => {
    await repo.clear('u-1');
    expect(redis.del).toHaveBeenCalledWith('auth:lock:u-1');
  });
});
