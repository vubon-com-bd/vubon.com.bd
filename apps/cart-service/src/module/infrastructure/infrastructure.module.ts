/**
 * InfrastructureModule — aggregates every infra sub-module
 * @module cart-service/infrastructure
 */
import { Global, Module } from '@nestjs/common';

// ─── Kernel External ────────────────────────
import {
  EmailModule as KernelEmailModule,
  SmsModule as KernelSmsModule,
  PushModule as KernelPushModule,
} from '@vubon/shared-kernel/infrastructure/external';

// ─── Persistence ────────────────────────────
import { CartPrismaModule } from './persistence/prisma/prisma.module.js';
import { CartPrismaRepositoriesModule } from './persistence/prisma/prisma-repositories.module.js';
import { CartRedisModule } from './persistence/redis/redis.module.js';
import { CartRedisRepositoriesModule } from './persistence/redis/redis-repositories.module.js';
import { RedisRepositoriesModule } from './persistence/cache/redis-repositories.module.js';

// ─── External Integrations ──────────────────
import { CartEmailModule } from './external/email/email.module.js';
import { CartSmsModule } from './external/sms/sms.module.js';
import { CartPushModule } from './external/push/push.module.js';

// ─── Feature Modules ────────────────────────
import { QueuesWorkersModule } from './queues-workers.module.js';

// ─── Services ───────────────────────────────
import { CartNotificationService } from './services/external/cart-notification.service.js';
import { CartAnalyticsService } from './services/external/cart-analytics.service.js';
import { IdempotencyService } from './services/internal/idempotency.service.js';
import { GuestTokenService } from './services/internal/guest-token.service.js';

const INFRA_SERVICES = [
  CartNotificationService,
  CartAnalyticsService,
  IdempotencyService,
  GuestTokenService,
];

@Global()
@Module({
  imports: [
    // ─── Kernel external ───
    KernelEmailModule,
    KernelSmsModule,
    KernelPushModule,

    // ─── Persistence ───
    CartPrismaModule,
    CartPrismaRepositoriesModule,
    CartRedisModule,
    CartRedisRepositoriesModule,
    RedisRepositoriesModule,

    // ─── Notifications ───
    CartEmailModule,
    CartSmsModule,
    CartPushModule,

    // ─── Queues + Workers ───
    QueuesWorkersModule,
  ],
  providers: [...INFRA_SERVICES],
  exports: [
    KernelEmailModule,
    KernelSmsModule,
    KernelPushModule,
    CartPrismaModule,
    CartPrismaRepositoriesModule,
    CartRedisModule,
    CartRedisRepositoriesModule,
    RedisRepositoriesModule,
    CartEmailModule,
    CartSmsModule,
    CartPushModule,
    QueuesWorkersModule,
    ...INFRA_SERVICES,
  ],
})
export class InfrastructureModule {}
