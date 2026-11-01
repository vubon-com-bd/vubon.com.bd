import { describe, it, expect, beforeEach } from '@jest/globals';
import { IdempotencyCacheRepository } from '@infrastructure/persistence/cache/repositories/idempotency.cache.repository.js';
import { makeMockRedisService } from '@fixtures/index.js';

describe('IdempotencyCacheRepository', () => {
  let repo: IdempotencyCacheRepository;
  let redis: ReturnType<typeof makeMockRedisService>;

  beforeEach(() => {
    redis = makeMockRedisService();
    repo = new IdempotencyCacheRepository(redis as never);
  });

  it('get returns null on miss', async () => {
    redis.get.mockResolvedValueOnce(null);
    expect(await repo.get('key-1')).toBeNull();
  });

  it('set stores record under auth:idempotency', async () => {
    await repo.set('key-1', 'result-1');
    expect(redis.set).toHaveBeenCalledWith(
      'auth:idempotency:key-1',
      expect.objectContaining({ key: 'key-1', result: 'result-1' }),
      expect.any(Number),
    );
  });

  it('delete removes record', async () => {
    await repo.delete('key-1');
    expect(redis.del).toHaveBeenCalledWith('auth:idempotency:key-1');
  });

  it('tryLock succeeds first time', async () => {
    redis.exists.mockResolvedValueOnce(false);
    expect(await repo.tryLock('key-1')).toBe(true);
  });

  it('tryLock fails when already locked', async () => {
    redis.exists.mockResolvedValueOnce(true);
    expect(await repo.tryLock('key-1')).toBe(false);
  });

  it('releaseLock removes lock key', async () => {
    await repo.releaseLock('key-1');
    expect(redis.del).toHaveBeenCalled();
  });
});
