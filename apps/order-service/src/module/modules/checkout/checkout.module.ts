/**
 * CheckoutModule
 * @module order-service/modules/checkout
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CheckoutController } from '../../interfaces/controllers/rest/checkout.controller.js';
import { CheckoutService } from '../../application/services/impl/checkout.service.js';
import { CHECKOUT_SERVICE } from '../../application/services/interfaces/checkout.service.interface.js';
import { CheckoutSessionService } from '../../application/services/impl/checkout-session.service.js';
import { CHECKOUT_SESSION_SERVICE } from '../../application/services/interfaces/checkout-session.service.interface.js';
import { CHECKOUT_COMMAND_HANDLERS } from '../../application/commands/checkout/index.js';
import { CHECKOUT_QUERY_HANDLERS } from '../../application/queries/checkout/index.js';
import { OrderCheckoutSaga } from '../../application/sagas/order-checkout.saga.js';
import { CheckoutTimeoutInterceptor } from '../../interfaces/interceptors/checkout-timeout.interceptor.js';

@Module({
  imports: [CqrsModule],
  controllers: [CheckoutController],
  providers: [
    CheckoutService,
    { provide: CHECKOUT_SERVICE, useExisting: CheckoutService },
    CheckoutSessionService,
    { provide: CHECKOUT_SESSION_SERVICE, useExisting: CheckoutSessionService },

    ...CHECKOUT_COMMAND_HANDLERS,
    ...CHECKOUT_QUERY_HANDLERS,

    OrderCheckoutSaga,
    CheckoutTimeoutInterceptor,
  ],
  exports: [CheckoutService, CHECKOUT_SERVICE, CheckoutSessionService, CHECKOUT_SESSION_SERVICE],
})
export class CheckoutModule {}
