/**
 * CommonModule — cross-cutting infrastructure for order-service
 * @module order-service/modules/common
 *
 * Composes shared-kernel cross-cutting modules + order-service
 * persistence/queue modules. Mirrors cart-service's pattern.
 *
 * NOTE: KernelCqrsModule is intentionally NOT imported here because
 * AppModule already uses CqrsModule.forRoot().
 */
import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@vubon/shared-kernel/prisma';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';

import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/prisma-repositories.module.js';
import { CacheRepositoriesModule } from '../../infrastructure/persistence/cache/redis-repositories.module.js';
import { QueuesWorkersModule } from '../../infrastructure/queues-workers.module.js';

import {
  KernelEventBusModule,
  KernelGuardsModule,
  KernelInterceptorsModule,
  KernelFiltersModule,
  KernelPipesModule,
  KernelConfigModule,
} from '@vubon/shared-kernel/modules/common';

@Global()
@Module({
  imports: [
    // Kernel globals
    PrismaModule,
    RedisModule,
    KernelEventBusModule,
    KernelGuardsModule,
    KernelInterceptorsModule,
    KernelFiltersModule,
    KernelPipesModule,
    KernelConfigModule,

    // Order-service infrastructure
    PrismaRepositoriesModule,
    CacheRepositoriesModule,
    QueuesWorkersModule,
  ],
  exports: [
    PrismaModule,
    RedisModule,
    KernelEventBusModule,
    KernelGuardsModule,
    KernelInterceptorsModule,
    KernelFiltersModule,
    KernelPipesModule,
    KernelConfigModule,

    PrismaRepositoriesModule,
    CacheRepositoriesModule,
    QueuesWorkersModule,
  ],
})
export class CommonModule {}
