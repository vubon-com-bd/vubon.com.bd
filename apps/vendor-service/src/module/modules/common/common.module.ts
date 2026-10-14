/**
 * VendorCommonModule — cross-cutting infrastructure for vendor-service
 * @module vendor-service/modules/common
 *
 * Aggregates:
 *  - Kernel cross-cutting (Prisma, Redis, Queue, EventBus, Guards, Interceptors, Filters, Pipes, Config)
 *  - Service infrastructure (Prisma repos, Redis repos, Queues/Workers, InfrastructureModule)
 */
import { Global, Module } from '@nestjs/common';

// ─── Kernel cross-cutting ───────────────────
import { PrismaModule } from '@vubon/shared-kernel/prisma';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import {
  KernelEventBusModule,
  KernelGuardsModule,
  KernelInterceptorsModule,
  KernelFiltersModule,
  KernelPipesModule,
  KernelConfigModule,
} from '@vubon/shared-kernel/modules/common';

// ─── Service infrastructure ─────────────────
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/prisma-repositories.module.js';
import { RedisRepositoriesModule } from '../../infrastructure/persistence/cache/redis-repositories.module.js';
import { QueuesWorkersModule } from '../../infrastructure/queues-workers.module.js';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module.js';

@Global()
@Module({
  imports: [
    // ─── Kernel cross-cutting ───────────────
    PrismaModule,
    RedisModule,
    QueueModule,
    KernelEventBusModule,
    KernelGuardsModule,
    KernelInterceptorsModule,
    KernelFiltersModule,
    KernelPipesModule,
    KernelConfigModule,

    // ─── Service infrastructure ─────────────
    PrismaRepositoriesModule,
    RedisRepositoriesModule,
    QueuesWorkersModule,
    InfrastructureModule,
  ],
  exports: [
    PrismaModule,
    RedisModule,
    QueueModule,
    KernelEventBusModule,
    KernelGuardsModule,
    KernelInterceptorsModule,
    KernelFiltersModule,
    KernelPipesModule,
    KernelConfigModule,
    PrismaRepositoriesModule,
    RedisRepositoriesModule,
    QueuesWorkersModule,
    InfrastructureModule,
  ],
})
export class VendorCommonModule {}
