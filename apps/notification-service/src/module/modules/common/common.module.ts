/**
 * NotificationCommonModule — aggregates kernel + notification infra
 * @module notification-service/modules/common
 *
 * @Global() — one import at app.module.ts makes everything available.
 *
 * Infrastructure (Prisma OR Memory) is resolved by
 * InfrastructureModule.forRoot() based on DB_MODE env var।
 */
import { Global, Module } from '@nestjs/common';

// ─── Kernel common ─────────────────────────
import { KernelCommonModule } from '@vubon/shared-kernel/modules/common';

// ─── Notification infra ────────────────────
import { RedisRepositoriesModule } from '@infrastructure/persistence/cache/redis-repositories.module.js';
import { InfrastructureModule } from '@infrastructure/modules/infrastructure.module.js';
import { I18nService } from '../../domain/services/i18n.service.js';

@Global()
@Module({
  imports: [
    KernelCommonModule,
    RedisRepositoriesModule,
    InfrastructureModule.forRoot(),
  ],
  exports: [
    KernelCommonModule,
    RedisRepositoriesModule,
    InfrastructureModule,
  ],
})
export class NotificationCommonModule {}
