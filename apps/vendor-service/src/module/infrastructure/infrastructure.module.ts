/**
 * InfrastructureModule — aggregates all vendor infrastructure sub-modules
 * @module vendor-service/infrastructure
 */
import { Module } from '@nestjs/common';

import { PrismaRepositoriesModule } from './persistence/prisma/prisma-repositories.module.js';
import { RedisRepositoriesModule } from './persistence/cache/redis-repositories.module.js';
import { ExternalServicesModule } from './services/external-services.module.js';
import { QueuesWorkersModule } from './queues-workers.module.js';

@Module({
  imports: [
    PrismaRepositoriesModule,
    RedisRepositoriesModule,
    ExternalServicesModule,
    QueuesWorkersModule,
  ],
  exports: [
    PrismaRepositoriesModule,
    RedisRepositoriesModule,
    ExternalServicesModule,
    QueuesWorkersModule,
  ],
})
export class InfrastructureModule {}
