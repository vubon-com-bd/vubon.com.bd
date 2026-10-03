import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RedisRepositoriesModule } from '../../infrastructure/persistence/redis/redis-repositories.module.js';
import { CartVoucherController } from '../../interfaces/controllers/rest/cart-voucher.controller.js';
import { CartVoucherService } from '../../application/services/impl/cart-voucher.service.js';
import { CART_VOUCHER_SERVICE } from '../../application/services/interfaces/cart-voucher.service.interface.js';
import { VOUCHER_COMMAND_HANDLERS } from '../../application/commands/voucher/index.js';

@Module({
  imports: [CqrsModule, RedisRepositoriesModule],
  controllers: [CartVoucherController],
  providers: [
    CartVoucherService,
    { provide: CART_VOUCHER_SERVICE, useExisting: CartVoucherService },
    ...VOUCHER_COMMAND_HANDLERS,
  ],
  exports: [CartVoucherService, CART_VOUCHER_SERVICE],
})
export class CartVoucherModule {}
