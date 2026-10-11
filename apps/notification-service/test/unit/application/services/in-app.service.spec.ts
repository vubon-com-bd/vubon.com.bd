import { describe, it, expect, beforeEach } from '@jest/globals';
import { InAppService } from '../../../../src/module/application/services/impl/in-app.service.js';
import { NotificationEntity } from '../../../../src/module/domain/entities/notification.entity.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';
import { makeNotificationRepo, makeEventBridge } from '../../../helpers/mock-services.js';
import { makeFullEntityMock } from '../../../helpers/mock-entity.js';

function makeService() {
  const repo = makeNotificationRepo();
  const events = makeEventBridge();
  const svc = new InAppService(repo as never, events as never);
  return { svc, repo, events };
}

function makeEntity(overrides: { isRead?: boolean; userId?: string } = {}): never {
  return makeFullEntityMock({
    channel: 'in_app',
    isRead: overrides.isRead,
    userId: overrides.userId,
  }) as never;
}

describe('InAppService', () => {
  let ctx: ReturnType<typeof makeService>;
  beforeEach(() => { ctx = makeService(); });

  describe('send', () => {
    it('queues in-app notification', async () => {
      const r = await ctx.svc.send({
        userId: FIXED_USER_ID,
        type: 'toast',
        title: 'T',
        body: 'B',
      });
      expect(r.success).toBe(true);
      expect(ctx.repo.save).toHaveBeenCalled();
    });

    it('with all optional fields', async () => {
      const r = await ctx.svc.send({
        userId: FIXED_USER_ID,
        type: 'banner',
        title: 'T',
        body: 'B',
        imageUrl: 'https://x.com/i.png',
        iconUrl: 'https://x.com/ic.png',
        data: { k: 'v' },
        expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
      } as never);
      expect(r.success).toBe(true);
    });
  });

  describe('inbox', () => {
    it('returns empty inbox', async () => {
      const r = await ctx.svc.inbox({ userId: FIXED_USER_ID });
      expect(r.userId).toBe(FIXED_USER_ID);
      expect(r.unreadCount).toBe(0);
    });

    it('with unreadOnly filter', async () => {
      ctx.repo.findPaginated.mockResolvedValueOnce({
        items: [makeEntity({ isRead: false }), makeEntity({ isRead: true })],
        total: 2,
        page: 1,
        limit: 50,
        totalPages: 1,
      } as never);
      const r = await ctx.svc.inbox({ userId: FIXED_USER_ID, unreadOnly: true });
      expect(r.notifications.length).toBe(1);
    });

    it('with custom page/limit', async () => {
      const r = await ctx.svc.inbox({ userId: FIXED_USER_ID, page: 2, limit: 10 });
      expect(r.userId).toBe(FIXED_USER_ID);
    });
  });

  describe('markRead', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.markRead({ notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID }),
      ).rejects.toThrow();
    });

    it('marks unread as read', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(makeEntity({ isRead: false }));
      const r = await ctx.svc.markRead({
        notificationId: FIXED_NOTIFICATION_ID,
        userId: FIXED_USER_ID,
      });
      expect(r).toBeDefined();
    });

    it('no-op when already read', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(makeEntity({ isRead: true }));
      const r = await ctx.svc.markRead({
        notificationId: FIXED_NOTIFICATION_ID,
        userId: FIXED_USER_ID,
      });
      expect(r).toBeDefined();
    });
  });

  describe('dismiss', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.dismiss({ notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID }),
      ).rejects.toThrow();
    });

    it('marks unread as read', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(makeEntity({ isRead: false }));
      const r = await ctx.svc.dismiss({
        notificationId: FIXED_NOTIFICATION_ID,
        userId: FIXED_USER_ID,
      });
      expect(r).toBeDefined();
    });

    it('no-op when already read', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(makeEntity({ isRead: true }));
      const r = await ctx.svc.dismiss({
        notificationId: FIXED_NOTIFICATION_ID,
        userId: FIXED_USER_ID,
      });
      expect(r).toBeDefined();
    });
  });

  describe('recordClick', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.recordClick({ notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID }),
      ).rejects.toThrow();
    });

    it('records click', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(makeEntity({ isRead: false }));
      const r = await ctx.svc.recordClick({
        notificationId: FIXED_NOTIFICATION_ID,
        userId: FIXED_USER_ID,
        actionId: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
      });
      expect(r).toBeDefined();
    });

    it('no-op when already read', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(makeEntity({ isRead: true }));
      const r = await ctx.svc.recordClick({
        notificationId: FIXED_NOTIFICATION_ID,
        userId: FIXED_USER_ID,
      });
      expect(r).toBeDefined();
    });
  });

  describe('getById', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.getById(FIXED_NOTIFICATION_ID, FIXED_USER_ID),
      ).rejects.toThrow();
    });

    it('throws when user mismatch', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(
        makeEntity({ userId: '00000000-0000-0000-0000-000000000099' }),
      );
      await expect(
        ctx.svc.getById(FIXED_NOTIFICATION_ID, FIXED_USER_ID),
      ).rejects.toThrow();
    });

    it('returns DTO when owner matches', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(makeEntity());
      const r = await ctx.svc.getById(FIXED_NOTIFICATION_ID, FIXED_USER_ID);
      expect(r.id).toBe(FIXED_NOTIFICATION_ID);
    });
  });

  describe('getUnreadCount', () => {
    it('returns 0', async () => {
      const r = await ctx.svc.getUnreadCount(FIXED_USER_ID);
      expect(r).toBe(0);
    });
  });
});
