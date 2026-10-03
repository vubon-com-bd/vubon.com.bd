/**
 * CheckoutSessionModule
 * @module order-service/modules/checkout-session
 *
 * No controller (session accessed via CheckoutController).
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CheckoutSessionService } from '../../application/services/impl/checkout-session.service.js';
import { CHECKOUT_SESSION_SERVICE } from '../../application/services/interfaces/checkout-session.service.interface.js';

@Module({
  imports: [CqrsModule],
  providers: [
    CheckoutSessionService,
    { provide: CHECKOUT_SESSION_SERVICE, useExisting: CheckoutSessionService },
  ],
  exports: [CheckoutSessionService, CHECKOUT_SESSION_SERVICE],
})
export class CheckoutSessionModule {}
