/**
 * PublicLogisticsModule — public (unauthenticated) tracking & shipment lookup
 * @module logistics-service/modules/public-logistics
 *
 * Imports TrackingModule + ShipmentModule for token resolution.
 * Public handlers (GetPublicTrackingHandler, GetPublicShipmentHandler) are
 * already registered via TRACKING_QUERY_HANDLERS and SHIPMENT_QUERY_HANDLERS —
 * so we do NOT register them again here (avoids QueryBus override warning).
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PublicLogisticsController } from '../../interfaces/controllers/rest/public-logistics.controller.js';
import { TrackingModule } from '../tracking/index.js';
import { ShipmentModule } from '../shipment/index.js';

@Module({
  imports: [CqrsModule, TrackingModule, ShipmentModule],
  controllers: [PublicLogisticsController],
})
export class PublicLogisticsModule {}
