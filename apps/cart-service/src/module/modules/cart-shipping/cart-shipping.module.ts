import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RedisRepositoriesModule } from '../../infrastructure/persistence/redis/redis-repositories.module.js';
import { CartShippingController } from '../../interfaces/controllers/rest/cart-shipping.controller.js';
import { CartTotalsController } from '../../interfaces/controllers/rest/cart-totals.controller.js';
import { CartShippingService } from '../../application/services/impl/cart-shipping.service.js';
import { CART_SHIPPING_SERVICE } from '../../application/services/interfaces/cart-shipping.service.interface.js';
import { SHIPPING_COMMAND_HANDLERS } from '../../application/commands/shipping/index.js';

@Module({
  imports: [CqrsModule, RedisRepositoriesModule],
  controllers: [CartShippingController, CartTotalsController],
  providers: [
    CartShippingService,
    { provide: CART_SHIPPING_SERVICE, useExisting: CartShippingService },
    ...SHIPPING_COMMAND_HANDLERS,
  ],
  exports: [CartShippingService, CART_SHIPPING_SERVICE],
})
export class CartShippingModule {}
