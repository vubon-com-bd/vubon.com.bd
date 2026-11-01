/**
 * EventBridgeModule
 * @module shared-kernel/infrastructure/messaging/event-bridge
 *
 * NOTE: This module does NOT import CqrsModule. The host service's AppModule
 * is expected to call CqrsModule.forRoot() which registers CommandBus /
 * QueryBus / EventBus globally. DomainEventBridgeService injects EventBus
 * (from @nestjs/cqrs) which resolves via that global context.
 *
 * Importing regular CqrsModule here would create a second, unconfigured
 * CQRS instance missing CQRS_MODULE_OPTIONS, breaking CommandBus DI.
 */
import { Global, Module } from '@nestjs/common';
import { EventBusModule } from '../event-bus/index.js';
import { DomainEventBridgeService } from './domain-event-bridge.service.js';

@Global()
@Module({
  imports: [EventBusModule],
  providers: [DomainEventBridgeService],
  exports: [DomainEventBridgeService],
})
export class EventBridgeModule {}
