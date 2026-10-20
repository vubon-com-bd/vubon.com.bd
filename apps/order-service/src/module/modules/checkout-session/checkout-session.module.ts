/**
 * CheckoutSessionModule — feature wiring
 * @module order-service/modules/checkout-session
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CheckoutSessionService } from '../../application/services/impl/checkout-session.service.js';
import { CHECKOUT_SESSION_SERVICE } from '../../application/services/interfaces/checkout-session.service.interface.js';
import { CHECKOUT_SESSION_COMMAND_HANDLERS } from './commands/index.js';
import { CHECKOUT_SESSION_QUERY_HANDLERS } from './queries/index.js';

@Module({
  imports: [CqrsModule],
  providers: [
    CheckoutSessionService,
    { provide: CHECKOUT_SESSION_SERVICE, useExisting: CheckoutSessionService },
    ...(CHECKOUT_SESSION_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(CHECKOUT_SESSION_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [CheckoutSessionService, CHECKOUT_SESSION_SERVICE],
})
export class CheckoutSessionModule {}
