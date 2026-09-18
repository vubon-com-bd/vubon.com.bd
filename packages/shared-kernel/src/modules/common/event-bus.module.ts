/**
 * Kernel Event Bus Module (re-export)
 * @module shared-kernel/modules/common
 */
import { Global, Module } from '@nestjs/common';
import { EventBusModule } from '../../infrastructure/messaging/event-bus';

@Global()
@Module({
  imports: [EventBusModule],
  exports: [EventBusModule],
})
export class KernelEventBusModule {}
