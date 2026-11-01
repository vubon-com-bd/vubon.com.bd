/**
 * ProductCommonModule — cross-cutting infrastructure for product-service
 * @module product-service/modules/common
 *
 * Aggregates:
 *  - Kernel cross-cutting (Prisma, Redis, Queue, CQRS, EventBus, guards, etc.)
 *  - Service infrastructure (Prisma repos, cache repos, workers, external, services)
 */
import { Global, Module } from '@nestjs/common';

// ─── Kernel cross-cutting ───────────────────
import { PrismaModule } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

// ─── Service infrastructure ─────────────────
import { ProductPrismaModule } from '../../infrastructure/persistence/prisma/prisma.module.js';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module.js';
import { RedisRepositoriesModule } from '../../infrastructure/persistence/cache/redis-repositories.module.js';
import { SearchModule } from '../../infrastructure/persistence/search/search.module.js';
import { StorageModule } from '../../infrastructure/external/storage/storage.module.js';
import { ProductEmailModule } from '../../infrastructure/external/email/email.module.js';
import { SlackModule } from '../../infrastructure/external/slack/slack.module.js';
import { ChartModule } from '../../infrastructure/external/chart/chart.module.js';
import { ProductNotificationModule } from '../../infrastructure/external/notification/notification.module.js';
import { QueuesWorkersModule } from '../../infrastructure/queues-workers.module.js';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module.js';

@Global()
@Module({
  imports: [
    // ─── Kernel cross-cutting ───────────────
    PrismaModule,
    RedisModule,
    QueueModule,
    EventBridgeModule,

    // ─── Service infrastructure ─────────────
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
    InfrastructureModule,
  ],
  exports: [
    PrismaModule,
    RedisModule,
    QueueModule,
    EventBridgeModule,
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
    InfrastructureModule,
  ],
})
export class ProductCommonModule {}
