import { describe, it, expect, beforeEach } from '@jest/globals';
import { PushService } from '../../../../src/module/application/services/impl/push.service.js';
import { NotificationEntity } from '../../../../src/module/domain/entities/notification.entity.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';
import {
  makeNotificationRepo,
  makeDeviceRepo,
  makeEventBridge,
} from '../../../helpers/mock-services.js';
import { makeFullEntityMock } from '../../../helpers/mock-entity.js';

function makeService() {
  const repo = makeNotificationRepo();
  const devices = makeDeviceRepo();
  const events = makeEventBridge();
  const svc = new PushService(repo as never, devices as never, events as never);
  return { svc, repo, devices, events };
}

function makeDevice() {
  return {
    id: '33333333-3333-3333-3333-333333333333',
    token: { value: 'tk-abcdefghijklmnop', masked: () => 'tk-***' },
    canReceivePush: () => true,
    status: { value: 'active' },
    unregister: () => {},
    pullDomainEvents: () => [],
    userId: { value: FIXED_USER_ID },
  } as never;
}

function makePushEntity(): never {
  return makeFullEntityMock({
    channel: 'push',
    hasDeviceToken: true,
    deviceToken: 'tk-abcdefghijklmnop',
  }) as never;
}

describe('PushService', () => {
  let ctx: ReturnType<typeof makeService>;
  beforeEach(() => { ctx = makeService(); });

  describe('send', () => {
    it('sends to explicit tokens', async () => {
      const r = await ctx.svc.send({
        tokens: ['tk-abcdefghijklmnop1234'],
        title: 'T',
        body: 'B',
      });
      expect(r.success).toBe(true);
      expect(r.successCount).toBe(1);
    });

    it('resolves userIds to device tokens', async () => {
      ctx.devices.findActiveByUserId.mockResolvedValueOnce([makeDevice()]);
      const r = await ctx.svc.send({
        userIds: [FIXED_USER_ID],
        title: 'T',
        body: 'B',
      });
      expect(r.successCount).toBe(1);
    });

    it('throws when no tokens', async () => {
      await expect(
        ctx.svc.send({ title: 'T', body: 'B' }),
      ).rejects.toThrow();
    });

    it('handles token failure gracefully', async () => {
      ctx.repo.save.mockRejectedValueOnce(new Error('db down'));
      const r = await ctx.svc.send({
        tokens: ['tk-abcdefghijklmnop'],
        title: 'T',
        body: 'B',
      });
      expect(r.failureCount).toBe(1);
      expect(r.success).toBe(false);
    });
  });

  describe('sendToTopic', () => {
    it('queues a topic push', async () => {
      const r = await ctx.svc.sendToTopic({
        topic: 'orders',
        title: 'T',
        body: 'B',
      });
      expect(r.success).toBe(true);
    });
  });

  describe('subscribe', () => {
    it('no-ops when token already registered', async () => {
      ctx.devices.findActiveByUserId.mockResolvedValueOnce([
        { id: '33333333-3333-3333-3333-333333333333', token: { value: 'tk-abcdefghijklmnop1234' } } as never,
      ]);
      await expect(
        ctx.svc.subscribe({
          userId: FIXED_USER_ID,
          token: 'tk-abcdefghijklmnop1234',
          platform: 'android',
        }),
      ).resolves.toBeUndefined();
    });

    it('logs when token is new', async () => {
      await expect(
        ctx.svc.subscribe({
          userId: FIXED_USER_ID,
          token: 'tk-newtokenabcdefghij',
          platform: 'ios',
        }),
      ).resolves.toBeUndefined();
    });
  });

  describe('unsubscribe', () => {
    it('unregisters when device exists', async () => {
      const d = makeDevice();
      ctx.devices.findByToken.mockResolvedValueOnce(d);
      await ctx.svc.unsubscribe('tk-abcdefghijklmnop1234');
      expect(ctx.devices.save).toHaveBeenCalled();
    });

    it('no-ops when device not found', async () => {
      await ctx.svc.unsubscribe('tk-abcdefghijklmnop1234');
      expect(ctx.devices.save).not.toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getById({ pushId: FIXED_NOTIFICATION_ID })).rejects.toThrow();
    });

    it('returns DTO when found', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(makePushEntity());
      const r = await ctx.svc.getById({ pushId: FIXED_NOTIFICATION_ID });
      expect(r.id).toBe(FIXED_NOTIFICATION_ID);
    });
  });

  describe('list', () => {
    it('returns paginated', async () => {
      const r = await ctx.svc.list({ page: 1, limit: 20 });
      expect(r.total).toBe(0);
    });

    it('maps items when present', async () => {
      ctx.repo.findPaginated.mockResolvedValueOnce({
        items: [makePushEntity()],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      } as never);
      const r = await ctx.svc.list({ page: 1, limit: 20 });
      expect(r.items.length).toBe(1);
    });
  });

  describe('retry', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.retry(FIXED_NOTIFICATION_ID, 'actor')).rejects.toThrow();
    });

    it('succeeds when exists', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(makePushEntity());
      const r = await ctx.svc.retry(FIXED_NOTIFICATION_ID, 'actor');
      expect(r.success).toBe(true);
    });
  });
});
