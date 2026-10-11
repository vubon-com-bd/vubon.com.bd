/**
 * Prisma repositories — mocked PrismaService
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NotificationPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/notification.prisma.repository.js';
import { TemplatePrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/template.prisma.repository.js';
import { SchedulePrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/schedule.prisma.repository.js';
import { BroadcastPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/broadcast.prisma.repository.js';
import { DigestPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/digest.prisma.repository.js';
import { PreferencePrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/preference.prisma.repository.js';
import { DevicePrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/device.prisma.repository.js';
import { WebhookPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/webhook.prisma.repository.js';
import { NotificationIdVO } from '../../../../../../src/module/domain/value-objects/primitives/notification-id.vo.js';
import { UserIdVO } from '../../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { NotificationStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/notification-status.vo.js';
import { NotificationChannelVO } from '../../../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { ReadStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/read-status.vo.js';
import { TemplateIdVO } from '../../../../../../src/module/domain/value-objects/primitives/template-id.vo.js';
import { TemplateLocaleVO } from '../../../../../../src/module/domain/value-objects/primitives/template-locale.vo.js';
import { ScheduleIdVO } from '../../../../../../src/module/domain/value-objects/primitives/schedule-id.vo.js';
import { ScheduleStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/schedule-status.vo.js';
import { BroadcastIdVO } from '../../../../../../src/module/domain/value-objects/primitives/broadcast-id.vo.js';
import { BroadcastStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/broadcast-status.vo.js';
import { DigestIdVO } from '../../../../../../src/module/domain/value-objects/primitives/digest-id.vo.js';
import { DigestStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/digest-status.vo.js';
import { DigestFrequencyVO } from '../../../../../../src/module/domain/value-objects/primitives/digest-frequency.vo.js';
import { DeviceIdVO } from '../../../../../../src/module/domain/value-objects/primitives/device-id.vo.js';
import { DeviceTokenVO } from '../../../../../../src/module/domain/value-objects/primitives/device-token.vo.js';
import { DeviceStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/device-status.vo.js';
import { WebhookIdVO } from '../../../../../../src/module/domain/value-objects/primitives/webhook-id.vo.js';
import { WebhookStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/webhook-status.vo.js';
import { WebhookEventVO } from '../../../../../../src/module/domain/value-objects/primitives/webhook-event.vo.js';
import { PreferenceIdVO } from '../../../../../../src/module/domain/value-objects/primitives/preference-id.vo.js';
import { NotificationEntity } from '../../../../../../src/module/domain/entities/notification.entity.js';
import { NotificationTypeVO } from '../../../../../../src/module/domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../../../../src/module/domain/value-objects/primitives/notification-category.vo.js';
import { NotificationPriorityVO } from '../../../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../../../../src/module/domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../../../../src/module/domain/value-objects/primitives/notification-body.vo.js';
import { NotificationContentVO } from '../../../../../../src/module/domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../../../../src/module/domain/value-objects/composites/notification-recipient.vo.js';

const NOTIF_ID = '00000000-0000-0000-0000-000000000001';
const USER_ID = '00000000-0000-0000-0000-000000000002';
const TEMPLATE_ID = '00000000-0000-0000-0000-000000000003';

const notifRow = {
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

function makePrisma() {
  const delegate = {
    findFirst: jest.fn().mockResolvedValue(null),
    findUnique: jest.fn().mockResolvedValue(null),
    findMany: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockImplementation(async (args: { data: unknown }) => args.data),
    update: jest.fn().mockImplementation(async (args: { data: unknown }) => args.data),
    delete: jest.fn().mockResolvedValue({}),
    count: jest.fn().mockResolvedValue(0),
    updateMany: jest.fn().mockResolvedValue({ count: 0 }),
  };
  return {
    notification: { ...delegate },
    notificationTemplate: { ...delegate },
    notificationSchedule: { ...delegate },
    notificationBroadcast: { ...delegate },
    notificationDigest: { ...delegate },
    notificationPreference: { ...delegate },
    notificationDevice: { ...delegate },
    notificationWebhook: { ...delegate },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Prisma = ReturnType<typeof makePrisma>;

function buildEntity(): NotificationEntity {
  const ch = NotificationChannelVO.email();
  return NotificationEntity.create({
    id: NOTIF_ID,
    now: new Date().toISOString(),
    props: {
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.order(),
      channel: ch,
      priority: NotificationPriorityVO.normal(),
      content: NotificationContentVO.create({
        title: NotificationTitleVO.create('T'),
        body: NotificationBodyVO.create('B'),
      }),
      recipient: NotificationRecipientVO.reconstitute({
        userId: UserIdVO.reconstitute(USER_ID),
        channel: ch,
      }),
    },
  });
}

describe('NotificationPrismaRepository', () => {
  let prisma: Prisma;
  let repo: NotificationPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new NotificationPrismaRepository(prisma as never); });

  it('findByIdVO returns null when missing', async () => {
    const r = await repo.findByIdVO(NotificationIdVO.create(NOTIF_ID));
    expect(r).toBeNull();
  });

  it('findByIdVO maps row', async () => {
    (prisma.notification.findFirst as jest.Mock).mockResolvedValueOnce(notifRow);
    const r = await repo.findByIdVO(NotificationIdVO.create(NOTIF_ID));
    expect(r?.id).toBe(NOTIF_ID);
  });

  it('findById', async () => {
    (prisma.notification.findFirst as jest.Mock).mockResolvedValueOnce(notifRow);
    const r = await repo.findById(NOTIF_ID);
    expect(r).toBeDefined();
  });

  it('findAll', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([notifRow]);
    const r = await repo.findAll();
    expect(r.length).toBe(1);
  });

  it('findByUserId', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([notifRow]);
    const r = await repo.findByUserId(UserIdVO.create(USER_ID));
    expect(r.length).toBe(1);
  });

  it('findByStatus', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([notifRow]);
    const r = await repo.findByStatus(NotificationStatusVO.pending());
    expect(r.length).toBe(1);
  });

  it('findByChannel', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([notifRow]);
    const r = await repo.findByChannel(NotificationChannelVO.email());
    expect(r.length).toBe(1);
  });

  it('findByType', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([notifRow]);
    const r = await repo.findByType({ value: 'transactional' } as never);
    expect(r.length).toBe(1);
  });

  it('findByCategory', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([notifRow]);
    const r = await repo.findByCategory({ value: 'order' } as never);
    expect(r.length).toBe(1);
  });

  it('findByReadStatus', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([notifRow]);
    const r = await repo.findByReadStatus(ReadStatusVO.unread());
    expect(r.length).toBe(1);
  });

  it('findUnreadByUserId', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([notifRow]);
    const r = await repo.findUnreadByUserId(UserIdVO.create(USER_ID));
    expect(r.length).toBe(1);
  });

  it('findByReference', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([]);
    const r = await repo.findByReference('order', '123');
    expect(r).toEqual([]);
  });

  it('findPaginated', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([notifRow]);
    (prisma.notification.count as jest.Mock).mockResolvedValueOnce(1);
    const r = await repo.findPaginated({
      page: 1, limit: 20,
      filter: { userId: USER_ID, status: 'pending', isRead: false },
    } as never);
    expect(r.total).toBe(1);
  });

  it('findPaginated with all filter fields', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([]);
    (prisma.notification.count as jest.Mock).mockResolvedValueOnce(0);
    await repo.findPaginated({
      page: 1, limit: 20,
      sortBy: 'priority', sortDir: 'asc',
      filter: {
        type: 'transactional', category: 'order', channel: 'email',
        status: 'pending', priority: 'normal', readStatus: 'unread',
        fromDate: '2026-01-01', toDate: '2026-12-31', search: 'order',
      },
    } as never);
    expect(prisma.notification.findMany).toHaveBeenCalled();
  });

  it('countUnread', async () => {
    (prisma.notification.count as jest.Mock).mockResolvedValueOnce(5);
    const r = await repo.countUnread(UserIdVO.create(USER_ID));
    expect(r).toBe(5);
  });

  it('getStats', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([
      { status: 'sent', channel: 'email', category: 'order', readStatus: 'read' },
      { status: 'failed', channel: 'email', category: 'order', readStatus: 'unread' },
    ]);
    const r = await repo.getStats();
    expect(r.total).toBe(2);
    expect(r.unread).toBe(1);
  });

  it('getStats with filters', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([]);
    await repo.getStats(USER_ID, '2026-01-01', '2026-12-31');
    expect(prisma.notification.findMany).toHaveBeenCalled();
  });

  it('findStalePending', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([]);
    const r = await repo.findStalePending(60);
    expect(r).toEqual([]);
  });

  it('findDueScheduled', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([]);
    const r = await repo.findDueScheduled();
    expect(r).toEqual([]);
  });

  it('findRetryable', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([]);
    const r = await repo.findRetryable(3);
    expect(r).toEqual([]);
  });

  it('findExpired', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([]);
    const r = await repo.findExpired();
    expect(r).toEqual([]);
  });

  it('save creates new when not exists', async () => {
    (prisma.notification.findUnique as jest.Mock).mockResolvedValueOnce(null);
    (prisma.notification.create as jest.Mock).mockResolvedValueOnce(notifRow);
    const r = await repo.save(buildEntity());
    expect(r.id).toBe(NOTIF_ID);
  });

  it('save updates existing', async () => {
    (prisma.notification.findUnique as jest.Mock).mockResolvedValueOnce({ id: NOTIF_ID });
    (prisma.notification.update as jest.Mock).mockResolvedValueOnce(notifRow);
    const r = await repo.save(buildEntity());
    expect(r.id).toBe(NOTIF_ID);
  });

  it('delete', async () => {
    await repo.delete(NOTIF_ID);
    expect(prisma.notification.delete).toHaveBeenCalled();
  });

  it('softDelete', async () => {
    await repo.softDelete(NOTIF_ID, 'u');
    expect(prisma.notification.update).toHaveBeenCalled();
  });

  it('exists', async () => {
    (prisma.notification.count as jest.Mock).mockResolvedValueOnce(1);
    expect(await repo.exists(NOTIF_ID)).toBe(true);
  });

  it('markAllReadForUser', async () => {
    (prisma.notification.updateMany as jest.Mock).mockResolvedValueOnce({ count: 3 });
    const r = await repo.markAllReadForUser(UserIdVO.create(USER_ID));
    expect(r).toBe(3);
  });
});

describe('TemplatePrismaRepository', () => {
  let prisma: Prisma;
  let repo: TemplatePrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new TemplatePrismaRepository(prisma as never); });

  const templateRow = {
    id: TEMPLATE_ID, name: 'T', slug: 't', type: 'email', status: 'active',
    category: 'order', locale: 'en', subject: 'S', body: 'B', bodyHtml: null,
    variables: [], version: 1, parentId: null, createdBy: USER_ID, updatedBy: null,
    deletedAt: null, createdAt: new Date(), updatedAt: new Date(),
  };

  it('findByIdVO', async () => {
    (prisma.notificationTemplate.findFirst as jest.Mock).mockResolvedValueOnce(templateRow);
    const r = await repo.findByIdVO(TemplateIdVO.create(TEMPLATE_ID));
    expect(r?.id).toBe(TEMPLATE_ID);
  });

  it('findById', async () => {
    const r = await repo.findById(TEMPLATE_ID);
    expect(r).toBeNull();
  });

  it('findAll', async () => {
    await repo.findAll();
    expect(prisma.notificationTemplate.findMany).toHaveBeenCalled();
  });

  it('findBySlug', async () => {
    await repo.findBySlug('t');
    expect(prisma.notificationTemplate.findFirst).toHaveBeenCalled();
  });

  it('findBySlugAndLocale', async () => {
    await repo.findBySlugAndLocale('t', TemplateLocaleVO.en());
    expect(prisma.notificationTemplate.findFirst).toHaveBeenCalled();
  });

  it('findByType', async () => {
    await repo.findByType({ value: 'email' } as never);
    expect(prisma.notificationTemplate.findMany).toHaveBeenCalled();
  });

  it('findByStatus', async () => {
    await repo.findByStatus({ value: 'active' } as never);
    expect(prisma.notificationTemplate.findMany).toHaveBeenCalled();
  });

  it('findByCategory', async () => {
    await repo.findByCategory({ value: 'order' } as never);
    expect(prisma.notificationTemplate.findMany).toHaveBeenCalled();
  });

  it('findByLocale', async () => {
    await repo.findByLocale(TemplateLocaleVO.en());
    expect(prisma.notificationTemplate.findMany).toHaveBeenCalled();
  });

  it('findActiveBySlug', async () => {
    await repo.findActiveBySlug('t');
    expect(prisma.notificationTemplate.findFirst).toHaveBeenCalled();
  });

  it('findPaginated', async () => {
    (prisma.notificationTemplate.count as jest.Mock).mockResolvedValueOnce(0);
    const r = await repo.findPaginated({
      page: 1, limit: 20,
      filter: { type: 'email', status: 'active', category: 'order', locale: 'en', search: 'x' },
    } as never);
    expect(r.total).toBe(0);
  });

  it('save creates', async () => {
    (prisma.notificationTemplate.findUnique as jest.Mock).mockResolvedValueOnce(null);
    (prisma.notificationTemplate.create as jest.Mock).mockResolvedValueOnce(templateRow);
    const { TemplateEntity } = await import('../../../../../../src/module/domain/entities/template.entity.js');
    const { TemplateNameVO } = await import('../../../../../../src/module/domain/value-objects/primitives/template-name.vo.js');
    const { TemplateTypeVO } = await import('../../../../../../src/module/domain/value-objects/primitives/template-type.vo.js');
    const { TemplateCategoryVO } = await import('../../../../../../src/module/domain/value-objects/primitives/template-category.vo.js');
    const e = TemplateEntity.create({
      id: TEMPLATE_ID, now: new Date().toISOString(),
      props: {
        name: TemplateNameVO.create('Test'),
        slug: 't',
        type: TemplateTypeVO.email(),
        category: TemplateCategoryVO.order(),
        locale: TemplateLocaleVO.en(),
        subject: 'S', body: 'B', variables: [],
        createdBy: USER_ID,
      },
    });
    const r = await repo.save(e);
    expect(r.id).toBe(TEMPLATE_ID);
  });

  it('save updates', async () => {
    (prisma.notificationTemplate.findUnique as jest.Mock).mockResolvedValueOnce({ id: TEMPLATE_ID });
    (prisma.notificationTemplate.update as jest.Mock).mockResolvedValueOnce(templateRow);
    const { TemplateEntity } = await import('../../../../../../src/module/domain/entities/template.entity.js');
    const { TemplateNameVO } = await import('../../../../../../src/module/domain/value-objects/primitives/template-name.vo.js');
    const { TemplateTypeVO } = await import('../../../../../../src/module/domain/value-objects/primitives/template-type.vo.js');
    const { TemplateCategoryVO } = await import('../../../../../../src/module/domain/value-objects/primitives/template-category.vo.js');
    const e = TemplateEntity.create({
      id: TEMPLATE_ID, now: new Date().toISOString(),
      props: {
        name: TemplateNameVO.create('Test'), slug: 't',
        type: TemplateTypeVO.email(), category: TemplateCategoryVO.order(),
        locale: TemplateLocaleVO.en(), subject: 'S', body: 'B', variables: [],
        createdBy: USER_ID,
      },
    });
    await repo.save(e);
    expect(prisma.notificationTemplate.update).toHaveBeenCalled();
  });

  it('delete + exists + existsBySlug', async () => {
    await repo.delete(TEMPLATE_ID);
    (prisma.notificationTemplate.count as jest.Mock).mockResolvedValueOnce(1);
    expect(await repo.exists(TEMPLATE_ID)).toBe(true);
    (prisma.notificationTemplate.count as jest.Mock).mockResolvedValueOnce(1);
    expect(await repo.existsBySlug('t')).toBe(true);
  });
});

describe('SchedulePrismaRepository', () => {
  let prisma: Prisma;
  let repo: SchedulePrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new SchedulePrismaRepository(prisma as never); });

  it('findByIdVO + findById', async () => {
    (prisma.notificationSchedule.findFirst as jest.Mock).mockResolvedValueOnce(null);
    expect(await repo.findByIdVO(ScheduleIdVO.create(NOTIF_ID))).toBeNull();
    expect(await repo.findById(NOTIF_ID)).toBeNull();
  });

  it('findAll + findByUserId + findByStatus + findByType', async () => {
    await repo.findAll();
    await repo.findByUserId(UserIdVO.create(USER_ID));
    await repo.findByStatus(ScheduleStatusVO.pending());
    await repo.findByType({ value: 'scheduled' } as never);
    expect(prisma.notificationSchedule.findMany).toHaveBeenCalled();
  });

  it('findPaginated', async () => {
    (prisma.notificationSchedule.count as jest.Mock).mockResolvedValueOnce(0);
    const r = await repo.findPaginated({
      page: 1, limit: 20,
      sortBy: 'createdAt', sortDir: 'asc',
      filter: { userId: USER_ID, type: 'scheduled', status: 'active', templateId: TEMPLATE_ID, fromDate: '2026-01-01', toDate: '2026-12-31' },
    } as never);
    expect(r.total).toBe(0);
  });

  it('findDue + findUpcoming', async () => {
    await repo.findDue();
    await repo.findUpcoming(60);
    expect(prisma.notificationSchedule.findMany).toHaveBeenCalled();
  });
});

describe('BroadcastPrismaRepository', () => {
  let prisma: Prisma;
  let repo: BroadcastPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new BroadcastPrismaRepository(prisma as never); });

  it('findByIdVO + findById', async () => {
    expect(await repo.findByIdVO(BroadcastIdVO.create(NOTIF_ID))).toBeNull();
    expect(await repo.findById(NOTIF_ID)).toBeNull();
  });

  it('list methods', async () => {
    await repo.findAll();
    await repo.findByStatus(BroadcastStatusVO.draft());
    await repo.findByType({ value: 'all_users' } as never);
    expect(prisma.notificationBroadcast.findMany).toHaveBeenCalled();
  });

  it('findPaginated', async () => {
    (prisma.notificationBroadcast.count as jest.Mock).mockResolvedValueOnce(0);
    const r = await repo.findPaginated({
      page: 1, limit: 20,
      filter: { type: 'all_users', status: 'draft', templateId: TEMPLATE_ID, createdBy: USER_ID, fromDate: '2026-01-01', toDate: '2026-12-31' },
    } as never);
    expect(r.total).toBe(0);
  });

  it('findDueScheduled + findStaleSending', async () => {
    await repo.findDueScheduled();
    await repo.findStaleSending(30);
    expect(prisma.notificationBroadcast.findMany).toHaveBeenCalled();
  });
});

describe('DigestPrismaRepository', () => {
  let prisma: Prisma;
  let repo: DigestPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new DigestPrismaRepository(prisma as never); });

  it('findByIdVO + findById', async () => {
    expect(await repo.findByIdVO(DigestIdVO.create(NOTIF_ID))).toBeNull();
    expect(await repo.findById(NOTIF_ID)).toBeNull();
  });

  it('list methods', async () => {
    await repo.findAll();
    await repo.findByUserId(UserIdVO.create(USER_ID));
    await repo.findByStatus(DigestStatusVO.pending());
    await repo.findByFrequency(DigestFrequencyVO.daily());
    await repo.findLatestByUserId(UserIdVO.create(USER_ID));
    expect(prisma.notificationDigest.findMany).toHaveBeenCalled();
  });

  it('findPaginated', async () => {
    (prisma.notificationDigest.count as jest.Mock).mockResolvedValueOnce(0);
    const r = await repo.findPaginated({
      page: 1, limit: 20,
      filter: { userId: USER_ID, status: 'pending', frequency: 'daily', fromDate: '2026-01-01', toDate: '2026-12-31' },
    } as never);
    expect(r.total).toBe(0);
  });

  it('findReadyToSend', async () => {
    await repo.findReadyToSend();
    expect(prisma.notificationDigest.findMany).toHaveBeenCalled();
  });
});

describe('PreferencePrismaRepository', () => {
  let prisma: Prisma;
  let repo: PreferencePrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new PreferencePrismaRepository(prisma as never); });

  it('findByIdVO + findById', async () => {
    expect(await repo.findByIdVO(PreferenceIdVO.create(NOTIF_ID))).toBeNull();
    expect(await repo.findById(NOTIF_ID)).toBeNull();
  });

  it('findAll', async () => {
    await repo.findAll();
    expect(prisma.notificationPreference.findMany).toHaveBeenCalled();
  });

  it('findByUserId', async () => {
    expect(await repo.findByUserId(UserIdVO.create(USER_ID))).toBeNull();
  });

  it('existsByUserId', async () => {
    (prisma.notificationPreference.count as jest.Mock).mockResolvedValueOnce(1);
    expect(await repo.existsByUserId(UserIdVO.create(USER_ID))).toBe(true);
  });

  it('findUserIdsOptedOutOf', async () => {
    (prisma.notificationPreference.findMany as jest.Mock).mockResolvedValueOnce([
      { userId: USER_ID, channelPreferences: { email: false } },
    ]);
    const r = await repo.findUserIdsOptedOutOf('email');
    expect(r).toEqual([USER_ID]);
  });
});

describe('DevicePrismaRepository', () => {
  let prisma: Prisma;
  let repo: DevicePrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new DevicePrismaRepository(prisma as never); });

  it('findByIdVO + findById', async () => {
    expect(await repo.findByIdVO(DeviceIdVO.create(NOTIF_ID))).toBeNull();
    expect(await repo.findById(NOTIF_ID)).toBeNull();
  });

  it('findAll + list methods', async () => {
    await repo.findAll();
    await repo.findByUserId(UserIdVO.create(USER_ID));
    await repo.findActiveByUserId(UserIdVO.create(USER_ID));
    await repo.findByStatus(DeviceStatusVO.active());
    expect(prisma.notificationDevice.findMany).toHaveBeenCalled();
  });

  it('findByToken + existsByToken', async () => {
    expect(await repo.findByToken(DeviceTokenVO.create('abcdefghijklmnop1234'))).toBeNull();
    (prisma.notificationDevice.count as jest.Mock).mockResolvedValueOnce(1);
    expect(await repo.existsByToken(DeviceTokenVO.create('abcdefghijklmnop1234'))).toBe(true);
  });

  it('findPaginated', async () => {
    (prisma.notificationDevice.count as jest.Mock).mockResolvedValueOnce(0);
    const r = await repo.findPaginated({
      page: 1, limit: 20, sortBy: 'createdAt', sortDir: 'desc',
    } as never);
    expect(r.total).toBe(0);
  });

  it('countByUserId + findStale', async () => {
    (prisma.notificationDevice.count as jest.Mock).mockResolvedValueOnce(3);
    expect(await repo.countByUserId(UserIdVO.create(USER_ID))).toBe(3);
    await repo.findStale(90);
    expect(prisma.notificationDevice.findMany).toHaveBeenCalled();
  });
});

describe('WebhookPrismaRepository', () => {
  let prisma: Prisma;
  let repo: WebhookPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new WebhookPrismaRepository(prisma as never); });

  it('findByIdVO + findById', async () => {
    expect(await repo.findByIdVO(WebhookIdVO.create(NOTIF_ID))).toBeNull();
    expect(await repo.findById(NOTIF_ID)).toBeNull();
  });

  it('list + findByEvent', async () => {
    await repo.findAll();
    await repo.findByStatus(WebhookStatusVO.active());
    await repo.findByEvent(WebhookEventVO.orderCreated());
    expect(prisma.notificationWebhook.findMany).toHaveBeenCalled();
  });

  it('findPaginated', async () => {
    (prisma.notificationWebhook.count as jest.Mock).mockResolvedValueOnce(0);
    const r = await repo.findPaginated({
      page: 1, limit: 20,
      sortBy: 'createdAt', sortDir: 'desc',
      filter: { status: 'active', event: 'order.created', search: 'example' },
    } as never);
    expect(r.total).toBe(0);
  });

  it('findAllActive + countActive + findWithHighFailureCount', async () => {
    await repo.findAllActive();
    (prisma.notificationWebhook.count as jest.Mock).mockResolvedValueOnce(5);
    expect(await repo.countActive()).toBe(5);
    await repo.findWithHighFailureCount(20);
    expect(prisma.notificationWebhook.findMany).toHaveBeenCalled();
  });
});
