import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { ROUTE_REPOSITORY } from '@domain/repositories/route.repository.interface';
import { ROUTE_EVENT_STORE } from '@domain/event-store/route.event-store';

import { RouteMemoryRepository } from '@infrastructure/persistence/memory/repositories/route.memory.repository';
import { RouteEventBridge } from '@infrastructure/messaging/route-event-bridge.service';

import { RouteService, ROUTE_EVENT_BRIDGE } from '@application/services/impl/route.service';
import { ROUTE_SERVICE } from '@application/services/interfaces/route.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  providers: [
    RouteMemoryRepository,
    { provide: ROUTE_REPOSITORY, useExisting: RouteMemoryRepository },
    { provide: ROUTE_EVENT_STORE, useExisting: RouteMemoryRepository },
    RouteEventBridge,
    { provide: ROUTE_EVENT_BRIDGE, useExisting: RouteEventBridge },
    RouteService,
    { provide: ROUTE_SERVICE, useExisting: RouteService },
  ],
  exports: [ROUTE_SERVICE, RouteService, ROUTE_REPOSITORY],
})
export class RouteModule {}
