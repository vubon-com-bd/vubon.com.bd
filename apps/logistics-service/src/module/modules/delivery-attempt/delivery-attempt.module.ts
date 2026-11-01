/**
 * DeliveryAttemptModule — child aggregate of Delivery
 * @module logistics-service/modules/delivery-attempt
 *
 * ⚠️ DeliveryAttempt is a CHILD of Delivery (handled via DeliveryModule).
 * ⚠️ Attempts are created/updated inside delivery command handlers.
 */
import { Module } from '@nestjs/common';
import { DeliveryModule } from '../delivery/index.js';

@Module({
  imports: [DeliveryModule],
  exports: [DeliveryModule],
})
export class DeliveryAttemptModule {}
