/**
 * PaymentMethodModule — feature wiring for saved payment methods
 * @module payment-service/modules/payment-method
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Controller ─────────────────────────────
import { PaymentMethodController } from '@interfaces/controllers/rest/payment-method.controller';

// ─── Handler arrays ─────────────────────────
import { PAYMENT_METHOD_COMMAND_HANDLERS } from './commands/index.js';
import { PAYMENT_METHOD_QUERY_HANDLERS } from './queries/index.js';

// ─── Service + interface token ──────────────
import { PaymentMethodService } from '@application/services/impl/payment-method.service';
import { PAYMENT_METHOD_SERVICE } from '@application/services/interfaces/payment-method.service.interface';

@Module({
  imports: [CqrsModule],
  controllers: [PaymentMethodController],
  providers: [
    PaymentMethodService,
    { provide: PAYMENT_METHOD_SERVICE, useExisting: PaymentMethodService },
    ...(PAYMENT_METHOD_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(PAYMENT_METHOD_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [PaymentMethodService, PAYMENT_METHOD_SERVICE],
})
export class PaymentMethodModule {}
