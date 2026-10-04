import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { VerifyPaymentRequestDTO } from '../../dtos/requests/payment/initiate-payment.dto.js';

export class VerifyPaymentCommand extends BaseCommand {
  readonly type = 'payment.verify';
  constructor(
    public readonly dto: VerifyPaymentRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
