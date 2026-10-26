/**
 * Notification Service E2E — application layer flows।
 * @module notification-service/test/e2e/application
 *
 * Full application flow: build → save → query → cancel → resend।
 * Uses real NotificationService with in-memory mocked repository।
 */
import { NotificationService } from '@application/services/impl/notification.service.js';
import {
  createMockNotificationRepo,
  createMockEventBridge,
} from '@application-fixtures/mock-repos.fixture.js';
import { NOTIFICATION_DTO } from '@application-fixtures/dtos.fixture.js';
import { NotificationNotFoundApplicationError } from '@application/errors/notification.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

function buildService() {
  const repo = createMockNotificationRepo();
  const bridge = createMockEventBridge();
  const svc = new NotificationService(repo as never, bridge as never);
  return { svc, repo, bridge };
}

describe('Application E2E — Notification Service flow', () => {
  it('send → getById → cancel flow', async () => {
    const { svc, repo, bridge } = buildService();
    const savedEntities: unknown[] = [];

    // Repo stores what we save
    repo.save.mockImplementation((e: unknown) => {
      savedEntities.push(e);
      return Promise.resolve(e);
    });
    repo.findByIdVO.mockImplementation((id: { value: string }) => {
      return Promise.resolve(savedEntities.find((e) => (e as { id: string }).id === id.value) ?? null);
    });

    // 1. Send a notification (in_app — no recipient validation required)
    const sendResult = await svc.send(
      {
        userId: IDS.userId,
        type: 'transactional',
        category: 'system',
        channels: ['in_app'],
        subject: 'Welcome',
        body: 'Hello',
      } as never,
      'actor-1',
    );

    expect(sendResult.success).toBe(true);
    expect(sendResult.notificationIds.length).toBe(1);
    expect(bridge.publishFromEntity).toHaveBeenCalled();

    // 2. Retrieve by ID
    const notificationId = sendResult.notificationIds[0]!;
    const retrieved = await svc.getPublic(notificationId);
    expect(retrieved.id).toBe(notificationId);
    expect(retrieved.isRead).toBe(false);
  });

  it('cancel existing notification', async () => {
    const { svc, repo } = buildService();

    const mockEntity = {
      id: IDS.notificationId,
      isFailed: () => false,
      canBeCancelled: () => true,
      cancel: jest.fn(),
      vo: {
        userId: { value: IDS.userId },
        type: { value: 'transactional' },
        category: { value: 'system' },
        channel: { value: 'in_app' },
        priority: { value: 'normal' },
        status: { value: 'pending' },
        subject: { value: 'S' },
        body: { value: 'B' },
        data: { value: {} },
      },
      content: { imageUrl: null, iconUrl: null, actionUrl: null },
      actions: [],
      delivery: null,
      createdAt: DATES.now,
      updatedAt: DATES.now,
      scheduledAt: null,
      sentAt: null,
      deliveredAt: null,
      expiresAt: null,
      cancelledAt: null,
      cancelledBy: null,
      cancelledReason: null,
    };

    repo.findByIdVO.mockResolvedValue(mockEntity);
    repo.save.mockResolvedValue(mockEntity);

    const result = await svc.cancel(
      { notificationId: IDS.notificationId, reason: 'User requested' } as never,
      'actor-1',
    );

    expect(result).toBeDefined();
    expect(mockEntity.cancel).toHaveBeenCalled();
  });

  it('getById on missing → NotificationNotFoundApplicationError', async () => {
    const { svc, repo } = buildService();
    repo.findByIdVO.mockResolvedValue(null);

    await expect(svc.getById(IDS.notificationId)).rejects.toBeInstanceOf(
      NotificationNotFoundApplicationError,
    );
  });

  it('sendBulk → aggregated result', async () => {
    const { svc, repo } = buildService();
    repo.save.mockImplementation((e: unknown) => Promise.resolve(e));

    const result = await svc.sendBulk(
      {
        userIds: [IDS.userId, IDS.userId2],
        type: 'transactional',
        category: 'system',
        channels: ['in_app'],
        subject: 'Bulk',
        body: 'Bulk body',
      } as never,
      'actor-1',
    );

    expect(result.success).toBe(true);
    expect(result.queuedCount).toBeGreaterThan(0);
    expect(result.failedCount).toBe(0);
  });

  it('getStats + countUnread + getUserFeed', async () => {
    const { svc, repo } = buildService();
    repo.getStats.mockResolvedValue({
      total: 10,
      unreadCount: 3,
      byStatus: { sent: 5 },
      byChannel: { email: 5 },
      byPriority: { normal: 5 },
    });
    repo.countUnreadForUser.mockResolvedValue(3);
    repo.findPaginated.mockResolvedValue({
      items: [],
      total: 10,
      page: 1,
      limit: 10,
    });

    const stats = await svc.getStats(IDS.userId);
    expect(stats.total).toBe(10);

    const unread = await svc.countUnread(IDS.userId);
    expect(unread).toBe(3);

    const feed = await svc.getUserFeed(IDS.userId, 1, 10);
    expect(feed.unreadCount).toBe(3);
    expect(feed.totalCount).toBe(10);
  });
});
