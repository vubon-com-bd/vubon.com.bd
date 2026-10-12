/**
 * CommonModule — cross-cutting infrastructure for logistics-service
 * @module logistics-service/modules/common
 *
 * Composes shared-kernel cross-cutting modules + logistics-service persistence,
 * cache, external adapters and workers. Marks itself @Global() so every
 * feature module can inject repository tokens and cross-cutting services
 * without re-importing.
 */
import { Global, Module } from '@nestjs/common';

import { PrismaModule } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
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

import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/prisma-repositories.module.js';
import { CacheRepositoriesModule } from '../../infrastructure/persistence/cache/cache-repositories.module.js';
import { CouriersModule } from '../../infrastructure/external/couriers/couriers.module.js';
import { MapsModule } from '../../infrastructure/external/maps/maps.module.js';
import { QueuesWorkersModule } from '../../infrastructure/queues-workers.module.js';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module.js';

@Global()
@Module({
  imports: [
    // Kernel globals
    PrismaModule,
    RedisModule,
    QueueModule,
    KernelEventBusModule,
    KernelGuardsModule,
    KernelInterceptorsModule,
    KernelFiltersModule,
    KernelPipesModule,
    KernelConfigModule,

    // Logistics-service infrastructure
    PrismaRepositoriesModule,
    CacheRepositoriesModule,
    CouriersModule,
    MapsModule,
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
    CacheRepositoriesModule,
    CouriersModule,
    MapsModule,
    QueuesWorkersModule,
    InfrastructureModule,
  ],
})
export class CommonModule {}
