/**
 * OrderTrackingModule
 * @module order-service/modules/order-tracking
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TrackingController } from '../../interfaces/controllers/rest/tracking.controller.js';
import { OrderTrackingService } from '../../application/services/impl/order-tracking.service.js';
import { ORDER_TRACKING_SERVICE } from '../../application/services/interfaces/order-tracking.service.interface.js';
import { TRACKING_COMMAND_HANDLERS } from '../../application/commands/tracking/index.js';
import { TRACKING_QUERY_HANDLERS } from '../../application/queries/tracking/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [TrackingController],
  providers: [
    OrderTrackingService,
    { provide: ORDER_TRACKING_SERVICE, useExisting: OrderTrackingService },
    ...TRACKING_COMMAND_HANDLERS,
    ...TRACKING_QUERY_HANDLERS,
  ],
  exports: [OrderTrackingService, ORDER_TRACKING_SERVICE],
})
export class OrderTrackingModule {}
