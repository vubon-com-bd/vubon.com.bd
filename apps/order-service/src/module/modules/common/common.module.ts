/**
 * OrderCommonModule — cross-cutting infrastructure (DB_MODE-aware)
 * @module order-service/modules/common
 */
import { DynamicModule, Global, Module } from '@nestjs/common';

// ─── Kernel ────────────────────────────────
import { PrismaModule } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

// ─── Service infrastructure ─────────────────
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/prisma-repositories.module.js';
import { MemoryRepositoriesModule } from '../../infrastructure/persistence/memory/memory-repositories.module.js';
import { RedisRepositoriesModule } from '../../infrastructure/persistence/cache/redis-repositories.module.js';
import { QueuesWorkersModule } from '../../infrastructure/queues-workers.module.js';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module.js';

// ─── Config ─────────────────────────────────
import { DB_MODE, IS_MEMORY_MODE } from '../../infrastructure/config/db-mode.config.js';

@Global()
@Module({})
export class OrderCommonModule {
  static forRoot(): DynamicModule {
    // Persistence module — memory OR prisma
    const persistenceModule = IS_MEMORY_MODE
      ? MemoryRepositoriesModule
      : PrismaRepositoriesModule;

    // Prisma kernel module — ONLY in prisma mode
    const kernelPersistence = IS_MEMORY_MODE ? [] : [PrismaModule];

    const imports = [
      // Kernel cross-cutting
      ...kernelPersistence,
      RedisModule,
      QueueModule,
      EventBusModule,
      EventBridgeModule,

      // Selected persistence (memory OR prisma)
      persistenceModule,

      // Other infra (queues/workers/cache, no prisma)
      RedisRepositoriesModule,
      QueuesWorkersModule.forRoot(),

      // Full infra module — DB_MODE-aware
      InfrastructureModule.forRoot(),
    ];

    const exports = [
      ...kernelPersistence,
      RedisModule,
      QueueModule,
      EventBusModule,
      EventBridgeModule,
      persistenceModule,
      RedisRepositoriesModule,
      QueuesWorkersModule.forRoot(),
      InfrastructureModule.forRoot(),
    ];

    return {
      module: OrderCommonModule,
      imports,
      exports,
    };
  }
}

console.log(`[OrderCommonModule] DB_MODE=${DB_MODE}`);
