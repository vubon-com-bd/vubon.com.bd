import { Module } from '@nestjs/common';

import {
  CommonModule,
  OrderModule,
  OrderItemModule,
  CheckoutModule,
  CheckoutSessionModule,
  DeliveryModule,
  DeliveryMethodModule,
  OrderCancelModule,
  OrderReturnModule,
  OrderFulfillmentModule,
  OrderHistoryModule,
  OrderTrackingModule,
  PublicOrderModule,
} from './module/modules';

import { InfrastructureModule } from './module/infrastructure';

@Module({
  imports: [
    // Global infrastructure (Prisma, Redis, Queue, CQRS, Guards, etc.)
    CommonModule,
    InfrastructureModule,

    // Feature Modules — Order Core
    OrderModule,
    OrderItemModule,

    // Feature Modules — Checkout
    CheckoutModule,
    CheckoutSessionModule,

    // Feature Modules — Delivery
    DeliveryModule,
    DeliveryMethodModule,

    // Feature Modules — Cancel + Return
    OrderCancelModule,
    OrderReturnModule,

    // Feature Modules — Fulfillment + Tracking
    OrderFulfillmentModule,
    OrderHistoryModule,
    OrderTrackingModule,

    // Public
    PublicOrderModule,
  ],
})
export class AppModule {}
