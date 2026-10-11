import { describe, it, expect } from '@jest/globals';
import { NotificationPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/notification.prisma.mapper.js';
import { TemplatePrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/template.prisma.mapper.js';
import { SchedulePrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/schedule.prisma.mapper.js';
import { BroadcastPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/broadcast.prisma.mapper.js';
import { DigestPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/digest.prisma.mapper.js';
import { PreferencePrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/preference.prisma.mapper.js';
import { DevicePrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/device.prisma.mapper.js';
import { WebhookPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/webhook.prisma.mapper.js';

const NOTIF_ID = '00000000-0000-0000-0000-000000000001';
const USER_ID = '00000000-0000-0000-0000-000000000002';
const TEMPLATE_ID = '00000000-0000-0000-0000-000000000003';

const baseRow = {
  id: NOTIF_ID,
  userId: USER_ID,
  type: 'transactional',
  category: 'order',
  channel: 'email',
  priority: 'normal',
  status: 'pending',
  title: 'T',
  body: 'B',
  imageUrl: null,
  iconUrl: null,
  actionUrl: null,
  actions: null,
  data: null,
  reference: null,
  recipient: null,
  deliveryStatus: 'queued',
  deliveryAttempts: 0,
  retryAttempts: 0,
  provider: null,
  providerMessageId: null,
  failureReason: null,
  failureCode: null,
  readStatus: 'unread',
  expiresAt: null,
  scheduledAt: null,
  sentAt: null,
  deliveredAt: null,
  readAt: null,
  archivedAt: null,
  failedAt: null,
  cancelledAt: null,
  expiredAt: null,
  snoozedUntil: null,
  metadata: null,
  version: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

describe('NotificationPrismaMapper', () => {
  it('toDomain minimal', () => {
    const e = NotificationPrismaMapper.toDomain(baseRow as never);
    expect(e.id).toBe(NOTIF_ID);
    expect(e.userId.value).toBe(USER_ID);
  });

  it('toDomain with actions', () => {
    const e = NotificationPrismaMapper.toDomain({
      ...baseRow,
      actions: [{ action: 'view', type: 'primary', label: 'V', url: 'https://x.com', payload: {} }],
    } as never);
    expect(e.actions?.count).toBe(1);
  });

  it('toDomain with reference', () => {
    const e = NotificationPrismaMapper.toDomain({
      ...baseRow,
      reference: { type: 'order', id: '123' },
    } as never);
    expect(e.reference?.type).toBe('order');
  });

  it('toDomain with data', () => {
    const e = NotificationPrismaMapper.toDomain({
      ...baseRow,
      data: { orderId: '1' },
    } as never);
    expect(e.data).toEqual({ orderId: '1' });
  });

  it('toDomain with failureReason', () => {
    const e = NotificationPrismaMapper.toDomain({
      ...baseRow,
      status: 'failed',
      failureReason: 'timeout',
    } as never);
    expect(e.failureReason?.value).toBe('timeout');
  });

  it('toDomain with recipient email', () => {
    const e = NotificationPrismaMapper.toDomain({
      ...baseRow,
      recipient: { userId: USER_ID, email: 'x@y.com' },
    } as never);
    expect(e.recipient.hasEmail()).toBe(true);
  });

  it('toDomain with recipient phone', () => {
    const e = NotificationPrismaMapper.toDomain({
      ...baseRow,
      recipient: { userId: USER_ID, phone: '+8801712345678' },
    } as never);
    expect(e.recipient.hasPhone()).toBe(true);
  });

  it('toDomain with recipient deviceToken', () => {
    const e = NotificationPrismaMapper.toDomain({
      ...baseRow,
      recipient: { userId: USER_ID, deviceToken: 'tk-abcdefghijklmnop' },
    } as never);
    expect(e.recipient.hasDeviceToken()).toBe(true);
  });

  it('toPersistence minimal', () => {
    const e = NotificationPrismaMapper.toDomain(baseRow as never);
    const raw = NotificationPrismaMapper.toPersistence(e);
    expect(raw['id']).toBe(NOTIF_ID);
  });

  it('toPersistence with actions', () => {
    const e = NotificationPrismaMapper.toDomain({
      ...baseRow,
      actions: [{ action: 'view', type: 'primary', label: 'V', url: 'https://x.com' }],
    } as never);
    const raw = NotificationPrismaMapper.toPersistence(e);
    expect(Array.isArray(raw['actions'])).toBe(true);
  });

  it('round-trip consistent', () => {
    const e1 = NotificationPrismaMapper.toDomain(baseRow as never);
    const raw = NotificationPrismaMapper.toPersistence(e1);
    expect(raw['title']).toBe('T');
  });
});

describe('TemplatePrismaMapper', () => {
  const row = {
    id: TEMPLATE_ID,
    name: 'Order',
    slug: 'order',
    type: 'email',
    status: 'active',
    category: 'order',
    locale: 'en',
    subject: 'S',
    body: 'B',
    bodyHtml: null,
    variables: [],
    version: 1,
    parentId: null,
    createdBy: USER_ID,
    updatedBy: null,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('toDomain minimal', () => {
    const e = TemplatePrismaMapper.toDomain(row as never);
    expect(e.slug).toBe('order');
  });

  it('toDomain with variables', () => {
    const e = TemplatePrismaMapper.toDomain({
      ...row,
      variables: [{ name: 'x', type: 'string', required: true, defaultValue: 'y', description: 'z' }],
    } as never);
    expect(e.variables.length).toBe(1);
  });

  it('toPersistence', () => {
    const e = TemplatePrismaMapper.toDomain(row as never);
    const raw = TemplatePrismaMapper.toPersistence(e);
    expect(raw['slug']).toBe('order');
  });
});

describe('SchedulePrismaMapper', () => {
  const row = {
    id: NOTIF_ID,
    type: 'scheduled',
    status: 'pending',
    recurrence: 'none',
    scheduledAt: new Date(),
    timezone: 'Asia/Dhaka',
    nextOccurrenceAt: null,
    lastTriggeredAt: null,
    occurrenceCount: 0,
    maxOccurrences: null,
    notificationTemplateId: null,
    userId: null,
    createdBy: USER_ID,
    lastFailureReason: null,
    metadata: null,
    version: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  it('toDomain', () => {
    const e = SchedulePrismaMapper.toDomain(row as never);
    expect(e.timezone).toBe('Asia/Dhaka');
  });

  it('toDomain with nextOccurrenceAt', () => {
    const e = SchedulePrismaMapper.toDomain({
      ...row,
      nextOccurrenceAt: new Date(Date.now() + 3600_000),
    } as never);
    expect(e.nextOccurrenceAt).toBeDefined();
  });

  it('toPersistence', () => {
    const e = SchedulePrismaMapper.toDomain(row as never);
    const raw = SchedulePrismaMapper.toPersistence(e);
    expect(raw['timezone']).toBe('Asia/Dhaka');
  });
});

describe('BroadcastPrismaMapper', () => {
  const row = {
    id: NOTIF_ID,
    type: 'all_users',
    status: 'draft',
    target: 'all',
    templateId: TEMPLATE_ID,
    channels: ['email'],
    estimatedRecipients: null,
    totalRecipients: null,
    processed: 0,
    succeeded: 0,
    failed: 0,
    failureReasons: [],
    scheduledAt: null,
    startedAt: null,
    completedAt: null,
    createdBy: USER_ID,
    approvedBy: null,
    metadata: null,
    version: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  it('toDomain', () => {
    const e = BroadcastPrismaMapper.toDomain(row as never);
    expect(e.templateId).toBe(TEMPLATE_ID);
  });

  it('toDomain with failureReasons + timestamps', () => {
    const e = BroadcastPrismaMapper.toDomain({
      ...row,
      failureReasons: ['a', 'b'],
      scheduledAt: new Date(),
      startedAt: new Date(),
      completedAt: new Date(),
      approvedBy: USER_ID,
    } as never);
    expect(e.failureReasons.length).toBe(2);
    expect(e.approvedBy).toBeDefined();
  });

  it('toPersistence', () => {
    const e = BroadcastPrismaMapper.toDomain(row as never);
    const raw = BroadcastPrismaMapper.toPersistence(e);
    expect(raw['templateId']).toBe(TEMPLATE_ID);
  });
});

describe('DigestPrismaMapper', () => {
  const row = {
    id: NOTIF_ID,
    userId: USER_ID,
    frequency: 'daily',
    type: 'summary',
    status: 'pending',
    periodStart: new Date(Date.now() - 86_400_000),
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

  it('toDomain', () => {
    const e = DigestPrismaMapper.toDomain(row as never);
    expect(e.userId).toBe(USER_ID);
  });

  it('toDomain with optional fields', () => {
    const e = DigestPrismaMapper.toDomain({
      ...row,
      itemIds: ['a'],
      channel: 'email',
      generatedAt: new Date(),
      sentAt: new Date(),
      failureReason: 'err',
    } as never);
    expect(e.channel).toBe('email');
    expect(e.failureReason).toBe('err');
  });

  it('toPersistence', () => {
    const e = DigestPrismaMapper.toDomain(row as never);
    const raw = DigestPrismaMapper.toPersistence(e);
    expect(raw['frequency']).toBe('daily');
  });
});

describe('PreferencePrismaMapper', () => {
  const row = {
    id: NOTIF_ID,
    userId: USER_ID,
    channelPreferences: { email: true, sms: false },
    categoryPreferences: { order: true },
    quietHoursEnabled: true,
    quietHoursStart: 22,
    quietHoursEnd: 8,
    timezone: 'Asia/Dhaka',
    locale: 'en',
    version: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  it('toDomain', () => {
    const e = PreferencePrismaMapper.toDomain(row as never);
    expect(e.isChannelEnabled('email')).toBe(true);
  });

  it('toDomain with null quietHours + null locale', () => {
    const e = PreferencePrismaMapper.toDomain({
      ...row,
      quietHoursEnabled: false,
      quietHoursStart: null,
      quietHoursEnd: null,
      locale: null,
    } as never);
    expect(e.quietHoursStart).toBeUndefined();
    expect(e.locale).toBeUndefined();
  });

  it('toDomain with non-object prefs', () => {
    const e = PreferencePrismaMapper.toDomain({
      ...row,
      channelPreferences: 'not-object',
      categoryPreferences: null,
    } as never);
    expect(e.channelPreferences).toEqual({});
  });

  it('toPersistence', () => {
    const e = PreferencePrismaMapper.toDomain(row as never);
    const raw = PreferencePrismaMapper.toPersistence(e);
    expect(raw['userId']).toBe(USER_ID);
  });
});

describe('DevicePrismaMapper', () => {
  const row = {
    id: NOTIF_ID,
    userId: USER_ID,
    type: 'android',
    status: 'active',
    token: 'tk-abcdefghijklmnop',
    platform: 'android',
    appVersion: '1.0',
    osVersion: '14',
    deviceName: 'Phone',
    lastActiveAt: new Date(),
    registeredAt: new Date(),
    version: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  it('toDomain', () => {
    const e = DevicePrismaMapper.toDomain(row as never);
    expect(e.userId).toBe(USER_ID);
  });

  it('toDomain with null optional fields', () => {
    const e = DevicePrismaMapper.toDomain({
      ...row,
      platform: null,
      appVersion: null,
      osVersion: null,
      deviceName: null,
      lastActiveAt: null,
    } as never);
    expect(e.platform).toBeUndefined();
    expect(e.lastActiveAt).toBeUndefined();
  });

  it('toPersistence', () => {
    const e = DevicePrismaMapper.toDomain(row as never);
    const raw = DevicePrismaMapper.toPersistence(e);
    expect(raw['type']).toBe('android');
  });
});

describe('WebhookPrismaMapper', () => {
  const row = {
    id: NOTIF_ID,
    url: 'https://example.com/hook',
    method: 'POST',
    status: 'active',
    events: ['order.created'],
    secret: '0123456789abcdef0123456789abcdef',
    description: 'desc',
    headers: null,
    failureCount: 0,
    lastSuccessAt: null,
    lastFailureAt: null,
    createdBy: USER_ID,
    metadata: null,
    version: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  it('toDomain', () => {
    const e = WebhookPrismaMapper.toDomain(row as never);
    expect(e.url.value).toBe('https://example.com/hook');
    expect(e.hasSecret()).toBe(true);
  });

  it('toDomain without secret', () => {
    const e = WebhookPrismaMapper.toDomain({ ...row, secret: null } as never);
    expect(e.hasSecret()).toBe(false);
  });

  it('toPersistence', () => {
    const e = WebhookPrismaMapper.toDomain(row as never);
    const raw = WebhookPrismaMapper.toPersistence(e);
    expect(raw['url']).toBe('https://example.com/hook');
  });
});
