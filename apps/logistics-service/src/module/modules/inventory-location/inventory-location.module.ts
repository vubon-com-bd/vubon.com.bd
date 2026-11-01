import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { INVENTORY_LOCATION_REPOSITORY } from '@domain/repositories/inventory-location.repository.interface';
import { INVENTORY_LOCATION_EVENT_STORE } from '@domain/event-store/inventory-location.event-store';

import { InventoryLocationMemoryRepository } from '@infrastructure/persistence/memory/repositories/inventory-location.memory.repository';
import { InventoryLocationEventBridge } from '@infrastructure/messaging/inventory-location-event-bridge.service';

import { InventoryLocationService, INVENTORY_LOCATION_EVENT_BRIDGE } from '@application/services/impl/inventory-location.service';
import { INVENTORY_LOCATION_SERVICE } from '@application/services/interfaces/inventory-location.service.interface';
import { INVENTORY_LOCATION_COMMAND_HANDLERS } from '@application/commands/inventory-location/handlers.index';
import { INVENTORY_LOCATION_QUERY_HANDLERS } from '@application/queries/inventory-location/handlers.index';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  providers: [
    InventoryLocationMemoryRepository,
    { provide: INVENTORY_LOCATION_REPOSITORY, useExisting: InventoryLocationMemoryRepository },
    { provide: INVENTORY_LOCATION_EVENT_STORE, useExisting: InventoryLocationMemoryRepository },
    InventoryLocationEventBridge,
    { provide: INVENTORY_LOCATION_EVENT_BRIDGE, useExisting: InventoryLocationEventBridge },
    InventoryLocationService,
    { provide: INVENTORY_LOCATION_SERVICE, useExisting: InventoryLocationService },
    ...(INVENTORY_LOCATION_COMMAND_HANDLERS as unknown as never[]),
    ...(INVENTORY_LOCATION_QUERY_HANDLERS as unknown as never[]),
  ],
  exports: [INVENTORY_LOCATION_SERVICE, InventoryLocationService, INVENTORY_LOCATION_REPOSITORY],
})
export class InventoryLocationModule {}
