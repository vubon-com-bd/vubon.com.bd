/**
 * AppModule — Root module of order-service
 * @module order-service/modules
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

// Common (global) — wires kernel + infrastructure
import { CommonModule } from './common/index.js';

// Feature modules
import { OrderModule } from './order/index.js';
import { OrderItemModule } from './order-item/index.js';
import { CheckoutModule } from './checkout/index.js';
import { CheckoutSessionModule } from './checkout-session/index.js';
import { DeliveryModule } from './delivery/index.js';
import { OrderCancelModule } from './order-cancel/index.js';
import { OrderReturnModule } from './order-return/index.js';
import { OrderFulfillmentModule } from './order-fulfillment/index.js';
import { OrderHistoryModule } from './order-history/index.js';
import { OrderTrackingModule } from './order-tracking/index.js';
import { PublicOrderModule } from './public-order/index.js';

@Module({
  imports: [
    // Root config
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    CqrsModule.forRoot(),

    // Common (global) — provides PrismaService, RedisService,
    // kernel modules, and all domain repository tokens
    CommonModule,

    // Feature modules
    OrderModule,
    OrderItemModule,
    CheckoutModule,
    CheckoutSessionModule,
    DeliveryModule,
    OrderCancelModule,
    OrderReturnModule,
    OrderFulfillmentModule,
    OrderHistoryModule,
    OrderTrackingModule,
    PublicOrderModule,
  ],
})
export class AppModule {}
