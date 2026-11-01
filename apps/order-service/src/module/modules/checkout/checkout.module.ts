/**
 * CheckoutModule — feature wiring
 * @module order-service/modules/checkout
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CheckoutSessionModule } from '../checkout-session/checkout-session.module.js';

import { CheckoutController } from '../../interfaces/controllers/rest/checkout.controller.js';
import { CHECKOUT_COMMAND_HANDLERS } from './commands/index.js';
import { CHECKOUT_QUERY_HANDLERS } from './queries/index.js';
import { CHECKOUT_SAGAS } from './sagas/index.js';
import { CheckoutService } from '../../application/services/impl/checkout.service.js';
import { CHECKOUT_SERVICE } from '../../application/services/interfaces/checkout.service.interface.js';
import { CheckoutTimeoutInterceptor } from '../../interfaces/interceptors/checkout-timeout.interceptor.js';

@Module({
  imports: [CqrsModule, CheckoutSessionModule],
  controllers: [CheckoutController],
  providers: [
    CheckoutService,
    { provide: CHECKOUT_SERVICE, useExisting: CheckoutService },
    ...(CHECKOUT_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(CHECKOUT_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(CHECKOUT_SAGAS as readonly unknown[] as never[]),
    CheckoutTimeoutInterceptor,
  ],
  exports: [CheckoutService, CHECKOUT_SERVICE],
})
export class CheckoutModule {}
