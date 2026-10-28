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
import { I18nService } from '../../domain/services/i18n.service.js';
import { CleanupExpiredHandler } from '@application/sagas/commands/cleanup-expired.handler.js';
import { UpdateAnalyticsHandler } from '@application/sagas/commands/update-analytics.handler.js';
import { PreferenceModule } from '../preference/preference.module.js';
import { SendEmailDispatchHandler } from '@application/commands/email/send-email-dispatch.handler.js';
import { ProviderResolverService } from '@infrastructure/providers/base/provider-resolver.service.js';
import { SmtpProvider } from '@infrastructure/providers/email/smtp.provider.js';
import { SendgridProvider } from '@infrastructure/providers/email/sendgrid.provider.js';
import { MailgunProvider } from '@infrastructure/providers/email/mailgun.provider.js';
import { SesProvider } from '@infrastructure/providers/email/ses.provider.js';
import { ResendProvider } from '@infrastructure/providers/email/resend.provider.js';
import { PostmarkProvider } from '@infrastructure/providers/email/postmark.provider.js';
import { PublicUnsubscribeController } from '@interfaces/controllers/rest/public-unsubscribe.controller.js';
import { ReminderChainService, REMINDER_CHAIN_SERVICE } from '../../application/services/impl/reminder-chain.service.js';
import { ScheduleModule } from '../schedule/schedule.module.js';
import { FallbackDispatcherService, FALLBACK_DISPATCHER } from '../../infrastructure/providers/base/fallback-dispatcher.service.js';
import { PasswordChangedHandler } from '../../application/events/external/password-changed.handler.js';
import { AccountLockedHandler } from '../../application/events/external/account-locked.handler.js';
import { SessionCreatedHandler } from '../../application/events/external/session-created.handler.js';
import { SessionRevokedHandler } from '../../application/events/external/session-revoked.handler.js';
import { OrderCancelledHandler } from '../../application/events/external/order-cancelled.handler.js';
import { OrderReturnRequestedHandler } from '../../application/events/external/order-return-requested.handler.js';
import { OrderReturnApprovedHandler } from '../../application/events/external/order-return-approved.handler.js';
import { CartCheckedOutHandler } from '../../application/events/external/cart-checked-out.handler.js';
import { CartConvertedHandler } from '../../application/events/external/cart-converted.handler.js';
import { InvoiceCreatedHandler } from '../../application/events/external/invoice-created.handler.js';
import { PayoutProcessedHandler } from '../../application/events/external/payout-processed.handler.js';
import { PayoutApprovedHandler } from '../../application/events/external/payout-approved.handler.js';
import { MfaEnabledHandler } from '../../application/events/external/mfa-enabled.handler.js';
import { ProductCreatedHandler } from '../../application/events/external/product-created.handler.js';
import { ProductPublishedHandler } from '../../application/events/external/product-published.handler.js';
import { SubscriptionRenewedHandler } from '../../application/events/external/subscription-renewed.handler.js';
import { PhoneVerifiedHandler } from '../../application/events/external/phone-verified.handler.js';
import { AddressAddedHandler } from '../../application/events/external/address-added.handler.js';
import { ContactAddedHandler } from '../../application/events/external/contact-added.handler.js';
import { OrderProcessingStartedHandler } from '../../application/events/external/order-processing-started.handler.js';
import { OrderReturnedHandler } from '../../application/events/external/order-returned.handler.js';
import { RefundRequestedHandler } from '../../application/events/external/refund-requested.handler.js';
import { RefundApprovedHandler } from '../../application/events/external/refund-approved.handler.js';
import { RefundCompletedHandler } from '../../application/events/external/refund-completed.handler.js';
import { SubscriptionExpiredHandler } from '../../application/events/external/subscription-expired.handler.js';
import { VendorRejectedHandler } from '../../application/events/external/vendor-rejected.handler.js';
import { VendorReinstatedHandler } from '../../application/events/external/vendor-reinstated.handler.js';
import { ProductDeletedHandler } from '../../application/events/external/product-deleted.handler.js';
import { PricingChangedHandler } from '../../application/events/external/pricing-changed.handler.js';
import { OrderStatusChangedHandler } from '../../application/events/external/order-status-changed.handler.js';
import { OrderPackedHandler } from '../../application/events/external/order-packed.handler.js';
import { OrderRefundedHandler } from '../../application/events/external/order-refunded.handler.js';
import { ReturnRejectedHandler } from '../../application/events/external/return-rejected.handler.js';
import { ReturnClosedHandler } from '../../application/events/external/return-closed.handler.js';
import { ReturnReceivedHandler } from '../../application/events/external/return-received.handler.js';
import { RefundRejectedHandler } from '../../application/events/external/refund-rejected.handler.js';
import { InvoiceOverdueHandler } from '../../application/events/external/invoice-overdue.handler.js';
import { InvoiceVoidedHandler } from '../../application/events/external/invoice-voided.handler.js';
import { PaymentAuthorizedHandler } from '../../application/events/external/payment-authorized.handler.js';
import { PaymentCancelledHandler } from '../../application/events/external/payment-cancelled.handler.js';
import { VendorAppealedHandler } from '../../application/events/external/vendor-appealed.handler.js';
import { VendorInfoRequestedHandler } from '../../application/events/external/vendor-info-requested.handler.js';
import { CommissionCalculatedHandler } from '../../application/events/external/commission-calculated.handler.js';
import { SettlementCompletedHandler } from '../../application/events/external/settlement-completed.handler.js';
import { CartCreatedHandler } from '../../application/events/external/cart-created.handler.js';
import { CartClearedHandler } from '../../application/events/external/cart-cleared.handler.js';
import { CartMergedHandler } from '../../application/events/external/cart-merged.handler.js';
import { ServicesModule } from '@infrastructure/modules/services.module.js';
import { AbandonedCartDetectedHandler } from '@application/events/external/abandoned-cart-detected.handler.js';
import { AbandonedCartReminderSentHandler } from '@application/events/external/abandoned-cart-reminder-sent.handler.js';
import { AbandonedCartRecoveredHandler } from '@application/events/external/abandoned-cart-recovered.handler.js';
import { AbandonedCartLostHandler } from '@application/events/external/abandoned-cart-lost.handler.js';
import { AbandonedCartStatusChangedHandler } from '@application/events/external/abandoned-cart-status-changed.handler.js';
import { AbandonedCartUnsubscribedHandler } from '@application/events/external/abandoned-cart-unsubscribed.handler.js';
import { CartExpiredHandler } from '@application/events/external/cart-expired.handler.js';
import { CartMergerCompletedHandler } from '@application/events/external/cart-merger-completed.handler.js';
import { CartCouponAppliedHandler } from '../../application/events/external/cart-coupon-applied.handler.js';
import { CartCouponRejectedHandler } from '../../application/events/external/cart-coupon-rejected.handler.js';
import { CartCouponRemovedHandler } from '../../application/events/external/cart-coupon-removed.handler.js';
import { CartVoucherAppliedHandler } from '../../application/events/external/cart-voucher-applied.handler.js';
import { CartVoucherRedeemedHandler } from '../../application/events/external/cart-voucher-redeemed.handler.js';
import { CartVoucherRejectedHandler } from '../../application/events/external/cart-voucher-rejected.handler.js';
import { CartVoucherRemovedHandler } from '../../application/events/external/cart-voucher-removed.handler.js';
import { CartStatusChangedHandler } from '../../application/events/external/cart-status-changed.handler.js';
import { CartMergerFailedHandler } from '../../application/events/external/cart-merger-failed.handler.js';
import { CartItemAddedHandler } from '../../application/events/external/cart-item-added.handler.js';
import { CartItemRemovedHandler } from '../../application/events/external/cart-item-removed.handler.js';
import { CartItemQuantityChangedHandler } from '../../application/events/external/cart-item-quantity-changed.handler.js';
import { SavedForLaterSavedHandler } from '../../application/events/external/saved-for-later-saved.handler.js';
import { SavedForLaterMovedToCartHandler } from '../../application/events/external/saved-for-later-moved-to-cart.handler.js';
import { GuestCartCreatedHandler } from '../../application/events/external/guest-cart-created.handler.js';
import { GuestCartMergedHandler } from '../../application/events/external/guest-cart-merged.handler.js';
import { CartTaxRecalculatedHandler } from '../../application/events/external/cart-tax-recalculated.handler.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule, PreferenceModule, ScheduleModule, ServicesModule],
  controllers: [NotificationController, PublicUnsubscribeController],
  providers: [
    AbandonedCartDetectedHandler,
    AbandonedCartReminderSentHandler,
    AbandonedCartRecoveredHandler,
    AbandonedCartLostHandler,
    AbandonedCartStatusChangedHandler,
    AbandonedCartUnsubscribedHandler,
    CartExpiredHandler,
    CartMergerCompletedHandler,
    SendEmailDispatchHandler,
    ProviderResolverService,
    SmtpProvider,
    SendgridProvider,
    MailgunProvider,
    SesProvider,
    ResendProvider,
    PostmarkProvider,
    UpdateAnalyticsHandler,
    CleanupExpiredHandler,
    I18nService,
    ReminderChainService,
    { provide: REMINDER_CHAIN_SERVICE, useExisting: ReminderChainService },
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
    CartCouponAppliedHandler,
    CartCouponRejectedHandler,
    CartCouponRemovedHandler,
    CartVoucherAppliedHandler,
    CartVoucherRedeemedHandler,
    CartVoucherRejectedHandler,
    CartVoucherRemovedHandler,
    CartStatusChangedHandler,
    CartMergerFailedHandler,
    CartItemAddedHandler,
    CartItemRemovedHandler,
    CartItemQuantityChangedHandler,
    SavedForLaterSavedHandler,
    SavedForLaterMovedToCartHandler,
    GuestCartCreatedHandler,
    GuestCartMergedHandler,
    CartTaxRecalculatedHandler,
    UserCreatedHandler,

    // ─── Handlers ──────────────────────────
    ...(NOTIFICATION_COMMAND_HANDLERS as readonly unknown[] as never[]),

    // ─── External Event Handlers (added) ───
    CartAbandonedHandler,
    CartMergedHandler,
    CartClearedHandler,
    CartCreatedHandler,
    SettlementCompletedHandler,
    CommissionCalculatedHandler,
    VendorInfoRequestedHandler,
    VendorAppealedHandler,
    PaymentCancelledHandler,
    PaymentAuthorizedHandler,
    InvoiceVoidedHandler,
    InvoiceOverdueHandler,
    RefundRejectedHandler,
    ReturnReceivedHandler,
    ReturnClosedHandler,
    ReturnRejectedHandler,
    OrderRefundedHandler,
    OrderPackedHandler,
    OrderStatusChangedHandler,
    PricingChangedHandler,
    ProductDeletedHandler,
    VendorReinstatedHandler,
    VendorRejectedHandler,
    SubscriptionExpiredHandler,
    RefundCompletedHandler,
    RefundApprovedHandler,
    RefundRequestedHandler,
    OrderReturnedHandler,
    OrderProcessingStartedHandler,
    ContactAddedHandler,
    AddressAddedHandler,
    PhoneVerifiedHandler,
    SubscriptionRenewedHandler,
    ProductPublishedHandler,
    ProductCreatedHandler,
    MfaEnabledHandler,
    PayoutApprovedHandler,
    PayoutProcessedHandler,
    InvoiceCreatedHandler,
    CartConvertedHandler,
    CartCheckedOutHandler,
    OrderReturnApprovedHandler,
    OrderReturnRequestedHandler,
    OrderCancelledHandler,
    SessionRevokedHandler,
    SessionCreatedHandler,
    AccountLockedHandler,
    PasswordChangedHandler,
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

    // ─── Fallback Dispatcher ────────────────
    FallbackDispatcherService,
    { provide: FALLBACK_DISPATCHER, useExisting: FallbackDispatcherService },
  ],
  exports: [
    FallbackDispatcherService,
    FALLBACK_DISPATCHER,
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
