/**
 * E2E — Cache Repositories (real Redis)
 * @module identity-service/test/e2e/infrastructure
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { UserCacheRepository } from '@infrastructure/persistence/cache/repositories/user.cache.repository.js';
import { SessionCacheRepository } from '@infrastructure/persistence/cache/repositories/session.cache.repository.js';
import { TokenCacheRepository } from '@infrastructure/persistence/cache/repositories/token.cache.repository.js';
import { IdempotencyCacheRepository } from '@infrastructure/persistence/cache/repositories/idempotency.cache.repository.js';

describe('E2E — Cache Repositories (real Redis)', () => {
  let redis: RedisService;
  let userCache: UserCacheRepository;
  let sessionCache: SessionCacheRepository;
  let tokenCache: TokenCacheRepository;
  let idemCache: IdempotencyCacheRepository;

  beforeAll(() => {
    redis = new RedisService();
    redis.onModuleInit();
    userCache = new UserCacheRepository(redis);
    sessionCache = new SessionCacheRepository(redis);
    tokenCache = new TokenCacheRepository(redis);
    idemCache = new IdempotencyCacheRepository(redis);
  });

  afterAll(async () => {
    try { await redis.onModuleDestroy(); } catch { /* ignore */ }
  });

  it('UserCacheRepository — set + get round-trip', async () => {
    const key = `e2e-user-${Date.now()}`;
    await userCache.set(key, {
      userId: key,
      email: 'e2e@vubon.test',
      status: 'active',
    });
    const got = await userCache.get(key);
    expect(got).not.toBeNull();
    expect(got!.email).toBe('e2e@vubon.test');

    await userCache.invalidate(key);
    const after = await userCache.get(key);
    expect(after).toBeNull();
  });

  it('UserCacheRepository — exists', async () => {
    const key = `e2e-user-ex-${Date.now()}`;
    await userCache.set(key, { userId: key, email: 'a@b.c', status: 'active' });
    expect(await userCache.exists(key)).toBe(true);
    await userCache.invalidate(key);
    expect(await userCache.exists(key)).toBe(false);
  });

  it('SessionCacheRepository — set + get', async () => {
    const sid = `e2e-sess-${Date.now()}`;
    const fakeEntity = {
      userId: { value: 'u-e2e' },
      status: { value: 'active' },
      expiry: { absoluteExpiresAt: Math.floor(Date.now() / 1000) + 3600 },
    } as never;
    await sessionCache.set(sid, fakeEntity);
    expect(await sessionCache.exists(sid)).toBe(true);
    await sessionCache.invalidate(sid);
  });

  it('TokenCacheRepository — markRevoked + isRevoked', async () => {
    const jti = `e2e-jti-${Date.now()}`;
    expect(await tokenCache.isRevoked(jti)).toBe(false);
    await tokenCache.markRevoked(jti, 60);
    expect(await tokenCache.isRevoked(jti)).toBe(true);
  });

  it('IdempotencyCacheRepository — tryLock + releaseLock', async () => {
    const key = `e2e-idem-${Date.now()}`;
    expect(await idemCache.tryLock(key)).toBe(true);
    expect(await idemCache.tryLock(key)).toBe(false);
    await idemCache.releaseLock(key);
    expect(await idemCache.tryLock(key)).toBe(true);
    await idemCache.releaseLock(key);
  });

  it('IdempotencyCacheRepository — set/get/delete record', async () => {
    const key = `e2e-idem-rec-${Date.now()}`;
    await idemCache.set(key, 'result-xyz');
    const got = await idemCache.get(key);
    expect(got).not.toBeNull();
    await idemCache.delete(key);
    expect(await idemCache.get(key)).toBeNull();
  });
});
