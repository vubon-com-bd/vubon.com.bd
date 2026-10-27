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
import { CartAbandonedHandler } from '../../application/events/external/cart-abandoned.handler.js';
import { InventoryLowStockHandler } from '../../application/events/external/inventory-low-stock.handler.js';
import { InventoryOutOfStockHandler } from '../../application/events/external/inventory-out-of-stock.handler.js';
import { OrderConfirmedHandler } from '../../application/events/external/order-confirmed.handler.js';
import { OrderCreatedHandler } from '../../application/events/external/order-created.handler.js';
import { OrderDeliveredHandler } from '../../application/events/external/order-delivered.handler.js';
import { OrderShippedHandler } from '../../application/events/external/order-shipped.handler.js';
import { PaymentFailedHandler } from '../../application/events/external/payment-failed.handler.js';
import { PaymentPaidHandler } from '../../application/events/external/payment-paid.handler.js';
import { PaymentRefundedHandler } from '../../application/events/external/payment-refunded.handler.js';
import { ProductReviewPostedHandler } from '../../application/events/external/product-review-posted.handler.js';
import { UserRoleAssignedHandler } from '../../application/events/external/user-role-assigned.handler.js';
import { UserRoleRevokedHandler } from '../../application/events/external/user-role-revoked.handler.js';
import { UserStatusChangedHandler } from '../../application/events/external/user-status-changed.handler.js';
import { UserSuspendedHandler } from '../../application/events/external/user-suspended.handler.js';
import { UserVerifiedHandler } from '../../application/events/external/user-verified.handler.js';
import { VendorApprovedHandler } from '../../application/events/external/vendor-approved.handler.js';
import { VendorRegisteredHandler } from '../../application/events/external/vendor-registered.handler.js';
import { VendorSuspendedHandler } from '../../application/events/external/vendor-suspended.handler.js';

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

    // ─── External Event Handlers (added) ───
    CartAbandonedHandler,
    InventoryLowStockHandler,
    InventoryOutOfStockHandler,
    OrderConfirmedHandler,
    OrderCreatedHandler,
    OrderDeliveredHandler,
    OrderShippedHandler,
    PaymentFailedHandler,
    PaymentPaidHandler,
    PaymentRefundedHandler,
    ProductReviewPostedHandler,
    UserRoleAssignedHandler,
    UserRoleRevokedHandler,
    UserStatusChangedHandler,
    UserSuspendedHandler,
    UserVerifiedHandler,
    VendorApprovedHandler,
    VendorRegisteredHandler,
    VendorSuspendedHandler,
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
