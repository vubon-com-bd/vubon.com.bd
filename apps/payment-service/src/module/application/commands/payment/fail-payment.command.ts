import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { FailPaymentRequestDTO } from '../../dtos/requests/payment/initiate-payment.dto.js';

export class FailPaymentCommand extends BaseCommand {
  readonly type = 'payment.fail';
  constructor(
    public readonly dto: FailPaymentRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
