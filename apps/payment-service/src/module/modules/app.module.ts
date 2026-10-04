/**
 * AppModule — payment-service root module
 * @module payment-service/modules
 *
 * Wires:
 *  - ConfigModule.forRoot (global env)
 *  - CqrsModule.forRoot (global buses)
 *  - CommonModule (kernel + infra globals)
 *  - Feature modules (payment, refund, transaction, webhook, health)
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { CommonModule } from './common/index.js';
import { PaymentModule } from './payment/index.js';
import { RefundModule } from './refund/index.js';
import { TransactionModule } from './transaction/index.js';
import { WebhookModule } from './webhook/index.js';
import { HealthModule } from './health/index.js';

@Module({
  imports: [
    // Root config
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    CqrsModule.forRoot(),

    // Common (global) — provides PrismaService, RedisService, QueueService,
    // kernel modules, gateways, and all repository tokens
    CommonModule,

    // Feature modules
    PaymentModule,
    RefundModule,
    TransactionModule,
    WebhookModule,
    HealthModule,
  ],
})
export class AppModule {}
