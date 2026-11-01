/**
 * InfrastructureModule — ROOT dynamic @Global aggregate
 * @module notification-service/infrastructure/modules
 *
 * Loads Prisma OR Memory repos based on DB_MODE env var:
 *  - DB_MODE=postgres (default) → PrismaRepositoriesModule
 *  - DB_MODE=memory             → MemoryRepositoriesModule
 *
 * Usage in app.module.ts:
 *   InfrastructureModule.forRoot()
 */
import { DynamicModule, Module } from '@nestjs/common';

// ─── Kernel infrastructure ─────────────────
import { PrismaModule } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

// ─── Notification sub-modules ──────────────
import { PersistenceModule } from './persistence.module.js';
import { QueuesWorkersModule } from './queues-workers.module.js';
import { ProvidersModule } from './providers.module.js';
import { ServicesModule } from './services.module.js';

// ─── Repos (dynamic) ───────────────────────
import { PrismaRepositoriesModule } from '@infrastructure/persistence/prisma/prisma-repositories.module.js';
import { MemoryRepositoriesModule } from '@infrastructure/persistence/memory/memory-repositories.module.js';

// ─── Template engine ───────────────────────
import { TemplateEngineModule } from '@infrastructure/template-engine/template.module.js';

@Module({})
export class InfrastructureModule {
  static forRoot(): DynamicModule {
    const driver = (process.env['PERSISTENCE_DRIVER'] ?? 'prisma').toLowerCase();
    const reposModule =
      driver === 'memory' ? MemoryRepositoriesModule : PrismaRepositoriesModule;

    return {
      module: InfrastructureModule,
      global: true,
      imports: [
        // Kernel
        PrismaModule,
        RedisModule,
        QueueModule,
        EventBridgeModule,

        // Notification infra
        PersistenceModule,
        reposModule,
        QueuesWorkersModule,
        ProvidersModule,
        ServicesModule,
        TemplateEngineModule,
      ],
      exports: [
        // Kernel
        PrismaModule,
        RedisModule,
        QueueModule,
        EventBridgeModule,

        // Notification infra
        PersistenceModule,
        reposModule,
        QueuesWorkersModule,
        ProvidersModule,
        ServicesModule,
        TemplateEngineModule,
      ],
    };
  }
}
