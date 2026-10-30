/**
 * CartItemModule
 * @module cart-service/modules/cart-item
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { CartItemController } from '../../interfaces/controllers/rest/cart-item.controller.js';

// ─── External Event Handlers ───
import {
  ProductUpdatedHandler,
  ProductDeletedHandler,
  InventoryLowStockHandler,
  InventoryOutOfStockHandler,
  PricingChangedHandler,
} from '../../application/events/external/index.js';

import { CART_ITEM_COMMAND_HANDLERS } from './commands/index.js';
import { CART_ITEM_QUERY_HANDLERS } from './queries/index.js';

import { CartItemService } from '../../application/services/impl/cart-item.service.js';
import { UserClient } from '../../infrastructure/services/external/user.client.js';
import { CART_ITEM_SERVICE } from '../../application/services/interfaces/cart-item.service.interface.js';

import { CartOwnerGuard } from '../../interfaces/guards/cart-owner.guard.js';
import { CartLockInterceptor } from '../../interfaces/interceptors/cart-lock.interceptor.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [CartItemController],
  providers: [
    CartItemService,
    { provide: CART_ITEM_SERVICE, useExisting: CartItemService },

    ...(CART_ITEM_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(CART_ITEM_QUERY_HANDLERS as readonly unknown[] as never[]),

    CartOwnerGuard,
    CartLockInterceptor,

    // ─── External Event Handlers ───
    ProductUpdatedHandler,
    ProductDeletedHandler,
    InventoryLowStockHandler,
    InventoryOutOfStockHandler,
    PricingChangedHandler,
    
    // ─── External Clients ───
    UserClient,
  ],
  exports: [CartItemService, CART_ITEM_SERVICE],
})
export class CartItemModule {}
