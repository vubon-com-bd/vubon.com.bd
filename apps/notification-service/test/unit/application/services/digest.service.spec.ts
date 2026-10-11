import { describe, it, expect, beforeEach } from '@jest/globals';
import { DigestService } from '../../../../src/module/application/services/impl/digest.service.js';
import { DigestEntity } from '../../../../src/module/domain/entities/digest.entity.js';
import { DigestFrequencyVO } from '../../../../src/module/domain/value-objects/primitives/digest-frequency.vo.js';
import { DigestTypeVO } from '../../../../src/module/domain/value-objects/primitives/digest-type.vo.js';
import { FIXED_USER_ID, makeUuid } from '../../../../helpers/test-factories.js';
import { makeDigestRepo, makeNotificationRepo, makeEventBridge } from '../../../../helpers/mock-services.js';

function build(): DigestEntity {
  return DigestEntity.create({
    id: makeUuid(),
    now: new Date().toISOString(),
    props: {
      userId: FIXED_USER_ID,
      frequency: DigestFrequencyVO.daily(),
      type: DigestTypeVO.summary(),
      periodStart: new Date(Date.now() - 86_400_000).toISOString(),
      periodEnd: new Date().toISOString(),
    },
  });
}

function makeService() {
  const repo = makeDigestRepo();
  const notif = makeNotificationRepo();
  const events = makeEventBridge();
  const svc = new DigestService(repo as never, notif as never, events as never);
  return { svc, repo, notif, events };
}

describe('DigestService', () => {
  let ctx: ReturnType<typeof makeService>;
  beforeEach(() => { ctx = makeService(); });

  describe('create', () => {
    it('creates digest', async () => {
      const r = await ctx.svc.create({
        userId: FIXED_USER_ID,
        frequency: 'daily',
        type: 'summary',
        periodStart: new Date(Date.now() - 86_400_000).toISOString(),
        periodEnd: new Date().toISOString(),
      } as never);
      expect(r.userId).toBe(FIXED_USER_ID);
    });
  });

  describe('update', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.update({ digestId: '33333333-3333-3333-3333-333333333333' } as never)).rejects.toThrow();
    });

    it('updates existing', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.update({
        digestId: '33333333-3333-3333-3333-333333333333', frequency: 'weekly', type: 'detailed',
      } as never);
      expect(r).toBeDefined();
    });
  });

  describe('generate', () => {
    it('generates from unread notifications', async () => {
      const r = await ctx.svc.generate({
        userId: FIXED_USER_ID,
        frequency: 'daily',
        type: 'summary',
      } as never);
      expect(r.status).toBe('ready');
    });

    it('with period bounds', async () => {
      const r = await ctx.svc.generate({
        userId: FIXED_USER_ID,
        frequency: 'daily',
        periodStart: new Date(Date.now() - 86_400_000).toISOString(),
        periodEnd: new Date().toISOString(),
      } as never);
      expect(r).toBeDefined();
    });
  });

  describe('send', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.send({ digestId: '33333333-3333-3333-3333-333333333333', channel: 'email' } as never)).rejects.toThrow();
    });

    it('sends ready digest', async () => {
      const e = build();
      e.startGenerating();
      e.markReady(['aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa']);
      ctx.repo.findByIdVO.mockResolvedValueOnce(e);
      const r = await ctx.svc.send({ digestId: '33333333-3333-3333-3333-333333333333', channel: 'email' } as never);
      expect(r.status).toBe('sent');
    });
  });

  describe('cancel', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.cancel('33333333-3333-3333-3333-333333333333', 'actor')).rejects.toThrow();
    });

    it('cancels pending', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.cancel('33333333-3333-3333-3333-333333333333', 'actor');
      expect(r.status).toBe('cancelled');
    });
  });

  describe('preview', () => {
    it('returns preview', async () => {
      const r = await ctx.svc.preview({
        userId: FIXED_USER_ID,
        frequency: 'daily',
      } as never);
      expect(r.userId).toBe(FIXED_USER_ID);
    });
  });

  describe('getById', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getById({ digestId: '33333333-3333-3333-3333-333333333333' } as never)).rejects.toThrow();
    });

    it('returns DTO', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.getById({ digestId: '33333333-3333-3333-3333-333333333333' } as never);
      expect(r.userId).toBe(FIXED_USER_ID);
    });
  });

  describe('list', () => {
    it('returns paginated', async () => {
      const r = await ctx.svc.list({ page: 1, limit: 20 });
      expect(r.total).toBe(0);
    });

    it('with filters', async () => {
      const r = await ctx.svc.list({
        page: 1, limit: 20,
        sortBy: 'createdAt', sortDir: 'desc',
        filter: { userId: FIXED_USER_ID, status: 'sent', frequency: 'daily' },
      } as never);
      expect(r).toBeDefined();
    });
  });
});
