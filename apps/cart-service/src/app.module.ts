import { Module } from '@nestjs/common';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import {
  CartModule,
  CartItemModule,
  CartCouponModule,
  CartVoucherModule,
  CartTaxModule,
  CartShippingModule,
  SavedForLaterModule,
  AbandonedCartModule,
  GuestCartModule,
  CartMergerModule,
} from './module/modules';

@Module({
  imports: [
    KernelCommonModule,
    CartModule,
    CartItemModule,
    CartCouponModule,
    CartVoucherModule,
    CartTaxModule,
    CartShippingModule,
    SavedForLaterModule,
    AbandonedCartModule,
    GuestCartModule,
    CartMergerModule,
  ],
})
export class AppModule {}
