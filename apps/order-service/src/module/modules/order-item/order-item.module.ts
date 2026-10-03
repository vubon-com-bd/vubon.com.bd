/**
 * OrderItemModule
 * @module order-service/modules/order-item
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { OrderItemController } from '../../interfaces/controllers/rest/order-item.controller.js';
import { OrderItemService } from '../../application/services/impl/order-item.service.js';
import { ORDER_ITEM_SERVICE } from '../../application/services/interfaces/order-item.service.interface.js';
import { ORDER_ITEM_COMMAND_HANDLERS } from '../../application/commands/order-item/index.js';
import { ORDER_ITEM_QUERY_HANDLERS } from '../../application/queries/order-item/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [OrderItemController],
  providers: [
    OrderItemService,
    { provide: ORDER_ITEM_SERVICE, useExisting: OrderItemService },
    ...ORDER_ITEM_COMMAND_HANDLERS,
    ...ORDER_ITEM_QUERY_HANDLERS,
  ],
  exports: [OrderItemService, ORDER_ITEM_SERVICE],
})
export class OrderItemModule {}
