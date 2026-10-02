/**
 * CommonModule — composes shared-kernel infrastructure modules
 * @module product-service/modules/common
 *
 * Note: We use the kernel barrel (@vubon/shared-kernel/modules/common) but
 * do NOT add KernelCqrsModule to imports, avoiding conflict with
 * CqrsModule.forRoot() registered in AppModule.
 */
import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@vubon/shared-kernel/prisma';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.module';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue/queue.module';
import {
  KernelEventBusModule,
  KernelGuardsModule,
  KernelInterceptorsModule,
  KernelFiltersModule,
  KernelPipesModule,
  KernelConfigModule,
} from '@vubon/shared-kernel/modules/common';

@Global()
@Module({
  imports: [
    PrismaModule,
    RedisModule,
    QueueModule,
    KernelEventBusModule,
    KernelGuardsModule,
    KernelInterceptorsModule,
    KernelFiltersModule,
    KernelPipesModule,
    KernelConfigModule,
  ],
  exports: [
    PrismaModule,
    RedisModule,
    QueueModule,
    KernelEventBusModule,
    KernelGuardsModule,
    KernelInterceptorsModule,
    KernelFiltersModule,
    KernelPipesModule,
    KernelConfigModule,
  ],
})
export class CommonModule {}
