/**
 * AuthCacheRepository unit tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthCacheRepository } from '@infrastructure/persistence/cache/repositories/auth.cache.repository.js';
import { makeMockRedisService } from '@fixtures/index.js';

describe('AuthCacheRepository', () => {
  let repo: AuthCacheRepository;
  let redis: ReturnType<typeof makeMockRedisService>;

  beforeEach(() => {
    redis = makeMockRedisService();
    repo = new AuthCacheRepository(redis as never);
  });

  it('getAuthIdByIdentifier returns null on miss', async () => {
    expect(await repo.getAuthIdByIdentifier('test@x.com')).toBeNull();
  });

  it('getAuthIdByIdentifier normalizes to lowercase', async () => {
    redis.__store.set('auth:identifier:test@x.com', JSON.stringify('auth-1'));
    expect(await repo.getAuthIdByIdentifier('TEST@X.COM')).toBe('auth-1');
  });

  it('setIdentifier stores lowercased key', async () => {
    await repo.setIdentifier('Test@X.com', 'auth-1');
    expect(redis.__store.has('auth:identifier:test@x.com')).toBe(true);
  });

  it('setIdentifier then getAuthIdByIdentifier returns value', async () => {
    await repo.setIdentifier('test@x.com', 'auth-1');
    expect(await repo.getAuthIdByIdentifier('test@x.com')).toBe('auth-1');
  });

  it('setIdentifier swallows Redis errors (logs warn)', async () => {
    redis.set.mockRejectedValueOnce(new Error('redis down'));
    await expect(repo.setIdentifier('test@x.com', 'auth-1')).resolves.toBeUndefined();
  });

  it('invalidateIdentifier deletes key', async () => {
    redis.__store.set('auth:identifier:test@x.com', JSON.stringify('auth-1'));
    await repo.invalidateIdentifier('test@x.com');
    expect(redis.__store.has('auth:identifier:test@x.com')).toBe(false);
  });
});
