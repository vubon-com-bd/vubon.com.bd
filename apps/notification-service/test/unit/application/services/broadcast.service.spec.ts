import { describe, it, expect, beforeEach } from '@jest/globals';
import { BroadcastService } from '../../../../src/module/application/services/impl/broadcast.service.js';
import { BroadcastEntity } from '../../../../src/module/domain/entities/broadcast.entity.js';
import { BroadcastTypeVO } from '../../../../src/module/domain/value-objects/primitives/broadcast-type.vo.js';
import { BroadcastTargetVO } from '../../../../src/module/domain/value-objects/primitives/broadcast-target.vo.js';
import { FIXED_USER_ID, FIXED_TEMPLATE_ID, makeUuid } from '../../../../helpers/test-factories.js';
import { makeBroadcastRepo, makeEventBridge } from '../../../../helpers/mock-services.js';

function build(): BroadcastEntity {
  return BroadcastEntity.create({
    id: makeUuid(),
    now: new Date().toISOString(),
    props: {
      type: BroadcastTypeVO.allUsers(),
      target: BroadcastTargetVO.all(),
      templateId: FIXED_TEMPLATE_ID,
      createdBy: FIXED_USER_ID,
    },
  });
}

function makeService() {
  const repo = makeBroadcastRepo();
  const events = makeEventBridge();
  const svc = new BroadcastService(repo as never, events as never);
  return { svc, repo, events };
}

describe('BroadcastService', () => {
  let ctx: ReturnType<typeof makeService>;
  beforeEach(() => { ctx = makeService(); });

  describe('create', () => {
    it('creates broadcast', async () => {
      const r = await ctx.svc.create({
        type: 'all_users', target: 'all', templateId: FIXED_TEMPLATE_ID,
        channels: ['email'],
      } as never, FIXED_USER_ID);
      expect(r.type).toBe('all_users');
    });

    it('throws on empty channels', async () => {
      await expect(ctx.svc.create({
        type: 'all_users', target: 'all', templateId: FIXED_TEMPLATE_ID,
        channels: [],
      } as never)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.update({ broadcastId: '11111111-1111-1111-1111-111111111111' } as never, 'actor')).rejects.toThrow();
    });

    it('updates existing', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.update({ broadcastId: '11111111-1111-1111-1111-111111111111', channels: ['sms'] } as never, 'actor');
      expect(r).toBeDefined();
    });
  });

  describe('schedule', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.schedule({
        broadcastId: '11111111-1111-1111-1111-111111111111',
        scheduledAt: new Date(Date.now() + 3600_000).toISOString(),
      } as never, 'actor')).rejects.toThrow();
    });

    it('schedules existing', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.schedule({
        broadcastId: '11111111-1111-1111-1111-111111111111',
        scheduledAt: new Date(Date.now() + 3600_000).toISOString(),
      } as never, 'actor');
      expect(r).toBeDefined();
    });
  });

  describe('start', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.start({
        broadcastId: '11111111-1111-1111-1111-111111111111', totalRecipients: 100,
      } as never, 'actor')).rejects.toThrow();
    });

    it('starts existing', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.start({
        broadcastId: '11111111-1111-1111-1111-111111111111', totalRecipients: 100,
      } as never, 'actor');
      expect(r).toBeDefined();
    });

    it('rejects above MAX_RECIPIENTS', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      await expect(ctx.svc.start({
        broadcastId: '11111111-1111-1111-1111-111111111111', totalRecipients: 2_000_000,
      } as never, 'actor')).rejects.toThrow();
    });

    it('rejects when already sending', async () => {
      const e = build();
      e.start(100);
      ctx.repo.findByIdVO.mockResolvedValueOnce(e);
      await expect(ctx.svc.start({
        broadcastId: '11111111-1111-1111-1111-111111111111', totalRecipients: 100,
      } as never, 'actor')).rejects.toThrow();
    });
  });

  describe('cancel', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.cancel({ broadcastId: '11111111-1111-1111-1111-111111111111' } as never, 'actor')).rejects.toThrow();
    });

    it('cancels draft', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.cancel({ broadcastId: '11111111-1111-1111-1111-111111111111', reason: 'no' } as never, 'actor');
      expect(r).toBeDefined();
    });
  });

  describe('test', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.test({
        broadcastId: '11111111-1111-1111-1111-111111111111', recipientIds: ['77777777-7777-7777-7777-777777777777'],
      } as never, 'actor')).rejects.toThrow();
    });

    it('runs test', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.test({
        broadcastId: '11111111-1111-1111-1111-111111111111', recipientIds: ['77777777-7777-7777-7777-777777777777'],
      } as never, 'actor');
      expect(r).toBeDefined();
    });
  });

  describe('getById', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getById({ broadcastId: '11111111-1111-1111-1111-111111111111' } as never)).rejects.toThrow();
    });

    it('returns DTO', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.getById({ broadcastId: '11111111-1111-1111-1111-111111111111' } as never);
      expect(r.type).toBe('all_users');
    });
  });

  describe('getStats', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getStats({ broadcastId: '11111111-1111-1111-1111-111111111111' } as never)).rejects.toThrow();
    });

    it('returns stats', async () => {
      const e = build();
      e.start(100);
      e.recordProgress(50, 45, 5);
      ctx.repo.findByIdVO.mockResolvedValueOnce(e);
      const r = await ctx.svc.getStats({ broadcastId: '11111111-1111-1111-1111-111111111111' } as never);
      expect(r.processed).toBe(50);
    });
  });

  describe('getProgress', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getProgress('11111111-1111-1111-1111-111111111111')).rejects.toThrow();
    });

    it('returns progress', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.getProgress('11111111-1111-1111-1111-111111111111');
      expect(r.broadcastId).toBeDefined();
    });
  });

  describe('list', () => {
    it('returns paginated', async () => {
      const r = await ctx.svc.list({ page: 1, limit: 20 });
      expect(r.total).toBe(0);
    });

    it('with all filters', async () => {
      const r = await ctx.svc.list({
        page: 1, limit: 20, sortBy: 'createdAt', sortDir: 'desc',
        filter: { type: 'all_users', status: 'draft', templateId: '55555555-5555-5555-5555-555555555555', createdBy: FIXED_USER_ID },
      } as never);
      expect(r).toBeDefined();
    });
  });
});
