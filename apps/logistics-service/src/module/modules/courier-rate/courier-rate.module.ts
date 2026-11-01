/**
 * CourierRateModule — standalone child aggregate of Courier
 * @module logistics-service/modules/courier-rate
 *
 * ⚠️ CourierRate is a CHILD of Courier (handled via CourierModule).
 * ⚠️ No separate repository/service — rates via Courier aggregates.
 */
import { Module } from '@nestjs/common';
import { CourierModule } from '../courier/index.js';

@Module({
  imports: [CourierModule],
  exports: [CourierModule],
})
export class CourierRateModule {}
