import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { INSURANCE_REPOSITORY } from '@domain/repositories/insurance.repository.interface';
import { INSURANCE_EVENT_STORE } from '@domain/event-store/insurance.event-store';

import { InsuranceMemoryRepository } from '@infrastructure/persistence/memory/repositories/insurance.memory.repository';
import { InsuranceEventBridge } from '@infrastructure/messaging/insurance-event-bridge.service';

import { InsuranceService, INSURANCE_EVENT_BRIDGE } from '@application/services/impl/insurance.service';
import { INSURANCE_SERVICE } from '@application/services/interfaces/insurance.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  providers: [
    InsuranceMemoryRepository,
    { provide: INSURANCE_REPOSITORY, useExisting: InsuranceMemoryRepository },
    { provide: INSURANCE_EVENT_STORE, useExisting: InsuranceMemoryRepository },
    InsuranceEventBridge,
    { provide: INSURANCE_EVENT_BRIDGE, useExisting: InsuranceEventBridge },
    InsuranceService,
    { provide: INSURANCE_SERVICE, useExisting: InsuranceService },
  ],
  exports: [INSURANCE_SERVICE, InsuranceService, INSURANCE_REPOSITORY],
})
export class InsuranceModule {}
