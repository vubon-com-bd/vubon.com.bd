/**
 * ConfirmPaymentCommand
 * @module payment-service/application/commands/payment
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ConfirmPaymentRequestDTO } from '@application/dtos/requests/payment/index.js';

export class ConfirmPaymentCommand extends BaseCommand {
  readonly type = 'payment.payment.confirm';

  constructor(
    public readonly dto: ConfirmPaymentRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
