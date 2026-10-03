/**
 * CommonModule — cross-cutting infrastructure for cart-service
 * @module cart-service/modules/common
 *
 * Composes shared-kernel cross-cutting modules EXCEPT KernelCqrsModule
 * (because AppModule already uses CqrsModule.forRoot()).
 *
 * Pattern mirrors product-service.
 */
import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@vubon/shared-kernel/prisma';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import {
  EmailModule as KernelEmailModule,
  SmsModule as KernelSmsModule,
  PushModule as KernelPushModule,
} from '@vubon/shared-kernel/infrastructure';
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
    KernelEmailModule,
    KernelSmsModule,
    KernelPushModule,

    // Kernel cross-cutting (NO KernelCqrsModule — app.module owns CqrsModule.forRoot)
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
    KernelEmailModule,
    KernelSmsModule,
    KernelPushModule,

    KernelEventBusModule,
    KernelGuardsModule,
    KernelInterceptorsModule,
    KernelFiltersModule,
    KernelPipesModule,
    KernelConfigModule,
  ],
})
export class CommonModule {}
