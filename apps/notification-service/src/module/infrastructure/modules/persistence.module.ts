/**
 * PersistenceModule — Prisma client + Redis only
 * @module notification-service/infrastructure/modules
 *
 * ⚠️ Repositories (Prisma OR Memory) are provided by InfrastructureModule.forRoot()
 * based on DB_MODE env var — NOT here।
 */
import { Module } from '@nestjs/common';

import { NotificationPrismaModule } from '@infrastructure/persistence/prisma/prisma.module.js';
import { RedisRepositoriesModule } from '@infrastructure/persistence/cache/redis-repositories.module.js';

@Module({
  imports: [NotificationPrismaModule, RedisRepositoriesModule],
  exports: [NotificationPrismaModule, RedisRepositoriesModule],
})
export class PersistenceModule {}
