/**
 * CommonModule — cross-cutting infrastructure for vendor-service
 * @module vendor-service/modules/common
 *
 * Composes shared-kernel cross-cutting modules + vendor-service
 * persistence/queue/service modules.
 *
 * Global so feature modules don't re-import.
 */
import { Global, Module } from '@nestjs/common';

// Shared kernel globals
import { PrismaModule } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';

// Shared kernel common modules (guards/interceptors/filters/pipes/config)
import {
  KernelEventBusModule,
  KernelGuardsModule,
  KernelInterceptorsModule,
  KernelFiltersModule,
  KernelPipesModule,
  KernelConfigModule,
} from '@vubon/shared-kernel/modules/common';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

// Vendor infrastructure
import { InfrastructureModule } from '../../infrastructure/infrastructure.module.js';

@Global()
@Module({
  imports: [
    // ─── Kernel globals ───
    PrismaModule,
    RedisModule,
    QueueModule,
    KernelEventBusModule,
    KernelGuardsModule,
    KernelInterceptorsModule,
    KernelFiltersModule,
    KernelPipesModule,
    KernelConfigModule,
    EventBridgeModule,

    // ─── Vendor infrastructure (all sub-modules) ───
    InfrastructureModule,
  ],
  exports: [
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
    EventBridgeModule,

    // Vendor infra
    InfrastructureModule,
  ],
})
export class CommonModule {}
