/**
 * NotificationModule — core notification aggregation
 * @module notification-service/modules/notification
 *
 * Bundles: notification, email, sms, push, in-app, delivery, analytics, provider-webhook
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

// Controllers
import { NotificationController } from '../../interfaces/controllers/rest/notification.controller.js';
import { EmailController } from '../../interfaces/controllers/rest/email.controller.js';
import { SmsController } from '../../interfaces/controllers/rest/sms.controller.js';
import { PushController } from '../../interfaces/controllers/rest/push.controller.js';
import { InAppController } from '../../interfaces/controllers/rest/in-app.controller.js';
import { DeliveryController } from '../../interfaces/controllers/rest/delivery.controller.js';
import { AnalyticsController } from '../../interfaces/controllers/rest/analytics.controller.js';
import { ProviderWebhookController } from '../../interfaces/controllers/rest/provider-webhook.controller.js';

// Services
import { NotificationService } from '../../application/services/impl/notification.service.js';
import { EmailService } from '../../application/services/impl/email.service.js';
import { SmsService } from '../../application/services/impl/sms.service.js';
import { PushService } from '../../application/services/impl/push.service.js';
import { InAppService } from '../../application/services/impl/in-app.service.js';
import { DeliveryService } from '../../application/services/impl/delivery.service.js';
import { AnalyticsService } from '../../application/services/impl/analytics.service.js';
import { ProviderWebhookService } from '../../application/services/impl/provider-webhook.service.js';

// Tokens
import { NOTIFICATION_SERVICE } from '../../application/services/interfaces/notification.service.interface.js';
import { EMAIL_SERVICE } from '../../application/services/interfaces/email.service.interface.js';
import { SMS_SERVICE } from '../../application/services/interfaces/sms.service.interface.js';
import { PUSH_SERVICE } from '../../application/services/interfaces/push.service.interface.js';
import { IN_APP_SERVICE } from '../../application/services/interfaces/in-app.service.interface.js';
import { DELIVERY_SERVICE } from '../../application/services/interfaces/delivery.service.interface.js';
import { ANALYTICS_SERVICE } from '../../application/services/interfaces/analytics.service.interface.js';
import { PROVIDER_WEBHOOK_SERVICE } from '../../application/services/interfaces/provider-webhook.service.interface.js';

// Command handlers
import { NOTIFICATION_COMMAND_HANDLERS } from '../../application/commands/notification/index.js';
import { EMAIL_COMMAND_HANDLERS } from '../../application/commands/email/index.js';
import { SMS_COMMAND_HANDLERS } from '../../application/commands/sms/index.js';
import { PUSH_COMMAND_HANDLERS } from '../../application/commands/push/index.js';
import { IN_APP_COMMAND_HANDLERS } from '../../application/commands/in-app/index.js';
import { PROVIDER_WEBHOOK_COMMAND_HANDLERS } from '../../application/commands/provider-webhook/index.js';

// Query handlers
import { NOTIFICATION_QUERY_HANDLERS } from '../../application/queries/notification/index.js';
import { EMAIL_QUERY_HANDLERS } from '../../application/queries/email/index.js';
import { SMS_QUERY_HANDLERS } from '../../application/queries/sms/index.js';
import { PUSH_QUERY_HANDLERS } from '../../application/queries/push/index.js';
import { IN_APP_QUERY_HANDLERS } from '../../application/queries/in-app/index.js';
import { DELIVERY_QUERY_HANDLERS } from '../../application/queries/delivery/index.js';
import { ANALYTICS_QUERY_HANDLERS } from '../../application/queries/analytics/index.js';

// Sagas
import { NotificationDeliverySaga } from '../../application/sagas/notification-delivery.saga.js';
import { NotificationRetrySaga } from '../../application/sagas/notification-retry.saga.js';
import { BounceHandlingSaga } from '../../application/sagas/bounce-handling.saga.js';
import { QuietHoursSaga } from '../../application/sagas/quiet-hours.saga.js';

// Guards / interceptors
import { NotificationOwnerGuard } from '../../interfaces/guards/notification-owner.guard.js';
import { NotificationStatusGuard } from '../../interfaces/guards/notification-status.guard.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [
    NotificationController,
    EmailController,
    SmsController,
    PushController,
    InAppController,
    DeliveryController,
    AnalyticsController,
    ProviderWebhookController,
  ],
  providers: [
    NotificationService,
    EmailService,
    SmsService,
    PushService,
    InAppService,
    DeliveryService,
    AnalyticsService,
    ProviderWebhookService,
    { provide: NOTIFICATION_SERVICE, useExisting: NotificationService },
    { provide: EMAIL_SERVICE, useExisting: EmailService },
    { provide: SMS_SERVICE, useExisting: SmsService },
    { provide: PUSH_SERVICE, useExisting: PushService },
    { provide: IN_APP_SERVICE, useExisting: InAppService },
    { provide: DELIVERY_SERVICE, useExisting: DeliveryService },
    { provide: ANALYTICS_SERVICE, useExisting: AnalyticsService },
    { provide: PROVIDER_WEBHOOK_SERVICE, useExisting: ProviderWebhookService },

    ...NOTIFICATION_COMMAND_HANDLERS,
    ...EMAIL_COMMAND_HANDLERS,
    ...SMS_COMMAND_HANDLERS,
    ...PUSH_COMMAND_HANDLERS,
    ...IN_APP_COMMAND_HANDLERS,
    ...PROVIDER_WEBHOOK_COMMAND_HANDLERS,

    ...NOTIFICATION_QUERY_HANDLERS,
    ...EMAIL_QUERY_HANDLERS,
    ...SMS_QUERY_HANDLERS,
    ...PUSH_QUERY_HANDLERS,
    ...IN_APP_QUERY_HANDLERS,
    ...DELIVERY_QUERY_HANDLERS,
    ...ANALYTICS_QUERY_HANDLERS,

    NotificationDeliverySaga,
    NotificationRetrySaga,
    BounceHandlingSaga,
    QuietHoursSaga,

    NotificationOwnerGuard,
    NotificationStatusGuard,
  ],
  exports: [
    NotificationService,
    EmailService,
    SmsService,
    PushService,
    InAppService,
    DeliveryService,
    AnalyticsService,
    ProviderWebhookService,
    NOTIFICATION_SERVICE,
    EMAIL_SERVICE,
    SMS_SERVICE,
    PUSH_SERVICE,
    IN_APP_SERVICE,
    DELIVERY_SERVICE,
    ANALYTICS_SERVICE,
    PROVIDER_WEBHOOK_SERVICE,
  ],
})
export class NotificationModule {}
