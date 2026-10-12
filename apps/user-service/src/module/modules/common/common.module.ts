/**
 * CommonModule — global providers for user-service
 *
 * NOTE: Kernel guards/interceptors/filters are compiled with shared-kernel's
 * own @nestjs/core, creating a peer-dep token mismatch with user-service's
 * @nestjs/core. Therefore:
 *   - We import only KernelConfigModule + KernelEventBusModule.
 *   - Guards/interceptors/filters are provided LOCALLY (see app.module.ts).
 *   - `Reflector` is provided HERE as @Global() so every module (UserModule,
 *     UserProfileModule, ...) can inject it when instantiating local guards
 *     referenced via `@UseGuards(...)` on controllers.
 */
import { Global, Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  KernelConfigModule,
  KernelEventBusModule,
} from '@vubon/shared-kernel/modules';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

@Global()
@Module({
  imports: [
    KernelConfigModule,
    KernelEventBusModule,
    EventBridgeModule,
  ],
  providers: [Reflector],
  exports: [
    Reflector,
    KernelConfigModule,
    KernelEventBusModule,
    EventBridgeModule,
  ],
})
export class CommonModule {}
