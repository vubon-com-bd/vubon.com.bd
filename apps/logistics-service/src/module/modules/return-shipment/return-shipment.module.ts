/**
 * ReturnShipmentModule — feature wiring for ReturnShipment aggregate
 * @module logistics-service/modules/return-shipment
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ReturnShipmentController } from '../../interfaces/controllers/rest/return-shipment.controller.js';
import { ReturnShipmentService } from '../../application/services/impl/return-shipment.service.js';
import { RETURN_SHIPMENT_SERVICE } from '../../application/services/interfaces/return-shipment.service.interface.js';
import { RETURN_SHIPMENT_COMMAND_HANDLERS } from '../../application/commands/return-shipment/index.js';
import { RETURN_SHIPMENT_QUERY_HANDLERS } from '../../application/queries/return-shipment/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [ReturnShipmentController],
  providers: [
    ReturnShipmentService,
    { provide: RETURN_SHIPMENT_SERVICE, useExisting: ReturnShipmentService },
    ...RETURN_SHIPMENT_COMMAND_HANDLERS,
    ...RETURN_SHIPMENT_QUERY_HANDLERS,
  ],
  exports: [ReturnShipmentService, RETURN_SHIPMENT_SERVICE],
})
export class ReturnShipmentModule {}
