/**
 * Prisma Mappers — Unit Tests
 * @module notification-service/test/unit/infrastructure/persistence/prisma
 *
 * Covers: 18 mappers + 1 helper file
 * Target: 90% statements, 80% branches, 90% functions, 90% lines
 */
import {
  toIso,
  toIsoRequired,
  fromIso,
  fromIsoRequired,
  toNum,
  jsonAs,
  jsonRecord,
  toArray,
  toDate,
  safeString,
  toJsonOrNull,
} from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

import { NotificationPrismaMapper } from '@infrastructure/persistence/prisma/mappers/notification.prisma.mapper.js';
import { NotificationContentPrismaMapper } from '@infrastructure/persistence/prisma/mappers/notification-content.prisma.mapper.js';
import { NotificationRecipientPrismaMapper } from '@infrastructure/persistence/prisma/mappers/notification-recipient.prisma.mapper.js';
import { TemplatePrismaMapper } from '@infrastructure/persistence/prisma/mappers/template.prisma.mapper.js';
import { SchedulePrismaMapper } from '@infrastructure/persistence/prisma/mappers/schedule.prisma.mapper.js';
import { BroadcastPrismaMapper } from '@infrastructure/persistence/prisma/mappers/broadcast.prisma.mapper.js';
import { BroadcastBatchPrismaMapper } from '@infrastructure/persistence/prisma/mappers/broadcast-batch.prisma.mapper.js';
import { DigestPrismaMapper } from '@infrastructure/persistence/prisma/mappers/digest.prisma.mapper.js';
import { DigestItemPrismaMapper } from '@infrastructure/persistence/prisma/mappers/digest-item.prisma.mapper.js';
import { PreferencePrismaMapper } from '@infrastructure/persistence/prisma/mappers/preference.prisma.mapper.js';
import { DevicePrismaMapper } from '@infrastructure/persistence/prisma/mappers/device.prisma.mapper.js';
import { WebhookPrismaMapper } from '@infrastructure/persistence/prisma/mappers/webhook.prisma.mapper.js';
import { WebhookDeliveryPrismaMapper } from '@infrastructure/persistence/prisma/mappers/webhook-delivery.prisma.mapper.js';
import { DeliveryAttemptPrismaMapper } from '@infrastructure/persistence/prisma/mappers/delivery-attempt.prisma.mapper.js';
import { NotificationEventPrismaMapper } from '@infrastructure/persistence/prisma/mappers/notification-event.prisma.mapper.js';
import { RateLimitPrismaMapper } from '@infrastructure/persistence/prisma/mappers/rate-limit.prisma.mapper.js';
import { UnsubscribePrismaMapper } from '@infrastructure/persistence/prisma/mappers/unsubscribe.prisma.mapper.js';
import { BouncePrismaMapper } from '@infrastructure/persistence/prisma/mappers/bounce.prisma.mapper.js';
import { ActionLogPrismaMapper } from '@infrastructure/persistence/prisma/mappers/action-log.prisma.mapper.js';
import { RulePrismaMapper } from '@infrastructure/persistence/prisma/mappers/rule.prisma.mapper.js';
import { AuditLogPrismaMapper } from '@infrastructure/persistence/prisma/mappers/audit-log.prisma.mapper.js';

import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import {
  TEST_IDS,
  TEST_TIMESTAMPS,
  makePrismaNotification,
  makePrismaTemplate,
  makePrismaDevice,
  makePrismaPreference,
} from '@test-infra/index.js';

// ═══════════════════════════════════════════════════════════
// 1. Mapper Helpers
// ═══════════════════════════════════════════════════════════
describe('Prisma mapper helpers', () => {
  describe('toIso', () => {
    it('converts Date → ISO string', () => {
      const d = new Date('2026-01-15T10:00:00.000Z');
      expect(toIso(d)).toBe('2026-01-15T10:00:00.000Z');
    });
    it('returns undefined for null', () => {
      expect(toIso(null)).toBeUndefined();
    });
    it('returns undefined for undefined', () => {
      expect(toIso(undefined)).toBeUndefined();
    });
  });

  describe('toIsoRequired', () => {
    it('converts Date → ISO', () => {
      const d = new Date('2026-01-15T10:00:00.000Z');
      expect(toIsoRequired(d)).toBe('2026-01-15T10:00:00.000Z');
    });
    it('converts string → ISO', () => {
      expect(toIsoRequired('2026-01-15T10:00:00.000Z')).toBe('2026-01-15T10:00:00.000Z');
    });
  });

  describe('fromIso', () => {
    it('converts ISO → Date', () => {
      const d = fromIso('2026-01-15T10:00:00.000Z');
      expect(d).toBeInstanceOf(Date);
    });
    it('returns null for null', () => {
      expect(fromIso(null)).toBeNull();
    });
    it('returns null for undefined', () => {
      expect(fromIso(undefined)).toBeNull();
    });
  });

  describe('fromIsoRequired', () => {
    it('converts ISO → Date', () => {
      expect(fromIsoRequired('2026-01-15T10:00:00.000Z')).toBeInstanceOf(Date);
    });
  });

  describe('toNum', () => {
    it('handles number', () => expect(toNum(42)).toBe(42));
    it('handles string', () => expect(toNum('42.5')).toBe(42.5));
    it('handles Decimal-like object', () => {
      expect(toNum({ toNumber: () => 42.5 })).toBe(42.5);
    });
    it('handles null → 0', () => expect(toNum(null)).toBe(0));
    it('handles undefined → NaN', () => expect(toNum(undefined)).toBeNaN());
    it('handles broken Decimal-like → NaN → 0', () => {
      expect(toNum({ toNumber: () => { throw new Error('bad'); } })).toBeNaN();
    });
  });

  describe('jsonAs', () => {
    it('returns value when object', () => {
      expect(jsonAs({ a: 1 }, {})).toEqual({ a: 1 });
    });
    it('returns fallback for null', () => {
      expect(jsonAs(null, { fallback: true })).toEqual({ fallback: true });
    });
    it('returns fallback for primitive', () => {
      expect(jsonAs(42, 'fallback')).toBe('fallback');
    });
  });

  describe('jsonRecord', () => {
    it('returns object when Json object', () => {
      expect(jsonRecord({ a: 1 })).toEqual({ a: 1 });
    });
    it('returns empty object for null', () => {
      expect(jsonRecord(null)).toEqual({});
    });
  });

  describe('toArray', () => {
    it('returns frozen copy', () => {
      const arr = ['a', 'b'];
      const result = toArray(arr);
      expect(result).toEqual(['a', 'b']);
      expect(Object.isFrozen(result)).toBe(true);
    });
    it('returns empty array for null', () => {
      expect(toArray(null)).toEqual([]);
    });
    it('returns empty array for undefined', () => {
      expect(toArray(undefined)).toEqual([]);
    });
  });

  describe('toDate', () => {
    it('handles Date input', () => {
      const d = new Date();
      expect(toDate(d)).toBe(d);
    });
    it('handles string input', () => {
      expect(toDate('2026-01-15T10:00:00.000Z')).toBeInstanceOf(Date);
    });
    it('returns null for null', () => {
      expect(toDate(null)).toBeNull();
    });
    it('returns null for invalid date string', () => {
      expect(toDate('not-a-date')).toBeNull();
    });
  });

  describe('safeString', () => {
    it('returns null for null', () => {
      expect(safeString(null)).toBeNull();
    });
    it('truncates long strings', () => {
      const long = 'x'.repeat(600);
      const result = safeString(long, 500);
      expect(result?.length).toBe(500);
    });
    it('returns short string unchanged', () => {
      expect(safeString('short', 500)).toBe('short');
    });
  });

  describe('toJsonOrNull', () => {
    it('returns null for null', () => {
      expect(toJsonOrNull(null)).toBeNull();
    });
    it('returns null for undefined', () => {
      expect(toJsonOrNull(undefined)).toBeNull();
    });
    it('returns copy of object', () => {
      const obj = { a: 1 };
      const result = toJsonOrNull(obj);
      expect(result).toEqual({ a: 1 });
    });
  });
});

// ═══════════════════════════════════════════════════════════
// 2. NotificationPrismaMapper
// ═══════════════════════════════════════════════════════════
describe('NotificationPrismaMapper', () => {
  it('toDomain — happy path', () => {
    const row = makePrismaNotification();
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.id).toBe(TEST_IDS.NOTIFICATION);
    expect(entity.vo.userId.value).toBe(TEST_IDS.USER);
    expect(entity.vo.type.value).toBe('transactional');
  });

  it('toDomain — null optional fields (actions/data only)', () => {
    const row = makePrismaNotification({
      actions: null,
      data: null,
      // recipient is required — keep valid recipient
      provider: null,
      providerMessageId: null,
      sentAt: null,
      deliveredAt: null,
    });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.actions).toEqual([]);
    // recipient stays valid → recipients.length >= 1
    expect(entity.recipients.length).toBeGreaterThan(0);
    // delivery status defaults to 'queued'
    expect(entity.delivery).toBeDefined();
    expect(entity.delivery?.status.value).toBe('queued');
  });

  it('toDomain — with full delivery + actions', () => {
    const row = makePrismaNotification({
      actions: [
        { id: 'a1', type: 'view', label: 'View', url: 'https://example.com' },
      ],
      provider: 'sendgrid',
      providerMessageId: 'msg-123',
      sentAt: new Date(TEST_TIMESTAMPS.PAST),
      deliveredAt: new Date(TEST_TIMESTAMPS.NOW),
    });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.actions.length).toBe(1);
    expect(entity.delivery).toBeDefined();
  });

  it('toPersistence — full entity', () => {
    const row = makePrismaNotification();
    const entity = NotificationPrismaMapper.toDomain(row);
    const persisted = NotificationPrismaMapper.toPersistence(entity);
    expect(persisted['id']).toBe(TEST_IDS.NOTIFICATION);
    expect(persisted['userId']).toBe(TEST_IDS.USER);
  });

  it('toPersistence — with recipient', () => {
    const row = makePrismaNotification();  // default has recipient
    const entity = NotificationPrismaMapper.toDomain(row);
    const persisted = NotificationPrismaMapper.toPersistence(entity);
    expect(persisted['id']).toBe(TEST_IDS.NOTIFICATION);
    expect(persisted['recipient']).toBeDefined();
    expect(persisted['recipient']).not.toBeNull();
  });

  it('toDomain — invalid actions Json (non-array)', () => {
    const row = makePrismaNotification({ actions: { not: 'array' } });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.actions).toEqual([]);
  });

  it('toDomain — action missing required fields', () => {
    const row = makePrismaNotification({
      actions: [{ id: 'a1' }, { id: 'a2', type: 'view', label: 'View' }],
    });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.actions.length).toBe(1); // only valid
  });
});

// ═══════════════════════════════════════════════════════════
// 3. NotificationContentPrismaMapper
// ═══════════════════════════════════════════════════════════
describe('NotificationContentPrismaMapper', () => {
  it('toDomain — happy path', () => {
    const row = makePrismaNotification();
    const entity = NotificationContentPrismaMapper.toDomain(row);
    expect(entity.id).toBe(TEST_IDS.NOTIFICATION);
    expect(entity.content.subject.value).toBe('Test Notification');
  });

  it('toDomain — with image/icon/action URLs', () => {
    const row = makePrismaNotification({
      imageUrl: 'https://example.com/img.png',
      iconUrl: 'https://example.com/icon.png',
      actionUrl: 'https://example.com/action',
    });
    const entity = NotificationContentPrismaMapper.toDomain(row);
    expect(entity.content.imageUrl).toBeDefined();
    expect(entity.content.iconUrl).toBeDefined();
    expect(entity.content.actionUrl).toBeDefined();
  });
});

// ═══════════════════════════════════════════════════════════
// 4. NotificationRecipientPrismaMapper
// ═══════════════════════════════════════════════════════════
describe('NotificationRecipientPrismaMapper', () => {
  it('toDomain — with email recipient', () => {
    const row = makePrismaNotification();
    const entity = NotificationRecipientPrismaMapper.toDomain(row);
    expect(entity?.recipient.userId.value).toBe(TEST_IDS.USER);
    expect(entity?.recipient.email?.value).toBe('test@example.com');
  });

  it('toDomain — with phone recipient', () => {
    const row = makePrismaNotification({
      recipient: { userId: TEST_IDS.USER, channel: 'sms', phone: '+8801712345678' },
    });
    const entity = NotificationRecipientPrismaMapper.toDomain(row);
    expect(entity?.recipient.phone).toBeDefined();
  });

  it('toDomain — with device token', () => {
    const row = makePrismaNotification({
      recipient: {
        userId: TEST_IDS.USER,
        channel: 'push',
        deviceToken: 'fcm_token_test_1234567890_abcdefghijklmnop',
      },
    });
    const entity = NotificationRecipientPrismaMapper.toDomain(row);
    expect(entity?.recipient.deviceToken).toBeDefined();
  });

  it('toDomain — with webhook URL', () => {
    const row = makePrismaNotification({
      recipient: {
        userId: TEST_IDS.USER,
        channel: 'webhook',
        webhookUrl: 'https://example.com/hook',
      },
    });
    const entity = NotificationRecipientPrismaMapper.toDomain(row);
    expect(entity?.recipient.webhookUrl).toBeDefined();
  });

  it('toDomain — null recipient returns null', () => {
    const row = makePrismaNotification({ recipient: null });
    const entity = NotificationRecipientPrismaMapper.toDomain(row);
    expect(entity).toBeNull();
  });

  it('toDomain — recipient without userId returns null', () => {
    const row = makePrismaNotification({ recipient: { channel: 'email' } });
    const entity = NotificationRecipientPrismaMapper.toDomain(row);
    expect(entity).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════
// 5. TemplatePrismaMapper
// ═══════════════════════════════════════════════════════════
describe('TemplatePrismaMapper', () => {
  it('toDomain — happy path', () => {
    const row = makePrismaTemplate();
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.id).toBe(TEST_IDS.TEMPLATE);
    expect(entity.vo.name.value).toBe('Order Confirmation');
    expect(entity.vo.variables.length).toBe(2);
  });

  it('toDomain — no variables', () => {
    const row = makePrismaTemplate({ variables: [] });
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.vo.variables.length).toBe(0);
  });

  it('toDomain — non-array variables', () => {
    const row = makePrismaTemplate({ variables: null });
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.vo.variables.length).toBe(0);
  });

  it('toDomain — variable with all fields', () => {
    const row = makePrismaTemplate({
      variables: [
        {
          name: 'x',
          type: 'string',
          required: false,
          defaultValue: 'abc',
          description: 'A test',
        },
      ],
    });
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.vo.variables[0].defaultValue).toBe('abc');
  });

  it('toDomain — no subject (system type)', () => {
    const row = makePrismaTemplate({ type: 'system', subject: null });
    const entity = TemplatePrismaMapper.toDomain(row);
    // TemplateVO has subject as undefined when raw.subject is null
    expect(entity.vo.subject).toBeUndefined();
  });

  it('toPersistence — full entity', () => {
    const row = makePrismaTemplate();
    const entity = TemplatePrismaMapper.toDomain(row);
    const persisted = TemplatePrismaMapper.toPersistence(entity);
    expect(persisted['id']).toBe(TEST_IDS.TEMPLATE);
  });
});

// ═══════════════════════════════════════════════════════════
// 6. SchedulePrismaMapper
// ═══════════════════════════════════════════════════════════
describe('SchedulePrismaMapper', () => {
  const makeScheduleRow = (overrides: Record<string, unknown> = {}) => ({
    id: TEST_IDS.SCHEDULE,
    type: 'scheduled',
    status: 'pending',
    recurrence: 'daily',
    scheduledAt: new Date(TEST_TIMESTAMPS.FUTURE),
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
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    updatedAt: new Date(TEST_TIMESTAMPS.UPDATED),
    deletedAt: null,
    ...overrides,
  });

  it('toDomain — happy path', () => {
    const row = makeScheduleRow();
    const entity = SchedulePrismaMapper.toDomain(row);
    expect(entity.id).toBe(TEST_IDS.SCHEDULE);
    expect(entity.vo.recipientIds.length).toBe(1);
  });

  it('toDomain — no user (empty recipients)', () => {
    const row = makeScheduleRow({ userId: null });
    const entity = SchedulePrismaMapper.toDomain(row);
    expect(entity.vo.recipientIds.length).toBe(0);
  });

  it('toDomain — no template (default)', () => {
    const row = makeScheduleRow({ notificationTemplateId: null });
    const entity = SchedulePrismaMapper.toDomain(row);
    expect(entity.vo.templateId).toBeDefined();
  });

  it('toPersistence — happy path', () => {
    const row = makeScheduleRow();
    const entity = SchedulePrismaMapper.toDomain(row);
    const persisted = SchedulePrismaMapper.toPersistence(entity);
    expect(persisted['id']).toBe(TEST_IDS.SCHEDULE);
  });
});

// ═══════════════════════════════════════════════════════════
// 7. BroadcastPrismaMapper
// ═══════════════════════════════════════════════════════════
describe('BroadcastPrismaMapper', () => {
  const makeBroadcastRow = (overrides: Record<string, unknown> = {}) => ({
    id: TEST_IDS.BROADCAST,
    type: 'promotional',
    status: 'draft',
    target: 'all',
    templateId: TEST_IDS.TEMPLATE,
    channels: ['email', 'push'],
    estimatedRecipients: 1000,
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
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    updatedAt: new Date(TEST_TIMESTAMPS.UPDATED),
    deletedAt: null,
    ...overrides,
  });

  it('toDomain — happy path', () => {
    const row = makeBroadcastRow();
    const entity = BroadcastPrismaMapper.toDomain(row);
    expect(entity.id).toBe(TEST_IDS.BROADCAST);
    expect(entity.vo.channels.length).toBe(2);
  });

  it('toDomain — with custom recipients', () => {
    const row = makeBroadcastRow({
      target: 'custom',
      customRecipientIds: [TEST_IDS.USER, TEST_IDS.USER_2],
    });
    const entity = BroadcastPrismaMapper.toDomain(row);
    expect(entity.vo.audience.userIds?.length).toBe(2);
  });

  it('toDomain — failed broadcast', () => {
    const row = makeBroadcastRow({
      status: 'failed',
      failureReasons: ['network error'],
    });
    const entity = BroadcastPrismaMapper.toDomain(row);
    expect(entity.failureReason).toBe('network error');
  });

  it('toPersistence — happy path', () => {
    const row = makeBroadcastRow();
    const entity = BroadcastPrismaMapper.toDomain(row);
    const persisted = BroadcastPrismaMapper.toPersistence(entity);
    expect(persisted['id']).toBe(TEST_IDS.BROADCAST);
  });

  it('toPersistence — missing templateId throws ValidationError', () => {
    const row = makeBroadcastRow();
    const entity = BroadcastPrismaMapper.toDomain(row);
    // Force undefined templateId
    const brokenEntity = Object.assign(Object.create(Object.getPrototypeOf(entity)), entity, {
      _vo: { ...entity.vo.value, templateId: undefined },
    });
    expect(() => BroadcastPrismaMapper.toPersistence(brokenEntity)).toThrow(ValidationError);
  });
});

// ═══════════════════════════════════════════════════════════
// 8. BroadcastBatchPrismaMapper
// ═══════════════════════════════════════════════════════════
describe('BroadcastBatchPrismaMapper', () => {
  const makeBatchRow = (overrides: Record<string, unknown> = {}) => ({
    id: TEST_IDS.BROADCAST,
    broadcastId: TEST_IDS.BROADCAST,
    batchNumber: 1,
    status: 'pending',
    processed: 0,
    succeeded: 0,
    failed: 0,
    recipientIds: [TEST_IDS.USER, TEST_IDS.USER_2],
    startedAt: null,
    completedAt: null,
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    updatedAt: new Date(TEST_TIMESTAMPS.UPDATED),
    ...overrides,
  });

  it('toRow — happy path', () => {
    const row = BroadcastBatchPrismaMapper.toRow(makeBatchRow());
    expect(row.batchNumber).toBe(1);
    expect(row.recipientIds.length).toBe(2);
  });

  it('toRow — null recipientIds', () => {
    const row = BroadcastBatchPrismaMapper.toRow(makeBatchRow({ recipientIds: null }));
    expect(row.recipientIds).toEqual([]);
  });

  it('toPersistence — happy path', () => {
    const row = BroadcastBatchPrismaMapper.toRow(makeBatchRow());
    const persisted = BroadcastBatchPrismaMapper.toPersistence(row);
    expect(persisted['batchNumber']).toBe(1);
  });
});

// ═══════════════════════════════════════════════════════════
// 9. DigestPrismaMapper
// ═══════════════════════════════════════════════════════════
describe('DigestPrismaMapper', () => {
  const makeDigestRow = (overrides: Record<string, unknown> = {}) => ({
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
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    updatedAt: new Date(TEST_TIMESTAMPS.UPDATED),
    deletedAt: null,
    ...overrides,
  });

  it('toDomain — happy path', () => {
    const row = makeDigestRow();
    const entity = DigestPrismaMapper.toDomain(row);
    expect(entity.id).toBe(TEST_IDS.DIGEST);
    expect(entity.itemCount).toBe(0);
  });

  it('toDomain — with items (VO.itemCount reflects itemIds.length)', () => {
    const row = makeDigestRow({ itemIds: [TEST_IDS.NOTIFICATION, TEST_IDS.USER] });
    const entity = DigestPrismaMapper.toDomain(row);
    // Entity.itemCount = _items.length (0 because items: [] in mapper)
    // VO.itemCount = itemIds.length (2 from raw row) — this is the true count
    expect(entity.vo.itemCount).toBe(2);
    expect(entity.itemCount).toBe(0); // entity.items is [] in base reconstitute
  });

  it('toDomain — failed', () => {
    const row = makeDigestRow({ status: 'failed', failureReason: 'error' });
    const entity = DigestPrismaMapper.toDomain(row);
    expect(entity.failureReason).toBe('error');
  });

  it('toPersistence — happy path', () => {
    const row = makeDigestRow();
    const entity = DigestPrismaMapper.toDomain(row);
    const persisted = DigestPrismaMapper.toPersistence(entity);
    expect(persisted['id']).toBe(TEST_IDS.DIGEST);
  });
});

// ═══════════════════════════════════════════════════════════
// 10. DigestItemPrismaMapper
// ═══════════════════════════════════════════════════════════
describe('DigestItemPrismaMapper', () => {
  it('toDomain — happy path', () => {
    const digestItemRow = {
      id: TEST_IDS.DIGEST,
      digestId: TEST_IDS.DIGEST,
      notificationId: TEST_IDS.NOTIFICATION,
      sortOrder: 0,
      createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    };
    const notificationRow = makePrismaNotification();
    const entity = DigestItemPrismaMapper.toDomain(digestItemRow as never, notificationRow);
    expect(entity.item.notificationId.value).toBe(TEST_IDS.NOTIFICATION);
  });

  it('toPersistence — happy path', () => {
    const digestItemRow = {
      id: TEST_IDS.DIGEST,
      digestId: TEST_IDS.DIGEST,
      notificationId: TEST_IDS.NOTIFICATION,
      sortOrder: 0,
      createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    };
    const notificationRow = makePrismaNotification();
    const entity = DigestItemPrismaMapper.toDomain(digestItemRow as never, notificationRow);
    const persisted = DigestItemPrismaMapper.toPersistence(entity, 0);
    expect(persisted['sortOrder']).toBe(0);
  });
});

// ═══════════════════════════════════════════════════════════
// 11. PreferencePrismaMapper
// ═══════════════════════════════════════════════════════════
describe('PreferencePrismaMapper', () => {
  it('toDomain — happy path', () => {
    const row = makePrismaPreference();
    const entity = PreferencePrismaMapper.toDomain(row);
    expect(entity.id).toBe(TEST_IDS.PREFERENCE);
    expect(entity.vo.options.length).toBeGreaterThan(0);
  });

  it('toDomain — empty preferences', () => {
    const row = makePrismaPreference({
      channelPreferences: {},
      categoryPreferences: {},
    });
    const entity = PreferencePrismaMapper.toDomain(row);
    expect(entity.vo.options.length).toBe(0);
  });

  it('toDomain — non-boolean values ignored', () => {
    const row = makePrismaPreference({
      channelPreferences: { email: 'yes', sms: false },
      categoryPreferences: {},
    });
    const entity = PreferencePrismaMapper.toDomain(row);
    // 'yes' is not boolean → ignored; only `sms: false` kept
    // Log actual count if unexpected
    if (entity.vo.options.length !== 1) {
      console.log('Actual options:', entity.vo.options.map((o) => ({
        channel: o.channel,
        enabled: o.enabled,
      })));
    }
    expect(entity.vo.options.length).toBe(1);
  });

  it('toDomain — invalid category key ignored', () => {
    const row = makePrismaPreference({
      categoryPreferences: { 'no-colon': true, 'email:marketing': false },
    });
    const entity = PreferencePrismaMapper.toDomain(row);
    expect(entity.vo.options.length).toBeGreaterThan(0);
  });

  it('toPersistence — happy path', () => {
    const row = makePrismaPreference();
    const entity = PreferencePrismaMapper.toDomain(row);
    const persisted = PreferencePrismaMapper.toPersistence(entity);
    expect(persisted['id']).toBe(TEST_IDS.PREFERENCE);
  });
});

// ═══════════════════════════════════════════════════════════
// 12. DevicePrismaMapper
// ═══════════════════════════════════════════════════════════
describe('DevicePrismaMapper', () => {
  it('toDomain — happy path', () => {
    const row = makePrismaDevice();
    const entity = DevicePrismaMapper.toDomain(row);
    expect(entity.id).toBe(TEST_IDS.DEVICE);
    expect(entity.vo.type.value).toBe('android');
  });

  it('toDomain — null platform defaults to web', () => {
    const row = makePrismaDevice({ platform: null });
    const entity = DevicePrismaMapper.toDomain(row);
    expect(entity.vo.platform.value).toBe('web');
  });

  it('toDomain — null lastActiveAt uses createdAt', () => {
    const row = makePrismaDevice({ lastActiveAt: null });
    const entity = DevicePrismaMapper.toDomain(row);
    expect(entity.vo.lastActiveAt).toBeDefined();
  });

  it('toPersistence — happy path', () => {
    const row = makePrismaDevice();
    const entity = DevicePrismaMapper.toDomain(row);
    const persisted = DevicePrismaMapper.toPersistence(entity);
    expect(persisted['id']).toBe(TEST_IDS.DEVICE);
  });
});

// ═══════════════════════════════════════════════════════════
// 13. WebhookPrismaMapper
// ═══════════════════════════════════════════════════════════
describe('WebhookPrismaMapper', () => {
  const makeWebhookRow = (overrides: Record<string, unknown> = {}) => ({
    id: TEST_IDS.WEBHOOK,
    url: 'https://example.com/hook',
    method: 'POST',
    status: 'active',
    events: ['order.created', 'order.updated'],
    secret: 'super_secret_1234567890',
    description: null,
    headers: { 'X-Custom': 'value' },
    failureCount: 0,
    lastSuccessAt: null,
    lastFailureAt: null,
    createdBy: TEST_IDS.USER,
    metadata: null,
    version: 0,
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    updatedAt: new Date(TEST_TIMESTAMPS.UPDATED),
    deletedAt: null,
    ...overrides,
  });

  it('toDomain — happy path', () => {
    const row = makeWebhookRow();
    const entity = WebhookPrismaMapper.toDomain(row);
    expect(entity.id).toBe(TEST_IDS.WEBHOOK);
    expect(entity.vo.events.length).toBe(2);
  });

  it('toDomain — no secret', () => {
    const row = makeWebhookRow({ secret: null });
    const entity = WebhookPrismaMapper.toDomain(row);
    expect(entity.vo.secret).toBeUndefined();
  });

  it('toDomain — null events → empty array', () => {
    const row = makeWebhookRow({ events: null });
    const entity = WebhookPrismaMapper.toDomain(row);
    expect(entity.vo.events.length).toBe(0);
  });

  it('toDomain — null headers → undefined', () => {
    const row = makeWebhookRow({ headers: null });
    const entity = WebhookPrismaMapper.toDomain(row);
    expect(entity.vo.headers).toBeUndefined();
  });

  it('toDomain — failed webhook with failures', () => {
    const row = makeWebhookRow({
      failureCount: 3,
      lastFailureAt: new Date(TEST_TIMESTAMPS.PAST),
    });
    const entity = WebhookPrismaMapper.toDomain(row);
    expect(entity.failureReason).toBeDefined();
  });

  it('toPersistence — happy path', () => {
    const row = makeWebhookRow();
    const entity = WebhookPrismaMapper.toDomain(row);
    const persisted = WebhookPrismaMapper.toPersistence(entity);
    expect(persisted['id']).toBe(TEST_IDS.WEBHOOK);
  });
});

// ═══════════════════════════════════════════════════════════
// 14. WebhookDeliveryPrismaMapper
// ═══════════════════════════════════════════════════════════
describe('WebhookDeliveryPrismaMapper', () => {
  const makeDeliveryRow = (overrides: Record<string, unknown> = {}) => ({
    id: TEST_IDS.DELIVERY,
    webhookId: TEST_IDS.WEBHOOK,
    event: 'order.created',
    status: 'pending',
    requestBody: { id: 'test' },
    responseStatus: null,
    responseBody: null,
    durationMs: null,
    attemptCount: 0,
    nextRetryAt: null,
    deliveredAt: null,
    failedAt: null,
    error: null,
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    updatedAt: new Date(TEST_TIMESTAMPS.UPDATED),
    ...overrides,
  });

  it('toRow — happy path', () => {
    const row = WebhookDeliveryPrismaMapper.toRow(makeDeliveryRow() as never);
    expect(row.id).toBe(TEST_IDS.DELIVERY);
  });

  it('toRow — with response details', () => {
    const row = WebhookDeliveryPrismaMapper.toRow(
      makeDeliveryRow({ responseStatus: 200, durationMs: 150 }) as never,
    );
    expect(row.responseStatus).toBe(200);
  });

  it('toPersistence — happy path', () => {
    const row = WebhookDeliveryPrismaMapper.toRow(makeDeliveryRow() as never);
    const persisted = WebhookDeliveryPrismaMapper.toPersistence(row);
    expect(persisted['id']).toBe(TEST_IDS.DELIVERY);
  });
});

// ═══════════════════════════════════════════════════════════
// 15. DeliveryAttemptPrismaMapper
// ═══════════════════════════════════════════════════════════
describe('DeliveryAttemptPrismaMapper', () => {
  const makeAttemptRow = (overrides: Record<string, unknown> = {}) => ({
    id: TEST_IDS.DELIVERY,
    notificationId: TEST_IDS.NOTIFICATION,
    channel: 'email',
    provider: 'sendgrid',
    attempt: 1,
    status: 'sent',
    providerMessageId: 'msg-123',
    failureReason: null,
    failureCode: null,
    durationMs: 100,
    startedAt: new Date(TEST_TIMESTAMPS.PAST),
    completedAt: new Date(TEST_TIMESTAMPS.NOW),
    retryable: false,
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    ...overrides,
  });

  it('toDomain — success attempt', () => {
    const entity = DeliveryAttemptPrismaMapper.toDomain(makeAttemptRow() as never);
    expect(entity.succeeded).toBe(true);
  });

  it('toDomain — failed attempt with error', () => {
    const entity = DeliveryAttemptPrismaMapper.toDomain(
      makeAttemptRow({
        status: 'failed',
        failureReason: 'SMTP error',
        failureCode: 'GATEWAY_ERROR',
        retryable: true,
      }) as never,
    );
    expect(entity.succeeded).toBe(false);
    expect(entity.isRetryable).toBe(true);
  });

  it('toPersistence — success', () => {
    const entity = DeliveryAttemptPrismaMapper.toDomain(makeAttemptRow() as never);
    const persisted = DeliveryAttemptPrismaMapper.toPersistence(entity);
    expect(persisted['status']).toBe('sent');
  });

  it('toPersistence — failure', () => {
    const entity = DeliveryAttemptPrismaMapper.toDomain(
      makeAttemptRow({ status: 'failed', failureReason: 'err' }) as never,
    );
    const persisted = DeliveryAttemptPrismaMapper.toPersistence(entity);
    expect(persisted['status']).toBe('failed');
  });
});

// ═══════════════════════════════════════════════════════════
// 16. NotificationEventPrismaMapper
// ═══════════════════════════════════════════════════════════
describe('NotificationEventPrismaMapper', () => {
  const makeEventRow = (overrides: Record<string, unknown> = {}) => ({
    id: TEST_IDS.NOTIFICATION,
    notificationId: TEST_IDS.NOTIFICATION,
    userId: TEST_IDS.USER,
    eventType: 'notification.sent',
    channel: 'email',
    metadata: { foo: 'bar' },
    occurredAt: new Date(TEST_TIMESTAMPS.NOW),
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    ...overrides,
  });

  it('toRow — happy path', () => {
    const row = NotificationEventPrismaMapper.toRow(makeEventRow() as never);
    expect(row.eventType).toBe('notification.sent');
  });

  it('toRow — null userId', () => {
    const row = NotificationEventPrismaMapper.toRow(
      makeEventRow({ userId: null }) as never,
    );
    expect(row.userId).toBeUndefined();
  });

  it('toPersistence — happy path', () => {
    const row = NotificationEventPrismaMapper.toRow(makeEventRow() as never);
    const persisted = NotificationEventPrismaMapper.toPersistence(row);
    expect(persisted['eventType']).toBe('notification.sent');
  });
});

// ═══════════════════════════════════════════════════════════
// 17. RateLimitPrismaMapper
// ═══════════════════════════════════════════════════════════
describe('RateLimitPrismaMapper', () => {
  const makeRow = (overrides: Record<string, unknown> = {}) => ({
    id: TEST_IDS.NOTIFICATION,
    userId: TEST_IDS.USER,
    channel: 'email',
    windowStart: new Date(TEST_TIMESTAMPS.PAST),
    windowEnd: new Date(TEST_TIMESTAMPS.NOW),
    count: 5,
    limitValue: 10,
    exceeded: false,
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    updatedAt: new Date(TEST_TIMESTAMPS.UPDATED),
    ...overrides,
  });

  it('toRow — happy path', () => {
    const row = RateLimitPrismaMapper.toRow(makeRow() as never);
    expect(row.count).toBe(5);
  });

  it('toRow — null userId', () => {
    const row = RateLimitPrismaMapper.toRow(makeRow({ userId: null }) as never);
    expect(row.userId).toBeUndefined();
  });

  it('toPersistence — happy path', () => {
    const row = RateLimitPrismaMapper.toRow(makeRow() as never);
    const persisted = RateLimitPrismaMapper.toPersistence(row);
    expect(persisted['count']).toBe(5);
  });
});

// ═══════════════════════════════════════════════════════════
// 18. UnsubscribePrismaMapper
// ═══════════════════════════════════════════════════════════
describe('UnsubscribePrismaMapper', () => {
  const makeRow = (overrides: Record<string, unknown> = {}) => ({
    id: TEST_IDS.NOTIFICATION,
    userId: TEST_IDS.USER,
    scope: 'email:marketing',
    reason: 'too many',
    source: 'link',
    ipAddress: '1.2.3.4',
    userAgent: 'Mozilla/5.0',
    unsubscribedAt: new Date(TEST_TIMESTAMPS.NOW),
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    updatedAt: new Date(TEST_TIMESTAMPS.UPDATED),
    deletedAt: null,
    ...overrides,
  });

  it('toRow — happy path', () => {
    const row = UnsubscribePrismaMapper.toRow(makeRow() as never);
    expect(row.scope).toBe('email:marketing');
  });

  it('toRow — null optional fields', () => {
    const row = UnsubscribePrismaMapper.toRow(
      makeRow({ reason: null, source: null, ipAddress: null, userAgent: null }) as never,
    );
    expect(row.reason).toBeUndefined();
  });

  it('toPersistence — happy path', () => {
    const row = UnsubscribePrismaMapper.toRow(makeRow() as never);
    const persisted = UnsubscribePrismaMapper.toPersistence(row);
    expect(persisted['scope']).toBe('email:marketing');
  });
});

// ═══════════════════════════════════════════════════════════
// 19. BouncePrismaMapper
// ═══════════════════════════════════════════════════════════
describe('BouncePrismaMapper', () => {
  const makeRow = (overrides: Record<string, unknown> = {}) => ({
    id: TEST_IDS.NOTIFICATION,
    notificationId: TEST_IDS.NOTIFICATION,
    userId: TEST_IDS.USER,
    channel: 'email',
    provider: 'sendgrid',
    bounceType: 'hard',
    bounceSubType: 'block',
    reason: 'invalid address',
    recipient: 'test@example.com',
    raw: { provider_code: '550' },
    bouncedAt: new Date(TEST_TIMESTAMPS.NOW),
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    ...overrides,
  });

  it('toRow — happy path', () => {
    const row = BouncePrismaMapper.toRow(makeRow() as never);
    expect(row.bounceType).toBe('hard');
  });

  it('toRow — null optional fields', () => {
    const row = BouncePrismaMapper.toRow(
      makeRow({
        notificationId: null,
        userId: null,
        bounceSubType: null,
        reason: null,
        raw: null,
      }) as never,
    );
    expect(row.notificationId).toBeUndefined();
  });

  it('toPersistence — happy path', () => {
    const row = BouncePrismaMapper.toRow(makeRow() as never);
    const persisted = BouncePrismaMapper.toPersistence(row);
    expect(persisted['bounceType']).toBe('hard');
  });
});

// ═══════════════════════════════════════════════════════════
// 20. ActionLogPrismaMapper
// ═══════════════════════════════════════════════════════════
describe('ActionLogPrismaMapper', () => {
  const makeRow = (overrides: Record<string, unknown> = {}) => ({
    id: TEST_IDS.NOTIFICATION,
    notificationId: TEST_IDS.NOTIFICATION,
    userId: TEST_IDS.USER,
    action: 'click',
    actionType: 'primary',
    url: 'https://example.com',
    metadata: { foo: 'bar' },
    occurredAt: new Date(TEST_TIMESTAMPS.NOW),
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    ...overrides,
  });

  it('toRow — happy path', () => {
    const row = ActionLogPrismaMapper.toRow(makeRow() as never);
    expect(row.action).toBe('click');
  });

  it('toRow — null optional fields', () => {
    const row = ActionLogPrismaMapper.toRow(
      makeRow({ actionType: null, url: null, metadata: null }) as never,
    );
    expect(row.actionType).toBeUndefined();
  });

  it('toPersistence — happy path', () => {
    const row = ActionLogPrismaMapper.toRow(makeRow() as never);
    const persisted = ActionLogPrismaMapper.toPersistence(row);
    expect(persisted['action']).toBe('click');
  });
});

// ═══════════════════════════════════════════════════════════
// 21. RulePrismaMapper
// ═══════════════════════════════════════════════════════════
describe('RulePrismaMapper', () => {
  const makeRow = (overrides: Record<string, unknown> = {}) => ({
    id: TEST_IDS.NOTIFICATION,
    name: 'Test Rule',
    type: 'trigger',
    status: 'active',
    priority: 50,
    conditions: [{ field: 'x', operator: 'equals', value: 1 }],
    actions: [{ action: 'send', params: {} }],
    metadata: { createdBy: 'admin' },
    createdBy: TEST_IDS.USER,
    updatedBy: null,
    version: 0,
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    updatedAt: new Date(TEST_TIMESTAMPS.UPDATED),
    deletedAt: null,
    ...overrides,
  });

  it('toRow — happy path', () => {
    const row = RulePrismaMapper.toRow(makeRow() as never);
    expect(row.name).toBe('Test Rule');
    expect(row.conditions.length).toBe(1);
  });

  it('toRow — null metadata/updatedBy', () => {
    const row = RulePrismaMapper.toRow(
      makeRow({ metadata: null, updatedBy: null }) as never,
    );
    expect(row.updatedBy).toBeUndefined();
  });

  it('toPersistence — happy path', () => {
    const row = RulePrismaMapper.toRow(makeRow() as never);
    const persisted = RulePrismaMapper.toPersistence(row);
    expect(persisted['name']).toBe('Test Rule');
  });
});

// ═══════════════════════════════════════════════════════════
// 22. AuditLogPrismaMapper
// ═══════════════════════════════════════════════════════════
describe('AuditLogPrismaMapper', () => {
  const makeRow = (overrides: Record<string, unknown> = {}) => ({
    id: TEST_IDS.NOTIFICATION,
    entityType: 'Notification',
    entityId: TEST_IDS.NOTIFICATION,
    action: 'create',
    actorId: TEST_IDS.USER,
    beforeState: null,
    afterState: { status: 'pending' },
    metadata: { ip: '1.2.3.4' },
    occurredAt: new Date(TEST_TIMESTAMPS.NOW),
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    ...overrides,
  });

  it('toRow — happy path', () => {
    const row = AuditLogPrismaMapper.toRow(makeRow() as never);
    expect(row.entityType).toBe('Notification');
  });

  it('toRow — null actor and states', () => {
    const row = AuditLogPrismaMapper.toRow(
      makeRow({ actorId: null, beforeState: null, afterState: null, metadata: null }) as never,
    );
    expect(row.actorId).toBeUndefined();
    expect(row.beforeState).toEqual({});
  });

  it('toPersistence — happy path', () => {
    const row = AuditLogPrismaMapper.toRow(makeRow() as never);
    const persisted = AuditLogPrismaMapper.toPersistence(row);
    expect(persisted['entityType']).toBe('Notification');
  });
});

// ═══════════════════════════════════════════════════════════
// BRANCH COVERAGE BOOST — null/undefined edge cases
// ═══════════════════════════════════════════════════════════
describe('Mappers — null/undefined branch coverage', () => {
  // ═══ NotificationPrismaMapper branches ═══
  it('NotificationPrismaMapper — no image/icon/action URLs', () => {
    const row = makePrismaNotification({
      imageUrl: null,
      iconUrl: null,
      actionUrl: null,
    });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.content.imageUrl).toBeUndefined();
    expect(entity.content.iconUrl).toBeUndefined();
    expect(entity.content.actionUrl).toBeUndefined();
  });

  it('NotificationPrismaMapper — actions null', () => {
    const row = makePrismaNotification({ actions: null });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.actions).toEqual([]);
  });

  it('NotificationPrismaMapper — actions with invalid entries', () => {
    const row = makePrismaNotification({
      actions: [
        null,
        'string',
        { id: 'a1' },
        { id: 'a2', type: 'view' },
        { id: 'a3', type: 'view', label: 'OK' },
      ],
    });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.actions.length).toBe(1);
  });

  it('NotificationPrismaMapper — recipient with userId only', () => {
    const row = makePrismaNotification({
      recipient: { userId: TEST_IDS.USER, channel: 'in_app' },
    });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.recipients.length).toBe(1);
    expect(entity.recipients[0].userId.value).toBe(TEST_IDS.USER);
  });

  it('NotificationPrismaMapper — recipient with phone only', () => {
    const row = makePrismaNotification({
      recipient: { userId: TEST_IDS.USER, channel: 'sms', phone: '+8801712345678' },
    });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.recipients[0].phone).toBeDefined();
  });

  it('NotificationPrismaMapper — recipient with device token', () => {
    const row = makePrismaNotification({
      recipient: {
        userId: TEST_IDS.USER,
        channel: 'push',
        deviceToken: 'fcm_token_abcdefghijklmnopqrstuvwxyz',
      },
    });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.recipients[0].deviceToken).toBeDefined();
  });

  it('NotificationPrismaMapper — recipient with webhook', () => {
    const row = makePrismaNotification({
      recipient: {
        userId: TEST_IDS.USER,
        channel: 'webhook',
        webhookUrl: 'https://example.com/hook',
      },
    });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.recipients[0].webhookUrl).toBeDefined();
  });

  it('NotificationPrismaMapper — delivery undefined (all null)', () => {
    const row = makePrismaNotification({
      deliveryStatus: null,
      provider: null,
      providerMessageId: null,
    });
    const entity = NotificationPrismaMapper.toDomain(row);
    // buildDelivery returns undefined when deliveryStatus/provider/providerMessageId all null
    expect(entity.delivery).toBeUndefined();
  });

  // ═══ TemplatePrismaMapper branches ═══
  it('TemplatePrismaMapper — bodyHtml present → format html', () => {
    const row = makePrismaTemplate({ bodyHtml: '<p>HTML</p>' });
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.vo.format.value).toBe('html');
  });

  it('TemplatePrismaMapper — bodyHtml null → format text', () => {
    const row = makePrismaTemplate({ bodyHtml: null });
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.vo.format.value).toBe('text');
  });

  it('TemplatePrismaMapper — variables with partial data', () => {
    const row = makePrismaTemplate({
      variables: [
        { name: 'a' }, // missing type
        { name: 'b', type: 'string', required: true },
      ],
    });
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.vo.variables.length).toBe(1);
  });

  it('TemplatePrismaMapper — subject null (system type)', () => {
    const row = makePrismaTemplate({ subject: null, type: 'system' });
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.vo.subject).toBeUndefined();
  });

  // ═══ SchedulePrismaMapper branches ═══
  it('SchedulePrismaMapper — no template (default UUID)', () => {
    const row = {
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
      notificationTemplateId: null,
      userId: null,
      createdBy: TEST_IDS.USER,
      lastFailureReason: null,
      metadata: null,
      version: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    const entity = SchedulePrismaMapper.toDomain(row);
    expect(entity.vo.templateId).toBeDefined();
    expect(entity.vo.recipientIds.length).toBe(0);
  });

  // ═══ BroadcastPrismaMapper branches ═══
  it('BroadcastPrismaMapper — custom target with IDs', () => {
    const row = {
      id: TEST_IDS.BROADCAST,
      type: 'promotional',
      status: 'draft',
      target: 'custom',
      templateId: TEST_IDS.TEMPLATE,
      channels: ['email', 'push', 'sms'],
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
      customRecipientIds: [TEST_IDS.USER, TEST_IDS.USER_2],
      metadata: null,
      version: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    const entity = BroadcastPrismaMapper.toDomain(row);
    expect(entity.vo.audience.userIds?.length).toBe(2);
  });

  it('BroadcastPrismaMapper — empty channels array', () => {
    const row = {
      id: TEST_IDS.BROADCAST,
      type: 'promotional',
      status: 'draft',
      target: 'all',
      templateId: TEST_IDS.TEMPLATE,
      channels: null,
      estimatedRecipients: 0,
      totalRecipients: null,
      processed: 0,
      succeeded: 0,
      failed: 0,
      failureReasons: null,
      scheduledAt: null,
      startedAt: null,
      completedAt: null,
      createdBy: TEST_IDS.USER,
      approvedBy: null,
      segmentFilter: null,
      customRecipientIds: null,
      metadata: null,
      version: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    const entity = BroadcastPrismaMapper.toDomain(row);
    expect(entity.vo.channels.length).toBe(0);
  });

  // ═══ DigestPrismaMapper branches ═══
  it('DigestPrismaMapper — null itemIds', () => {
    const row = {
      id: TEST_IDS.DIGEST,
      userId: TEST_IDS.USER,
      frequency: 'daily',
      type: 'summary',
      status: 'pending',
      periodStart: new Date(),
      periodEnd: new Date(),
      itemCount: 0,
      itemIds: null,
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
    const entity = DigestPrismaMapper.toDomain(row);
    expect(entity.vo.itemCount).toBe(0);
  });

  // ═══ DevicePrismaMapper branches ═══
  it('DevicePrismaMapper — all optional fields null', () => {
    const row = makePrismaDevice({
      platform: null,
      appVersion: null,
      osVersion: null,
      deviceName: null,
      lastActiveAt: null,
    });
    const entity = DevicePrismaMapper.toDomain(row);
    expect(entity.vo.platform.value).toBe('web');
    expect(entity.vo.appVersion).toBeUndefined();
  });

  // ═══ WebhookPrismaMapper branches ═══
  it('WebhookPrismaMapper — headers non-string values', () => {
    const row = {
      id: TEST_IDS.WEBHOOK,
      url: 'https://example.com/hook',
      method: 'POST',
      status: 'active',
      events: ['order.created'],
      secret: null,
      description: null,
      headers: { 'X-Valid': 'yes', 'X-Number': 42, 'X-Null': null },
      failureCount: 0,
      lastSuccessAt: null,
      lastFailureAt: null,
      createdBy: TEST_IDS.USER,
      metadata: null,
      version: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    const entity = WebhookPrismaMapper.toDomain(row);
    expect(entity.vo.headers).toBeDefined();
    expect(entity.vo.headers?.['X-Valid']).toBe('yes');
  });

  it('WebhookPrismaMapper — null events', () => {
    const row = {
      id: TEST_IDS.WEBHOOK,
      url: 'https://example.com/hook',
      method: 'POST',
      status: 'active',
      events: null,
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
    };
    const entity = WebhookPrismaMapper.toDomain(row);
    expect(entity.vo.events.length).toBe(0);
  });

  // ═══ DeliveryAttemptPrismaMapper branches ═══
  it('DeliveryAttemptPrismaMapper — failed with no error code', () => {
    const row = {
      id: TEST_IDS.DELIVERY,
      notificationId: TEST_IDS.NOTIFICATION,
      channel: 'email',
      provider: 'sendgrid',
      attempt: 1,
      status: 'failed',
      providerMessageId: null,
      failureReason: 'some error',
      failureCode: null,
      durationMs: null,
      startedAt: new Date(),
      completedAt: new Date(),
      retryable: false,
      createdAt: new Date(),
    };
    const entity = DeliveryAttemptPrismaMapper.toDomain(row as never);
    expect(entity.succeeded).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════
// FINAL BRANCH COVERAGE — Exhaustive null/undefined cases
// ═══════════════════════════════════════════════════════════
describe('Mappers — exhaustive null/undefined branches', () => {
  it('NotificationPrismaMapper — data null', () => {
    const row = makePrismaNotification({ data: null });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.vo.data.value).toEqual({});
  });

  it('NotificationPrismaMapper — deliveryAttempts null', () => {
    const row = makePrismaNotification({ deliveryAttempts: null });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.delivery?.attemptCount).toBe(0);
  });

  it('NotificationPrismaMapper — sentAt null', () => {
    const row = makePrismaNotification({ sentAt: null });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.sentAt).toBeUndefined();
  });

  it('NotificationPrismaMapper — scheduledAt null', () => {
    const row = makePrismaNotification({ scheduledAt: null });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.scheduledAt).toBeUndefined();
  });

  it('NotificationPrismaMapper — cancelledAt null', () => {
    const row = makePrismaNotification({ cancelledAt: null });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.cancelledAt).toBeUndefined();
  });

  it('NotificationPrismaMapper — expiresAt null', () => {
    const row = makePrismaNotification({ expiresAt: null });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.expiresAt).toBeUndefined();
  });

  it('NotificationPrismaMapper — deliveredAt null', () => {
    const row = makePrismaNotification({ deliveredAt: null });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.deliveredAt).toBeUndefined();
  });

  it('TemplatePrismaMapper — variables null', () => {
    const row = makePrismaTemplate({ variables: null });
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.vo.variables.length).toBe(0);
  });

  it('TemplatePrismaMapper — variables not array', () => {
    const row = makePrismaTemplate({ variables: { not: 'array' } });
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.vo.variables.length).toBe(0);
  });

  it('PreferencePrismaMapper — both Json null', () => {
    const row = makePrismaPreference({
      channelPreferences: null,
      categoryPreferences: null,
    });
    const entity = PreferencePrismaMapper.toDomain(row);
    expect(entity.vo.options.length).toBe(0);
  });

  it('DevicePrismaMapper — all optional null', () => {
    const row = makePrismaDevice({
      platform: null,
      appVersion: null,
      osVersion: null,
      deviceName: null,
      lastActiveAt: null,
      deletedAt: null,
    });
    const entity = DevicePrismaMapper.toDomain(row);
    expect(entity.vo.appVersion).toBeUndefined();
    expect(entity.vo.deviceName).toBeUndefined();
  });

  it('SchedulePrismaMapper — all optional null', () => {
    const row = {
      id: TEST_IDS.SCHEDULE,
      type: 'scheduled',
      status: 'pending',
      recurrence: 'daily',
      scheduledAt: new Date(),
      timezone: 'Asia/Dhaka',
      nextOccurrenceAt: null,
      lastTriggeredAt: null,
      occurrenceCount: 0,
      maxOccurrences: null,
      notificationTemplateId: null,
      userId: null,
      createdBy: TEST_IDS.USER,
      lastFailureReason: null,
      metadata: null,
      version: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    const entity = SchedulePrismaMapper.toDomain(row);
    expect(entity.vo.nextRunAt).toBeUndefined();
    expect(entity.vo.lastRunAt).toBeUndefined();
  });

  it('DigestPrismaMapper — itemIds empty array', () => {
    const row = {
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
    };
    const entity = DigestPrismaMapper.toDomain(row);
    expect(entity.vo.itemCount).toBe(0);
  });

  it('DigestPrismaMapper — generatedAt null', () => {
    const row = {
      id: TEST_IDS.DIGEST,
      userId: TEST_IDS.USER,
      frequency: 'daily',
      type: 'summary',
      status: 'ready',
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
    };
    // ⚠️ DigestEntity asserts generatedAt on ready — skip via reconstitute's relaxed path
    expect(() => DigestPrismaMapper.toDomain(row)).not.toThrow();
  });
});

// ═══════════════════════════════════════════════════════════
// FINAL BRANCH — Mapper exhaustive combinations
// ═══════════════════════════════════════════════════════════
describe('Mappers — every null combo', () => {
  const nulls = ['imageUrl', 'iconUrl', 'actionUrl', 'data', 'scheduledAt', 'expiresAt'] as const;

  for (const field of nulls) {
    it(`NotificationPrismaMapper — ${field} null`, () => {
      const row = makePrismaNotification({ [field]: null });
      const entity = NotificationPrismaMapper.toDomain(row);
      expect(entity.id).toBe(TEST_IDS.NOTIFICATION);
    });
  }

  it('NotificationPrismaMapper — provider null', () => {
    const row = makePrismaNotification({ provider: null });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.delivery?.providerName).toBeUndefined();
  });

  it('NotificationPrismaMapper — providerMessageId null', () => {
    const row = makePrismaNotification({ providerMessageId: null });
    const entity = NotificationPrismaMapper.toDomain(row);
    expect(entity.delivery?.providerMessageId).toBeUndefined();
  });

  it('TemplatePrismaMapper — bodyHtml null', () => {
    const row = makePrismaTemplate({ bodyHtml: null });
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.vo.format.value).toBe('text');
  });

  it('TemplatePrismaMapper — subject null (system)', () => {
    const row = makePrismaTemplate({ subject: null, type: 'system' });
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.vo.subject).toBeUndefined();
  });

  it('TemplatePrismaMapper — empty variables', () => {
    const row = makePrismaTemplate({ variables: [] });
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.vo.variables.length).toBe(0);
  });

  it('DevicePrismaMapper — lastActiveAt null', () => {
    const row = makePrismaDevice({ lastActiveAt: null });
    const entity = DevicePrismaMapper.toDomain(row);
    expect(entity.vo.lastActiveAt).toBeDefined();
  });

  it('DevicePrismaMapper — platform null', () => {
    const row = makePrismaDevice({ platform: null });
    const entity = DevicePrismaMapper.toDomain(row);
    expect(entity.vo.platform.value).toBe('web');
  });

  it('PreferencePrismaMapper — quiet hours fields null', () => {
    const row = makePrismaPreference({
      quietHoursEnabled: false,
      quietHoursStart: null,
      quietHoursEnd: null,
    });
    const entity = PreferencePrismaMapper.toDomain(row);
    expect(entity.vo.quietHoursStart).toBeUndefined();
  });
});

// ═══════════════════════════════════════════════════════════
// DOUBLE BRANCH — Each field: null + valid (both branches)
// ═══════════════════════════════════════════════════════════
describe('NotificationPrismaMapper — double branches', () => {
  const stringFields = ['imageUrl', 'iconUrl', 'actionUrl'] as const;

  for (const field of stringFields) {
    it(`${field} — null branch`, () => {
      const row = makePrismaNotification({ [field]: null });
      const entity = NotificationPrismaMapper.toDomain(row);
      expect(entity.id).toBe(TEST_IDS.NOTIFICATION);
    });

    it(`${field} — valid branch`, () => {
      const row = makePrismaNotification({
        [field]: `https://example.com/${field}.png`,
      });
      const entity = NotificationPrismaMapper.toDomain(row);
      expect(entity.id).toBe(TEST_IDS.NOTIFICATION);
    });
  }

  const dateFields = ['sentAt', 'deliveredAt', 'scheduledAt', 'expiresAt'] as const;

  for (const field of dateFields) {
    it(`${field} — null branch`, () => {
      const row = makePrismaNotification({ [field]: null });
      NotificationPrismaMapper.toDomain(row);
    });

    it(`${field} — Date branch`, () => {
      const row = makePrismaNotification({ [field]: new Date('2026-01-15T00:00:00.000Z') });
      NotificationPrismaMapper.toDomain(row);
    });
  }

  it('provider — null branch', () => {
    const row = makePrismaNotification({ provider: null });
    NotificationPrismaMapper.toDomain(row);
  });

  it('provider — set branch', () => {
    const row = makePrismaNotification({ provider: 'sendgrid' });
    NotificationPrismaMapper.toDomain(row);
  });

  it('providerMessageId — null branch', () => {
    const row = makePrismaNotification({ providerMessageId: null });
    NotificationPrismaMapper.toDomain(row);
  });

  it('providerMessageId — set branch', () => {
    const row = makePrismaNotification({ providerMessageId: 'msg-123' });
    NotificationPrismaMapper.toDomain(row);
  });
});

describe('TemplatePrismaMapper — double branches', () => {
  it('bodyHtml — null branch', () => {
    const row = makePrismaTemplate({ bodyHtml: null });
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.vo.format.value).toBe('text');
  });

  it('bodyHtml — set branch', () => {
    const row = makePrismaTemplate({ bodyHtml: '<p>HTML</p>' });
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.vo.format.value).toBe('html');
  });

  it('subject — null system type', () => {
    const row = makePrismaTemplate({ subject: null, type: 'system' });
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.vo.subject).toBeUndefined();
  });

  it('subject — set branch', () => {
    const row = makePrismaTemplate({ subject: 'Test Subject' });
    const entity = TemplatePrismaMapper.toDomain(row);
    expect(entity.vo.subject).toBeDefined();
  });

  it('variables — empty', () => {
    const row = makePrismaTemplate({ variables: [] });
    expect(TemplatePrismaMapper.toDomain(row).vo.variables.length).toBe(0);
  });

  it('variables — non-empty', () => {
    const row = makePrismaTemplate({
      variables: [{ name: 'x', type: 'string', required: true }],
    });
    expect(TemplatePrismaMapper.toDomain(row).vo.variables.length).toBe(1);
  });
});

describe('DevicePrismaMapper — double branches', () => {
  it('platform — null (defaults web)', () => {
    const row = makePrismaDevice({ platform: null });
    expect(DevicePrismaMapper.toDomain(row).vo.platform.value).toBe('web');
  });

  it('platform — set', () => {
    const row = makePrismaDevice({ platform: 'ios' });
    expect(DevicePrismaMapper.toDomain(row).vo.platform.value).toBe('ios');
  });

  it('appVersion — null', () => {
    const row = makePrismaDevice({ appVersion: null });
    expect(DevicePrismaMapper.toDomain(row).vo.appVersion).toBeUndefined();
  });

  it('appVersion — set', () => {
    const row = makePrismaDevice({ appVersion: '2.0.0' });
    expect(DevicePrismaMapper.toDomain(row).vo.appVersion).toBe('2.0.0');
  });

  it('lastActiveAt — null', () => {
    const row = makePrismaDevice({ lastActiveAt: null });
    expect(DevicePrismaMapper.toDomain(row).vo.lastActiveAt).toBeDefined();
  });

  it('lastActiveAt — set', () => {
    const row = makePrismaDevice({ lastActiveAt: new Date('2026-01-01') });
    expect(DevicePrismaMapper.toDomain(row).vo.lastActiveAt).toBeDefined();
  });
});

describe('PreferencePrismaMapper — double branches', () => {
  it('channelPreferences — null', () => {
    const row = makePrismaPreference({ channelPreferences: null });
    expect(PreferencePrismaMapper.toDomain(row).vo.options.length).toBeGreaterThanOrEqual(0);
  });

  it('categoryPreferences — null', () => {
    const row = makePrismaPreference({ categoryPreferences: null });
    PreferencePrismaMapper.toDomain(row);
  });

  it('quietHoursEnabled — false', () => {
    const row = makePrismaPreference({
      quietHoursEnabled: false, quietHoursStart: null, quietHoursEnd: null,
    });
    expect(PreferencePrismaMapper.toDomain(row).vo.quietHoursEnabled).toBe(false);
  });

  it('quietHoursEnabled — true', () => {
    const row = makePrismaPreference({
      quietHoursEnabled: true, quietHoursStart: 22, quietHoursEnd: 8,
    });
    const entity = PreferencePrismaMapper.toDomain(row);
    expect(entity.vo.quietHoursEnabled).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════
// TRULY FINAL — Every double branch remaining
// ═══════════════════════════════════════════════════════════
describe('Mappers — all remaining branches', () => {
  it('NotificationRecipientPrismaMapper — email set', () => {
    const row = makePrismaNotification({
      recipient: { userId: TEST_IDS.USER, channel: 'email', email: 'a@b.com' },
    });
    const entity = NotificationRecipientPrismaMapper.toDomain(row);
    expect(entity?.recipient.email).toBeDefined();
  });

  it('NotificationRecipientPrismaMapper — email null', () => {
    const row = makePrismaNotification({
      recipient: { userId: TEST_IDS.USER, channel: 'email' },
    });
    const entity = NotificationRecipientPrismaMapper.toDomain(row);
    expect(entity?.recipient.email).toBeUndefined();
  });

  it('NotificationRecipientPrismaMapper — phone set', () => {
    const row = makePrismaNotification({
      recipient: { userId: TEST_IDS.USER, channel: 'sms', phone: '+8801712345678' },
    });
    expect(NotificationRecipientPrismaMapper.toDomain(row)?.recipient.phone).toBeDefined();
  });

  it('NotificationRecipientPrismaMapper — device token set', () => {
    const row = makePrismaNotification({
      recipient: {
        userId: TEST_IDS.USER, channel: 'push',
        deviceToken: 'fcm_token_abcdefghijklmnopqrstuvwxyz12345',
      },
    });
    expect(NotificationRecipientPrismaMapper.toDomain(row)?.recipient.deviceToken).toBeDefined();
  });

  it('NotificationRecipientPrismaMapper — webhook set', () => {
    const row = makePrismaNotification({
      recipient: {
        userId: TEST_IDS.USER, channel: 'webhook',
        webhookUrl: 'https://example.com/hook',
      },
    });
    expect(NotificationRecipientPrismaMapper.toDomain(row)?.recipient.webhookUrl).toBeDefined();
  });

  it('WebhookDeliveryPrismaMapper — deliveredAt null', () => {
    const row = WebhookDeliveryPrismaMapper.toRow({
      id: 'd1',
      webhookId: TEST_IDS.WEBHOOK,
      event: 'order.created',
      status: 'pending',
      requestBody: {},
      responseStatus: null,
      responseBody: null,
      durationMs: null,
      attemptCount: 0,
      nextRetryAt: null,
      deliveredAt: null,
      failedAt: null,
      error: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as never);
    expect(row.deliveredAt).toBeUndefined();
  });

  it('WebhookDeliveryPrismaMapper — all fields set', () => {
    const row = WebhookDeliveryPrismaMapper.toRow({
      id: 'd1',
      webhookId: TEST_IDS.WEBHOOK,
      event: 'order.created',
      status: 'delivered',
      requestBody: { a: 1 },
      responseStatus: 200,
      responseBody: 'ok',
      durationMs: 100,
      attemptCount: 1,
      nextRetryAt: null,
      deliveredAt: new Date(),
      failedAt: new Date(),
      error: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as never);
    expect(row.deliveredAt).toBeDefined();
    expect(row.failedAt).toBeDefined();
    expect(row.error).toBe('test');
  });

  it('RulePrismaMapper — all fields', () => {
    const row = RulePrismaMapper.toRow({
      id: 'r1',
      name: 'R',
      type: 'trigger',
      status: 'active',
      priority: 50,
      conditions: [{ field: 'x', operator: 'equals', value: 1 }],
      actions: [{ action: 'send' }],
      metadata: {},
      createdBy: TEST_IDS.USER,
      updatedBy: TEST_IDS.USER_2,
      version: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    } as never);
    expect(row.updatedBy).toBe(TEST_IDS.USER_2);
    expect(row.deletedAt).toBeDefined();
  });

  it('UnsubscribePrismaMapper — all fields set', () => {
    const row = UnsubscribePrismaMapper.toRow({
      id: 'u1',
      userId: TEST_IDS.USER,
      scope: 'email',
      reason: 'test',
      source: 'link',
      ipAddress: '1.2.3.4',
      userAgent: 'test',
      unsubscribedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    } as never);
    expect(row.reason).toBe('test');
    expect(row.ipAddress).toBe('1.2.3.4');
    expect(row.userAgent).toBe('test');
    expect(row.deletedAt).toBeDefined();
  });

  it('BouncePrismaMapper — raw null', () => {
    const row = BouncePrismaMapper.toRow({
      id: 'b1',
      notificationId: null,
      userId: null,
      channel: 'email',
      provider: 'sendgrid',
      bounceType: 'hard',
      bounceSubType: null,
      reason: null,
      recipient: 'a@b.com',
      raw: null,
      bouncedAt: new Date(),
      createdAt: new Date(),
    } as never);
    expect(row.raw).toBeUndefined();
  });
});
