import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { TRACKING_REPOSITORY } from '@domain/repositories/tracking.repository.interface';
import { TRACKING_EVENT_STORE } from '@domain/event-store/tracking.event-store';

import { TrackingMemoryRepository } from '@infrastructure/persistence/memory/repositories/tracking.memory.repository';
import { TrackingEventBridge } from '@infrastructure/messaging/tracking-event-bridge.service';

import { TrackingService, TRACKING_EVENT_BRIDGE } from '@application/services/impl/tracking.service';
import { TRACKING_SERVICE } from '@application/services/interfaces/tracking.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  providers: [
    TrackingMemoryRepository,
    { provide: TRACKING_REPOSITORY, useExisting: TrackingMemoryRepository },
    { provide: TRACKING_EVENT_STORE, useExisting: TrackingMemoryRepository },

    TrackingEventBridge,
    { provide: TRACKING_EVENT_BRIDGE, useExisting: TrackingEventBridge },

    TrackingService,
    { provide: TRACKING_SERVICE, useExisting: TrackingService },

  ],
  exports: [TRACKING_SERVICE, TrackingService, TRACKING_REPOSITORY],
})
export class TrackingModule {}
