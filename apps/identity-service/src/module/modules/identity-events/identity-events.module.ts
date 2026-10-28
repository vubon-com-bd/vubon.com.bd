/**
 * IdentityEventsModule
 * @module identity-service/modules/identity-events
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { IdentityOrderCreatedHandler } from '../../application/events/external/order-created.handler.js';
import { IdentityOrderCancelledHandler } from '../../application/events/external/order-cancelled.handler.js';

@Module({
  imports: [CqrsModule, EventBusModule],
  providers: [
    IdentityOrderCreatedHandler,
    IdentityOrderCancelledHandler,
  ],
  exports: [
    IdentityOrderCreatedHandler,
    IdentityOrderCancelledHandler,
  ],
})
export class IdentityEventsModule {}
