import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { OrderItemController } from '../../interfaces/controllers/rest/order-item.controller';
import { OrderItemService } from '../../application/services/impl/order-item.service';
import { AddOrderItemHandler } from '../../application/commands/order-item/add-order-item.handler';
import { UpdateOrderItemHandler } from '../../application/commands/order-item/update-order-item.handler';
import { RemoveOrderItemHandler } from '../../application/commands/order-item/remove-order-item.handler';
import { AddMultipleItemsHandler } from '../../application/commands/order-item/add-multiple-items.handler';
import { ListOrderItemsHandler } from '../../application/queries/order-item/list-order-items.handler';
import { GetOrderItemHandler } from '../../application/queries/order-item/get-order-item.handler';
import { OrderItemPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/order-item.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [OrderItemController],
  providers: [
    OrderItemPrismaRepository,
    OrderItemService,
    AddOrderItemHandler,
    UpdateOrderItemHandler,
    RemoveOrderItemHandler,
    AddMultipleItemsHandler,
    ListOrderItemsHandler,
    GetOrderItemHandler,
  ],
  exports: [OrderItemService, OrderItemPrismaRepository],
})
export class OrderItemModule {}
