/**
 * VerifyPaymentCommand
 * @module payment-service/application/commands/payment
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { VerifyPaymentRequestDTO } from '@application/dtos/requests/payment/index.js';

export class VerifyPaymentCommand extends BaseCommand {
  readonly type = 'payment.payment.verify';

  constructor(
    public readonly dto: VerifyPaymentRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
