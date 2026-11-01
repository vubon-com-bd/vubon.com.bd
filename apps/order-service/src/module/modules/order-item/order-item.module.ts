/**
 * OrderItemModule — feature wiring
 * @module order-service/modules/order-item
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { OrderItemController } from '../../interfaces/controllers/rest/order-item.controller.js';
import { ORDER_ITEM_COMMAND_HANDLERS } from './commands/index.js';
import { ORDER_ITEM_QUERY_HANDLERS } from './queries/index.js';
import { OrderItemService } from '../../application/services/impl/order-item.service.js';
import { ORDER_ITEM_SERVICE } from '../../application/services/interfaces/order-item.service.interface.js';

@Module({
  imports: [CqrsModule],
  controllers: [OrderItemController],
  providers: [
    OrderItemService,
    { provide: ORDER_ITEM_SERVICE, useExisting: OrderItemService },
    ...(ORDER_ITEM_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(ORDER_ITEM_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [OrderItemService, ORDER_ITEM_SERVICE],
})
export class OrderItemModule {}
