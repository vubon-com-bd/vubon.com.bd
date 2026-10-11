import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UnsubscribeService } from '../../../../../src/module/infrastructure/services/internal/unsubscribe.service.js';
import { PreferenceEntity } from '../../../../../src/module/domain/entities/preference.entity.js';
import { FIXED_USER_ID, makeUuid } from '../../../../helpers/test-factories.js';

function makePrisma(createFails = false, findMany: unknown[] = []) {
  return {
    notificationUnsubscribe: {
      create: createFails
        ? jest.fn().mockRejectedValue(new Error('db down'))
        : jest.fn().mockResolvedValue({}),
      findMany: jest.fn().mockResolvedValue(findMany),
    },
  } as never;
}
function makeRepo(prefMissing = false, saveFails = false) {
  return {
    findByUserId: jest.fn().mockResolvedValue(prefMissing ? null : buildPref()),
    save: saveFails
      ? jest.fn().mockRejectedValue(new Error('save fail'))
      : jest.fn().mockImplementation(async (e: unknown) => e),
  } as never;
}
function makeCache() {
  return { invalidate: jest.fn().mockResolvedValue(undefined) } as never;
}
function buildPref(): PreferenceEntity {
  return PreferenceEntity.createDefault({
    id: makeUuid(), userId: FIXED_USER_ID, now: new Date().toISOString(),
  });
}

describe('UnsubscribeService — branch coverage', () => {
  // record — happy path
  it('record persists + updates pref + invalidates cache', async () => {
    const p = makePrisma();
    const r = makeRepo();
    const c = makeCache();
    const svc = new UnsubscribeService(p as never, r as never, c as never);
    await svc.record({ userId: FIXED_USER_ID, scope: 'email', reason: 'spam' });
    expect((p as { notificationUnsubscribe: { create: jest.Mock } }).notificationUnsubscribe.create).toHaveBeenCalled();
    expect((r as { save: jest.Mock }).save).toHaveBeenCalled();
    expect((c as { invalidate: jest.Mock }).invalidate).toHaveBeenCalled();
  });

  // record — preference missing
  it('record when preference missing (no save)', async () => {
    const p = makePrisma();
    const r = makeRepo(true);
    const svc = new UnsubscribeService(p as never, r as never, makeCache() as never);
    await svc.record({ userId: FIXED_USER_ID, scope: 'email' });
    expect((r as { save: jest.Mock }).save).not.toHaveBeenCalled();
  });

  // record — prisma error (catch)
  it('record swallows prisma error', async () => {
    const p = makePrisma(true);
    const svc = new UnsubscribeService(p as never, makeRepo() as never, makeCache() as never);
    await expect(svc.record({ userId: FIXED_USER_ID, scope: 'email' })).resolves.toBeUndefined();
  });

  // record — save error (catch)
  it('record swallows preference save error', async () => {
    const p = makePrisma();
    const r = makeRepo(false, true);
    const svc = new UnsubscribeService(p as never, r as never, makeCache() as never);
    await expect(svc.record({ userId: FIXED_USER_ID, scope: 'email' })).resolves.toBeUndefined();
  });

  // record — all fields
  it('record with all optional fields', async () => {
    const p = makePrisma();
    const svc = new UnsubscribeService(p as never, makeRepo() as never, makeCache() as never);
    await svc.record({
      userId: FIXED_USER_ID, scope: 'sms', reason: 'too many',
      source: 'web', ipAddress: '1.2.3.4', userAgent: 'Mozilla',
    });
    expect((p as { notificationUnsubscribe: { create: jest.Mock } }).notificationUnsubscribe.create).toHaveBeenCalled();
  });

  // history — empty
  it('history returns []', async () => {
    const p = makePrisma(false, []);
    const svc = new UnsubscribeService(p as never, makeRepo() as never, makeCache() as never);
    expect(await svc.history(FIXED_USER_ID)).toEqual([]);
  });

  // history — with rows (reason null + present)
  it('history maps rows with/without reason', async () => {
    const p = makePrisma(false, [
      { scope: 'email', reason: 'spam', unsubscribedAt: new Date() },
      { scope: 'sms', reason: null, unsubscribedAt: new Date() },
    ]);
    const svc = new UnsubscribeService(p as never, makeRepo() as never, makeCache() as never);
    const rows = await svc.history(FIXED_USER_ID);
    expect(rows.length).toBe(2);
    expect(rows[0]?.reason).toBe('spam');
    expect(rows[1]?.reason).toBeUndefined();
  });
});
