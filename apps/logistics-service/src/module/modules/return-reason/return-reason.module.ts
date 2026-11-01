import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { RETURN_REASON_REPOSITORY } from '@domain/repositories/return-reason.repository.interface';

import { ReturnReasonMemoryRepository } from '@infrastructure/persistence/memory/repositories/return-reason.memory.repository';
import { ReturnReasonEventBridge } from '@infrastructure/messaging/return-reason-event-bridge.service';

import { ReturnReasonService, RETURN_REASON_EVENT_BRIDGE } from '@application/services/impl/return-reason.service';
import { RETURN_REASON_SERVICE } from '@application/services/interfaces/return-reason.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  providers: [
    ReturnReasonMemoryRepository,
    { provide: RETURN_REASON_REPOSITORY, useExisting: ReturnReasonMemoryRepository },
    ReturnReasonEventBridge,
    { provide: RETURN_REASON_EVENT_BRIDGE, useExisting: ReturnReasonEventBridge },
    ReturnReasonService,
    { provide: RETURN_REASON_SERVICE, useExisting: ReturnReasonService },
  ],
  exports: [RETURN_REASON_SERVICE, ReturnReasonService, RETURN_REASON_REPOSITORY],
})
export class ReturnReasonModule {}
