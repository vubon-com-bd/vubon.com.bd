/**
 * MemoryRepositoriesModule — In-Memory repository wiring
 * @module notification-service/infrastructure/persistence/memory
 *
 * Enabled when DB_MODE=memory (Termux-safe fallback, tests, demo mode)।
 * All 18 domain repositories are backed by in-memory Maps।
 */
import { Module } from '@nestjs/common';

// ─── Domain DI tokens ──────────────────────
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

// ─── Memory repo implementations ───────────
import { InMemoryNotificationRepository } from './repositories/notification.memory.repository.js';
import { InMemoryNotificationContentRepository } from './repositories/notification-content.memory.repository.js';
import { InMemoryNotificationRecipientRepository } from './repositories/notification-recipient.memory.repository.js';
import { InMemoryNotificationActionRepository } from './repositories/notification-action.memory.repository.js';
import { InMemoryNotificationDeliveryRepository } from './repositories/notification-delivery.memory.repository.js';
import { InMemoryNotificationAttemptRepository } from './repositories/notification-attempt.memory.repository.js';
import { InMemoryTemplateRepository } from './repositories/template.memory.repository.js';
import { InMemoryTemplateVariableRepository } from './repositories/template-variable.memory.repository.js';
import { InMemoryScheduleRepository } from './repositories/schedule.memory.repository.js';
import { InMemoryBroadcastRepository } from './repositories/broadcast.memory.repository.js';
import { InMemoryBroadcastResultRepository } from './repositories/broadcast-result.memory.repository.js';
import { InMemoryDigestRepository } from './repositories/digest.memory.repository.js';
import { InMemoryDigestItemRepository } from './repositories/digest-item.memory.repository.js';
import { InMemoryPreferenceRepository } from './repositories/preference.memory.repository.js';
import { InMemoryPreferenceMatrixRepository } from './repositories/preference-matrix.memory.repository.js';
import { InMemoryDeviceRepository } from './repositories/device.memory.repository.js';
import { InMemoryDeviceTokenRepository } from './repositories/device-token.memory.repository.js';
import { InMemoryWebhookRepository } from './repositories/webhook.memory.repository.js';

const MEMORY_REPOSITORIES = [
  { provide: NOTIFICATION_REPOSITORY, useClass: InMemoryNotificationRepository },
  { provide: NOTIFICATION_CONTENT_REPOSITORY, useClass: InMemoryNotificationContentRepository },
  { provide: NOTIFICATION_RECIPIENT_REPOSITORY, useClass: InMemoryNotificationRecipientRepository },
  { provide: NOTIFICATION_ACTION_REPOSITORY, useClass: InMemoryNotificationActionRepository },
  { provide: NOTIFICATION_DELIVERY_REPOSITORY, useClass: InMemoryNotificationDeliveryRepository },
  { provide: NOTIFICATION_ATTEMPT_REPOSITORY, useClass: InMemoryNotificationAttemptRepository },
  { provide: TEMPLATE_REPOSITORY, useClass: InMemoryTemplateRepository },
  { provide: TEMPLATE_VARIABLE_REPOSITORY, useClass: InMemoryTemplateVariableRepository },
  { provide: SCHEDULE_REPOSITORY, useClass: InMemoryScheduleRepository },
  { provide: BROADCAST_REPOSITORY, useClass: InMemoryBroadcastRepository },
  { provide: BROADCAST_RESULT_REPOSITORY, useClass: InMemoryBroadcastResultRepository },
  { provide: DIGEST_REPOSITORY, useClass: InMemoryDigestRepository },
  { provide: DIGEST_ITEM_REPOSITORY, useClass: InMemoryDigestItemRepository },
  { provide: PREFERENCE_REPOSITORY, useClass: InMemoryPreferenceRepository },
  { provide: PREFERENCE_MATRIX_REPOSITORY, useClass: InMemoryPreferenceMatrixRepository },
  { provide: DEVICE_REPOSITORY, useClass: InMemoryDeviceRepository },
  { provide: DEVICE_TOKEN_REPOSITORY, useClass: InMemoryDeviceTokenRepository },
  { provide: WEBHOOK_REPOSITORY, useClass: InMemoryWebhookRepository },
];

@Module({
  providers: MEMORY_REPOSITORIES,
  exports: MEMORY_REPOSITORIES,
})
export class MemoryRepositoriesModule {}
