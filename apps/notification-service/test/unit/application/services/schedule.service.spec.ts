import { describe, it, expect, beforeEach } from '@jest/globals';
import { ScheduleService } from '../../../../src/module/application/services/impl/schedule.service.js';
import { ScheduleEntity } from '../../../../src/module/domain/entities/schedule.entity.js';
import { ScheduleTypeVO } from '../../../../src/module/domain/value-objects/primitives/schedule-type.vo.js';
import { ScheduleRecurrenceVO } from '../../../../src/module/domain/value-objects/primitives/schedule-recurrence.vo.js';
import { FIXED_USER_ID, makeUuid } from '../../../../helpers/test-factories.js';
import { makeScheduleRepo, makeEventBridge } from '../../../../helpers/mock-services.js';

function build(): ScheduleEntity {
  return ScheduleEntity.create({
    id: makeUuid(),
    now: new Date().toISOString(),
    props: {
      type: ScheduleTypeVO.scheduled(),
      recurrence: ScheduleRecurrenceVO.none(),
      scheduledAt: new Date(Date.now() + 3600_000).toISOString(),
      timezone: 'Asia/Dhaka',
      userId: FIXED_USER_ID,
      createdBy: FIXED_USER_ID,
    },
  });
}

function makeService() {
  const repo = makeScheduleRepo();
  const events = makeEventBridge();
  const svc = new ScheduleService(repo as never, events as never);
  return { svc, repo, events };
}

describe('ScheduleService', () => {
  let ctx: ReturnType<typeof makeService>;
  beforeEach(() => { ctx = makeService(); });

  describe('create', () => {
    it('creates schedule', async () => {
      const r = await ctx.svc.create({
        type: 'scheduled', recurrence: 'none',
        scheduledAt: new Date(Date.now() + 3600_000).toISOString(),
        timezone: 'Asia/Dhaka',
      } as never, FIXED_USER_ID);
      expect(r.type).toBe('scheduled');
    });

    it('rejects past scheduledAt', async () => {
      await expect(ctx.svc.create({
        type: 'scheduled', recurrence: 'none',
        scheduledAt: new Date(Date.now() - 3600_000).toISOString(),
        timezone: 'Asia/Dhaka',
      } as never)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.update({ scheduleId: makeUuid(), scheduledAt: new Date(Date.now() + 3600_000).toISOString() } as never, 'actor'),
      ).rejects.toThrow();
    });

    it('updates with future date', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.update({
        scheduleId: '22222222-2222-2222-2222-222222222222',
        scheduledAt: new Date(Date.now() + 7200_000).toISOString(),
      } as never, 'actor');
      expect(r).toBeDefined();
    });

    it('rejects past date on update', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      await expect(ctx.svc.update({
        scheduleId: '22222222-2222-2222-2222-222222222222',
        scheduledAt: new Date(Date.now() - 3600_000).toISOString(),
      } as never, 'actor')).rejects.toThrow();
    });
  });

  describe('activate', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.activate('22222222-2222-2222-2222-222222222222', 'actor')).rejects.toThrow();
    });

    it('activates existing', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.activate('22222222-2222-2222-2222-222222222222', 'actor');
      expect(r).toBeDefined();
    });
  });

  describe('pause', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.pause({ scheduleId: '22222222-2222-2222-2222-222222222222', reason: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' } as never, 'actor')).rejects.toThrow();
    });

    it('pauses active', async () => {
      const e = build();
      e.activate();
      ctx.repo.findByIdVO.mockResolvedValueOnce(e);
      const r = await ctx.svc.pause({ scheduleId: '22222222-2222-2222-2222-222222222222', reason: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' } as never, 'actor');
      expect(r).toBeDefined();
    });
  });

  describe('resume', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.resume({ scheduleId: '22222222-2222-2222-2222-222222222222' } as never, 'actor')).rejects.toThrow();
    });

    it('resumes paused', async () => {
      const e = build();
      e.activate();
      e.pause();
      ctx.repo.findByIdVO.mockResolvedValueOnce(e);
      const r = await ctx.svc.resume({ scheduleId: '22222222-2222-2222-2222-222222222222' } as never, 'actor');
      expect(r).toBeDefined();
    });
  });

  describe('cancel', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.cancel({ scheduleId: '22222222-2222-2222-2222-222222222222' } as never, 'actor')).rejects.toThrow();
    });

    it('cancels existing', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.cancel({ scheduleId: '22222222-2222-2222-2222-222222222222', reason: 'no' } as never, 'actor');
      expect(r).toBeDefined();
    });
  });

  describe('trigger', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.trigger({ scheduleId: '22222222-2222-2222-2222-222222222222' } as never, 'actor')).rejects.toThrow();
    });

    it('triggers active', async () => {
      const e = build();
      e.activate();
      ctx.repo.findByIdVO.mockResolvedValueOnce(e);
      const r = await ctx.svc.trigger({ scheduleId: '22222222-2222-2222-2222-222222222222' } as never, 'actor');
      expect(r.scheduleId).toBeDefined();
    });
  });

  describe('getById', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getById({ scheduleId: '22222222-2222-2222-2222-222222222222' } as never)).rejects.toThrow();
    });

    it('returns DTO', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.getById({ scheduleId: '22222222-2222-2222-2222-222222222222' } as never);
      expect(r.type).toBe('scheduled');
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
        filter: { userId: FIXED_USER_ID, type: 'scheduled', status: 'active', templateId: '55555555-5555-5555-5555-555555555555' },
      } as never);
      expect(r).toBeDefined();
    });
  });

  describe('getDue', () => {
    it('returns due schedules', async () => {
      ctx.repo.findDue.mockResolvedValueOnce([build()]);
      const r = await ctx.svc.getDue();
      expect(r.length).toBe(1);
    });

    it('returns empty', async () => {
      const r = await ctx.svc.getDue();
      expect(r).toEqual([]);
    });
  });
});
