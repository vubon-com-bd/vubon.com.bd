/**
 * PublicLogisticsModule — public (unauthenticated) tracking endpoints
 * @module logistics-service/modules/public-logistics
 *
 * ⚠️ Public tracking by trackingNumber — no JWT required
 * ⚠️ Uses GetShipmentByTrackingQuery (already registered via ApplicationQueriesModule)
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PublicTrackingController } from './controllers/public-tracking.controller.js';

@Module({
  imports: [CqrsModule],
  controllers: [PublicTrackingController],
})
export class PublicLogisticsModule {}
