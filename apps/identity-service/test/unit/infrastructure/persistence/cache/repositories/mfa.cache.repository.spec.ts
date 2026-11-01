/**
 * MfaCacheRepository unit tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { MfaCacheRepository } from '@infrastructure/persistence/cache/repositories/mfa.cache.repository.js';
import { makeMockRedisService } from '@fixtures/index.js';

describe('MfaCacheRepository', () => {
  let repo: MfaCacheRepository;
  let redis: ReturnType<typeof makeMockRedisService>;

  beforeEach(() => {
    redis = makeMockRedisService();
    repo = new MfaCacheRepository(redis as never);
  });

  it('getChallenge returns null on miss', async () => {
    redis.get.mockResolvedValueOnce(null);
    expect(await repo.getChallenge('c-1')).toBeNull();
  });

  it('setChallenge stores state under auth:mfa:challenge', async () => {
    const state = { challengeId: 'c-1', authId: 'u-1', attempts: 0 } as never;
    await repo.setChallenge(state);
    expect(redis.set).toHaveBeenCalledWith(
      'auth:mfa:challenge:c-1',
      state,
      expect.any(Number),
    );
  });

  it('getChallenge returns state after set', async () => {
    const state = { challengeId: 'c-1', authId: 'u-1', attempts: 0 } as never;
    redis.get.mockResolvedValueOnce(state);
    expect(await repo.getChallenge('c-1')).not.toBeNull();
  });

  it('incrementAttempts returns incremented value', async () => {
    redis.get.mockResolvedValueOnce(0 as never);
    const count = await repo.incrementAttempts('c-1');
    expect(count).toBeGreaterThanOrEqual(1);
  });

  it('getAttempts returns count', async () => {
    redis.get.mockResolvedValueOnce(3 as never);
    expect(await repo.getAttempts('c-1')).toBe(3);
  });

  it('getAttempts returns 0 on miss', async () => {
    redis.get.mockResolvedValueOnce(null);
    expect(await repo.getAttempts('c-1')).toBe(0);
  });

  it('clearChallenge deletes challenge key', async () => {
    await repo.clearChallenge('c-1');
    expect(redis.del).toHaveBeenCalledWith('auth:mfa:challenge:c-1');
  });
});
