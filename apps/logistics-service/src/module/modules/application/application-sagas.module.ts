/**
 * ApplicationSagasModule — all sagas + helper command handlers
 * @module logistics-service/modules/application
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { SAGA_COMMAND_HANDLERS } from '@application/sagas/commands/handlers.index';
import { ShipmentLifecycleSaga } from '@application/sagas/shipment-lifecycle.saga';
import { DeliveryAttemptSaga } from '@application/sagas/delivery-attempt.saga';
import { ReturnPickupSaga } from '@application/sagas/return-pickup.saga';
import { InsuranceClaimSaga } from '@application/sagas/insurance-claim.saga';

export const SAGAS = [
  ShipmentLifecycleSaga,
  DeliveryAttemptSaga,
  ReturnPickupSaga,
  InsuranceClaimSaga,
] as const;

@Module({
  imports: [CqrsModule, EventBusModule],
  providers: [
    ...(SAGA_COMMAND_HANDLERS as unknown as never[]),
    ...(SAGAS as unknown as never[]),
  ],
})
export class ApplicationSagasModule {}
