/**
 * EventBridgeModule
 * @module shared-kernel/infrastructure/messaging/event-bridge
 */
import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBusModule } from '../event-bus/index.js';
import { DomainEventBridgeService } from './domain-event-bridge.service.js';

@Global()
@Module({
  imports: [CqrsModule, EventBusModule],
  providers: [DomainEventBridgeService],
  exports: [DomainEventBridgeService],
})
export class EventBridgeModule {}
