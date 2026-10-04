import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RetryPaymentRequestDTO } from '../../dtos/requests/payment/initiate-payment.dto.js';

export class RetryPaymentCommand extends BaseCommand {
  readonly type = 'payment.retry';
  constructor(
    public readonly dto: RetryPaymentRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
