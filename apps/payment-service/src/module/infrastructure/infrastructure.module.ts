/**
 * InfrastructureModule — aggregates every infra sub-module
 * @module payment-service/infrastructure
 */
import { Global, Module } from '@nestjs/common';

import { EmailModule } from '@vubon/shared-kernel/infrastructure/external';
import { SmsModule } from '@vubon/shared-kernel/infrastructure/external';
import { PushModule } from '@vubon/shared-kernel/infrastructure/external';

import { PrismaRepositoriesModule } from './persistence/prisma/prisma-repositories.module.js';
import { RedisRepositoriesModule } from './persistence/cache/redis-repositories.module.js';
import { GatewaysModule } from './gateways/gateways.module.js';
import { QueuesWorkersModule } from './queues-workers.module.js';

import { PaymentNotificationService } from './services/external/payment-notification.service.js';
import { PaymentAnalyticsService } from './services/external/payment-analytics.service.js';
import { SignatureService } from './services/internal/signature.service.js';
import { IdempotencyService } from './services/internal/idempotency.service.js';
import { FeeCalculatorService } from './services/internal/fee-calculator.service.js';
import { RetryPolicyService } from './services/internal/retry-policy.service.js';

@Global()
@Module({
  imports: [
    EmailModule,
    SmsModule,
    PushModule,
    PrismaRepositoriesModule,
    RedisRepositoriesModule,
    GatewaysModule,
    QueuesWorkersModule,
  ],
  providers: [
    PaymentNotificationService,
    PaymentAnalyticsService,
    SignatureService,
    IdempotencyService,
    FeeCalculatorService,
    RetryPolicyService,
  ],
  exports: [
    EmailModule,
    SmsModule,
    PushModule,
    PrismaRepositoriesModule,
    RedisRepositoriesModule,
    GatewaysModule,
    QueuesWorkersModule,
    PaymentNotificationService,
    PaymentAnalyticsService,
    SignatureService,
    IdempotencyService,
    FeeCalculatorService,
    RetryPolicyService,
  ],
})
export class InfrastructureModule {}
