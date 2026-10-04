/**
 * CommonModule — cross-cutting infrastructure for payment-service
 * @module payment-service/modules/common
 *
 * Composes shared-kernel cross-cutting modules + payment-service
 * persistence/queue/gateway modules.
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
import { RedisRepositoriesModule } from '../../infrastructure/persistence/cache/redis-repositories.module.js';
import { QueuesWorkersModule } from '../../infrastructure/queues-workers.module.js';
import { GatewaysModule } from '../../infrastructure/gateways/gateways.module.js';
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

    // Payment-service infrastructure (all sub-modules)
    PrismaRepositoriesModule,
    RedisRepositoriesModule,
    QueuesWorkersModule,
    GatewaysModule,
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
    GatewaysModule,
    InfrastructureModule,
  ],
})
export class CommonModule {}
