import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelPaymentRequestDTO } from '../../dtos/requests/payment/initiate-payment.dto.js';

export class CancelPaymentCommand extends BaseCommand {
  readonly type = 'payment.cancel';
  constructor(
    public readonly dto: CancelPaymentRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
