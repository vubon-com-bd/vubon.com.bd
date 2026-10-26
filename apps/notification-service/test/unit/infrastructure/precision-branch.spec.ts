/**
 * PRECISION branch + function coverage
 * @module notification-service/test/unit/infrastructure
 *
 * Targeted at files with lowest coverage:
 *  - digest-item.repository (20% branch)
 *  - broadcast-batch.mapper (66% branch)
 *  - broadcast.mapper (70% branch)
 *  - notification-event.repository (61% funcs)
 *  - delivery-attempt.repository (76% funcs)
 */
import { DigestItemPrismaRepository } from '@infrastructure/persistence/prisma/repositories/digest-item.prisma.repository.js';
import { NotificationEventPrismaRepository } from '@infrastructure/persistence/prisma/repositories/notification-event.prisma.repository.js';
import { DeliveryAttemptPrismaRepository } from '@infrastructure/persistence/prisma/repositories/delivery-attempt.prisma.repository.js';
import { BroadcastBatchPrismaMapper } from '@infrastructure/persistence/prisma/mappers/broadcast-batch.prisma.mapper.js';
import { BroadcastPrismaMapper } from '@infrastructure/persistence/prisma/mappers/broadcast.prisma.mapper.js';
import { NotificationPrismaMapper } from '@infrastructure/persistence/prisma/mappers/notification.prisma.mapper.js';

import {
  TEST_IDS,
  makePrismaNotification,
  makePrismaDelegateMock,
  makePrismaServiceMock,
} from '@test-infra/index.js';

function setupRepo<T>(R: new (p: unknown) => T): { repo: T; delegate: ReturnType<typeof makePrismaDelegateMock> } {
  const delegate = makePrismaDelegateMock();
  const prisma = makePrismaServiceMock();
  const names = [
    'notification', 'notificationTemplate', 'notificationDevice', 'notificationPreference',
    'notificationWebhook', 'notificationWebhookDelivery', 'notificationBroadcast',
    'notificationBroadcastBatch', 'notificationDigest', 'notificationDigestItem',
    'notificationSchedule', 'notificationDeliveryAttempt', 'notificationEvent',
    'notificationRateLimit', 'notificationUnsubscribe', 'notificationBounce',
    'notificationActionLog', 'notificationRule', 'notificationAuditLog',
    'notificationContent', 'notificationRecipient',
  ];
  for (const n of names) (prisma as Record<string, unknown>)[n] = delegate;
  prisma.getModel = () => delegate;
  prisma.isEngineAvailable = () => true;
  return { repo: new R(prisma), delegate };
}

// ═══════════════════════════════════════════════════════════
// 1. digest-item.repository — 20% branch → cover findById + save + findByCategory + findUrgent
// ═══════════════════════════════════════════════════════════
describe('DigestItemPrismaRepository — full branches', () => {
  it('findById — null notification returns null', async () => {
    const s = setupRepo(DigestItemPrismaRepository);
    s.delegate.findUnique.mockResolvedValue({
      id: 'x', digestId: TEST_IDS.DIGEST, notificationId: TEST_IDS.NOTIFICATION,
      sortOrder: 0, createdAt: new Date(),
      notification: null,
    });
    expect(await s.repo.findById('x')).toBeNull();
  });

  it('findById — null record returns null', async () => {
    const s = setupRepo(DigestItemPrismaRepository);
    s.delegate.findUnique.mockResolvedValue(null);
    expect(await s.repo.findById('x')).toBeNull();
  });

  it('findById — with notification returns entity', async () => {
    const s = setupRepo(DigestItemPrismaRepository);
    const notif = makePrismaNotification();
    s.delegate.findUnique.mockResolvedValue({
      id: 'x', digestId: TEST_IDS.DIGEST, notificationId: TEST_IDS.NOTIFICATION,
      sortOrder: 0, createdAt: new Date(),
      notification: notif,
    });
    expect((await s.repo.findById('x'))?.id).toBe('x');
  });

  it('save — new create', async () => {
    const s = setupRepo(DigestItemPrismaRepository);
    const notif = makePrismaNotification();
    s.delegate.findUnique.mockResolvedValue(null);
    s.delegate.create.mockResolvedValue({
      id: 'x', digestId: TEST_IDS.DIGEST, notificationId: TEST_IDS.NOTIFICATION,
      sortOrder: 0, createdAt: new Date(),
      notification: notif,
    });
    const { DigestItemPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/digest-item.prisma.mapper.js');
    const entity = DigestItemPrismaMapper.toDomain({
      id: 'x', digestId: TEST_IDS.DIGEST, notificationId: TEST_IDS.NOTIFICATION,
      sortOrder: 0, createdAt: new Date(),
    } as never, notif);
    const r = await s.repo.save(entity);
    expect(s.delegate.create).toHaveBeenCalled();
    expect(r).toBeDefined();
  });

  it('save — update existing', async () => {
    const s = setupRepo(DigestItemPrismaRepository);
    const notif = makePrismaNotification();
    s.delegate.findUnique.mockResolvedValue({ id: 'x' });
    s.delegate.update.mockResolvedValue({
      id: 'x', digestId: TEST_IDS.DIGEST, notificationId: TEST_IDS.NOTIFICATION,
      sortOrder: 0, createdAt: new Date(),
      notification: notif,
    });
    const { DigestItemPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/digest-item.prisma.mapper.js');
    const entity = DigestItemPrismaMapper.toDomain({
      id: 'x', digestId: TEST_IDS.DIGEST, notificationId: TEST_IDS.NOTIFICATION,
      sortOrder: 0, createdAt: new Date(),
    } as never, notif);
    await s.repo.save(entity);
    expect(s.delegate.update).toHaveBeenCalled();
  });

  it('findByCategory — filter by category', async () => {
    const s = setupRepo(DigestItemPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    expect((await s.repo.findByCategory(TEST_IDS.DIGEST, 'order')).length).toBe(0);
  });

  it('findUrgent — filter by priority', async () => {
    const s = setupRepo(DigestItemPrismaRepository);
    s.delegate.findMany.mockResolvedValue([]);
    expect((await s.repo.findUrgent(TEST_IDS.DIGEST)).length).toBe(0);
  });

  it('exists — false', async () => {
    const s = setupRepo(DigestItemPrismaRepository);
    s.delegate.count.mockResolvedValue(0);
    expect(await s.repo.exists('x')).toBe(false);
  });

  it('delete — removes', async () => {
    const s = setupRepo(DigestItemPrismaRepository);
    s.delegate.delete.mockResolvedValue({});
    await s.repo.delete('x');
    expect(s.delegate.delete).toHaveBeenCalled();
  });
});

// ═══════════════════════════════════════════════════════════
// 2. notification-event.repository — 61% funcs → cover all methods
// ═══════════════════════════════════════════════════════════
describe('NotificationEventPrismaRepository — all methods', () => {
  const makeEventRaw = () => ({
    id: 'e1',
    notificationId: TEST_IDS.NOTIFICATION,
    userId: TEST_IDS.USER,
    eventType: 'notification.sent',
    channel: 'email',
    metadata: {},
    occurredAt: new Date(),
    createdAt: new Date(),
  });

  it('findById — null', async () => {
    const s = setupRepo(NotificationEventPrismaRepository);
    s.delegate.findUnique.mockResolvedValue(null);
    expect(await s.repo.findById('x')).toBeNull();
  });

  it('findById — found', async () => {
    const s = setupRepo(NotificationEventPrismaRepository);
    s.delegate.findUnique.mockResolvedValue(makeEventRaw());
    expect((await s.repo.findById('e1'))?.id).toBe('e1');
  });

  it('save — create', async () => {
    const s = setupRepo(NotificationEventPrismaRepository);
    s.delegate.findUnique.mockResolvedValue(null);
    s.delegate.create.mockResolvedValue(makeEventRaw());
    const r = await s.repo.save({
      id: 'e1', notificationId: TEST_IDS.NOTIFICATION, userId: TEST_IDS.USER,
      eventType: 'notification.sent', channel: 'email',
      metadata: {}, occurredAt: new Date().toISOString(), createdAt: new Date().toISOString(),
    });
    expect(s.delegate.create).toHaveBeenCalled();
    expect(r.id).toBe('e1');
  });

  it('save — update', async () => {
    const s = setupRepo(NotificationEventPrismaRepository);
    s.delegate.findUnique.mockResolvedValue({ id: 'e1' });
    s.delegate.update.mockResolvedValue(makeEventRaw());
    await s.repo.save({
      id: 'e1', notificationId: TEST_IDS.NOTIFICATION, userId: TEST_IDS.USER,
      eventType: 'notification.sent', channel: 'email',
      metadata: {}, occurredAt: new Date().toISOString(), createdAt: new Date().toISOString(),
    });
    expect(s.delegate.update).toHaveBeenCalled();
  });

  it('delete — removes', async () => {
    const s = setupRepo(NotificationEventPrismaRepository);
    s.delegate.delete.mockResolvedValue({});
    await s.repo.delete('e1');
    expect(s.delegate.delete).toHaveBeenCalled();
  });

  it('countByType — zero', async () => {
    const s = setupRepo(NotificationEventPrismaRepository);
    s.delegate.count.mockResolvedValue(0);
    expect(await s.repo.countByType('notification.sent')).toBe(0);
  });
});

// ═══════════════════════════════════════════════════════════
// 3. delivery-attempt.repository — 76% funcs → save + exists + delete
// ═══════════════════════════════════════════════════════════
describe('DeliveryAttemptPrismaRepository — full methods', () => {
  const makeAttemptRaw = () => ({
    id: 'a1', notificationId: TEST_IDS.NOTIFICATION, channel: 'email', provider: 'sendgrid',
    attempt: 1, status: 'sent', providerMessageId: null, failureReason: null,
    failureCode: null, durationMs: null, startedAt: new Date(), completedAt: new Date(),
    retryable: false, createdAt: new Date(),
  });

  it('save — create', async () => {
    const s = setupRepo(DeliveryAttemptPrismaRepository);
    s.delegate.findUnique.mockResolvedValue(null);
    s.delegate.create.mockResolvedValue(makeAttemptRaw());
    const { DeliveryAttemptPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/delivery-attempt.prisma.mapper.js');
    const entity = DeliveryAttemptPrismaMapper.toDomain(makeAttemptRaw() as never);
    await s.repo.save(entity);
    expect(s.delegate.create).toHaveBeenCalled();
  });

  it('save — update', async () => {
    const s = setupRepo(DeliveryAttemptPrismaRepository);
    s.delegate.findUnique.mockResolvedValue({ id: 'a1' });
    s.delegate.update.mockResolvedValue(makeAttemptRaw());
    const { DeliveryAttemptPrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/delivery-attempt.prisma.mapper.js');
    const entity = DeliveryAttemptPrismaMapper.toDomain(makeAttemptRaw() as never);
    await s.repo.save(entity);
    expect(s.delegate.update).toHaveBeenCalled();
  });

  it('exists — true', async () => {
    const s = setupRepo(DeliveryAttemptPrismaRepository);
    s.delegate.count.mockResolvedValue(1);
    expect(await s.repo.exists('a1')).toBe(true);
  });

  it('delete — removes', async () => {
    const s = setupRepo(DeliveryAttemptPrismaRepository);
    s.delegate.delete.mockResolvedValue({});
    await s.repo.delete('a1');
    expect(s.delegate.delete).toHaveBeenCalled();
  });

  it('findAll', async () => {
    const s = setupRepo(DeliveryAttemptPrismaRepository);
    s.delegate.findMany.mockResolvedValue([makeAttemptRaw()]);
    expect((await s.repo.findAll()).length).toBe(1);
  });

  it('countSuccessful', async () => {
    const s = setupRepo(DeliveryAttemptPrismaRepository);
    s.delegate.count.mockResolvedValue(2);
    expect(await s.repo.countSuccessful(TEST_IDS.NOTIFICATION)).toBe(2);
  });
});

// ═══════════════════════════════════════════════════════════
// 4. broadcast-batch.mapper — 66% branch → null + set branches
// ═══════════════════════════════════════════════════════════
describe('BroadcastBatchPrismaMapper — null branches', () => {
  const makeRow = (overrides: Record<string, unknown> = {}) => ({
    id: 'b1', broadcastId: TEST_IDS.BROADCAST, batchNumber: 1, status: 'pending',
    processed: 0, succeeded: 0, failed: 0, recipientIds: [],
    startedAt: null, completedAt: null,
    createdAt: new Date(), updatedAt: new Date(),
    ...overrides,
  });

  it('toRow — null startedAt/completedAt', () => {
    const r = BroadcastBatchPrismaMapper.toRow(makeRow() as never);
    expect(r.startedAt).toBeUndefined();
    expect(r.completedAt).toBeUndefined();
  });

  it('toRow — set dates', () => {
    const r = BroadcastBatchPrismaMapper.toRow(makeRow({
      startedAt: new Date('2026-01-01'),
      completedAt: new Date('2026-01-02'),
    }) as never);
    expect(r.startedAt).toBeDefined();
    expect(r.completedAt).toBeDefined();
  });

  it('toRow — null recipientIds → []', () => {
    const r = BroadcastBatchPrismaMapper.toRow(makeRow({ recipientIds: null }) as never);
    expect(r.recipientIds).toEqual([]);
  });

  it('toPersistence — null startedAt/completedAt', () => {
    const r = BroadcastBatchPrismaMapper.toPersistence({
      id: 'b1', broadcastId: TEST_IDS.BROADCAST, batchNumber: 1, status: 'pending',
      processed: 0, succeeded: 0, failed: 0, recipientIds: [],
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    });
    expect(r['startedAt']).toBeNull();
    expect(r['completedAt']).toBeNull();
  });

  it('toPersistence — with dates', () => {
    const r = BroadcastBatchPrismaMapper.toPersistence({
      id: 'b1', broadcastId: TEST_IDS.BROADCAST, batchNumber: 1, status: 'pending',
      processed: 0, succeeded: 0, failed: 0, recipientIds: [],
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    });
    expect(r['startedAt']).toBeDefined();
    expect(r['completedAt']).toBeDefined();
  });
});

// ═══════════════════════════════════════════════════════════
// 5. broadcast.mapper — 70% branch → null variants
// ═══════════════════════════════════════════════════════════
describe('BroadcastPrismaMapper — null branches', () => {
  const makeRow = (overrides: Record<string, unknown> = {}) => ({
    id: TEST_IDS.BROADCAST, type: 'promotional', status: 'draft', target: 'all',
    templateId: TEST_IDS.TEMPLATE, channels: ['email'],
    estimatedRecipients: 100, totalRecipients: 100, processed: 0, succeeded: 0, failed: 0,
    failureReasons: [], scheduledAt: null, startedAt: null, completedAt: null,
    createdBy: TEST_IDS.USER, approvedBy: null, segmentFilter: null, customRecipientIds: [],
    metadata: null, version: 0, createdAt: new Date(), updatedAt: new Date(), deletedAt: null,
    ...overrides,
  });

  it('toDomain — null approvedBy', () => {
    const e = BroadcastPrismaMapper.toDomain(makeRow() as never);
    expect(e.vo.approvedBy).toBeUndefined();
  });

  it('toDomain — set approvedBy', () => {
    const e = BroadcastPrismaMapper.toDomain(makeRow({ approvedBy: TEST_IDS.USER }) as never);
    expect(e.vo.approvedBy).toBeDefined();
  });

  it('toDomain — null customRecipientIds', () => {
    const e = BroadcastPrismaMapper.toDomain(makeRow({ customRecipientIds: null }) as never);
    expect(e.vo.audience.userIds).toBeUndefined();
  });

  it('toDomain — null channels', () => {
    const e = BroadcastPrismaMapper.toDomain(makeRow({ channels: null }) as never);
    expect(e.vo.channels.length).toBe(0);
  });

  it('toDomain — null failureReasons', () => {
    const e = BroadcastPrismaMapper.toDomain(makeRow({ failureReasons: null }) as never);
    expect(e.failureReason).toBeUndefined();
  });

  it('toDomain — set failureReasons', () => {
    const e = BroadcastPrismaMapper.toDomain(makeRow({ failureReasons: ['err'] }) as never);
    expect(e.failureReason).toBe('err');
  });

  it('toPersistence — null scheduledAt/startedAt/completedAt', () => {
    const e = BroadcastPrismaMapper.toDomain(makeRow() as never);
    const p = BroadcastPrismaMapper.toPersistence(e);
    expect(p['scheduledAt']).toBeNull();
    expect(p['startedAt']).toBeNull();
    expect(p['completedAt']).toBeNull();
  });

  it('toPersistence — set scheduledAt/startedAt/completedAt', () => {
    const e = BroadcastPrismaMapper.toDomain(makeRow({
      scheduledAt: new Date('2026-01-01'),
      startedAt: new Date('2026-01-02'),
      completedAt: new Date('2026-01-03'),
    }) as never);
    const p = BroadcastPrismaMapper.toPersistence(e);
    expect(p['scheduledAt']).toBeDefined();
    expect(p['startedAt']).toBeDefined();
    expect(p['completedAt']).toBeDefined();
  });
});

// ═══════════════════════════════════════════════════════════
// 6. notification.mapper — 90% funcs → 1 missing function
// ═══════════════════════════════════════════════════════════
describe('NotificationPrismaMapper — all functions', () => {
  it('toPersistence — roundtrip preserves id', () => {
    const raw = makePrismaNotification();
    const entity = NotificationPrismaMapper.toDomain(raw);
    const persisted = NotificationPrismaMapper.toPersistence(entity);
    expect(persisted['id']).toBe(TEST_IDS.NOTIFICATION);
  });

  it('toDomain — delivery VO with all fields', () => {
    const raw = makePrismaNotification({
      provider: 'sendgrid',
      providerMessageId: 'msg-xyz',
      sentAt: new Date('2026-01-01'),
      deliveredAt: new Date('2026-01-02'),
    });
    const entity = NotificationPrismaMapper.toDomain(raw);
    expect(entity.delivery?.providerName?.value).toBe('sendgrid');
    expect(entity.delivery?.providerMessageId?.value).toBe('msg-xyz');
  });
});
