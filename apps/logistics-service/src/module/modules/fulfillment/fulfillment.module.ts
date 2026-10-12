/**
 * FulfillmentModule — feature wiring for Fulfillment aggregate
 * @module logistics-service/modules/fulfillment
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FulfillmentController } from '../../interfaces/controllers/rest/fulfillment.controller.js';
import { FulfillmentService } from '../../application/services/impl/fulfillment.service.js';
import { FULFILLMENT_SERVICE } from '../../application/services/interfaces/fulfillment.service.interface.js';
import { FULFILLMENT_COMMAND_HANDLERS } from '../../application/commands/fulfillment/index.js';
import { FULFILLMENT_QUERY_HANDLERS } from '../../application/queries/fulfillment/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [FulfillmentController],
  providers: [
    FulfillmentService,
    { provide: FULFILLMENT_SERVICE, useExisting: FulfillmentService },
    ...FULFILLMENT_COMMAND_HANDLERS,
    ...FULFILLMENT_QUERY_HANDLERS,
  ],
  exports: [FulfillmentService, FULFILLMENT_SERVICE],
})
export class FulfillmentModule {}
