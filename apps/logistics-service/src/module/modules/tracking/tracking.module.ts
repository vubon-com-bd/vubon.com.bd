/**
 * TrackingModule — feature wiring for Tracking aggregate
 * @module logistics-service/modules/tracking
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TrackingController } from '../../interfaces/controllers/rest/tracking.controller.js';
import { TrackingService } from '../../application/services/impl/tracking.service.js';
import { TRACKING_SERVICE } from '../../application/services/interfaces/tracking.service.interface.js';
import { TRACKING_COMMAND_HANDLERS } from '../../application/commands/tracking/index.js';
import { TRACKING_QUERY_HANDLERS } from '../../application/queries/tracking/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [TrackingController],
  providers: [
    TrackingService,
    { provide: TRACKING_SERVICE, useExisting: TrackingService },
    ...TRACKING_COMMAND_HANDLERS,
    ...TRACKING_QUERY_HANDLERS,
  ],
  exports: [TrackingService, TRACKING_SERVICE],
})
export class TrackingModule {}
