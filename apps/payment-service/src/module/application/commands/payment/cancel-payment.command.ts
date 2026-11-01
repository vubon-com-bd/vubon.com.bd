/**
 * CancelPaymentCommand
 * @module payment-service/application/commands/payment
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelPaymentRequestDTO } from '@application/dtos/requests/payment/index.js';

export class CancelPaymentCommand extends BaseCommand {
  readonly type = 'payment.payment.cancel';

  constructor(
    public readonly dto: CancelPaymentRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
