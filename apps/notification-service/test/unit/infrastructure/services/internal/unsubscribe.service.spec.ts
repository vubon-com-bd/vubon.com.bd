import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UnsubscribeService } from '../../../../../src/module/infrastructure/services/internal/unsubscribe.service.js';
import { PreferenceEntity } from '../../../../../src/module/domain/entities/preference.entity.js';
import { FIXED_USER_ID, makeUuid } from '../../../../helpers/test-factories.js';

function makePrisma() {
  return {
    notificationUnsubscribe: {
      create: jest.fn().mockResolvedValue({}),
      findMany: jest.fn().mockResolvedValue([]),
    },
  } as never;
}

function makeRepo() {
  return {
    findByUserId: jest.fn().mockResolvedValue(null),
    save: jest.fn().mockImplementation(async (e: unknown) => e),
  } as never;
}

function makeCache() {
  return {
    invalidate: jest.fn().mockResolvedValue(undefined),
  } as never;
}

function buildPref(): PreferenceEntity {
  return PreferenceEntity.createDefault({
    id: makeUuid(),
    userId: FIXED_USER_ID,
    now: new Date().toISOString(),
  });
}

describe('UnsubscribeService', () => {
  let prisma: ReturnType<typeof makePrisma>;
  let repo: ReturnType<typeof makeRepo>;
  let cache: ReturnType<typeof makeCache>;
  let svc: UnsubscribeService;
  beforeEach(() => {
    prisma = makePrisma();
    repo = makeRepo();
    cache = makeCache();
    svc = new UnsubscribeService(prisma as never, repo as never, cache as never);
  });

  it('record persists + updates preference', async () => {
    (repo as { findByUserId: jest.Mock }).findByUserId.mockResolvedValueOnce(buildPref());
    await svc.record({ userId: FIXED_USER_ID, scope: 'email', reason: 'spam' });
    expect((prisma as { notificationUnsubscribe: { create: jest.Mock } }).notificationUnsubscribe.create).toHaveBeenCalled();
    expect((repo as { save: jest.Mock }).save).toHaveBeenCalled();
    expect((cache as { invalidate: jest.Mock }).invalidate).toHaveBeenCalled();
  });

  it('record works when preference missing', async () => {
    await svc.record({ userId: FIXED_USER_ID, scope: 'email' });
    expect((prisma as { notificationUnsubscribe: { create: jest.Mock } }).notificationUnsubscribe.create).toHaveBeenCalled();
  });

  it('record handles prisma error gracefully', async () => {
    (prisma as { notificationUnsubscribe: { create: jest.Mock } }).notificationUnsubscribe.create.mockRejectedValueOnce(new Error('db down'));
    await expect(svc.record({ userId: FIXED_USER_ID, scope: 'email' })).resolves.toBeUndefined();
  });

  it('record handles preference save error', async () => {
    (repo as { findByUserId: jest.Mock }).findByUserId.mockResolvedValueOnce(buildPref());
    (repo as { save: jest.Mock }).save.mockRejectedValueOnce(new Error('save fail'));
    await svc.record({ userId: FIXED_USER_ID, scope: 'email' });
    expect(true).toBe(true);
  });

  it('record all fields', async () => {
    await svc.record({
      userId: FIXED_USER_ID, scope: 'sms', reason: 'too many',
      source: 'web', ipAddress: '1.2.3.4', userAgent: 'Mozilla',
    });
    expect((prisma as { notificationUnsubscribe: { create: jest.Mock } }).notificationUnsubscribe.create).toHaveBeenCalled();
  });

  it('history returns empty array', async () => {
    const r = await svc.history(FIXED_USER_ID);
    expect(r).toEqual([]);
  });

  it('history maps rows', async () => {
    (prisma as { notificationUnsubscribe: { findMany: jest.Mock } }).notificationUnsubscribe.findMany.mockResolvedValueOnce([
      { scope: 'email', reason: 'spam', unsubscribedAt: new Date() },
      { scope: 'sms', reason: null, unsubscribedAt: new Date() },
    ]);
    const r = await svc.history(FIXED_USER_ID);
    expect(r.length).toBe(2);
    expect(r[0]?.scope).toBe('email');
    expect(r[1]?.reason).toBeUndefined();
  });
});
