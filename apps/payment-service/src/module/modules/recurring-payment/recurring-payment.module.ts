/**
 * RecurringPaymentModule — feature wiring for recurring payments
 * @module payment-service/modules/recurring-payment
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Controller ─────────────────────────────
import { RecurringPaymentController } from '@interfaces/controllers/rest/recurring-payment.controller';

// ─── Handler arrays ─────────────────────────
import { RECURRING_PAYMENT_COMMAND_HANDLERS } from './commands/index.js';
import { RECURRING_PAYMENT_QUERY_HANDLERS } from './queries/index.js';

// ─── Service + interface token ──────────────
import { RecurringPaymentService } from '@application/services/impl/recurring-payment.service';
import { RECURRING_PAYMENT_SERVICE } from '@application/services/interfaces/recurring-payment.service.interface';

@Module({
  imports: [CqrsModule],
  controllers: [RecurringPaymentController],
  providers: [
    RecurringPaymentService,
    { provide: RECURRING_PAYMENT_SERVICE, useExisting: RecurringPaymentService },
    ...(RECURRING_PAYMENT_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(RECURRING_PAYMENT_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [RecurringPaymentService, RECURRING_PAYMENT_SERVICE],
})
export class RecurringPaymentModule {}
