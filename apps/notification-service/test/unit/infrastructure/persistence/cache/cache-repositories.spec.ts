/**
 * Cache Repositories — Unit Tests
 * @module notification-service/test/unit/infrastructure/persistence/cache
 *
 * Covers: 5 cache repositories (notification, template, preference, device, idempotency)
 * Target: 90% statements, 80% branches, 90% functions, 90% lines
 */
import { NotificationCacheRepository } from '@infrastructure/persistence/cache/repositories/notification.cache.repository.js';
import { TemplateCacheRepository } from '@infrastructure/persistence/cache/repositories/template.cache.repository.js';
import { PreferenceCacheRepository } from '@infrastructure/persistence/cache/repositories/preference.cache.repository.js';
import { DeviceCacheRepository } from '@infrastructure/persistence/cache/repositories/device.cache.repository.js';
import { IdempotencyCacheRepository } from '@infrastructure/persistence/cache/repositories/idempotency.cache.repository.js';

import { TEST_IDS, makeRedisMock } from '@test-infra/index.js';

// ═══════════════════════════════════════════════════════════
// 1. NotificationCacheRepository
// ═══════════════════════════════════════════════════════════
describe('NotificationCacheRepository', () => {
  let repo: NotificationCacheRepository;
  let redis: ReturnType<typeof makeRedisMock>;

  beforeEach(() => {
    redis = makeRedisMock();
    repo = new NotificationCacheRepository(redis as never);
  });

  it('getDetail — returns cached', async () => {
    redis.get.mockResolvedValue({ id: 'x', userId: 'u' } as never);
    const result = await repo.getDetail('x');
    expect(result).toEqual({ id: 'x', userId: 'u' });
  });

  it('getDetail — cache miss', async () => {
    redis.get.mockResolvedValue(null);
    expect(await repo.getDetail('x')).toBeNull();
  });

  it('setDetail — writes', async () => {
    await repo.setDetail('x', { id: 'x', userId: 'u', status: 'pending', readStatus: 'unread', createdAt: '2026-01-01' });
    expect(redis.set).toHaveBeenCalled();
  });

  it('invalidateDetail — deletes key', async () => {
    await repo.invalidateDetail('x');
    expect(redis.del).toHaveBeenCalled();
  });

  it('getFeed — returns list', async () => {
    redis.get.mockResolvedValue([{ id: 'x' }] as never);
    expect((await repo.getFeed('u'))?.length).toBe(1);
  });

  it('setFeed — writes', async () => {
    await repo.setFeed('u', []);
    expect(redis.set).toHaveBeenCalled();
  });

  it('invalidateFeed — deletes', async () => {
    await repo.invalidateFeed('u');
    expect(redis.del).toHaveBeenCalled();
  });

  it('getUnreadCount — returns number', async () => {
    redis.get.mockResolvedValue(5 as never);
    expect(await repo.getUnreadCount('u')).toBe(5);
  });

  it('setUnreadCount — writes', async () => {
    await repo.setUnreadCount('u', 5);
    expect(redis.set).toHaveBeenCalled();
  });

  it('invalidateUnreadCount — deletes', async () => {
    await repo.invalidateUnreadCount('u');
    expect(redis.del).toHaveBeenCalled();
  });

  it('invalidateAll — bulk deletes 3 keys', async () => {
    await repo.invalidateAll('n', 'u');
    expect(redis.del).toHaveBeenCalledTimes(3);
  });
});

// ═══════════════════════════════════════════════════════════
// 2. TemplateCacheRepository
// ═══════════════════════════════════════════════════════════
describe('TemplateCacheRepository', () => {
  let repo: TemplateCacheRepository;
  let redis: ReturnType<typeof makeRedisMock>;

  beforeEach(() => {
    redis = makeRedisMock();
    repo = new TemplateCacheRepository(redis as never);
  });

  it('getById — hit', async () => {
    redis.get.mockResolvedValue({ id: 't', slug: 's', status: 'active', version: 1 } as never);
    expect((await repo.getById('t'))?.id).toBe('t');
  });

  it('getById — miss', async () => {
    redis.get.mockResolvedValue(null);
    expect(await repo.getById('t')).toBeNull();
  });

  it('setById — writes', async () => {
    await repo.setById('t', { id: 't', slug: 's', status: 'active', version: 1 });
    expect(redis.set).toHaveBeenCalled();
  });

  it('invalidateById — deletes', async () => {
    await repo.invalidateById('t');
    expect(redis.del).toHaveBeenCalled();
  });

  it('getBySlug — hit', async () => {
    redis.get.mockResolvedValue({ id: 't', slug: 's', status: 'active', version: 1 } as never);
    expect((await repo.getBySlug('s'))?.slug).toBe('s');
  });

  it('setBySlug — writes', async () => {
    await repo.setBySlug('s', { id: 't', slug: 's', status: 'active', version: 1 });
    expect(redis.set).toHaveBeenCalled();
  });

  it('invalidateBySlug — deletes', async () => {
    await repo.invalidateBySlug('s');
    expect(redis.del).toHaveBeenCalled();
  });

  it('getRendered — miss', async () => {
    redis.get.mockResolvedValue(null);
    expect(await repo.getRendered('t', 'hash')).toBeNull();
  });

  it('setRendered — writes', async () => {
    await repo.setRendered('t', 'hash', 'output');
    expect(redis.set).toHaveBeenCalled();
  });

  it('invalidate — with slug deletes 2 keys', async () => {
    await repo.invalidate('t', 's');
    expect(redis.del).toHaveBeenCalledTimes(2);
  });

  it('invalidate — without slug deletes 1 key', async () => {
    await repo.invalidate('t');
    expect(redis.del).toHaveBeenCalledTimes(1);
  });
});

// ═══════════════════════════════════════════════════════════
// 3. PreferenceCacheRepository
// ═══════════════════════════════════════════════════════════
describe('PreferenceCacheRepository', () => {
  let repo: PreferenceCacheRepository;
  let redis: ReturnType<typeof makeRedisMock>;

  beforeEach(() => {
    redis = makeRedisMock();
    repo = new PreferenceCacheRepository(redis as never);
  });

  it('get — hit', async () => {
    redis.get.mockResolvedValue({ userId: 'u', timezone: 'Asia/Dhaka' } as never);
    expect((await repo.get('u'))?.userId).toBe('u');
  });

  it('get — miss', async () => {
    redis.get.mockResolvedValue(null);
    expect(await repo.get('u')).toBeNull();
  });

  it('set — writes', async () => {
    await repo.set('u', {
      userId: 'u',
      quietHoursEnabled: false,
      timezone: 'Asia/Dhaka',
      locale: 'en',
      options: [],
    });
    expect(redis.set).toHaveBeenCalled();
  });

  it('invalidate — deletes', async () => {
    await repo.invalidate('u');
    expect(redis.del).toHaveBeenCalled();
  });

  it('getMatrix — miss', async () => {
    redis.get.mockResolvedValue(null);
    expect(await repo.getMatrix('u')).toBeNull();
  });

  it('setMatrix — writes', async () => {
    await repo.setMatrix('u', { channels: {} });
    expect(redis.set).toHaveBeenCalled();
  });

  it('invalidateMatrix — deletes', async () => {
    await repo.invalidateMatrix('u');
    expect(redis.del).toHaveBeenCalled();
  });

  it('invalidateAll — bulk deletes 2 keys', async () => {
    await repo.invalidateAll('u');
    expect(redis.del).toHaveBeenCalledTimes(2);
  });
});

// ═══════════════════════════════════════════════════════════
// 4. DeviceCacheRepository
// ═══════════════════════════════════════════════════════════
describe('DeviceCacheRepository', () => {
  let repo: DeviceCacheRepository;
  let redis: ReturnType<typeof makeRedisMock>;

  beforeEach(() => {
    redis = makeRedisMock();
    repo = new DeviceCacheRepository(redis as never);
  });

  const deviceDto = {
    id: TEST_IDS.DEVICE,
    userId: TEST_IDS.USER,
    type: 'android',
    status: 'active',
    platform: 'android',
    tokenMasked: 'fcm_***',
    lastActiveAt: '2026-01-15T00:00:00.000Z',
  };

  it('getById — hit', async () => {
    redis.get.mockResolvedValue(deviceDto as never);
    expect((await repo.getById(TEST_IDS.DEVICE))?.id).toBe(TEST_IDS.DEVICE);
  });

  it('setById — writes', async () => {
    await repo.setById(TEST_IDS.DEVICE, deviceDto);
    expect(redis.set).toHaveBeenCalled();
  });

  it('getByUser — hit', async () => {
    redis.get.mockResolvedValue([deviceDto] as never);
    expect((await repo.getByUser(TEST_IDS.USER))?.length).toBe(1);
  });

  it('setByUser — writes', async () => {
    await repo.setByUser(TEST_IDS.USER, [deviceDto]);
    expect(redis.set).toHaveBeenCalled();
  });

  it('getByToken — hit', async () => {
    redis.get.mockResolvedValue(deviceDto as never);
    expect((await repo.getByToken('token'))?.id).toBe(TEST_IDS.DEVICE);
  });

  it('setByToken — writes', async () => {
    await repo.setByToken('token', deviceDto);
    expect(redis.set).toHaveBeenCalled();
  });

  it('getActiveTokens — miss', async () => {
    redis.get.mockResolvedValue(null);
    expect(await repo.getActiveTokens(TEST_IDS.USER)).toBeNull();
  });

  it('setActiveTokens — writes', async () => {
    await repo.setActiveTokens(TEST_IDS.USER, []);
    expect(redis.set).toHaveBeenCalled();
  });

  it('invalidateAll — bulk deletes 3 keys (no token)', async () => {
    await repo.invalidateAll(TEST_IDS.DEVICE, TEST_IDS.USER);
    expect(redis.del).toHaveBeenCalledTimes(3);
  });

  it('invalidateAll — bulk deletes 4 keys (with token)', async () => {
    await repo.invalidateAll(TEST_IDS.DEVICE, TEST_IDS.USER, 'token');
    expect(redis.del).toHaveBeenCalledTimes(4);
  });
});

// ═══════════════════════════════════════════════════════════
// 5. IdempotencyCacheRepository
// ═══════════════════════════════════════════════════════════
describe('IdempotencyCacheRepository', () => {
  let repo: IdempotencyCacheRepository;
  let redis: ReturnType<typeof makeRedisMock>;

  beforeEach(() => {
    redis = makeRedisMock();
    repo = new IdempotencyCacheRepository(redis as never);
  });

  it('lookup — hit returns resultId', async () => {
    redis.get.mockResolvedValue({
      resultId: 'result-1',
      scope: 'send',
      createdAt: '2026-01-01',
    } as never);
    expect(await repo.lookup('send', 'key-1')).toBe('result-1');
  });

  it('lookup — miss returns null', async () => {
    redis.get.mockResolvedValue(null);
    expect(await repo.lookup('send', 'key-1')).toBeNull();
  });

  it('getRecord — returns full record', async () => {
    const record = { resultId: 'result-1', scope: 'send', createdAt: '2026-01-01' };
    redis.get.mockResolvedValue(record as never);
    expect(await repo.getRecord('send', 'key-1')).toEqual(record);
  });

  it('remember — writes with TTL', async () => {
    await repo.remember('send', 'key-1', 'result-1');
    expect(redis.set).toHaveBeenCalled();
  });

  it('forget — deletes', async () => {
    await repo.forget('send', 'key-1');
    expect(redis.del).toHaveBeenCalled();
  });

  it('tryLock — success when not locked', async () => {
    redis.exists.mockResolvedValue(false as never);
    expect(await repo.tryLock('send', 'key-1')).toBe(true);
    expect(redis.set).toHaveBeenCalled();
  });

  it('tryLock — false when already locked', async () => {
    redis.exists.mockResolvedValue(true as never);
    expect(await repo.tryLock('send', 'key-1')).toBe(false);
  });

  it('releaseLock — deletes', async () => {
    await repo.releaseLock('send', 'key-1');
    expect(redis.del).toHaveBeenCalled();
  });

  it('isLocked — true', async () => {
    redis.exists.mockResolvedValue(true as never);
    expect(await repo.isLocked('send', 'key-1')).toBe(true);
  });

  it('isLocked — false', async () => {
    redis.exists.mockResolvedValue(false as never);
    expect(await repo.isLocked('send', 'key-1')).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════
// BRANCH COVERAGE — Cache repo edge branches
// ═══════════════════════════════════════════════════════════
describe('Cache repos — extra branches', () => {
  it('NotificationCacheRepository — getFeed null fallback', async () => {
    const redis = makeRedisMock();
    const repo = new NotificationCacheRepository(redis as never);
    redis.get.mockResolvedValue(null);
    expect(await repo.getFeed('u')).toBeNull();
  });

  it('NotificationCacheRepository — getUnreadCount null', async () => {
    const redis = makeRedisMock();
    const repo = new NotificationCacheRepository(redis as never);
    redis.get.mockResolvedValue(null);
    expect(await repo.getUnreadCount('u')).toBeNull();
  });

  it('TemplateCacheRepository — getRendered null', async () => {
    const redis = makeRedisMock();
    const repo = new TemplateCacheRepository(redis as never);
    redis.get.mockResolvedValue(null);
    expect(await repo.getRendered('t', 'h')).toBeNull();
  });

  it('PreferenceCacheRepository — getMatrix null', async () => {
    const redis = makeRedisMock();
    const repo = new PreferenceCacheRepository(redis as never);
    redis.get.mockResolvedValue(null);
    expect(await repo.getMatrix('u')).toBeNull();
  });

  it('DeviceCacheRepository — getActiveTokens null', async () => {
    const redis = makeRedisMock();
    const repo = new DeviceCacheRepository(redis as never);
    redis.get.mockResolvedValue(null);
    expect(await repo.getActiveTokens('u')).toBeNull();
  });

  it('IdempotencyCacheRepository — getRecord null', async () => {
    const redis = makeRedisMock();
    const repo = new IdempotencyCacheRepository(redis as never);
    redis.get.mockResolvedValue(null);
    expect(await repo.getRecord('send', 'k')).toBeNull();
  });
});
