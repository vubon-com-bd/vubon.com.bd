import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { COURIER_REPOSITORY } from '@domain/repositories/courier.repository.interface';
import { COURIER_EVENT_STORE } from '@domain/event-store/courier.event-store';

import { CourierMemoryRepository } from '@infrastructure/persistence/memory/repositories/courier.memory.repository';
import { CourierEventBridge } from '@infrastructure/messaging/courier-event-bridge.service';

import { CourierService, COURIER_EVENT_BRIDGE } from '@application/services/impl/courier.service';
import { COURIER_SERVICE } from '@application/services/interfaces/courier.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  providers: [
    CourierMemoryRepository,
    { provide: COURIER_REPOSITORY, useExisting: CourierMemoryRepository },
    { provide: COURIER_EVENT_STORE, useExisting: CourierMemoryRepository },

    CourierEventBridge,
    { provide: COURIER_EVENT_BRIDGE, useExisting: CourierEventBridge },

    CourierService,
    { provide: COURIER_SERVICE, useExisting: CourierService },

  ],
  exports: [COURIER_SERVICE, CourierService, COURIER_REPOSITORY],
})
export class CourierModule {}
