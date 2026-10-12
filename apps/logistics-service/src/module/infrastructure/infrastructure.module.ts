/**
 * InfrastructureModule — aggregates every infra sub-module
 * @module logistics-service/infrastructure
 */
import { Global, Module } from '@nestjs/common';
import { EmailModule, SmsModule, PushModule } from '@vubon/shared-kernel/infrastructure/external';

import { PrismaRepositoriesModule } from './persistence/prisma/prisma-repositories.module.js';
import { CacheRepositoriesModule } from './persistence/cache/cache-repositories.module.js';
import { CouriersModule } from './external/couriers/couriers.module.js';
import { MapsModule } from './external/maps/maps.module.js';
import { QueuesWorkersModule } from './queues-workers.module.js';

@Global()
@Module({
  imports: [
    EmailModule,
    SmsModule,
    PushModule,
    PrismaRepositoriesModule,
    CacheRepositoriesModule,
    CouriersModule,
    MapsModule,
    QueuesWorkersModule,
  ],
  exports: [
    EmailModule,
    SmsModule,
    PushModule,
    PrismaRepositoriesModule,
    CacheRepositoriesModule,
    CouriersModule,
    MapsModule,
    QueuesWorkersModule,
  ],
})
export class InfrastructureModule {}
