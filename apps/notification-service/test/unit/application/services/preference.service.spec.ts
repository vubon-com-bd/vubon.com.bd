import { describe, it, expect, beforeEach } from '@jest/globals';
import { PreferenceService } from '../../../../src/module/application/services/impl/preference.service.js';
import { PreferenceEntity } from '../../../../src/module/domain/entities/preference.entity.js';
import { FIXED_USER_ID, makeUuid } from '../../../../helpers/test-factories.js';
import { makePreferenceRepo, makeEventBridge } from '../../../../helpers/mock-services.js';

function build(): PreferenceEntity {
  return PreferenceEntity.createDefault({
    id: makeUuid(),
    userId: FIXED_USER_ID,
    now: new Date().toISOString(),
  });
}

function makeService() {
  const repo = makePreferenceRepo();
  const events = makeEventBridge();
  const svc = new PreferenceService(repo as never, events as never);
  return { svc, repo, events };
}

describe('PreferenceService', () => {
  let ctx: ReturnType<typeof makeService>;
  beforeEach(() => { ctx = makeService(); });

  describe('getOrCreate', () => {
    it('creates when missing', async () => {
      const r = await ctx.svc.getOrCreate(FIXED_USER_ID);
      expect(r.userId).toBe(FIXED_USER_ID);
      expect(ctx.repo.save).toHaveBeenCalled();
    });

    it('returns existing', async () => {
      ctx.repo.findByUserId.mockResolvedValueOnce(build());
      const r = await ctx.svc.getOrCreate(FIXED_USER_ID);
      expect(r.userId).toBe(FIXED_USER_ID);
    });
  });

  describe('get', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.get({ userId: FIXED_USER_ID })).rejects.toThrow();
    });

    it('returns DTO', async () => {
      ctx.repo.findByUserId.mockResolvedValueOnce(build());
      const r = await ctx.svc.get({ userId: FIXED_USER_ID });
      expect(r.userId).toBe(FIXED_USER_ID);
    });
  });

  describe('getPublic', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getPublic({ userId: FIXED_USER_ID })).rejects.toThrow();
    });

    it('returns public DTO', async () => {
      ctx.repo.findByUserId.mockResolvedValueOnce(build());
      const r = await ctx.svc.getPublic({ userId: FIXED_USER_ID });
      expect(r.userId).toBe(FIXED_USER_ID);
    });
  });

  describe('update', () => {
    it('creates + updates when not found', async () => {
      const r = await ctx.svc.update({
        userId: FIXED_USER_ID,
        channelPreferences: { email: false },
        categoryPreferences: { order: false },
        locale: 'bn',
      });
      expect(r.userId).toBe(FIXED_USER_ID);
    });

    it('updates existing', async () => {
      ctx.repo.findByUserId.mockResolvedValueOnce(build());
      const r = await ctx.svc.update({
        userId: FIXED_USER_ID,
        channelPreferences: { email: false },
      });
      expect(r).toBeDefined();
    });
  });

  describe('toggleChannel', () => {
    it('toggles', async () => {
      const r = await ctx.svc.toggleChannel({
        userId: FIXED_USER_ID, channel: 'sms', enabled: true,
      });
      expect(r).toBeDefined();
    });
  });

  describe('toggleCategory', () => {
    it('toggles', async () => {
      const r = await ctx.svc.toggleCategory({
        userId: FIXED_USER_ID, category: 'marketing', enabled: true,
      });
      expect(r).toBeDefined();
    });
  });

  describe('updateQuietHours', () => {
    it('updates quiet hours', async () => {
      const r = await ctx.svc.updateQuietHours({
        userId: FIXED_USER_ID, enabled: true, startHour: 22, endHour: 8,
      });
      expect(r).toBeDefined();
    });
  });

  describe('optOut', () => {
    it('opts out', async () => {
      const r = await ctx.svc.optOut({
        userId: FIXED_USER_ID, scope: 'email', reason: 'spam',
      });
      expect(r).toBeDefined();
    });
  });

  describe('optIn', () => {
    it('opts in', async () => {
      const r = await ctx.svc.optIn({
        userId: FIXED_USER_ID, scope: 'email',
      });
      expect(r).toBeDefined();
    });
  });
});
