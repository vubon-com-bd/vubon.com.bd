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

import { VendorApprovalAppealResolvedHandler } from '../../application/events/external/vendor-approval-appeal-resolved.handler.js';
import { VendorApprovalRejectedHandler } from '../../application/events/external/vendor-approval-rejected.handler.js';
import { VendorApprovalRequestedHandler } from '../../application/events/external/vendor-approval-requested.handler.js';
import { VendorCommissionAdjustedHandler } from '../../application/events/external/vendor-commission-adjusted.handler.js';
import { VendorCommissionConfiguredHandler } from '../../application/events/external/vendor-commission-configured.handler.js';
import { VendorCommissionUpdatedHandler } from '../../application/events/external/vendor-commission-updated.handler.js';
import { VendorPayoutOnHoldHandler } from '../../application/events/external/vendor-payout-on-hold.handler.js';
import { VendorPayoutReleasedHandler } from '../../application/events/external/vendor-payout-released.handler.js';
import { VendorPayoutRequestedHandler } from '../../application/events/external/vendor-payout-requested.handler.js';
import { VendorPerformanceSuspendTriggeredHandler } from '../../application/events/external/vendor-performance-suspend-triggered.handler.js';
import { VendorPerformanceDeclinedHandler } from '../../application/events/external/vendor-performance-declined.handler.js';
import { VendorPerformanceEvaluatedHandler } from '../../application/events/external/vendor-performance-evaluated.handler.js';
import { VendorPerformanceGradeChangedHandler } from '../../application/events/external/vendor-performance-grade-changed.handler.js';
import { VendorPerformanceImprovedHandler } from '../../application/events/external/vendor-performance-improved.handler.js';
import { VendorPerformanceWarningHandler } from '../../application/events/external/vendor-performance-warning.handler.js';
import { VendorReviewFlaggedHandler } from '../../application/events/external/vendor-review-flagged.handler.js';
import { VendorReviewHelpfulHandler } from '../../application/events/external/vendor-review-helpful.handler.js';
import { VendorReviewHiddenHandler } from '../../application/events/external/vendor-review-hidden.handler.js';
import { VendorReviewRepliedHandler } from '../../application/events/external/vendor-review-replied.handler.js';
import { VendorSettlementInitiatedHandler } from '../../application/events/external/vendor-settlement-initiated.handler.js';
import { VendorSettlementOnHoldHandler } from '../../application/events/external/vendor-settlement-on-hold.handler.js';
import { VendorSuspensionAppealedHandler } from '../../application/events/external/vendor-suspension-appealed.handler.js';
import { VendorSuspensionExpiredHandler } from '../../application/events/external/vendor-suspension-expired.handler.js';
import { VendorSuspensionLiftedHandler } from '../../application/events/external/vendor-suspension-lifted.handler.js';
import { VendorTierBenefitAppliedHandler } from '../../application/events/external/vendor-tier-benefit-applied.handler.js';
import { VendorTierDowngradedHandler } from '../../application/events/external/vendor-tier-downgraded.handler.js';
import { VendorTierEligibleUpgradeHandler } from '../../application/events/external/vendor-tier-eligible-upgrade.handler.js';
import { VendorTierUpgradedHandler } from '../../application/events/external/vendor-tier-upgraded.handler.js';
import { VendorVendorActivatedHandler } from '../../application/events/external/vendor-vendor-activated.handler.js';
import { VendorVendorApprovedHandler } from '../../application/events/external/vendor-vendor-approved.handler.js';
import { VendorVendorBlockedHandler } from '../../application/events/external/vendor-vendor-blocked.handler.js';
import { VendorVendorBusinessUpdatedHandler } from '../../application/events/external/vendor-vendor-business-updated.handler.js';
import { VendorVendorDeactivatedHandler } from '../../application/events/external/vendor-vendor-deactivated.handler.js';
import { VendorVendorDeletedHandler } from '../../application/events/external/vendor-vendor-deleted.handler.js';
import { VendorVendorFeaturedHandler } from '../../application/events/external/vendor-vendor-featured.handler.js';
import { VendorVendorProfileUpdatedHandler } from '../../application/events/external/vendor-vendor-profile-updated.handler.js';
import { VendorVendorReactivatedHandler } from '../../application/events/external/vendor-vendor-reactivated.handler.js';
import { VendorVendorReinstatedHandler } from '../../application/events/external/vendor-vendor-reinstated.handler.js';
import { VendorVendorRejectedHandler } from '../../application/events/external/vendor-vendor-rejected.handler.js';
import { VendorVendorStatusChangedHandler } from '../../application/events/external/vendor-vendor-status-changed.handler.js';
import { VendorVendorUnfeaturedHandler } from '../../application/events/external/vendor-vendor-unfeatured.handler.js';
import { VendorVendorUpdatedHandler } from '../../application/events/external/vendor-vendor-updated.handler.js';
import { VendorVendorVerifiedHandler } from '../../application/events/external/vendor-vendor-verified.handler.js';
import { VendorSubscriptionDowngradedHandler } from '../../application/events/external/vendor-subscription-downgraded.handler.js';
import { VendorSubscriptionExpiredHandler } from '../../application/events/external/vendor-subscription-expired.handler.js';
import { VendorSubscriptionFeatureDisabledHandler } from '../../application/events/external/vendor-subscription-feature-disabled.handler.js';
import { VendorSubscriptionFeatureEnabledHandler } from '../../application/events/external/vendor-subscription-feature-enabled.handler.js';
import { VendorSubscriptionRenewedHandler } from '../../application/events/external/vendor-subscription-renewed.handler.js';
import { VendorSubscriptionStartedHandler } from '../../application/events/external/vendor-subscription-started.handler.js';
import { VendorSubscriptionTrialEndedHandler } from '../../application/events/external/vendor-subscription-trial-ended.handler.js';
import { VendorSubscriptionTrialStartedHandler } from '../../application/events/external/vendor-subscription-trial-started.handler.js';
import { VendorSubscriptionUpgradedHandler } from '../../application/events/external/vendor-subscription-upgraded.handler.js';
import { VendorTeamInviteAcceptedHandler } from '../../application/events/external/vendor-team-invite-accepted.handler.js';
import { VendorTeamInviteExpiredHandler } from '../../application/events/external/vendor-team-invite-expired.handler.js';
import { VendorTeamInvitedHandler } from '../../application/events/external/vendor-team-invited.handler.js';
import { VendorTeamPermissionsUpdatedHandler } from '../../application/events/external/vendor-team-permissions-updated.handler.js';
import { VendorTeamRemovedHandler } from '../../application/events/external/vendor-team-removed.handler.js';
import { VendorTeamRoleChangedHandler } from '../../application/events/external/vendor-team-role-changed.handler.js';
import { VendorVerificationReviewStartedHandler } from '../../application/events/external/vendor-verification-review-started.handler.js';
import { VendorVerificationStartedHandler } from '../../application/events/external/vendor-verification-started.handler.js';
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
import { PaymentCreatedHandler } from '../../application/events/external/payment-created.handler.js';
import { PaymentCompletedHandler } from '../../application/events/external/payment-completed.handler.js';
import { RefundFailedHandler } from '../../application/events/external/refund-failed.handler.js';
import { InvoicePaidHandler } from '../../application/events/external/invoice-paid.handler.js';
import { InvoiceRefundedHandler } from '../../application/events/external/invoice-refunded.handler.js';
import { RecurringActivatedHandler } from '../../application/events/external/recurring-activated.handler.js';
import { RecurringCancelledHandler } from '../../application/events/external/recurring-cancelled.handler.js';
import { RecurringCompletedHandler } from '../../application/events/external/recurring-completed.handler.js';
import { RecurringFailedHandler } from '../../application/events/external/recurring-failed.handler.js';
import { SplitCreatedHandler } from '../../application/events/external/split-created.handler.js';
import { SplitFailedHandler } from '../../application/events/external/split-failed.handler.js';
import { SubscriptionCreatedHandler } from '../../application/events/external/subscription-created.handler.js';
import { SubscriptionActivatedHandler } from '../../application/events/external/subscription-activated.handler.js';
import { SubscriptionCancelledHandler } from '../../application/events/external/subscription-cancelled.handler.js';
import { TransactionCreatedHandler } from '../../application/events/external/transaction-created.handler.js';
import { TransactionFailedHandler } from '../../application/events/external/transaction-failed.handler.js';
import { PaymentVerificationFailedHandler } from '../../application/events/external/payment-verification-failed.handler.js';
import { PaymentVerificationVerifiedHandler } from '../../application/events/external/payment-verification-verified.handler.js';
import { PaymentPaidHandler } from '../../application/events/external/payment-paid.handler.js';
import { PaymentRefundedHandler } from '../../application/events/external/payment-refunded.handler.js';
import { ProductReviewPostedHandler } from '../../application/events/external/product-review-posted.handler.js';
import { UserRoleAssignedHandler } from '../../application/events/external/user-role-assigned.handler.js';
import { UserRoleRevokedHandler } from '../../application/events/external/user-role-revoked.handler.js';
import { UserStatusChangedHandler } from '../../application/events/external/user-status-changed.handler.js';
import { SavedForLaterStatusHandler } from '../../application/events/external/saved-for-later-status.handler.js';

import { VendorPayoutProcessedHandler } from '../../application/events/external/vendor-payout-processed.handler.js';
import { ProductReviewApprovedHandler } from '../../application/events/external/product-review-approved.handler.js';
import { ProductReviewRejectedHandler } from '../../application/events/external/product-review-rejected.handler.js';
import { ProductReviewReportedHandler } from '../../application/events/external/product-review-reported.handler.js';
import { ProductBrandCreatedHandler } from '../../application/events/external/product-brand-created.handler.js';
import { ProductBrandUpdatedHandler } from '../../application/events/external/product-brand-updated.handler.js';
import { ProductCategoryCreatedHandler } from '../../application/events/external/product-category-created.handler.js';
import { ProductBrandActivatedHandler } from '../../application/events/external/product-brand-activated.handler.js';
import { ProductBrandDeactivatedHandler } from '../../application/events/external/product-brand-deactivated.handler.js';
import { ProductBrandDeletedHandler } from '../../application/events/external/product-brand-deleted.handler.js';
import { ProductCategoryDeletedHandler } from '../../application/events/external/product-category-deleted.handler.js';
import { ProductCollectionDeletedHandler } from '../../application/events/external/product-collection-deleted.handler.js';
import { ProductCategoryActivatedHandler } from '../../application/events/external/product-category-activated.handler.js';
import { ProductCategoryDeactivatedHandler } from '../../application/events/external/product-category-deactivated.handler.js';
import { ProductCollectionActivatedHandler } from '../../application/events/external/product-collection-activated.handler.js';
import { ProductCollectionDeactivatedHandler } from '../../application/events/external/product-collection-deactivated.handler.js';
import { ProductPricingDiscountAppliedHandler } from '../../application/events/external/product-pricing-discount-applied.handler.js';
import { ProductPricingDiscountRemovedHandler } from '../../application/events/external/product-pricing-discount-removed.handler.js';
import { ProductPricingRuleAddedHandler } from '../../application/events/external/product-pricing-rule-added.handler.js';
import { ProductPricingRuleRemovedHandler } from '../../application/events/external/product-pricing-rule-removed.handler.js';
import { ProductUnpublishedHandler } from '../../application/events/external/product-unpublished.handler.js';
import { ProductReviewDeletedHandler } from '../../application/events/external/product-review-deleted.handler.js';
import { ProductReviewUpdatedHandler } from '../../application/events/external/product-review-updated.handler.js';
import { ProductCollectionCreatedHandler } from '../../application/events/external/product-collection-created.handler.js';
import { PaymentRecurringPausedHandler } from '../../application/events/external/payment-recurring-paused.handler.js';
import { PaymentRecurringResumedHandler } from '../../application/events/external/payment-recurring-resumed.handler.js';
import { PaymentRecurringRunHandler } from '../../application/events/external/payment-recurring-run.handler.js';
import { PaymentRecurringScheduledHandler } from '../../application/events/external/payment-recurring-scheduled.handler.js';
import { PaymentSubscriptionPastDueHandler } from '../../application/events/external/payment-subscription-past-due.handler.js';
import { PaymentSubscriptionPausedHandler } from '../../application/events/external/payment-subscription-paused.handler.js';
import { PaymentSubscriptionResumedHandler } from '../../application/events/external/payment-subscription-resumed.handler.js';
import { PaymentSubscriptionTrialStartedHandler } from '../../application/events/external/payment-subscription-trial-started.handler.js';
import { PaymentInvoiceIssuedHandler } from '../../application/events/external/payment-invoice-issued.handler.js';
import { PaymentPaymentCapturedHandler } from '../../application/events/external/payment-payment-captured.handler.js';
import { PaymentPaymentStatusChangedHandler } from '../../application/events/external/payment-payment-status-changed.handler.js';
import { PaymentRefundStatusChangedHandler } from '../../application/events/external/payment-refund-status-changed.handler.js';
import { PaymentSplitExecutedHandler } from '../../application/events/external/payment-split-executed.handler.js';
import { PaymentTransactionSettledHandler } from '../../application/events/external/payment-transaction-settled.handler.js';
import { PaymentTransactionStatusChangedHandler } from '../../application/events/external/payment-transaction-status-changed.handler.js';
import { PaymentTransactionSucceededHandler } from '../../application/events/external/payment-transaction-succeeded.handler.js';
import { PaymentVerificationInitiatedHandler } from '../../application/events/external/payment-verification-initiated.handler.js';
import { PaymentVerificationExpiredHandler } from '../../application/events/external/payment-verification-expired.handler.js';
import { VendorApprovedNotificationHandler } from '../../application/events/external/vendor-approved-notification.handler.js';
import { VendorVerificationExpiredHandler } from '../../application/events/external/vendor-verification-expired.handler.js';
import { VendorReinstatedHandler } from '../../application/events/external/vendor-reinstated.handler.js';
import { VendorApprovalResubmittedHandler } from '../../application/events/external/vendor-approval-resubmitted.handler.js';
import { VendorCommissionActivatedHandler } from '../../application/events/external/vendor-commission-activated.handler.js';
import { VendorCommissionDeactivatedHandler } from '../../application/events/external/vendor-commission-deactivated.handler.js';
import { VendorPayoutCancelledHandler } from '../../application/events/external/vendor-payout-cancelled.handler.js';
import { VendorPayoutFailedHandler } from '../../application/events/external/vendor-payout-failed.handler.js';
import { VendorPayoutPaidHandler } from '../../application/events/external/vendor-payout-paid.handler.js';
import { VendorPayoutProcessingHandler } from '../../application/events/external/vendor-payout-processing.handler.js';
import { VendorPayoutRejectedHandler } from '../../application/events/external/vendor-payout-rejected.handler.js';
import { VendorReviewApprovedHandler } from '../../application/events/external/vendor-review-approved.handler.js';
import { VendorReviewRejectedHandler } from '../../application/events/external/vendor-review-rejected.handler.js';
import { VendorReviewSubmittedHandler } from '../../application/events/external/vendor-review-submitted.handler.js';
import { VendorSettlementCancelledHandler } from '../../application/events/external/vendor-settlement-cancelled.handler.js';
import { VendorSettlementFailedHandler } from '../../application/events/external/vendor-settlement-failed.handler.js';
import { VendorSettlementProcessingHandler } from '../../application/events/external/vendor-settlement-processing.handler.js';
import { VendorSubscriptionCancelledHandler } from '../../application/events/external/vendor-subscription-cancelled.handler.js';
import { VendorSubscriptionPaymentFailedHandler } from '../../application/events/external/vendor-subscription-payment-failed.handler.js';
import { VendorSubscriptionSuspendedHandler } from '../../application/events/external/vendor-subscription-suspended.handler.js';
import { VendorSuspensionAppealApprovedHandler } from '../../application/events/external/vendor-suspension-appeal-approved.handler.js';
import { VendorSuspensionAppealRejectedHandler } from '../../application/events/external/vendor-suspension-appeal-rejected.handler.js';
import { VendorSuspensionCreatedHandler } from '../../application/events/external/vendor-suspension-created.handler.js';
import { VendorTeamInviteCancelledHandler } from '../../application/events/external/vendor-team-invite-cancelled.handler.js';
import { VendorTeamInviteRejectedHandler } from '../../application/events/external/vendor-team-invite-rejected.handler.js';
import { VendorTeamReactivatedHandler } from '../../application/events/external/vendor-team-reactivated.handler.js';
import { VendorTeamSuspendedHandler } from '../../application/events/external/vendor-team-suspended.handler.js';
import { VendorActivatedHandler } from '../../application/events/external/vendor-activated.handler.js';
import { VendorDeactivatedHandler } from '../../application/events/external/vendor-deactivated.handler.js';
import { VendorDeletedHandler } from '../../application/events/external/vendor-deleted.handler.js';
import { VendorReactivatedHandler } from '../../application/events/external/vendor-reactivated.handler.js';
import { VendorVerifiedHandler } from '../../application/events/external/vendor-verified.handler.js';
import { VendorVerificationApprovedHandler } from '../../application/events/external/vendor-verification-approved.handler.js';
import { VendorVerificationRejectedHandler } from '../../application/events/external/vendor-verification-rejected.handler.js';
import { VendorVerificationResubmittedHandler } from '../../application/events/external/vendor-verification-resubmitted.handler.js';
import { VendorVerificationSubmittedHandler } from '../../application/events/external/vendor-verification-submitted.handler.js';
import { CartActivatedHandler } from '../../application/events/external/cart-activated.handler.js';

import { SavedForLaterRemovedHandler } from '../../application/events/external/saved-for-later-removed.handler.js';
import { GuestCartStatusHandler } from '../../application/events/external/guest-cart-status.handler.js';
import { GuestCartExpiredHandler } from '../../application/events/external/guest-cart-expired.handler.js';
import { GuestCartAbandonedHandler } from '../../application/events/external/guest-cart-abandoned.handler.js';
import { CartItemStatusHandler } from '../../application/events/external/cart-item-status.handler.js';
import { CartItemSavedHandler } from '../../application/events/external/cart-item-saved.handler.js';
import { CartItemMovedHandler } from '../../application/events/external/cart-item-moved.handler.js';
import { UserSuspendedHandler } from '../../application/events/external/user-suspended.handler.js';
import { VerificationVerifiedHandler } from '../../application/events/external/verification-verified.handler.js';
import { VerificationFailedHandler } from '../../application/events/external/verification-failed.handler.js';
import { UserSettingsCreatedHandler } from '../../application/events/external/user-settings-created.handler.js';
import { UserProfileCreatedHandler } from '../../application/events/external/user-profile-created.handler.js';
import { UserPreferencesCreatedHandler } from '../../application/events/external/user-preferences-created.handler.js';
import { UserDeletedHandler } from '../../application/events/external/user-deleted.handler.js';
import { UserContactVerifiedHandler } from '../../application/events/external/user-contact-verified.handler.js';
import { UserContactDeletedHandler } from '../../application/events/external/user-contact-deleted.handler.js';
import { UserAddressDeletedHandler } from '../../application/events/external/user-address-deleted.handler.js';
import { TokenVerifyCompletedHandler } from '../../application/events/external/token-verify-completed.handler.js';
import { TokenResetCompletedHandler } from '../../application/events/external/token-reset-completed.handler.js';
import { SsoConfigCreatedHandler } from '../../application/events/external/sso-config-created.handler.js';
import { OauthClientRegisteredHandler } from '../../application/events/external/oauth-client-registered.handler.js';
import { MfaVerifiedHandler } from '../../application/events/external/mfa-verified.handler.js';
import { MfaChallengeFailedHandler } from '../../application/events/external/mfa-challenge-failed.handler.js';
import { MfaChallengeCreatedHandler } from '../../application/events/external/mfa-challenge-created.handler.js';
import { LoginAttemptFailedHandler } from '../../application/events/external/login-attempt-failed.handler.js';
import { KycVerifiedHandler } from '../../application/events/external/kyc-verified.handler.js';
import { KycSubmittedHandler } from '../../application/events/external/kyc-submitted.handler.js';
import { KycRejectedHandler } from '../../application/events/external/kyc-rejected.handler.js';
import { DeviceUnregisteredHandler } from '../../application/events/external/device-unregistered.handler.js';
import { DeviceRegisteredHandler } from '../../application/events/external/device-registered.handler.js';
import { BiometricVerifiedHandler } from '../../application/events/external/biometric-verified.handler.js';
import { BiometricFailedHandler } from '../../application/events/external/biometric-failed.handler.js';
import { AuthPhoneVerifiedHandler } from '../../application/events/external/auth-phone-verified.handler.js';
import { AuthEmailVerifiedHandler } from '../../application/events/external/auth-email-verified.handler.js';
import { AuthDeactivatedHandler } from '../../application/events/external/auth-deactivated.handler.js';
import { AuthActivatedHandler } from '../../application/events/external/auth-activated.handler.js';
import { AuthCreatedHandler } from '../../application/events/external/auth-created.handler.js';
import { UserVerifiedHandler } from '../../application/events/external/user-verified.handler.js';
import { VendorApprovedHandler } from '../../application/events/external/vendor-approved.handler.js';
import { VendorRegisteredHandler } from '../../application/events/external/vendor-registered.handler.js';
import { VendorSuspendedHandler } from '../../application/events/external/vendor-suspended.handler.js';
import { ProductBrandLogoUpdatedHandler } from '../../application/events/external/product-brand-logo-updated.handler.js';
import { ProductCategoryMovedHandler } from '../../application/events/external/product-category-moved.handler.js';
import { ProductCategoryUpdatedHandler } from '../../application/events/external/product-category-updated.handler.js';
import { ProductCollectionProductAddedHandler } from '../../application/events/external/product-collection-product-added.handler.js';
import { ProductCollectionProductRemovedHandler } from '../../application/events/external/product-collection-product-removed.handler.js';
import { ProductCollectionUpdatedHandler } from '../../application/events/external/product-collection-updated.handler.js';
import { ProductInventoryAdjustedHandler } from '../../application/events/external/product-inventory-adjusted.handler.js';
import { ProductInventoryReleasedHandler } from '../../application/events/external/product-inventory-released.handler.js';
import { ProductInventoryReservedHandler } from '../../application/events/external/product-inventory-reserved.handler.js';
import { ProductInventoryRestockedHandler } from '../../application/events/external/product-inventory-restocked.handler.js';
import { ProductProductStatusChangedHandler } from '../../application/events/external/product-product-status-changed.handler.js';
import { ProductProductStockChangedHandler } from '../../application/events/external/product-product-stock-changed.handler.js';
import { ProductProductUpdatedHandler } from '../../application/events/external/product-product-updated.handler.js';
import { ProductReviewMarkedHelpfulHandler } from '../../application/events/external/product-review-marked-helpful.handler.js';
import { ProductVariantAddedHandler } from '../../application/events/external/product-variant-added.handler.js';
import { ProductVariantRemovedHandler } from '../../application/events/external/product-variant-removed.handler.js';
import { ProductVariantStockChangedHandler } from '../../application/events/external/product-variant-stock-changed.handler.js';
import { ProductVariantUpdatedHandler } from '../../application/events/external/product-variant-updated.handler.js';
import { CartTotalsRecalculatedHandler } from '../../application/events/external/cart-totals-recalculated.handler.js';
import { CartMergerConflictResolvedHandler } from '../../application/events/external/cart-merger-conflict-resolved.handler.js';
import { CartMergerStartedHandler } from '../../application/events/external/cart-merger-started.handler.js';
import { CartTaxCalculatedHandler } from '../../application/events/external/cart-tax-calculated.handler.js';
import { CartTaxRemovedHandler } from '../../application/events/external/cart-tax-removed.handler.js';
import { CartCouponValidatedHandler } from '../../application/events/external/cart-coupon-validated.handler.js';

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
import { DeliveryScheduledHandler } from '../../application/events/external/delivery-scheduled.handler.js';
import { DeliveryInTransitHandler } from '../../application/events/external/delivery-in-transit.handler.js';
import { DeliveryOutForDeliveryHandler } from '../../application/events/external/delivery-out-for-delivery.handler.js';
import { DeliveryFailedHandler } from '../../application/events/external/delivery-failed.handler.js';
import { OrderCancelRequestedHandler } from '../../application/events/external/order-cancel-requested.handler.js';
import { OrderCancelApprovedHandler } from '../../application/events/external/order-cancel-approved.handler.js';
import { OrderCancelRejectedHandler } from '../../application/events/external/order-cancel-rejected.handler.js';
import { OrderCancelRefundedHandler } from '../../application/events/external/order-cancel-refunded.handler.js';
import { OrderItemAddedHandler } from '../../application/events/external/order-item-added.handler.js';
import { OrderItemRemovedHandler } from '../../application/events/external/order-item-removed.handler.js';
import { CheckoutCompletedHandler } from '../../application/events/external/checkout-completed.handler.js';
import { CheckoutAbandonedHandler } from '../../application/events/external/checkout-abandoned.handler.js';
import { CheckoutExpiredHandler } from '../../application/events/external/checkout-expired.handler.js';
import { DeliveryDeliveredHandler } from '../../application/events/external/delivery-delivered.handler.js';
import { DeliveryCancelledHandler } from '../../application/events/external/delivery-cancelled.handler.js';
import { OrderCompletedHandler } from '../../application/events/external/order-completed.handler.js';
import { OrderOutForDeliveryHandler } from '../../application/events/external/order-out-for-delivery.handler.js';
import { OrderCancelProcessedHandler } from '../../application/events/external/order-cancel-processed.handler.js';
import { ReturnPickupScheduledHandler } from '../../application/events/external/return-pickup-scheduled.handler.js';
import { ReturnPickedUpHandler } from '../../application/events/external/return-picked-up.handler.js';
import { ReturnRefundedHandler } from '../../application/events/external/return-refunded.handler.js';
import { ReturnReplacedHandler } from '../../application/events/external/return-replaced.handler.js';
import { ReturnInspectedHandler } from '../../application/events/external/return-inspected.handler.js';
import { TrackingUpdatedHandler } from '../../application/events/external/tracking-updated.handler.js';
import { OrderItemUpdatedHandler } from '../../application/events/external/order-item-updated.handler.js';
import { OrderItemQuantityChangedHandler } from '../../application/events/external/order-item-quantity-changed.handler.js';
import { OrderItemStatusChangedHandler } from '../../application/events/external/order-item-status-changed.handler.js';
import { DeliveryPickedUpHandler } from '../../application/events/external/delivery-picked-up.handler.js';
import { DeliveryRescheduledHandler } from '../../application/events/external/delivery-rescheduled.handler.js';
import { OrderNoteAddedHandler } from '../../application/events/external/order-note-added.handler.js';
import { OrderPriorityChangedHandler } from '../../application/events/external/order-priority-changed.handler.js';
import { OrderFulfillmentStartedHandler } from '../../application/events/external/order-fulfillment-started.handler.js';
import { OrderFulfillmentFulfilledHandler } from '../../application/events/external/order-fulfillment-fulfilled.handler.js';
import { CheckoutStartedHandler } from '../../application/events/external/checkout-started.handler.js';
import { CheckoutStepChangedHandler } from '../../application/events/external/checkout-step-changed.handler.js';
import { FulfillmentCancelledHandler } from '../../application/events/external/fulfillment-cancelled.handler.js';
import { PartiallyFulfilledHandler } from '../../application/events/external/partially-fulfilled.handler.js';
import { RestockedHandler } from '../../application/events/external/restocked.handler.js';
import { TrackingLocationUpdatedHandler } from '../../application/events/external/tracking-location-updated.handler.js';
import { TrackingStatusChangedHandler } from '../../application/events/external/tracking-status-changed.handler.js';
import { AuthLockedHandler } from '../../application/events/external/auth-locked.handler.js';
import { AuthMfaEnabledHandler } from '../../application/events/external/auth-mfa-enabled.handler.js';
import { AuthMfaDisabledHandler } from '../../application/events/external/auth-mfa-disabled.handler.js';
import { UserSecurityEventHandler } from '../../application/events/external/user-security-event.handler.js';
import { VerificationOtpSentHandler } from '../../application/events/external/verification-otp-sent.handler.js';
import { VerificationRequestedHandler } from '../../application/events/external/verification-requested.handler.js';
import { VerificationExpiredHandler } from '../../application/events/external/verification-expired.handler.js';
import { UserActivityRecordedHandler } from '../../application/events/external/user-activity-recorded.handler.js';
import { PermissionGrantedHandler } from '../../application/events/external/permission-granted.handler.js';
import { PermissionRevokedHandler } from '../../application/events/external/permission-revoked.handler.js';
import { UserProfileUpdatedHandler } from '../../application/events/external/user-profile-updated.handler.js';
import { SessionExpiredHandler } from '../../application/events/external/session-expired.handler.js';
import { AccountLockLockedHandler } from '../../application/events/external/account-lock-locked.handler.js';
import { AccountLockUnlockedHandler } from '../../application/events/external/account-lock-unlocked.handler.js';
import { AccountLockExtendedHandler } from '../../application/events/external/account-lock-extended.handler.js';
import { AuthExpiredHandler } from '../../application/events/external/auth-expired.handler.js';
import { AuthRevokedHandler } from '../../application/events/external/auth-revoked.handler.js';
import { AuthStatusChangedHandler } from '../../application/events/external/auth-status-changed.handler.js';
import { AuthUnlockedHandler } from '../../application/events/external/auth-unlocked.handler.js';
import { BiometricDisabledHandler } from '../../application/events/external/biometric-disabled.handler.js';
import { BiometricEnabledHandler } from '../../application/events/external/biometric-enabled.handler.js';
import { DeviceSeenHandler } from '../../application/events/external/device-seen.handler.js';
import { DeviceTrustedHandler } from '../../application/events/external/device-trusted.handler.js';
import { DeviceUntrustedHandler } from '../../application/events/external/device-untrusted.handler.js';
import { LoginAttemptBlockedHandler } from '../../application/events/external/login-attempt-blocked.handler.js';
import { LoginAttemptSucceededHandler } from '../../application/events/external/login-attempt-succeeded.handler.js';
import { MfaBackupCodeUsedHandler } from '../../application/events/external/mfa-backup-code-used.handler.js';
import { MfaBackupCodesExhaustedHandler } from '../../application/events/external/mfa-backup-codes-exhausted.handler.js';
import { MfaBackupCodesGeneratedHandler } from '../../application/events/external/mfa-backup-codes-generated.handler.js';
import { MfaDisabledHandler } from '../../application/events/external/mfa-disabled.handler.js';
import { MfaSetupStartedHandler } from '../../application/events/external/mfa-setup-started.handler.js';
import { RoleAssignedHandler } from '../../application/events/external/role-assigned.handler.js';
import { RoleRevokedHandler } from '../../application/events/external/role-revoked.handler.js';
import { SessionIdleTimeoutHandler } from '../../application/events/external/session-idle-timeout.handler.js';
import { SessionLogoutHandler } from '../../application/events/external/session-logout.handler.js';
import { SessionRefreshedHandler } from '../../application/events/external/session-refreshed.handler.js';
import { SocialAccountLinkedHandler } from '../../application/events/external/social-account-linked.handler.js';
import { SocialAccountUnlinkedHandler } from '../../application/events/external/social-account-unlinked.handler.js';
import { SocialAccountLoginSucceededHandler } from '../../application/events/external/social-account-login-succeeded.handler.js';
import { SsoLoginSucceededHandler } from '../../application/events/external/sso-login-succeeded.handler.js';
import { TokenExpiredHandler } from '../../application/events/external/token-expired.handler.js';
import { TokenIssuedHandler } from '../../application/events/external/token-issued.handler.js';
import { TokenRefreshedHandler } from '../../application/events/external/token-refreshed.handler.js';
import { TokenResetRequestedHandler } from '../../application/events/external/token-reset-requested.handler.js';
import { TokenReusedHandler } from '../../application/events/external/token-reused.handler.js';
import { TokenRevokedHandler } from '../../application/events/external/token-revoked.handler.js';
import { TokenVerifyRequestedHandler } from '../../application/events/external/token-verify-requested.handler.js';
import { UserAddressSetDefaultHandler } from '../../application/events/external/user-address-set-default.handler.js';
import { UserAddressUpdatedHandler } from '../../application/events/external/user-address-updated.handler.js';
import { UserContactSetPrimaryHandler } from '../../application/events/external/user-contact-set-primary.handler.js';
import { UserContactUpdatedHandler } from '../../application/events/external/user-contact-updated.handler.js';
import { UserPreferencesResubscribedHandler } from '../../application/events/external/user-preferences-resubscribed.handler.js';
import { UserPreferencesUnsubscribedHandler } from '../../application/events/external/user-preferences-unsubscribed.handler.js';
import { UserPreferencesUpdatedHandler } from '../../application/events/external/user-preferences-updated.handler.js';
import { UserProfileAvatarUpdatedHandler } from '../../application/events/external/user-profile-avatar-updated.handler.js';
import { UserProfileBioUpdatedHandler } from '../../application/events/external/user-profile-bio-updated.handler.js';
import { UserProfileVisibilityChangedHandler } from '../../application/events/external/user-profile-visibility-changed.handler.js';
import { UserSettingsLanguageChangedHandler } from '../../application/events/external/user-settings-language-changed.handler.js';
import { UserSettingsThemeChangedHandler } from '../../application/events/external/user-settings-theme-changed.handler.js';
import { UserSettingsUpdatedHandler } from '../../application/events/external/user-settings-updated.handler.js';
import { VerificationOtpResentHandler } from '../../application/events/external/verification-otp-resent.handler.js';



@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule, PreferenceModule, ScheduleModule, ServicesModule],
  controllers: [NotificationController, PublicUnsubscribeController],
  providers: [
    TrackingStatusChangedHandler,
    TrackingLocationUpdatedHandler,
    RestockedHandler,
    PartiallyFulfilledHandler,
    FulfillmentCancelledHandler,
    CheckoutStepChangedHandler,
    CheckoutStartedHandler,
    OrderFulfillmentFulfilledHandler,
    OrderFulfillmentStartedHandler,
    OrderPriorityChangedHandler,
    OrderNoteAddedHandler,
    DeliveryRescheduledHandler,
    DeliveryPickedUpHandler,
    OrderItemStatusChangedHandler,
    OrderItemQuantityChangedHandler,
    OrderItemUpdatedHandler,
    TrackingUpdatedHandler,
    ReturnInspectedHandler,
    ReturnReplacedHandler,
    ReturnRefundedHandler,
    ReturnPickedUpHandler,
    ReturnPickupScheduledHandler,
    OrderCancelProcessedHandler,
    OrderOutForDeliveryHandler,
    OrderCompletedHandler,
    DeliveryCancelledHandler,
    DeliveryDeliveredHandler,
    CheckoutExpiredHandler,
    CheckoutAbandonedHandler,
    CheckoutCompletedHandler,
    OrderItemRemovedHandler,
    OrderItemAddedHandler,
    OrderCancelRefundedHandler,
    OrderCancelRejectedHandler,
    OrderCancelApprovedHandler,
    OrderCancelRequestedHandler,
    DeliveryFailedHandler,
    DeliveryOutForDeliveryHandler,
    DeliveryInTransitHandler,
    DeliveryScheduledHandler,
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

    VendorApprovalAppealResolvedHandler,
    VendorApprovalRejectedHandler,
    VendorApprovalRequestedHandler,
    VendorCommissionAdjustedHandler,
    VendorCommissionConfiguredHandler,
    VendorCommissionUpdatedHandler,
    VendorPayoutOnHoldHandler,
    VendorPayoutReleasedHandler,
    VendorPayoutRequestedHandler,
    VendorPerformanceSuspendTriggeredHandler,
    VendorPerformanceDeclinedHandler,
    VendorPerformanceEvaluatedHandler,
    VendorPerformanceGradeChangedHandler,
    VendorPerformanceImprovedHandler,
    VendorPerformanceWarningHandler,
    VendorReviewFlaggedHandler,
    VendorReviewHelpfulHandler,
    VendorReviewHiddenHandler,
    VendorReviewRepliedHandler,
    VendorSettlementInitiatedHandler,
    VendorSettlementOnHoldHandler,
    VendorSuspensionAppealedHandler,
    VendorSuspensionExpiredHandler,
    VendorSuspensionLiftedHandler,
    VendorTierBenefitAppliedHandler,
    VendorTierDowngradedHandler,
    VendorTierEligibleUpgradeHandler,
    VendorTierUpgradedHandler,
    VendorVendorActivatedHandler,
    VendorVendorApprovedHandler,
    VendorVendorBlockedHandler,
    VendorVendorBusinessUpdatedHandler,
    VendorVendorDeactivatedHandler,
    VendorVendorDeletedHandler,
    VendorVendorFeaturedHandler,
    VendorVendorProfileUpdatedHandler,
    VendorVendorReactivatedHandler,
    VendorVendorReinstatedHandler,
    VendorVendorRejectedHandler,
    VendorVendorStatusChangedHandler,
    VendorVendorUnfeaturedHandler,
    VendorVendorUpdatedHandler,
    VendorVendorVerifiedHandler,
    VendorSubscriptionDowngradedHandler,
    VendorSubscriptionExpiredHandler,
    VendorSubscriptionFeatureDisabledHandler,
    VendorSubscriptionFeatureEnabledHandler,
    VendorSubscriptionRenewedHandler,
    VendorSubscriptionStartedHandler,
    VendorSubscriptionTrialEndedHandler,
    VendorSubscriptionTrialStartedHandler,
    VendorSubscriptionUpgradedHandler,
    VendorTeamInviteAcceptedHandler,
    VendorTeamInviteExpiredHandler,
    VendorTeamInvitedHandler,
    VendorTeamPermissionsUpdatedHandler,
    VendorTeamRemovedHandler,
    VendorTeamRoleChangedHandler,
    VendorVerificationReviewStartedHandler,
    VendorVerificationStartedHandler,
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
    VendorVerificationExpiredHandler,
    VendorApprovedNotificationHandler,
    PaymentVerificationExpiredHandler,
    PaymentVerificationInitiatedHandler,
    PaymentTransactionSucceededHandler,
    PaymentTransactionStatusChangedHandler,
    PaymentTransactionSettledHandler,
    PaymentSplitExecutedHandler,
    PaymentRefundStatusChangedHandler,
    PaymentPaymentStatusChangedHandler,
    PaymentPaymentCapturedHandler,
    PaymentInvoiceIssuedHandler,
    PaymentSubscriptionTrialStartedHandler,
    PaymentSubscriptionResumedHandler,
    PaymentSubscriptionPausedHandler,
    PaymentSubscriptionPastDueHandler,
    PaymentRecurringScheduledHandler,
    PaymentRecurringRunHandler,
    PaymentRecurringResumedHandler,
    PaymentRecurringPausedHandler,
    VendorApprovalResubmittedHandler,
    VendorCommissionActivatedHandler,
    VendorCommissionDeactivatedHandler,
    VendorPayoutCancelledHandler,
    VendorPayoutFailedHandler,
    VendorPayoutPaidHandler,
    VendorPayoutProcessingHandler,
    VendorPayoutRejectedHandler,
    VendorReviewApprovedHandler,
    VendorReviewRejectedHandler,
    VendorReviewSubmittedHandler,
    VendorSettlementCancelledHandler,
    VendorSettlementFailedHandler,
    VendorSettlementProcessingHandler,
    VendorSubscriptionCancelledHandler,
    VendorSubscriptionPaymentFailedHandler,
    VendorSubscriptionSuspendedHandler,
    VendorSuspensionAppealApprovedHandler,
    VendorSuspensionAppealRejectedHandler,
    VendorSuspensionCreatedHandler,
    VendorTeamInviteCancelledHandler,
    VendorTeamInviteRejectedHandler,
    VendorTeamReactivatedHandler,
    VendorTeamSuspendedHandler,
    VendorActivatedHandler,
    VendorDeactivatedHandler,
    VendorDeletedHandler,
    VendorReactivatedHandler,
    VendorVerifiedHandler,
    VendorVerificationApprovedHandler,
    VendorVerificationRejectedHandler,
    VendorVerificationResubmittedHandler,
    VendorVerificationSubmittedHandler,
    CartActivatedHandler,
    ProductCollectionCreatedHandler,
    ProductReviewUpdatedHandler,
    ProductReviewDeletedHandler,
    ProductCollectionDeletedHandler,
    ProductCategoryActivatedHandler,
    ProductCategoryDeactivatedHandler,
    ProductCollectionActivatedHandler,
    ProductCollectionDeactivatedHandler,
    ProductPricingDiscountAppliedHandler,
    ProductPricingDiscountRemovedHandler,
    ProductPricingRuleAddedHandler,
    ProductPricingRuleRemovedHandler,
    ProductUnpublishedHandler,
    ProductCategoryDeletedHandler,
    ProductBrandDeletedHandler,
    ProductBrandDeactivatedHandler,
    ProductBrandActivatedHandler,
    ProductCategoryCreatedHandler,
    ProductBrandUpdatedHandler,
    ProductBrandCreatedHandler,
    ProductReviewReportedHandler,
    ProductReviewRejectedHandler,
    ProductReviewApprovedHandler,
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
    PaymentCreatedHandler,
    PaymentCompletedHandler,
    RefundFailedHandler,
    InvoicePaidHandler,
    InvoiceRefundedHandler,
    RecurringActivatedHandler,
    RecurringCancelledHandler,
    RecurringCompletedHandler,
    RecurringFailedHandler,
    SplitCreatedHandler,
    SplitFailedHandler,
    SubscriptionCreatedHandler,
    SubscriptionActivatedHandler,
    SubscriptionCancelledHandler,
    TransactionCreatedHandler,
    TransactionFailedHandler,
    PaymentVerificationFailedHandler,
    PaymentVerificationVerifiedHandler,
    PaymentPaidHandler,
    PaymentRefundedHandler,
    ProductReviewPostedHandler,
    UserRoleAssignedHandler,
    UserRoleRevokedHandler,
    UserStatusChangedHandler,
    SavedForLaterStatusHandler,
    VendorPayoutProcessedHandler,
    SavedForLaterRemovedHandler,
    GuestCartStatusHandler,
    GuestCartExpiredHandler,
    GuestCartAbandonedHandler,
    CartItemStatusHandler,
    CartItemSavedHandler,
    CartItemMovedHandler,
    UserSuspendedHandler,
    VerificationVerifiedHandler,
    VerificationFailedHandler,
    UserSettingsCreatedHandler,
    UserProfileCreatedHandler,
    UserPreferencesCreatedHandler,
    UserDeletedHandler,
    UserContactVerifiedHandler,
    UserContactDeletedHandler,
    UserAddressDeletedHandler,
    TokenVerifyCompletedHandler,
    TokenResetCompletedHandler,
    SsoConfigCreatedHandler,
    OauthClientRegisteredHandler,
    MfaVerifiedHandler,
    MfaChallengeFailedHandler,
    MfaChallengeCreatedHandler,
    LoginAttemptFailedHandler,
    KycVerifiedHandler,
    KycSubmittedHandler,
    KycRejectedHandler,
    DeviceUnregisteredHandler,
    DeviceRegisteredHandler,
    BiometricVerifiedHandler,
    BiometricFailedHandler,
    AuthPhoneVerifiedHandler,
    AuthEmailVerifiedHandler,
    AuthDeactivatedHandler,
    AuthActivatedHandler,
    AuthCreatedHandler,
    UserVerifiedHandler,
    VendorApprovedHandler,
    VendorRegisteredHandler,
    VendorSuspendedHandler,
    ProductBrandLogoUpdatedHandler,
    ProductCategoryMovedHandler,
    ProductCategoryUpdatedHandler,
    ProductCollectionProductAddedHandler,
    ProductCollectionProductRemovedHandler,
    ProductCollectionUpdatedHandler,
    ProductInventoryAdjustedHandler,
    ProductInventoryReleasedHandler,
    ProductInventoryReservedHandler,
    ProductInventoryRestockedHandler,
    ProductProductStatusChangedHandler,
    ProductProductStockChangedHandler,
    ProductProductUpdatedHandler,
    ProductReviewMarkedHelpfulHandler,
    ProductVariantAddedHandler,
    ProductVariantRemovedHandler,
    ProductVariantStockChangedHandler,
    ProductVariantUpdatedHandler,
    CartTotalsRecalculatedHandler,
    CartMergerConflictResolvedHandler,
    CartMergerStartedHandler,
    CartTaxCalculatedHandler,
    CartTaxRemovedHandler,
    CartCouponValidatedHandler,
    AuthLockedHandler,
    AuthMfaEnabledHandler,
    AuthMfaDisabledHandler,
    UserSecurityEventHandler,
    VerificationOtpSentHandler,
    VerificationRequestedHandler,
    VerificationExpiredHandler,
    UserActivityRecordedHandler,
    PermissionGrantedHandler,
    PermissionRevokedHandler,
    UserProfileUpdatedHandler,
    SessionExpiredHandler,
    AccountLockLockedHandler,
    AccountLockUnlockedHandler,
    AccountLockExtendedHandler,
    AuthExpiredHandler,
    AuthRevokedHandler,
    AuthStatusChangedHandler,
    AuthUnlockedHandler,
    BiometricDisabledHandler,
    BiometricEnabledHandler,
    DeviceSeenHandler,
    DeviceTrustedHandler,
    DeviceUntrustedHandler,
    LoginAttemptBlockedHandler,
    LoginAttemptSucceededHandler,
    MfaBackupCodeUsedHandler,
    MfaBackupCodesExhaustedHandler,
    MfaBackupCodesGeneratedHandler,
    MfaDisabledHandler,
    MfaSetupStartedHandler,
    RoleAssignedHandler,
    RoleRevokedHandler,
    SessionIdleTimeoutHandler,
    SessionLogoutHandler,
    SessionRefreshedHandler,
    SocialAccountLinkedHandler,
    SocialAccountUnlinkedHandler,
    SocialAccountLoginSucceededHandler,
    SsoLoginSucceededHandler,
    TokenExpiredHandler,
    TokenIssuedHandler,
    TokenRefreshedHandler,
    TokenResetRequestedHandler,
    TokenReusedHandler,
    TokenRevokedHandler,
    TokenVerifyRequestedHandler,
    UserAddressSetDefaultHandler,
    UserAddressUpdatedHandler,
    UserContactSetPrimaryHandler,
    UserContactUpdatedHandler,
    UserPreferencesResubscribedHandler,
    UserPreferencesUnsubscribedHandler,
    UserPreferencesUpdatedHandler,
    UserProfileAvatarUpdatedHandler,
    UserProfileBioUpdatedHandler,
    UserProfileVisibilityChangedHandler,
    UserSettingsLanguageChangedHandler,
    UserSettingsThemeChangedHandler,
    UserSettingsUpdatedHandler,
    VerificationOtpResentHandler,


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
