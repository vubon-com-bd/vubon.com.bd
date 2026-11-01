import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { PACKAGING_REPOSITORY } from '@domain/repositories/packaging.repository.interface';
import { PACKAGING_EVENT_STORE } from '@domain/event-store/packaging.event-store';

import { PackagingMemoryRepository } from '@infrastructure/persistence/memory/repositories/packaging.memory.repository';
import { PackagingEventBridge } from '@infrastructure/messaging/packaging-event-bridge.service';

import { PackagingService, PACKAGING_EVENT_BRIDGE } from '@application/services/impl/packaging.service';
import { PACKAGING_SERVICE } from '@application/services/interfaces/packaging.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  providers: [
    PackagingMemoryRepository,
    { provide: PACKAGING_REPOSITORY, useExisting: PackagingMemoryRepository },
    { provide: PACKAGING_EVENT_STORE, useExisting: PackagingMemoryRepository },
    PackagingEventBridge,
    { provide: PACKAGING_EVENT_BRIDGE, useExisting: PackagingEventBridge },
    PackagingService,
    { provide: PACKAGING_SERVICE, useExisting: PackagingService },
  ],
  exports: [PACKAGING_SERVICE, PackagingService, PACKAGING_REPOSITORY],
})
export class PackagingModule {}
