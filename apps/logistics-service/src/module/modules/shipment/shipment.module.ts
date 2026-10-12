/**
 * ShipmentModule — feature wiring for Shipment aggregate
 * @module logistics-service/modules/shipment
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ShipmentController } from '../../interfaces/controllers/rest/shipment.controller.js';
import { ShipmentService } from '../../application/services/impl/shipment.service.js';
import { SHIPMENT_SERVICE } from '../../application/services/interfaces/shipment.service.interface.js';
import { SHIPMENT_COMMAND_HANDLERS } from '../../application/commands/shipment/index.js';
import { SHIPMENT_QUERY_HANDLERS } from '../../application/queries/shipment/index.js';
import { OrderEventsHandler } from '../../infrastructure/handlers/order-events.handler.js';
import { PaymentEventsHandler } from '../../infrastructure/handlers/payment-events.handler.js';

@Module({
  imports: [CqrsModule],
  controllers: [ShipmentController],
  providers: [
    ShipmentService,
    { provide: SHIPMENT_SERVICE, useExisting: ShipmentService },
    ...SHIPMENT_COMMAND_HANDLERS,
    ...SHIPMENT_QUERY_HANDLERS,
    OrderEventsHandler,
    PaymentEventsHandler,
  ],
  exports: [ShipmentService, SHIPMENT_SERVICE],
})
export class ShipmentModule {}
