import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CartTaxService } from '../../application/services/impl/cart-tax.service';

@Module({
  imports: [CqrsModule],
  providers: [CartTaxService],
  exports: [CartTaxService],
})
export class CartTaxModule {}
