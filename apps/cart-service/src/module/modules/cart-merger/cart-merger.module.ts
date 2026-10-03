import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RedisRepositoriesModule } from '../../infrastructure/persistence/redis/redis-repositories.module.js';
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/prisma-repositories.module.js';
import { CartMergerService } from '../../application/services/impl/cart-merger.service.js';
import { CART_MERGER_SERVICE } from '../../application/services/interfaces/cart-merger.service.interface.js';

@Module({
  imports: [CqrsModule, RedisRepositoriesModule, PrismaRepositoriesModule],
  controllers: [],
  providers: [
    CartMergerService,
    { provide: CART_MERGER_SERVICE, useExisting: CartMergerService },
  ],
  exports: [CartMergerService, CART_MERGER_SERVICE],
})
export class CartMergerModule {}
