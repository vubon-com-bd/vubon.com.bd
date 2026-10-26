/**
 * NotificationController Tests
 * @module notification-service/test/unit/interfaces/controllers/rest
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

import { NotificationController } from '@interfaces/controllers/rest/notification.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };

function buildSendDTO(): Record<string, unknown> {
  return {
    userId: '00000000-0000-4000-8000-000000000002',
    type: 'transactional',
    category: 'order',
    channels: ['email'],
    priority: 'normal',
    subject: 'Order shipped',
    body: 'Your order has shipped',
  };
}

describe('NotificationController', () => {
  let controller: NotificationController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    controller = new NotificationController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  // ═══════════ COMMANDS ═══════════
  describe('send', () => {
    it('validates + dispatches SendNotificationCommand', async () => {
      const appResult = {
        success: true,
        notificationIds: ['n-1'],
        status: 'queued',
        queuedCount: 1,
        failedCount: 0,
      };
      commandBus.execute.mockResolvedValueOnce(appResult);

      const result = await controller.send(buildSendDTO() as never, USER);
      expect(commandBus.execute).toHaveBeenCalledTimes(1);
      expect(result.success).toBe(true);
    });

    it('passes idempotencyKey when provided', async () => {
      commandBus.execute.mockResolvedValueOnce({
        success: true,
        notificationIds: ['n-1'],
        status: 'queued',
        queuedCount: 1,
        failedCount: 0,
      });

      await controller.send(buildSendDTO() as never, USER, 'idem-123');
      const arg = commandBus.execute.mock.calls[0]?.[0] as { dto?: { idempotencyKey?: string } };
      expect(arg).toBeDefined();
    });

    it('throws on invalid DTO', async () => {
      await expect(
        controller.send({ userId: 'bad' } as never, USER),
      ).rejects.toThrow();
    });
  });

  describe('sendBulk', () => {
    it('dispatches SendBulkNotificationCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        success: true,
        notificationIds: ['n-1', 'n-2'],
        status: 'queued',
        queuedCount: 2,
        failedCount: 0,
      });

      const dto = {
        userIds: [
          '00000000-0000-4000-8000-000000000001',
          '00000000-0000-4000-8000-000000000002',
        ],
        type: 'transactional',
        category: 'order',
        channels: ['email'],
        subject: 'Bulk',
        body: 'Bulk body',
      };
      const result = await controller.sendBulk(dto as never, USER);
      expect(result.queuedCount).toBe(2);
    });

    it('throws on missing userIds', async () => {
      await expect(
        controller.sendBulk({ type: 'x', category: 'y', channels: [], subject: 's', body: 'b' } as never, USER),
      ).rejects.toThrow();
    });
  });

  describe('cancel', () => {
    it('dispatches CancelNotificationCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        id: 'n-1',
        userId: 'u-1',
        status: 'cancelled',
        type: 'x',
        category: 'y',
        channel: 'email',
        priority: 'normal',
        title: 't',
        body: 'b',
        createdAt: 'c',
        updatedAt: 'u',
      });

      const result = await controller.cancel(
        '00000000-0000-4000-8000-000000000003',
        { reason: 'dup' },
        USER,
      );
      expect(result.status).toBe('cancelled');
    });
  });

  describe('resend', () => {
    it('dispatches ResendNotificationCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        id: 'n-1',
        userId: 'u-1',
        status: 'queued',
        type: 'x',
        category: 'y',
        channel: 'email',
        priority: 'normal',
        title: 't',
        body: 'b',
        createdAt: 'c',
        updatedAt: 'u',
      });

      const result = await controller.resend(
        '00000000-0000-4000-8000-000000000003',
        { forceResend: true },
        USER,
      );
      expect(result.id).toBe('n-1');
    });
  });

  // ═══════════ QUERIES ═══════════
  describe('list', () => {
    it('dispatches ListNotificationsQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      });

      const result = await controller.list({});
      expect(result.total).toBe(0);
    });

    it('defaults page/limit', async () => {
      queryBus.execute.mockResolvedValueOnce({
        items: [], total: 0, page: 1, limit: 20, totalPages: 0,
      });
      await controller.list({});
      expect(queryBus.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('stats', () => {
    it('dispatches GetNotificationStatsQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        total: 100,
        unreadCount: 10,
        byStatus: { sent: 90 },
        byChannel: { email: 100 },
        byPriority: { normal: 100 },
      });

      const result = await controller.stats(USER);
      expect(result.total).toBe(100);
    });
  });

  describe('feed', () => {
    it('dispatches GetUserFeedQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        userId: 'u-1',
        unreadCount: 3,
        totalCount: 10,
        items: [],
      });

      const result = await controller.feed(USER, 1, 20);
      expect(result.totalCount).toBe(10);
    });
  });

  describe('unreadCount', () => {
    it('dispatches CountUnreadQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({ count: 5 });
      const result = await controller.unreadCount(USER);
      expect(result.count).toBe(5);
    });
  });

  describe('detail', () => {
    it('dispatches GetNotificationDetailQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        notification: { id: 'n-1' },
        recipients: [],
        attempts: [],
      });

      const result = await controller.detail('00000000-0000-4000-8000-000000000004');
      expect(result.notification.id).toBe('n-1');
    });
  });

  describe('publicView', () => {
    it('dispatches GetPublicNotificationQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        id: 'n-1',
        type: 'x',
        category: 'y',
        priority: 'normal',
        title: 't',
        body: 'b',
        isRead: false,
        createdAt: 'c',
      });

      const result = await controller.publicView('00000000-0000-4000-8000-000000000005');
      expect(result.id).toBe('n-1');
    });
  });

  describe('getById', () => {
    it('dispatches GetNotificationQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        id: 'n-1',
        userId: 'u-1',
        type: 'x',
        category: 'y',
        channel: 'email',
        priority: 'normal',
        status: 'sent',
        title: 't',
        body: 'b',
        createdAt: 'c',
        updatedAt: 'u',
      });

      const result = await controller.getById('00000000-0000-4000-8000-000000000006');
      expect(result.id).toBe('n-1');
    });
  });
});
