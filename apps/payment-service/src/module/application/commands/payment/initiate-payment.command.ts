/**
 * InitiatePaymentCommand
 * @module payment-service/application/commands/payment
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { InitiatePaymentRequestDTO } from '@application/dtos/requests/payment/index.js';

export class InitiatePaymentCommand extends BaseCommand {
  readonly type = 'payment.payment.initiate';

  constructor(
    public readonly dto: InitiatePaymentRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
