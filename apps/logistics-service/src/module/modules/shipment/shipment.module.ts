/**
 * ShipmentModule — Shipment aggregate core only
 * @module logistics-service/modules/shipment
 *
 * Contains: repository, event bridge, service.
 * Command/Query/Event handlers are in ApplicationCommandsModule,
 * ApplicationQueriesModule, ApplicationEventsModule.
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { SHIPMENT_REPOSITORY } from '@domain/repositories/shipment.repository.interface';
import { SHIPMENT_EVENT_STORE } from '@domain/event-store/shipment.event-store';

import { ShipmentMemoryRepository } from '@infrastructure/persistence/memory/repositories/shipment.memory.repository';
import { LogisticsDomainEventBridge } from '@infrastructure/messaging/domain-event-bridge.service';

import { ShipmentService, DOMAIN_EVENT_BRIDGE } from '@application/services/impl/shipment.service';
import { SHIPMENT_SERVICE } from '@application/services/interfaces/shipment.service.interface';

@Module({
  imports: [CqrsModule, EventBusModule],
  providers: [
    ShipmentMemoryRepository,
    { provide: SHIPMENT_REPOSITORY, useExisting: ShipmentMemoryRepository },
    { provide: SHIPMENT_EVENT_STORE, useExisting: ShipmentMemoryRepository },

    LogisticsDomainEventBridge,
    { provide: DOMAIN_EVENT_BRIDGE, useExisting: LogisticsDomainEventBridge },

    ShipmentService,
    { provide: SHIPMENT_SERVICE, useExisting: ShipmentService },
  ],
  exports: [
    SHIPMENT_SERVICE,
    ShipmentService,
    SHIPMENT_REPOSITORY,
    ShipmentMemoryRepository,
    DOMAIN_EVENT_BRIDGE,
    LogisticsDomainEventBridge,
  ],
})
export class ShipmentModule {}
