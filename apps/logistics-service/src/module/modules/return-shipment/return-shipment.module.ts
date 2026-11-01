import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { RETURN_SHIPMENT_REPOSITORY } from '@domain/repositories/return-shipment.repository.interface';
import { RETURN_SHIPMENT_EVENT_STORE } from '@domain/event-store/return-shipment.event-store';

import { ReturnShipmentMemoryRepository } from '@infrastructure/persistence/memory/repositories/return-shipment.memory.repository';
import { ReturnShipmentEventBridge } from '@infrastructure/messaging/return-shipment-event-bridge.service';

import { ReturnShipmentService, RETURN_SHIPMENT_EVENT_BRIDGE } from '@application/services/impl/return-shipment.service';
import { RETURN_SHIPMENT_SERVICE } from '@application/services/interfaces/return-shipment.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  providers: [
    ReturnShipmentMemoryRepository,
    { provide: RETURN_SHIPMENT_REPOSITORY, useExisting: ReturnShipmentMemoryRepository },
    { provide: RETURN_SHIPMENT_EVENT_STORE, useExisting: ReturnShipmentMemoryRepository },
    ReturnShipmentEventBridge,
    { provide: RETURN_SHIPMENT_EVENT_BRIDGE, useExisting: ReturnShipmentEventBridge },
    ReturnShipmentService,
    { provide: RETURN_SHIPMENT_SERVICE, useExisting: ReturnShipmentService },
  ],
  exports: [RETURN_SHIPMENT_SERVICE, ReturnShipmentService, RETURN_SHIPMENT_REPOSITORY],
})
export class ReturnShipmentModule {}
