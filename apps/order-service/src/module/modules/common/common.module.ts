/**
 * CommonModule — cross-cutting infrastructure for order-service
 * @module order-service/modules/common
 *
 * NOTE: EventBridgeModule is NOT imported here. It imports CqrsModule
 * (regular) which creates a second CQRS instance in @Global scope and
 * breaks CommandBus's ModuleRef resolution. Feature modules that need
 * DomainEventBridgeService (e.g., OrderModule) import EventBridgeModule
 * directly, reusing the CqrsModule.forRoot() context from AppModule.
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
