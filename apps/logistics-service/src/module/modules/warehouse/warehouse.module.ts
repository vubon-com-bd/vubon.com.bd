import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { WAREHOUSE_REPOSITORY } from '@domain/repositories/warehouse.repository.interface';

import { WarehouseMemoryRepository } from '@infrastructure/persistence/memory/repositories/warehouse.memory.repository';
import { WarehouseEventBridge } from '@infrastructure/messaging/warehouse-event-bridge.service';

import { WarehouseService, WAREHOUSE_EVENT_BRIDGE } from '@application/services/impl/warehouse.service';
import { WAREHOUSE_SERVICE } from '@application/services/interfaces/warehouse.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  providers: [
    WarehouseMemoryRepository,
    { provide: WAREHOUSE_REPOSITORY, useExisting: WarehouseMemoryRepository },
    WarehouseEventBridge,
    { provide: WAREHOUSE_EVENT_BRIDGE, useExisting: WarehouseEventBridge },
    WarehouseService,
    { provide: WAREHOUSE_SERVICE, useExisting: WarehouseService },
  ],
  exports: [WAREHOUSE_SERVICE, WarehouseService, WAREHOUSE_REPOSITORY],
})
export class WarehouseModule {}
