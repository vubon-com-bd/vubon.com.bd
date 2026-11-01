/**
 * DeliveryModule — delivery tracking & attempts read model
 * @module notification-service/modules/delivery
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DELIVERY_COMMAND_HANDLERS } from './commands/index.js';
import { DELIVERY_QUERY_HANDLERS } from './queries/index.js';

// ─── Services ───────────────────────────────
import { NotificationDeliveryService } from '@application/services/impl/notification-delivery.service.js';
import { NOTIFICATION_DELIVERY_SERVICE } from '@application/services/interfaces/notification-delivery.service.interface.js';
import { NotificationAttemptService } from '@application/services/impl/notification-attempt.service.js';
import { NOTIFICATION_ATTEMPT_SERVICE } from '@application/services/interfaces/notification-attempt.service.interface.js';

@Module({
  imports: [CqrsModule],
  providers: [
    NotificationDeliveryService,
    { provide: NOTIFICATION_DELIVERY_SERVICE, useExisting: NotificationDeliveryService },
    NotificationAttemptService,
    { provide: NOTIFICATION_ATTEMPT_SERVICE, useExisting: NotificationAttemptService },
    ...(DELIVERY_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(DELIVERY_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [
    NotificationDeliveryService,
    NOTIFICATION_DELIVERY_SERVICE,
    NotificationAttemptService,
    NOTIFICATION_ATTEMPT_SERVICE,
  ],
})
export class DeliveryModule {}
