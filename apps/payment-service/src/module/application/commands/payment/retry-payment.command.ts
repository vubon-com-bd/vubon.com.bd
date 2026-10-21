/**
 * RetryPaymentCommand
 * @module payment-service/application/commands/payment
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RetryPaymentRequestDTO } from '@application/dtos/requests/payment/index.js';

export class RetryPaymentCommand extends BaseCommand {
  readonly type = 'payment.payment.retry';

  constructor(
    public readonly dto: RetryPaymentRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
