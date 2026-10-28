/**
 * AppModule — payment-service root module
 * @module payment-service/modules
 *
 * Wires:
 *  - ConfigModule.forRoot (global env)
 *  - CqrsModule.forRoot (single bus instance)
 *  - PaymentCommonModule (kernel + infra aggregates)
 *  - HealthModule
 *  - All feature modules
 */
import { JwtStrategy } from '../infrastructure/security/jwt.strategy.js';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Common + Health ────────────────────────
import { PaymentCommonModule } from './common/index.js';
import { AuthModule } from './auth/index.js';
import { HealthModule } from './health/index.js';

// ─── Feature modules ────────────────────────
import { PaymentModule } from './payment/index.js';
import { PaymentMethodModule } from './payment-method/index.js';
import { PaymentGatewayModule } from './payment-gateway/index.js';
import { TransactionModule } from './transaction/index.js';
import { RefundModule } from './refund/index.js';
import { SplitPaymentModule } from './split-payment/index.js';
import { RecurringPaymentModule } from './recurring-payment/index.js';
import { SubscriptionModule } from './subscription/index.js';
import { InvoiceModule } from './invoice/index.js';
import { WebhookModule } from './webhook/index.js';
import { GatewayModule } from './gateway/index.js';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // ─── Root config ────────────────────────
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    CqrsModule.forRoot(),

    // ─── Common (global aggregates) ─────────
    PaymentCommonModule,
    AuthModule,

    // ─── Health ─────────────────────────────
    HealthModule,

    // ─── Gateways (aggregate) ───────────────
    GatewayModule,

    // ─── Features ───────────────────────────
    PaymentModule,
    PaymentMethodModule,
    PaymentGatewayModule,
    TransactionModule,
    RefundModule,
    SplitPaymentModule,
    RecurringPaymentModule,
    SubscriptionModule,
    InvoiceModule,
    WebhookModule,
  ],
  providers: [JwtStrategy],
})
export class PaymentAppModule {}

// Conventional alias for main.ts
export { PaymentAppModule as AppModule };
