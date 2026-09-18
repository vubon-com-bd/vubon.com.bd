/**
 * Event Bus Module
 * @module shared-kernel/infrastructure/messaging/event-bus
 */
import { Global, Module } from '@nestjs/common';
import { EventBusService } from './event-bus.service';
import { QueueModule } from '../queue/queue.module';

@Global()
@Module({
  imports: [QueueModule],
  providers: [EventBusService],
  exports: [EventBusService],
})
export class EventBusModule {}
