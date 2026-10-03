/**
 * OrderFulfillmentModule
 * @module order-service/modules/order-fulfillment
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FulfillmentController } from '../../interfaces/controllers/rest/fulfillment.controller.js';
import { OrderFulfillmentService } from '../../application/services/impl/order-fulfillment.service.js';
import { ORDER_FULFILLMENT_SERVICE } from '../../application/services/interfaces/order-fulfillment.service.interface.js';
import { FULFILLMENT_COMMAND_HANDLERS } from '../../application/commands/fulfillment/index.js';
import { FULFILLMENT_QUERY_HANDLERS } from '../../application/queries/fulfillment/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [FulfillmentController],
  providers: [
    OrderFulfillmentService,
    { provide: ORDER_FULFILLMENT_SERVICE, useExisting: OrderFulfillmentService },
    ...FULFILLMENT_COMMAND_HANDLERS,
    ...FULFILLMENT_QUERY_HANDLERS,
  ],
  exports: [OrderFulfillmentService, ORDER_FULFILLMENT_SERVICE],
})
export class OrderFulfillmentModule {}
