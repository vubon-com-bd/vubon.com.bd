/**
 * OrderFulfillmentModule — feature wiring
 * @module order-service/modules/order-fulfillment
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FulfillmentController } from '../../interfaces/controllers/rest/fulfillment.controller.js';
import { ORDER_FULFILLMENT_COMMAND_HANDLERS } from './commands/index.js';
import { ORDER_FULFILLMENT_QUERY_HANDLERS } from './queries/index.js';
import { ORDER_FULFILLMENT_SAGAS } from './sagas/index.js';
import { OrderFulfillmentService } from '../../application/services/impl/order-fulfillment.service.js';
import { ORDER_FULFILLMENT_SERVICE } from '../../application/services/interfaces/order-fulfillment.service.interface.js';

@Module({
  imports: [CqrsModule],
  controllers: [FulfillmentController],
  providers: [
    OrderFulfillmentService,
    { provide: ORDER_FULFILLMENT_SERVICE, useExisting: OrderFulfillmentService },
    ...(ORDER_FULFILLMENT_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(ORDER_FULFILLMENT_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(ORDER_FULFILLMENT_SAGAS as readonly unknown[] as never[]),
  ],
  exports: [OrderFulfillmentService, ORDER_FULFILLMENT_SERVICE],
})
export class OrderFulfillmentModule {}
