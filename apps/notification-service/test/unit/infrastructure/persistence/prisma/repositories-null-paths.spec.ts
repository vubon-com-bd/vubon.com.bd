/**
 * Repositories — every null/empty branch path
 * @module notification-service/test/unit/infrastructure/persistence/prisma
 *
 * Every repo method that returns null or empty — both branches।
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

import {
  TEST_IDS,
  makePrismaNotification,
  makePrismaTemplate,
  makePrismaDevice,
  makePrismaPreference,
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
// Every `findById` returns null
// ═══════════════════════════════════════════════════════════
describe('findById null branches — all aggregates', () => {
  it('Notification findById null', async () => {
    const s = setupRepo(NotificationPrismaRepository);
    s.delegate.findFirst.mockResolvedValue(null);
    expect(await s.repo.findById('missing')).toBeNull();
  });
  it('Template findById null', async () => {
    const s = setupRepo(TemplatePrismaRepository);
    s.delegate.findFirst.mockResolvedValue(null);
    expect(await s.repo.findById('missing')).toBeNull();
  });
  it('Schedule findById null', async () => {
    const s = setupRepo(SchedulePrismaRepository);
    s.delegate.findFirst.mockResolvedValue(null);
    expect(await s.repo.findById('missing')).toBeNull();
  });
  it('Broadcast findById null', async () => {
    const s = setupRepo(BroadcastPrismaRepository);
    s.delegate.findFirst.mockResolvedValue(null);
    expect(await s.repo.findById('missing')).toBeNull();
  });
  it('Digest findById null', async () => {
    const s = setupRepo(DigestPrismaRepository);
    s.delegate.findFirst.mockResolvedValue(null);
    expect(await s.repo.findById('missing')).toBeNull();
  });
  it('Device findById null', async () => {
    const s = setupRepo(DevicePrismaRepository);
    s.delegate.findFirst.mockResolvedValue(null);
    expect(await s.repo.findById('missing')).toBeNull();
  });
  it('Preference findById null', async () => {
    const s = setupRepo(PreferencePrismaRepository);
    s.delegate.findFirst.mockResolvedValue(null);
    expect(await s.repo.findById('missing')).toBeNull();
  });
  it('Webhook findById null', async () => {
    const s = setupRepo(WebhookPrismaRepository);
    s.delegate.findFirst.mockResolvedValue(null);
    expect(await s.repo.findById('missing')).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════
// Every save() — both create + update paths
// ═══════════════════════════════════════════════════════════
describe('save both branches — all aggregates', () => {
  const paths: Array<{ name: string; run: () => Promise<void> }> = [
    {
      name: 'Template create',
      run: async () => {
        const s = setupRepo(TemplatePrismaRepository);
        s.delegate.findUnique.mockResolvedValue(null);
        s.delegate.create.mockResolvedValue(makePrismaTemplate());
        const { TemplatePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/template.prisma.mapper.js');
        await s.repo.save(TemplatePrismaMapper.toDomain(makePrismaTemplate()));
        expect(s.delegate.create).toHaveBeenCalled();
      },
    },
    {
      name: 'Template update',
      run: async () => {
        const s = setupRepo(TemplatePrismaRepository);
        s.delegate.findUnique.mockResolvedValue({ id: TEST_IDS.TEMPLATE });
        s.delegate.update.mockResolvedValue(makePrismaTemplate());
        const { TemplatePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/template.prisma.mapper.js');
        await s.repo.save(TemplatePrismaMapper.toDomain(makePrismaTemplate()));
        expect(s.delegate.update).toHaveBeenCalled();
      },
    },
    {
      name: 'Device create',
      run: async () => {
        const s = setupRepo(DevicePrismaRepository);
        s.delegate.findUnique.mockResolvedValue(null);
        s.delegate.create.mockResolvedValue(makePrismaDevice());
        const { DevicePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/device.prisma.mapper.js');
        await s.repo.save(DevicePrismaMapper.toDomain(makePrismaDevice()));
        expect(s.delegate.create).toHaveBeenCalled();
      },
    },
    {
      name: 'Device update',
      run: async () => {
        const s = setupRepo(DevicePrismaRepository);
        s.delegate.findUnique.mockResolvedValue({ id: TEST_IDS.DEVICE });
        s.delegate.update.mockResolvedValue(makePrismaDevice());
        const { DevicePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/device.prisma.mapper.js');
        await s.repo.save(DevicePrismaMapper.toDomain(makePrismaDevice()));
        expect(s.delegate.update).toHaveBeenCalled();
      },
    },
    {
      name: 'Preference create',
      run: async () => {
        const s = setupRepo(PreferencePrismaRepository);
        s.delegate.findUnique.mockResolvedValue(null);
        s.delegate.create.mockResolvedValue(makePrismaPreference());
        const { PreferencePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/preference.prisma.mapper.js');
        await s.repo.save(PreferencePrismaMapper.toDomain(makePrismaPreference()));
        expect(s.delegate.create).toHaveBeenCalled();
      },
    },
    {
      name: 'Preference update',
      run: async () => {
        const s = setupRepo(PreferencePrismaRepository);
        s.delegate.findUnique.mockResolvedValue({ id: TEST_IDS.PREFERENCE });
        s.delegate.update.mockResolvedValue(makePrismaPreference());
        const { PreferencePrismaMapper } = await import('@infrastructure/persistence/prisma/mappers/preference.prisma.mapper.js');
        await s.repo.save(PreferencePrismaMapper.toDomain(makePrismaPreference()));
        expect(s.delegate.update).toHaveBeenCalled();
      },
    },
  ];
  for (const p of paths) it(p.name, p.run);
});
