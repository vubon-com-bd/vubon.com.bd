/**
 * Common Module — aggregates all shared kernel modules
 * @module shared-kernel/modules/common
 */
import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/persistence/prisma/index.js';
import { RedisModule } from '../../infrastructure/persistence/cache/index.js';
import { QueueModule } from '../../infrastructure/messaging/queue/index.js';
import { KernelCqrsModule } from './cqrs.module.js';
import { KernelEventBusModule } from './event-bus.module.js';
import { KernelGuardsModule } from './guards.module.js';
import { KernelInterceptorsModule } from './interceptors.module.js';
import { KernelFiltersModule } from './filters.module.js';
import { KernelPipesModule } from './pipes.module.js';
import { KernelConfigModule } from './config.module.js';

@Global()
@Module({
  imports: [
    PrismaModule,
    RedisModule,
    QueueModule,
    KernelCqrsModule,
    KernelEventBusModule,
    KernelGuardsModule,
    KernelInterceptorsModule,
    KernelFiltersModule,
    KernelPipesModule,
    KernelConfigModule,
  ],
  exports: [
    PrismaModule,
    RedisModule,
    QueueModule,
    KernelCqrsModule,
    KernelEventBusModule,
    KernelGuardsModule,
    KernelInterceptorsModule,
    KernelFiltersModule,
    KernelPipesModule,
    KernelConfigModule,
  ],
})
export class KernelCommonModule {}
