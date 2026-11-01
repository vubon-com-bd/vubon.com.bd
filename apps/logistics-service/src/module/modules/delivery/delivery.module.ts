import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { DELIVERY_REPOSITORY } from '@domain/repositories/delivery.repository.interface';
import { DELIVERY_EVENT_STORE } from '@domain/event-store/delivery.event-store';

import { DeliveryMemoryRepository } from '@infrastructure/persistence/memory/repositories/delivery.memory.repository';
import { DeliveryEventBridge } from '@infrastructure/messaging/delivery-event-bridge.service';

import { DeliveryService, DELIVERY_EVENT_BRIDGE } from '@application/services/impl/delivery.service';
import { DELIVERY_SERVICE } from '@application/services/interfaces/delivery.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  providers: [
    DeliveryMemoryRepository,
    { provide: DELIVERY_REPOSITORY, useExisting: DeliveryMemoryRepository },
    { provide: DELIVERY_EVENT_STORE, useExisting: DeliveryMemoryRepository },

    DeliveryEventBridge,
    { provide: DELIVERY_EVENT_BRIDGE, useExisting: DeliveryEventBridge },

    DeliveryService,
    { provide: DELIVERY_SERVICE, useExisting: DeliveryService },

  ],
  exports: [DELIVERY_SERVICE, DeliveryService, DELIVERY_REPOSITORY],
})
export class DeliveryModule {}
