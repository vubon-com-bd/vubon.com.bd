import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CartVoucherController } from '../../interfaces/controllers/rest/cart-voucher.controller';
import { CartVoucherService } from '../../application/services/impl/cart-voucher.service';
import { ApplyVoucherHandler } from '../../application/commands/voucher/apply-voucher.handler';
import { RemoveVoucherHandler } from '../../application/commands/voucher/remove-voucher.handler';

@Module({
  imports: [CqrsModule],
  controllers: [CartVoucherController],
  providers: [
    CartVoucherService,
    ApplyVoucherHandler,
    RemoveVoucherHandler,
  ],
  exports: [CartVoucherService],
})
export class CartVoucherModule {}
