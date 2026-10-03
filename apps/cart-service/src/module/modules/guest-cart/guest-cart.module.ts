import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RedisRepositoriesModule } from '../../infrastructure/persistence/redis/redis-repositories.module.js';
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/prisma-repositories.module.js';
import { GuestCartController } from '../../interfaces/controllers/rest/guest-cart.controller.js';
import { GuestCartService } from '../../application/services/impl/guest-cart.service.js';
import { CartMergerService } from '../../application/services/impl/cart-merger.service.js';
import { GUEST_CART_SERVICE } from '../../application/services/interfaces/guest-cart.service.interface.js';
import { CART_MERGER_SERVICE } from '../../application/services/interfaces/cart-merger.service.interface.js';
import { GUEST_COMMAND_HANDLERS } from '../../application/commands/guest/index.js';
import { GuestCartGuard } from '../../interfaces/guards/guest-cart.guard.js';
import { GuestTokenMiddleware } from '../../interfaces/middlewares/guest-token.middleware.js';

@Module({
  imports: [CqrsModule, RedisRepositoriesModule, PrismaRepositoriesModule],
  controllers: [GuestCartController],
  providers: [
    GuestCartService,
    CartMergerService,
    { provide: GUEST_CART_SERVICE, useExisting: GuestCartService },
    { provide: CART_MERGER_SERVICE, useExisting: CartMergerService },
    ...GUEST_COMMAND_HANDLERS,
    GuestCartGuard,
  ],
  exports: [GuestCartService, CartMergerService, GUEST_CART_SERVICE, CART_MERGER_SERVICE],
})
export class GuestCartModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(GuestTokenMiddleware).forRoutes('guest-cart', 'cart');
  }
}
