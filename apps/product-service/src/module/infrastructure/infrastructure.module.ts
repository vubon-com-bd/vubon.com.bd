/**
 * InfrastructureModule — aggregates every infra sub-module
 * @module product-service/infrastructure
 */
import { Global, Module } from '@nestjs/common';

// Persistence
import { ProductPrismaModule } from './persistence/prisma/prisma.module.js';
import { RedisRepositoriesModule } from './persistence/cache/redis-repositories.module.js';
import { PersistenceModule } from './persistence/persistence.module.js';
import { SearchModule } from './persistence/search/search.module.js';

// External integrations
import { StorageModule } from './external/storage/storage.module.js';
import { ProductEmailModule } from './external/email/email.module.js';
import { SlackModule } from './external/slack/slack.module.js';
import { ChartModule } from './external/chart/chart.module.js';
import { ProductNotificationModule } from './external/notification/notification.module.js';

// Queues + Workers
import { QueuesWorkersModule } from './queues-workers.module.js';

// Services
import { ProductNotificationService } from './services/external/product-notification.service.js';
import { ProductAnalyticsService } from './services/external/product-analytics.service.js';
import { UserClient } from './services/external/user.client.js';
import { VendorClient } from './services/external/vendor.client.js';
import { IdempotencyService } from './services/internal/idempotency.service.js';
import { FeeCalculatorService } from './services/internal/fee-calculator.service.js';
import { VendorGuardService } from './services/internal/vendor-guard.service.js';

const APP_SERVICES = [
  ProductNotificationService,
  ProductAnalyticsService,
  UserClient,
  VendorClient,
  IdempotencyService,
  FeeCalculatorService,
  VendorGuardService,
];

@Global()
@Module({
  imports: [
    // Persistence
    ProductPrismaModule,
    PersistenceModule.forRoot(),
    RedisRepositoriesModule,
    SearchModule,

    // External integrations
    StorageModule,
    ProductEmailModule,
    SlackModule,
    ChartModule,
    ProductNotificationModule,

    // Queues + Workers
    QueuesWorkersModule,
  ],
  providers: [...APP_SERVICES],
  exports: [
    ProductPrismaModule,
    PersistenceModule.forRoot(),
    RedisRepositoriesModule,
    SearchModule,
    StorageModule,
    ProductEmailModule,
    SlackModule,
    ChartModule,
    ProductNotificationModule,
    QueuesWorkersModule,
    ...APP_SERVICES,
  ],
})
export class InfrastructureModule {}
