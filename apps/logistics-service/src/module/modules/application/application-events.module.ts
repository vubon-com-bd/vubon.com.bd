/**
 * ApplicationEventsModule — all external event handlers
 */
import { Module } from '@nestjs/common';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { ShipmentModule } from '../shipment/index.js';

import { OrderCreatedHandler } from '@application/events/external/order-created.handler';
import { OrderConfirmedHandler } from '@application/events/external/order-confirmed.handler';
import { OrderCancelledHandler } from '@application/events/external/order-cancelled.handler';
import { OrderShippedHandler } from '@application/events/external/order-shipped.handler';
import { OrderReturnedHandler } from '@application/events/external/order-returned.handler';
import { OrderRefundedHandler } from '@application/events/external/order-refunded.handler';
import { PaymentCompletedHandler } from '@application/events/external/payment-completed.handler';
import { PaymentFailedHandler } from '@application/events/external/payment-failed.handler';
import { VendorApprovedHandler } from '@application/events/external/vendor-approved.handler';
import { VendorSuspendedHandler } from '@application/events/external/vendor-suspended.handler';
import { VendorDeletedHandler } from '@application/events/external/vendor-deleted.handler';
import { ProductCreatedHandler } from '@application/events/external/product-created.handler';
import { ProductUpdatedHandler } from '@application/events/external/product-updated.handler';
import { ProductDeletedHandler } from '@application/events/external/product-deleted.handler';
import { UserCreatedHandler } from '@application/events/external/user-created.handler';
import { UserStatusChangedHandler } from '@application/events/external/user-status-changed.handler';
import { UserDeletedHandler } from '@application/events/external/user-deleted.handler';

const EXTERNAL_EVENT_HANDLERS = [
  OrderCreatedHandler, OrderConfirmedHandler, OrderCancelledHandler,
  OrderShippedHandler, OrderReturnedHandler, OrderRefundedHandler,
  PaymentCompletedHandler, PaymentFailedHandler,
  VendorApprovedHandler, VendorSuspendedHandler, VendorDeletedHandler,
  ProductCreatedHandler, ProductUpdatedHandler, ProductDeletedHandler,
  UserCreatedHandler, UserStatusChangedHandler, UserDeletedHandler,
] as const;

@Module({
  imports: [EventBusModule, ShipmentModule],
  providers: [...(EXTERNAL_EVENT_HANDLERS as unknown as never[])],
})
export class ApplicationEventsModule {}
