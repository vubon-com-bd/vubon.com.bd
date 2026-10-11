/**
 * Prisma repos — branch coverage for conditionals (filter builders, existence checks)
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NotificationPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/notification.prisma.repository.js';
import { SchedulePrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/schedule.prisma.repository.js';
import { BroadcastPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/broadcast.prisma.repository.js';
import { DigestPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/digest.prisma.repository.js';
import { PreferencePrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/preference.prisma.repository.js';
import { DevicePrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/device.prisma.repository.js';
import { WebhookPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/webhook.prisma.repository.js';
import { NotificationIdVO } from '../../../../../../src/module/domain/value-objects/primitives/notification-id.vo.js';
import { UserIdVO } from '../../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { ScheduleStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/schedule-status.vo.js';
import { BroadcastIdVO } from '../../../../../../src/module/domain/value-objects/primitives/broadcast-id.vo.js';
import { DigestFrequencyVO } from '../../../../../../src/module/domain/value-objects/primitives/digest-frequency.vo.js';
import { DigestIdVO } from '../../../../../../src/module/domain/value-objects/primitives/digest-id.vo.js';
import { PreferenceIdVO } from '../../../../../../src/module/domain/value-objects/primitives/preference-id.vo.js';
import { DeviceIdVO } from '../../../../../../src/module/domain/value-objects/primitives/device-id.vo.js';
import { DeviceTokenVO } from '../../../../../../src/module/domain/value-objects/primitives/device-token.vo.js';
import { WebhookIdVO } from '../../../../../../src/module/domain/value-objects/primitives/webhook-id.vo.js';
import { WebhookStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/webhook-status.vo.js';
import { WebhookEventVO } from '../../../../../../src/module/domain/value-objects/primitives/webhook-event.vo.js';
import { NotificationStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/notification-status.vo.js';

const NOTIF_ID = '00000000-0000-0000-0000-000000000001';
const USER_ID = '00000000-0000-0000-0000-000000000002';

function makePrisma() {
  const delegate = {
    findFirst: jest.fn().mockResolvedValue(null),
    findUnique: jest.fn().mockResolvedValue(null),
    findMany: jest.fn().mockResolvedValue([]),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn().mockResolvedValue(0),
    updateMany: jest.fn(),
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

type Prisma = ReturnType<typeof makePrisma>;

describe('NotificationPrismaRepository — all filter combinations', () => {
  let prisma: Prisma;
  let repo: NotificationPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new NotificationPrismaRepository(prisma as never); });

  const testFilters = [
    { userId: USER_ID },
    { type: 'transactional' },
    { category: 'order' },
    { channel: 'email' },
    { status: 'pending' },
    { priority: 'normal' },
    { readStatus: 'unread' },
    { fromDate: '2026-01-01' },
    { toDate: '2026-12-31' },
    { fromDate: '2026-01-01', toDate: '2026-12-31' },
    { search: 'order' },
    { userId: USER_ID, type: 'transactional', category: 'order', channel: 'email',
      status: 'pending', priority: 'normal', readStatus: 'unread',
      fromDate: '2026-01-01', toDate: '2026-12-31', search: 'order' },
  ];

  for (const filter of testFilters) {
    it(`findPaginated with filter ${JSON.stringify(Object.keys(filter))}`, async () => {
      (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([]);
      (prisma.notification.count as jest.Mock).mockResolvedValueOnce(0);
      await repo.findPaginated({ page: 1, limit: 20, filter } as never);
      expect(prisma.notification.findMany).toHaveBeenCalled();
    });
  }

  it('sortBy updatedAt', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([]);
    (prisma.notification.count as jest.Mock).mockResolvedValueOnce(0);
    await repo.findPaginated({ page: 1, limit: 20, sortBy: 'updatedAt', sortDir: 'asc' } as never);
    expect(prisma.notification.findMany).toHaveBeenCalled();
  });

  it('sortBy sentAt desc default', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([]);
    (prisma.notification.count as jest.Mock).mockResolvedValueOnce(0);
    await repo.findPaginated({ page: 1, limit: 20, sortBy: 'sentAt' } as never);
    expect(prisma.notification.findMany).toHaveBeenCalled();
  });

  it('getStats without filters', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([
      { status: 'sent', channel: 'email', category: 'order', readStatus: 'read' },
      { status: 'failed', channel: 'sms', category: 'system', readStatus: 'unread' },
    ]);
    const r = await repo.getStats();
    expect(r.total).toBe(2);
    expect(r.unread).toBe(1);
    expect(r.byChannel['email']).toBe(1);
  });

  it('getStats with userId only', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([]);
    await repo.getStats(USER_ID);
    expect(prisma.notification.findMany).toHaveBeenCalled();
  });

  it('getStats with fromDate only', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([]);
    await repo.getStats(undefined, '2026-01-01');
    expect(prisma.notification.findMany).toHaveBeenCalled();
  });

  it('getStats with toDate only', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([]);
    await repo.getStats(undefined, undefined, '2026-12-31');
    expect(prisma.notification.findMany).toHaveBeenCalled();
  });

  it('findByReference with filters', async () => {
    (prisma.notification.findMany as jest.Mock).mockResolvedValueOnce([]);
    await repo.findByReference('order', '123');
    expect(prisma.notification.findMany).toHaveBeenCalled();
  });
});

describe('SchedulePrismaRepository — branch coverage', () => {
  let prisma: Prisma;
  let repo: SchedulePrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new SchedulePrismaRepository(prisma as never); });

  const filters = [
    { userId: USER_ID },
    { type: 'scheduled' },
    { status: 'active' },
    { templateId: NOTIF_ID },
    { fromDate: '2026-01-01' },
    { toDate: '2026-12-31' },
    { userId: USER_ID, type: 'scheduled', status: 'active', templateId: NOTIF_ID,
      fromDate: '2026-01-01', toDate: '2026-12-31' },
  ];

  for (const filter of filters) {
    it(`findPaginated with filter ${JSON.stringify(Object.keys(filter))}`, async () => {
      (prisma.notificationSchedule.findMany as jest.Mock).mockResolvedValueOnce([]);
      (prisma.notificationSchedule.count as jest.Mock).mockResolvedValueOnce(0);
      await repo.findPaginated({ page: 1, limit: 20, filter } as never);
      expect(prisma.notificationSchedule.findMany).toHaveBeenCalled();
    });
  }

  it('sortBy scheduledAt asc', async () => {
    (prisma.notificationSchedule.findMany as jest.Mock).mockResolvedValueOnce([]);
    (prisma.notificationSchedule.count as jest.Mock).mockResolvedValueOnce(0);
    await repo.findPaginated({ page: 1, limit: 20, sortBy: 'scheduledAt', sortDir: 'asc' } as never);
    expect(prisma.notificationSchedule.findMany).toHaveBeenCalled();
  });

  it('findDue + findUpcoming with args', async () => {
    await repo.findDue(new Date());
    await repo.findUpcoming(0);
    expect(prisma.notificationSchedule.findMany).toHaveBeenCalled();
  });
});

describe('BroadcastPrismaRepository — branch coverage', () => {
  let prisma: Prisma;
  let repo: BroadcastPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new BroadcastPrismaRepository(prisma as never); });

  const filters = [
    { type: 'all_users' },
    { status: 'draft' },
    { templateId: NOTIF_ID },
    { createdBy: USER_ID },
    { fromDate: '2026-01-01' },
    { toDate: '2026-12-31' },
    { type: 'all_users', status: 'draft', templateId: NOTIF_ID, createdBy: USER_ID,
      fromDate: '2026-01-01', toDate: '2026-12-31' },
  ];

  for (const filter of filters) {
    it(`findPaginated with filter ${JSON.stringify(Object.keys(filter))}`, async () => {
      (prisma.notificationBroadcast.findMany as jest.Mock).mockResolvedValueOnce([]);
      (prisma.notificationBroadcast.count as jest.Mock).mockResolvedValueOnce(0);
      await repo.findPaginated({ page: 1, limit: 20, filter } as never);
      expect(prisma.notificationBroadcast.findMany).toHaveBeenCalled();
    });
  }

  it('sortBy scheduledAt + completedAt', async () => {
    (prisma.notificationBroadcast.findMany as jest.Mock).mockResolvedValue([]);
    (prisma.notificationBroadcast.count as jest.Mock).mockResolvedValue(0);
    await repo.findPaginated({ page: 1, limit: 20, sortBy: 'scheduledAt' } as never);
    await repo.findPaginated({ page: 1, limit: 20, sortBy: 'completedAt', sortDir: 'asc' } as never);
    expect(prisma.notificationBroadcast.findMany).toHaveBeenCalled();
  });
});

describe('DigestPrismaRepository — branch coverage', () => {
  let prisma: Prisma;
  let repo: DigestPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new DigestPrismaRepository(prisma as never); });

  const filters = [
    { userId: USER_ID },
    { status: 'pending' },
    { frequency: 'daily' },
    { fromDate: '2026-01-01' },
    { toDate: '2026-12-31' },
    { userId: USER_ID, status: 'pending', frequency: 'daily',
      fromDate: '2026-01-01', toDate: '2026-12-31' },
  ];

  for (const filter of filters) {
    it(`findPaginated with filter ${JSON.stringify(Object.keys(filter))}`, async () => {
      (prisma.notificationDigest.findMany as jest.Mock).mockResolvedValueOnce([]);
      (prisma.notificationDigest.count as jest.Mock).mockResolvedValueOnce(0);
      await repo.findPaginated({ page: 1, limit: 20, filter } as never);
      expect(prisma.notificationDigest.findMany).toHaveBeenCalled();
    });
  }

  it('sortBy periodStart + sentAt', async () => {
    (prisma.notificationDigest.findMany as jest.Mock).mockResolvedValue([]);
    (prisma.notificationDigest.count as jest.Mock).mockResolvedValue(0);
    await repo.findPaginated({ page: 1, limit: 20, sortBy: 'periodStart' } as never);
    await repo.findPaginated({ page: 1, limit: 20, sortBy: 'sentAt', sortDir: 'asc' } as never);
    expect(prisma.notificationDigest.findMany).toHaveBeenCalled();
  });
});

describe('PreferencePrismaRepository — branch coverage', () => {
  let prisma: Prisma;
  let repo: PreferencePrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new PreferencePrismaRepository(prisma as never); });

  it('findUserIdsOptedOutOf handles non-object prefs', async () => {
    (prisma.notificationPreference.findMany as jest.Mock).mockResolvedValueOnce([
      { userId: USER_ID, channelPreferences: null },
    ]);
    const r = await repo.findUserIdsOptedOutOf('email');
    expect(r).toEqual([]);
  });

  it('findUserIdsOptedOutOf excludes enabled users', async () => {
    (prisma.notificationPreference.findMany as jest.Mock).mockResolvedValueOnce([
      { userId: USER_ID, channelPreferences: { email: true } },
    ]);
    const r = await repo.findUserIdsOptedOutOf('email');
    expect(r).toEqual([]);
  });
});

describe('DevicePrismaRepository — branch coverage', () => {
  let prisma: Prisma;
  let repo: DevicePrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new DevicePrismaRepository(prisma as never); });

  it('findStale with lastActiveAt null path', async () => {
    (prisma.notificationDevice.findMany as jest.Mock).mockResolvedValueOnce([]);
    await repo.findStale(90);
    expect(prisma.notificationDevice.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ OR: expect.any(Array) }),
      }),
    );
  });

  it('findPaginated sortDir asc + sortBy lastActiveAt', async () => {
    (prisma.notificationDevice.count as jest.Mock).mockResolvedValueOnce(0);
    await repo.findPaginated({ page: 1, limit: 20, sortBy: 'lastActiveAt', sortDir: 'asc' } as never);
    expect(prisma.notificationDevice.findMany).toHaveBeenCalled();
  });
});

describe('WebhookPrismaRepository — branch coverage', () => {
  let prisma: Prisma;
  let repo: WebhookPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new WebhookPrismaRepository(prisma as never); });

  const filters = [
    { status: 'active' },
    { event: 'order.created' },
    { search: 'example' },
    { status: 'active', event: 'order.created', search: 'example' },
  ];

  for (const filter of filters) {
    it(`findPaginated with filter ${JSON.stringify(Object.keys(filter))}`, async () => {
      (prisma.notificationWebhook.findMany as jest.Mock).mockResolvedValueOnce([]);
      (prisma.notificationWebhook.count as jest.Mock).mockResolvedValueOnce(0);
      await repo.findPaginated({ page: 1, limit: 20, filter } as never);
      expect(prisma.notificationWebhook.findMany).toHaveBeenCalled();
    });
  }

  it('sortBy lastSuccessAt asc', async () => {
    (prisma.notificationWebhook.findMany as jest.Mock).mockResolvedValueOnce([]);
    (prisma.notificationWebhook.count as jest.Mock).mockResolvedValueOnce(0);
    await repo.findPaginated({ page: 1, limit: 20, sortBy: 'lastSuccessAt', sortDir: 'asc' } as never);
    expect(prisma.notificationWebhook.findMany).toHaveBeenCalled();
  });
});
