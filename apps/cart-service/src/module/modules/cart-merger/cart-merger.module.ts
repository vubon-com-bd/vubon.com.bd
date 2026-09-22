import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CartMergerService } from '../../application/services/impl/cart-merger.service';

@Module({
  imports: [CqrsModule],
  providers: [CartMergerService],
  exports: [CartMergerService],
})
export class CartMergerModule {}
