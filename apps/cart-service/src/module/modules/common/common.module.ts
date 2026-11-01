/**
 * CartCommonModule — cross-cutting infrastructure for cart-service
 * @module cart-service/modules/common
 *
 * Aggregates:
 *  - Kernel persistence (Prisma, Redis, Queue, EventBus)
 *  - Service infrastructure (Prisma repos, Redis repos, Queues+Workers)
 *  - InMemory repositories (activated when DB_MODE=memory)
 *
 * Environment Variables:
 *  - DB_MODE=prisma  → Prisma + Redis (default, production)
 *  - DB_MODE=memory  → InMemory repos (dev/test, no DB needed)
 *  - DB_MODE=redis   → Redis only (hot-path only)
 */
import { Global, Module, Logger, DynamicModule } from '@nestjs/common';

// ─── Kernel persistence ─────────────────────
import { PrismaModule } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

// ─── Service Infrastructure Modules ─────────
import { InfrastructureModule } from '../../infrastructure/infrastructure.module.js';
import { CartPrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/prisma-repositories.module.js';
import { CartRedisRepositoriesModule } from '../../infrastructure/persistence/redis/redis-repositories.module.js';
import { MemoryRepositoriesModule } from '../../infrastructure/persistence/memory/memory-repositories.module.js';

const logger = new Logger('CartCommonModule');

// ─── Determine which repository module to use ─
function getRepositoryModules(): readonly any[] {
  // Priority: explicit env var > default
  const rawMode = process.env['DB_MODE'] ?? process.env['CART_DB_MODE'] ?? 'prisma';
  const dbMode = String(rawMode).toLowerCase().trim();

  logger.log(`🔧 DB_MODE resolved: "${dbMode}" (raw: "${rawMode}")`);

  switch (dbMode) {
    case 'memory':
      logger.warn('⚠️  Using InMemory repositories — data will NOT persist!');
      return [MemoryRepositoriesModule];

    case 'redis':
      logger.log('📦 Using Redis-only repositories (hot-path)');
      return [CartRedisRepositoriesModule];

    case 'prisma':
    default:
      logger.log('💾 Using Prisma + Redis repositories (production)');
      return [CartPrismaRepositoriesModule, CartRedisRepositoriesModule];
  }
}

@Global()
@Module({})
export class CartCommonModule {
  static forRoot(): DynamicModule {
    const repoModules = getRepositoryModules();

    return {
      module: CartCommonModule,
      global: true,
      imports: [
        // ─── Kernel cross-cutting ───────────
        PrismaModule,
        RedisModule,
        QueueModule,
        EventBusModule,
        EventBridgeModule,

        // ─── Service infrastructure (base) ───
        InfrastructureModule,

        // ─── Repository modules (DB_MODE based) ─
        ...(repoModules as any[]),
      ],
      exports: [
        PrismaModule,
        RedisModule,
        QueueModule,
        EventBusModule,
        EventBridgeModule,
        InfrastructureModule,
        ...(repoModules as any[]),
      ],
    };
  }
}
