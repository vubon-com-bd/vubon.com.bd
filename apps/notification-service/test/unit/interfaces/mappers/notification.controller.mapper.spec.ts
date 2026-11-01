/**
 * NotificationControllerMapper Tests
 * @module notification-service/test/unit/interfaces/mappers
 */
import { describe, expect, it } from '@jest/globals';
import { NotificationControllerMapper } from '@interfaces/mappers/notification.controller.mapper.js';

describe('NotificationControllerMapper', () => {
  // ═══════════ HTTP → App ═══════════
  describe('toSendRequestDTO', () => {
    it('converts HTTP DTO → App DTO', () => {
      const http = {
        userId: 'u-123',
        type: 'transactional',
        category: 'order',
        channels: ['email', 'push'],
        priority: 'high',
        subject: 'Order shipped',
        body: 'Your order is on the way',
        data: { orderId: 'o-1' },
      };
      const app = NotificationControllerMapper.toSendRequestDTO(http as never);
      expect(app.userId).toBe('u-123');
      expect(app.type).toBe('transactional');
      expect(app.channels).toEqual(['email', 'push']);
      expect(app.subject).toBe('Order shipped');
      expect(app.data).toEqual({ orderId: 'o-1' });
    });

    it('preserves readonly channels as mutable copy', () => {
      const channels: readonly string[] = ['email'];
      const http = {
        userId: 'u', type: 'transactional', category: 'order',
        channels, subject: 'x', body: 'y',
      };
      const app = NotificationControllerMapper.toSendRequestDTO(http as never);
      expect(app.channels).toEqual(['email']);
      expect(app.channels).not.toBe(channels);
    });
  });

  describe('toSendBulkRequestDTO', () => {
    it('converts bulk DTO', () => {
      const http = {
        userIds: ['u-1', 'u-2'],
        type: 'promotional',
        category: 'promotion',
        channels: ['email'],
        subject: 'Sale',
        body: '50% off',
      };
      const app = NotificationControllerMapper.toSendBulkRequestDTO(http as never);
      expect(app.userIds).toEqual(['u-1', 'u-2']);
      expect(app.type).toBe('promotional');
    });
  });

  describe('toCancelRequestDTO', () => {
    it('includes id + reason', () => {
      const app = NotificationControllerMapper.toCancelRequestDTO('n-1', {
        reason: 'duplicate',
      } as never);
      expect(app.notificationId).toBe('n-1');
      expect(app.reason).toBe('duplicate');
    });

    it('handles undefined reason', () => {
      const app = NotificationControllerMapper.toCancelRequestDTO('n-1', {} as never);
      expect(app.reason).toBeUndefined();
    });
  });

  describe('toResendRequestDTO', () => {
    it('preserves forceResend + channels', () => {
      const app = NotificationControllerMapper.toResendRequestDTO('n-1', {
        forceResend: true,
        channels: ['email'],
        reason: 'retry',
      } as never);
      expect(app.notificationId).toBe('n-1');
      expect(app.forceResend).toBe(true);
    });
  });

  describe('toListOptions', () => {
    it('defaults page=1, limit=20', () => {
      const opts = NotificationControllerMapper.toListOptions({} as never);
      expect(opts.page).toBe(1);
      expect(opts.limit).toBe(20);
    });

    it('preserves explicit page/limit + filters', () => {
      const opts = NotificationControllerMapper.toListOptions({
        page: 3,
        limit: 50,
        type: 'transactional',
        category: 'order',
        channel: 'email',
        status: 'sent',
        isRead: true,
        fromDate: '2026-01-01',
        toDate: '2026-12-31',
      } as never);
      expect(opts.page).toBe(3);
      expect(opts.limit).toBe(50);
      expect(opts.filter?.type).toBe('transactional');
      expect(opts.filter?.isRead).toBe(true);
    });
  });

  // ═══════════ App → HTTP ═══════════
  describe('toHttpResponse', () => {
    it('maps app response → http shape', () => {
      const app = {
        id: 'n-1',
        userId: 'u-1',
        type: 'transactional',
        category: 'order',
        channel: 'email',
        priority: 'normal',
        status: 'sent',
        title: 'Hi',
        body: 'Body',
        actions: [
          { id: 'a-1', label: 'View', type: 'primary', url: 'https://x' },
        ],
        createdAt: '2026-01-01',
        updatedAt: '2026-01-02',
      };
      const http = NotificationControllerMapper.toHttpResponse(app as never);
      expect(http.id).toBe('n-1');
      expect(http.title).toBe('Hi');
      expect(http.actions).toHaveLength(1);
    });

    it('maps delivery sub-object', () => {
      const app = {
        id: 'n-1', userId: 'u-1', type: 'x', category: 'y',
        channel: 'email', priority: 'normal', status: 'delivered',
        title: 't', body: 'b', createdAt: 'c', updatedAt: 'u',
        delivery: {
          status: 'delivered', providerName: 'sendgrid',
          providerMessageId: 'msg-1', attemptCount: 1,
        },
      };
      const http = NotificationControllerMapper.toHttpResponse(app as never);
      expect(http.delivery?.status).toBe('delivered');
      expect(http.delivery?.providerName).toBe('sendgrid');
    });

    it('maps read sub-object', () => {
      const app = {
        id: 'n-1', userId: 'u-1', type: 'x', category: 'y',
        channel: 'email', priority: 'normal', status: 'sent',
        title: 't', body: 'b', createdAt: 'c', updatedAt: 'u',
        read: { status: 'read', readAt: '2026-01-01' },
      };
      const http = NotificationControllerMapper.toHttpResponse(app as never);
      expect(http.read?.status).toBe('read');
    });
  });

  describe('toPublicHttpResponse', () => {
    it('passes through safely', () => {
      const app = {
        id: 'n-1', type: 't', category: 'c', priority: 'normal',
        title: 'T', body: 'B', isRead: false, createdAt: '2026',
      };
      const http = NotificationControllerMapper.toPublicHttpResponse(app as never);
      expect(http.id).toBe('n-1');
      expect(http.isRead).toBe(false);
    });
  });

  describe('toSummaryHttp', () => {
    it('passes through summary shape', () => {
      const app = {
        id: 'n-1', title: 'T', type: 'transactional', channel: 'email',
        status: 'sent', priority: 'normal', isRead: true, createdAt: 'c',
      };
      const http = NotificationControllerMapper.toSummaryHttp(app as never);
      expect(http.id).toBe('n-1');
    });
  });

  describe('toListHttp', () => {
    it('maps list with items', () => {
      const app = {
        items: [
          { id: 'n-1', title: 't', type: 'x', channel: 'email', status: 'sent', priority: 'normal', isRead: false, createdAt: 'c' },
        ],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
        unreadCount: 1,
      };
      const http = NotificationControllerMapper.toListHttp(app as never);
      expect(http.total).toBe(1);
      expect(http.unreadCount).toBe(1);
      expect(http.items).toHaveLength(1);
    });
  });

  describe('toStatsHttp', () => {
    it('maps stats', () => {
      const app = {
        total: 100,
        unreadCount: 10,
        byStatus: { sent: 90 },
        byChannel: { email: 100 },
        byPriority: { normal: 100 },
      };
      const http = NotificationControllerMapper.toStatsHttp(app as never);
      expect(http.total).toBe(100);
      expect(http.byStatus.sent).toBe(90);
    });
  });

  describe('toSendHttp', () => {
    it('maps send response', () => {
      const app = {
        success: true,
        notificationIds: ['n-1', 'n-2'],
        status: 'queued',
        queuedCount: 2,
        failedCount: 0,
      };
      const http = NotificationControllerMapper.toSendHttp(app as never);
      expect(http.success).toBe(true);
      expect(http.notificationIds).toHaveLength(2);
    });
  });

  describe('toDetailHttp', () => {
    it('maps detail with children', () => {
      const app = {
        notification: { id: 'n-1' },
        recipients: [{ id: 'r-1' }],
        attempts: [{ attemptNumber: 1 }],
      };
      const http = NotificationControllerMapper.toDetailHttp(app as never);
      expect(http.recipients).toHaveLength(1);
      expect(http.attempts).toHaveLength(1);
    });
  });
});
