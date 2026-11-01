import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { FULFILLMENT_REPOSITORY } from '@domain/repositories/fulfillment.repository.interface';

import { FulfillmentMemoryRepository } from '@infrastructure/persistence/memory/repositories/fulfillment.memory.repository';
import { FulfillmentEventBridge } from '@infrastructure/messaging/fulfillment-event-bridge.service';

import { FulfillmentService, FULFILLMENT_EVENT_BRIDGE } from '@application/services/impl/fulfillment.service';
import { FULFILLMENT_SERVICE } from '@application/services/interfaces/fulfillment.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  providers: [
    FulfillmentMemoryRepository,
    { provide: FULFILLMENT_REPOSITORY, useExisting: FulfillmentMemoryRepository },
    FulfillmentEventBridge,
    { provide: FULFILLMENT_EVENT_BRIDGE, useExisting: FulfillmentEventBridge },
    FulfillmentService,
    { provide: FULFILLMENT_SERVICE, useExisting: FulfillmentService },
  ],
  exports: [FULFILLMENT_SERVICE, FulfillmentService, FULFILLMENT_REPOSITORY],
})
export class FulfillmentModule {}
