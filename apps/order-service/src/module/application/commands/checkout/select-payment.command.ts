import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SelectPaymentRequestDTO } from '../../dtos/requests/checkout/select-payment.dto.js';

export class SelectPaymentCommand extends BaseCommand {
  readonly type = 'checkout.select_payment';
  constructor(public readonly dto: SelectPaymentRequestDTO, public readonly actorId?: string) { super(); }
}
