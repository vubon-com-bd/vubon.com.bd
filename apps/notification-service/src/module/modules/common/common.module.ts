/**
 * CommonModule — cross-cutting infrastructure for notification-service
 * @module notification-service/modules/common
 */
import { Global, Module } from '@nestjs/common';

import {
  KernelEventBusModule,
  KernelGuardsModule,
  KernelInterceptorsModule,
  KernelFiltersModule,
  KernelPipesModule,
  KernelConfigModule,
} from '@vubon/shared-kernel/modules/common';

import { InfrastructureModule } from '../../infrastructure/infrastructure.module.js';

@Global()
@Module({
  imports: [
    KernelEventBusModule,
    KernelGuardsModule,
    KernelInterceptorsModule,
    KernelFiltersModule,
    KernelPipesModule,
    KernelConfigModule,
    InfrastructureModule,
  ],
  exports: [
    KernelEventBusModule,
    KernelGuardsModule,
    KernelInterceptorsModule,
    KernelFiltersModule,
    KernelPipesModule,
    KernelConfigModule,
    InfrastructureModule,
  ],
})
export class CommonModule {}
