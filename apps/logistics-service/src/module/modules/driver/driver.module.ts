import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { DRIVER_REPOSITORY } from '@domain/repositories/driver.repository.interface';
import { DRIVER_EVENT_STORE } from '@domain/event-store/driver.event-store';

import { DriverMemoryRepository } from '@infrastructure/persistence/memory/repositories/driver.memory.repository';
import { DriverEventBridge } from '@infrastructure/messaging/driver-event-bridge.service';

import { DriverService, DRIVER_EVENT_BRIDGE } from '@application/services/impl/driver.service';
import { DRIVER_SERVICE } from '@application/services/interfaces/driver.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  providers: [
    DriverMemoryRepository,
    { provide: DRIVER_REPOSITORY, useExisting: DriverMemoryRepository },
    { provide: DRIVER_EVENT_STORE, useExisting: DriverMemoryRepository },
    DriverEventBridge,
    { provide: DRIVER_EVENT_BRIDGE, useExisting: DriverEventBridge },
    DriverService,
    { provide: DRIVER_SERVICE, useExisting: DriverService },
  ],
  exports: [DRIVER_SERVICE, DriverService, DRIVER_REPOSITORY],
})
export class DriverModule {}
