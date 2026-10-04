/**
 * CartModule — cart aggregate feature wiring
 * @module cart-service/modules/cart
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RedisRepositoriesModule } from '../../infrastructure/persistence/redis/redis-repositories.module.js';
import { CartController } from '../../interfaces/controllers/rest/cart.controller.js';
import { CartService } from '../../application/services/impl/cart.service.js';
import { CART_SERVICE } from '../../application/services/interfaces/cart.service.interface.js';
import { CART_COMMAND_HANDLERS } from '../../application/commands/cart/index.js';
import { CART_QUERY_HANDLERS } from '../../application/queries/cart/index.js';
import { OwnCartGuard } from '../../interfaces/guards/own-cart.guard.js';
import { CartNotEmptyGuard } from '../../interfaces/guards/cart-not-empty.guard.js';
import { CartLockInterceptor } from '../../interfaces/interceptors/cart-lock.interceptor.js';
import { CartCacheInterceptor } from '../../interfaces/interceptors/cart-cache.interceptor.js';

@Module({
  imports: [CqrsModule, RedisRepositoriesModule],
  controllers: [CartController],
  providers: [
    CartService,
    { provide: CART_SERVICE, useExisting: CartService },
    ...CART_COMMAND_HANDLERS,
    ...CART_QUERY_HANDLERS,
    OwnCartGuard,
    CartNotEmptyGuard,
    CartLockInterceptor,
    CartCacheInterceptor,
  ],
  exports: [CartService, CART_SERVICE],
})
export class CartModule {}
