/**
 * SplitPaymentModule — feature wiring for split payments
 * @module payment-service/modules/split-payment
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Controller ─────────────────────────────
import { SplitPaymentController } from '@interfaces/controllers/rest/split-payment.controller';

// ─── Handler arrays ─────────────────────────
import { SPLIT_PAYMENT_COMMAND_HANDLERS } from './commands/index.js';

// ─── Service + interface token ──────────────
import { SplitPaymentService } from '@application/services/impl/split-payment.service';
import { SPLIT_PAYMENT_SERVICE } from '@application/services/interfaces/split-payment.service.interface';

@Module({
  imports: [CqrsModule],
  controllers: [SplitPaymentController],
  providers: [
    SplitPaymentService,
    { provide: SPLIT_PAYMENT_SERVICE, useExisting: SplitPaymentService },
    ...(SPLIT_PAYMENT_COMMAND_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [SplitPaymentService, SPLIT_PAYMENT_SERVICE],
})
export class SplitPaymentModule {}
