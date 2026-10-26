/**
 * Prisma Repositories Module
 * @module notification-service/infrastructure/persistence/prisma
 *
 * Wires repositories to their DI tokens.
 *
 * ⚠️ Some repos are not yet implemented (action, delivery, template-variable,
 *    broadcast-result, preference-matrix, device-token).
 *    These tokens get stub providers so DI resolution succeeds — features
 *    that need them can be added later without breaking module graph.
 */
import { Module } from '@nestjs/common';

// ─── Domain tokens ──────────────────────────
import { NOTIFICATION_REPOSITORY } from '@domain/repositories/notification.repository.interface.js';
import { NOTIFICATION_CONTENT_REPOSITORY } from '@domain/repositories/notification-content.repository.interface.js';
import { NOTIFICATION_RECIPIENT_REPOSITORY } from '@domain/repositories/notification-recipient.repository.interface.js';
import { NOTIFICATION_ACTION_REPOSITORY } from '@domain/repositories/notification-action.repository.interface.js';
import { NOTIFICATION_DELIVERY_REPOSITORY } from '@domain/repositories/notification-delivery.repository.interface.js';
import { NOTIFICATION_ATTEMPT_REPOSITORY } from '@domain/repositories/notification-attempt.repository.interface.js';
import { TEMPLATE_REPOSITORY } from '@domain/repositories/template.repository.interface.js';
import { TEMPLATE_VARIABLE_REPOSITORY } from '@domain/repositories/template-variable.repository.interface.js';
import { SCHEDULE_REPOSITORY } from '@domain/repositories/schedule.repository.interface.js';
import { BROADCAST_REPOSITORY } from '@domain/repositories/broadcast.repository.interface.js';
import { BROADCAST_RESULT_REPOSITORY } from '@domain/repositories/broadcast-result.repository.interface.js';
import { DIGEST_REPOSITORY } from '@domain/repositories/digest.repository.interface.js';
import { DIGEST_ITEM_REPOSITORY } from '@domain/repositories/digest-item.repository.interface.js';
import { PREFERENCE_REPOSITORY } from '@domain/repositories/preference.repository.interface.js';
import { PREFERENCE_MATRIX_REPOSITORY } from '@domain/repositories/preference-matrix.repository.interface.js';
import { DEVICE_REPOSITORY } from '@domain/repositories/device.repository.interface.js';
import { DEVICE_TOKEN_REPOSITORY } from '@domain/repositories/device-token.repository.interface.js';
import { WEBHOOK_REPOSITORY } from '@domain/repositories/webhook.repository.interface.js';

// ─── Implemented repos ──────────────────────
import { NotificationPrismaRepository } from './repositories/notification.prisma.repository.js';
import { NotificationContentPrismaRepository } from './repositories/notification-content.prisma.repository.js';
import { NotificationRecipientPrismaRepository } from './repositories/notification-recipient.prisma.repository.js';
import { TemplatePrismaRepository } from './repositories/template.prisma.repository.js';
import { SchedulePrismaRepository } from './repositories/schedule.prisma.repository.js';
import { BroadcastPrismaRepository } from './repositories/broadcast.prisma.repository.js';
import { DigestPrismaRepository } from './repositories/digest.prisma.repository.js';
import { DigestItemPrismaRepository } from './repositories/digest-item.prisma.repository.js';
import { PreferencePrismaRepository } from './repositories/preference.prisma.repository.js';
import { DevicePrismaRepository } from './repositories/device.prisma.repository.js';
import { WebhookPrismaRepository } from './repositories/webhook.prisma.repository.js';
import { DeliveryAttemptPrismaRepository } from './repositories/delivery-attempt.prisma.repository.js';

// ─── Infra-only repos ───────────────────────
import { BroadcastBatchPrismaRepository } from './repositories/broadcast-batch.prisma.repository.js';
import { NotificationEventPrismaRepository } from './repositories/notification-event.prisma.repository.js';
import { WebhookDeliveryPrismaRepository } from './repositories/webhook-delivery.prisma.repository.js';
import { RateLimitPrismaRepository } from './repositories/rate-limit.prisma.repository.js';
import { UnsubscribePrismaRepository } from './repositories/unsubscribe.prisma.repository.js';
import { BouncePrismaRepository } from './repositories/bounce.prisma.repository.js';
import { ActionLogPrismaRepository } from './repositories/action-log.prisma.repository.js';
import { RulePrismaRepository } from './repositories/rule.prisma.repository.js';
import { AuditLogPrismaRepository } from './repositories/audit-log.prisma.repository.js';

import { NotificationPrismaModule } from './prisma.module.js';

// ─── Placeholder stub (for not-yet-implemented repos) ───
const stubRepo = (name: string) => ({
  findById: async () => null,
  findAll: async () => [],
  exists: async () => false,
  save: async (entity: unknown) => entity,
  delete: async () => undefined,
  __stub: name,
});

// ─── Domain-bound token bindings ────────────
const TOKEN_BINDINGS = [
  { provide: NOTIFICATION_REPOSITORY, useClass: NotificationPrismaRepository },
  { provide: NOTIFICATION_CONTENT_REPOSITORY, useClass: NotificationContentPrismaRepository },
  { provide: NOTIFICATION_RECIPIENT_REPOSITORY, useClass: NotificationRecipientPrismaRepository },
  { provide: NOTIFICATION_ATTEMPT_REPOSITORY, useClass: DeliveryAttemptPrismaRepository },
  { provide: TEMPLATE_REPOSITORY, useClass: TemplatePrismaRepository },
  { provide: SCHEDULE_REPOSITORY, useClass: SchedulePrismaRepository },
  { provide: BROADCAST_REPOSITORY, useClass: BroadcastPrismaRepository },
  { provide: DIGEST_REPOSITORY, useClass: DigestPrismaRepository },
  { provide: DIGEST_ITEM_REPOSITORY, useClass: DigestItemPrismaRepository },
  { provide: PREFERENCE_REPOSITORY, useClass: PreferencePrismaRepository },
  { provide: DEVICE_REPOSITORY, useClass: DevicePrismaRepository },
  { provide: WEBHOOK_REPOSITORY, useClass: WebhookPrismaRepository },

  // ─── Not-yet-implemented repos — stub providers ───
  { provide: NOTIFICATION_ACTION_REPOSITORY, useValue: stubRepo('NotificationActionRepository') },
  { provide: NOTIFICATION_DELIVERY_REPOSITORY, useValue: stubRepo('NotificationDeliveryRepository') },
  { provide: TEMPLATE_VARIABLE_REPOSITORY, useValue: stubRepo('TemplateVariableRepository') },
  { provide: BROADCAST_RESULT_REPOSITORY, useValue: stubRepo('BroadcastResultRepository') },
  { provide: PREFERENCE_MATRIX_REPOSITORY, useValue: stubRepo('PreferenceMatrixRepository') },
  { provide: DEVICE_TOKEN_REPOSITORY, useValue: stubRepo('DeviceTokenRepository') },
];

// ─── Infra-only concrete repos ──────────────
const CONCRETE_REPOS = [
  BroadcastBatchPrismaRepository,
  NotificationEventPrismaRepository,
  WebhookDeliveryPrismaRepository,
  RateLimitPrismaRepository,
  UnsubscribePrismaRepository,
  BouncePrismaRepository,
  ActionLogPrismaRepository,
  RulePrismaRepository,
  AuditLogPrismaRepository,
];

@Module({
  imports: [NotificationPrismaModule],
  providers: [...TOKEN_BINDINGS, ...CONCRETE_REPOS],
  exports: [...TOKEN_BINDINGS, ...CONCRETE_REPOS],
})
export class PrismaRepositoriesModule {}
