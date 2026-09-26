import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CartShippingController } from '../../interfaces/controllers/rest/cart-shipping.controller';
import { CartShippingService } from '../../application/services/impl/cart-shipping.service';
import { SetShippingMethodHandler } from '../../application/commands/shipping/set-shipping-method.handler';
import { CalculateShippingHandler } from '../../application/commands/shipping/calculate-shipping.handler';

@Module({
  imports: [CqrsModule],
  controllers: [CartShippingController],
  providers: [
    CartShippingService,
    SetShippingMethodHandler,
    CalculateShippingHandler,
  ],
  exports: [CartShippingService],
})
export class CartShippingModule {}
