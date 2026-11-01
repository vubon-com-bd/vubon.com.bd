/**
 * ShipmentItemModule — child aggregate of Shipment
 * @module logistics-service/modules/shipment-item
 *
 * ⚠️ ShipmentItem is a CHILD of Shipment (handled via ShipmentModule repository).
 * ⚠️ No separate repository, service, or handlers needed.
 * ⚠️ This module re-exports ShipmentModule for consistency.
 */
import { Module } from '@nestjs/common';
import { ShipmentModule } from '../shipment/index.js';

@Module({
  imports: [ShipmentModule],
  exports: [ShipmentModule],
})
export class ShipmentItemModule {}
