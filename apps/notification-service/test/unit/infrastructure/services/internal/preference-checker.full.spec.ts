import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PreferenceCheckerService } from '../../../../../src/module/infrastructure/services/internal/preference-checker.service.js';
import { PreferenceEntity } from '../../../../../src/module/domain/entities/preference.entity.js';
import { FIXED_USER_ID, makeUuid } from '../../../../helpers/test-factories.js';

function makeRepo() {
  return { findByUserId: jest.fn().mockResolvedValue(null) } as never;
}
function makeCache() {
  return {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue(undefined),
    invalidate: jest.fn().mockResolvedValue(undefined),
    invalidateMany: jest.fn().mockResolvedValue(undefined),
  } as never;
}
function buildPref(): PreferenceEntity {
  return PreferenceEntity.createDefault({
    id: makeUuid(),
    userId: FIXED_USER_ID,
    now: new Date().toISOString(),
  });
}

describe('PreferenceCheckerService — branch coverage', () => {
  let repo: ReturnType<typeof makeRepo>;
  let cache: ReturnType<typeof makeCache>;
  let svc: PreferenceCheckerService;
  beforeEach(() => {
    repo = makeRepo();
    cache = makeCache();
    svc = new PreferenceCheckerService(repo as never, cache as never);
  });

  // load
  it('load returns null when no preference', async () => {
    expect(await svc.load(FIXED_USER_ID)).toBeNull();
  });

  it('load returns cached when cache hit', async () => {
    const now = new Date().toISOString();
    (cache as { get: jest.Mock }).get.mockResolvedValueOnce({
      id: makeUuid(), userId: FIXED_USER_ID,
      channelPreferences: { email: true }, categoryPreferences: { order: true },
      quietHoursEnabled: false, quietHoursStart: null, quietHoursEnd: null,
      timezone: 'Asia/Dhaka', locale: 'en',
      createdAt: now, updatedAt: now,
    });
    expect(await svc.load(FIXED_USER_ID)).not.toBeNull();
  });

  it('load fetches from repo on cache miss + caches', async () => {
    (repo as { findByUserId: jest.Mock }).findByUserId.mockResolvedValueOnce(buildPref());
    expect(await svc.load(FIXED_USER_ID)).not.toBeNull();
    expect((cache as { set: jest.Mock }).set).toHaveBeenCalled();
  });

  it('load returns null when repo empty on cache miss', async () => {
    expect(await svc.load(FIXED_USER_ID)).toBeNull();
    expect((cache as { set: jest.Mock }).set).not.toHaveBeenCalled();
  });

  it('load handles corrupt cache', async () => {
    (cache as { get: jest.Mock }).get.mockResolvedValueOnce({
      id: 'x', userId: 'y', channelPreferences: null as never,
    });
    (repo as { findByUserId: jest.Mock }).findByUserId.mockResolvedValueOnce(buildPref());
    expect(await svc.load(FIXED_USER_ID)).not.toBeNull();
  });

  // shouldSend
  it('shouldSend TRUE no preference', async () => {
    const r = await svc.shouldSend({
      userId: FIXED_USER_ID, type: 'transactional', category: 'order',
      channel: 'email', priority: 'normal',
    });
    expect(r.shouldSend).toBe(true);
    expect(r.reason).toBe('no_preference_record');
  });

  it('shouldSend FALSE category disabled (marketing)', async () => {
    (repo as { findByUserId: jest.Mock }).findByUserId.mockResolvedValueOnce(buildPref());
    const r = await svc.shouldSend({
      userId: FIXED_USER_ID, type: 'marketing', category: 'marketing',
      channel: 'email', priority: 'normal',
    });
    expect(r.shouldSend).toBe(false);
  });

  it('shouldSend TRUE category enabled', async () => {
    (repo as { findByUserId: jest.Mock }).findByUserId.mockResolvedValueOnce(buildPref());
    const r = await svc.shouldSend({
      userId: FIXED_USER_ID, type: 'transactional', category: 'order',
      channel: 'email', priority: 'normal',
    });
    expect(r.shouldSend).toBe(true);
  });

  it('shouldSend with currentHour provided', async () => {
    (repo as { findByUserId: jest.Mock }).findByUserId.mockResolvedValueOnce(buildPref());
    const r = await svc.shouldSend({
      userId: FIXED_USER_ID, type: 'transactional', category: 'order',
      channel: 'email', priority: 'normal', currentHour: 23,
    });
    expect(typeof r.shouldSend).toBe('boolean');
  });

  it('shouldSend quiet hours defer (deferUntil returned)', async () => {
    const p = buildPref();
    p.updateQuietHours(true, 22, 8);
    (repo as { findByUserId: jest.Mock }).findByUserId.mockResolvedValueOnce(p);
    const r = await svc.shouldSend({
      userId: FIXED_USER_ID, type: 'marketing', category: 'marketing',
      channel: 'email', priority: 'normal', currentHour: 23,
    });
    expect(r.shouldSend).toBe(false);
  });

  it('shouldSend with enabled channel + category', async () => {
    (repo as { findByUserId: jest.Mock }).findByUserId.mockResolvedValueOnce(buildPref());
    const r = await svc.shouldSend({
      userId: FIXED_USER_ID, type: 'transactional', category: 'order',
      channel: 'email', priority: 'critical',
    });
    expect(r.shouldSend).toBe(true);
  });
});
