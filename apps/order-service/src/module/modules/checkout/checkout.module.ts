import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CheckoutController } from '../../interfaces/controllers/rest/checkout.controller';
import { CheckoutService } from '../../application/services/impl/checkout.service';
import { StartCheckoutHandler } from '../../application/commands/checkout/start-checkout.handler';
import { SelectAddressHandler } from '../../application/commands/checkout/select-address.handler';
import { SelectShippingHandler } from '../../application/commands/checkout/select-shipping.handler';
import { SelectPaymentHandler } from '../../application/commands/checkout/select-payment.handler';
import { ConfirmCheckoutHandler } from '../../application/commands/checkout/confirm-checkout.handler';
import { AbandonCheckoutHandler } from '../../application/commands/checkout/abandon-checkout.handler';
import { GetCheckoutHandler } from '../../application/queries/checkout/get-checkout.handler';
import { GetActiveCheckoutHandler } from '../../application/queries/checkout/get-active-checkout.handler';
import { CheckoutPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/checkout.prisma.repository';
import { CheckoutCacheRepository } from '../../infrastructure/persistence/cache/repositories/checkout.cache.repository';

@Module({
  imports: [CqrsModule],
  controllers: [CheckoutController],
  providers: [
    CheckoutPrismaRepository,
    CheckoutCacheRepository,
    CheckoutService,
    StartCheckoutHandler,
    SelectAddressHandler,
    SelectShippingHandler,
    SelectPaymentHandler,
    ConfirmCheckoutHandler,
    AbandonCheckoutHandler,
    GetCheckoutHandler,
    GetActiveCheckoutHandler,
  ],
  exports: [CheckoutService, CheckoutPrismaRepository, CheckoutCacheRepository],
})
export class CheckoutModule {}
