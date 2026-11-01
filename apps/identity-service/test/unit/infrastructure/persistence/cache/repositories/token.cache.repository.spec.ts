/**
 * TokenCacheRepository unit tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { TokenCacheRepository } from '@infrastructure/persistence/cache/repositories/token.cache.repository.js';
import { makeMockRedisService } from '@fixtures/index.js';

describe('TokenCacheRepository', () => {
  let repo: TokenCacheRepository;
  let redis: ReturnType<typeof makeMockRedisService>;

  beforeEach(() => {
    redis = makeMockRedisService();
    repo = new TokenCacheRepository(redis as never);
  });

  it('get returns null on miss', async () => {
    redis.get.mockResolvedValueOnce(null);
    expect(await repo.get('jti-1')).toBeNull();
  });

  it('get returns cached data', async () => {
    redis.get.mockResolvedValueOnce({ jti: 'jti-1', userId: 'u-1', expiresAt: 999 } as never);
    const result = await repo.get('jti-1');
    expect(result).not.toBeNull();
    expect(result!.jti).toBe('jti-1');
  });

  it('set serializes token marker', async () => {
    const entity = {
      userId: { value: 'u-1' },
      expiry: { expiresAt: 1234567890 },
    } as never;
    await repo.set('jti-1', entity);
    expect(redis.set).toHaveBeenCalledWith(
      'auth:token:jti-1',
      expect.objectContaining({
        jti: 'jti-1',
        userId: 'u-1',
        expiresAt: 1234567890,
      }),
      expect.any(Number),
    );
  });

  it('set swallows errors on bad entity', async () => {
    await expect(repo.set('jti-1', {} as never)).resolves.toBeUndefined();
  });

  it('markRevoked stores revocation', async () => {
    await repo.markRevoked('jti-1', 3600);
    expect(redis.set).toHaveBeenCalledWith(
      'auth:token:revoked:jti-1',
      expect.anything(),
      3600,
    );
  });

  it('isRevoked delegates to redis.exists', async () => {
    await repo.isRevoked('jti-1');
    expect(redis.exists).toHaveBeenCalledWith('auth:token:revoked:jti-1');
  });

  it('invalidate deletes key', async () => {
    await repo.invalidate('jti-1');
    expect(redis.del).toHaveBeenCalledWith('auth:token:jti-1');
  });
});
