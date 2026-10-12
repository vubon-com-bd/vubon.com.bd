/**
 * AuthCommonModule — cross-cutting infrastructure aggregation
 * @module identity-service/modules/common
 *
 * Aggregates:
 *  - Kernel persistence (Prisma, Redis, Queue)
 *  - Kernel cross-cutting (EventBus)
 *  - Service infrastructure (InfrastructureModule)
 *  - Interfaces shared (InterfacesModule: mappers, guards, interceptors)
 */
import { Global, Module } from '@nestjs/common';

// Kernel
import { PrismaModule } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';

// Service infrastructure
import { InfrastructureModule } from '../../infrastructure/infrastructure.module.js';

// Interfaces shared
import { InterfacesModule } from '../../interfaces/interfaces.module.js';

@Global()
@Module({
  imports: [
    PrismaModule,
    RedisModule,
    QueueModule,
    InfrastructureModule,
    InterfacesModule,
  ],
  exports: [
    PrismaModule,
    RedisModule,
    QueueModule,
    InfrastructureModule,
    InterfacesModule,
  ],
})
export class AuthCommonModule {}
