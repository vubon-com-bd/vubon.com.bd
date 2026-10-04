import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MarkChargebackRequestDTO } from '../../dtos/requests/payment/initiate-payment.dto.js';

export class MarkChargebackCommand extends BaseCommand {
  readonly type = 'payment.chargeback';
  constructor(
    public readonly dto: MarkChargebackRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
