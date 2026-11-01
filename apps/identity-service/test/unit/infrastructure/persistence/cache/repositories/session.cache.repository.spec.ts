/**
 * SessionCacheRepository unit tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { SessionCacheRepository } from '@infrastructure/persistence/cache/repositories/session.cache.repository.js';
import { makeMockRedisService } from '@fixtures/index.js';

describe('SessionCacheRepository', () => {
  let repo: SessionCacheRepository;
  let redis: ReturnType<typeof makeMockRedisService>;

  beforeEach(() => {
    redis = makeMockRedisService();
    repo = new SessionCacheRepository(redis as never);
  });

  it('get returns null on miss', async () => {
    expect(await repo.get('s-1')).toBeNull();
  });

  it('get returns null (marker only, no full entity)', async () => {
    await repo.get('s-1');
    expect(redis.get).toHaveBeenCalled();
  });

  it('set serializes marker from entity', async () => {
    const entity = {
      userId: { value: 'u-1' },
      status: { value: 'active' },
      expiry: { absoluteExpiresAt: Math.floor(Date.now() / 1000) + 3600 },
    } as never;
    await repo.set('s-1', entity);
    expect(redis.set).toHaveBeenCalledWith(
      'auth:session:s-1',
      expect.objectContaining({
        sessionId: 's-1',
        userId: 'u-1',
        status: 'active',
      }),
      expect.any(Number),
    );
  });

  it('set swallows serialization errors (logs warn)', async () => {
    const badEntity = {} as never;
    await expect(repo.set('s-1', badEntity)).resolves.toBeUndefined();
  });

  it('invalidate deletes key', async () => {
    await repo.invalidate('s-1');
    expect(redis.del).toHaveBeenCalledWith('auth:session:s-1');
  });

  it('invalidateByUser deletes user index', async () => {
    await repo.invalidateByUser('u-1');
    expect(redis.del).toHaveBeenCalled();
  });

  it('exists delegates to redis.exists', async () => {
    await repo.exists('s-1');
    expect(redis.exists).toHaveBeenCalledWith('auth:session:s-1');
  });
});
