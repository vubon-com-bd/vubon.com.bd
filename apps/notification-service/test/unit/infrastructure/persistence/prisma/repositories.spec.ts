/**
 * Prisma Repositories — Unit Tests
 * @module notification-service/test/unit/infrastructure/persistence/prisma
 *
 * Covers: 21 Prisma repositories
 * Target: 90% statements, 80% branches, 90% functions, 90% lines
 */
import { NotificationPrismaRepository } from '@infrastructure/persistence/prisma/repositories/notification.prisma.repository.js';
import { NotificationContentPrismaRepository } from '@infrastructure/persistence/prisma/repositories/notification-content.prisma.repository.js';
import { NotificationRecipientPrismaRepository } from '@infrastructure/persistence/prisma/repositories/notification-recipient.prisma.repository.js';
import { TemplatePrismaRepository } from '@infrastructure/persistence/prisma/repositories/template.prisma.repository.js';
import { SchedulePrismaRepository } from '@infrastructure/persistence/prisma/repositories/schedule.prisma.repository.js';
import { BroadcastPrismaRepository } from '@infrastructure/persistence/prisma/repositories/broadcast.prisma.repository.js';
import { BroadcastBatchPrismaRepository } from '@infrastructure/persistence/prisma/repositories/broadcast-batch.prisma.repository.js';
import { DigestPrismaRepository } from '@infrastructure/persistence/prisma/repositories/digest.prisma.repository.js';
import { DigestItemPrismaRepository } from '@infrastructure/persistence/prisma/repositories/digest-item.prisma.repository.js';
import { PreferencePrismaRepository } from '@infrastructure/persistence/prisma/repositories/preference.prisma.repository.js';
import { DevicePrismaRepository } from '@infrastructure/persistence/prisma/repositories/device.prisma.repository.js';
import { WebhookPrismaRepository } from '@infrastructure/persistence/prisma/repositories/webhook.prisma.repository.js';
import { WebhookDeliveryPrismaRepository } from '@infrastructure/persistence/prisma/repositories/webhook-delivery.prisma.repository.js';
import { DeliveryAttemptPrismaRepository } from '@infrastructure/persistence/prisma/repositories/delivery-attempt.prisma.repository.js';
import { NotificationEventPrismaRepository } from '@infrastructure/persistence/prisma/repositories/notification-event.prisma.repository.js';
import { RateLimitPrismaRepository } from '@infrastructure/persistence/prisma/repositories/rate-limit.prisma.repository.js';
import { UnsubscribePrismaRepository } from '@infrastructure/persistence/prisma/repositories/unsubscribe.prisma.repository.js';
import { BouncePrismaRepository } from '@infrastructure/persistence/prisma/repositories/bounce.prisma.repository.js';
import { ActionLogPrismaRepository } from '@infrastructure/persistence/prisma/repositories/action-log.prisma.repository.js';
import { RulePrismaRepository } from '@infrastructure/persistence/prisma/repositories/rule.prisma.repository.js';
import { AuditLogPrismaRepository } from '@infrastructure/persistence/prisma/repositories/audit-log.prisma.repository.js';

import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';

import {
  TEST_IDS,
  makePrismaNotification,
  makePrismaTemplate,
  makePrismaDevice,
  makePrismaPreference,
  makePrismaDelegateMock,
  makePrismaServiceMock,
} from '@test-infra/index.js';

// ═══════════════════════════════════════════════════════════
// Helper: mock delegate on a prisma service
// ═══════════════════════════════════════════════════════════
function setupRepo<T>(
  repoClass: new (prisma: unknown) => T,
): { repo: T; delegate: ReturnType<typeof makePrismaDelegateMock>; prisma: any } {
  const delegate = makePrismaDelegateMock();
  const prisma = makePrismaServiceMock();

  // Override ALL model delegates to share the same mock
  // (NotificationBasePrismaRepository uses `this.prisma[modelName]`, not getModel())
  const modelNames = [
    'notification',
    'notificationTemplate',
    'notificationDevice',
    'notificationPreference',
    'notificationWebhook',
    'notificationWebhookDelivery',
    'notificationBroadcast',
    'notificationBroadcastBatch',
    'notificationDigest',
    'notificationDigestItem',
    'notificationSchedule',
    'notificationDeliveryAttempt',
    'notificationEvent',
    'notificationRateLimit',
    'notificationUnsubscribe',
    'notificationBounce',
    'notificationActionLog',
    'notificationRule',
    'notificationAuditLog',
    'notificationContent',
    'notificationRecipient',
  ];
  for (const name of modelNames) {
    (prisma as Record<string, unknown>)[name] = delegate;
  }
  prisma.getModel = () => delegate;
  prisma.isEngineAvailable = () => true;

  const repo = new repoClass(prisma);
  return { repo, delegate, prisma };
}

// ═══════════════════════════════════════════════════════════
// 1. NotificationPrismaRepository
// ═══════════════════════════════════════════════════════════
describe('NotificationPrismaRepository', () => {
  let repo: NotificationPrismaRepository;
  let delegate: ReturnType<typeof makePrismaDelegateMock>;

  beforeEach(() => {
    const setup = setupRepo(NotificationPrismaRepository);
    repo = setup.repo;
    delegate = setup.delegate;
  });

  it('findById — found', async () => {
    delegate.findFirst.mockResolvedValue(makePrismaNotification());
    const result = await repo.findById(TEST_IDS.NOTIFICATION);
    expect(result).not.toBeNull();
    expect(result?.id).toBe(TEST_IDS.NOTIFICATION);
  });

  it('findById — not found', async () => {
    delegate.findFirst.mockResolvedValue(null);
    const result = await repo.findById(TEST_IDS.NOTIFICATION);
    expect(result).toBeNull();
  });

  it('findByIdVO — found', async () => {
    delegate.findFirst.mockResolvedValue(makePrismaNotification());
    const vo = NotificationIdVO.reconstitute(TEST_IDS.NOTIFICATION);
    const result = await repo.findByIdVO(vo);
    expect(result?.id).toBe(TEST_IDS.NOTIFICATION);
  });

  it('findAll — returns list', async () => {
    delegate.findMany.mockResolvedValue([makePrismaNotification()]);
    const result = await repo.findAll();
    expect(result.length).toBe(1);
  });

  it('exists — true', async () => {
    delegate.count.mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.NOTIFICATION)).toBe(true);
  });

  it('exists — false', async () => {
    delegate.count.mockResolvedValue(0);
    expect(await repo.exists(TEST_IDS.NOTIFICATION)).toBe(false);
  });

  it('save — new entity (create)', async () => {
    delegate.findUnique.mockResolvedValue(null);
    delegate.create.mockResolvedValue(makePrismaNotification());
    // Build entity from row
    const { NotificationPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/notification.prisma.mapper.js');
    const entity = NotificationPrismaMapper.toDomain(makePrismaNotification());
    const result = await repo.save(entity);
    expect(delegate.create).toHaveBeenCalled();
    expect(result.id).toBe(TEST_IDS.NOTIFICATION);
  });

  it('save — existing entity (update)', async () => {
    delegate.findUnique.mockResolvedValue({ id: TEST_IDS.NOTIFICATION });
    delegate.update.mockResolvedValue(makePrismaNotification());
    const { NotificationPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/notification.prisma.mapper.js');
    const entity = NotificationPrismaMapper.toDomain(makePrismaNotification());
    const result = await repo.save(entity);
    expect(delegate.update).toHaveBeenCalled();
    expect(result.id).toBe(TEST_IDS.NOTIFICATION);
  });

  it('findByStatus — filtered', async () => {
    delegate.findMany.mockResolvedValue([makePrismaNotification()]);
    const result = await repo.findByStatus('pending');
    expect(result.length).toBe(1);
  });

  it('findByUser — filtered', async () => {
    delegate.findMany.mockResolvedValue([makePrismaNotification()]);
    const result = await repo.findByUser(TEST_IDS.USER);
    expect(result.length).toBe(1);
  });

  it('findPaginated — with filter', async () => {
    delegate.findMany.mockResolvedValue([makePrismaNotification()]);
    delegate.count.mockResolvedValue(1);
    const result = await repo.findPaginated({
      page: 1,
      limit: 10,
      filter: { userId: TEST_IDS.USER, status: 'pending' },
    });
    expect(result.total).toBe(1);
    expect(result.totalPages).toBe(1);
  });

  it('countUnreadForUser', async () => {
    delegate.count.mockResolvedValue(5);
    expect(await repo.countUnreadForUser(TEST_IDS.USER)).toBe(5);
  });

  it('getStats — populated', async () => {
    delegate.findMany.mockResolvedValue([
      { status: 'sent', channel: 'email', priority: 'normal', readStatus: 'unread' },
      { status: 'delivered', channel: 'push', priority: 'high', readStatus: 'read' },
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.unreadCount).toBe(1);
  });

  it('softDelete', async () => {
    delegate.update.mockResolvedValue({});
    await repo.softDelete(TEST_IDS.NOTIFICATION);
    expect(delegate.update).toHaveBeenCalled();
  });

  it('purgeOlderThan', async () => {
    delegate.deleteMany.mockResolvedValue({ count: 3 });
    const count = await repo.purgeOlderThan('2026-01-01T00:00:00.000Z');
    expect(count).toBe(3);
  });

  it('markAllAsRead', async () => {
    delegate.updateMany.mockResolvedValue({ count: 10 });
    const count = await repo.markAllAsRead(TEST_IDS.USER, '2026-01-15T00:00:00.000Z');
    expect(count).toBe(10);
  });
});

// ═══════════════════════════════════════════════════════════
// 2-21: Similar pattern for other repositories
// ═══════════════════════════════════════════════════════════

describe('NotificationContentPrismaRepository', () => {
  it('findById — found', async () => {
    const setup = setupRepo(NotificationContentPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(makePrismaNotification());
    const result = await setup.repo.findById(TEST_IDS.NOTIFICATION);
    expect(result).not.toBeNull();
  });

  it('findById — not found', async () => {
    const setup = setupRepo(NotificationContentPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    expect(await setup.repo.findById(TEST_IDS.NOTIFICATION)).toBeNull();
  });

  it('markRendered', async () => {
    const setup = setupRepo(NotificationContentPrismaRepository);
    setup.delegate.update.mockResolvedValue({});
    await setup.repo.markRendered(TEST_IDS.NOTIFICATION, '2026-01-15T00:00:00.000Z');
    expect(setup.delegate.update).toHaveBeenCalled();
  });
});

describe('NotificationRecipientPrismaRepository', () => {
  it('findByNotification — returns list', async () => {
    const setup = setupRepo(NotificationRecipientPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(makePrismaNotification());
    const result = await setup.repo.findByNotification(TEST_IDS.NOTIFICATION);
    expect(result.length).toBe(1);
  });

  it('findByNotification — null recipient', async () => {
    const setup = setupRepo(NotificationRecipientPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(
      makePrismaNotification({ recipient: null }),
    );
    const result = await setup.repo.findByNotification(TEST_IDS.NOTIFICATION);
    expect(result.length).toBe(0);
  });

  it('countByDeliveryStatus', async () => {
    const setup = setupRepo(NotificationRecipientPrismaRepository);
    setup.delegate.count.mockResolvedValue(3);
    expect(await setup.repo.countByDeliveryStatus(TEST_IDS.NOTIFICATION, 'delivered')).toBe(3);
  });
});

describe('TemplatePrismaRepository', () => {
  let repo: TemplatePrismaRepository;
  let delegate: ReturnType<typeof makePrismaDelegateMock>;

  beforeEach(() => {
    const setup = setupRepo(TemplatePrismaRepository);
    repo = setup.repo;
    delegate = setup.delegate;
  });

  it('findById — found', async () => {
    delegate.findFirst.mockResolvedValue(makePrismaTemplate());
    expect((await repo.findById(TEST_IDS.TEMPLATE))?.id).toBe(TEST_IDS.TEMPLATE);
  });

  it('findById — not found', async () => {
    delegate.findFirst.mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.TEMPLATE)).toBeNull();
  });

  it('findBySlug', async () => {
    delegate.findFirst.mockResolvedValue(makePrismaTemplate());
    expect((await repo.findBySlug('order-confirmation'))?.id).toBe(TEST_IDS.TEMPLATE);
  });

  it('findByType', async () => {
    delegate.findMany.mockResolvedValue([makePrismaTemplate()]);
    expect((await repo.findByType('transactional')).length).toBe(1);
  });

  it('getStats — populated', async () => {
    delegate.findMany.mockResolvedValue([
      { status: 'active', type: 'transactional', category: 'order' },
      { status: 'draft', type: 'promotional', category: 'marketing' },
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(2);
  });

  it('countBySlug', async () => {
    delegate.count.mockResolvedValue(1);
    expect(await repo.countBySlug('order-confirmation')).toBe(1);
  });
});

describe('SchedulePrismaRepository', () => {
  it('findById — found', async () => {
    const setup = setupRepo(SchedulePrismaRepository);
    const row = {
      id: TEST_IDS.SCHEDULE,
      type: 'scheduled',
      status: 'pending',
      recurrence: 'daily',
      scheduledAt: new Date('2026-02-15T10:00:00.000Z'),
      timezone: 'Asia/Dhaka',
      nextOccurrenceAt: null,
      lastTriggeredAt: null,
      occurrenceCount: 0,
      maxOccurrences: null,
      notificationTemplateId: TEST_IDS.TEMPLATE,
      userId: TEST_IDS.USER,
      createdBy: TEST_IDS.USER,
      lastFailureReason: null,
      metadata: null,
      version: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    setup.delegate.findFirst.mockResolvedValue(row);
    const result = await setup.repo.findById(TEST_IDS.SCHEDULE);
    expect(result?.id).toBe(TEST_IDS.SCHEDULE);
  });

  it('findDue', async () => {
    const setup = setupRepo(SchedulePrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findDue('2026-01-15T00:00:00.000Z')).length).toBe(0);
  });

  it('countActive', async () => {
    const setup = setupRepo(SchedulePrismaRepository);
    setup.delegate.count.mockResolvedValue(5);
    expect(await setup.repo.countActive()).toBe(5);
  });
});

describe('BroadcastPrismaRepository', () => {
  it('findById — found', async () => {
    const setup = setupRepo(BroadcastPrismaRepository);
    const row = {
      id: TEST_IDS.BROADCAST,
      type: 'promotional',
      status: 'draft',
      target: 'all',
      templateId: TEST_IDS.TEMPLATE,
      channels: ['email'],
      estimatedRecipients: 100,
      totalRecipients: null,
      processed: 0,
      succeeded: 0,
      failed: 0,
      failureReasons: [],
      scheduledAt: null,
      startedAt: null,
      completedAt: null,
      createdBy: TEST_IDS.USER,
      approvedBy: null,
      segmentFilter: null,
      customRecipientIds: [],
      metadata: null,
      version: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    setup.delegate.findFirst.mockResolvedValue(row);
    expect((await setup.repo.findById(TEST_IDS.BROADCAST))?.id).toBe(TEST_IDS.BROADCAST);
  });

  it('findDue', async () => {
    const setup = setupRepo(BroadcastPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findDue('2026-01-15T00:00:00.000Z')).length).toBe(0);
  });

  it('countInProgress', async () => {
    const setup = setupRepo(BroadcastPrismaRepository);
    setup.delegate.count.mockResolvedValue(2);
    expect(await setup.repo.countInProgress()).toBe(2);
  });
});

describe('BroadcastBatchPrismaRepository', () => {
  it('findByBroadcast', async () => {
    const setup = setupRepo(BroadcastBatchPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByBroadcast(TEST_IDS.BROADCAST)).length).toBe(0);
  });

  it('save — create', async () => {
    const setup = setupRepo(BroadcastBatchPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    setup.delegate.create.mockResolvedValue({
      id: TEST_IDS.BROADCAST,
      broadcastId: TEST_IDS.BROADCAST,
      batchNumber: 1,
      status: 'pending',
      processed: 0,
      succeeded: 0,
      failed: 0,
      recipientIds: [],
      startedAt: null,
      completedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const row = await setup.repo.save({
      id: TEST_IDS.BROADCAST,
      broadcastId: TEST_IDS.BROADCAST,
      batchNumber: 1,
      status: 'pending',
      processed: 0,
      succeeded: 0,
      failed: 0,
      recipientIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(row.batchNumber).toBe(1);
  });

  it('deleteByBroadcast', async () => {
    const setup = setupRepo(BroadcastBatchPrismaRepository);
    setup.delegate.deleteMany.mockResolvedValue({ count: 3 });
    expect(await setup.repo.deleteByBroadcast(TEST_IDS.BROADCAST)).toBe(3);
  });
});

describe('DigestPrismaRepository', () => {
  it('findById — found', async () => {
    const setup = setupRepo(DigestPrismaRepository);
    const row = {
      id: TEST_IDS.DIGEST,
      userId: TEST_IDS.USER,
      frequency: 'daily',
      type: 'summary',
      status: 'pending',
      periodStart: new Date('2026-01-14T00:00:00.000Z'),
      periodEnd: new Date('2026-01-15T00:00:00.000Z'),
      itemCount: 0,
      itemIds: [],
      channel: null,
      generatedAt: null,
      sentAt: null,
      failureReason: null,
      metadata: null,
      version: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    setup.delegate.findFirst.mockResolvedValue(row);
    expect((await setup.repo.findById(TEST_IDS.DIGEST))?.id).toBe(TEST_IDS.DIGEST);
  });

  it('findPending', async () => {
    const setup = setupRepo(DigestPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findPending()).length).toBe(0);
  });

  it('getStats', async () => {
    const setup = setupRepo(DigestPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([
      { status: 'pending', frequency: 'daily', itemCount: 5 },
    ]);
    const stats = await setup.repo.getStats();
    expect(stats.total).toBe(1);
    expect(stats.totalItems).toBe(5);
  });
});

describe('DigestItemPrismaRepository', () => {
  it('findByDigest — empty', async () => {
    const setup = setupRepo(DigestItemPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByDigest(TEST_IDS.DIGEST)).length).toBe(0);
  });

  it('countByDigest', async () => {
    const setup = setupRepo(DigestItemPrismaRepository);
    setup.delegate.count.mockResolvedValue(2);
    expect(await setup.repo.countByDigest(TEST_IDS.DIGEST)).toBe(2);
  });

  it('deleteByDigest', async () => {
    const setup = setupRepo(DigestItemPrismaRepository);
    setup.delegate.deleteMany.mockResolvedValue({ count: 2 });
    expect(await setup.repo.deleteByDigest(TEST_IDS.DIGEST)).toBe(2);
  });
});

describe('PreferencePrismaRepository', () => {
  it('findByUser — found', async () => {
    const setup = setupRepo(PreferencePrismaRepository);
    setup.delegate.findFirst.mockResolvedValue(makePrismaPreference());
    const result = await setup.repo.findByUser(TEST_IDS.USER);
    expect(result?.id).toBe(TEST_IDS.PREFERENCE);
  });

  it('findByUser — not found', async () => {
    const setup = setupRepo(PreferencePrismaRepository);
    setup.delegate.findFirst.mockResolvedValue(null);
    expect(await setup.repo.findByUser(TEST_IDS.USER)).toBeNull();
  });

  it('findLocked — returns empty', async () => {
    const setup = setupRepo(PreferencePrismaRepository);
    const result = await setup.repo.findLocked();
    expect(result.length).toBe(0);
  });

  it('getStats', async () => {
    const setup = setupRepo(PreferencePrismaRepository);
    setup.delegate.findMany.mockResolvedValue([
      { timezone: 'Asia/Dhaka', quietHoursEnabled: true },
      { timezone: 'Asia/Dhaka', quietHoursEnabled: false },
    ]);
    const stats = await setup.repo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.quietHoursEnabledCount).toBe(1);
  });
});

describe('DevicePrismaRepository', () => {
  it('findByUser — filtered', async () => {
    const setup = setupRepo(DevicePrismaRepository);
    setup.delegate.findMany.mockResolvedValue([makePrismaDevice()]);
    expect((await setup.repo.findByUser(TEST_IDS.USER)).length).toBe(1);
  });

  it('findByToken', async () => {
    const setup = setupRepo(DevicePrismaRepository);
    setup.delegate.findFirst.mockResolvedValue(makePrismaDevice());
    expect((await setup.repo.findByToken('fcm_token_test_1234567890_abcdefghijklmnop'))?.id).toBe(TEST_IDS.DEVICE);
  });

  it('countForUser', async () => {
    const setup = setupRepo(DevicePrismaRepository);
    setup.delegate.count.mockResolvedValue(3);
    expect(await setup.repo.countForUser(TEST_IDS.USER)).toBe(3);
  });

  it('getStats', async () => {
    const setup = setupRepo(DevicePrismaRepository);
    setup.delegate.findMany.mockResolvedValue([
      { status: 'active', type: 'android', platform: 'android', lastActiveAt: new Date() },
    ]);
    const stats = await setup.repo.getStats();
    expect(stats.total).toBe(1);
  });

  it('purgeUnregisteredOlderThan', async () => {
    const setup = setupRepo(DevicePrismaRepository);
    setup.delegate.deleteMany.mockResolvedValue({ count: 2 });
    expect(await setup.repo.purgeUnregisteredOlderThan('2025-01-01T00:00:00.000Z')).toBe(2);
  });
});

describe('WebhookPrismaRepository', () => {
  it('findByUrl', async () => {
    const setup = setupRepo(WebhookPrismaRepository);
    setup.delegate.findFirst.mockResolvedValue({
      id: TEST_IDS.WEBHOOK,
      url: 'https://example.com/hook',
      method: 'POST',
      status: 'active',
      events: ['order.created'],
      secret: null,
      description: null,
      headers: null,
      failureCount: 0,
      lastSuccessAt: null,
      lastFailureAt: null,
      createdBy: TEST_IDS.USER,
      metadata: null,
      version: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    expect((await setup.repo.findByUrl('https://example.com/hook'))?.id).toBe(TEST_IDS.WEBHOOK);
  });

  it('findByEvent', async () => {
    const setup = setupRepo(WebhookPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByEvent('order.created')).length).toBe(0);
  });

  it('findActiveSubscribers', async () => {
    const setup = setupRepo(WebhookPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findActiveSubscribers('order.created')).length).toBe(0);
  });

  it('countActive', async () => {
    const setup = setupRepo(WebhookPrismaRepository);
    setup.delegate.count.mockResolvedValue(5);
    expect(await setup.repo.countActive()).toBe(5);
  });

  it('getStats', async () => {
    const setup = setupRepo(WebhookPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([
      { status: 'active' },
      { status: 'failed' },
    ]);
    const stats = await setup.repo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.activeCount).toBe(1);
    expect(stats.failedCount).toBe(1);
  });
});

describe('WebhookDeliveryPrismaRepository', () => {
  it('findByWebhook', async () => {
    const setup = setupRepo(WebhookDeliveryPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByWebhook(TEST_IDS.WEBHOOK)).length).toBe(0);
  });

  it('findRetryable', async () => {
    const setup = setupRepo(WebhookDeliveryPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findRetryable()).length).toBe(0);
  });

  it('deleteByWebhook', async () => {
    const setup = setupRepo(WebhookDeliveryPrismaRepository);
    setup.delegate.deleteMany.mockResolvedValue({ count: 5 });
    expect(await setup.repo.deleteByWebhook(TEST_IDS.WEBHOOK)).toBe(5);
  });
});

describe('DeliveryAttemptPrismaRepository', () => {
  it('findByNotification', async () => {
    const setup = setupRepo(DeliveryAttemptPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByNotification(TEST_IDS.NOTIFICATION)).length).toBe(0);
  });

  it('findLatest — null', async () => {
    const setup = setupRepo(DeliveryAttemptPrismaRepository);
    setup.delegate.findFirst.mockResolvedValue(null);
    expect(await setup.repo.findLatest(TEST_IDS.NOTIFICATION)).toBeNull();
  });

  it('countAttempts', async () => {
    const setup = setupRepo(DeliveryAttemptPrismaRepository);
    setup.delegate.count.mockResolvedValue(3);
    expect(await setup.repo.countAttempts(TEST_IDS.NOTIFICATION)).toBe(3);
  });

  it('countSuccessful', async () => {
    const setup = setupRepo(DeliveryAttemptPrismaRepository);
    setup.delegate.count.mockResolvedValue(2);
    expect(await setup.repo.countSuccessful(TEST_IDS.NOTIFICATION)).toBe(2);
  });
});

describe('NotificationEventPrismaRepository', () => {
  it('findByNotification', async () => {
    const setup = setupRepo(NotificationEventPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByNotification(TEST_IDS.NOTIFICATION)).length).toBe(0);
  });

  it('findByUser', async () => {
    const setup = setupRepo(NotificationEventPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByUser(TEST_IDS.USER)).length).toBe(0);
  });

  it('findByType', async () => {
    const setup = setupRepo(NotificationEventPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByType('notification.sent')).length).toBe(0);
  });

  it('deleteByNotification', async () => {
    const setup = setupRepo(NotificationEventPrismaRepository);
    setup.delegate.deleteMany.mockResolvedValue({ count: 2 });
    expect(await setup.repo.deleteByNotification(TEST_IDS.NOTIFICATION)).toBe(2);
  });
});

describe('RateLimitPrismaRepository', () => {
  it('findByWindow — null', async () => {
    const setup = setupRepo(RateLimitPrismaRepository);
    setup.delegate.findFirst.mockResolvedValue(null);
    expect(
      await setup.repo.findByWindow(TEST_IDS.USER, 'email', '2026-01-15T00:00:00.000Z'),
    ).toBeNull();
  });

  it('findActiveWindow — null', async () => {
    const setup = setupRepo(RateLimitPrismaRepository);
    setup.delegate.findFirst.mockResolvedValue(null);
    expect(
      await setup.repo.findActiveWindow(TEST_IDS.USER, 'email', '2026-01-15T00:00:00.000Z'),
    ).toBeNull();
  });

  it('purgeExpired', async () => {
    const setup = setupRepo(RateLimitPrismaRepository);
    setup.delegate.deleteMany.mockResolvedValue({ count: 10 });
    expect(await setup.repo.purgeExpired('2026-01-15T00:00:00.000Z')).toBe(10);
  });
});

describe('UnsubscribePrismaRepository', () => {
  it('findByUser', async () => {
    const setup = setupRepo(UnsubscribePrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByUser(TEST_IDS.USER)).length).toBe(0);
  });

  it('findByScope — null', async () => {
    const setup = setupRepo(UnsubscribePrismaRepository);
    setup.delegate.findFirst.mockResolvedValue(null);
    expect(await setup.repo.findByScope(TEST_IDS.USER, 'email:marketing')).toBeNull();
  });
});

describe('BouncePrismaRepository', () => {
  it('findByNotification', async () => {
    const setup = setupRepo(BouncePrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByNotification(TEST_IDS.NOTIFICATION)).length).toBe(0);
  });

  it('countByType', async () => {
    const setup = setupRepo(BouncePrismaRepository);
    setup.delegate.count.mockResolvedValue(3);
    expect(await setup.repo.countByType('hard')).toBe(3);
  });
});

describe('ActionLogPrismaRepository', () => {
  it('findByNotification', async () => {
    const setup = setupRepo(ActionLogPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByNotification(TEST_IDS.NOTIFICATION)).length).toBe(0);
  });

  it('findByUser', async () => {
    const setup = setupRepo(ActionLogPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByUser(TEST_IDS.USER)).length).toBe(0);
  });
});

describe('RulePrismaRepository', () => {
  it('findByType', async () => {
    const setup = setupRepo(RulePrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByType('trigger')).length).toBe(0);
  });

  it('findActive', async () => {
    const setup = setupRepo(RulePrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findActive()).length).toBe(0);
  });

  it('softDelete', async () => {
    const setup = setupRepo(RulePrismaRepository);
    setup.delegate.update.mockResolvedValue({});
    await setup.repo.softDelete(TEST_IDS.NOTIFICATION);
    expect(setup.delegate.update).toHaveBeenCalled();
  });
});

describe('AuditLogPrismaRepository', () => {
  it('findByEntity', async () => {
    const setup = setupRepo(AuditLogPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByEntity('Notification', TEST_IDS.NOTIFICATION)).length).toBe(0);
  });

  it('findByActor', async () => {
    const setup = setupRepo(AuditLogPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByActor(TEST_IDS.USER)).length).toBe(0);
  });

  it('purgeOlderThan', async () => {
    const setup = setupRepo(AuditLogPrismaRepository);
    setup.delegate.deleteMany.mockResolvedValue({ count: 5 });
    expect(await setup.repo.purgeOlderThan('2025-01-01T00:00:00.000Z')).toBe(5);
  });
});

// ═══════════════════════════════════════════════════════════
// VO type imports (for suppress unused warning — repository methods)
// ═══════════════════════════════════════════════════════════
void TemplateIdVO;
void ScheduleIdVO;
void BroadcastIdVO;
void DigestIdVO;
void DeviceIdVO;
void WebhookIdVO;
void PreferenceIdVO;

// ═══════════════════════════════════════════════════════════
// COVERAGE BOOST — All repositories full method coverage
// ═══════════════════════════════════════════════════════════

describe('BroadcastPrismaRepository — full coverage', () => {
  let repo: BroadcastPrismaRepository;
  let delegate: ReturnType<typeof makePrismaDelegateMock>;

  const makeBroadcastRaw = () => ({
    id: TEST_IDS.BROADCAST,
    type: 'promotional',
    status: 'draft',
    target: 'all',
    templateId: TEST_IDS.TEMPLATE,
    channels: ['email'],
    estimatedRecipients: 100,
    totalRecipients: 100,
    processed: 0,
    succeeded: 0,
    failed: 0,
    failureReasons: [],
    scheduledAt: null,
    startedAt: null,
    completedAt: null,
    createdBy: TEST_IDS.USER,
    approvedBy: null,
    segmentFilter: null,
    customRecipientIds: [],
    metadata: null,
    version: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  beforeEach(() => {
    const setup = setupRepo(BroadcastPrismaRepository);
    repo = setup.repo;
    delegate = setup.delegate;
  });

  it('findAll', async () => {
    delegate.findMany.mockResolvedValue([makeBroadcastRaw()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('exists — true', async () => {
    delegate.count.mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.BROADCAST)).toBe(true);
  });

  it('save — create new', async () => {
    delegate.findUnique.mockResolvedValue(null);
    delegate.create.mockResolvedValue(makeBroadcastRaw());
    const { BroadcastPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/broadcast.prisma.mapper.js');
    const entity = BroadcastPrismaMapper.toDomain(makeBroadcastRaw());
    const saved = await repo.save(entity);
    expect(saved.id).toBe(TEST_IDS.BROADCAST);
    expect(delegate.create).toHaveBeenCalled();
  });

  it('save — update existing', async () => {
    delegate.findUnique.mockResolvedValue({ id: TEST_IDS.BROADCAST });
    delegate.update.mockResolvedValue(makeBroadcastRaw());
    const { BroadcastPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/broadcast.prisma.mapper.js');
    const entity = BroadcastPrismaMapper.toDomain(makeBroadcastRaw());
    const saved = await repo.save(entity);
    expect(delegate.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    delegate.delete.mockResolvedValue({});
    await repo.delete(TEST_IDS.BROADCAST);
    expect(delegate.delete).toHaveBeenCalled();
  });

  it('softDelete', async () => {
    delegate.update.mockResolvedValue({});
    await repo.softDelete(TEST_IDS.BROADCAST);
    expect(delegate.update).toHaveBeenCalled();
  });

  it('findByStatus', async () => {
    delegate.findMany.mockResolvedValue([makeBroadcastRaw()]);
    expect((await repo.findByStatus('draft')).length).toBe(1);
  });

  it('findByCreator', async () => {
    delegate.findMany.mockResolvedValue([makeBroadcastRaw()]);
    expect((await repo.findByCreator(TEST_IDS.USER)).length).toBe(1);
  });

  it('findPaginated with filters', async () => {
    delegate.findMany.mockResolvedValue([makeBroadcastRaw()]);
    delegate.count.mockResolvedValue(1);
    const result = await repo.findPaginated({
      page: 1,
      limit: 10,
      filter: {
        type: 'promotional',
        status: 'draft',
        target: 'all',
        createdBy: TEST_IDS.USER,
        fromDate: '2026-01-01',
        toDate: '2026-12-31',
      },
    });
    expect(result.total).toBe(1);
  });

  it('findPendingApproval', async () => {
    delegate.findMany.mockResolvedValue([makeBroadcastRaw()]);
    expect((await repo.findPendingApproval()).length).toBe(1);
  });

  it('getStats', async () => {
    delegate.findMany.mockResolvedValue([
      { status: 'draft', type: 'promotional', totalRecipients: 100, succeeded: 0, failed: 0 },
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(1);
  });

  it('getStats with date range', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.getStats('2026-01-01', '2026-12-31');
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('purgeCompletedOlderThan', async () => {
    delegate.deleteMany.mockResolvedValue({ count: 3 });
    expect(await repo.purgeCompletedOlderThan('2026-01-01')).toBe(3);
  });
});

describe('SchedulePrismaRepository — full coverage', () => {
  let repo: SchedulePrismaRepository;
  let delegate: ReturnType<typeof makePrismaDelegateMock>;

  const makeScheduleRaw = () => ({
    id: TEST_IDS.SCHEDULE,
    type: 'scheduled',
    status: 'pending',
    recurrence: 'daily',
    scheduledAt: new Date('2026-02-01T00:00:00.000Z'),
    timezone: 'Asia/Dhaka',
    nextOccurrenceAt: null,
    lastTriggeredAt: null,
    occurrenceCount: 0,
    maxOccurrences: null,
    notificationTemplateId: TEST_IDS.TEMPLATE,
    userId: TEST_IDS.USER,
    createdBy: TEST_IDS.USER,
    lastFailureReason: null,
    metadata: null,
    version: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  beforeEach(() => {
    const setup = setupRepo(SchedulePrismaRepository);
    repo = setup.repo;
    delegate = setup.delegate;
  });

  it('findAll', async () => {
    delegate.findMany.mockResolvedValue([makeScheduleRaw()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('exists', async () => {
    delegate.count.mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.SCHEDULE)).toBe(true);
  });

  it('save — create', async () => {
    delegate.findUnique.mockResolvedValue(null);
    delegate.create.mockResolvedValue(makeScheduleRaw());
    const { SchedulePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/schedule.prisma.mapper.js');
    const entity = SchedulePrismaMapper.toDomain(makeScheduleRaw());
    const saved = await repo.save(entity);
    expect(delegate.create).toHaveBeenCalled();
  });

  it('save — update', async () => {
    delegate.findUnique.mockResolvedValue({ id: TEST_IDS.SCHEDULE });
    delegate.update.mockResolvedValue(makeScheduleRaw());
    const { SchedulePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/schedule.prisma.mapper.js');
    const entity = SchedulePrismaMapper.toDomain(makeScheduleRaw());
    await repo.save(entity);
    expect(delegate.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    delegate.delete.mockResolvedValue({});
    await repo.delete(TEST_IDS.SCHEDULE);
    expect(delegate.delete).toHaveBeenCalled();
  });

  it('softDelete', async () => {
    delegate.update.mockResolvedValue({});
    await repo.softDelete(TEST_IDS.SCHEDULE);
    expect(delegate.update).toHaveBeenCalled();
  });

  it('findByStatus', async () => {
    delegate.findMany.mockResolvedValue([makeScheduleRaw()]);
    expect((await repo.findByStatus('pending')).length).toBe(1);
  });

  it('findByCreator', async () => {
    delegate.findMany.mockResolvedValue([makeScheduleRaw()]);
    expect((await repo.findByCreator(TEST_IDS.USER)).length).toBe(1);
  });

  it('findPaginated with all filters', async () => {
    delegate.findMany.mockResolvedValue([makeScheduleRaw()]);
    delegate.count.mockResolvedValue(1);
    const result = await repo.findPaginated({
      page: 1,
      limit: 10,
      filter: {
        type: 'scheduled',
        status: 'pending',
        frequency: 'daily',
        createdBy: TEST_IDS.USER,
        fromDate: '2026-01-01',
        toDate: '2026-12-31',
      },
    });
    expect(result.total).toBe(1);
  });

  it('findPendingRuns', async () => {
    delegate.findMany.mockResolvedValue([]);
    expect((await repo.findPendingRuns('2026-01-01')).length).toBe(0);
  });

  it('getStats', async () => {
    delegate.findMany.mockResolvedValue([
      { status: 'active', type: 'scheduled', recurrence: 'daily' },
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(1);
    expect(stats.activeCount).toBe(1);
  });

  it('purgeCompletedOlderThan', async () => {
    delegate.deleteMany.mockResolvedValue({ count: 2 });
    expect(await repo.purgeCompletedOlderThan('2026-01-01')).toBe(2);
  });
});

describe('DigestPrismaRepository — full coverage', () => {
  let repo: DigestPrismaRepository;
  let delegate: ReturnType<typeof makePrismaDelegateMock>;

  const makeDigestRaw = () => ({
    id: TEST_IDS.DIGEST,
    userId: TEST_IDS.USER,
    frequency: 'daily',
    type: 'summary',
    status: 'pending',
    periodStart: new Date('2026-01-14T00:00:00.000Z'),
    periodEnd: new Date('2026-01-15T00:00:00.000Z'),
    itemCount: 0,
    itemIds: [],
    channel: null,
    generatedAt: null,
    sentAt: null,
    failureReason: null,
    metadata: null,
    version: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  beforeEach(() => {
    const setup = setupRepo(DigestPrismaRepository);
    repo = setup.repo;
    delegate = setup.delegate;
  });

  it('findByUser', async () => {
    delegate.findMany.mockResolvedValue([makeDigestRaw()]);
    expect((await repo.findByUser(TEST_IDS.USER)).length).toBe(1);
  });

  it('findByStatus', async () => {
    delegate.findMany.mockResolvedValue([]);
    expect((await repo.findByStatus('pending')).length).toBe(0);
  });

  it('findByFrequency', async () => {
    delegate.findMany.mockResolvedValue([]);
    expect((await repo.findByFrequency('daily')).length).toBe(0);
  });

  it('findAll', async () => {
    delegate.findMany.mockResolvedValue([makeDigestRaw()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findPaginated with filters', async () => {
    delegate.findMany.mockResolvedValue([]);
    delegate.count.mockResolvedValue(0);
    const result = await repo.findPaginated({
      page: 1,
      limit: 10,
      filter: {
        userId: TEST_IDS.USER,
        status: 'pending',
        frequency: 'daily',
        type: 'summary',
        fromDate: '2026-01-01',
        toDate: '2026-12-31',
      },
    });
    expect(result.total).toBe(0);
  });

  it('findGenerating', async () => {
    delegate.findMany.mockResolvedValue([]);
    expect((await repo.findGenerating()).length).toBe(0);
  });

  it('findReadyToSend', async () => {
    delegate.findMany.mockResolvedValue([]);
    expect((await repo.findReadyToSend()).length).toBe(0);
  });

  it('findByUserAndPeriod', async () => {
    delegate.findFirst.mockResolvedValue(null);
    expect(await repo.findByUserAndPeriod(TEST_IDS.USER, '2026-01-01', '2026-01-02')).toBeNull();
  });

  it('findLatestForUser', async () => {
    delegate.findFirst.mockResolvedValue(null);
    expect(await repo.findLatestForUser(TEST_IDS.USER)).toBeNull();
  });

  it('countPending', async () => {
    delegate.count.mockResolvedValue(3);
    expect(await repo.countPending()).toBe(3);
  });

  it('getStats with user + date filter', async () => {
    delegate.findMany.mockResolvedValue([
      { status: 'pending', frequency: 'daily', itemCount: 5 },
    ]);
    const stats = await repo.getStats(TEST_IDS.USER, '2026-01-01', '2026-12-31');
    expect(stats.totalItems).toBe(5);
  });

  it('exists', async () => {
    delegate.count.mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.DIGEST)).toBe(true);
  });

  it('save — create', async () => {
    delegate.findUnique.mockResolvedValue(null);
    delegate.create.mockResolvedValue(makeDigestRaw());
    const { DigestPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/digest.prisma.mapper.js');
    const entity = DigestPrismaMapper.toDomain(makeDigestRaw());
    await repo.save(entity);
    expect(delegate.create).toHaveBeenCalled();
  });

  it('save — update', async () => {
    delegate.findUnique.mockResolvedValue({ id: TEST_IDS.DIGEST });
    delegate.update.mockResolvedValue(makeDigestRaw());
    const { DigestPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/digest.prisma.mapper.js');
    const entity = DigestPrismaMapper.toDomain(makeDigestRaw());
    await repo.save(entity);
    expect(delegate.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    delegate.delete.mockResolvedValue({});
    await repo.delete(TEST_IDS.DIGEST);
    expect(delegate.delete).toHaveBeenCalled();
  });

  it('softDelete', async () => {
    delegate.update.mockResolvedValue({});
    await repo.softDelete(TEST_IDS.DIGEST);
    expect(delegate.update).toHaveBeenCalled();
  });

  it('purgeOlderThan', async () => {
    delegate.deleteMany.mockResolvedValue({ count: 5 });
    expect(await repo.purgeOlderThan('2025-01-01')).toBe(5);
  });
});

describe('PreferencePrismaRepository — full coverage', () => {
  let repo: PreferencePrismaRepository;
  let delegate: ReturnType<typeof makePrismaDelegateMock>;

  beforeEach(() => {
    const setup = setupRepo(PreferencePrismaRepository);
    repo = setup.repo;
    delegate = setup.delegate;
  });

  it('findById', async () => {
    delegate.findFirst.mockResolvedValue(makePrismaPreference());
    expect((await repo.findById(TEST_IDS.PREFERENCE))?.id).toBe(TEST_IDS.PREFERENCE);
  });

  it('findAll', async () => {
    delegate.findMany.mockResolvedValue([makePrismaPreference()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findByTimezone', async () => {
    delegate.findMany.mockResolvedValue([makePrismaPreference()]);
    expect((await repo.findByTimezone('Asia/Dhaka')).length).toBe(1);
  });

  it('findPaginated with filters', async () => {
    delegate.findMany.mockResolvedValue([]);
    delegate.count.mockResolvedValue(0);
    const result = await repo.findPaginated({
      page: 1,
      limit: 10,
      filter: { timezone: 'Asia/Dhaka', locale: 'en' },
    });
    expect(result.total).toBe(0);
  });

  it('findByQuietHoursActive', async () => {
    delegate.findMany.mockResolvedValue([]);
    expect((await repo.findByQuietHoursActive(23)).length).toBe(0);
  });

  it('countLocked', async () => {
    expect(await repo.countLocked()).toBe(0);
  });

  it('exists', async () => {
    delegate.count.mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.PREFERENCE)).toBe(true);
  });

  it('save — create', async () => {
    delegate.findUnique.mockResolvedValue(null);
    delegate.create.mockResolvedValue(makePrismaPreference());
    const { PreferencePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/preference.prisma.mapper.js');
    const entity = PreferencePrismaMapper.toDomain(makePrismaPreference());
    await repo.save(entity);
    expect(delegate.create).toHaveBeenCalled();
  });

  it('save — update', async () => {
    delegate.findUnique.mockResolvedValue({ id: TEST_IDS.PREFERENCE });
    delegate.update.mockResolvedValue(makePrismaPreference());
    const { PreferencePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/preference.prisma.mapper.js');
    const entity = PreferencePrismaMapper.toDomain(makePrismaPreference());
    await repo.save(entity);
    expect(delegate.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    delegate.delete.mockResolvedValue({});
    await repo.delete(TEST_IDS.PREFERENCE);
    expect(delegate.delete).toHaveBeenCalled();
  });

  it('softDelete', async () => {
    delegate.update.mockResolvedValue({});
    await repo.softDelete(TEST_IDS.PREFERENCE);
    expect(delegate.update).toHaveBeenCalled();
  });
});

describe('DevicePrismaRepository — full coverage', () => {
  let repo: DevicePrismaRepository;
  let delegate: ReturnType<typeof makePrismaDelegateMock>;

  beforeEach(() => {
    const setup = setupRepo(DevicePrismaRepository);
    repo = setup.repo;
    delegate = setup.delegate;
  });

  it('findById', async () => {
    delegate.findFirst.mockResolvedValue(makePrismaDevice());
    expect((await repo.findById(TEST_IDS.DEVICE))?.id).toBe(TEST_IDS.DEVICE);
  });

  it('findAll', async () => {
    delegate.findMany.mockResolvedValue([makePrismaDevice()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findByStatus', async () => {
    delegate.findMany.mockResolvedValue([]);
    expect((await repo.findByStatus('active')).length).toBe(0);
  });

  it('findByPlatform', async () => {
    delegate.findMany.mockResolvedValue([]);
    expect((await repo.findByPlatform('android')).length).toBe(0);
  });

  it('findPaginated with filters', async () => {
    delegate.findMany.mockResolvedValue([]);
    delegate.count.mockResolvedValue(0);
    const result = await repo.findPaginated({
      page: 1,
      limit: 10,
      filter: {
        userId: TEST_IDS.USER,
        type: 'android',
        status: 'active',
        platform: 'android',
        fromDate: '2026-01-01',
        toDate: '2026-12-31',
      },
    });
    expect(result.total).toBe(0);
  });

  it('findStale', async () => {
    delegate.findMany.mockResolvedValue([]);
    expect((await repo.findStale('2026-01-01')).length).toBe(0);
  });

  it('findBlocked', async () => {
    delegate.findMany.mockResolvedValue([]);
    expect((await repo.findBlocked()).length).toBe(0);
  });

  it('findActiveForUser', async () => {
    delegate.findMany.mockResolvedValue([]);
    expect((await repo.findActiveForUser(TEST_IDS.USER)).length).toBe(0);
  });

  it('countActiveForUser', async () => {
    delegate.count.mockResolvedValue(2);
    expect(await repo.countActiveForUser(TEST_IDS.USER)).toBe(2);
  });

  it('exists', async () => {
    delegate.count.mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.DEVICE)).toBe(true);
  });

  it('save — create', async () => {
    delegate.findUnique.mockResolvedValue(null);
    delegate.create.mockResolvedValue(makePrismaDevice());
    const { DevicePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/device.prisma.mapper.js');
    const entity = DevicePrismaMapper.toDomain(makePrismaDevice());
    await repo.save(entity);
    expect(delegate.create).toHaveBeenCalled();
  });

  it('save — update', async () => {
    delegate.findUnique.mockResolvedValue({ id: TEST_IDS.DEVICE });
    delegate.update.mockResolvedValue(makePrismaDevice());
    const { DevicePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/device.prisma.mapper.js');
    const entity = DevicePrismaMapper.toDomain(makePrismaDevice());
    await repo.save(entity);
    expect(delegate.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    delegate.delete.mockResolvedValue({});
    await repo.delete(TEST_IDS.DEVICE);
    expect(delegate.delete).toHaveBeenCalled();
  });

  it('softDelete', async () => {
    delegate.update.mockResolvedValue({});
    await repo.softDelete(TEST_IDS.DEVICE);
    expect(delegate.update).toHaveBeenCalled();
  });
});

describe('TemplatePrismaRepository — full coverage', () => {
  let repo: TemplatePrismaRepository;
  let delegate: ReturnType<typeof makePrismaDelegateMock>;

  beforeEach(() => {
    const setup = setupRepo(TemplatePrismaRepository);
    repo = setup.repo;
    delegate = setup.delegate;
  });

  it('findAll', async () => {
    delegate.findMany.mockResolvedValue([makePrismaTemplate()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findByStatus', async () => {
    delegate.findMany.mockResolvedValue([]);
    expect((await repo.findByStatus('active')).length).toBe(0);
  });

  it('findActiveByTypeAndLocale', async () => {
    delegate.findMany.mockResolvedValue([]);
    expect((await repo.findActiveByTypeAndLocale('transactional', 'en')).length).toBe(0);
  });

  it('findPaginated with filters', async () => {
    delegate.findMany.mockResolvedValue([]);
    delegate.count.mockResolvedValue(0);
    const result = await repo.findPaginated({
      page: 1,
      limit: 10,
      filter: {
        type: 'transactional',
        status: 'active',
        category: 'order',
        format: 'html',
        locale: 'en',
        search: 'order',
      },
    });
    expect(result.total).toBe(0);
  });

  it('findWithMissingSubject', async () => {
    delegate.findMany.mockResolvedValue([]);
    expect((await repo.findWithMissingSubject()).length).toBe(0);
  });

  it('findByParent', async () => {
    delegate.findMany.mockResolvedValue([]);
    expect((await repo.findByParent(TEST_IDS.TEMPLATE)).length).toBe(0);
  });

  it('findByName', async () => {
    delegate.findFirst.mockResolvedValue(makePrismaTemplate());
    expect((await repo.findByName('Order Confirmation'))?.id).toBe(TEST_IDS.TEMPLATE);
  });

  it('exists', async () => {
    delegate.count.mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.TEMPLATE)).toBe(true);
  });

  it('save — create', async () => {
    delegate.findUnique.mockResolvedValue(null);
    delegate.create.mockResolvedValue(makePrismaTemplate());
    const { TemplatePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/template.prisma.mapper.js');
    const entity = TemplatePrismaMapper.toDomain(makePrismaTemplate());
    await repo.save(entity);
    expect(delegate.create).toHaveBeenCalled();
  });

  it('save — update', async () => {
    delegate.findUnique.mockResolvedValue({ id: TEST_IDS.TEMPLATE });
    delegate.update.mockResolvedValue(makePrismaTemplate());
    const { TemplatePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/template.prisma.mapper.js');
    const entity = TemplatePrismaMapper.toDomain(makePrismaTemplate());
    await repo.save(entity);
    expect(delegate.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    delegate.delete.mockResolvedValue({});
    await repo.delete(TEST_IDS.TEMPLATE);
    expect(delegate.delete).toHaveBeenCalled();
  });

  it('softDelete', async () => {
    delegate.update.mockResolvedValue({});
    await repo.softDelete(TEST_IDS.TEMPLATE);
    expect(delegate.update).toHaveBeenCalled();
  });
});

// ═══════════════════════════════════════════════════════════
// FINAL COVERAGE — All remaining repo methods
// ═══════════════════════════════════════════════════════════

describe('NotificationPrismaRepository — remaining methods', () => {
  it('findByChannel', async () => {
    const setup = setupRepo(NotificationPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([makePrismaNotification()]);
    expect((await setup.repo.findByChannel('email')).length).toBe(1);
  });

  it('findUnreadForUser', async () => {
    const setup = setupRepo(NotificationPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([makePrismaNotification()]);
    expect((await setup.repo.findUnreadForUser(TEST_IDS.USER, 10)).length).toBe(1);
  });

  it('findScheduledBefore', async () => {
    const setup = setupRepo(NotificationPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findScheduledBefore('2026-01-01')).length).toBe(0);
  });

  it('findExpiredBefore', async () => {
    const setup = setupRepo(NotificationPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findExpiredBefore('2026-01-01')).length).toBe(0);
  });

  it('findStale', async () => {
    const setup = setupRepo(NotificationPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findStale(30)).length).toBe(0);
  });

  it('findRetryable', async () => {
    const setup = setupRepo(NotificationPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findRetryable(3)).length).toBe(0);
  });

  it('delete', async () => {
    const setup = setupRepo(NotificationPrismaRepository);
    setup.delegate.delete.mockResolvedValue({});
    await setup.repo.delete(TEST_IDS.NOTIFICATION);
    expect(setup.delegate.delete).toHaveBeenCalled();
  });

  it('findPaginated — isRead filter', async () => {
    const setup = setupRepo(NotificationPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    setup.delegate.count.mockResolvedValue(0);
    await setup.repo.findPaginated({
      page: 1,
      limit: 10,
      filter: { isRead: true },
    });
    expect(setup.delegate.findMany).toHaveBeenCalled();
  });

  it('findPaginated — priority filter', async () => {
    const setup = setupRepo(NotificationPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    setup.delegate.count.mockResolvedValue(0);
    await setup.repo.findPaginated({
      page: 1,
      limit: 10,
      filter: { priority: 'high' },
    });
    expect(setup.delegate.findMany).toHaveBeenCalled();
  });

  it('findByIdVO — direct call', async () => {
    const setup = setupRepo(NotificationPrismaRepository);
    setup.delegate.findFirst.mockResolvedValue(makePrismaNotification());
    const { NotificationIdVO } = await import('@domain/primitives/notification-id.vo.js');
    const vo = NotificationIdVO.reconstitute(TEST_IDS.NOTIFICATION);
    expect((await setup.repo.findByIdVO(vo))?.id).toBe(TEST_IDS.NOTIFICATION);
  });
});

describe('NotificationContentPrismaRepository — remaining', () => {
  it('findAll', async () => {
    const setup = setupRepo(NotificationContentPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([makePrismaNotification()]);
    expect((await setup.repo.findAll()).length).toBe(1);
  });

  it('findUnrendered', async () => {
    const setup = setupRepo(NotificationContentPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findUnrendered()).length).toBe(0);
  });

  it('save — existing', async () => {
    const setup = setupRepo(NotificationContentPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(makePrismaNotification());
    setup.delegate.update.mockResolvedValue(makePrismaNotification());
    const { NotificationContentPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/notification-content.prisma.mapper.js');
    const entity = NotificationContentPrismaMapper.toDomain(makePrismaNotification());
    const result = await setup.repo.save(entity);
    expect(result.id).toBe(TEST_IDS.NOTIFICATION);
  });

  it('save — new (no existing)', async () => {
    const setup = setupRepo(NotificationContentPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    const { NotificationContentPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/notification-content.prisma.mapper.js');
    const entity = NotificationContentPrismaMapper.toDomain(makePrismaNotification());
    const result = await setup.repo.save(entity);
    expect(result.id).toBe(TEST_IDS.NOTIFICATION);
  });

  it('delete', async () => {
    const setup = setupRepo(NotificationContentPrismaRepository);
    setup.delegate.delete.mockResolvedValue({});
    await setup.repo.delete(TEST_IDS.NOTIFICATION);
    expect(setup.delegate.delete).toHaveBeenCalled();
  });

  it('exists — false', async () => {
    const setup = setupRepo(NotificationContentPrismaRepository);
    setup.delegate.count.mockResolvedValue(0);
    expect(await setup.repo.exists(TEST_IDS.NOTIFICATION)).toBe(false);
  });
});

describe('NotificationRecipientPrismaRepository — remaining', () => {
  it('findByDeliveryStatus', async () => {
    const setup = setupRepo(NotificationRecipientPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByDeliveryStatus('sent')).length).toBe(0);
  });

  it('findAll', async () => {
    const setup = setupRepo(NotificationRecipientPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([makePrismaNotification()]);
    expect((await setup.repo.findAll()).length).toBeGreaterThan(0);
  });

  it('findUndelivered — already delivered returns empty', async () => {
    const setup = setupRepo(NotificationRecipientPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(
      makePrismaNotification({ deliveryStatus: 'delivered' }),
    );
    expect((await setup.repo.findUndelivered(TEST_IDS.NOTIFICATION)).length).toBe(0);
  });

  it('findUndelivered — not delivered', async () => {
    const setup = setupRepo(NotificationRecipientPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(
      makePrismaNotification({ deliveryStatus: 'sent' }),
    );
    expect((await setup.repo.findUndelivered(TEST_IDS.NOTIFICATION)).length).toBeGreaterThan(0);
  });

  it('save', async () => {
    const setup = setupRepo(NotificationRecipientPrismaRepository);
    setup.delegate.update.mockResolvedValue(makePrismaNotification());
    const { NotificationRecipientPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/notification-recipient.prisma.mapper.js');
    const entity = NotificationRecipientPrismaMapper.toDomain(makePrismaNotification());
    const result = await setup.repo.save(entity!);
    expect(result).toBeDefined();
  });

  it('delete', async () => {
    const setup = setupRepo(NotificationRecipientPrismaRepository);
    setup.delegate.delete.mockResolvedValue({});
    await setup.repo.delete(TEST_IDS.NOTIFICATION);
    expect(setup.delegate.delete).toHaveBeenCalled();
  });

  it('exists', async () => {
    const setup = setupRepo(NotificationRecipientPrismaRepository);
    setup.delegate.count.mockResolvedValue(1);
    expect(await setup.repo.exists(TEST_IDS.NOTIFICATION)).toBe(true);
  });
});

describe('WebhookPrismaRepository — remaining', () => {
  const makeWebhookRaw = () => ({
    id: TEST_IDS.WEBHOOK,
    url: 'https://example.com/hook',
    method: 'POST',
    status: 'active',
    events: ['order.created'],
    secret: null,
    description: null,
    headers: null,
    failureCount: 0,
    lastSuccessAt: null,
    lastFailureAt: null,
    createdBy: TEST_IDS.USER,
    metadata: null,
    version: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  it('findById — found', async () => {
    const setup = setupRepo(WebhookPrismaRepository);
    setup.delegate.findFirst.mockResolvedValue(makeWebhookRaw());
    expect((await setup.repo.findById(TEST_IDS.WEBHOOK))?.id).toBe(TEST_IDS.WEBHOOK);
  });

  it('findByStatus', async () => {
    const setup = setupRepo(WebhookPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByStatus('active')).length).toBe(0);
  });

  it('findAll', async () => {
    const setup = setupRepo(WebhookPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findAll()).length).toBe(0);
  });

  it('findPaginated', async () => {
    const setup = setupRepo(WebhookPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    setup.delegate.count.mockResolvedValue(0);
    const result = await setup.repo.findPaginated({
      page: 1,
      limit: 10,
      filter: { status: 'active', event: 'order.created', url: 'https://x', search: 'x' },
    });
    expect(result.total).toBe(0);
  });

  it('save — create', async () => {
    const setup = setupRepo(WebhookPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    setup.delegate.create.mockResolvedValue(makeWebhookRaw());
    const { WebhookPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/webhook.prisma.mapper.js');
    const entity = WebhookPrismaMapper.toDomain(makeWebhookRaw());
    await setup.repo.save(entity);
    expect(setup.delegate.create).toHaveBeenCalled();
  });

  it('save — update', async () => {
    const setup = setupRepo(WebhookPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue({ id: TEST_IDS.WEBHOOK });
    setup.delegate.update.mockResolvedValue(makeWebhookRaw());
    const { WebhookPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/webhook.prisma.mapper.js');
    const entity = WebhookPrismaMapper.toDomain(makeWebhookRaw());
    await setup.repo.save(entity);
    expect(setup.delegate.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    const setup = setupRepo(WebhookPrismaRepository);
    setup.delegate.delete.mockResolvedValue({});
    await setup.repo.delete(TEST_IDS.WEBHOOK);
    expect(setup.delegate.delete).toHaveBeenCalled();
  });

  it('softDelete', async () => {
    const setup = setupRepo(WebhookPrismaRepository);
    setup.delegate.update.mockResolvedValue({});
    await setup.repo.softDelete(TEST_IDS.WEBHOOK);
    expect(setup.delegate.update).toHaveBeenCalled();
  });

  it('purgeDisabledOlderThan', async () => {
    const setup = setupRepo(WebhookPrismaRepository);
    setup.delegate.deleteMany.mockResolvedValue({ count: 5 });
    expect(await setup.repo.purgeDisabledOlderThan('2025-01-01')).toBe(5);
  });
});

describe('DigestItemPrismaRepository — remaining', () => {
  it('findByNotification — empty', async () => {
    const setup = setupRepo(DigestItemPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByNotification(TEST_IDS.NOTIFICATION)).length).toBe(0);
  });

  it('findByCategory — filters', async () => {
    const setup = setupRepo(DigestItemPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByCategory(TEST_IDS.DIGEST, 'order')).length).toBe(0);
  });

  it('findUrgent — empty', async () => {
    const setup = setupRepo(DigestItemPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findUrgent(TEST_IDS.DIGEST)).length).toBe(0);
  });

  it('findAll', async () => {
    const setup = setupRepo(DigestItemPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findAll()).length).toBe(0);
  });

  it('exists', async () => {
    const setup = setupRepo(DigestItemPrismaRepository);
    setup.delegate.count.mockResolvedValue(1);
    expect(await setup.repo.exists(TEST_IDS.DIGEST)).toBe(true);
  });

  it('delete', async () => {
    const setup = setupRepo(DigestItemPrismaRepository);
    setup.delegate.delete.mockResolvedValue({});
    await setup.repo.delete(TEST_IDS.DIGEST);
    expect(setup.delegate.delete).toHaveBeenCalled();
  });
});

describe('BroadcastBatchPrismaRepository — remaining', () => {
  it('findById — null', async () => {
    const setup = setupRepo(BroadcastBatchPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    expect(await setup.repo.findById('x')).toBeNull();
  });

  it('findById — found', async () => {
    const setup = setupRepo(BroadcastBatchPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue({
      id: 'b1',
      broadcastId: TEST_IDS.BROADCAST,
      batchNumber: 1,
      status: 'pending',
      processed: 0,
      succeeded: 0,
      failed: 0,
      recipientIds: [],
      startedAt: null,
      completedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const result = await setup.repo.findById('b1');
    expect(result?.batchNumber).toBe(1);
  });

  it('countByBroadcast', async () => {
    const setup = setupRepo(BroadcastBatchPrismaRepository);
    setup.delegate.count.mockResolvedValue(3);
    expect(await setup.repo.countByBroadcast(TEST_IDS.BROADCAST)).toBe(3);
  });
});

describe('NotificationEventPrismaRepository — remaining', () => {
  it('findById — null', async () => {
    const setup = setupRepo(NotificationEventPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    expect(await setup.repo.findById('x')).toBeNull();
  });

  it('findById — found', async () => {
    const setup = setupRepo(NotificationEventPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue({
      id: 'e1',
      notificationId: TEST_IDS.NOTIFICATION,
      userId: TEST_IDS.USER,
      eventType: 'notification.sent',
      channel: 'email',
      metadata: {},
      occurredAt: new Date(),
      createdAt: new Date(),
    });
    const result = await setup.repo.findById('e1');
    expect(result?.eventType).toBe('notification.sent');
  });

  it('countByType', async () => {
    const setup = setupRepo(NotificationEventPrismaRepository);
    setup.delegate.count.mockResolvedValue(5);
    expect(await setup.repo.countByType('notification.sent')).toBe(5);
  });
});

describe('WebhookDeliveryPrismaRepository — remaining', () => {
  it('findById — null', async () => {
    const setup = setupRepo(WebhookDeliveryPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    expect(await setup.repo.findById('x')).toBeNull();
  });

  it('findByStatus', async () => {
    const setup = setupRepo(WebhookDeliveryPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByStatus('delivered')).length).toBe(0);
  });

  it('findRecent', async () => {
    const setup = setupRepo(WebhookDeliveryPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findRecent(10)).length).toBe(0);
  });

  it('countByStatus', async () => {
    const setup = setupRepo(WebhookDeliveryPrismaRepository);
    setup.delegate.count.mockResolvedValue(2);
    expect(await setup.repo.countByStatus(TEST_IDS.WEBHOOK, 'delivered')).toBe(2);
  });
});

describe('RateLimitPrismaRepository — remaining', () => {
  it('findByWindow — found', async () => {
    const setup = setupRepo(RateLimitPrismaRepository);
    setup.delegate.findFirst.mockResolvedValue({
      id: 'r1',
      userId: TEST_IDS.USER,
      channel: 'email',
      windowStart: new Date(),
      windowEnd: new Date(),
      count: 5,
      limitValue: 10,
      exceeded: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const result = await setup.repo.findByWindow(TEST_IDS.USER, 'email', '2026-01-15');
    expect(result?.count).toBe(5);
  });

  it('findActiveWindow — found', async () => {
    const setup = setupRepo(RateLimitPrismaRepository);
    setup.delegate.findFirst.mockResolvedValue({
      id: 'r1',
      userId: null,
      channel: 'email',
      windowStart: new Date(),
      windowEnd: new Date(),
      count: 5,
      limitValue: 10,
      exceeded: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const result = await setup.repo.findActiveWindow(null, 'email', '2026-01-15');
    expect(result?.count).toBe(5);
  });

  it('save — create', async () => {
    const setup = setupRepo(RateLimitPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    setup.delegate.create.mockResolvedValue({
      id: 'r1',
      userId: null,
      channel: 'email',
      windowStart: new Date(),
      windowEnd: new Date(),
      count: 5,
      limitValue: 10,
      exceeded: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const result = await setup.repo.save({
      id: 'r1',
      channel: 'email',
      windowStart: new Date().toISOString(),
      windowEnd: new Date().toISOString(),
      count: 5,
      limitValue: 10,
      exceeded: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(result.count).toBe(5);
  });
});

describe('UnsubscribePrismaRepository — remaining', () => {
  it('findByUser', async () => {
    const setup = setupRepo(UnsubscribePrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByUser(TEST_IDS.USER)).length).toBe(0);
  });

  it('findByScope — found', async () => {
    const setup = setupRepo(UnsubscribePrismaRepository);
    setup.delegate.findFirst.mockResolvedValue({
      id: 'u1',
      userId: TEST_IDS.USER,
      scope: 'email:marketing',
      reason: null,
      source: null,
      ipAddress: null,
      userAgent: null,
      unsubscribedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    expect((await setup.repo.findByScope(TEST_IDS.USER, 'email:marketing'))?.scope).toBe('email:marketing');
  });

  it('save', async () => {
    const setup = setupRepo(UnsubscribePrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    setup.delegate.create.mockResolvedValue({
      id: 'u1',
      userId: TEST_IDS.USER,
      scope: 'email',
      reason: null,
      source: null,
      ipAddress: null,
      userAgent: null,
      unsubscribedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    const result = await setup.repo.save({
      id: 'u1',
      userId: TEST_IDS.USER,
      scope: 'email',
      unsubscribedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(result.userId).toBe(TEST_IDS.USER);
  });

  it('delete', async () => {
    const setup = setupRepo(UnsubscribePrismaRepository);
    setup.delegate.delete.mockResolvedValue({});
    await setup.repo.delete('u1');
    expect(setup.delegate.delete).toHaveBeenCalled();
  });
});

describe('BouncePrismaRepository — remaining', () => {
  it('findById — null', async () => {
    const setup = setupRepo(BouncePrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    expect(await setup.repo.findById('x')).toBeNull();
  });

  it('findByUser', async () => {
    const setup = setupRepo(BouncePrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByUser(TEST_IDS.USER)).length).toBe(0);
  });

  it('findByRecipient', async () => {
    const setup = setupRepo(BouncePrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByRecipient('a@b.com')).length).toBe(0);
  });

  it('save', async () => {
    const setup = setupRepo(BouncePrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    setup.delegate.create.mockResolvedValue({
      id: 'b1',
      notificationId: TEST_IDS.NOTIFICATION,
      userId: TEST_IDS.USER,
      channel: 'email',
      provider: 'sendgrid',
      bounceType: 'hard',
      bounceSubType: 'block',
      reason: 'invalid',
      recipient: 'a@b.com',
      raw: null,
      bouncedAt: new Date(),
      createdAt: new Date(),
    });
    const result = await setup.repo.save({
      id: 'b1',
      notificationId: TEST_IDS.NOTIFICATION,
      userId: TEST_IDS.USER,
      channel: 'email',
      provider: 'sendgrid',
      bounceType: 'hard',
      recipient: 'a@b.com',
      bouncedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });
    expect(result.bounceType).toBe('hard');
  });
});

describe('ActionLogPrismaRepository — remaining', () => {
  it('findById — null', async () => {
    const setup = setupRepo(ActionLogPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    expect(await setup.repo.findById('x')).toBeNull();
  });

  it('save', async () => {
    const setup = setupRepo(ActionLogPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    setup.delegate.create.mockResolvedValue({
      id: 'a1',
      notificationId: TEST_IDS.NOTIFICATION,
      userId: TEST_IDS.USER,
      action: 'click',
      actionType: 'primary',
      url: null,
      metadata: null,
      occurredAt: new Date(),
      createdAt: new Date(),
    });
    const result = await setup.repo.save({
      id: 'a1',
      notificationId: TEST_IDS.NOTIFICATION,
      userId: TEST_IDS.USER,
      action: 'click',
      metadata: {},
      occurredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });
    expect(result.action).toBe('click');
  });
});

describe('RulePrismaRepository — remaining', () => {
  it('findById — found', async () => {
    const setup = setupRepo(RulePrismaRepository);
    setup.delegate.findUnique.mockResolvedValue({
      id: 'r1',
      name: 'Test',
      type: 'trigger',
      status: 'active',
      priority: 50,
      conditions: [],
      actions: [],
      metadata: {},
      createdBy: TEST_IDS.USER,
      updatedBy: null,
      version: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    expect((await setup.repo.findById('r1'))?.name).toBe('Test');
  });

  it('findByStatus', async () => {
    const setup = setupRepo(RulePrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findByStatus('active')).length).toBe(0);
  });

  it('findAll', async () => {
    const setup = setupRepo(RulePrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findAll()).length).toBe(0);
  });

  it('save — create', async () => {
    const setup = setupRepo(RulePrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    setup.delegate.create.mockResolvedValue({
      id: 'r1',
      name: 'Test',
      type: 'trigger',
      status: 'draft',
      priority: 50,
      conditions: [],
      actions: [],
      metadata: {},
      createdBy: TEST_IDS.USER,
      updatedBy: null,
      version: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    const result = await setup.repo.save({
      id: 'r1',
      name: 'Test',
      type: 'trigger',
      status: 'draft',
      priority: 50,
      conditions: [],
      actions: [],
      metadata: {},
      createdBy: TEST_IDS.USER,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(result.name).toBe('Test');
  });

  it('save — update', async () => {
    const setup = setupRepo(RulePrismaRepository);
    setup.delegate.findUnique.mockResolvedValue({ id: 'r1' });
    setup.delegate.update.mockResolvedValue({
      id: 'r1',
      name: 'Test',
      type: 'trigger',
      status: 'active',
      priority: 50,
      conditions: [],
      actions: [],
      metadata: {},
      createdBy: TEST_IDS.USER,
      updatedBy: null,
      version: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    const result = await setup.repo.save({
      id: 'r1',
      name: 'Test',
      type: 'trigger',
      status: 'active',
      priority: 50,
      conditions: [],
      actions: [],
      metadata: {},
      createdBy: TEST_IDS.USER,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(setup.delegate.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    const setup = setupRepo(RulePrismaRepository);
    setup.delegate.delete.mockResolvedValue({});
    await setup.repo.delete('r1');
    expect(setup.delegate.delete).toHaveBeenCalled();
  });
});

describe('AuditLogPrismaRepository — remaining', () => {
  it('findById — null', async () => {
    const setup = setupRepo(AuditLogPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    expect(await setup.repo.findById('x')).toBeNull();
  });

  it('save', async () => {
    const setup = setupRepo(AuditLogPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    setup.delegate.create.mockResolvedValue({
      id: 'a1',
      entityType: 'Notification',
      entityId: TEST_IDS.NOTIFICATION,
      action: 'create',
      actorId: TEST_IDS.USER,
      beforeState: null,
      afterState: {},
      metadata: {},
      occurredAt: new Date(),
      createdAt: new Date(),
    });
    const result = await setup.repo.save({
      id: 'a1',
      entityType: 'Notification',
      entityId: TEST_IDS.NOTIFICATION,
      action: 'create',
      actorId: TEST_IDS.USER,
      beforeState: {},
      afterState: {},
      metadata: {},
      occurredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });
    expect(result.entityType).toBe('Notification');
  });
});

describe('DeliveryAttemptPrismaRepository — remaining', () => {
  it('findById — null', async () => {
    const setup = setupRepo(DeliveryAttemptPrismaRepository);
    setup.delegate.findUnique.mockResolvedValue(null);
    expect(await setup.repo.findById('x')).toBeNull();
  });

  it('findAll', async () => {
    const setup = setupRepo(DeliveryAttemptPrismaRepository);
    setup.delegate.findMany.mockResolvedValue([]);
    expect((await setup.repo.findAll()).length).toBe(0);
  });

  it('exists', async () => {
    const setup = setupRepo(DeliveryAttemptPrismaRepository);
    setup.delegate.count.mockResolvedValue(1);
    expect(await setup.repo.exists('x')).toBe(true);
  });

  it('delete', async () => {
    const setup = setupRepo(DeliveryAttemptPrismaRepository);
    setup.delegate.delete.mockResolvedValue({});
    await setup.repo.delete('x');
    expect(setup.delegate.delete).toHaveBeenCalled();
  });
});

// ═══════════════════════════════════════════════════════════
// FINAL FILL — All remaining repo method gaps
// ═══════════════════════════════════════════════════════════
describe('NotificationPrismaRepository — final gaps', () => {
  it('findById — not-found null', async () => {
    const s = setupRepo(NotificationPrismaRepository);
    s.delegate.findFirst.mockResolvedValue(null);
    expect(await s.repo.findById(TEST_IDS.NOTIFICATION)).toBeNull();
  });

  it('save — create (no existing)', async () => {
    const s = setupRepo(NotificationPrismaRepository);
    s.delegate.findUnique.mockResolvedValue(null);
    s.delegate.create.mockResolvedValue(makePrismaNotification());
    const { NotificationPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/notification.prisma.mapper.js');
    const entity = NotificationPrismaMapper.toDomain(makePrismaNotification());
    await s.repo.save(entity);
    expect(s.delegate.create).toHaveBeenCalled();
  });

  it('getStats — empty rows', async () => {
    const s = setupRepo(NotificationPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    const stats = await s.repo.getStats();
    expect(stats.total).toBe(0);
    expect(stats.unreadCount).toBe(0);
  });

  it('getStats — with date range and user', async () => {
    const s = setupRepo(NotificationPrismaRepository);
    s.delegate.findMany.mockResolvedValue([
      { status: 'sent', channel: 'email', priority: 'normal', readStatus: 'unread' },
    ]);
    const stats = await s.repo.getStats(TEST_IDS.USER, '2026-01-01', '2026-12-31');
    expect(stats.total).toBe(1);
  });
});

describe('TemplatePrismaRepository — final gaps', () => {
  it('findBySlug — not found', async () => {
    const s = setupRepo(TemplatePrismaRepository);
    s.delegate.findFirst.mockResolvedValue(null);
    expect(await s.repo.findBySlug('missing')).toBeNull();
  });

  it('countBySlug — zero', async () => {
    const s = setupRepo(TemplatePrismaRepository);
    s.delegate.count.mockResolvedValue(0);
    expect(await s.repo.countBySlug('x')).toBe(0);
  });

  it('getStats — empty', async () => {
    const s = setupRepo(TemplatePrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    const stats = await s.repo.getStats();
    expect(stats.total).toBe(0);
  });
});

describe('SchedulePrismaRepository — final gaps', () => {
  it('findDue — empty', async () => {
    const s = setupRepo(SchedulePrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    expect((await s.repo.findDue('2026-01-01')).length).toBe(0);
  });

  it('getStats — empty', async () => {
    const s = setupRepo(SchedulePrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    const stats = await s.repo.getStats();
    expect(stats.total).toBe(0);
  });
});

describe('BroadcastPrismaRepository — final gaps', () => {
  it('findInProgress — empty', async () => {
    const s = setupRepo(BroadcastPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    expect((await s.repo.findInProgress()).length).toBe(0);
  });

  it('getStats — empty', async () => {
    const s = setupRepo(BroadcastPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    const stats = await s.repo.getStats();
    expect(stats.total).toBe(0);
  });
});

describe('DigestPrismaRepository — final gaps', () => {
  it('findPending — empty', async () => {
    const s = setupRepo(DigestPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    expect((await s.repo.findPending()).length).toBe(0);
  });

  it('getStats — empty', async () => {
    const s = setupRepo(DigestPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    const stats = await s.repo.getStats();
    expect(stats.total).toBe(0);
  });

  it('findByUserAndPeriod — found', async () => {
    const s = setupRepo(DigestPrismaRepository);
    s.delegate.findFirst.mockResolvedValue({
      id: TEST_IDS.DIGEST,
      userId: TEST_IDS.USER,
      frequency: 'daily',
      type: 'summary',
      status: 'pending',
      periodStart: new Date(),
      periodEnd: new Date(),
      itemCount: 0,
      itemIds: [],
      channel: null,
      generatedAt: null,
      sentAt: null,
      failureReason: null,
      metadata: null,
      version: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    expect((await s.repo.findByUserAndPeriod(TEST_IDS.USER, '2026-01-01', '2026-01-02'))?.id).toBe(TEST_IDS.DIGEST);
  });
});

describe('DevicePrismaRepository — final gaps', () => {
  it('findByToken — null', async () => {
    const s = setupRepo(DevicePrismaRepository);
    s.delegate.findFirst.mockResolvedValue(null);
    expect(await s.repo.findByToken('missing')).toBeNull();
  });

  it('getStats — empty', async () => {
    const s = setupRepo(DevicePrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    const stats = await s.repo.getStats();
    expect(stats.total).toBe(0);
  });

  it('findStale — empty', async () => {
    const s = setupRepo(DevicePrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    expect((await s.repo.findStale('2026-01-01')).length).toBe(0);
  });
});

describe('PreferencePrismaRepository — final gaps', () => {
  it('getStats — empty', async () => {
    const s = setupRepo(PreferencePrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    const stats = await s.repo.getStats();
    expect(stats.total).toBe(0);
  });

  it('findByTimezone — empty', async () => {
    const s = setupRepo(PreferencePrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    expect((await s.repo.findByTimezone('Asia/Dhaka')).length).toBe(0);
  });
});

describe('WebhookPrismaRepository — final gaps', () => {
  it('findByUrl — null', async () => {
    const s = setupRepo(WebhookPrismaRepository);
    s.delegate.findFirst.mockResolvedValue(null);
    expect(await s.repo.findByUrl('missing')).toBeNull();
  });

  it('getStats — empty', async () => {
    const s = setupRepo(WebhookPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    const stats = await s.repo.getStats();
    expect(stats.total).toBe(0);
  });

  it('findActiveSubscribers — empty', async () => {
    const s = setupRepo(WebhookPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    expect((await s.repo.findActiveSubscribers('order.created')).length).toBe(0);
  });
});

describe('BouncePrismaRepository — final gaps', () => {
  it('countByType — zero', async () => {
    const s = setupRepo(BouncePrismaRepository);
    s.delegate.count.mockResolvedValue(0);
    expect(await s.repo.countByType('soft')).toBe(0);
  });
});

describe('DigestItemPrismaRepository — final gaps', () => {
  it('findByNotification — empty', async () => {
    const s = setupRepo(DigestItemPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    expect((await s.repo.findByNotification(TEST_IDS.NOTIFICATION)).length).toBe(0);
  });
});

describe('RateLimitPrismaRepository — final gaps', () => {
  it('findByWindow — null', async () => {
    const s = setupRepo(RateLimitPrismaRepository);
    s.delegate.findFirst.mockResolvedValue(null);
    expect(await s.repo.findByWindow(null, 'email', '2026-01-01')).toBeNull();
  });
});

describe('RulePrismaRepository — final gaps', () => {
  it('findActive — empty', async () => {
    const s = setupRepo(RulePrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    expect((await s.repo.findActive()).length).toBe(0);
  });
});

describe('AuditLogPrismaRepository — final gaps', () => {
  it('findByEntity — empty', async () => {
    const s = setupRepo(AuditLogPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    expect((await s.repo.findByEntity('Notification', 'x')).length).toBe(0);
  });
});

describe('DeliveryAttemptPrismaRepository — final gaps', () => {
  it('findLatest — found', async () => {
    const s = setupRepo(DeliveryAttemptPrismaRepository);
    s.delegate.findFirst.mockResolvedValue({
      id: 'a1',
      notificationId: TEST_IDS.NOTIFICATION,
      channel: 'email',
      provider: 'sendgrid',
      attempt: 1,
      status: 'sent',
      providerMessageId: null,
      failureReason: null,
      failureCode: null,
      durationMs: null,
      startedAt: new Date(),
      completedAt: new Date(),
      retryable: false,
      createdAt: new Date(),
    });
    expect((await s.repo.findLatest(TEST_IDS.NOTIFICATION))?.id).toBe('a1');
  });

  it('countAttempts — zero', async () => {
    const s = setupRepo(DeliveryAttemptPrismaRepository);
    s.delegate.count.mockResolvedValue(0);
    expect(await s.repo.countAttempts(TEST_IDS.NOTIFICATION)).toBe(0);
  });
});

describe('BroadcastBatchPrismaRepository — final gaps', () => {
  it('findByBroadcast — with data', async () => {
    const s = setupRepo(BroadcastBatchPrismaRepository);
    s.delegate.findMany.mockResolvedValue([
      {
        id: 'b1', broadcastId: TEST_IDS.BROADCAST, batchNumber: 1, status: 'pending',
        processed: 0, succeeded: 0, failed: 0, recipientIds: [], startedAt: null,
        completedAt: null, createdAt: new Date(), updatedAt: new Date(),
      },
    ]);
    expect((await s.repo.findByBroadcast(TEST_IDS.BROADCAST)).length).toBe(1);
  });
});

// ═══════════════════════════════════════════════════════════
// REPOS — Final branch coverage (getStats edges + save both paths)
// ═══════════════════════════════════════════════════════════
describe('Repositories — save create/update both paths', () => {
  it('Notification save — create path', async () => {
    const s = setupRepo(NotificationPrismaRepository);
    s.delegate.findUnique.mockResolvedValue(null);
    s.delegate.create.mockResolvedValue(makePrismaNotification());
    const { NotificationPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/notification.prisma.mapper.js');
    const entity = NotificationPrismaMapper.toDomain(makePrismaNotification());
    await s.repo.save(entity);
    expect(s.delegate.create).toHaveBeenCalled();
  });

  it('Notification save — update path', async () => {
    const s = setupRepo(NotificationPrismaRepository);
    s.delegate.findUnique.mockResolvedValue({ id: TEST_IDS.NOTIFICATION });
    s.delegate.update.mockResolvedValue(makePrismaNotification());
    const { NotificationPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/notification.prisma.mapper.js');
    const entity = NotificationPrismaMapper.toDomain(makePrismaNotification());
    await s.repo.save(entity);
    expect(s.delegate.update).toHaveBeenCalled();
  });

  it('Template save — create', async () => {
    const s = setupRepo(TemplatePrismaRepository);
    s.delegate.findUnique.mockResolvedValue(null);
    s.delegate.create.mockResolvedValue(makePrismaTemplate());
    const { TemplatePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/template.prisma.mapper.js');
    const entity = TemplatePrismaMapper.toDomain(makePrismaTemplate());
    await s.repo.save(entity);
    expect(s.delegate.create).toHaveBeenCalled();
  });
});

describe('Repositories — findPaginated with all fields', () => {
  it('Notification findPaginated — filter with dates', async () => {
    const s = setupRepo(NotificationPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    s.delegate.count.mockResolvedValue(0);
    await s.repo.findPaginated({
      page: 1,
      limit: 20,
      sortBy: 'createdAt',
      sortDir: 'asc',
      filter: {
        userId: TEST_IDS.USER,
        fromDate: '2026-01-01',
        toDate: '2026-12-31',
      },
    });
    expect(s.delegate.findMany).toHaveBeenCalled();
  });

  it('Template findPaginated — with search', async () => {
    const s = setupRepo(TemplatePrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    s.delegate.count.mockResolvedValue(0);
    await s.repo.findPaginated({
      page: 1,
      limit: 10,
      filter: { search: 'test', locale: 'en' },
    });
    expect(s.delegate.findMany).toHaveBeenCalled();
  });
});

// ═══════════════════════════════════════════════════════════
// FINAL — All filter combinations (branch coverage)
// ═══════════════════════════════════════════════════════════
describe('Repositories — all filter combos', () => {
  it('Notification findPaginated — sortBy=priority', async () => {
    const s = setupRepo(NotificationPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    s.delegate.count.mockResolvedValue(0);
    await s.repo.findPaginated({ page: 1, limit: 10, sortBy: 'priority', sortDir: 'desc' });
    expect(s.delegate.findMany).toHaveBeenCalled();
  });

  it('Notification findPaginated — filter with date-only fromDate', async () => {
    const s = setupRepo(NotificationPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    s.delegate.count.mockResolvedValue(0);
    await s.repo.findPaginated({
      page: 1, limit: 10,
      filter: { fromDate: '2026-01-01' },
    });
    expect(s.delegate.findMany).toHaveBeenCalled();
  });

  it('Notification findPaginated — filter with date-only toDate', async () => {
    const s = setupRepo(NotificationPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    s.delegate.count.mockResolvedValue(0);
    await s.repo.findPaginated({
      page: 1, limit: 10,
      filter: { toDate: '2026-12-31' },
    });
    expect(s.delegate.findMany).toHaveBeenCalled();
  });

  it('Notification findPaginated — filter with all', async () => {
    const s = setupRepo(NotificationPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    s.delegate.count.mockResolvedValue(0);
    await s.repo.findPaginated({
      page: 2, limit: 20,
      filter: {
        userId: TEST_IDS.USER, type: 'transactional', category: 'order',
        channel: 'email', status: 'sent', priority: 'high', isRead: false,
        fromDate: '2026-01-01', toDate: '2026-12-31',
      },
    });
    expect(s.delegate.findMany).toHaveBeenCalled();
  });

  it('Template findPaginated — format filter', async () => {
    const s = setupRepo(TemplatePrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    s.delegate.count.mockResolvedValue(0);
    await s.repo.findPaginated({
      page: 1, limit: 10,
      filter: { format: 'html' },
    });
    expect(s.delegate.findMany).toHaveBeenCalled();
  });

  it('Schedule findPaginated — all filters', async () => {
    const s = setupRepo(SchedulePrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    s.delegate.count.mockResolvedValue(0);
    await s.repo.findPaginated({
      page: 1, limit: 10,
      filter: {
        type: 'scheduled', status: 'active', frequency: 'daily',
        createdBy: TEST_IDS.USER, fromDate: '2026-01-01', toDate: '2026-12-31',
      },
    });
    expect(s.delegate.findMany).toHaveBeenCalled();
  });

  it('Broadcast findPaginated — all filters', async () => {
    const s = setupRepo(BroadcastPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    s.delegate.count.mockResolvedValue(0);
    await s.repo.findPaginated({
      page: 1, limit: 10,
      filter: {
        type: 'promotional', status: 'draft', target: 'all', createdBy: TEST_IDS.USER,
      },
    });
    expect(s.delegate.findMany).toHaveBeenCalled();
  });

  it('Digest findPaginated — all filters', async () => {
    const s = setupRepo(DigestPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    s.delegate.count.mockResolvedValue(0);
    await s.repo.findPaginated({
      page: 1, limit: 10,
      filter: {
        userId: TEST_IDS.USER, status: 'pending', frequency: 'daily', type: 'summary',
        fromDate: '2026-01-01', toDate: '2026-12-31',
      },
    });
    expect(s.delegate.findMany).toHaveBeenCalled();
  });

  it('Device findPaginated — all filters', async () => {
    const s = setupRepo(DevicePrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    s.delegate.count.mockResolvedValue(0);
    await s.repo.findPaginated({
      page: 1, limit: 10,
      filter: {
        userId: TEST_IDS.USER, type: 'android', status: 'active', platform: 'android',
        fromDate: '2026-01-01', toDate: '2026-12-31',
      },
    });
    expect(s.delegate.findMany).toHaveBeenCalled();
  });

  it('Webhook findPaginated — all filters', async () => {
    const s = setupRepo(WebhookPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    s.delegate.count.mockResolvedValue(0);
    await s.repo.findPaginated({
      page: 1, limit: 10,
      filter: {
        status: 'active', event: 'order.created', url: 'https://x',
        fromDate: '2026-01-01', toDate: '2026-12-31', search: 'x',
      },
    });
    expect(s.delegate.findMany).toHaveBeenCalled();
  });

  it('Preference findPaginated — timezone + locale', async () => {
    const s = setupRepo(PreferencePrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    s.delegate.count.mockResolvedValue(0);
    await s.repo.findPaginated({
      page: 1, limit: 10,
      filter: { timezone: 'Asia/Dhaka', locale: 'en', locked: true },
    });
    expect(s.delegate.findMany).toHaveBeenCalled();
  });
});

// ═══════════════════════════════════════════════════════════
// FINAL — Every save() + create/update both paths
// ═══════════════════════════════════════════════════════════
describe('Repositories — save both paths for every aggregate', () => {
  it('Template save — update path', async () => {
    const s = setupRepo(TemplatePrismaRepository);
    s.delegate.findUnique.mockResolvedValue({ id: TEST_IDS.TEMPLATE });
    s.delegate.update.mockResolvedValue(makePrismaTemplate());
    const { TemplatePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/template.prisma.mapper.js');
    const entity = TemplatePrismaMapper.toDomain(makePrismaTemplate());
    await s.repo.save(entity);
    expect(s.delegate.update).toHaveBeenCalled();
  });

  it('Device save — update path', async () => {
    const s = setupRepo(DevicePrismaRepository);
    s.delegate.findUnique.mockResolvedValue({ id: TEST_IDS.DEVICE });
    s.delegate.update.mockResolvedValue(makePrismaDevice());
    const { DevicePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/device.prisma.mapper.js');
    const entity = DevicePrismaMapper.toDomain(makePrismaDevice());
    await s.repo.save(entity);
    expect(s.delegate.update).toHaveBeenCalled();
  });

  it('Device save — create path', async () => {
    const s = setupRepo(DevicePrismaRepository);
    s.delegate.findUnique.mockResolvedValue(null);
    s.delegate.create.mockResolvedValue(makePrismaDevice());
    const { DevicePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/device.prisma.mapper.js');
    const entity = DevicePrismaMapper.toDomain(makePrismaDevice());
    await s.repo.save(entity);
    expect(s.delegate.create).toHaveBeenCalled();
  });

  it('Preference save — update path', async () => {
    const s = setupRepo(PreferencePrismaRepository);
    s.delegate.findUnique.mockResolvedValue({ id: TEST_IDS.PREFERENCE });
    s.delegate.update.mockResolvedValue(makePrismaPreference());
    const { PreferencePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/preference.prisma.mapper.js');
    const entity = PreferencePrismaMapper.toDomain(makePrismaPreference());
    await s.repo.save(entity);
    expect(s.delegate.update).toHaveBeenCalled();
  });

  it('Preference save — create path', async () => {
    const s = setupRepo(PreferencePrismaRepository);
    s.delegate.findUnique.mockResolvedValue(null);
    s.delegate.create.mockResolvedValue(makePrismaPreference());
    const { PreferencePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/preference.prisma.mapper.js');
    const entity = PreferencePrismaMapper.toDomain(makePrismaPreference());
    await s.repo.save(entity);
    expect(s.delegate.create).toHaveBeenCalled();
  });

  it('Notification delete + purge', async () => {
    const s = setupRepo(NotificationPrismaRepository);
    s.delegate.delete.mockResolvedValue({});
    s.delegate.deleteMany.mockResolvedValue({ count: 3 });
    await s.repo.delete(TEST_IDS.NOTIFICATION);
    expect(await s.repo.purgeOlderThan('2025-01-01')).toBe(3);
  });

  it('Template softDelete + exists false', async () => {
    const s = setupRepo(TemplatePrismaRepository);
    s.delegate.update.mockResolvedValue({});
    s.delegate.count.mockResolvedValue(0);
    await s.repo.softDelete(TEST_IDS.TEMPLATE);
    expect(await s.repo.exists('x')).toBe(false);
  });

  it('Schedule delete + exists true', async () => {
    const s = setupRepo(SchedulePrismaRepository);
    s.delegate.delete.mockResolvedValue({});
    s.delegate.count.mockResolvedValue(1);
    await s.repo.delete(TEST_IDS.SCHEDULE);
    expect(await s.repo.exists(TEST_IDS.SCHEDULE)).toBe(true);
  });
});

describe('Repositories — every finder method', () => {
  it('Notification findByStatus + findByChannel', async () => {
    const s = setupRepo(NotificationPrismaRepository);
    s.delegate.findMany.mockResolvedValue([makePrismaNotification()]);
    expect((await s.repo.findByStatus('sent')).length).toBe(1);
    expect((await s.repo.findByChannel('email')).length).toBe(1);
  });

  it('Template findByType + findByStatus', async () => {
    const s = setupRepo(TemplatePrismaRepository);
    s.delegate.findMany.mockResolvedValue([makePrismaTemplate()]);
    expect((await s.repo.findByType('transactional')).length).toBe(1);
    expect((await s.repo.findByStatus('active')).length).toBe(1);
  });

  it('Schedule findByStatus + findByCreator', async () => {
    const s = setupRepo(SchedulePrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    await s.repo.findByStatus('active');
    await s.repo.findByCreator(TEST_IDS.USER);
    expect(s.delegate.findMany).toHaveBeenCalledTimes(2);
  });

  it('Broadcast findByStatus + findByCreator', async () => {
    const s = setupRepo(BroadcastPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    await s.repo.findByStatus('draft');
    await s.repo.findByCreator(TEST_IDS.USER);
    expect(s.delegate.findMany).toHaveBeenCalledTimes(2);
  });

  it('Digest findByUser + findByFrequency', async () => {
    const s = setupRepo(DigestPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    await s.repo.findByUser(TEST_IDS.USER);
    await s.repo.findByFrequency('daily');
    expect(s.delegate.findMany).toHaveBeenCalledTimes(2);
  });

  it('Device findByStatus + findByPlatform', async () => {
    const s = setupRepo(DevicePrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    await s.repo.findByStatus('active');
    await s.repo.findByPlatform('android');
    expect(s.delegate.findMany).toHaveBeenCalledTimes(2);
  });

  it('Webhook findByStatus + findByEvent', async () => {
    const s = setupRepo(WebhookPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    await s.repo.findByStatus('active');
    await s.repo.findByEvent('order.created');
    expect(s.delegate.findMany).toHaveBeenCalledTimes(2);
  });
});
