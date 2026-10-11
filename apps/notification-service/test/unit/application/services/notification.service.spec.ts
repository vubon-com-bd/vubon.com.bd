import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NotificationService } from '../../../../src/module/application/services/impl/notification.service.js';
import { NotificationEntity } from '../../../../src/module/domain/entities/notification.entity.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID, makeSendNotificationFixture } from '../../../helpers/test-factories.js';
import {
  makeNotificationRepo,
  makePreferenceRepo,
  makeEventBridge,
} from '../../../helpers/mock-services.js';

function makeService() {
  const repo = makeNotificationRepo();
  const pref = makePreferenceRepo();
  const events = makeEventBridge();
  const svc = new NotificationService(repo as never, pref as never, events as never);
  return { svc, repo, pref, events };
}

describe('NotificationService', () => {
  let ctx: ReturnType<typeof makeService>;

  beforeEach(() => {
    ctx = makeService();
  });

  // ═══ SEND ═══
  describe('send', () => {
    it('creates + queues a notification', async () => {
      const dto = makeSendNotificationFixture();
      const r = await ctx.svc.send(dto);
      expect(r.success).toBe(true);
      expect(ctx.repo.save).toHaveBeenCalled();
      expect(ctx.events.publishFromEntity).toHaveBeenCalled();
    });

    it('throws when channels empty', async () => {
      await expect(
        ctx.svc.send(makeSendNotificationFixture({ channels: [] })),
      ).rejects.toThrow();
    });

    it('throws when all channels suppressed by preference', async () => {
      ctx.pref.findByUserId.mockResolvedValueOnce({
        isChannelEnabled: () => false,
        isCategoryEnabled: () => true,
        isInQuietHours: () => false,
      } as never);
      await expect(
        ctx.svc.send(makeSendNotificationFixture()),
      ).rejects.toThrow();
    });

    it('schedules when scheduledAt provided', async () => {
      const dto = makeSendNotificationFixture();
      const r = await ctx.svc.send({
        ...dto,
        scheduledAt: new Date(Date.now() + 3600_000).toISOString(),
      } as never);
      expect(r.success).toBe(true);
    });
  });

  // ═══ SEND MANY ═══
  describe('sendToMany', () => {
    it('returns empty for empty list', async () => {
      const r = await ctx.svc.sendToMany({
        userIds: [],
        type: 'announcement',
        category: 'system',
        channels: ['email'],
        title: 'T',
        body: 'B',
      } as never);
      expect(r).toEqual([]);
    });

    it('sends to each user', async () => {
      const r = await ctx.svc.sendToMany({
        userIds: [FIXED_USER_ID, '00000000-0000-0000-0000-000000000099'],
        type: 'announcement',
        category: 'system',
        channels: ['email'],
        title: 'T',
        body: 'B',
      } as never);
      expect(Array.isArray(r)).toBe(true);
    });
  });

  // ═══ READ ═══
  describe('getById', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getById({ notificationId: FIXED_NOTIFICATION_ID })).rejects.toThrow();
    });

    it('returns mapped notification', async () => {
      const entity = NotificationEntity.create({
        id: FIXED_NOTIFICATION_ID,
        now: new Date().toISOString(),
        props: {
          type: { value: 'transactional', isTransactional: () => true } as never,
          category: { value: 'order' } as never,
          channel: { value: 'email' } as never,
          priority: { value: 'normal' } as never,
          content: {
            title: { value: 'T' },
            body: { value: 'B' },
            hasData: () => false,
          } as never,
          recipient: {
            userId: { value: FIXED_USER_ID },
            channel: { value: 'email' },
            hasEmail: () => false,
            hasPhone: () => false,
            hasDeviceToken: () => false,
          } as never,
        },
      });
      ctx.repo.findByIdVO.mockResolvedValueOnce(entity);
      const r = await ctx.svc.getById({ notificationId: FIXED_NOTIFICATION_ID });
      expect(r.id).toBe(FIXED_NOTIFICATION_ID);
    });
  });

  describe('getPublic', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getPublic({ notificationId: FIXED_NOTIFICATION_ID })).rejects.toThrow();
    });
  });

  describe('getDetail', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getDetail({ notificationId: FIXED_NOTIFICATION_ID })).rejects.toThrow();
    });
  });

  describe('list', () => {
    it('returns paginated list', async () => {
      const r = await ctx.svc.list({
        userId: FIXED_USER_ID,
        options: { page: 1, limit: 20 },
      });
      expect(r.total).toBe(0);
      expect(r.unreadCount).toBe(0);
    });
  });

  describe('getStats', () => {
    it('returns stats', async () => {
      const r = await ctx.svc.getStats({});
      expect(r.total).toBe(0);
    });

    it('with date filters', async () => {
      const r = await ctx.svc.getStats({
        userId: FIXED_USER_ID,
        fromDate: '2026-01-01',
        toDate: '2026-12-31',
      });
      expect(r).toBeDefined();
    });
  });

  describe('getUnreadCount', () => {
    it('returns count', async () => {
      const r = await ctx.svc.getUnreadCount(FIXED_USER_ID);
      expect(r.userId).toBe(FIXED_USER_ID);
      expect(r.unreadCount).toBe(0);
    });
  });

  // ═══ MUTATIONS ═══
  describe('cancel', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.cancel({ notificationId: FIXED_NOTIFICATION_ID, reason: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' }),
      ).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.update({ notificationId: FIXED_NOTIFICATION_ID } as never, 'actor'),
      ).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.delete({ notificationId: FIXED_NOTIFICATION_ID, softDelete: true }),
      ).rejects.toThrow();
    });
  });

  describe('retry', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.retry({ notificationId: FIXED_NOTIFICATION_ID, force: false }),
      ).rejects.toThrow();
    });
  });

  describe('markRead', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.markRead({ notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID }),
      ).rejects.toThrow();
    });
  });

  describe('markManyRead', () => {
    it('returns 0 when notifications missing', async () => {
      const r = await ctx.svc.markManyRead({
        notificationIds: [FIXED_NOTIFICATION_ID],
        userId: FIXED_USER_ID,
      });
      expect(r).toBe(0);
    });
  });

  describe('markAllRead', () => {
    it('returns 0 when no unread', async () => {
      const r = await ctx.svc.markAllRead({ userId: FIXED_USER_ID });
      expect(r).toBe(0);
    });
  });

  describe('archive', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.archive({ notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID }),
      ).rejects.toThrow();
    });
  });

  describe('snooze', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.snooze({
          notificationId: FIXED_NOTIFICATION_ID,
          userId: FIXED_USER_ID,
          snoozedUntil: new Date(Date.now() + 3600_000).toISOString(),
        }),
      ).rejects.toThrow();
    });
  });

  describe('star', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.star({ notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID }),
      ).rejects.toThrow();
    });
  });
});
