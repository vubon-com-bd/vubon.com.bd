/**
 * TrackingEventModule — child aggregate of Tracking
 * @module logistics-service/modules/tracking-event
 *
 * ⚠️ TrackingEvent is a CHILD of Tracking.
 * ⚠️ Events added via tracking/add-tracking-event handlers.
 */
import { Module } from '@nestjs/common';
import { TrackingModule } from '../tracking/index.js';

@Module({
  imports: [TrackingModule],
  exports: [TrackingModule],
})
export class TrackingEventModule {}
