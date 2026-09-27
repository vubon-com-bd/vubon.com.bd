/**
 * CommonModule — global providers for user-service
 *
 * NOTE: KernelGuardsModule, KernelInterceptorsModule, KernelFiltersModule,
 * KernelPipesModule — এই ৪টা module import করা হয়নি কারণ এগুলোর
 * providers (RolesGuard, PermissionsGuard, LoggingInterceptor, ...)
 * shared-kernel এর নিজস্ব @nestjs/core instance দিয়ে compile হয়েছে,
 * যেটা user-service এর @nestjs/core থেকে আলাদা (pnpm peer-dep mismatch)।
 *
 * এর ফলে "Nest can't resolve dependencies of the RolesGuard (?)" error আসে।
 *
 * Solution: এই guards/interceptors/filters গুলো app.module.ts এ APP_GUARD,
 * APP_INTERCEPTOR, APP_FILTER token দিয়ে register করা হয়েছে — NestJS নিজেই
 * user-service এর @nestjs/core দিয়ে instantiate করবে।
 */
import { Global, Module } from '@nestjs/common';
import {
  KernelConfigModule,
  KernelEventBusModule,
} from '@vubon/shared-kernel/modules';

@Global()
@Module({
  imports: [
    KernelConfigModule,
    KernelEventBusModule,
  ],
  providers: [],
  exports: [
    KernelConfigModule,
    KernelEventBusModule,
  ],
})
export class CommonModule {}
