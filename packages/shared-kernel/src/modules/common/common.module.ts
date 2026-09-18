/**
 * Common Module — aggregates all shared kernel modules
 * @module shared-kernel/modules/common
 */
import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/persistence/prisma';
import { RedisModule } from '../../infrastructure/persistence/cache';
import { QueueModule } from '../../infrastructure/messaging/queue';
import { KernelCqrsModule } from './cqrs.module';
import { KernelEventBusModule } from './event-bus.module';
import { KernelGuardsModule } from './guards.module';
import { KernelInterceptorsModule } from './interceptors.module';
import { KernelFiltersModule } from './filters.module';
import { KernelPipesModule } from './pipes.module';
import { KernelConfigModule } from './config.module';

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
