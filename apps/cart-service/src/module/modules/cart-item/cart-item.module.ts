import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CartItemController } from '../../interfaces/controllers/rest/cart-item.controller';
import { CartItemService } from '../../application/services/impl/cart-item.service';
import { CartItemControllerMapper } from '../../interfaces/mappers/cart-item.controller.mapper';
import { AddItemHandler } from '../../application/commands/item/add-item.handler';
import { UpdateItemHandler } from '../../application/commands/item/update-item.handler';
import { UpdateQuantityHandler } from '../../application/commands/item/update-quantity.handler';
import { SelectItemHandler } from '../../application/commands/item/select-item.handler';
import { RemoveItemHandler } from '../../application/commands/item/remove-item.handler';
import { MoveToSavedHandler } from '../../application/commands/item/move-to-saved.handler';
import { ListItemsHandler } from '../../application/queries/item/list-items.handler';
import { GetItemHandler } from '../../application/queries/item/get-item.handler';

@Module({
  imports: [CqrsModule],
  controllers: [CartItemController],
  providers: [
    CartItemService,
    CartItemControllerMapper,
    AddItemHandler,
    UpdateItemHandler,
    UpdateQuantityHandler,
    SelectItemHandler,
    RemoveItemHandler,
    MoveToSavedHandler,
    ListItemsHandler,
    GetItemHandler,
  ],
  exports: [CartItemService],
})
export class CartItemModule {}
