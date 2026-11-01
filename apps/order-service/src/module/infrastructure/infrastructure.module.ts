/**
 * InfrastructureModule — aggregates infra sub-modules (DB_MODE-aware)
 * @module order-service/infrastructure
 */
import { Global, Module } from '@nestjs/common';

import {
  EmailModule,
  SmsModule,
  PushModule,
} from '@vubon/shared-kernel/infrastructure/external';

import { OrderPrismaModule } from './persistence/prisma/prisma.module.js';
import { PrismaRepositoriesModule } from './persistence/prisma/prisma-repositories.module.js';
import { RedisRepositoriesModule } from './persistence/cache/redis-repositories.module.js';

import { OrderPaymentModule } from './external/payment/payment.module.js';
import { OrderShippingModule } from './external/shipping/shipping.module.js';
import { OrderNotificationModule } from './external/notification/notification.module.js';
import { OrderStorageModule } from './external/storage/storage.module.js';

import { QueuesWorkersModule } from './queues-workers.module.js';

import { IdempotencyService } from './services/internal/idempotency.service.js';
import { FeeCalculatorService } from './services/internal/fee-calculator.service.js';
import { OrderNumberService } from './services/internal/order-number.service.js';
import { TrackingNumberService } from './services/internal/tracking-number.service.js';

import { IS_MEMORY_MODE } from './config/db-mode.config.js';

const APP_SERVICES = [
  IdempotencyService,
  FeeCalculatorService,
  OrderNumberService,
  TrackingNumberService,
];

@Global()
@Module({})
export class InfrastructureModule {
  static forRoot() {
    const prismaModules = IS_MEMORY_MODE
      ? []
      : [OrderPrismaModule, PrismaRepositoriesModule];

    return {
      module: InfrastructureModule,
      imports: [
        EmailModule,
        SmsModule,
        PushModule,
        ...prismaModules,
        RedisRepositoriesModule,
        OrderPaymentModule,
        OrderShippingModule,
        OrderNotificationModule,
        OrderStorageModule,
        QueuesWorkersModule.forRoot(),
      ],
      providers: [...APP_SERVICES],
      exports: [
        EmailModule,
        SmsModule,
        PushModule,
        ...prismaModules,
        RedisRepositoriesModule,
        OrderPaymentModule,
        OrderShippingModule,
        OrderNotificationModule,
        OrderStorageModule,
        QueuesWorkersModule.forRoot(),
        ...APP_SERVICES,
      ],
    };
  }
}
