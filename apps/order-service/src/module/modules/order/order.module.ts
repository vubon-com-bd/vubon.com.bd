/**
 * OrderModule — feature wiring
 * @module order-service/modules/order
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

// ─── Controllers ────────────────────────────
import { OrderController } from '../../interfaces/controllers/rest/order.controller.js';
import { PublicOrderController } from '../../interfaces/controllers/rest/public-order.controller.js';

// ─── Handler arrays ─────────────────────────
import { ORDER_COMMAND_HANDLERS } from './commands/index.js';
import { ORDER_QUERY_HANDLERS } from './queries/index.js';
import { ORDER_SAGAS } from './sagas/index.js';

// ─── Service ────────────────────────────────
import { OrderService } from '../../application/services/impl/order.service.js';
import { OrderEventSubscriberService } from '../../application/services/impl/order-event-subscriber.service.js';
import { ORDER_SERVICE } from '../../application/services/interfaces/order.service.interface.js';

// ─── Guards / Interceptors ──────────────────
import { OwnOrderGuard } from '../../interfaces/guards/own-order.guard.js';
import { VendorOrderGuard } from '../../interfaces/guards/vendor-order.guard.js';
import { OrderStatusGuard } from '../../interfaces/guards/order-status.guard.js';
import { OrderCacheInterceptor } from '../../interfaces/interceptors/order-cache.interceptor.js';

// External Event Handlers (Consumer)
import { CartCheckedOutHandler } from '../../application/events/external/cart-checked-out.handler.js';
import { PaymentCompletedHandler } from '../../application/events/external/payment-completed.handler.js';
import { PaymentFailedHandler } from '../../application/events/external/payment-failed.handler.js';

// ─── Feature health ─────────────────────────
import { OrderFeatureHealthIndicator } from './health/index.js';
import { UserStatusChangedHandler } from '../../application/events/external/user-status-changed.handler.js';
import { VendorActivatedHandler } from '../../application/events/external/vendor-activated.handler.js';
import { VendorDeactivatedHandler } from '../../application/events/external/vendor-deactivated.handler.js';
import { VendorSuspendedHandler } from '../../application/events/external/vendor-suspended.handler.js';
import { VendorApprovedHandler } from '../../application/events/external/vendor-approved.handler.js';
import { UserDeletedHandler } from '../../application/events/external/user-deleted.handler.js';
import { PaymentRefundedHandler } from '../../application/events/external/payment-refunded.handler.js';

import { VendorDeletedHandler } from '../../application/events/external/vendor-deleted.handler.js';
import { InventoryReservedHandler } from '../../application/events/external/inventory-reserved.handler.js';
import { InventoryReleasedHandler } from '../../application/events/external/inventory-released.handler.js';
import { ProductVariantUpdatedHandler } from '../../application/events/external/product-variant-updated.handler.js';
import { InventoryRestockedHandler } from '../../application/events/external/inventory-restocked.handler.js';
import { VendorBlockedHandler } from '../../application/events/external/vendor-blocked.handler.js';


import { OrderCancelModule } from '../order-cancel/order-cancel.module.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, OrderCancelModule],
  controllers: [OrderController, PublicOrderController],
  providers: [
    UserStatusChangedHandler,
    VendorSuspendedHandler,
    VendorDeactivatedHandler,
    VendorActivatedHandler,
    VendorApprovedHandler,
    UserDeletedHandler,
    PaymentRefundedHandler,
    VendorDeletedHandler,
    VendorBlockedHandler,
    InventoryRestockedHandler,
    ProductVariantUpdatedHandler,
    InventoryReleasedHandler,
    InventoryReservedHandler,
    // ─── Service + DI Token ─────────────────
    OrderService,
    { provide: ORDER_SERVICE, useExisting: OrderService },

    // Event Subscriber (bootstraps setServiceName)
    OrderEventSubscriberService,

    // ─── Commands ───────────────────────────
    ...(ORDER_COMMAND_HANDLERS as readonly unknown[] as never[]),

    // ─── Queries ────────────────────────────
    ...(ORDER_QUERY_HANDLERS as readonly unknown[] as never[]),

    // ─── Sagas ──────────────────────────────
    ...(ORDER_SAGAS as readonly unknown[] as never[]),

    // ─── Guards ─────────────────────────────
    OwnOrderGuard,
    VendorOrderGuard,
    OrderStatusGuard,

    // ─── Interceptors ───────────────────────
    OrderCacheInterceptor,

    // External Event Handlers (Consumer)
    CartCheckedOutHandler,
    PaymentCompletedHandler,
    PaymentFailedHandler,

    // ─── Feature health ─────────────────────
    OrderFeatureHealthIndicator,
  ],
  exports: [OrderService, ORDER_SERVICE, OrderFeatureHealthIndicator],
})
export class OrderModule {}
