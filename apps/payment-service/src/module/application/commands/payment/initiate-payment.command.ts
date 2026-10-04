import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { InitiatePaymentRequestDTO } from '../../dtos/requests/payment/initiate-payment.dto.js';

export class InitiatePaymentCommand extends BaseCommand {
  readonly type = 'payment.initiate';
  constructor(
    public readonly dto: InitiatePaymentRequestDTO,
    public readonly userId: string,
    public readonly actorId?: string,
  ) {
    super();
  }
}
