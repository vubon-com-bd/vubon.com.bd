import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NotificationCacheRepository } from '../../../../../src/module/infrastructure/persistence/cache/repositories/notification.cache.repository.js';
import { TemplateCacheRepository } from '../../../../../src/module/infrastructure/persistence/cache/repositories/template.cache.repository.js';
import { PreferenceCacheRepository } from '../../../../../src/module/infrastructure/persistence/cache/repositories/preference.cache.repository.js';
import { RateLimitCacheRepository } from '../../../../../src/module/infrastructure/persistence/cache/repositories/rate-limit.cache.repository.js';
import { IdempotencyCacheRepository } from '../../../../../src/module/infrastructure/persistence/cache/repositories/idempotency.cache.repository.js';
import { DeviceTokenCacheRepository } from '../../../../../src/module/infrastructure/persistence/cache/repositories/device-token.cache.repository.js';

function makeRedis() {
  return {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue(undefined),
    del: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
    isHealthy: jest.fn().mockResolvedValue(true),
    raw: {
      incr: jest.fn().mockResolvedValue(1),
      expire: jest.fn().mockResolvedValue(1),
      ttl: jest.fn().mockResolvedValue(3600),
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue('OK'),
      sadd: jest.fn().mockResolvedValue(1),
      srem: jest.fn().mockResolvedValue(1),
      smembers: jest.fn().mockResolvedValue([]),
    },
  };
}

describe('NotificationCacheRepository', () => {
  let redis: ReturnType<typeof makeRedis>;
  let r: NotificationCacheRepository;
  beforeEach(() => { redis = makeRedis(); r = new NotificationCacheRepository(redis as never); });

  it('getDetail/setDetail', async () => {
    await r.getDetail('n-1');
    await r.setDetail('n-1', { id: 'n-1' } as never);
    expect(redis.get).toHaveBeenCalled();
    expect(redis.set).toHaveBeenCalled();
  });
  it('invalidateDetail', async () => {
    await r.invalidateDetail('n-1');
    expect(redis.del).toHaveBeenCalled();
  });
  it('getList/setList/invalidateList', async () => {
    await r.getList('u', 1, 20);
    await r.setList('u', 1, 20, []);
    await r.invalidateList('u');
    expect(redis.get).toHaveBeenCalled();
    expect(redis.set).toHaveBeenCalled();
    expect(redis.del).toHaveBeenCalled();
  });
  it('unread count get/set/invalidate', async () => {
    await r.getUnreadCount('u');
    await r.setUnreadCount('u', 5);
    await r.invalidateUnread('u');
    expect(redis.get).toHaveBeenCalled();
  });
  it('invalidateAll', async () => {
    await r.invalidateAll('n-1', 'u');
    expect(redis.del).toHaveBeenCalled();
  });
});

describe('TemplateCacheRepository', () => {
  let redis: ReturnType<typeof makeRedis>;
  let r: TemplateCacheRepository;
  beforeEach(() => { redis = makeRedis(); r = new TemplateCacheRepository(redis as never); });

  it('getRender miss', async () => {
    const v = await r.getRender('t-1', 1, 'en', { x: 1 });
    expect(v).toBeNull();
  });
  it('setRender', async () => {
    await r.setRender('t-1', 1, 'en', {}, {
      body: 'x', missingVariables: [], resolvedVariables: [],
    });
    expect(redis.set).toHaveBeenCalled();
  });
  it('invalidateByTemplate', async () => {
    await r.invalidateByTemplate('t-1');
    expect(redis.del).toHaveBeenCalled();
  });
  it('recordVersion/getVersion', async () => {
    await r.recordVersion('t-1', 1);
    await r.getVersion('t-1');
    expect(redis.set).toHaveBeenCalled();
  });
});

describe('PreferenceCacheRepository', () => {
  let redis: ReturnType<typeof makeRedis>;
  let r: PreferenceCacheRepository;
  beforeEach(() => { redis = makeRedis(); r = new PreferenceCacheRepository(redis as never); });

  it('get/set/invalidate', async () => {
    await r.get('u');
    await r.set('u', { userId: 'u' } as never);
    await r.invalidate('u');
    expect(redis.get).toHaveBeenCalled();
  });
  it('invalidateMany', async () => {
    await r.invalidateMany(['u1', 'u2']);
    expect(redis.del).toHaveBeenCalled();
  });
});

describe('RateLimitCacheRepository', () => {
  let redis: ReturnType<typeof makeRedis>;
  let r: RateLimitCacheRepository;
  beforeEach(() => { redis = makeRedis(); r = new RateLimitCacheRepository(redis as never); });

  it('checkUserDaily allowed', async () => {
    const v = await r.checkUserDaily('u', 'email', 50);
    expect(v.allowed).toBe(true);
  });
  it('checkUserDaily exceeded', async () => {
    redis.raw.incr.mockResolvedValueOnce(100);
    const v = await r.checkUserDaily('u', 'email', 50);
    expect(v.allowed).toBe(false);
  });
  it('checkUserDaily first call sets expire', async () => {
    redis.raw.incr.mockResolvedValueOnce(1);
    await r.checkUserDaily('u', 'email', 50);
    expect(redis.raw.expire).toHaveBeenCalled();
  });
  it('checkGlobalPerSecond allowed', async () => {
    const v = await r.checkGlobalPerSecond('email', 100);
    expect(v.allowed).toBe(true);
  });
  it('checkGlobalPerSecond exceeded', async () => {
    redis.raw.incr.mockResolvedValueOnce(200);
    const v = await r.checkGlobalPerSecond('email', 100);
    expect(v.allowed).toBe(false);
  });
  it('checkGlobalPerSecond first call sets expire', async () => {
    redis.raw.incr.mockResolvedValueOnce(1);
    await r.checkGlobalPerSecond('email', 100);
    expect(redis.raw.expire).toHaveBeenCalled();
  });
  it('peekUserDaily', async () => {
    redis.raw.get.mockResolvedValueOnce('5');
    const v = await r.peekUserDaily('u', 'email');
    expect(v).toBe(5);
  });
  it('peekUserDaily null', async () => {
    const v = await r.peekUserDaily('u', 'email');
    expect(v).toBe(0);
  });
  it('resetUserDaily', async () => {
    await r.resetUserDaily('u', 'email');
    expect(redis.del).toHaveBeenCalled();
  });
});

describe('IdempotencyCacheRepository', () => {
  let redis: ReturnType<typeof makeRedis>;
  let r: IdempotencyCacheRepository;
  beforeEach(() => { redis = makeRedis(); r = new IdempotencyCacheRepository(redis as never); });

  it('get/set/delete/exists', async () => {
    await r.get('k');
    await r.set('k', 'n-1', 'email');
    await r.exists('k');
    await r.delete('k');
    expect(redis.get).toHaveBeenCalled();
  });
  it('tryLock success', async () => {
    const v = await r.tryLock('k');
    expect(v).toBe(true);
  });
  it('tryLock fail', async () => {
    redis.raw.set.mockResolvedValueOnce(null);
    const v = await r.tryLock('k');
    expect(v).toBe(false);
  });
  it('releaseLock', async () => {
    await r.releaseLock('k');
    expect(redis.del).toHaveBeenCalled();
  });
});

describe('DeviceTokenCacheRepository', () => {
  let redis: ReturnType<typeof makeRedis>;
  let r: DeviceTokenCacheRepository;
  beforeEach(() => { redis = makeRedis(); r = new DeviceTokenCacheRepository(redis as never); });

  it('getUserIdByToken', async () => {
    await r.getUserIdByToken('tk');
    expect(redis.get).toHaveBeenCalled();
  });
  it('setTokenUser', async () => {
    await r.setTokenUser('tk', 'u');
    expect(redis.set).toHaveBeenCalled();
  });
  it('removeToken', async () => {
    await r.removeToken('tk');
    expect(redis.del).toHaveBeenCalled();
  });
  it('addUserToken', async () => {
    await r.addUserToken('u', 'tk');
    expect(redis.raw.sadd).toHaveBeenCalled();
  });
  it('removeUserToken', async () => {
    await r.removeUserToken('u', 'tk');
    expect(redis.raw.srem).toHaveBeenCalled();
  });
  it('getUserTokens', async () => {
    await r.getUserTokens('u');
    expect(redis.raw.smembers).toHaveBeenCalled();
  });
  it('clearUserTokens', async () => {
    await r.clearUserTokens('u');
    expect(redis.del).toHaveBeenCalled();
  });
  it('removeInvalidTokens', async () => {
    await r.removeInvalidTokens(['a', 'b']);
    expect(redis.del).toHaveBeenCalled();
  });
});
