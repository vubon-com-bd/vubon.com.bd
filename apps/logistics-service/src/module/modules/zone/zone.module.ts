import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { ZONE_REPOSITORY } from '@domain/repositories/zone.repository.interface';
import { ZONE_EVENT_STORE } from '@domain/event-store/zone.event-store';

import { ZoneMemoryRepository } from '@infrastructure/persistence/memory/repositories/zone.memory.repository';
import { ZoneEventBridge } from '@infrastructure/messaging/zone-event-bridge.service';

import { ZoneService, ZONE_EVENT_BRIDGE } from '@application/services/impl/zone.service';
import { ZONE_SERVICE } from '@application/services/interfaces/zone.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  providers: [
    ZoneMemoryRepository,
    { provide: ZONE_REPOSITORY, useExisting: ZoneMemoryRepository },
    { provide: ZONE_EVENT_STORE, useExisting: ZoneMemoryRepository },
    ZoneEventBridge,
    { provide: ZONE_EVENT_BRIDGE, useExisting: ZoneEventBridge },
    ZoneService,
    { provide: ZONE_SERVICE, useExisting: ZoneService },
  ],
  exports: [ZONE_SERVICE, ZoneService, ZONE_REPOSITORY],
})
export class ZoneModule {}
