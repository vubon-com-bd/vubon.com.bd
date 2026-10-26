/**
 * NotificationModule — core notification aggregate
 * @module notification-service/modules/notification
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

// ─── Controller ─────────────────────────────
import { NotificationController } from '@interfaces/controllers/rest/notification.controller.js';

// ─── Handler arrays ─────────────────────────
import { NOTIFICATION_COMMAND_HANDLERS } from './commands/index.js';
import { NOTIFICATION_QUERY_HANDLERS } from './queries/index.js';
import { NOTIFICATION_SAGAS } from './sagas/index.js';
import { NOTIFICATION_EVENT_HANDLERS } from './events/index.js';

// ─── External Event Handlers ───────────────
import { NotificationEventSubscriberService } from '@application/events/notification-event-subscriber.service.js';
import { UserCreatedHandler } from '@application/events/external/user-created.handler.js';

// ─── Service ────────────────────────────────
import { NotificationService } from '@application/services/impl/notification.service.js';
import { NOTIFICATION_SERVICE } from '@application/services/interfaces/notification.service.interface.js';

// ─── Supporting services ────────────────────
import { NotificationContentService } from '@application/services/impl/notification-content.service.js';
import { NOTIFICATION_CONTENT_SERVICE } from '@application/services/interfaces/notification-content.service.interface.js';
import { NotificationRecipientService } from '@application/services/impl/notification-recipient.service.js';
import { NOTIFICATION_RECIPIENT_SERVICE } from '@application/services/interfaces/notification-recipient.service.interface.js';
import { NotificationAttemptService } from '@application/services/impl/notification-attempt.service.js';
import { NOTIFICATION_ATTEMPT_SERVICE } from '@application/services/interfaces/notification-attempt.service.interface.js';
import { NotificationDeliveryService } from '@application/services/impl/notification-delivery.service.js';
import { NOTIFICATION_DELIVERY_SERVICE } from '@application/services/interfaces/notification-delivery.service.interface.js';

// ─── Guards / Interceptors ──────────────────
import { OwnNotificationGuard } from '@interfaces/guards/own-notification.guard.js';
import { NotificationRateLimitGuard } from '@interfaces/guards/notification-rate-limit.guard.js';
import { NotificationCacheInterceptor } from '@interfaces/interceptors/notification-cache.interceptor.js';
import { DeliveryTrackingInterceptor } from '@interfaces/interceptors/delivery-tracking.interceptor.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  controllers: [NotificationController],
  providers: [
    // ─── Services + DI tokens ───────────────
    NotificationService,
    { provide: NOTIFICATION_SERVICE, useExisting: NotificationService },

    NotificationContentService,
    { provide: NOTIFICATION_CONTENT_SERVICE, useExisting: NotificationContentService },

    NotificationRecipientService,
    { provide: NOTIFICATION_RECIPIENT_SERVICE, useExisting: NotificationRecipientService },

    NotificationAttemptService,
    { provide: NOTIFICATION_ATTEMPT_SERVICE, useExisting: NotificationAttemptService },

    NotificationDeliveryService,
    { provide: NOTIFICATION_DELIVERY_SERVICE, useExisting: NotificationDeliveryService },

    // ─── External Event Handlers ───────────
    NotificationEventSubscriberService,
    UserCreatedHandler,

    // ─── Handlers ──────────────────────────
    ...(NOTIFICATION_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(NOTIFICATION_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(NOTIFICATION_EVENT_HANDLERS as readonly unknown[] as never[]),

    // ─── Sagas ─────────────────────────────
    ...(NOTIFICATION_SAGAS as readonly unknown[] as never[]),

    // ─── Guards / Interceptors ─────────────
    OwnNotificationGuard,
    NotificationRateLimitGuard,
    NotificationCacheInterceptor,
    DeliveryTrackingInterceptor,
  ],
  exports: [
    NotificationService,
    NOTIFICATION_SERVICE,
    NotificationContentService,
    NOTIFICATION_CONTENT_SERVICE,
    NotificationRecipientService,
    NOTIFICATION_RECIPIENT_SERVICE,
    NotificationAttemptService,
    NOTIFICATION_ATTEMPT_SERVICE,
    NotificationDeliveryService,
    NOTIFICATION_DELIVERY_SERVICE,
  ],
})
export class NotificationModule {}
