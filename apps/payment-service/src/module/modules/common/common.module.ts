/**
 * PaymentCommonModule — cross-cutting infrastructure for payment-service
 * @module payment-service/modules/common
 *
 * ⚠️ PERSISTENCE_DRIVER switch:
 *   - 'memory'  → InMemoryRepositories (fast, no DB)
 *   - 'prisma'  → PrismaRepositories (default, requires DB)
 */
import { Global, Module } from '@nestjs/common';

// ─── Kernel cross-cutting ───────────────────
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

// ─── Payment infrastructure ─────────────────
import { InfrastructureModule } from '../../infrastructure/infrastructure.module.js';
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/prisma-repositories.module.js';
import { MemoryRepositoriesModule } from '../../infrastructure/persistence/memory/memory-repositories.module.js';
import { RedisRepositoriesModule } from '../../infrastructure/persistence/cache/redis-repositories.module.js';
import { QueuesWorkersModule } from '../../infrastructure/queues-workers.module.js';

// ─── DB Mode switch ──────────────────────────
const DB_MODE = (process.env['PERSISTENCE_DRIVER'] ?? 'prisma').toLowerCase();
const REPOSITORIES_MODULE =
  DB_MODE === 'memory' ? MemoryRepositoriesModule : PrismaRepositoriesModule;

@Global()
@Module({
  imports: [
    // Kernel cross-cutting
    PrismaModule,
    RedisModule,
    QueueModule,
    KernelEventBusModule,
    KernelGuardsModule,
    KernelInterceptorsModule,
    KernelFiltersModule,
    KernelPipesModule,
    KernelConfigModule,

    // Payment infrastructure (conditional repos)
    REPOSITORIES_MODULE,
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
    REPOSITORIES_MODULE,
    RedisRepositoriesModule,
    QueuesWorkersModule,
    InfrastructureModule,
  ],
})
export class PaymentCommonModule {}
