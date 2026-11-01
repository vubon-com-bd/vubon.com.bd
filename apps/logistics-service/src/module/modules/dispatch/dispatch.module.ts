import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { DISPATCH_REPOSITORY } from '@domain/repositories/dispatch.repository.interface';
import { DISPATCH_EVENT_STORE } from '@domain/event-store/dispatch.event-store';

import { DispatchMemoryRepository } from '@infrastructure/persistence/memory/repositories/dispatch.memory.repository';
import { DispatchEventBridge } from '@infrastructure/messaging/dispatch-event-bridge.service';

import { DispatchService, DISPATCH_EVENT_BRIDGE } from '@application/services/impl/dispatch.service';
import { DISPATCH_SERVICE } from '@application/services/interfaces/dispatch.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  providers: [
    DispatchMemoryRepository,
    { provide: DISPATCH_REPOSITORY, useExisting: DispatchMemoryRepository },
    { provide: DISPATCH_EVENT_STORE, useExisting: DispatchMemoryRepository },
    DispatchEventBridge,
    { provide: DISPATCH_EVENT_BRIDGE, useExisting: DispatchEventBridge },
    DispatchService,
    { provide: DISPATCH_SERVICE, useExisting: DispatchService },
  ],
  exports: [DISPATCH_SERVICE, DispatchService, DISPATCH_REPOSITORY],
})
export class DispatchModule {}
