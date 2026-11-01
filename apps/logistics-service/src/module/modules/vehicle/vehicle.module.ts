import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { VEHICLE_REPOSITORY } from '@domain/repositories/vehicle.repository.interface';
import { VEHICLE_EVENT_STORE } from '@domain/event-store/vehicle.event-store';

import { VehicleMemoryRepository } from '@infrastructure/persistence/memory/repositories/vehicle.memory.repository';
import { VehicleEventBridge } from '@infrastructure/messaging/vehicle-event-bridge.service';

import { VehicleService, VEHICLE_EVENT_BRIDGE } from '@application/services/impl/vehicle.service';
import { VEHICLE_SERVICE } from '@application/services/interfaces/vehicle.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  providers: [
    VehicleMemoryRepository,
    { provide: VEHICLE_REPOSITORY, useExisting: VehicleMemoryRepository },
    { provide: VEHICLE_EVENT_STORE, useExisting: VehicleMemoryRepository },
    VehicleEventBridge,
    { provide: VEHICLE_EVENT_BRIDGE, useExisting: VehicleEventBridge },
    VehicleService,
    { provide: VEHICLE_SERVICE, useExisting: VehicleService },
  ],
  exports: [VEHICLE_SERVICE, VehicleService, VEHICLE_REPOSITORY],
})
export class VehicleModule {}
