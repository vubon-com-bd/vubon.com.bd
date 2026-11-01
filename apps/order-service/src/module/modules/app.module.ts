/**
 * AppModule — order-service root module
 * @module order-service/modules
 */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { OrderCommonModule } from './common/index.js';
import { HealthModule } from './health/index.js';

// ─── Feature modules ────────────────────────
import { OrderModule } from './order/index.js';
import { OrderItemModule } from './order-item/index.js';
import { CheckoutModule } from './checkout/index.js';
import { CheckoutSessionModule } from './checkout-session/index.js';
import { DeliveryModule } from './delivery/index.js';
import { DeliveryMethodModule } from './delivery-method/index.js';
import { OrderCancelModule } from './order-cancel/index.js';
import { OrderReturnModule } from './order-return/index.js';
import { OrderFulfillmentModule } from './order-fulfillment/index.js';
import { OrderHistoryModule } from './order-history/index.js';
import { OrderTrackingModule } from './order-tracking/index.js';
import { PublicOrderModule } from './public-order/index.js';
import { SecurityModule } from '../infrastructure/security/security.module.js';
import { JwtStrategy } from '../infrastructure/security/jwt.strategy.js';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),// ─── Root config ────────────────────────
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    CqrsModule.forRoot(),

    // ─── Common (global) ────────────────────
    OrderCommonModule.forRoot(),

    // ─── Health ─────────────────────────────
    HealthModule,

    // ─── Features ───────────────────────────
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
    PublicOrderModule, SecurityModule],
  providers: [JwtStrategy],
})
export class OrderAppModule {}

// ─── Conventional alias for main.ts ─────────
export { OrderAppModule as AppModule };
