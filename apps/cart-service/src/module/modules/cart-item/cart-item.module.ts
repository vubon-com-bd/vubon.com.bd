import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RedisRepositoriesModule } from '../../infrastructure/persistence/redis/redis-repositories.module.js';
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/prisma-repositories.module.js';
import { SavedForLaterModule } from '../saved-for-later/saved-for-later.module.js';

import { CartItemController } from '../../interfaces/controllers/rest/cart-item.controller.js';
import { CartItemService } from '../../application/services/impl/cart-item.service.js';
import { CART_ITEM_SERVICE } from '../../application/services/interfaces/cart-item.service.interface.js';
import { ITEM_COMMAND_HANDLERS } from '../../application/commands/item/index.js';
import { ITEM_QUERY_HANDLERS } from '../../application/queries/item/index.js';

@Module({
  imports: [
    CqrsModule,
    RedisRepositoriesModule,
    PrismaRepositoriesModule,
    SavedForLaterModule,
  ],
  controllers: [CartItemController],
  providers: [
    CartItemService,
    { provide: CART_ITEM_SERVICE, useExisting: CartItemService },
    ...ITEM_COMMAND_HANDLERS,
    ...ITEM_QUERY_HANDLERS,
  ],
  exports: [CartItemService, CART_ITEM_SERVICE],
})
export class CartItemModule {}
