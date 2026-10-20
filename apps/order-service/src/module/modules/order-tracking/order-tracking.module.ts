/**
 * OrderTrackingModule — feature wiring
 * @module order-service/modules/order-tracking
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TrackingController } from '../../interfaces/controllers/rest/tracking.controller.js';
import { ORDER_TRACKING_COMMAND_HANDLERS } from './commands/index.js';
import { ORDER_TRACKING_QUERY_HANDLERS } from './queries/index.js';
import { OrderTrackingService } from '../../application/services/impl/order-tracking.service.js';
import { ORDER_TRACKING_SERVICE } from '../../application/services/interfaces/order-tracking.service.interface.js';

@Module({
  imports: [CqrsModule],
  controllers: [TrackingController],
  providers: [
    OrderTrackingService,
    { provide: ORDER_TRACKING_SERVICE, useExisting: OrderTrackingService },
    ...(ORDER_TRACKING_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(ORDER_TRACKING_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [OrderTrackingService, ORDER_TRACKING_SERVICE],
})
export class OrderTrackingModule {}
