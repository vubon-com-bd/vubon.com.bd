/**
 * CartModule — feature wiring
 * @module cart-service/modules/cart
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { CartController } from '../../interfaces/controllers/rest/cart.controller.js';
import { CartEventSubscriberService } from '../../application/services/impl/cart-event-subscriber.service.js';

// ─── External Event Handlers ───
import { UserDeletedHandler } from '../../application/events/external/user-deleted.handler.js';
import { UserCreatedHandler } from '../../application/events/external/user-registered.handler.js';
import { VendorSuspendedHandler } from '../../application/events/external/vendor-suspended.handler.js';
import { ProductStatusChangedHandler } from '../../application/events/external/product-status-changed.handler.js';
import { ProductStockChangedHandler } from '../../application/events/external/product-stock-changed.handler.js';
import { ProductUnpublishedHandler } from '../../application/events/external/product-unpublished.handler.js';
import { VariantStockChangedHandler } from '../../application/events/external/variant-stock-changed.handler.js';
import { VariantRemovedHandler } from '../../application/events/external/variant-removed.handler.js';
import { PricingDiscountAppliedHandler } from '../../application/events/external/pricing-discount-applied.handler.js';
import { ProductBrandDeletedHandler } from '../../application/events/external/product-brand-deleted.handler.js';
import { ProductCategoryDeletedHandler } from '../../application/events/external/product-category-deleted.handler.js';
import { ProductVariantAddedHandler } from '../../application/events/external/product-variant-added.handler.js';
import { ProductCategoryUpdatedHandler } from '../../application/events/external/product-category-updated.handler.js';
import { ProductCategoryActivatedHandler } from '../../application/events/external/product-category-activated.handler.js';
import { ProductCategoryDeactivatedHandler } from '../../application/events/external/product-category-deactivated.handler.js';
import { PricingDiscountRemovedHandler } from '../../application/events/external/pricing-discount-removed.handler.js';
import { VendorPayoutProcessedHandler } from '../../application/events/external/vendor-payout-processed.handler.js';
import { VendorReinstatedHandler } from '../../application/events/external/vendor-reinstated.handler.js';
import { OrderCancelledHandler } from '../../application/events/external/order-cancelled.handler.js';
import { PaymentFailedHandler } from '../../application/events/external/payment-failed.handler.js';
import { PaymentCompletedHandler } from '../../application/events/external/payment-completed.handler.js';

import { CART_COMMAND_HANDLERS } from './commands/index.js';
import { CART_QUERY_HANDLERS } from './queries/index.js';
import { CART_SAGAS } from './sagas/index.js';
import { CartFeatureHealthIndicator } from './health/index.js';

import { CartService } from '../../application/services/impl/cart.service.js';
import { CART_SERVICE } from '../../application/services/interfaces/cart.service.interface.js';

import { CartOwnerGuard } from '../../interfaces/guards/cart-owner.guard.js';
import { OwnCartGuard } from '../../interfaces/guards/own-cart.guard.js';
import { CartNotEmptyGuard } from '../../interfaces/guards/cart-not-empty.guard.js';

import { CartCacheInterceptor } from '../../interfaces/interceptors/cart-cache.interceptor.js';
import { CartLockInterceptor } from '../../interfaces/interceptors/cart-lock.interceptor.js';
import { PaymentRefundedHandler } from '../../application/events/external/payment-refunded.handler.js';
import { OrderCompletedHandler } from '../../application/events/external/order-completed.handler.js';
import { OrderRefundedHandler } from '../../application/events/external/order-refunded.handler.js';
import { OrderReturnedHandler } from '../../application/events/external/order-returned.handler.js';
import { UserStatusChangedHandler } from '../../application/events/external/user-status-changed.handler.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [CartController],
  providers: [
    CartService,
    { provide: CART_SERVICE, useExisting: CartService },

    ...(CART_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(CART_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(CART_SAGAS as readonly unknown[] as never[]),

    CartOwnerGuard,
    OwnCartGuard,
    CartNotEmptyGuard,
    CartCacheInterceptor,
    CartLockInterceptor,

    // ─── External Event Handlers ───
    CartEventSubscriberService,
    UserDeletedHandler,
    UserCreatedHandler,
    VendorSuspendedHandler,
    VendorReinstatedHandler,
    VendorPayoutProcessedHandler,
    PricingDiscountRemovedHandler,
    ProductCategoryDeactivatedHandler,
    ProductCategoryActivatedHandler,
    ProductCategoryUpdatedHandler,
    ProductVariantAddedHandler,
    ProductCategoryDeletedHandler,
    ProductBrandDeletedHandler,
    PricingDiscountAppliedHandler,
    VariantRemovedHandler,
    VariantStockChangedHandler,
    ProductUnpublishedHandler,
    ProductStockChangedHandler,
    ProductStatusChangedHandler,
    UserStatusChangedHandler,
    OrderReturnedHandler,
    OrderRefundedHandler,
    OrderCompletedHandler,
    PaymentRefundedHandler,
    OrderCancelledHandler,
    PaymentFailedHandler,
    PaymentCompletedHandler,

    CartFeatureHealthIndicator,
  ],
  exports: [
    CartService,
    CART_SERVICE,
    CartFeatureHealthIndicator,
  ],
})
export class CartModule {}
