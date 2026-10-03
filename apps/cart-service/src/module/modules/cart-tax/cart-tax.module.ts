import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RedisRepositoriesModule } from '../../infrastructure/persistence/redis/redis-repositories.module.js';
import { CartTaxService } from '../../application/services/impl/cart-tax.service.js';
import { CART_TAX_SERVICE } from '../../application/services/interfaces/cart-tax.service.interface.js';
import { TOTALS_QUERY_HANDLERS } from '../../application/queries/totals/index.js';

@Module({
  imports: [CqrsModule, RedisRepositoriesModule],
  controllers: [],
  providers: [
    CartTaxService,
    { provide: CART_TAX_SERVICE, useExisting: CartTaxService },
    ...TOTALS_QUERY_HANDLERS,
  ],
  exports: [CartTaxService, CART_TAX_SERVICE],
})
export class CartTaxModule {}
