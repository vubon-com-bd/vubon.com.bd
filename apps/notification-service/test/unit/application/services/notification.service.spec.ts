import { NotificationService } from '@application/services/impl/notification.service.js';
import {
  createMockNotificationRepo,
  createMockEventBridge,
} from '@application-fixtures/mock-repos.fixture.js';
import { NOTIFICATION_DTO } from '@application-fixtures/dtos.fixture.js';
import {
  NotificationNotFoundApplicationError,
  NotificationSendError,
  NotificationCancelError,
} from '@application/errors/notification.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

function makeService() {
  const repo = createMockNotificationRepo();
  const bridge = createMockEventBridge();
  const svc = new NotificationService(repo as never, bridge as never);
  return { svc, repo, bridge };
}

// DTO with proper recipient target (email required for email channel)
const SEND_DTO = {
  ...NOTIFICATION_DTO.send,
  channels: ['in_app' as const], // in_app has no required recipient field
};

describe('NotificationService', () => {
  it('send queues notifications (in_app channel)', async () => {
    const { svc, repo } = makeService();
    repo.save.mockImplementation((e: unknown) => Promise.resolve(e));
    const r = await svc.send(SEND_DTO, 'actor-1');
    expect(r.success).toBe(true);
    expect(r.queuedCount).toBeGreaterThan(0);
  });

  it('send throws if save fails', async () => {
    const { svc, repo } = makeService();
    repo.save.mockRejectedValue(new Error('save fail'));
    await expect(svc.send(SEND_DTO, 'actor-1')).rejects.toBeInstanceOf(NotificationSendError);
  });

  it('sendBulk processes users', async () => {
    const { svc, repo } = makeService();
    repo.save.mockImplementation((e: unknown) => Promise.resolve(e));
    const r = await svc.sendBulk(
      { ...NOTIFICATION_DTO.sendBulk, channels: ['in_app' as const] },
      'actor-1',
    );
    expect(r.success).toBe(true);
    expect(r.queuedCount).toBeGreaterThan(0);
  });

  it('sendBulk counts failures', async () => {
    const { svc, repo } = makeService();
    let call = 0;
    repo.save.mockImplementation((e: unknown) => {
      call++;
      if (call === 1) return Promise.reject(new Error('fail'));
      return Promise.resolve(e);
    });
    const r = await svc.sendBulk(
      { ...NOTIFICATION_DTO.sendBulk, channels: ['in_app' as const] },
      'actor-1',
    );
    expect(r.failedCount).toBeGreaterThan(0);
  });

  it('getById throws NotFound on missing', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(null);
    await expect(svc.getById(IDS.notificationId)).rejects.toBeInstanceOf(NotificationNotFoundApplicationError);
  });

  it('cancel throws when not cancellable', async () => {
    const { svc, repo } = makeService();
    const entity = {
      isFailed: () => false,
      queue: () => {},
      cancel: () => { throw new Error('not cancellable'); },
    };
    repo.findByIdVO.mockResolvedValue(entity as never);
    await expect(svc.cancel(NOTIFICATION_DTO.cancel, 'actor-1')).rejects.toBeInstanceOf(NotificationCancelError);
  });

  it('resend on failed re-queues', async () => {
    const { svc, repo } = makeService();
    const entity = {
      isFailed: () => true,
      queue: jest.fn(),
      id: IDS.notificationId,
      vo: {
        userId: { value: IDS.userId }, type: { value: 'transactional' },
        category: { value: 'system' }, channel: { value: 'in_app' },
        priority: { value: 'normal' }, status: { value: 'failed' },
        subject: { value: 's' }, body: { value: 'b' }, data: { value: {} },
      },
      content: { imageUrl: null, iconUrl: null, actionUrl: null },
      actions: [],
      delivery: null,
      createdAt: DATES.now, updatedAt: DATES.now,
      scheduledAt: null, sentAt: null, deliveredAt: null, expiresAt: null,
      cancelledAt: null, cancelledBy: null, cancelledReason: null,
    };
    repo.findByIdVO.mockResolvedValue(entity as never);
    repo.save.mockResolvedValue(entity as never);
    const r = await svc.resend(NOTIFICATION_DTO.resend, 'actor-1');
    expect(r).toBeDefined();
  });

  it('countUnread delegates to repo', async () => {
    const { svc, repo } = makeService();
    repo.countUnreadForUser.mockResolvedValue(5);
    expect(await svc.countUnread(IDS.userId)).toBe(5);
  });

  it('getStats delegates', async () => {
    const { svc, repo } = makeService();
    repo.getStats.mockResolvedValue({ total: 5, unreadCount: 2, byStatus: {}, byChannel: {}, byPriority: {} });
    const r = await svc.getStats();
    expect(r.total).toBe(5);
  });

  it('list delegates', async () => {
    const { svc, repo } = makeService();
    repo.findPaginated.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10 });
    const r = await svc.list({ page: 1, limit: 10 });
    expect(r.total).toBe(0);
  });

  it('getUserFeed combines paginated + unread', async () => {
    const { svc, repo } = makeService();
    repo.findPaginated.mockResolvedValue({ items: [], total: 3, page: 1, limit: 10 });
    repo.countUnreadForUser.mockResolvedValue(2);
    const r = await svc.getUserFeed(IDS.userId, 1, 10);
    expect(r.unreadCount).toBe(2);
    expect(r.totalCount).toBe(3);
  });

  it('getPublic wraps public shape', async () => {
    const { svc, repo } = makeService();
    const entity = {
      id: IDS.notificationId,
      vo: {
        type: { value: 'transactional' }, category: { value: 'system' },
        priority: { value: 'normal' }, subject: { value: 's' }, body: { value: 'b' },
      },
      content: { imageUrl: null, actionUrl: null },
      actions: [],
      createdAt: DATES.now,
    };
    repo.findByIdVO.mockResolvedValue(entity as never);
    const r = await svc.getPublic(IDS.notificationId);
    expect(r.isRead).toBe(false);
  });

  it('getDetail delegates', async () => {
    const { svc, repo } = makeService();
    const entity = {
      id: IDS.notificationId,
      vo: {
        userId: { value: IDS.userId }, type: { value: 'transactional' },
        category: { value: 'system' }, channel: { value: 'in_app' },
        priority: { value: 'normal' }, status: { value: 'sent' },
        subject: { value: 's' }, body: { value: 'b' }, data: { value: {} },
      },
      content: { imageUrl: null, iconUrl: null, actionUrl: null },
      actions: [],
      delivery: null,
      createdAt: DATES.now, updatedAt: DATES.now,
      scheduledAt: null, sentAt: null, deliveredAt: null, expiresAt: null,
      cancelledAt: null, cancelledBy: null, cancelledReason: null,
    };
    repo.findByIdVO.mockResolvedValue(entity as never);
    const r = await svc.getDetail(IDS.notificationId);
    expect(r.notification.id).toBe(IDS.notificationId);
  });
});
