/**
 * VendorCommonModule — cross-cutting infrastructure for vendor-service
 * @module vendor-service/modules/common
 *
 * Aggregates:
 *  - Kernel cross-cutting (Prisma, Redis, Queue, EventBus, Guards, Interceptors, Filters, Pipes, Config)
 *  - Service infrastructure — DB_MODE switch:
 *      prisma  → PrismaRepositoriesModule (production)
 *      memory  → MemoryRepositoriesModule (dev/Termux ARM64)
 */
import { Global, Module, Logger, DynamicModule } from '@nestjs/common';

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
import { MemoryRepositoriesModule } from '../../infrastructure/persistence/memory/memory-repositories.module.js';
import { RedisRepositoriesModule } from '../../infrastructure/persistence/cache/redis-repositories.module.js';
import { QueuesWorkersModule } from '../../infrastructure/queues-workers.module.js';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module.js';

const logger = new Logger('VendorCommonModule');

function getRepositoryModule(): any {
  const rawMode = process.env['DB_MODE'] ?? process.env['VENDOR_DB_MODE'] ?? 'prisma';
  const dbMode = String(rawMode).toLowerCase().trim();
  logger.log(`🔧 DB_MODE resolved: "${dbMode}" (raw: "${rawMode}")`);

  switch (dbMode) {
    case 'memory':
      logger.warn('⚠️  Using InMemory repositories — data will NOT persist!');
      return MemoryRepositoriesModule;
    case 'prisma':
    default:
      logger.log('💾 Using Prisma repositories (production)');
      return PrismaRepositoriesModule;
  }
}

@Global()
@Module({})
export class VendorCommonModule {
  static forRoot(): DynamicModule {
    const repoModule = getRepositoryModule();

    return {
      module: VendorCommonModule,
      imports: [
        // ─── Kernel cross-cutting ───────────
        PrismaModule,
        RedisModule,
        QueueModule,
        KernelEventBusModule,
        KernelGuardsModule,
        KernelInterceptorsModule,
        KernelFiltersModule,
        KernelPipesModule,
        KernelConfigModule,

        // ─── Service infrastructure ─────────
        repoModule,
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
        repoModule,
        RedisRepositoriesModule,
        QueuesWorkersModule,
        InfrastructureModule,
      ],
    };
  }
}
