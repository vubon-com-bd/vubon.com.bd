/**
 * CartShippingModule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { CartShippingController } from '../../interfaces/controllers/rest/cart-shipping.controller.js';

import { CART_SHIPPING_COMMAND_HANDLERS } from './commands/index.js';
import { CART_SHIPPING_QUERY_HANDLERS } from './queries/index.js';

import { CartShippingService } from '../../application/services/impl/cart-shipping.service.js';
import { CART_SHIPPING_SERVICE } from '../../application/services/interfaces/cart-shipping.service.interface.js';

import { CartOwnerGuard } from '../../interfaces/guards/cart-owner.guard.js';
import { CartLockInterceptor } from '../../interfaces/interceptors/cart-lock.interceptor.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [CartShippingController],
  providers: [
    CartShippingService,
    { provide: CART_SHIPPING_SERVICE, useExisting: CartShippingService },
    ...(CART_SHIPPING_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(CART_SHIPPING_QUERY_HANDLERS as readonly unknown[] as never[]),
    CartOwnerGuard,
    CartLockInterceptor,
  ],
  exports: [CartShippingService, CART_SHIPPING_SERVICE],
})
export class CartShippingModule {}
