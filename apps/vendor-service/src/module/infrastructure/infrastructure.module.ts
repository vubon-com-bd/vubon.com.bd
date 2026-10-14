/**
 * InfrastructureModule — aggregates every infra sub-module
 * @module vendor-service/infrastructure
 *
 * Conditional:
 *   DB_MODE=memory → MemoryRepositoriesModule (Termux ARM64 fallback)
 *   DB_MODE=prisma (default) → PrismaRepositoriesModule
 */
import { Global, Module, type DynamicModule } from '@nestjs/common';

// Persistence
import { VendorPrismaModule } from './persistence/prisma/prisma.module.js';
import { PrismaRepositoriesModule } from './persistence/prisma/prisma-repositories.module.js';
import { MemoryRepositoriesModule } from './persistence/memory/memory-repositories.module.js';
import { RedisRepositoriesModule } from './persistence/cache/redis-repositories.module.js';

// Queue + Workers
import { QueuesWorkersModule } from './queues-workers.module.js';

// Services
import { UserClient } from './services/external/user.client.js';
import { ProductClient } from './services/external/product.client.js';
import { OrderClient } from './services/external/order.client.js';
import { VendorNotificationService } from './services/external/vendor-notification.service.js';
import { VendorAnalyticsService } from './services/external/vendor-analytics.service.js';
import { IdempotencyService } from './services/internal/idempotency.service.js';
import { FeeCalculatorService } from './services/internal/fee-calculator.service.js';

const DB_MODE = process.env['DB_MODE'] ?? 'prisma';

const RepositoryModule: DynamicModule | typeof MemoryRepositoriesModule | typeof PrismaRepositoriesModule =
  DB_MODE === 'memory' ? MemoryRepositoriesModule : PrismaRepositoriesModule;

const EXTERNAL_CLIENTS = [UserClient, ProductClient, OrderClient];
const EXTERNAL_SERVICES = [VendorNotificationService, VendorAnalyticsService];
const INTERNAL_SERVICES = [IdempotencyService, FeeCalculatorService];

@Global()
@Module({
  imports: [
    VendorPrismaModule,
    RepositoryModule,
    RedisRepositoriesModule,
    QueuesWorkersModule,
  ],
  providers: [
    ...EXTERNAL_CLIENTS,
    ...EXTERNAL_SERVICES,
    ...INTERNAL_SERVICES,
  ],
  exports: [
    VendorPrismaModule,
    RepositoryModule,
    RedisRepositoriesModule,
    QueuesWorkersModule,
    ...EXTERNAL_CLIENTS,
    ...EXTERNAL_SERVICES,
    ...INTERNAL_SERVICES,
  ],
})
export class InfrastructureModule {}
