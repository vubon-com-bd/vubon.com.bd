/**
 * Branch coverage booster — notification.service.ts
 * Targets: send() with priority/no-priority, sendBulk partial fail, delivery branches
 */
import { NotificationService } from '@application/services/impl/notification.service.js';
import {
  createMockNotificationRepo,
  createMockEventBridge,
} from '@application-fixtures/mock-repos.fixture.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

function makeService() {
  const repo = createMockNotificationRepo();
  const bridge = createMockEventBridge();
  return { svc: new NotificationService(repo as never, bridge as never), repo, bridge };
}

const BASE_DTO = {
  userId: IDS.userId,
  type: 'transactional' as const,
  category: 'system' as const,
  channels: ['in_app' as const],
  subject: 'Hi',
  body: 'Body',
};

describe('NotificationService — branch coverage', () => {
  it('send with priority + data + expiry', async () => {
    const { svc, repo } = makeService();
    repo.save.mockImplementation((e) => Promise.resolve(e));
    const r = await svc.send(
      {
        ...BASE_DTO,
        priority: 'high',
        data: { k: 'v' },
        expiresAt: DATES.future24h,
      } as never,
      'a',
    );
    expect(r.success).toBe(true);
  });

  it('send with multiple channels — partial failure', async () => {
    const { svc, repo } = makeService();
    let call = 0;
    repo.save.mockImplementation((e) => {
      call++;
      if (call === 1) return Promise.reject(new Error('channel 1 fail'));
      return Promise.resolve(e);
    });
    const r = await svc.send(
      { ...BASE_DTO, channels: ['in_app', 'in_app'] } as never,
      'a',
    );
    expect(r.success).toBe(true);
    expect(r.failedCount).toBeGreaterThan(0);
  });

  it('send without actor', async () => {
    const { svc, repo } = makeService();
    repo.save.mockImplementation((e) => Promise.resolve(e));
    const r = await svc.send(BASE_DTO as never);
    expect(r.success).toBe(true);
  });

  it('resend on non-failed skips queue', async () => {
    const { svc, repo } = makeService();
    const entity = {
      isFailed: () => false,
      queue: jest.fn(),
      id: IDS.notificationId,
      vo: { userId: { value: IDS.userId }, type: { value: 'transactional' }, category: { value: 'system' }, channel: { value: 'in_app' }, priority: { value: 'normal' }, status: { value: 'sent' }, subject: { value: 's' }, body: { value: 'b' }, data: { value: {} } },
      content: { imageUrl: null, iconUrl: null, actionUrl: null },
      actions: [], delivery: null,
      createdAt: DATES.now, updatedAt: DATES.now,
      scheduledAt: null, sentAt: null, deliveredAt: null, expiresAt: null,
      cancelledAt: null, cancelledBy: null, cancelledReason: null,
    };
    repo.findByIdVO.mockResolvedValue(entity as never);
    repo.save.mockResolvedValue(entity as never);
    await svc.resend({ notificationId: IDS.notificationId, channels: ['in_app'] } as never, 'a');
    expect(entity.queue).not.toHaveBeenCalled();
  });

  it('cancel succeeds', async () => {
    const { svc, repo } = makeService();
    const entity = {
      cancel: jest.fn(),
      id: IDS.notificationId,
      vo: { userId: { value: IDS.userId }, type: { value: 'transactional' }, category: { value: 'system' }, channel: { value: 'in_app' }, priority: { value: 'normal' }, status: { value: 'cancelled' }, subject: { value: 's' }, body: { value: 'b' }, data: { value: {} } },
      content: { imageUrl: null, iconUrl: null, actionUrl: null },
      actions: [], delivery: null,
      createdAt: DATES.now, updatedAt: DATES.now,
      scheduledAt: null, sentAt: null, deliveredAt: null, expiresAt: null,
      cancelledAt: DATES.now, cancelledBy: 'a', cancelledReason: 'r',
    };
    repo.findByIdVO.mockResolvedValue(entity as never);
    repo.save.mockResolvedValue(entity as never);
    const r = await svc.cancel({ notificationId: IDS.notificationId, reason: 'r' } as never, 'a');
    expect(r).toBeDefined();
  });

  it('getUserFeed without unread', async () => {
    const { svc, repo } = makeService();
    repo.findPaginated.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10 });
    repo.countUnreadForUser.mockResolvedValue(0);
    const r = await svc.getUserFeed(IDS.userId, 1, 10);
    expect(r.unreadCount).toBe(0);
  });
});
